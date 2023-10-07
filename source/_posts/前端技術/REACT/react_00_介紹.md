---
title: React - JSX 使用方式、介紹
date: 2022-05-01
categories: 
  - 前端技術
  - React
tags: 
  - React
description:
keyword: 'ES6, React  ,網頁'
cover: /img/Web/react/react_bg.png
---
# React 介紹
React 可稱 ReactJs ，主要由Facebook、Instagram 和一個由個人開發者和企業組成的社群維護。

React為程式設計師提供了一種子組件不能直接影響外層組件（"data flows down"）的模型，資料改變時對HTML文件的有效更新，和現代單頁應用中組件之間乾淨的分離。

手機開發為 React Native : https://reactnative.dev/

## JSX 語法
JSX語法是開發React的核心語法，是一個 JavaScript 的語法擴充，X為Xml之意。
使用方式會與js不同，React能使用方式如下。

{% note info flat %}
 🎈 注意 : 以下範例為 index.js 輸入的方式，並非在App.js所使用。
{% endnote %}

```js
const el = <p>Hello React !!</p>;

ReactDom.render(
  el,
  document.getElementById('root')
);

```
{% note info flat %}
 ### StrictMode
  主要用來檢查component有無錯誤的方式
  ```js
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  ```
{% endnote %}

---

## JSX 使用方式
請創建一個js檔案測試React規則，並使用下方範例。

```js
/*index.js*/
import React from 'react';
import ReactDOM from 'react-dom';
import Ex01 from './ex_01';

const el = <p>Hello React !!</p>

ReactDOM.render(
  <React.StrictMode>
    <Ex01 />
  </React.StrictMode>,
  document.getElementById('root')
);

```

```js
//ex_01
const el = <p>使用這方式也能正常產生文字</p>

function example_01(){
    return (
        el
    );
};

export default example_01;
```

基本上，React需要注意render() return要加上```<div>```。

注意是 jsx 是 function 不能用表達是方式使用，會造成意外的錯誤。若是使用變數方式是可以正常使用。
```js
function example_01(){
    return (
        <div>
            <p>使用這方式也能正常產生文字</p>
        </div>
    );
};

export default example_01;
```

---

## 事件使用
JSX使用方式可以設定onClick方式。這邊我使用```{}```表示法，內容使用function名稱即可使用。 

```js
//按下事件
let clickAlert = ()=>{
    alert('你已經點下我了');
}
//設定預設按鈕
let btnFunctionDemo =()=> {
    return( 
      <div>
        <button onClick={clickAlert}>請點我</button>
      </div> );
}

export default btnFunctionDemo;

```
這邊的```{}```表示法可以使用在css方式。
例如 : 
```jsx
  let style_bg_blue = { background: 'blue', margin: '10px'}
```

---
# 結論
花了第一天用 React JSX使用一遍，多少會有點操作上不太習慣。這邊比較像是說明如何使用JSX，後續會再研究看看如何更深入使用React。

(P.S. 本人JS不太強，講解無法太深入，請見諒<(＿　＿)>。)