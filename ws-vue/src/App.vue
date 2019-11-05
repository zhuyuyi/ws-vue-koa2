<template>
  <div id="app">
    <header class="header">ws测试</header>
    <div>
      我是：
      <input v-model="user" />
      我已经是{{user}}了
    </div>
    <button @click="submit">变身</button>
    <main class="main">
      <ul>
        <li v-for="(item,index) in arr" :key="index">
          <div class="user">{{item}}</div>
        </li>
      </ul>
      <textarea id cols="30" rows="3" v-model="value"></textarea>
      <button @click="wsClick">发送</button>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import axios from "axios";

const API = "http://localhost:3000/api/";

export default {
  name: "App",
  data() {
    return {
      value: "",
      ws_1: null,
      arr: [],
      user: "zyy"
    };
  },
  mounted() {
    this.setSocket();
  },
  methods: {
    setSocket() {
      this.ws_1 = new WebSocket("ws://localhost:3000/api/ws");

      // 打开WebSocket连接后立刻发送一条消息:
      this.ws_1.onopen = () => {
        console.log(`前端监听。。。`);
      };

      // 收到 message
      this.ws_1.onmessage = message => {
        console.log(`${message.data}`);
        this.arr.push(message.data);
      };

      this.ws_1.onerror = err => {
        console.log(`报错了${err}`);
      };
    },
    wsClick() {
      this.ws_1.send(this.value);
    },
    submit() {
      document.cookie = `username=${this.user}; path=/`;
    }
  }
};
</script>

<style>
body,
html {
  margin: 0px;
}
.header {
  height: 60px;
  line-height: 60px;
  background-color: blueviolet;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}
.main {
  width: 96%;
  margin: 10px auto;
  padding: 20px 0;
  border-radius: 10px;
  border: 1px solid #eee;
  box-shadow: 2px 2px 10px #eee;
  text-align: center;
}
textarea {
  width: 70%;
  resize: none;
  border-radius: 10px;
  outline: none;
  transition: 0.5s all;
  padding: 10px;
  box-sizing: border-box;
}

textarea:focus {
  box-shadow: 0 0 6px #ccc;
}
ul {
  list-style: none;
  text-align: left;
  padding: 0 164px;
  max-height: 500px;
  overflow-y: auto;
}

li {
  border: 2px dashed #eee;
  padding: 5px;
  margin: 10px 0;
  border-radius: 10px;
}
button {
  border: none;
  width: 80px;
  height: 30px;
  background-color: blueviolet;
  color: #fff;
  border-radius: 5px;
  display: block;
  margin: 0 164px;
  margin-top: 10px;
  outline: none;
  cursor: pointer;
  transition: 0.5s all;
}
button:focus {
  background-color: darkmagenta;
}
</style>