---
title: 使用 Hexo (二) - Theme Butterfly  
categories: HEXO
tags: 
  - HEXO
description: 'HEXO官方網站中，有主題(theme)項目可以自行選擇需要哪種主題。
  HEXO THEME 我選擇Butterfly，原因有幾個僅供參考。...'
keyword: 'HEXO,Web'
cover: /img/day_02_UseHexo/hexo.png
---

## 前言
[HEXO](https://hexo.io/themes/)官方網站中，有主題([theme](https://hexo.io/themes/))項目可以自行選擇需要哪種主題。HEXO THEME 我選擇Butterfly，原因有幾個僅供參考。
  1. UI介面 : 乾淨、目錄標題選擇鍵、公告、留言板種類
  2. 文章可讀舒適度
  3. 擴充套件 : 音樂、影視、搜尋等。
  
依據個人喜好、需求選擇自己喜歡的主題d=====(￣▽￣*)b。

---
# 安裝 THEME
我們上一篇只有談到創建HEXO，接著安裝 Theme 可以選擇指令 ```npm``` 或是Git/Github下載下來。
{% note info flat %}
  如果你是用Clone下來，又想要push 到Github上，需要小心 .git 隱藏檔案。
  可能造成會無法push的危機。
{% endnote %}
## [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)
將下載好的theme把檔案放在themes資料夾底下。
![](/img/day_02_UseHexo/img-01.png)
當然可以增加不同的主題放在一起，如下圖。
![](/img/day_02_UseHexo/img-02.png)

下方提供 作者Blog以及Github載點: 
- Jerry Blog: (https://butterfly.js.org/posts/21cfbf15/)
- Butterfly 詳細使用方式 : (https://butterfly.js.org/)

## _config.yml 
config 通稱設定檔，在任何地方都不會太陌生。
設定位置會在外面的 _config.yml ，不會是在主題中的 _config.yml。
![](/img/day_02_UseHexo/img-02.png)

修改內容會是在最下方，也就是在 deploy 上一章提到。依據作者要求修改名稱key進theme即可。Example : ```theme: butterfly``` 

``` yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape

```
---
# 設定個人資訊
## 網站名稱、個人名字設定
設定位置通常會是 config.yml 最上方 ，設定那幾些主要設定名字外，會發現有keywords如果不太陌生的人可以解釋為關鍵詞，有關SEO問題此文就不再詳細說明。

此作者有添加zh-TW語言包，可以直接在這裏面輸入。
```yml
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: Hexo #網頁名稱
subtitle: '' # 網頁副標題
description: '' # 描述
keywords: #關鍵詞
author: John Doe #作者
language: en #語言
timezone: '' 
```

## 主題設定
主題設定請讀者先到themes/_config.yml。
###  aside (側邊欄)
側邊欄設定基本設定完後，就完成你初期Blog。

```yml
aside:
	enable: true
 	hide: false
 	button: true
 	mobile: true # display on mobile
 	position: right # left or right
 	card_author:
 		enable: true
 		description:
 		button:
 			enable: true
 			icon: fab fa-github
 			text: Click Follow
 			link: https://github.com/JontCont
 		card_announcement:
 			enable: true
			content: 歡迎來到我的Blog ，盡量在下方留言
		card_recent_post:
 			enable: true
 			limit: 5 # if set 0 will show all
 			sort: date # date or updated
 			sort_order: # Don't modify the setting unless you know how it works
 		card_categories:
 			enable: true
 			limit: 8 # if set 0 will show all
 			expand: none # none/true/false
 			sort_order: # Don't modify the setting unless you know how it works
 		card_tags:
 			enable: true
 			limit: 40 # if set 0 will show all
 			color: false
 			sort_order: # Don't modify the setting unless you know how it works
 		card_archives:
 			enable: true
 			type: monthly # yearly or monthly
 			format: MMMM YYYY # eg: YYYY年MM月
 			order: -1 # Sort of order. 1, asc for ascending; -1, desc for 		descending
 			limit: 6 # if set 0 will show all
 			sort_order: # Don't modify the setting unless you know how it works
 		card_webinfo:
 			enable: true
 			post_count: true
 			last_push_date: true
 			sort_order: # Don't modify the setting unless you know how it works
```

更詳細安裝說明，請至作者 Blog 設定 (https://butterfly.js.org/posts/21cfbf15/#%E5%AE%89%E8%A3%9D)

## 結語
前面設定主題通常不會遇到任何問題，後面建起頁面、套件設定後發現還有很長的路，設定中不斷被吹殘。下一篇會結束 Hexo 章節，將GitBook文章建立在這裏面o(≧∀≦)o。