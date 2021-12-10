---
title: JavaScript - typeof 運算子
categories: ES6 Web 技術 
tags: 
  - javascript
description:
keyword: 'ES6, typeof  ,網頁'
cover: /img/js-typeof/bg.jpg
---

## 前言
之前在撰寫 JavaScript 遇到很多，不知道變數是甚麼型態。這次試用看看 typeof 如何查出型態。

# typeof 簡介
## 一、使用方式
```js
typeof operand
```
## 二、文件說明
![](/img/js-typeof/typeof_desc.jpg)

# 使用 typeof  
看範例可以發現使用難易度不大。有用過JavaScript都知道，var是非常難控管，讓我們用 var 如何實作typeof。

```js
var str ="";
console.log(typeof str); // string
```
這範例是明確使用 string 型別。如果不明確使用方式如下:

```js
var str;
console.log(typeof str); // undefined
```
可以發現範例中，沒有明確說明什麼型別會回傳 ```undefined```，利用這個typeof預防undefined問題。
[補充] : 這裡可以理解為尚未分配的變數初始內容為 ```undefined```，不會是 ```null```。


## 一、輸出範例
** 注意: ```null``` 在typeof為 object 。 ** 
```js
var result;

result = "";
console.log("typeof return : " + typeof result);
//typeof return : string

result = 1;
console.log("typeof return : " +typeof result);
//typeof return : number

result = true;
console.log("typeof return : " +typeof result);
//typeof return : boolean

result = []; //或是使用null
console.log("typeof return : " +typeof result);
//typeof return : object

result = undefined
console.log("typeof return : " +typeof result);
//typeof return : undefined

```

## 二、typeof 取得 Function 型別
從下方範例看，function 也能使用typeof取得型態，寫法如同上方一樣，請各位參閱。

```js

function Get_ObjectData(){
    return [];
}

console.log("typeof return : " + typeof Get_ObjectData())
```
 
## 三、補充
### 1. undefined表示
undefined表示"缺少值"，就是此處應該有一個值，但是還沒有定義。典型用法是：

- 變數被聲明了，但沒有賦值時，就等於 undefined。
- 呼叫函式時，應該提供的參數沒有提供，該參數等於 undefined。
- 物件沒有 "沒有賦值"的屬性，該屬性的值為 undefined。
- 函式沒有回傳值時，預設回傳 undefined。

### 2. 使用方向 
typeof 不單單查看型態，可以判斷使用者輸入的值是否允許的型態。例如 : 輸入年齡、數量、體種可以卡 "number" 判斷。

必須要小心使用 object 部分，因為值為 null 並非是缺少值的一種在判斷中，需要防null的問題。

### 3. 參考文件 
- [YDKJS (Type) : 初學者第一坑 - typeof 運算子, 詳解 undefined 11th鐵人賽](https://ithelp.ithome.com.tw/articles/10218815 )

- [MDN Web Docs](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/typeof)

- [[筆記] JavaScript 中利用 typeof 檢驗運算元所代表的型別](https://pjchender.blogspot.com/2016/07/javascript-typeof.html)