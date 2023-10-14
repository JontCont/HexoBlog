---
title: Net Framework 升級至 Net 7 、Net 6 (.NET Upgrade Assistant)
date: 2022-10-02 22:41:27
categories: 
  - 後端技術
  - C#
  - Winform
tags: 
  - C#
  - Net FrameWork
  - Winform
description:
keyword: 'Net FrameWork, C# , Core'
cover: /image/20230303_12-36-52.png
# sticky: 1
---

## 前言
Net FrameWork 轉換成  Net Core 主要幾個原因
1. 跨平台 
2. 雲平台使用費用
3. 長期支援

介於之前公司提倡需要把系統改為Net Core ，這篇用簡單範例使用。

# .NET 升級小幫手 (.NET Upgrade Assistant)
過去開發者會使用 使用Upgrade Assistant CLI工具或是Microsoft Project Migrations進行更新，於之後用簡單指令就可以達成 .Net 6、7 更新。

## 安裝 
### 需要準備
- .NET 6 SDK / .NET 7 SDK (擇一)
- Visual Studio 2022 17.0 版之後版本
  
### 安裝
(1) 安裝
```cmd
## 命令全域安裝的 .NET 工具
dotnet tool install -g upgrade-assistant
```

(2) 更新 
```cmd
dotnet tool update -g upgrade-assistant
```

(3) 將這些失敗視為警告，而不是錯誤訊息
```cmd
dotnet tool install -g --ignore-failed-sources upgrade-assistant
```
--- 

# 使用 ASP NET MVC5
## 創建專案
![](/image/20230303_13-04-28.png)
![](/image/20230303_13-04-34.png)

## 執行 .NET 升級小幫手
![](/image/20230303_13-05-41.png)
![](/image/20230303_13-06-41.png)

指令內容請參考 【[使用 .NET 升級小幫手將 ASP.NET MVC 應用程式升級至 .NET 6](https://learn.microsoft.com/zh-tw/dotnet/core/porting/upgrade-assistant-aspnetmvc)】。

若直接按下 Enter 自動帶入第一個選項。
![](/image/20230303_13-06-59.png)
![](/image/20230303_13-07-21.png)
![](/image/20230303_13-10-00.png)


## 執行 dotnet core
### 前置作業
1. 前面需要先刪除 ```App_Start``` 、```Global.asax``` 、```Global.asax.cs```  
![](/image/20230303_13-11-48.png) 
2. 創建 wwwroow 資料夾，將 css、js、image等放進 wwwroot 資料夾裡面
![](/image/20230303_13-23-54.png)
3. 使用 .csproj 或是 .sln 進入專案

### 建置
建置時候會發生錯誤，因為Net Core 是不支援 BundleConfig.cs ，所以把全部改為 ```<script>```、```<link>``` 這邊動作就會比較麻煩。
![](/image/20230303_13-27-05.png)

```html
    @Scripts.Render("~/bundles/jquery")
    <script charset="UTF-8" src="~/Scripts/jquery-3.4.1.min.js"></script>
```
```html
    @Styles.Render("~/Content/css")
    <link rel="stylesheet" href="~/Content/Site.css" />
```

### 完成
![](/image/20230303_13-49-27.png)

---
## 結論
Net Framework 如果有一定的規模是很難修繕這段，因為初使Net Framework 相對比較少錯誤訊息。若要整個大型專案拆出會需要考量到工時問題。.NET 升級小幫手最大優點是，可以不用怕專案直接被覆蓋掉找不到還原檔案以及檔案轉換速度。

## 文件參考
1. [使用 .NET 升級小幫手將 ASP.NET MVC 應用程式升級至 .NET 6](https://learn.microsoft.com/zh-tw/dotnet/core/porting/upgrade-assistant-aspnetmvc)
2. [dotnet framework 4 升級到 6 要改的東西](https://hackmd.io/@Not/dotnet4to6#%E4%B8%8D%E8%83%BD%E4%BD%BF%E7%94%A8-Styles-%E5%92%8C-Scripts)