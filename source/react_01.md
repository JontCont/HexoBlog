---
title: React (一) - 使用方式、介紹
categories: 
  - 前端技術
  - 三大前端框架
  - ReactJs
tags: 
  - ReactJs
  - Angular
  - Vue
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: 
---
# React 介紹
React 可稱 ReactJs ，主要由Facebook、Instagram 和一個由個人開發者和企業組成的社群維護。

React為程式設計師提供了一種子組件不能直接影響外層組件（"data flows down"）的模型，資料改變時對HTML文件的有效更新，和現代單頁應用中組件之間乾淨的分離。

## JSX 語法
JSX語法是開發React的核心語法，是一個 JavaScript 的語法擴充。
使用方式會與js不同，React能使用方式如下。
```js
const el = <p>Hello React !!</p>;

ReactDom.render(
  el,
  document.getElementById('root')
);

```