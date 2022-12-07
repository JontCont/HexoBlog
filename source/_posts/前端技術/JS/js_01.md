---
title: 前端遇到的基本問題 
categories: 
  - 前端技術
  - javascript
tags: 
  - javascript
description:
keyword: '網頁, 前端'
cover: /img/Web/js/js-serialize/bg.png
---
進入網頁世界時候，常常問到什麼是 CDN、什麼是 .min.js或者是Reset Css，此章節為定期維護不定時會在這裡更新。

# 1. CDN -內容傳遞網路  (Content delivery network)
是指一種透過網際網路互相連接的電腦網路系統，利用最靠近每位使用者的伺服器，更快、更可靠地將音樂、圖片、影片、應用程式及其他檔案傳送給使用者，來提供高效能、可擴展性及低成本的網路內容傳遞給使用者。
這是一種內容在網路上傳輸的快取機制。

## 優點
1. 加速網頁瀏覽效能：因為已經將緩存資料放在最近的機房中，不需要重新像伺服器讀取
2. 有效分流(頻寬)：當所有用戶都不再向同一個伺服器讀取資料，大幅降低集中流量
3. 網站穩定度：網站流量分散後，網站的穩定度大幅提高，即使短暫當機也不怕用戶無法使用
4. 安全性增加：因網站透過CDN分散出去，駭客較難直接攻擊網站本體

## 2. Reset Css
在 W3C 制訂 HTML 與 CSS 規格時，並沒有強制規定各家瀏覽器應該怎樣實作每一個 HTML tag 的 CSS 預設樣式，只有提供資訊參考的範例，加上IE 獨霸的時期，那時候還沒有其他瀏覽器， CSS Reset 的需求主要落在 IE 各版本之間的調整，後來 Firefox、safari、Chrome 陸續出現，網頁設計師必須要針對每個瀏覽器去做調整，因此 CSS Reset 的需求漸漸增加。

有幾套常見的 CSS Reset，提供各位參閱。
- [Reset CSS](https://meyerweb.com/eric/tools/css/reset/)，此為 Eric Meyer 的版本
- [HTML5 Reset Stylesheet，HTML5 Doctor](http://html5doctor.com/html-5-reset-stylesheet/) 網站修改自 Eric A. Meyer 的版本。
- [CSS Reset - YUI Library](https://clarle.github.io/yui3/yui/docs/cssreset/) ，由 Yahoo UI Library v3 所提供的 CSS Reset 版本。

## 3.css命名規則
### OOCSS（Object Oriented CSS）
1. 分離結構與樣式（Separate container and content）：結構是元素標籤，樣式是指顏色，減少依賴結構與樣式間的影響，應該要增加樣式的可重覆性。
2. 分離HTML與CSS（Separate structure and skin）：是指盡量將可共用的樣式單獨抽離出來給class。

### SMACSS
（Scalable & Modular Architecture for CSS）更具結構與命名規則的限制，透過以下五種分類概念，把class的命成拆的更細節。
- SMACSS把CSS分成五種結構：（Categorizing CSS Rules）： ```Base```、```Layout```、```Module```、```State```、```Theme```
- 命名規則：為CSS做分類，id與css的使用不會是獨立性，會透過dash 去做分類，命名規則（Naming Rules）對於SMACSS是很重要的。

### BEM（Block，Element，Modifier）
由區塊、元素與修飾狀態 
- Block：　是頁面獨立的區塊，每個頁面都可以看成很多區塊的組合。
- Element：是指區塊中的元素
- Modifier：是指描述Block或者Element的屬性或狀態
透過上面三點，結合再一起的class命名就是BEM

# 4. JS 中 .min.js 和.js 檔案的區別
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