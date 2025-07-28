---
title: '[DB] 使用 VS Code Query DB'
date: 2025-06-18 09:30:00
categories:
  - 後端技術
  - C#
tags: 
  - C#
  - 筆記
  - DB
---

## 前言

最近在開發過程都是使用 Azure Data Studio Query 資料庫，對於 2025/03/31 微軟做出要停止支援的消息，我改用兩個擴充工具給讀者參考。

- 停止支援文章 : [點選我](https://learn.microsoft.com/zh-tw/azure-data-studio/whats-happening-azure-data-studio)

## 工具

1. SQL Formatter VSCode : [點選我](https://marketplace.visualstudio.com/items?itemName=ReneSaarsoo.sql-formatter-vsc)
2. SQL Database Projects : [點選我](https://marketplace.visualstudio.com/items?itemName=ms-mssql.sql-database-projects-vscode)
3. DBCode - Database Management : [點選我](https://marketplace.visualstudio.com/items?itemName=DBCode.dbcode)

PS. DB Code 比較是一套可以使用 Copilot 可以詢問的 Database Management

## SQL Database Projects 初次使用

### 一、查詢動作 (Query)

SQL Database Projects 是微軟的 Database Extension ，使用與 Azure Data Studio 早期的版本相似的介面，Filter 是沒有 input可以輸入的地方，需要使用 SQL 語法來查詢資料。 

![](/image/20250507_11-50-20.png)

### 二、歷史紀錄 (History)

connection 介面下方會有 History 的選項，這邊會顯示你最近執行過的 SQL 語法，這邊可以直接點選執行。若不想要所有查詢都記錄上面也可以透過右方icon選擇不記錄。

![](/image/20250507_11-52-44.png)
![](/image/20250507_11-53-46.png)


---

## DBCode - Database Management 

### 一、查詢動作 (Query)
查詢動作我們可以來比較前者， DBCode 有包含 quick filter 的功能、tabs、history、資料表結構等功能。包含著 export 可以支援很多的格式，像是 CSV、Excel、JSON、Markdown 等等。

![](/image/20250507_12-27-48.png)
![](/image/20250507_12-31-13.png)


### 二、歷史紀錄 (History)

歷史紀錄也透過 tree list 的方式來顯示，這邊會顯示你最近執行過的 SQL 語法。

![](/image/20250507_12-31-50.png)


### 三、Github Copilot (只能用於 Ask)

VSCode 使用 Copilot 的功能有 Ask 、Edit、Agent 這裡 extension 只有支援 Ask 的功能，這邊可以直接詢問資料庫的問題。

![](/image/20250507_12-34-22.png)

當問一些比較 Detail 問題會直接參考你加入的 DB Connection，像是這邊詢問的問題是關於資料表的結構。

![](/image/20250507_12-35-42.png)


---

## 結論

基本上 [SQL Database Projects] 存查詢 DB資料時候建議是使用 DBCode，因為它的功能比較完整，像是 export 的功能、quick filter 的功能、tabs、history、資料表結構等功能。

假設是要使用 SQL Projects 使用 [SQL Database Projects] 會比較妥當一些，內部其實可以使用 Compare DB 結構可以頂替於 Visual Studio 的 Schema Compare 功能，。

![](/image/20250507_12-40-28.png)