---
title: 【JS】正規表示式(二) Regular Expression
date: 2021-07-16
categories: 
  - 前端技術
  - javascript
tags: 
  - javascript
description:
keyword: 'ES6, 正規表示式,Regular,regex'
cover: /img/Web/js/reg_bg.png
---

正規表示式是最常見的一個功能，不論是字串過濾、轉換、判斷相當實用。這篇使用JS方式使用，後續如果有空就會撰寫其他版本的寫法。


# JS 正規表示式 
## 使用工具
本篇使用方式是大家都可以使用的```DevTools```，如果不知道這東西可以點開瀏覽器並按下F12。

第一次發現視窗太小，可以參考下方圖片。

![](/img/js/context/DevTools_001.png)
![](/img/js/context/DevTools_002.png)


## 開始使用
使用方式是需要選擇主控台即可，其餘的先暫時不理會。

![](/img/js/context/DevTools_003.png)


### 初始化
初始化方式可使用下面兩種寫法，一種前後加入斜線就可以達成效果。
```js
let re = /Hello/;

```
```js
let reg = new RegExp('Hello world in JavaScript');
```

## text、exec、search 使用方式
text 測試字串是否有府和字串，回傳方式會是boolean。
以下測試可以使用 ```/i```：不區分大小寫，```/g```：比對字串所有位置 

```js
let re = /Hello/i;
re.test('hello'); //true
```

```js
let re = /Hello/g;
re.test('hello'); //false
```
---
exec 與test 不同於可以顯示比較詳細的內容，若不存在會以null方式呈現。
```js
let re = /Hello/i;
re.exec('hello'); //['hello', index: 0, input: 'hello', groups: undefined]
```

```js
let re = /Hello/g;
re.exec('hello'); //null
```
---
search 與 indexOf 相同，找尋字串中會去抓取第幾位個位置，主要是數值呈現。

```js
let str ='hello world in JavaScript';
str.search('he');     //0

//indeOf比較
str.search('world');  //6
str.indexOf('world'); //6

//找不到
str.search('world1'); //-1
```

## 特殊字元
特殊字元有很多種類可以使用看看效果，像是上一張標中有提到 ```^```匹配輸入的開頭。

```js
let str ='hello world in JavaScript';
let re = /^hello/;
str.match(re); //['hello', index: 0, input: 'hello world in JavaScript', groups: undefined]

str.match(/^Hello/); //null

```
如果是 ```$```用法則會在結尾時取得。

```js
let str ='hello world in JavaScript';
let re = /pt$/;
str.match(re); //['pt', index: 23, input: 'hello world in JavaScript', groups: undefined]

str.match(/pt4/); //null
```

有時候常常遇到需要用```\b```使用這方式，可以參考下方。

```js
const regex = /./   // 比對換行符號外的任意一個字元
const regex = /\d/  // 比對一個數字，相等於 /[0-9]/
const regex = /\w/  // 比對一個英文、數字或底線，相等於 /[A-Za-z0-9_]/
const regex = /\s/  // 比對一個的空格 (ex: space, tab, 換行, ...)
const regex = /[^\w]/
```

## 集合 
這邊就會比較多人需要使用這段，原則上如果要判斷序號、數值就可以用這個來排除。
下方範例兩種寫法是都可以呈現A-Z效果。
```js
let regex = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/
let regex = /[A-Z]/
```

同樣數字也可以呈現，特別需求可以將數字跟英文字合併。
```js
let regex = /[0123456789]/
let regex = /[0-9]/

let regex = /[A-Za-z0-9]/
```


## 量詞 {}
量詞方式會由{}修飾  ```/\d\d\d\d\d/ ``` 可以變成 ```/\d{5}/```。 
```js
// 使用 {5} 表示連續出現 5 次
let regex = /\d{5}/
regex.exec('abcde12345') // ["12345", index: 5, ...]
regex.exec('a1b2c3d4e5') // null
```

```js
// 使用 ? 表示出現 0 或 1 次，等同於 {0,1}
const regex = /\w?/
// 使用 + 表示出現 1 次或以上，等同於 {1,}
const regex = /\w+/
// 使用 * 表示出現 0 次或以上，等同於 {0,}
const regex = /\w*/
```

```js
// '+' 出現的次數越多優先
const regex = /a\+{2,}/
regex.exec('a+++++') // ["a+++++", index: 0, ...]
// '+' 出現的次數越少優先
const regex = /a\+{2,}?/
regex.exec('a+++++') // ["a++", index: 0, ...]
```