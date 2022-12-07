---
title: Sql Server -  恢復[正在還原]資料庫
categories:
  - SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---

## 前言
近期遇到DB出現所謂正在還原中文字，有出現這狀況可能DB處理、還原中失敗造成這個問題提供幾個方式給大家參考。

## 解決指令

```sql
-- 切換資料庫的狀態為：ONLINE。
RESTORE DATABASE [資料庫名稱]
WITH RECOVERY
GO
```

## 查詢指令
```sql
SELECT
	df.file_id,
	df.name as logincal_file_name,
	df.state,
	df.state_desc
FROM [資料庫名稱].sys.database_files df
```

## 補充 : restore 與 recovery 的區別
(取自於網上濃縮)
restore  : (還原)與備份檔案相對，從備份讀出恢復備份的樹續
recovery : (恢復)把restore回來的資料經過處理變成正常數據
如果restore 沒有加入recover的話，資料庫是打不開的，主要原因是各文件都不同步。

