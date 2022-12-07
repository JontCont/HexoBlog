---
title: JavaScript - Fetch
categories: 
  - 前端技術
  - javascript
  - ES6
tags: 
  - javascript
  - ES6 Web 技術 
description:
keyword: 'ES6, Fetch , 狀態 ,網頁'
cover: /img/Web/js/js-fetch/bg.jpg
---

前陣子，同事需要做一個能在Url判斷是否能連上或是存在的網址，才進行轉頁面。因此我們直接來實作有幾種方式可以知道已存在網址或是不存在。


# 遠端資料方法
JavaScript 中可以使用 [XMLHttpRequest](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest) 的方法。

## XMLHttpRequest 
JavaScript 沒有jquery 使用，會如同下方處理方式。 針對[url]變數舉得網址，load中會取得status方式，算是很久的寫法。
{% note blue 'fas fa-bullhorn' simple %}
  備註 : (這部分可以寫成 ajax 方式，如果遇到 CORS 之後章節會在細說。)
{% endnote %}
```js
let url = 'https://randomuser.me/api/';

var req = new XMLHttpRequest();
req.open('get', url, false);
req.onload = function () {
  let $div = document.querySelector('#response-result');
  $div.textContent += 'DONE : '+ req.status;
};
req.send(null);
```


## [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
這裡Fetch提供簡單的範例來取得遠端的資料，fetch 會使用 ES6 的 Promise 作回應，then 作為下一步，catch 作為錯誤回應 (404, 500…)。
回傳的為 ReadableStream 物件，需要使用不同資料類型使用對應方法，才能正確取得資料物件。

![](/img/Web/js/js-fetch/xhr.PNG)

```js
let url =
  'https://randomuser.me/api/';

fetch(url,{}).then((rep)=>{
  console.log(rep.status);
  let $div = document.querySelector('#response-result');
  $div.textContent += 'DONE : '+ rep.status;
})

```

fetch 後方會接 then()，這是 Promise 的特性，資料取得後可在 then 裡面接收。```return response.json();``` 的資料則會傳到下一個 then()。
then方法會得到一個帶有Response(回應)物件值的已實現狀態的Promise物件。Response 物件通常都是從外部資源要求所得到，自訂Response物件算是會在特殊的情況下才會作的事情。

```js
let url =
  'https://randomuser.me/api/';

fetch(url,{}).then((rep)=>{
  console.log(rep.status);
  let $div = document.querySelector('#response-result');
  $div.textContent += 'DONE : '+ rep.status;
  return res.json(); 
}).then((jsonData) => {
  console.log(jsonData);
}).catch((err) => {
  console.log('錯誤:', err);
});

```
# Fetch相關介面說明
fetch的核心由GlobalFetch、Request、Response與Headers四個介面(物件)與一個Body(Mixin混合)。概略的內容說明如下:

- GlobalFetch: 提供全域的fetch方法
- Request: 要求，其中包含method、url、headers、context、body等等屬性與clone方法
- Response: 回應，其中包含headers、ok、status、statusText、type、body等等屬性與clone方法
- Headers: 執行Request與Response中所包含的headers的各種動作，例如取回、增加、移除、檢查等等。設計這個介面的原因有一部份是為了安全性。
- Body: 同時在Request與Response中均有實作，裡面有包含主體內容的資料，是一種ReadableStream(可讀取串流)的物件

## Request(要求)
Request 物件中可以包含的屬性值，可以看到設定值相當多，可以依使用情況設定到很細:

- method: GET, POST, PUT, DELETE, HEAD。
- url: 要求的網址。
- headers: 與要求相關的Headers物件。
- referrer - no-referrer, client或一個網址。預設為client。
- mode - cors, no-cors, same-origin, navigate。預設為cors。Chrome(v47~)目前的預設值是same-origin。
- credentials - omit, same-origin, include。預設為omit。Chrome(v47~)目前的預設值是include。
- redirect - follow, error, manual。Chrome(v47~)目前的預設值是。manual。
- integrity - Subresource Integrity(子資源完整性, SRI)的值
- cache - default, no-store, reload, no-cache, 或 force-cache
- body: 要加到要求中的內容。注意，method為GET或HEAD時不使用這個值。


## Response(回應)
- Response 物件中包含的屬性摘要如下:
- type: basic, cors
- url: 回應網址
- useFinalURL: 布林值，代表這個網址是否為最後的網址(也可能是重新導向的網址)
- status: 狀態碼 (例如: 200, 404, 500...)
- ok: 代表成功的狀態碼 (狀態碼介於200-299)
- statusText: 狀態碼的文字 (例如: OK)
- headers: 與回應相關的Headers物件


# 參考文件 
 - https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html
 - https://wcc723.github.io/javascript/2017/12/28/javascript-fetch/
 - https://shubo.io/what-is-cors/