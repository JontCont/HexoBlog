---
title: JavaScript - serialize() 方法
categories: 
  - 前端技術
  - javascript
  - ES6
tags: 
  - javascript
description:
keyword: 'ES6, serialize  ,網頁'
cover: /img/js-serialize/bg.png
---
## 前言
近期整理公司的 JavaScript 發現很多人使用著直接抓取 val()，繼上一篇提到 typeof 後，我又馬上做出 ```serialize()``` 章節，希望大家只要是全讀範圍的 input 請使用 ```serialize()``` 減少 ```undefined```問題。 

# serialize()方法
簡單來說是一種序列化，目的是為了將input 、select 、textarea等輸入框轉成序列化方式。

## 序列化
序列化是將物件狀態轉換為*可保存*或*可傳輸格式*的形式。[ps : 下次章節會詳細介紹 序列化 VS 反序列化]

- 檢視 $('form').serialize() 內容
```js
$('#submit').click(function(){
    let form = $('form').serialize();
    console.log(form);// name=john&old=21&date=2021/12/11
})
```

## 使用範例
簡單創建幾個input值以及form，如果有強迫症請自行排版。清楚看到這是我們平常讓User去Key時候，常用到的樣板。
```html
    <form role="form" action="post">
        <label for="name" name='text1'>姓名</label>
        <input type="text" name="name">
        <label for="name">年齡</label>
        <input type="number" name="old">
        <label for="name"></label>
        <input type="date" name="date">
        <button type="button" name="" id="submit">提交</button>
    </form>
    <script src="index.js"></script>
```
未來遇到 submit 傳到ajax額外新增，又不想自動submit如下方寫法。如果你是這麼撰寫js會不時遇到資料庫內容有 ```undefined```，原因可能是不存在的物件、變數，請避免使用下方範例。
```js
function AjaxForm(select) {
    $.ajax({
        type: 'POST',
        async: false,
        url: url,
        data: {
            "name": function () { return $('[name="name"]').val(); },
            "old": function () { return $('[name="old"]').val(); },
            "date": function () { return $('[name="date"]').val(); },
        },
    })
}
```
這樣就完成傳值了，下方範例意思為 form 會將裡面的input 所有的值轉換成序列，效果如同上方範例。上下方法內容回傳一樣，下方可以減少錯字的危機、減少行數，請各好好善用.serialize()功能。
```js
function AjaxForm(select) {
    $.ajax({
        type: 'POST',
        async: false,
        url: url,
        data: $('form').serialize()
    })
}
```
