---
title: 【工具、紀錄】Reqable 手機、API一手包辦
date: 2024-12-03 23:00:05
categories: 
  - 筆記 
description:
cover: /image/20241203_13-40-08.png
---

## 前言
前正子在找相關工具可以追蹤 Android / IOS 手機上面的 API ，發現有個很強大工具可以達到我的需求。這工具結合了 Fiddler、Charles、Postman 的功能，可以在手機上面直接進行 API 測試、追蹤、修改等功能。

## Reqable 簡介
Reqable 是一個可以在手機上面進行 API 測試、追蹤、修改等功能的工具，可以在手機上面直接進行 API 測試、追蹤、修改等功能。因為他是大陸開發工具，若有考量可以改用其他工具。


### 一、API 功能 ( 介面類似 Postman )
這裡工具提供了 Explorer 、Collection、History 這幾個功能可以比較 Postman 與 Reqable 的差異。
![](/image/20241204_21-13-23.png)
![](/image/20241204_21-14-59.png)


#### 1-1 Explorer 功能
Postman 是沒有所謂的 Explorer 功能。這功能在創建新的 Tab 時候會直接記錄在 Explorer 中，可以直接點擊進行 API 測試。主要目的會偏向於紀錄當前 tab 清單有地方可以查看。
![](/image/20241204_21-18-56.png)


#### 1-2 Collection 功能
Collection 功能可以將 API 進行分類，可以將相關的 API 放在一起，方便管理。Reqable很貼心的把Postman的Collection功能也加入了。Postman反而匯入內容會比較多彈性可以配合git相關匯入👍。
![](/image/20241204_21-19-34.png)
![](/image/20241204_21-20-57.png)


#### 1-3 設定參數
設定參數時候，是可以特別設定 environment顏色，但缺少POSTMAN 可以設定兩個參數值的功能。網址部分要加入參數只能透過 ```<<>>``` 進行設定。
![](/image/20241204_21-30-39.png)

---

### 二、追蹤功能
這個功能會比較像是 Fiddler 一樣，可以快速擷取手機﹑電腦的任何軟體的 API資料。

#### 2-1 追蹤
只要連同一個網路就可以使用這功能。一旦與手機連線好後從PC可以看到手機裡面所有軟體打出來的API資料。
![](/image/20241204_21-34-22.png)

當只要檢查單一軟體的API時候，可以直接選擇左側清單該軟體進行追蹤。從下面圖示可以看到他會連 PC 軟體一起追蹤。
![](/image/20241204_21-37-06.png)
![](/image/20241204_21-40-22.png)

#### 2-2 追蹤API存進 Collection
當追蹤到想要的API時候，可以直接存進 Collection 中，方便之後進行測試。
![](/image/20241204_21-51-03.png)

當追蹤的API想要比對內容，內部功能有資源 Diff 功能可以比對兩個API的差異。
![](/image/20241204_21-51-52.png)

如果要異動API內容，可以直接在這裡進行修改。
![](/image/20241204_21-57-54.png)

#### 2-3 Session 功能
Traffic 裡面創建一個 Session 會直接出現一個tabs。Session 會把裡面的內容都記錄下來，是不會直接影響動態trace 時候的資料。
