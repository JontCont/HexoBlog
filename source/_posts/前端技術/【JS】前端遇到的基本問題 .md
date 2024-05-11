---
title: 【JS】 JS 中 .min.js 和.js 檔案的區別
date: 2021-07-11
categories: 
  - 前端技術
  - javascript
tags: 
  - javascript
description:
keyword: '網頁, 前端'
cover: /img/Web/js/js-serialize/bg.png
---

# JS 中 .min.js 和.js 檔案的區別
## 一、.js和.min.js檔案分別是什麼
.js是JavaScript 原始碼檔案， .min.js是壓縮版的js檔案。
.min.js檔案經過壓縮，相對編譯前的js檔案體積較小，傳輸效率快。 防止窺視和竊取原始碼 經過編碼將變數和函式原命名改為毫無意義的命名，以防止他人窺視和竊取 js 原始碼

## 二、 .js 和.min.js檔案的優缺點
TYPE       | 優點  | 缺點 |
-----------|:-----:|-----:|
.js        | 可讀性較好，易於debug和更改 |  體積較大，傳輸時間長 
.min.js    | 體積較小傳輸快, 原始碼防竊 | 可讀性差

## 三、 壓縮原理
壓縮：刪除 js 程式碼中所有註釋、跳格符號、換行符號及無用的空格，從而壓縮 JS 檔案大小。 
混淆：經過編碼將變數和函式原命名改為毫無意義的命名，刪除無用程式碼，行內函數，等價語句替換等(以防止他人窺視和竊取原始碼)