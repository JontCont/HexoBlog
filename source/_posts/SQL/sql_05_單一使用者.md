---
title: SQL Server 排除單一使用者
categories:
  - SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---
## 前言
資料庫當中，覆蓋檔案時常遇到變成單一使用者，因此可以使用下方語法。


## 更改成所有使用者

```sql
ALTER DATABASE  [資料庫名稱]
SET MULTI_USER;
GO
```

## 更改成唯獨

```sql
ALTER DATABASE  [資料庫名稱]
SET READ_ONLY;
GO
```


## 更改成單一使用者模式

```sql
ALTER DATABASE [資料庫名稱]
SET SINGLE_USER
WITH ROLLBACK IMMEDIATE;
GO
```
