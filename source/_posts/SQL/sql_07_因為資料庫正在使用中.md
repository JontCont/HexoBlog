---
title: SQL Server 還原資料庫發生錯誤 "無法獲得獨佔存取權,因為資料庫正在使用中"
categories:
  - SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---

## 前言
還原 DB 最常遇到是 [還原資料庫發生錯誤 "無法獲得獨佔存取權,因為資料庫正在使用]問題，目前有兩種方式。第一種 : kill 指令、 第二種 : 工作離線。


## 指令
第一步會需要先查DB是否使用，建議設定在 master 查詢。
```sql
USE master;
GO
exec sp_who
```

當中找到幾個關鍵字 。 當中hostname必須是空(沒有人暫存)，status需要看是否是runnable 決定是否要把它殺掉。
1. status
2. hostname
3. dbname

殺掉可以參考spid 編號，使用下方使用方式。

```sql
-- kill [spid]
kill 46
```
