---
title: 【HTML】-何謂 robots.txt 
date: 2021-07-03
categories: 
  - 前端技術
  - html
tags: 
  - front-end
  - 前端
description:
keyword: 'HTML, robots'
cover: https://www.yestupa.com/wp-content/uploads/2019/06/2019062605511781.png
---
# 前言
許多前端工程師都有相關rebots使用經驗，為了增加 SEO 通常會使用robots，讓使用者可以快速查自己的網站，robots.txt 可以從各樣的網站可以看到。本篇會簡述rebots ，若需要細項說明可以請至下方點選查詢。


# robots 簡介
robots 是主要功用哪個頁面可以檢索、索引。使用方面會直接影響 SEO 。

## 何謂 SEO 搜尋引擎最佳化
SEO(Search Engine Optimization)，透過搜尋引擎運作規則調整網站，提高網站相關搜尋引擎排名。搜尋引擎針對檢索(Crawl)、索引(Index)的網站資訊，進行演算法排序提供使用者查詢。

## robots 使用方式
robots 只需要使用 txt 撰寫，必須要留意要使用**UTF-8**編碼的文字檔。設定方式預設允許所有搜尋引擎檢索所有內容，有兩種做法。

### 不填入disallow內容
```txt
User-agent: *
Disallow:
```
### allow 使用 /符號
/ : root 根目錄，在這可以解釋從root開始都允許檢索所有檔案。
```txt
User-agent: *
Allow: /
```

### 檢測方式
如果你要查詢網站是否有沒有 robots 可以在每個 url 後面加上 robots.txt 就可以查看到
``` url
    https://www.google.com/robots.txt
```


## 網頁爬蟲影響
需要進行爬蟲時候，通常會先查閱內部會不會有主檔需要爬的內容，目前爬蟲使用方式很多種，相關應用後續會執行一遍給各位參考。


# 文件參考
1. Google 說明文件 : https://developers.google.com/search/docs/advanced/robots/create-robots-txt?hl=zh-tw
2. robots.txt用途與使用範例教學，釐清SEO收錄觀念！: https://awoo.ai/zh-hant/blog/robotstxt-crawl/
3. 搜尋引擎最佳化 : https://zh.wikipedia.org/wiki/%E6%90%9C%E5%B0%8B%E5%BC%95%E6%93%8E%E6%9C%80%E4%BD%B3%E5%8C%96
