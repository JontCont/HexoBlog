---
title: JavaScript - typeof 運算子
categories: 
  - 前端技術
  - javascript
  - ES6 
tags: 
  - javascript
description:
keyword: 'ES6, typeof  ,網頁'
cover: /img/js-typeof/bg.jpg
---

## 前言
近期看到 JavaScript 中，有很多人使用 typeof 讓我想要玩玩看 typeof 是什麼特性。typeof 使用範圍常常是在 if 當中使用，讓我們直接實作typeof吧!

# typeof 簡介
## 一、使用方式
typeof 是一個 運算子(operator)。使用時機是查看 value 是什麼型態，也能把它當成除錯的(typeof)關鍵詞。 
```js
typeof operand
```

## 二、文件說明
以下為 MDN Web typeof operator result 說明。
![](/img/js-typeof/typeof_desc.jpg)

# 使用 typeof  
看範例可以發現使用難易度不大。這邊範例我使用 var 變數，有用過JavaScript都知道，var是非常難控管常常會有過不是自己想要的結果。
從下方範例 str 我給它初始賦值為 ""，想必知道 result 為 string 。 
```js
var str ="";
console.log(typeof str); // string
```
範例是明確給予初始賦值。當如果沒有給予初始賦值情況如下:

```js
var str;
console.log(typeof str); // undefined
```
可以發現範例中，沒有明確給予賦值回傳結果為```undefined```，這個特性可以利用這個typeof預防undefined問題。
> [補充] : 這裡可以理解為尚未分配的初始變數(初始賦值) Typeof 視為 ```undefined``` 不會是 ```null```。


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
Typeof 對上 function 也能使用typeof取得型態，寫法如同上方一樣，請各位參閱下方範例。

```js
function Get_StrData(str){
    return this.str;
}
let result = Get_StrData("John");
console.log("typeof return : " + typeof result)
```

範例中需要小心 Reuslt 內容， 如果建構子所建立出來的物件為 object，不注意使用會遇到 null / undefined 。
這需要請各位使用判斷需要留意的點。
 
## 三、補充
### 1. undefined表示
undefined表示"缺少值"，就是此處應該有一個值，但是還沒有定義。典型用法是：

- 變數被聲明了，但沒有賦值時，就等於 undefined。
- 呼叫函式時，應該提供的參數沒有提供，該參數等於 undefined。
- 物件沒有 "沒有賦值"的屬性，該屬性的值為 undefined。
- 函式沒有回傳值時，預設回傳 undefined。

{% note info flat %}
  ### [Ashe Li] - 對 Host object 使用 typeof
  Host object 前提是沒有實作 Call，因為有實作就視為 function
  - 如果是 typeof new val(建構式) ，回傳 Object
  - 如果是 typeof 包裝物件(wrapper objects) ，回傳 包裝物件(wrapper objects) 之後的型別。
{% endnote %}

### 2. 使用方向 
typeof 不單單查看型態，可以判斷使用者輸入的值是否允許的型態。例如 : 輸入年齡、數量、體種可以卡 "number" 判斷。

必須要小心使用 object 部分，因為值為 null 並非是缺少值的一種在判斷中，需要防null的問題。

### 3. 參考文件 
- [YDKJS (Type) : 初學者第一坑 - typeof 運算子, 詳解 undefined 11th鐵人賽](https://ithelp.ithome.com.tw/articles/10218815 )

- [MDN Web Docs](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/typeof)

- [[筆記] JavaScript 中利用 typeof 檢驗運算元所代表的型別](https://pjchender.blogspot.com/2016/07/javascript-typeof.html)