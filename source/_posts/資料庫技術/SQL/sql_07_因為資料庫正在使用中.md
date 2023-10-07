---
title: Sql Server - 還原資料庫發生錯誤 "無法獲得獨佔存取權,因為資料庫正在使用中"
date: 2021-08-07
categories:
  - 資料庫技術
  - MS SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---

Sql Server 資料庫使用上，逃不了需要還原資料庫這個動作，時常遇到很多人回答怎樣解決 "無法獲得獨佔存取權,因為資料庫正在使用中"的問題。這邊會說明我常用的幾的動作 (P.S. 本章節有重新改寫，若有其他疑問歡迎到下方發問)。


# "無法獲得獨佔存取權,因為資料庫正在使用中"
期初通常遇到可能是這個DB有人在使用或是自己有下語法造成，依據解決方式有三種依據評估自行操作。

![](/img/SQL/sql_sp_who/Snipaste_2022-09-09_09-11-13.png)


## 一、離線工作
離線工作部分，是最簡單、也是暴力的處理方式之一。位置於 "[DataBase]" > 工作 > 離線工作(T)。
![](/img/SQL/sql_sp_who/Snipaste_2022-09-09_09-27-07.png)

## 二、活動監視器
SQL Server 有提供 ```活動監視器```功能，操作上只需要點選處理器並找到對應位置關閉即可。
![](/img/SQL/sql_sp_who/Snipaste_2022-09-09_09-12-16.png)
![](/img/SQL/sql_sp_who/Snipaste_2022-09-09_09-14-37.png)


## 三、指令
指令部分有分兩種語法，依據個人喜好做使用。

### 使用 EXEC　
使用 Exec 是最快的方式，主要問題則會需要慢慢找站存來源。SELECT 找到幾個關鍵字 。 當中hostname必須是空(沒有人暫存)，status需要看是否是runnable 決定是否要把它殺掉。
殺掉參考spid 編號，使用下方使用方式。
```sql 
USE master 
GO

EXEC sp_who

--Example : Kill [SPID] 
--Kill 61
--Kill 62
--Kill 65 
```

### 使用 SELECT 
這邊引用 '[stack OverFlow](https://stackoverflow.com/questions/2234691/sql-server-filter-output-of-sp-who2)'，這邊可以快速找到指定要殺掉的對象。相當快速方便。
```sql
USE master 
GO

DECLARE @Table TABLE(
        SPID INT,
        Status VARCHAR(MAX),
        LOGIN VARCHAR(MAX),
        HostName VARCHAR(MAX),
        BlkBy VARCHAR(MAX),
        DBName VARCHAR(MAX),
        Command VARCHAR(MAX),
        CPUTime INT,
        DiskIO INT,
        LastBatch VARCHAR(MAX),
        ProgramName VARCHAR(MAX),
        SPID_1 INT,
        REQUESTID INT
)

INSERT INTO @Table EXEC sp_who2

SELECT  *
FROM    @Table

--Example : Kill [SPID] 
--Kill 61
--Kill 62
--Kill 65 
```

## 四、補充
引用 '[德瑞克：SQL Server 學習筆記](http://sharedderrick.blogspot.com/2017/07/sql-server-spwho-spwho2.html)'
### sp_who
提供 SQL Server Database Engine 執行個體中有關目前使用者、工作階段和處理序的資訊。
可以篩選資訊，只傳回屬於特定使用者或屬於特定工作階段的非閒置處理序。

### sp_who2
 undocumented 與 unsupported，但提供更多的資訊，例如：CPUTime、DiskIO、LastBatch、ProgramName 等。
