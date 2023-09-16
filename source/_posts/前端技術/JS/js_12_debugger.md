---
title: Javascript - 常見 除錯(debugger) 方式
categories: 
  - 前端技術
  - javascript
  - ES6 
tags: 
  - js
  - debugger
description:
cover: /image/20230916_09-11-23.png
---

javascript 是前端必備之一的工具，開發過程中，有時候會遇到一些問題、驗證資料，這時候就需要使用到debugger來幫助我們找出問題。

## 除錯(debugger)的使用方式
javascript 除錯方式比較常見為 ```console```、```alert()```，以下介紹常見的javascript 除錯方式。

1. ```console``` : 這功能比較常見為 ```log()```、```warn()```、```error()```，可以快速知道錯誤、問題內容。
2. ```alert``` : 這功能期初是用來提示使用者的，但也可以用來除錯，但是會有一個缺點，就是會中斷程式的執行，操作上也會綁手綁腳。
3. ```debugger``` : 這功能是javascript內建的除錯功能，可以在瀏覽器中直接使用，不需要額外安裝套件，也不會中斷程式的執行，操作上也比較方便。
4. ```try...catch``` : 這功能是javascript內建的除錯功能，可以在瀏覽器中直接使用，不需要額外安裝套件，也不會中斷程式的執行，操作上也比較方便。

---
### 一、console
基本上比較少人使用 ```warn()```、```error()```，通常都是使用 ```log()``` ，呈現效果如下方顯示。
![](/image/20230916_09-11-23.png)

補充一點 console 其實還有其他功能 ，例如 : ```table()```、```time()```、```timeEnd()```、```dir()```

#### 1. table()
table() 會將資料以表格方式呈現。table()可以把array 資料轉成表格，方便觀看資料，與log()呈現方式不同，可以參酌使用方式。
![](/image/20230916_09-16-23.png)
![](/image/20230916_09-17-47.png)


#### 2. time()、timeEnd()
```time()```、```timeEnd()``` 會計算程式執行時間，可以用來測試程式執行效率。
*備註 : time與timeEnd必須搭配使用，並且內容必須相同，才能計算出正確的時間。*
```js
console.time('test');
for(let i=0;i<100;i++){
    console.log(i);
}
console.timeEnd('test');
```

#### 3. dir()
```dir()``` 會將資料以物件方式呈現，可以參考下方呈現方式。
![](/image/20230916_09-24-09.png)


---
### 二、alert
alert 是新手常用的除錯、初期學會的方式。alert 限制會比 console 來的多很多，例如 : 物件、陣列、函式等等，都無法正常顯示，所以通常都是用來顯示字串、數字等等。

---
### 三、debugger
debugger 是一個可以讓瀏覽器知道你要停留的位置，會直接到達那個位置，並且可以檢視變數的值，可以參考下方呈現方式。(備註 : 範例使用 console 視窗輸入)

![](/image/20230916_09-59-40.png)

那些除錯視窗會在於 ```source``` 視窗中，可以看變數狀態、stack 、dom 等相關之訊。
![](/image/20230916_10-00-35.png)



---
## 結論
以上介紹了常見的除錯方式，可以依照需求選擇使用方式，但是建議還是以 ```console```、```debugger``` 為主，```alert``` 可以當作是緊急使用方式。

如果是使用前端架構(vue、react、angular等)，這些方式是相當實用的。若是用一般網頁的js、jqery可以直接把資訊印在網頁上除錯，也是除錯方式之一。

這篇簡單介紹到這邊，如果有任何問題，歡迎留言討論。


## 參考文件
- [淺談 JavaScript 中的 Debug 神器 Console](https://israynotarray.com/javascript/20200313/3743352418/)
- [JavaScript Debugging](https://www.w3schools.com/js/js_debugging.asp)

