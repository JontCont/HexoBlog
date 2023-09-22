---
title: (筆記) Javascript - Callback Function 回呼函式
categories: 
  - 前端技術
  - javascript
tags: 
  - js
  - Callback
description:
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Callback-notitle.svg/740px-Callback-notitle.svg.png

---
# Callback function - 回呼函式
是指能藉由參數（argument）通往另一個函式的函式。它會在外部函式內調用、以完成某些事情。

## 使用種類
### 一般使用function
開發常見使用個別function去做執行動作。
```js
A = () => {
    console.log('這是 A functions');
}

B = () => {
    console.log('這是 B functions');
}

A();
B();
```

### B function 成為 A function 的參數
這邊是將參數設為call，讓 B function 填的位置。這樣就可以達成簡易版本的callback。
```js
A=(call)=>{
    console.log('這是function A');
    call();
}

B=()=>{
    console.log('這是function B');
}
A(B);
```

下方則是利用 ```prompt```方式傳入B function 參數中。
```js
A=(call)=>{
    let name = prompt('請輸入名字');
    call(name);
}

B=(name)=>{
    console.log('哈摟 '+name+'!! 這是CallBack 測試');
}
A(B);
```

### 非同步處理(asynchronous callback)
以下可能會遇到需要延遲的event ，這如果要考量執行順序需要小心執行。執行順序可以考慮使用 async、await 。 
```js
A=(call)=>{
    console.log('這是function A');
    setTimeout(()=>{
         call();
    },2000);
   
}

B=()=>{
    console.log('這是function B');
}
A(B);
```

下方使用非同步方式處理。
```js
B = () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{ resolve('async B function') },2000)
    })//return
    
}//B()

A = async(call) => {
    console.log('A function');
    console.log(await call());
}

A(B);
```

## 使用時機
- [MDN Web Docs](https://developer.mozilla.org/zh-TW/docs/Glossary/Callback_function)

從MDN Web Docs 得知，CallBack 常使用於非同步動作執行。常見案例 : Google API、Geolocation API 、GPS定位等，利用非同步取得 GPS 的設備坐標。


