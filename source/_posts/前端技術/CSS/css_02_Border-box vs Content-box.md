---
title: 【CSS】- Border-box vs Content-box
categories: 
  - 前端技術
  - css
tags: 
  - front-end
  - 前端
description:
cover: /image/20230901_23-27-59.png
---

## Content-box
content-box這是根據 CSS 標準的起始值和預設值。 width  與  height 只包括內容本身的寬和高， 不包括邊框（border）、內邊距（padding）、外邊距（margin）。注意：內邊距、邊框和外邊距都在這個盒子的外部。例如，如果 .box {width: 350px}; 而且 {border: 10px solid black;} ，那麼在瀏覽器中的渲染該容器的實際寬度將是370px，;

簡單來說，尺寸計算公式：width = 內容的寬度，height = 內容的高度。寬度和高度都不包含內容的邊框（border）和內邊距（padding）。

## Border-box
width 和 height 屬性包括內容（content），內邊距（padding）和邊框（border），但不包括外邊距（margin）。這是當文檔處於 Quirks 模式時 Internet Explorer 所使用的盒模型。注意，內邊距和邊框都將在盒子內 ，例如，.box {width: 350px; border: 10px solid black;} ，渲染出的容器寬度會固定在 350px，而內容（content）的寬度就會變成 330px， 因為邊框（border）佔了20px。內容框不能為負，並且進位到 0，使得不可能使用 border-box 使元素消失。

這裡的維度計算為：
width = border + padding + 內容的  width，
height = border + padding + 內容的 height。 
當你設定一個元素樣式為 box-sizing: border-box;，這個元素的內距和邊框將不會增加元素本身的寬度。

![](/image/20230901_23-27-59.png)


這樣可以確保所有元素的寬度都可以用比較直觀的方式來定義。
因為 box-sizing 算是個比較新的屬性，所以你還應該還是要加上我之前在例子中使用的 -webkit- 和 -moz- 前綴（Prefixes），這樣才能啟用特定瀏覽器實驗中的 CSS 特性。請記得該屬性從 IE8+ 之後就開始支援。