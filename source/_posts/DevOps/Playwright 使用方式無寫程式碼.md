---
title: Playwright 自動化腳本無寫程式碼使用方式
date: 2024-07-21 11:51:23
categories: 
  - DevOps
  - Playwright
tags: 
  - Playwright
description:
keyword: 'Playwright'
cover: /image/20240720_23-44-39.png
---

## 前言
最近被公司推出來講解 Playwright 自動化腳本，但是我發現有些人不會寫程式碼，所以我想要分享一下 Playwright 自動化腳本無寫程式碼使用方式，這樣可以讓不會寫程式碼的人也可以使用 Playwright 進行自動化測試。

--- 

## Playwright 自動化腳本
- 跨平台支持 : Playwright 支持在 Windows、Linux 和 macOS 平台上運行測試，無論是本地還是在持續集成（CI）環境中，都可以進行無頭或有頭模式的測試。
- 自動等待: Playwright 在執行操作前會自動等待元素變得可操作，並且擁有豐富的內省事件。這一特性消除了使用人工超時的需求，從而減少了 flaky tests 的發生。
- 網頁優先斷言: 這些斷言專為動態網頁設計，在進行檢查時會自動重試，直到符合必要條件。
- 跟蹤和重試策略 : Playwright 允許配置測試的重試策略，並捕捉執行過程中的追踪、視頻和屏幕截圖，以便更好的調試和排除故障。
- 瀏覽器支援 : 支援所有現代渲染引擎，包括 Chromium、WebKit 和 Firefox。能在主流瀏覽器如 Chrome、Edge、Firefox 和 Opera 上進行測試

### 一、必備工具
1. [Node.JS](https://nodejs.org/zh-cn)
2. [安裝 Playwright](https://www.npmjs.com/package/playwright)
3. [Visual Studio Code](https://code.visualstudio.com/)


### 二、安裝指令
- 安裝 Playwright 套件 : ```npm install playwright```
- 安裝 Playwright 瀏覽器 : ```npm playwright install```
- (選用) 安裝指定 Playwright 瀏覽器 
  1. ```npm playwright install webkit```
  2. ```npm playwright install firefox```
  3. ```npm playwright install chromium```

### 三、必備套件
1. Playwright Test for VSCode
[https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
2. Playwright Test Runner
[https://marketplace.visualstudio.com/items?itemName=sakamoto66.vscode-playwright-test-runner](https://marketplace.visualstudio.com/items?itemName=sakamoto66.vscode-playwright-test-runner)
3. Playwright Test Snippets
[https://marketplace.visualstudio.com/items?itemName=mskelton.playwright-test-snippets](https://marketplace.visualstudio.com/items?itemName=mskelton.playwright-test-snippets)


### 四、開始使用
開啟VS Code 後，使用 ```Ctrl + Shift + P``` 輸入 ```Playwright``` 選擇 ```Test : Install Playwright``` 就會產生專案出來。

#### 1. 查看測試清單
若進入功能時候，看到清單是空的可以按下上面的 reset icon，就會重新讀取測試清單。 
![](/image/20240720_23-28-40.png)


### 2. 創建一個測試案例
下方內容有 Tools > Reocrd new 可以進行錄製測試案例。現在我們只要任意移動任何功能會自動產生程式碼完全可以不用寫程式碼。
![](/image/20240720_23-30-31.png)


每個案例可以透過紅色按鈕決定要不要暫停，但注意按下去後下面的UI會消失，因此再次錄製就要按下 Tools > Record at cursor 重新開始錄製。
![](/image/20240720_23-31-56.png)


### 3. 執行測試案例
如果執行好測試案例就直接執行測試案例就可以看到結果。

![](/image/20240720_23-42-44.png)
