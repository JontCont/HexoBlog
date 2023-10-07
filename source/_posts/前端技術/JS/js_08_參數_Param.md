---
title: JavaScript 參數（Param） - Param()
date: 2021-07-18
categories: 
  - 前端技術
  - javascript
tags: 
  - javascript
description:
keyword: 'ES6, 參數 ,Param'
cover: /img/Web/js/js-serialize/bg.png
---

# 參數（Param）
## 什麼是參數(parameters)
要了解arguments之前，我們必須要先了解什麼是參數(parameter)。參數其實就是我們會帶入函式的變數，以下面程式的例子來說，"phone"、"food"、"job"，就是我們在執行函式的時候可以任意填入的參數。不給任何參數值還是可以執行該函式。
```js
function MyFavorite (phone ,food ,job){
    console.log({
        phone : phone,
        food : food,
        job : job
    });

}

```

## Param()
序列化一個key/value對象，該序列化值可以進行AJAX請求時在URL查詢字串中使用。

|参数 | 描述 |
|-----|------|
|object      | 要進行序列化的數值或對象。| 
|traditional | 規定是否使用傳統的方式淺層進行序列化（参數序列化）。|

### 使用方式
```js
jQuery.param(object,traditional)
```

以下範例執行結果width=1680&height=1050，應用方面可以傳入給ajax。
```js
var params = { width:1900, height:1200 };
var str = jQuery.param(params);
$("#results").text(str);
```


### 範例
```html
<html>
  <head>
    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script type="text/javascript">
      $(document).ready(function(){
      
        personObj=new Object();
        personObj.firstname="Bill";
        personObj.lastname="Gates";
        personObj.age=60;
        personObj.eyecolor="blue"; 
        
        $("button").click(function(){
          $("div").text($.param(personObj));
        });
        
      });
    </script>
  </head>
  <body>
      <button>序列化对象</button>S
  </body>
</html>
```