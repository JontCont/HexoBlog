---
title: JavaScript 定時器（timer） - setTimeout() VS setInterval()
categories: 
  - 前端技術
  - javascript
  - ES6 
tags: 
  - javascript
description:
keyword: 'ES6, timer,setTimeout,定時器,setInterval'
cover: /img/Web/js/js-serialize/bg.png
---

# 定時器（timer）
定時器在javascript 當中會不知道如何處理定時問題。 不少人會因為要理解使用 Javascript 如何計數相當懊惱，這邊先簡單介紹兩個function熟悉這兩個定義。

## setTimeout vs setInterval
這兩個function 功能上有不相同問題，兩種function定義如下。
1. setTimeout  : 用於在指定的毫秒數後呼叫函式或計算表示式 - (延遲)
2. setInterval : 在播放動畫的時，每隔一定時間就呼叫函式，方法或物件 - (週期)

## setTimeout
timeout 目前是程式界最常看到的詞，定義上有延遲效果，相對可以使用在時間範圍，後面用AJAX說明。

下方範例是透過 setTimeout 指定一段程式碼或函式在多少毫秒(ms)後執行，並回傳此定時器的編號。可以透過 clearTimeout 取消程式碼的執行。
例如：

```js
// 函式會將第一個參數字串使用eval轉換為可執行之程式碼
// 三秒後在 console 印出 "test123"
setTimeout('console.log("test123");',3000);
// 你也可以寫成function
setTimeout(
    function()
    {
        console.log('test123');
    }
,3000);
```


setTimeout()執行方法其實是將須執行程式碼加入任務佇列，直到輪到此程式碼執行時，檢查時間是否到達，若到達則執行程式碼。 舉例來說：
```js
// 單純執行這段程式碼，可以看到實際所執行任務的時間
var startTime= new Date();
setTimeout(function(){console.log(new Date()-startTime);},100);
for(var i=0; i<1000000000; i++){}
```


可以發現 setTimeout 所設定的程式碼，會因為目前任務佇列所執行的程式碼而可能發生延誤執行的狀況。從下方程式碼，可以看到執行 func 的 end 與 start 時間基本上是符合我們所設定的 100 ms。

```js
var startTime=new Date();
var func = function(){
console.log('start: ' + (new Date()-startTime));
for(var i=0; i<1000000000; i++){};
console.log('end: ' + (new Date()-startTime));
setTimeout(func,100);
};
setTimeout(func,100);
// start: 2515
// end: 3457
// start: 3558
// end: 4503
// start: 4604
// end: 5543
// ....
```

## setInterval
綁定在瀏覽器 window 的一個方法，可以透過 setInterval 指定一段程式碼或函式定時在多少毫秒(ms)後執行，並回傳此定時器的編號。可以透過 clearInterval 取消程式碼的執行。
大致用法與 setTimeout 相同，只差在定時執行，因此這邊我們同樣測試延遲執行的問題。可以發現與 setTimeout 一樣是有延遲的狀況發生。

```js
var startTime=new Date();
var func = function(){
console.log('start: ' + (new Date()-startTime));
for(var i=0; i<1000000000; i++){}
console.log('end: ' + (new Date()-startTime));
};
setInterval(func,100);
// start: 2520
// end: 3465
// start: 3466
// end: 4409
// start: 4409
// end: 5350
// start: 5351
// end: 6291
// start: 6292
```

上面這段程式碼的執行結果，與上面的 setTimeout 比較，你會發現 setInterval 的 end 與 start 時間跳動非常大，並不是我們所設定的 100 ms。
由於 setInterval 是一開始就標定了執行時間點，當所註冊的函式(func)超過執行的時間點，結束時則會馬上觸發(func)，因此並不會是固定的 100 ms。

## 補充 
### AJAX Timeout
很多function 常常會遇到延遲或讀取值無法返回問題，當然這邊定義也是可以視為延遲，效果就會從開始到結束相當實用。
```js
$.ajax({
    type: "POST",
    url: "xxxx",
    timeout: 30000, //超時時間：30秒
    dataType: 'json'
    success: function(result) {
        // TODO: check result
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
        //TODO: 處理status， http status code，超時 408
        // 注意：如果發生了錯誤，錯誤資訊（第二個引數）除了得到null之外，還可能
        //是"timeout", "error", "notmodified" 和 "parsererror"。
    }, 
})
```
注意事項
1. 預設的timeout為0，代表永不超時
2. 資料讀取環境。 (如果是遇到 server網路受限或是寬頻受限可以考慮使用此方式)
3. 超時處理

XMLHttpRequest.readyState: 狀態碼
- 0 － （未初始化）還沒有呼叫send()方法
- 1 － （載入）已呼叫send()方法，正在傳送請求
- 2 － （載入完成）send()方法執行完成，已經接收到全部響應內容
- 3 － （互動）正在解析響應內容
- 4 － （完成）響應內容解析完成，可以在客戶端呼叫了


## 結論
最後，利用前面提到的延遲執行(將 setTimeout 與 setInterval 事件放進 task queue)特性，我們可以應用在程式碼執行的順序(比如等 innerHTML 執行完才 document.getElementById)。 舉例來說：

```js
setTimeout(function() {
console.log("想最後執行的一段程式碼(getElementById)");
}, 0);
function a(x) {
console.log("a() 開始 innerHTML");
b(x);
console.log("a() 結束 innerHTML");
}
 
function b(y) {
console.log("b() 開始");
console.log("傳入的值" + y);
console.log("b() 結束");
}
console.log("程式碼開始");
a(42);
console.log("程式碼結束");
 
// 執行結果：
// 程式碼開始
// a() 開始 innerHTML
// b() 開始
// 傳入的值42
// b() 結束
// a() 結束 innerHTML
// 程式碼結束
// 想最後執行的一段程式碼(getElementById)

```