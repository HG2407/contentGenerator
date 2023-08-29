const express = require('express');
const {YoutubeTranscript} = require('youtube-transcript');
const app = express();
const path = require('path');
require('dotenv').config();
const {SerpAPI} = require('langchain/tools');
const axios = require('axios');
const {ChatOpenAI} = require('langchain/chat_models/openai');
const {OpenAIEmbeddings} = require('langchain/embeddings/openai');
const {WebBrowser} = require('langchain/tools/webbrowser');
const {ZeroShotAgent, AgentExecutor} = require('langchain/agents');
const { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } = require('langchain/prompts');
const {LLMChain} = require('langchain/chains');

app.use(express.static(path.join(__dirname, './dist')));

app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
})

let chain;
const chatHistory = [];
let transcript = '';
let research;
let metaDataString = '';


app.post('/input', async (req, res) => {
    let input = req.body.input;
    let topic = req.body.topic;

    chatHistory.push({
        role:'user',
        content: input
    })

    if(req.body.firstMsg) {

        if( !input.includes('https://www.youtube.com/watch?v=')) {
            res.status(400).send({error: 'Please provide a valid Youtube URL!'});
            return;
        }

        let videoId = getVideoId(input);
       
        let transcriptResponse = await YoutubeTranscript.fetchTranscript(videoId);
    
        transcript = '';
    
        transcriptResponse.forEach((line) =>{
            transcript += line.text + ' ';
        });
    
        let metaData = await getMetaData(videoId);
        metaDataString = JSON.stringify(metaData, null, 2);
        research = await researchAgent(topic);
    
        let response = await initChain(
            transcript,
            metaDataString,
            research,
            topic
        );
    
        res.json(response);
    } else {
        let question = input;

        let response = await chain.call({
            input: question,
            metaData: metaDataString,
            transcript,
            research
        });

        chatHistory.push({
            role: 'assistant',
            content: response.text
        });

        res.json(response)
    }
 
})


app.listen(8000, () => {
    console.log('server is listening at port: 8000');
});


function getVideoId(url) {
    let urlId = new URLSearchParams(new URL(url).search); //take the query parameters and create an object to work with query
    return urlId.get('v'); //find the 'v' from the  queryObj and return its value
}

async function getMetaData(videoId) {
    console.log(process.env.SERPAPI_API_KEY);
    let url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`;

    let response = await axios.get(url);
    let metaData = response.data.items[0];

    let videoTitle = metaData.snippet.title;
    let videoDescription = metaData.snippet.description;
    let shortenedDescription = videoDescription.split('.')[0];
    let vidId = metaData.id;

    let shortMetaData = {
        videoTitle,
        videoDescription: shortenedDescription,
        videoId: vidId
    }

    return shortMetaData;
}

async function researchAgent(topic) {
    //tool
    let serpAPI = new SerpAPI(process.env.SERPAPI_API_KEY,{
        baseUrl: 'http://localhost:8000',
        location: 'Jaipur, Rajasthan, India',
        hl: 'en',
        gl: 'in',
    });
    //return the top result
    serpAPI.returnDirect = true;

    //webBrowserTool
    let model = new ChatOpenAI({
        openAIApiKey:process.env.OPENAI_API_KEY,
        temperature: 0
    });

    let embeddings = new OpenAIEmbeddings();
    let browser = new WebBrowser({
        model,
        embeddings
    });

    browser.returnDirect = true;

    let tools = [serpAPI, browser];
    
    let promptTemplate = ZeroShotAgent.createPrompt(tools, {
        prefix: 'Answer the following questions as best as you can. You have access to the following tools:',
        suffix: 'Begin! Answer concisely. It\'s okay to say you don\'t know'
    });


    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        new SystemMessagePromptTemplate(promptTemplate),
        HumanMessagePromptTemplate.fromTemplate(`{input}`)
    ])
    
    //****\\
    let chat= new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY
    });
    let llmChain = new LLMChain({
        prompt: chatPrompt,
        llm: chat
    });

    let agent = new ZeroShotAgent({
        llmChain,
        allowedTools: tools.map((tool) => {tool.name})
    });

    let executor = AgentExecutor.fromAgentAndTools({
        agent,
        tools,
        returnIntermediateSteps: false,
        maxIterations: 3,
        verbose: true    
    });

    let result = await executor.run(`Give information about ${topic}?`);

    return result;

}

async function initChain(transcript, metaDataString, research, topic) {
    let llm = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.7,
        modelName: 'gpt-3.5-turbo'
    });

    let chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
            'You are a helpful social media assistant that provides research, new content, and advice to me. \n You are give the transcript of the video: {transcript} \n and video metaData: {metaData} as well as additional research: {research}'
        ),
        HumanMessagePromptTemplate.fromTemplate(
            '{input}. Remember to use the video transcript and research as reference.'
        )
    ]);

    let question = `Write me a script for a new video that provides commentary on this video in a lighthearted, joking manner. It should compliment ${topic} with puns`;

    chain = new LLMChain({
        prompt: chatPrompt,
        llm: llm
    })

    let response = await chain.call({
        transcript,
        metaData: metaDataString,
        research,
        input: question
    });

    chatHistory.push({
        role: 'assistant',
        content: response.text
    });

    return response;
} 
