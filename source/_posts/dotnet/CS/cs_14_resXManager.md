---
title: C# ASP.NET resXManager (2) - 操作方式
categories: 
  - dotnet
  - C#
tags: 
  - C#
  - VSC
  - resXManager
description:
keyword: 'C#,SignalR'
cover: /img/dotnet/bg/cs_bg_resXManager.png
---

## 前言 
上一章節已經說明完成使用方式，這次說明比較常用的幾的動作，分別為匯入、翻譯。


# 匯入
使用前，不可能會一直使用這介面打資料在上面，這會大大影響執行效率，這時可以。
使用方式先到介面上面點選 Export All 將所有資料匯出即可。

## 匯出範本
匯出有兩種模式，一種是指定方式匯出、另一種是全部匯出。
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_19-48-25.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-35-50.png)

## 加入項目並匯入
在範本上面加入項目，目前加入項目為"匯入"。加入完畢後選擇 ```Import```即可得到效果。

{% note info flat %}
    ### 匯入沒效果
    需要確認兩個地方。
    1. Project : 專案名稱。
    2. File : Resource 位置，如果folder有數字記得要留意一下。
{% endnote %}

![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-37-21.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-42-09.png)



# 翻譯
翻譯是resXManger 最大特色，使用上可能要自己評估這個字是否是你想要的文字。下方會使用四個項目進行轉換。

![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-42-09.png)

## 加入語言
筆者使用日文來測試。
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-43-40.png)

## 翻譯(轉換)文字
介面下方有介面選擇```Translate```，Source 使用來之前加入文字，Targets 是加入要翻譯的語言，Targets 內容是可以多選翻譯，翻譯必須要注意覆蓋的危機。

接下來，翻譯完畢的項目可以進行選擇是否更新，如果都翻得不錯可以直接用力按下```apply all ``` 按鈕。

![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-44-02.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-46-33.png)
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-47-16.png)

## 結果
![](/img/dotnet/cs/resXManager/Snipaste_2022-07-24_10-49-07.png)

