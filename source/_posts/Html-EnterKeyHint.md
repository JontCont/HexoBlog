---
title: HTML - Enter Key Hint
categories: Web 技術 
tags: 
  - Web 技術 
  - HTML 
description:
keyword: 'HEXO,Web,Hexo butterfly,Hexo 套件,Hexo套件'
cover: /img/html-enterkeyHint/enterkeyHint.jpg
---

## 前言
最近看到有一篇有關EnterKeyHint文章，整個手癢跑去玩玩看，官方說明這方式是針對虛擬鍵盤才會出現的效果，如下面表格:

| Keyword    | Description                                                                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enter`    | The user agent should present a cue for the operation ‘enter’, typically inserting a new line.                                                                   |
| `done`     | The user agent should present a cue for the operation ‘done’, typically meaning there is nothing more to input and the input method editor (IME) will be closed. |
| `go`       | The user agent should present a cue for the operation ‘go’, typically meaning to take the user to the target of the text they typed.                             |
| `next`     | The user agent should present a cue for the operation ‘next’, typically taking the user to the next field that will accept text.                                 |
| `previous` | The user agent should present a cue for the operation ‘previous’, typically taking the user to the previous field that will accept text.                         |
| `search`   | The user agent should present a cue for the operation ‘search’, typically taking the user to the results of searching for the text they have typed.              |
| `send`     | The user agent should present a cue for the operation ‘send’, typically delivering the text to its target.                                                       |

這功能只有手機版本的虛擬鍵盤才看得見，若你要用windows的虛擬鍵盤是看不見的歐!!ヽ(*。>Д<)o゜

# 創建Html
我們創建簡單易點的html，不需要殘虐自己一定要把版面排很齊。參考以下範例：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    div{
        margin: 10px;
    }
    div>label{
        display: block;
    }
</style>
<body>
    <div>
        <label>Enter:</label>
        <input type="text" value="" enterkeyhint="enter">
    </div>
    <div>
        <label>Done:</label>
        <input type="text" value="" enterkeyhint="done">
    </div>
    <div>
        <label>Go:</label>
        <input type="text" value="" enterkeyhint="go">
    </div>
    <div>
        <label>Next:</label>
        <input type="text" value="" enterkeyhint="next">
    </div>
    <div>
        <label>Previous:</label>
        <input type="text" value="" enterkeyhint="previous">
    </div>
    <div>
        <label>Search:</label>
        <input type="text" value="" enterkeyhint="search">
    </div>
    <div>
        <label>Send:</label>
        <input type="text" value="" enterkeyhint="send">
    </div>
</body>
</html>
```
這幾些都是要focus在輸入框裡面就可以看得見，如下圖，這樣就會提升UI操作順暢。

{% gallery %}
![](/img/html-enterkeyHint/01.png)
![](/img/html-enterkeyHint/02.png)
![](/img/html-enterkeyHint/03.png)
![](/img/html-enterkeyHint/04.png)
![](/img/html-enterkeyHint/05.png)
![](/img/html-enterkeyHint/06.png)
![](/img/html-enterkeyHint/07.png)
{% endgallery %}

## 題外話
Stefan Judis 曾經在2020年有提到 Enterkeyhint ，有支援 Safari 瀏覽器(IOS)，有興趣的人可以實驗看看。FireFox事實上是有出現，只是不像是Chrome一樣馬上出現，必須要按下去(Enter)才會出現，使用上需要自己拿捏使用方式，以免被客戶要求強迫修改。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Safari now supports `enterkeyhint`. 👏 <br><br>I always like it when the enter key gives me more context. 👇<br><br>🔗 Spec: <a href="https://t.co/IOQkUsjB6f">https://t.co/IOQkUsjB6f</a><a href="https://twitter.com/hashtag/devsheets?src=hash&amp;ref_src=twsrc%5Etfw">#devsheets</a> <a href="https://t.co/7HHX77Jow7">pic.twitter.com/7HHX77Jow7</a></p>&mdash; Stefan @ goto CPH 🇩🇰 (@stefanjudis) <a href="https://twitter.com/stefanjudis/status/1249958064041734144?ref_src=twsrc%5Etfw">April 14, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 文件參考

### [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/enterKeyHint)

### [CSS-TRICKS](https://css-tricks.com/enterkeyhint/)