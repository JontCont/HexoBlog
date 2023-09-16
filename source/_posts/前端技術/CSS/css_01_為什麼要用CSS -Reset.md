---
title: 為什麼要用CSS -Reset
categories: 
  - 前端技術
tags: 
  - ReactJs
  - Angular
  - Vue
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: /image/20230901_23-39-02.png
---
## 為什麼要用CSS -Reset
在 W3C 制訂 HTML 與 CSS 規格時，並沒有強制規定各家瀏覽器應該怎樣實作每一個 HTML tag 的 CSS 預設樣式，只有提供資訊參考的範例[1]，加上IE 獨霸的時期，那時候還沒有其他瀏覽器， CSS Reset 的需求主要落在 IE 各版本之間的調整，後來 Firefox、safari、Chrome 陸續出現，網頁設計師必須要針對每個瀏覽器去做調整，因此 CSS Reset 的需求漸漸增加。

## CSS Reset
有幾套常見的 CSS Reset
- [Reset CSS](https://meyerweb.com/eric/tools/css/reset/)，此為 Eric Meyer 的版本
- [HTML5 Reset Stylesheet](http://html5doctor.com/html-5-reset-stylesheet/)，HTML5 Doctor 網站修改自 Eric A. Meyer 的版本。
- [CSS Reset](https://clarle.github.io/yui3/yui/docs/cssreset/) - YUI Library ，由 Yahoo UI Library v3 所提供的 CSS Reset 版本。

## MeyerWeb-[CSS Reset]
是Eric整理出來一個解決方案[CSS Reset]，強制把所有地方強制歸零，可以看到最一開始一大串的html標籤都設為0。缺點則是必須要重做設定，比較沒有彈性。

- 參考網址：https://meyerweb.com/eric/tools/css/reset/


## CSS Normalize
因為 reset.css 重置了各個瀏覽器的樣式設定，使得有些有用、常用標籤的默認樣式必須要重新設定，因為這個問題，有人開發出了 normalize.css 
在 Normalize.css 的官方頁面上點出了他們的目標：
- 保留有用的瀏覽器默認設置，而不是將其刪除。
- 為廣泛的 HTML 元素提供一般化的樣式。
- 修正瀏覽器的 Bug 與不一致。
- 透過微妙的改善提高可用性。
- 有詳細的文檔來解釋代碼。(每個樣式都有註解是處理什麼問題。)