---
title: (筆記) Sql Server - try...catch 使用方式
categories:
  - SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/bg/bg_01.png
---

近期沒什麼時間撰寫 line notify 章節，先混混幾章來撐過這幾周。

## Try Catch 
平常很寫程式不時會需要查看 Error 錯誤訊息，若在 SQL 上面也比較少人使用try catch。

{% note info flat %}
### 使用方式
```sql
begin try
/*-------
  執行的SQL 
--------*/
end try
begin catch 
/*-------
  例外處理的SQL  
--------*/
end catch
```
{% endnote %}

## 範例
```sql
begin try
    select 1/0
end try

begin catch
    select 
        ERROR_NUMBER() AS Error_Number,
        ERROR_SEVERITY() AS Error_Severity,
        ERROR_STATE() AS Error_State,
        ERROR_PROCEDURE() AS Error_Procedure,
        ERROR_LINE() as Error_Line,
        ERROR_MESSAGE() AS Error_Message
end catch
```

## 參考文件
- [Microsoft Transact-SQL](https://learn.microsoft.com/zh-tw/sql/t-sql/functions/error-message-transact-sql?view=sql-server-ver16)