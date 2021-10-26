---
title: 使用 Hexo - Day01 建置  
categories: Web 技術 
tags: 
  - Web 技術 
  - HEXO
description: 前幾周 GitBook 改版，擔心會變成FaceBook 、Instagram 一樣當機不能使用，我再次挑戰GitHub Blog 製作。這次不會是....
keyword: 'HEXO,Web'
cover: /img/Cover.png
---

## 前言
前幾周 GitBook 改版，擔心會變成FaceBook 、Instagram 一樣當機不能使用，我再次挑戰GitHub Page 製作 Blog。這次不會是從零到成品，使用工具會在下方提供，再請各位多多支持。

### 何謂Hexo
Hexo 是基於 Node.js 開發架框，有利於快速建立Blog，如以下特點 :
  - 編譯速度快
  - 支援 Markdown 語法解析文章，可使用主題渲染靜態檔案
  - 豐富的外掛套件
  - 支援一鍵部署到靜態網頁的空間，如: GitHub Pages 、Heroku 

---
# 使用工具
## 一、[Node.js]( https://nodejs.org/zh-tw/download/)
**Node.js** 是能夠在伺服器端運行 JavaScript的開放原始碼、跨平台執行環境。Node.js 由 OpenJS Foundation（原為 Node.js Foundation，已與 JS Foundation 合併）持有和維護。Node.js 採用Google開發執行程式碼，使用事件驅動、非阻塞和非同步輸入輸出模型等技術來提高效能，可優化應用程式的傳輸量和規模。

## 二、[Git](https://git-scm.com/)
**git**是一個分散式版本控制軟體，，於2005年以GPL釋出。最初目的是為更好地管理Linux核心開發而設計。應注意的是，這與GNU Interactive Tools（一個類似Norton Commander 介面的檔案管理器）不同。

---
# 安裝Hexo
1. 安裝Hexo

按照官方網去執行指令即可，如下:

``` bash
$ npm install hexo-cli -g
$ hexo init <資料夾名稱>
$ cd <資料夾名稱>
$ npm install
$ hexo server
```

hexo init 是初化 Hexo (建立Hexo)
安裝完成後，進入資料夾會看到下方這些檔案和資料夾：
``` bash
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes

```

## Hexo 檔案
### 一、 _config.yml

-   有關網站配置的檔案，可修改各種配置設定。例如：網站標題、網站的網址、使用主題名稱等等
-   詳細內容可以參考[官方文件](https://hexo.io/zh-tw/docs/configuration)

### 二、package.json

- 記錄所有載入的應用程式資料，也就是專案中需要的所有模組。

### 三、scaffolds 模板

-   當我們建立新文章時，Hexo 會根據 scaffolds 中的模板建立相對應的檔案
-   資料夾中有三種預設[佈局](https://hexo.io/zh-tw/docs/writing.html)：post、page 和 draft，分別對應：要發布的文章、頁面、草稿

### 四、themes 主題

-   用來存放主題的資料夾
-   Hexo 會根據主題來解析 scouce 資料夾中的檔案並產生靜態頁面。預設主題為 [landscape](https://github.com/hexojs/hexo-theme-landscape)

### 五、source 資源

-   用來存放原始檔案的地方，例如 Markdown 檔、圖片、各種頁面（分頁、關於等）
-   通常資料夾命名開頭會加上底線 `_`，例如 `_imgs`
-   以 `_` 開頭的檔案、資料夾或隱藏檔案會被忽略，除了 `_posts` 資料夾以外
-   Markdown 檔和 HTML 檔會被解析，並放到 public 資料夾，而其他檔案則會被拷貝過去

### 六、source & public & .deploy_git 的差別

-   執行 `$ hexo generate` 之後，會將 scorce 文件夾中的 Markdown 檔和 HTML 檔進行解析，再結合主題進行渲染，生成我們看到的靜態網站
-   執行 `$ hexo deploy` 之後，則會將 public 文件夾中的內容部署到 GitHub，並生成 .deploy_git 資料夾，因此內容與 public 幾乎相同
-   這三者的關係可想成： source -> public -> .deploy_git

---
# 部署到 GitHub

## 建立 GitHub 專案
建立GitHub 專案，請先註冊 [GitHub](https://github.com/) 帳號並登入到左邊會有 New 的 Button 並按下。
![[Pasted image 20211024145318.png]]

GitHub創建條件必須要是**帳號加上(.github.io)**，範例 : [username].github.io，以上步驟就完成了。
![[Pasted image 20211024145511.png]]

---
# Deloy 到 GitHub 
回到 Hexo 資料夾，打開 ```_config.yml```後，移至最下方輸入以下內容:

``` js
deploy:
 type: git
 repo: <repo-url>
 branch: main
```
請先確認 repo 網址，範例 : 
```
https://github.com/<username>/<username>.github.io
```

## package.json
如果沒看到 package 一定要把它初始化 ```npm init```。 
打開 package後，一定要自行輸入 ```"all": "hexo cl && hexo g -d "```，可以快速清除檔案、建置Hexo。

```js
 "scripts": {
 	"build": "hexo generate",
 	"clean": "hexo clean",
	"deploy": "hexo deploy",
	"server": "hexo server",
	"all": "hexo cl && hexo g -d "
 },
```
### 如何執行 scprits
只要在命令字元輸入 ```npm run all ```即可。

### 執行時有錯誤訊息: not found git
那如果有```ERROR Deployer not found: git ```，表示你沒安裝hexo-deployer-git 套件，請自行輸入以下指令。

``` bash
$ npm install hexo-deployer-git --save

```

## 結語

這篇主要是快速建立環境讓Hexo可以運行畫面，下一章節會開始使用 thame ，快速建立Blog 畫面，請各位小力鞭打我（＾∀＾●）ﾉｼ。