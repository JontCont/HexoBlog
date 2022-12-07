---
title: 使用 Hexo (三) -  使用 HEXO 套件
categories: HEXO
tags: 
  - 筆記 / 生活雜記
  - HEXO
description:
keyword: 'HEXO,Web,Hexo butterfly,Hexo 套件,Hexo套件'
cover: /img/Hexo/day_03_UseHexo/hexo.png
---

## 前言
上一篇提到簡易的創建方式，可以讓各位順利創建。
本章會教你簡單的套件，馬上就可以創建留言、音樂、書籍、影視評論等，剩餘功能委屈各位自行去作者文章測試研究<(＿　＿)>。

---
# 套件 
簡易步驟依據作者操作即可。
 - [線上留言板](https://butterfly.js.org/posts/ceeb73f/#%E5%9C%A8%E7%B6%AB%E8%81%8A%E5%A4%A9)


## 留言板-[Disqus](https://disqus.com/)
Disqus是以使用社群網路形式，向網路社群提供網站留言服務的公司。該公司的平台提供不同的功能，例如與不同社群網路服務連結、社群網路、使用者個人檔案、垃圾宣傳及審核工具、數據分析、電子郵件通知和在行動裝置留言等。

### 使用方式
1. 按下 GET STARTED
![](/img/Hexo/day_03_UseHexo/img-02.png)
2. 按下 [I want to install Disqus on my site]
![](/img/Hexo/day_03_UseHexo/img-03.png)
3. 輸入網站名稱，這邊會直接對應 short name ，若有重複會提示出來。
![](/img/Hexo/day_03_UseHexo/img-04.png)
4. 主要注意 3.Configure Disqus、4.Setup Moderation步驟。
![](/img/Hexo/day_03_UseHexo/img-05.png)
Website URL -> Blog的Url [ https://username.githun.io/ ]
![](/img/Hexo/day_03_UseHexo/img-06.png)
這邊是評論的審核機制，你可以選擇不受限的 `Balanced`，或是評論是需要經過系統審核或有限的 `Strict`，差異解說如下：
-   圖片、影片或連結`允許/不允許`在留言裡
-   訪客留言是`允許/不允許`的
-   留言被 flagged (被標記有害的意思?) `5次/3次` 會被送到待審核的機制中
-   留言內有限制或敏感字的部份都會被自動刪除
-   [有害的評論](https://help.disqus.com/en/articles/1717255-toxic-mod-filter) `需要你的審核才能顯示/自動刪除`
-   `Strict` 的部份，話題(Threads)會在 30 天後自動關閉
![](/img/Hexo/day_03_UseHexo/img-07.png)
### config.yml 設定
shortname 通常創建是與Website Name一樣，若想確認可以到設定區域按下 Edit Settings 。
下方是設定 Disqus方式，shortname確認好後，就將名稱貼在 [short-name]。
```yml
comments:
 use:
 	- Disqus

 text: true # Display the comment name next to the button
 
 lazyload: false
 count: true # Display comment count in post's top_img
 card_post_count: true # Display comment count in Home Page

disqus:
 shortname: <short-name>
 apikey: # For newest comments widget
```
### 查看shortname
![](/img/Hexo/day_03_UseHexo/img-08.png)
![](/img/Hexo/day_03_UseHexo/img-09.png)

---
## 音樂
音樂部分需要安裝 `hexo-tag-aplayer`。
### 安裝方式 
```npm install --save hexo-tag-aplayer```
安裝完之後，請至最面層_config裡面設定，因需要全域都插入aplayer和meting資源，為了防止插入重複的資源，需要把asset_inject設為`false`
```yml
aplayer:
  enable: true
  asset_inject: false
```
在themes裡面 _config.yml設定
```yml
aplayerInject:
  enable: true
  per_page: true
```
### 插入Aplayer html
如果要有整個Blog有播放效果，如下設定:
```yml
在themes裡面 _config.yml設定
inject:
  head:
  bottom:
    - <div class="aplayer no-destroy" data-id="003fA5G40k6hKc" data-server="tencent" data-type="artist" data-fixed="true" data-mini="true" data-listFolded="false" data-order="random" data-preload="none" data-autoplay="true" muted></div>
```
{% note info flat %}
  本文 data-id 是用 [qq音樂](https://y.qq.com/) 擷取 id，如下範例：URL : [ https://y.qq.com/n/ryqq/singer/0025NhlN2yWrP4/ ]
  我們的 data-id 就是 [0025NhlN2yWrP4]
{% endnote %}
---

## 電影
電影界面使用了插件 hexo-butterfly-douban
### 安裝方式 
```branch
$ npm install hexo-butterfly-douban --save
```
安裝完之後，請至最面層_config裡面設定。builtin設定為`true`會創建一[ book 、 movie 、 game]的頁面(自動產生)。
```yml
douban:
  user: mythsman
  builtin: true
  book:
    title: 'This is my book title'
    quote: 'This is my book quote'
    meta: true
    comments: true
    top_img: https://cccccc.png
    aside: true
    path: books
    limit:
  movie:
    title: 'This is my movie title'
    quote: 'This is my movie quote'
    meta: true
    comments: true
    top_img: https://cccccc.png
    aside: true
    path: movies
    limit:
  game:
    title: 'This is my game title'
    quote: 'This is my game quote'
    meta: true
    comments: true
    top_img: https://cccccc.png
    aside: true
    path: games
    limit:
  timeout: 10000 
```
### 參數
| 參數     | 解釋                                                         |
| -------- | ------------------------------------------------------------ |
| user     | 你的豆瓣ID.打開豆瓣，登入賬户，然後在右上角點擊 "個人主頁" ，這時候地址欄的URL大概是這樣："https://www.douban.com/people/xxxxxx/" ，其中的"xxxxxx"就是你的個人ID了 |
| builtin  | 是否將生成頁面的功能嵌入`hexo s`和`hexo g`中，默認是`false`,另一可選項為`true`(1.x.x版本新增配置項) |
| title    | 該頁面的標題                                                 |
| quote    | 寫在頁面開頭的一段話,支持 html 語法.                         |
| timeout  | 【可選】爬取數據的超時時間，默認是 10000ms ,如果在使用時發現報了超時的錯(ETIMEOUT)可以把這個數據設置的大一點 |
| meta     | 【可選】插入 `<meta name="referrer" content="no-referrer">` 到頁面，可解決部分瀏覽器無法顯示豆瓣圖片的問題（會導致一些插件出錯，例如 不蒜子計數器。） |
| comments | 【可選】是否顯示評論                                         |
| top_img  | 【可選】是否顯示頂部圖                                       |
| aside    | 【可選】是否顯示側邊欄                                       |
| path     | 【可選】生成的網址<br />movie 頁面默認為 `//yourblog/movies`<br />book 頁面默認為  `//yourblog/books` <br />game 頁面默認為 ``//yourblog/games` |
| limit    | 【可選】限制爬取的頁數                                       |


## 結語
部分還有很多套件沒有使用，之後可能還會修改章節內容，在這告一段落。
如果有想知道其他套件使用方式之類歡迎到下方留言。