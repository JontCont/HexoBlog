---
title: css - 基本使用方式
categories: 
  - 前端技術
tags: 
  - ReactJs
  - Angular
  - Vue
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: /image/20230901_23-21-50.png
---

## CSS的構成與規則
![](/image/20230901_23-21-50.png)

CSS(Cascading Style Sheets) 使用方式如下
```
選取器 { 屬性 :  值;}
```

說明
1. 選取器 : 使用在html 中的地方，ex : class 、 id 、object
2. 屬性 : 設定哪個屬性，ex： 背景、大小、寬度
3. 值 : 設定什麼值，ex  :  #ddd ， px，1s 

### 選取器
1. Class 選取器
```css
.title{
    background: yellow;
}
```

2. ID 選取器
```css
#title{
    background: yellow;
}
```

3. 後代選取器
```css
.list1 li{
    list-style: decimal;
  }
```

4. 屬性選取器
```css
.img-resp[alt]{
  border-color:#000;
}
```

5. 擬態選取器
```css
a:hover{
  color: #000;
}
```
![](/image/20230901_23-26-00.png)