---
title: SQL Server 壓縮交易檔案
categories:
  - SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---
## 前言
資料庫交期檔案時常會遇到檔案很大問題，下方指令會偏向於特定情境處理，若是客戶需要小心處離 ，通常動作會是暫停、離線方式，再進行壓縮。

## 查詢指令
下方指令是要確定是 SIMPLE 才建議執行下方語法。
```sql 
SELECT 
name as [database_name], 
recovery_model_desc as [model], 
log_reuse_wait_desc as [log_reuse] 
FROM sys.databases
```

## 壓縮指令
```sql
ALTER DATABASE [資料庫名稱]
SET RECOVERY SIMPLE;
GO

--壓縮記錄檔為 20 MB
DBCC SHRINKFILE ([資料庫LOG名稱], 20);
GO

ALTER DATABASE  [資料庫名稱]
SET RECOVERY FULL;
GO
```