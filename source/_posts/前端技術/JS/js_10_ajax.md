---
title: JavaScript - AJAX 
date: 2021-07-20
categories: 
  - 前端技術
  - javascript
tags: 
  - javascript
description:
keyword: 'ES6, AJAX '
cover: /img/Web/js/Ajax/ajax-logo.jpg
---
## 什麼是 AJAX ？
AJAX 是「Asynchronous JavaScript and XML」（非同步的 JavaScript 與 XML 技術）的縮寫，簡單說就是網頁不用重新整理，就能即時地透過瀏覽器去跟伺服器溝通，撈出資料。
- Asynchronous：非同步
- JavaScript：使用的程式語言
- XML：Client 與 Server 交換資料用的資料與方法，近年由於 JSON 等格式的流行，使用 Ajax 處理的資料並不限於 XML。
  
## 同步請求 v.s. 非同步請求
接著讓我們引入客戶端與伺服器端的概念，來看看「同步請求」和「非同步請求」的對比：

- 同步請求 (Synchronous request)： 客戶端 (client) 對伺服器端 (server) 送出 request ，並且在收到伺服器端的 response 之後才會繼續下一步的動作，等待的期間無法處理其他事情。這個作法並不理想，因為通常伺服器端的運算速度比本地電腦慢上好幾倍。

- 非同步請求 (Asynchronous request)：客戶端 (client) 對伺服器端 (server) 送出 request 之後，不需要等待結果，仍可以持續處理其他事情，甚至繼續送出其他 request。Responese 傳回之後，就被融合進當下頁面或應用中。

## 常見問題 : get 與 post 的差異
- get：從瀏覽器發出請求，伺服器會回傳資料（在 responseText 裡面回傳一個物件）。
- post：從瀏覽器發出請求，傳送資料時註明格式，若選擇用表單格式，則傳送資料的內容要仿照表單傳送後的網址*。
*也就是欄位1 name = 使用者輸入的值1 & 欄位2 name = 使用者輸入的值2 etc.

## Ajax Method
Api 設計過程中，很常需要配合幾個medth 互換使用。API設計模式可以參考 [```RESTful ```](https://hackmd.io/@mopcon/2020/%2F%40mopcon%2FB17d5KSww)

- POST : 新增
- GET : 讀取
- PUT/PATCH : 更新
- DELECT :刪除
