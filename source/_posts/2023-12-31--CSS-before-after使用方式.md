---
title: 【CSS】before、after 使用方式
date: 2023-12-31 20:10:02
categories: 
  - 前端技術
  - css
tags: 
  - 前端
description:
cover: /image/20230901_23-21-50.png
---

## 定義
- ::before 原本的元素[之前]加 入內容
- ::after 原本的元素[之後]加 入內容

### 使用方式
- 使用時，需要加上content 才能使用
- 產生出來虛擬元素為inline特性。無法控制寬、高、行距
- 有關SEO內容，不應該放在content內
- content:搜尋引擎找不倒裡面的文字
- 可以減少HTML標籤數量，相對也加重瀏覽器的渲染區塊
  
#### 偽元素

```css
@charset "UTF-8";

.box {
	background-color: yellowgreen;
	width: 500px;
	padding: 15px;
	margin-left: auto;
	margin-right: auto;
}

.box::before {
	content: "我是 before";
	background-color: pink;
	display: block;
}

.box::after {
	content: "我是 after";
	background-color: wheat;
	display: block;
}
```

#### 反轉

{% tabs temp %}
<!-- tab Html -->
```html
<body>
    <div class="base">
        <div class="base-text">text</div>
        <div class="base-photo">photo</div>
    </div>

    <div class="base flip">
        <div class="base-text">text</div>
        <div class="base-photo">photo</div>
    </div>
    
    <div class="base">
        <div class="base-text">text</div>
        <div class="base-photo">photo</div>
    </div>
    
    <div class="base flip">
        <div class="base-text">text</div>
        <div class="base-photo">photo</div>
    </div>
</body>
```
<!-- endtab -->

<!-- tab css -->
```css
@charset "utf-8";

*,
*::before,
*::after {
    box-sizing: border-box;
}

.flip .base-text {
    float: right;
}

.flip .base-photo {
    float: left;
}

.base {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.base::after {
    content: "";
    display: block;
    clear: both;
}

.base-text,
.base-photo {
    width: 50%;
    padding: 15px;
}

.base-text {
    float: left;
    background-color: yellowgreen;
}

.base-photo {
    float: right;
    background-color: pink;
}
```
<!-- endtab -->
{% endtabs %}

![](/image/20231231_19-34-59.png)


#### 麵包屑

```css
/* @charset "utf-8"; */
/* Base */
* {
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, "微軟正黑體", sans-serif;
    font-size: 15px;
}

.breadcrumb{
    margin-top: 20px;
    margin-bottom: 20px;
}

.breadcrumb__item a:hover{
    color: #2ea3f2;
}

.breadcrumb__item + .breadcrumb__item::before{
    content: "»";
    margin-right: 3px;
    color:#aaa;
}
.breadcrumb__item a{
    color: #aaa;
}
```

