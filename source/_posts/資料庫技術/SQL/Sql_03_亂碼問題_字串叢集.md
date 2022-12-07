---
title: Sql Server -  亂碼問題 - 字串叢集
categories:
  - 資料庫技術
  - SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---

# SQL Server 亂碼現象

## 問題
近期在安裝過程遇到 Linux 環境有亂碼現象，查詢的時候會出現 "????" 無法輸出文字，查看下預設定序為```SQL_Latin1_General_CP1_CI_AS```，解決方案可以使用下方語法。

## 使用方式
```sql
ALTER DATABASE [DatabaseName] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
ALTER DATABASE [DatabaseName] COLLATE Chinese_Taiwan_Stroke_CI_AS
ALTER DATABASE [DatabaseName] SET MULTI_USER WITH ROLLBACK IMMEDIATE
```