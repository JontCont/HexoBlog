---
title: 【C#】Line Bots(四) - Line Message設定
date: 2022-09-09 17:16:33
categories: 
  - 後端技術
  - C#
  - Line
tags: 
  - C#
  - Line
description:
keyword: 'Net FrameWork, C# , Line '
cover: https://d.line-scdn.net/stf/linecorp/en/pr/quickreply_en.png
# sticky: 1
---
如果有完成上篇，回覆訊息會發現有自動回覆的功能。
(P.S. 這邊主要是設定Line Message API )

## Line Message API 自動回覆設定
這邊我們需要切換到 [Line Developers](https://developers.line.biz/en/)。Line Message API 需要關掉自動回覆訊息需要到 Basic Setting > Line Official Account Manager。

## 關閉自動回覆
到下一個頁面後，位置位於回覆設定 > 進階設定只要把自動回覆訊息關閉即可。

![](/img/dotnet/Line/Snipaste_2022-09-11_12-20-34.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_12-20-14.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_12-21-06.png)


### 創建自動回覆
如果不創建 Message API 這個是可以代替方案，可以參考以下操作。因為操作簡單就不向下說明了。
![](/img/dotnet/Line/Snipaste_2022-09-11_14-35-08.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_14-37-49.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_14-38-11.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_14-45-47.png)



## 圖文訊息
圖文訊息是主要廣告、訊息方便使用者點選的動作之一，目前他規範圖片需要1040px*1040px 才能上傳圖片。
### 創建圖文訊息
![](/img/dotnet/Line/Snipaste_2022-09-11_15-20-19.png)
### 建立新訊息 (群發訊息)
群發訊息可以訊息、貼圖之外可貼張貼優惠卷、問卷調查、多頁訊息。設定完成後傳送訊息即可。
![](/img/dotnet/Line/Snipaste_2022-09-11_15-20-53.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_15-21-19.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_15-21-31.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_15-22-02.png)

## 問卷調查
問卷調查部分，有幾些地方可能會不太方便使用。問答限制 "單選"、"選擇"，Line 問答上只有這兩種功能，目前要使用Text 方面就要考慮改用 Google Form 。

目前需要注意項目
- 時間限制 : 明天才能使用問卷。
- 問答限制 : "單選"、"選擇"

問卷發送訊息跟圖文訊息一樣到 "建立新訊息" 即可。
![](/img/dotnet/Line/Snipaste_2022-09-11_15-52-57.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_15-53-23.png)
![](/img/dotnet/Line/Snipaste_2022-09-11_15-53-32.png)
