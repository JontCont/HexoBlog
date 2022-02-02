---
title: Sql Server (一) - 合併欄位( FOR XML PATH )
categories:
  - Sql
tags: 
  - Sql
  - Sql server
description:
keyword: 'Sql'
cover: /img/sql_server/bg.png
---

# SQL Server 合併欄位
近期需要列出詳細欄位，例如: 這個角色他目前有使用哪種類型，依據類型展開詳細類型資訊等。
公司上遇到很多欄位分同類型不同人，決定要試看看合併欄位效果。

## 必備工具
1. SQL-Server ：
https://www.microsoft.com/zh-tw/sql-server/sql-server-downloads

2. SSMS(SQL Server Microsoft Studio )
https://docs.microsoft.com/zh-tw/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15

技術文件 : https://test-75.gitbook.io/basic-sql/sql-huan-jing-she-ding

### (自行選擇) - 產生範例結構
```SQL
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Statistics](
	[name] [nvarchar](20) NULL,
	[type] [nvarchar](20) NULL
) ON [PRIMARY]
GO
```

##  使用 ( FOR XML PATH ) 合併欄位
如果我們直接開始用，會看到資料很凌亂，那我們直接將Type欄位合併。
```SQL
SELECT * FROM [dbo].[Statistics]

/* ----------Result --------- */
/* Ivan	 A */
/* David B */
/* Kate	 C */
/* John	 A */
/* Ivan	 D */
/* John	 C */
/* Ivan	 B */
```

### FOR XML PATH 
這方式簡單馬type串在一起，XML使用下尚未特別處理會呈現 ```<type>```字眼。
如果有特別加上字串，```<type>```就不會出現在table中。
```SQL
SELECT distinct 
	 m.name,(
	 SELECT type /*type+','*/ FROM [dbo].[Statistics]
	 WHERE name = m.name
	 for xml path('')
	)  as type_item
FROM [dbo].[Statistics] m


/* ----------Result --------- */
-- David || <type>B</type>
-- Ivan	 || <type>A</type><type>D</type><type>B</type>
-- John  || <type>A</type><type>C</type>
-- Kate	 || <type>C</type>
```

### 去除多於符號
去除多餘符號可以使用 left() 或是 right() 方法。

```SQL
Select 
	name,left(type_item,len(type_item)-1) as type_item
From
(
	SELECT distinct 
		 m.name,
		 (
			 SELECT type+',' FROM [dbo].[Statistics]
			 WHERE name = m.name
			 for xml path('')
		 )  as type_item
	FROM [dbo].[Statistics] m
) as main

```

或者是 STUFF() 方式刪除，再請各位自行遊玩測試。

```SQL
SELECT distinct 
    m.name,
    STUFF
    ((
        SELECT ','+type FROM [dbo].[Statistics]
        WHERE name = m.name
        for xml path('')
    ),1,1,'') as type_item 
FROM [dbo].[Statistics] m

```
