---
title: Playwright 自動化腳本無寫程式碼使用方式 (二) - 測試總管功能
date: 2024-07-25 23:51:23
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

上次只有提到 Playwright 開啟專案、錄製部分，這邊來說一下須要用到幾個功能，這樣可以讓不會寫程式碼的人也可以使用 Playwright 進行自動化測試。

### 一、測試總管

#### 1-1 Show Browser/Show Trace Viewer 差異

啟動方式在 Test Explorer 裡面執行隨便幾個功能就會自動跑出以下功能。若不要顯示瀏覽器以及Trace Viewer 可以直接把取消勾選即可。

- Show Browser : 這個功能是可以看到瀏覽器的畫面，但是這個功能是不會顯示程式碼的。
- Show Trace Viewer : 這個功能是可以看到程式碼的執行過程，可以看到程式碼的執行過程。Ex : 紀錄，錯誤訊息、Snapshots 等等。

#### 1-2 Show Trace Viewer

基本上 Show Trace Viewer  可以看到很多不錯的內容，從下圖可以看到幾個重要的部分。

1. Snapshots : 最上面可以看到 Playwright 每一個步驟的截圖，包含動作顏色可以透過這個功能來識別。
2. Actions Log : 左邊是將自動化的步驟紀錄下來，可以看到每一個步驟的動作輸出。
3. 輸出視窗 : 下方就是比較詳細的內容，有 locator 、Call 、Log 、Error 、Console 等都在上面。
4. 檢視視窗 : 這邊畫面就是透過上面 Snapshots 來看到每一個步驟的畫面，圖中就是 Playwright 比對的字體。

![](/image/20240725_21-59-27.png)

##### 1-2-1 Trace viewer 設定方式

本文提供以下參數給各位讀者參考，依據需求來設定。

- off：不記錄測試軌跡。
- on：記錄每次測試的軌跡。
- retain-on-failure：僅保留失敗測試的軌跡。
- on-first-retry (default)：僅在第一次重試測試時記錄測試軌跡

```javascript
export default defineConfig ({
  use: {
    trace: 'on-first-retry',
  },
});
```
---
### 二、工具(Tools) 功能

Plawright 提供了一些工具功能，這邊來說一下這些功能。
![](/image/20240725_22-12-38.png)

#### 2-1 Pick Locator
這功能為點擊我們網頁上任何的 area ，之所以稱 locator (定位器) 是因為這個功能可以幫助我們找到該元素的位置。


#### 2-2 Record New
這功能為錄製新的測試案例也包含新增一格 ```.ts``` 範本檔案，不用手動新增一個檔案。


#### 2-3 Record at Cursor
這功能為重新錄製。有很多狀況在錄製不想錄到特定畫面、錯誤等等，這時候就可以使用這個功能重新錄製。但也要注意滑鼠游標要在你指定的 Code 上面，不然錄製結束後要搬動程式碼。


#### 2-4 Reveal test output
這功能為顯示測試輸出，可以看到測試的結果，包含錯誤訊息、執行時間等等。

#### 2-5 Close all browsers
這功能為關閉所有瀏覽器，有時候測試完畢後不想一個一個關閉，這時候就可以使用這個功能。


---

### 三、Playwright 錄製工具
通常在錄製時候，其實都可以看到下方圖片的功能，這邊來說一下這些功能。
![](/image/20240725_22-20-16.png)


#### 3-1 暫停/繼續
這功能為暫停/繼續錄製，有時候在錄製時候不想錄到特定畫面、錯誤等等，這時候就可以使用這個功能暫停。如果按下暫停，再麻煩按下 Tools > Record at cursor 重新開始錄製。

#### 3-2 Pick Locator
這個功能就跟 VSCODE Tools 功能一樣，可以幫助我們找到該元素的位置。

#### 3-3 Assert Visibility
這功能為檢查元素是否可見，這功能可以幫助我們檢查元素是否可見。Code部分也會幫我們產生比對的程式碼。

#### 3-4 Assert Text
這功能為檢查元素是否有文字，這功能可以幫助我們檢查元素是否有文字。

#### 3-5 Assert Value
這功能為檢查元素是否有值，這功能可以幫助我們檢查元素是否有值。

---

### 結論
Playwright 提供了很多功能這幾些基本功能可以讓不會寫程式碼的人也可以使用 Playwright 進行自動化測試。以上介紹會比較熟悉 Playwright 基礎作用，下次會介紹一些進階功能。