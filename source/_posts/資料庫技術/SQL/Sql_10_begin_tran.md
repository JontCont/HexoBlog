---
title: (筆記) Sql Server - begin tran 使用方式
categories:
  - SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---

T-SQL 平常使用都會直接 Update、Insert、Delet 之類動作，但是在很多時候會有不小心輸入錯誤的問題。平常如果再已經上線、正式使用資料庫時候非常建議BEGIN TRIN ，可以先確認完畢資料後再同步交期或是回復交期。

## BEGIN TRANSACTION
使用方式:
- BEGIN TRANSACTION    : 開啟交期。輸入```BEING TRAN ```即可。
- COMMIT TRANSACTION   : 確認交期。輸入```COMMIT ```即可。
- ROLLBACK TRANSACTION : 回復交期。輸入```ROLLBACK ```即可。

```sql
BEGIN TRAN
/*--------執行動作------------*/

--- ROLLBACK OR COMMIT 二選一
COMMIT 
-- ROLLBACK
```

實際執行動作。
- 先用 SELECT 查看、Where 要更新的欄位
- BEING TRAN 包覆 Insert 、Update 、 DELETE等
- 執行後，從SELECT 結果確認才執行 ```COMMIT``` 或是 ```ROLLBACK```


## 範例
### 創建Table
```sql
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
```

### Insert
```sql
BEGIN TRAN
INSERT INTO [dbo].[AspNetRoleClaims]
           ([RoleId]
           ,[ClaimType]
           ,[ClaimValue])
     VALUES
           ('111','222','333')
GO
--- ROLLBACK OR COMMIT 二選一
ROLLBACK
```
