---
title: 【HTML】套件-簡易操作 IntroJs、DriverJs
categories: 
  - 前端技術
  - 套件
tags: 
  - front-end
  - 前端
description:
keyword: 'HTML, robots'
cover: /img/Web/bg/html_01_bg.png
---

## 前言
近期整理一些文章，看到還有指引套件部分忘記處理，這邊大概簡述兩個比較常見的套件。以兩種套件來說各有好壞，使用指引套件必須要留意Css可能遇到```z-index```順序問題，如果是DriverJs部分可能需要注意css方面比較多一些...。

- [github 範例](https://github.com/JontCont/html_guideJs_template)
- [[前端軍火庫]Intro.js - 把建好的UI直接變成說明文件](https://dotblogs.com.tw/wellwind/2016/12/15/front-end-intro-js)
  
# IntroJs
IntroJs 是用在 html mark當中，設定上相當簡單、快速 。IntroJs 如果是商業用途可能要索取費用。

## 安裝
1. Github :``` git clone https://github.com/usablica/intro.js.git```
2. npm :  ```npm install intro.js --save```
3. yarn  : ```yarn add intro.js```


## 使用方式
依據IntroJs 使用方式，需要設定幾點。
1. 順序 : ```data-step```
2. 內容 : ```data-intro```
3. 提示 : ```data-hint``` (必須要配合 ```introJs().addHints();```處理。)

此套件會依據 step 順序呈現下一步提示，如果要使用"提示點"表示，可以使用使用```data-hint```標記。
```html
    <div class="card card-body" data-step="1" data-intro="這是 card style。由NFC作者取得">
        <div class="imgBx">
            <img src="https://raw.githubusercontent.com/JontCont/Html-BlogUI/main/card-ui/images/1.png" alt="" class="img-item">
        </div>
        <div class="card-content">
            <div class="card-content--title">
                <h2>John Contel's<br/><span>Senior Designer</span></h2>
                <div class="card-content--icon">
                    <li class="li-item"><a href="#"><i class="fab fa-twitter"></i></a></li>
                    <li class="li-item"><a href="#"><i class="fab fa-instagram"></i></a></li>
                    <li class="li-item"><a href="#"><i class="far fa-envelope"></i></a></li>
                    <li class="li-item"><a href="#"><i class="fab fa-facebook"></i></a></li>
                </div>
            </div>
        </div>
    </div>

<script>
    introJs().start();
</script>
```

# [DriverJs](https://kamranahmed.info/driver.js/)
DriverJs 是另一種指引套件，如果是商業使用這個部分可能是參考之一。


## 安裝
1. Github :``` git clone https://github.com/kamranahmedse/driver.js.git```
2. npm :  ```npm install driver.js```
3. yarn  : ```yarn add driver.js```

## 開始使用

### highlight
這邊使用方式是透過html selector 抓取，所以會比IntroJs設定方面可能比較多一些。論單體彈出視窗使用```highlight```即可，如下方範例。
```js
 const driver = new Driver();
 let option = 
     {
         element: '.card-body', 
         popover: {
             title: 'Title for the Popover!',
             description: 'Description for it',
             position: 'top'
         }
     };
 driver.highlight(option);
 driver.start();
```

### defineSteps
如果要呈現上下指引需要跟改為defineSteps，title、description 部分可以使用html方式撰寫。
```js
    const driver = new Driver();

    // Define the steps for introduction
    driver.defineSteps([
    {
        element: '.card-body',
        popover: {
            className: 'first-step-popover-class',
            title: 'Title on Popover',
            description: 'Body of the popover',
            position: 'left'
        }
    },
    {
        element: '.card-content--icon',
        popover: {
            title: 'Title on Popover',
            description: 'Body of the popover',
            position: 'top'
        }
    },
    {
        element: '.imgBx',
        popover: {
            title: 'Title on Popover',
            description: 'Body of the popover',
            position: 'right'
        }
    },
    ]);
    // Start the introduction
    driver.start();
```
