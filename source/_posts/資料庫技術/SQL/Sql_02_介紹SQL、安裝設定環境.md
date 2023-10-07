---
title: Sql Server - 介紹SQL、安裝設定環境
date: 2021-08-02
categories:
  - 資料庫技術
  - SQL
tags: 
  - SQL
keyword: 'SQL'
cover: /img/SQL/sql_server/bg.png
---

# SQL (Structured Query Language)
是一種特定目的程式語言，用 於管理關聯式資料庫管理系統（ RDBMS ），或在關係流資料管理系統 RDSMS ）中進行流處理。 SQL 基於關係代數和元組關係演算，包括一個資料定義語言和資料操縱語言。 SQL 的範圍包括 資料插入、查詢、更新和刪除，資料庫模式建立和修改，以及資料存取控制。儘管 SQL 經常被描 述為，而且很大程度上是一種聲明式編程（ 4GL ），但是其也含有程序式編程的元素。 ISO( 國際標準化組織 對 SQL 制訂有標準規格，而這樣做為基準的 SQL 即被稱為 標準 SQL 早期 各家 RDBMS 無法統一 SQL 敘述，因此因 ISO 制訂了標準敘述，使得各家 RDBMS 都逐步支援標準 SQL 的基本語法。 

---

# SQL 敘述與其分類 SQL
SQL 是以數個關鍵字 ( Keyword)，再與資料表名稱為欄位名稱組成一段完成的語句 (SQL 敘 述 SQL 敘述中的關鍵字，是根據其意義或使用方式所決定的特定英文單字，其中包含了「查 詢資料表內容」或 「參考這個資料表」等意思的多個單字。

## 一、 DDL ( Data Definition Language 資料定義語言 )

能建立或刪除資料庫和資料表等用來儲 存資料的物件，規劃資料儲存的方式。 
1. GREATE ：建立資料庫或資料表 
2. DROP ：刪除資料庫或資料表 
3. ALTER ：修改資料庫或資料表等物件的架構

## 二、DML(Data Manipulation Language  資料操作語言 )
能查詢或修改資料 表 內的記錄 以列為 單位的資料 。 
1. SELECT ：資料表查詢記錄 
2. INSERT ：將新記錄儲存至資料表中 
3. UPDATE ：修改資料表的記錄 
4. DELETE ：刪除資料表的記錄

## 三、DCL(Data Control Language  資料控制語言 )：
可以用來認可或取消對資料庫執行的變更動 作，另外也能設定 RDBMS 的使用者對資料表等物件的操作權限
1. COMMIT ：認可對資料庫執行的變更動作
2. ROLLBACK ：取消對資料庫執行的變更動作
3. GRANT ：賦予使用者操作的權限
4. REVOKE ：撤銷使用者操作的權限

![](/img/sql_server/01.png)

# 環境設定
## 必備工具
1. SQL-Server ：
https://www.microsoft.com/zh-tw/sql-server/sql-server-downloads

2. SSMS(SQL Server Microsoft Studio )
https://docs.microsoft.com/zh-tw/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15

技術文件 : https://test-75.gitbook.io/basic-sql/sql-huan-jing-she-ding

## 設定登入sa
1. 進入後先調整資料庫的安全性，選擇SQL Server /Windows 驗證模式之後按下確認。
![](/img/sql_server/02.png)
![](/img/sql_server/03.png)

2. 到資料庫內有安全性的資料夾，開到有sa 選項按下右鍵(選擇屬性)。
![](/img/sql_server/04.png)

輸入密碼後，到狀態把登入選擇為啟用即可使用。
![](/img/sql_server/05.png)


{% note info flat %}
## 說明 
第一次使用需要重新開啟SSMS，若sa還是不能登入有兩個解決方式，
1. 從SQL Server 設定管理員裡面重啟 SQL Server
2. 直接重開電腦
{% endnote %}

---

## 補充
### 一、無法修改資料結構
如果有出現無法存檔結構問題，可以依下列步驟：
![](/img/sql_server/06.png)

開啟SQL Server Management Studio-->工具-->選項-->Designers(設計師)-->資料表和資料庫設計工具-->防止儲存需要資料表重建的變更 -->取消勾選 ！如下圖：
![](/img/sql_server/07.png)

### 二、使用者 'NT AUTHORITY\SYSTEM' 的登入失敗
使用者 'NT AUTHORITY\SYSTEM' 的登入失敗的解決方法。
1. 打開SSMS，找到安全性>登入>NT AUTHORITY\SYSTEM
![](/img/sql_server/08.png)

2. 右鍵"屬性"，選擇"安全性實體"
![](/img/sql_server/09.png)

3. 打勾
![](/img/sql_server/10.png)


### 三、顯示行數
請選擇上方[工具]>[選項]，點開[文字編輯器]，如果你只有在 Transact-SQL 要顯示行號，請點選【Transact-SQL】，如果要在所有語言都顯示行號，請點選【所有語言】，在【顯示】下勾選【行號】，按【確定】。
![](/img/sql_server/11.png)


### 四、設定編輯前資料列指令的值
請選擇上方[工具]>[選項]，點開[SQL Server 物件總管]，修改紅色框格內，按【確定】即可。
![](/img/sql_server/12.png)



