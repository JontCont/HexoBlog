---
title: 【JS】停止事件 preventDefault()
date: 2021-07-19
categories: 
  - 前端技術
  - javascript
tags: 
  - javascript
description:
keyword: 'ES6, 停止事件 ,Param'
cover: /img/Web/js/js-serialize/bg.png
---

近期遇到比較麻煩的問題"非同步"問題，像是form submit之前不能確保一定完成執行，相對需要使用所謂的sleep相關作法，一開始以為可以成功結果一觸發事件就會submit 事件...。

## 停止事件
JavaScript事件，最常用的是onclick、onchange之類，本身事件中可以呼叫出event 事件。event 事件會紀錄著事件觸發的狀態。


## event.preventDefault()
這做法可以延遲提交內容，如果用```return false``` 會讓他失效，比較有效方式可以使用這個，先讓他把事件暫停加入我們想要的功能即可。目前遇到非同步時候最有效的做法。

```js
$('form').submit((event)=>{
  let form = this;
  event.preventDefault();
  
  setTimeout(()=>{
      form.submit();
  }, 1000);
})

```
### 測試範例
```js
$('button').click((event)=>{
  event.preventDefault();
  
  setTimeout(()=>{
    console.log('一秒後執行');
  }, 1000);
})

```
---

## event.stopPropagation()
這事件是針對多個div 重疊後，啟動click會產"事件冒泡"。功能主要是阻止事件冒泡，後續在補充。