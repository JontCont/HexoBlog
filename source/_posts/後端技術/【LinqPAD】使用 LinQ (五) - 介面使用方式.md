---
title: 【LinqPAD】使用 LinQ (五) - 介面使用方式
date: 2024-05-26 14:22:46
categories: 
  - 後端技術
  - LINQPad
tags: 
  - LINQPad
description:

cover: /image/20240511_11-16-15.png
---

## 前言
最近使用 LinqPad 發現有極大的發揮空間，對於每個 .NET 工程師來說是一個很好的工具，可以快速的測試 LINQ 的使用方式，也可以快速的查詢資料庫的資料，更重要是他的版本會更新到最新的 .NET Framework 版本，讓我們可以快速的測試新的功能。


## 一、[LinQpad](http://www.linqpad.net/)
這工具是一套免費軟體。建議使用付費版本，主要原因是第一次接觸的時候，會有很多的功能需要使用，像是 code snippets, autocompletion, smart tags, code outlining, .NET Reflector integration 等等功能，這些功能在付費版本都有提供。
優惠碼管道可以關注 ```台灣 .NET 技術愛好者俱樂部```中的管理員，他們會不定期的提供優惠碼給大家使用。

### 1-1 介面 
LinqPad 左邊兩個區塊第一個是連線資料庫、第二個是查詢(Queries)，右邊則是查詢結果。
![](/image/20240511_11-16-15.png)

- 連線資料庫: 
1. 功能是利用 Entity Framework 自動創建 models
2. 可以使用 dll 檔案連線資料庫
3. models 內容不能改變，所以請使用自動產出來的 models 進行操作
![](/image/20240526_12-14-17.png)


- 查詢(Queries):
1. 可以使用 C#、VB.NET、F# 進行查詢
2. 可以使用 NuGet 安裝套件
3. 可以使用自訂的 NuGet 套件 、Snippet 、Namesapace Imports
![](/image/20240526_12-18-15.png)


### 1-2 萬能的 Dump()
在 LinqPad 中，最常用的方法就是 Dump()，這個方法可以將查詢結果顯示在右邊的視窗中，並且可以將查詢結果轉成 XML、HTML、JSON、CSV、TSV、Markdown、LaTeX、TeX、Razor、YAML、YAML Header、YAML Front Matter、YAML Front Matter Table、YAML Front Matter List

```csharp
var list = new List<string> { "A", "B", "C" };
list.Dump();
```
![](/image/20240526_12-19-29.png)


### 1-3 快捷鍵
要開始使用 LinqPad 之前，建議先熟悉一下快捷鍵，這樣可以提高效率。

開發安裝套件、檢查套件快捷鍵: 
- 開啟 reference (SDK 、NUGET等) 視窗 : F4
- 開啟 NampeSpace 視窗 : ctrl + shift + M

查詢視窗快捷鍵:
- 執行查詢: F5
- 提示(prompt)視窗 : ctrl + space
- 插入 Snippet: ctrl + k + x
- 加入 Surround: ctrl + k + s
- Queries 搜尋 : Ctrl + ,

程式碼編輯快捷鍵:
- 排版 : ctrl + k + d
- 註解 : ctrl + k + c
- 取消註解 : ctrl + k + u
- 創建中括號 ```{``` : ```ctrl + k + [```
- 摺疊程式碼(medthod) : ctrl + m + o 
- 展/摺開程式碼 (全部) : ctrl + m + l
- 展/摺開程式碼 (指定) : ctrl + m + m
- 變更變數名稱 : F2

### 1-4 使用官方範本
linqPad 很貼心的提供了很多範本，可以讓我們快速的使用，範本分為兩種，一種是 C# 的範本，另一種是 SQL 的範本，可以讓我們快速的使用。
![](/image/20240526_12-53-25.png)


## 參考文件
- [LINQPad: 每個.NET工程師都要有的一隻箭](https://ithelp.ithome.com.tw/articles/10193063)