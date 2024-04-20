---
title: 【JS】NodeJs 製作一個簡易型API
date: 2024-04-20 21:23:36
categories: 
  - 前端技術
  - javascript
tags: 
  - javascript
description:
keyword: 'ES6, AJAX '
cover: /img/Web/js/Ajax/ajax-logo.jpg
---

## 前言
如何使用 node js 快速建立一個API 環境，原則上這塊之前要 publish 但是近期比較繁忙沒時間把內容補齊。最近有看到不少社群網站提到 minimal api ，這便就先用 Node JS 來起頭。



## 一、 Node Js + PNPM 
近期使用 pnpm 效能、容量、速度上相當滿意，未來會使用 pnpm 居多。若沒有看過 pnpm 可以到前幾篇有 *pnpm vs npm* 安裝說明。

### 1-1 node express 
Express 是一個 Node.js 的 Web 應用程式框架，提供了一系列強大的功能，幫助你建立各種 Web 應用程式。Express 應用程式是基於中間件的，可以使用內建的中間件，也可以使用第三方中間件。


Express 主要特點包括：
1. 中介軟體函數：是一些有權存取**要求物件 (req)**、**回應物件 (res)** 和**應用程式要求/回應**循環中之下一個中介軟體函數的函數。下一個中介軟體函數通常以名為 next 的變數表示。
中介軟體函數可以執行下列作業：
- 結束要求/回應循環
- 呼叫堆疊中的下一個中介軟體函數。
- 對要求和回應物件進行變更。

1. 路由控制：Express 提供了一個直觀的方法來編寫路由，可以輕鬆地將應用程式的路由和處理程序分開。
2. 模板引擎：Express 支持多種模板引擎，如 Jade、Mustache、EJS 等，可以根據需要選擇合適的模板引擎。
3. 快速：Express 是一個輕量級、快速的 Web 應用程式框架。

### 1-2 安裝 express
1. 初始化專案
```bash
pnpm init
pnpm install
```

2. 安裝 express
初始化專案後，安裝 express才能使用。
```bash
pnpm install express
```

### 1-3 建立 index.js
直接在 root 目錄底下創建一個 index.js 檔案，這邊簡單敘述下方內容。
當使用這個 API 時候，我們會在網址輸入 `http://localhost:3000/` 會透過**app.get("/")**回傳 `Hello World!` 字串。 
因為 js 需要有一個監聽的動作，所以我們使用 **app.listen(port, callback)** 來監聽 port 3000，當監聽成功後會回傳 `Server is running on port 3000` 字串。

```javascript
const app = require("express")(); // 引入 express
const port = 3000; // 設定 port


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(port, () => { // 監聽 port
    console.log(`Server is running on port ${port}`);
});

```
### 1-4 啟動服務
在終端機輸入以下指令，啟動服務。
```bash
node .
```
補充 : 上面做法可以直接指定檔案名稱，例如 `node index.js` 也是可以的。

## 二、製作簡易的 restful API
這裡用簡單情境，當我們是要抓取使用者資料時候會需要以下作法 (GET、POST、PUT、DELETE)。

### 2-1 創建一個 array users 資料
```js
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Cara" },
];
```

### 2-2 創建 restful API
```javascript
const app = require("express")(); // 引入 express

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send("The user with the given ID was not found.");
    }
    res.json(user);
});

app.post("/users", (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(user);
    res.json(user);
});

app.put("/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send("The user with the given ID was not found.");
    }
    user.name = req.body.name;
    res.json(user);
});

app.delete("/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        res.status(404).send("The user with the given ID was not found.");
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.json(user);
});
```



## 二、API 路由

### 2-1 路由
在 express 中，路由是指如何定義應用程式的端點 (URI) 以及如何回應用戶端的要求。路由是由一個 URI、HTTP 要求 (GET、POST 等) 和若干個處理程序組成的。每個路由可以有一個或多個處理程序，當路由匹配時，這些處理程序將被執行。

### 2-2 建立路由
在這邊我們建立一個簡單的路由，當使用者輸入 `http://localhost:3000/api` 時候，會回傳 `API` 字串。

```javascript
app.get("/api", (req, res) => {
    res.send("API");
});
```









