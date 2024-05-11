---
title: 【JS】NodeJs Express 製作一個簡易型API
date: 2024-04-20 21:23:36
categories: 
  - 前端技術
  - javascript
tags: 
  - javascript
description:
keyword: 'ES6, AJAX '
cover: 'https://raw.githubusercontent.com/surmon-china/nodepress/main/logo.png'
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

### 2-4 統一使用 json 格式
這邊我們統一使用 json 格式，所以我們需要在最上面加入以下程式碼。若沒有使用這段程式碼，會導致 req.body 無法使用。
```javascript
app.use(require("express").json());
```

### 2-4 透過 postman 測試
這邊我們使用 postman 來測試，這邊我們使用 GET、POST、PUT、DELETE 四種方法來測試。

1. **GET**：取得所有使用者資料
    - URL：`http://localhost:3000/users`
    - Method：GET
    - Response：`[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"},{"id":3,"name":"Cara"}]`

2. **GET**：取得指定使用者資料
    - URL：`http://localhost:3000/users/2`
    - Method：GET
    - Response：`{"id":2,"name":"Bob"}`

3. **POST**：新增使用者資料
   - URL：`http://localhost:3000/users`
   - Method：POST
   - Body：`{ "name": "David" }`
   - Response：`{"id":4,"name":"David"}`

4. **PUT**：更新使用者資料
   - URL：`http://localhost:3000/users/4`
   - Method：PUT
   - Body：`{ "name": "Eva" }`
   - Response：`{"id":4,"name":"Eva"}`

5. **DELETE**：刪除使用者資料
   - URL：`http://localhost:3000/users/4`
   - Method：DELETE
   - Response：`{"id":4,"name":"Eva"}`




## 三、補充
### 3-1 request、response
- **req**：是 request 的縮寫，是一個物件，包含了所有的 HTTP 請求的資訊。
- **res**：是 response 的縮寫，也是一個物件，包含了所有的 HTTP 回應的資訊。

### 3-2 request 參數
1. req.query：這是一個物件，包含了查詢字串中的所有參數。例如，在 URL "/search?keyword=nodejs" 中，你可以通過 req.query.keyword 獲取 "nodejs"。
2. req.params：這是一個物件，包含了路由中的命名參數。例如，在路由 "/users/:userId" 中，你可以通過 req.params.userId 獲取用戶 ID。
3. req.body：這是一個物件，包含了 POST 或 PUT 請求的主體數據。需要注意的是，要使用此屬性，你需要使用 body-parser 中間件。
4. req.headers：這是一個物件，包含了所有 HTTP 請求標頭。
5. req.method：這是一個字串，表示 HTTP 請求的方法，如 "GET"、"POST" 等。
6. req.url：這是一個字串，表示完整的 URL，包括路徑和查詢字串。
7. req.path：這是一個字串，表示 URL 的路徑部分，不包括查詢字串。
8. req.hostname：這是一個字串，表示 HTTP 請求的主機名稱，不包括端口。
9. req.ip：這是一個字串，表示發送 HTTP 請求的客戶端的 IP 位址。


### 3-3 response 方法
1. **res.end()**：這個方法會結束回應進程，不再發送任何數據。
2. **res.download()**：這個方法會提示瀏覽器下載文件。你需要提供文件的路徑作為參數。
3. **res.json()**：這個方法會發送一個 JSON 格式的回應。你需要提供一個物件作為參數。
4. **res.jsonp()**：這個方法會發送一個 JSONP 格式的回應，允許跨域請求。你需要提供一個物件作為參數。
5. **res.redirect()**：這個方法會重定向請求到一個新的 URL。你需要提供新的 URL 作為參數。
6. **res.render()**：這個方法會呈現一個視圖模板。你需要提供模板的名稱和一個物件（包含模板變數）作為參數。
7. **res.send()**：這個方法會發送一個回應，可以是 String、Buffer、JSON 或 HTML。
8. **res.sendFile()**：這個方法會發送一個文件。你需要提供文件的路徑作為參數。
9. **res.sendStatus()**：這個方法會設置響應狀態碼，並將其作為回應的主體發送。
10. **res.status()**：這個方法會設置響應狀態碼。
11. **res.type()**：這個方法會設置 Content-Type 響應標頭。
12. **res.set()**：這個方法會設置一個或多個響應標頭。
13. **res.cookie()**：這個方法會設置一個 cookie。你需要提供 cookie 的名稱和值作為參數。
14. **res.clearCookie()**：這個方法會清除一個 cookie。你需要提供 cookie 的名稱作為參數。
15. **res.append()**：這個方法會追加一個值到已存在的 HTTP 響應頭。
16. **res.attachment()**：這個方法會將 HTTP 響應頭中的 Content-Disposition 設置為附件，這通常用於提示瀏覽器下載文件。
17. **res.header()**：這個方法會設置一個或多個響應標頭。
18. **res.get()**：這個方法會返回指定的 HTTP 頭的值。
19. **res.format()**：這個方法會根據請求的 Accept HTTP 頭字段，呈現不同格式的回應。你需要提供一個物件，物件的鍵是內容類型，值是對應的回應函數。
