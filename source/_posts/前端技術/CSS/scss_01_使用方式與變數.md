---
title: SCSS - 使用方式與變數
date: 2023-10-10
categories: 
  - 前端技術
  - scss
tags: 
  - front-end
  - 前端
description:
cover: /image/20230901_23-21-50.png
---

css 在各家公司無法脫離存在，但是 css 本身的語法不夠強大，因此有了 scss 的誕生，scss 是 css 的超集合，也就是說 scss 可以完全兼容 css 的語法，但是 css 不行。
## 一、SCSS
SCSS，或稱為Sass（Syntactically Awesome Stylesheets），是一種CSS的擴展語言，它引入了一些功能和語法，以使樣式表更具結構、可讀性和可維護性。以下是SCSS的由來：

### 1-1 起源
Sass最初是由哈馬德·卡瑟姆（Hampton Catlin）於2006年創建的，最初是一個Ruby的Gem，用於簡化和改進CSS的書寫。 Sass引入了變數、巢狀規則和混合等功能，以減少代碼的冗長性和提高可維護性。

### 1-2 演進
SCSS（Sassy CSS）則是對Sass的一種新語法的引入，它更接近傳統的CSS語法。SCSS允許開發者使用原生的CSS語法，同時利用Sass提供的功能，使得轉換和遷移變得更加容易。SCSS的語法更接近CSS，因此對於那些熟悉CSS的開發者而言，學習曲線相對較低。

### 1-3 功能和語法的引入
SCSS引入了許多功能，例如變數、嵌套規則、混合、繼承、模塊化等，這些功能有助於更有效地組織和管理樣式代碼。開發者可以使用變數來存儲和重複使用值，使用嵌套規則使代碼更具層次感，使用混合和繼承實現代碼的可重用性。
---
## 二、SCSS vs CSS
### 2-1 基本使用
CSS : 使用基本的語法，使用大括號 {} 和分號 ; 來定義樣式。使用方式如下
```css
body {
  font-size: 16px;
  color: #333;
}
```

SCSS : 使用較為進階的語法，支援巢狀結構、變數、混合（mixins）等功能。使用方式如下
```scss
body {
  font-size: 16px;
  color: #333;
  h1 {
    color: blue;
  }
}
```

### 2-2 變數
css 無法使用變數，因此在 scss 中可以使用變數來定義樣式，使用方式如下
```scss
$font-stack: 'Arial', sans-serif;
$base-font-size: 16px;

body {
  font-family: $font-stack;
  font-size: $base-font-size;
}
```

### 2-3 巢狀結構
scss 可以使用巢狀結構，讓樣式更加清晰，使用方式如下
```scss
nav {
  background-color: #333;
  a {
    color: white;
  }
}

```

### 2-4 混合（Mixins）
sass 支援混合，可以定義並重複使用樣式集合。
```scss
@mixin border-radius($radius) {
  border-radius: $radius;
}

button {
  @include border-radius(5px);
}
```