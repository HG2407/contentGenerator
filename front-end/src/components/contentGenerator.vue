<template>
    <div class="container">
        <div class="chatBox" ref="chatBox">
            <p v-for="number in storedMessage.length" :key="number">{{storedMessage[number-1]}}</p>
        </div>
        <p v-if="wait" class="wait">Please Wait...</p>
        <input type="text" @keydown.enter="send" v-model="input" placeholder="enter Youtube url" v-if="firstMsg">
        <input type="text" @keydown.enter="send" v-model="input" placeholder="ask something" v-else>
        <input type="text" v-model="topic" placeholder="enter the topic to ask">
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'contentGenerator',
        data() {
            return {
                input: '',
                storedMessage: [],
                firstMsg: true,
                topic: '',
                wait: false
            }
        },
        methods: {
            async send() {
                let response;
                this.storedMessage.push(this.input);
                this.input = '';
                this.$nextTick(() => {
                    this.$refs['chatBox'].scrollTop = this.$refs['chatBox'].scrollHeight;
                })
                this.wait = true;
                try {
                    if(this.firstMsg) {
                        response = await axios.post('/input', {
                            input: this.storedMessage[this.storedMessage.length -1],
                            topic: this.topic,
                            firstMsg: true
                        });
                        this.firstMsg = false;
                    } else {
                        response = await axios.post('/input', {
                            input: this.storedMessage[this.storedMessage.length -1],
                            topic: this.topic
                        });
                    }
                } catch(e) {
                    console.log(e);
                }
                this.wait = false;
                this.storedMessage.push(response.data.text);
                this.$nextTick(() => {
                    this.$refs['chatBox'].scrollTop = this.$refs['chatBox'].scrollHeight;
                })
              
            }
        }
    }
</script>

<style>
    .container {
        display: inline-block;
        width: 25rem;
        height: 35rem;
    }

    .chatBox {
        width: 25rem;
        height: 33rem;
        padding: 0.5rem;
        border: 0.1rem solid black;
        overflow-y: scroll;
        background-color: gainsboro;
    }

    ::-webkit-scrollbar{
        width: 0;
    }

    .chatBox p {
        text-align: left;
        height: fit-content;
        width: 100%;
        overflow-wrap: break-word;
        margin-bottom: 1rem;
    }

    input {
        width: 50%;
        height: 2rem;
    }


    .wait {
        margin: 0px;
        width: fit-content;
        height: fit-content;
        position: absolute;
        bottom: 7%;
        right: 40%;
    }

</style>