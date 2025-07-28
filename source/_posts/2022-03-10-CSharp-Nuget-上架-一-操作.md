---
title: Nuget 上架類別庫
date: 2022-03-10 19:48:57
categories: 
  - 雲端平台
  - Nuget
tags: 
  - Nuget
description:
keyword: 'Nuget, C# ,.Net'
cover: /image/20230310_19-48-57.png
---

## 前言
最近有很多擴充工作被改的很多版本，突然間想要順便把自己的擴充套件加入倒Nugut 之後就可以想要載入就可以去下載。

# NuGet 
NuGet是一個由Microsoft開發和維護的套件管理系統，用於管理和分發.NET程式庫、工具和擴充。它可以讓開發者輕鬆地安裝、升級和卸載.NET套件，也可以讓開發者將自己的.NET套件分享給其他開發者使用。使用NuGet，您可以輕鬆地添加和管理專案中的依賴項目，同時也可以快速地將專案和依賴項目升級到最新版本。

NuGet庫中包含了大量的.NET套件和擴充，可以滿足開發者在.NET開發中的各種需求。使用NuGet，開發者可以更加輕鬆地管理自己的專案和依賴項目。NuGet提供了一個方便的方式，讓開發者將自己的程式庫或應用程序打包成一個NuGet套件，並將其發佈到NuGet庫上，方便其他開發者使用。同時，NuGet也可以讓開發者從NuGet庫上下載並安裝他人的.NET套件。

## 使用方式
目前有兩種方式 
1. GUI 方式上傳
2. 指令上傳
GUI 需要下載 Microsoft store :【[NuGet Package Explorer](https://apps.microsoft.com/store/detail/nuget-package-explorer/9WZDNCRDMDM3?hl=zh-tw&gl=tw)】直接使用即可，相當方便。
## 指令上傳
- 下載點 : [請點我](https://www.nuget.org/downloads)
下載完畢後，務必將 【解除封鎖】勾起來，不然會無法使用 ```nuget pack```指令。
![](/image/20230310_19-59-20.png)

安裝部分只需要丟到 ```C:\Windows\System32``` 即可，無需要個別丟在project 。

### 創建 nuspec
```
nuget spec [project]
```
輸入方式請參考下方圖片
![](/image/20230310_20-05-19.png)

### 創建 nupkg
這動作是為了要把當前版本進行包裝，如果有多個版本可以嘗試 ```-c Release```。注意 : 每當要更新一個版本必須要更換版本號。
```
nuget pack [project]
```

### 發佈專案
由於 2022年某天nuget 強制需要登入才能上傳檔案，必須要先取得 api key 或是登入帳號才能使用。

- Nuget API KEY : [點選我](https://www.nuget.org/account/apikeys) 

```
nuget push [project] [Api key] -source nuget.org
```

## GUI 上傳
1. 點選編輯內容
![](/image/20230310_20-17-10.png)

2. 創建 Lib 資料夾
![](/image/20230310_20-17-46.png)

3. 選擇你要新增的版本號，並丟入 dll 檔
![](/image/20230310_20-18-14.png)

4. 按下 【Publish】進行發佈
![](/image/20230310_20-19-39.png)

publish之前需要加入 Api key 的動作，連結請參考上面提供。

## 參考資料
1. [發布自己的Nuget專案](https://ithelp.ithome.com.tw/articles/10210818)
2. [上傳既有的 Nuget 套件到自行架設的 Nuget Server](https://blog.txstudio.tw/2017/10/publish-exist-nuget-package-to-private-nuget-server.html)