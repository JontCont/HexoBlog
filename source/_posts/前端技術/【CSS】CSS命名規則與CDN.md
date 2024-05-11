---
title: 【CSS】CDN 與 CSS命名規則
date: 2024-04-25 10:23:32
categories: 
  - 前端技術
  - css
tags: 
  - 前端
description:
cover: /image/20230901_23-21-50.png
---

進入網頁世界時候，常常問到什麼是 CDN或者是Reset Css。

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