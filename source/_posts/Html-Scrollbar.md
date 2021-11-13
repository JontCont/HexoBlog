---
title: HTML - Scrollbar
categories: Web 技術 
tags: 
  - Web 技術 
  - HTML 
description:
keyword: 'HTML, scrollbar , 拉軸 ,網頁'
cover: /img/html-srcollbar/scrollbar.jpg
---
## 前言
近期遇到很多UI介面 scrollbar 都不同樣式或是將 scrollbar 用消失減少版面佔住的機會。
可以參考下方滾動條樣式，我再慢慢展示出效果來。

# 如何讓scrollbar出現
第一次用網頁常常遇到 scrollbar 不知道怎樣叫出來，反而不斷跑版。
網頁有分父(容器)層跟子(容器)層，當子層超過父層時候，可以使用 ``` overflow ```。

以下範例 :

```html
<body>
    <div class="container">
        <div class="block-1"></div>
        <div class="block-2"></div>
    </div>
</body>
```
```css
    .container{
        width: 400px;
        height: 200px;
        margin-left: auto;
        margin-right: auto;
        overflow: scroll;
    }
    .block-1{
        width: 100%;
        height: 50vh;
        background-color: #111;
    }
    .block-2{
        width: 100%;
        height: 50vh;
        background-color: #ccc;
    }
```

這樣就得到我們的 scrollbar 。

{% note info flat %}
 補充 : overflow 設定屬性
{% endnote %}
  | 屬性     | 功能                          |
  | ------- | --------------------------- |
  | visible | 預設值。內容不會被修剪，會呈現在元素框之外。      |
  | hidden  | 內容會被修剪，並且其餘內容是不可見的。         |
  | scroll  | 內容會被修剪，但是流覽器會顯示捲軸以便查看其餘的內容。 |
  | auto    | 如果內容被修剪，則流覽器會顯示捲軸以便查看其餘的內容。 |
  | inherit | 規定應該從父元素繼承 overflow 屬性的值。   |
# 使用 scrollbar 
如果要設定修改變更 scrollbar，需要知道webkit設定。
題外話: 前陣子報導駭客組織利用Safari核心引擎WebKit漏洞,讓用戶導向詐騙網站索取個資。
連結 : https://www.ithome.com.tw/news/142770

## webkit
WebKit是一種用來讓網頁瀏覽器繪製網頁的排版引擎。通用瀏覽器內核有 chrome、safari、Blink、Trident等。
目前主流的移動瀏覽器渲染引擎，主要設計是用來讓網頁瀏覽器繪製網頁。

## 設定滾動條樣式
| 偽元素（ Pseudo-element ）                        | 功能          |
| ------------------------------------------------ | ------------- |
| ::-webkit-scrollbar                              | 滾動條         |
| ::-webkit-scrollbar-button                       | 滾動條按鈕(上下箭頭) |
| ::-webkit-scrollbar-thumb                        | 可拖動滾動滑塊     |
| ::-webkit-scrollbar-track                        | 滾動條軌跡       |
| ::-webkit-scrollbar-track-piece                  | 軌道沒有滑塊部份    |
| ::-webkit-scrollbar-corner                       | 滾動條抵繳       |
| ::-webkit-resizer                                | 可拖動的調整大小手把  |

## 展示滾動條樣式
### 隱藏 scrollbar 
依照上面的方式，結論是加上 display就會達到隱藏效果。
```css
    ::-webkit-scrollbar {
        display :none;
    }
```

### scrollbar 滾動條
```css
     ::-webkit-scrollbar-thumb {
       background: linear-gradient(to bottom right, #0080ff, #1a6d0f, #bfff0e, rgb(255, 122, 89));
        border-radius: 10px;
        height: 100px;
    }
```
### scrollbar 軌道
```css
    ::-webkit-scrollbar-track-piece {
        background-color: rgb(255, 212, 249);
    }
```
![](/img/html-srcollbar/img02.PNG)
### scrollbar-button
```css
 ::-webkit-scrollbar-button {
  	width: 10px;
 	height: 10px;
 	background-color: rgb(255, 0, 0); 
 }
```
![](/img/html-srcollbar/img01.PNG)
### scrollbar-corner
```css
 ::-webkit-scrollbar-corner {
 	background-color: rgba(241, 89, 89);
 }
```
![](/img/html-srcollbar/img03.PNG)


## 結論
以上是 scrollbar 調整，如果像是firefox、ie、edge 就會遇到沒有效果的問題。
這幾些功能對付公司網頁 scrollbar 應該是綽綽有餘。
下一期會來探討 [ 瀏覽器內核 ] 有哪些。