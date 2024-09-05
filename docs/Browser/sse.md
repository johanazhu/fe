# SSE（Server Sent Events）

服务端向客户端推送数据，除了使用 WebSocket，还可以用 SSE（Server Sent Events）

在 ChatGPT 的 stream 接口用的正是 SSE 规范，所以最近才尝尝被提起

> SSE 的一个常见应用就是 AI 的打字流效果。这并不是为了效果酷炫而特地做的效果，而是因为数据本身就是流式传输。像 ChatGPT 的 Stream 数据用的正是 SSE 的方式。



## SSE 介绍

SSE（Server Sent Events），中文别名：服务端推送

基于 HTTP 协议，严格来说，HTTP 协议并不能做到服务端主动推送消息。之所以能实现，是因为服务端将发送的信息声明为流（Stream），告诉客户端内容会源源不断的发送过来，这时客户端并不会关闭连接，而是会一直等待服务端发送新的数据。SSE 便是利用这种机制实现“主动”推送消息。



它与 WebSocket 不同的是：

1. SSE 使用 HTTP 协议，WebSocket 是独立的 ws 协议
2. SSE 依然是单向通信，只能服务端向客户端发送，而 WebSocket 是双向通信
3. SSE 属于轻量级，使用简单；WebSocket 协议相对复杂
4. SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据





## EventSource 介绍

浏览器提供了 [EventSource](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FEventSource) API 用于建立 SSE 连接。使用方法如下：

```javascript
const evtSource = new EventSource("//api.example.com/ssedemo.php", {
  withCredentials: true,
});

evtSource.onmessage = function (event) {
  var data = event.data;
  // handle message
};

// 另一种写法
evtSource.addEventListener('message', function (event) {
  var data = event.data;
  // handle message
}, false);

// 其他方法还有：
evtSource.onopen = function (event) {
  // ...
};

evtSource.onerror = function (event) {
  // ...
};

// 关闭 SSE 连接
evtSource.close();

```

服务端该怎么写呢？

首先，服务器向浏览器发送的 SSE 数据，必须是 UTF-8 编码的文本，且具有如下 HTTP 头信息：

```javascript
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

最重要的是第一句：`Content-Type` 必须指定 MIME 类型为 `event-steam`。`Cache-Control: no-cache` 防止浏览器缓存。`Connection: keep-alive` 保持连接打开以进行流式传输。



##  AI 的打字流效果实战

服务端（nextjs）

```javascript
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // 设置响应头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 发送初始数据
  res.write('data: SSE connection established\n\n');

  // 获取 ChatGPT 的内容
  const stream = openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: '你的问题或消息内容' }],
    stream: true, // 开启流式传输
  });

  stream.on('data', (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });

  stream.on('end', () => {
    res.write('event: end\ndata: Stream ended\n\n');
    res.end();
  });

  req.on('close', () => {
    stream.destroy();
    res.end();
  });
}
```

客户端使用 EventSource 连接

```javascript
import { useEffect, useState } from 'react';

export default function ChatGptStream() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/chatgpt-sse');

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    eventSource.addEventListener('end', () => {
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>ChatGPT Streaming</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
    </div>
  );
}
```

