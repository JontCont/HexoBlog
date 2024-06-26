---
title: 【LinqPAD】Entity Framework 使用方式
date: 2024-06-16 20:22:46
categories: 
  - 後端技術
  - LINQPad
tags: 
  - LINQPad
description:
cover: /image/20240526_16-31-14.png
---

# LinqPAD】Entity Framework 使用方式
繼上篇簡單介紹LINQPad 模式，接下來我們來看看如何使用Entity Framework。剛開始使用會比較難知道要選擇哪個做連線，這邊我們來看看三種連線方式 :
- 用 SQL 連線資料庫 (LINQ to SQL)
- 使用 Entity Framework Core 版本
- 使用 DLL 連線

![](/image/20240616_22-34-21.png)

以上三個都是 Entity Framework 的連線方式，這邊我們來看看如何使用。

--- 
### 用 SQL 連線資料庫 (LINQ to SQL)
這東西是透過 ```SQL Server```、```SQL Azure```、```SQL CE 4.0``` 連線資料庫，這樣就可以直接使用 SQL 語法查詢資料庫。其他Azure、CE 我就不多做介紹了。
![](/image/20240616_22-35-30.png)

#### 使用 DataBase 設定
這東西通常是微軟自家產品快速建立資料庫，可以快速建立 OEM 。主要三個模式 : 
##### 一、單一資料庫
有個 Specify new or existing database 選項可以指定其中一個做為連線資料庫。
![](/image/20240616_22-37-37.png)

#### 二、指定資料庫檔案
指定 mdf 檔案，這樣就可以直接連線到資料庫。
![](/image/20240616_22-42-01.png)

#### 三、全部顯示 
選擇 Dispalay all in a treeview 會顯示所有資料庫。效果如下圖
![](/image/20240616_22-44-44.png)

---

### 使用 Entity Framework Core 版本
這東西是跨平台的 ORM，可以支援多種資料庫，如 SQL Server、SQLite、MySQL、PostgreSQL、Oracle、DB2 等等。包含可以切換EF Core 版本可以快速直到各版本的語法糖
![](/image/20240616_22-51-15.png)

設定方式也很簡單，按照上面輸入框輸入就可以使用了。

#### Friendly Name 
如果不使用這個來命名，預設會把伺服器名稱當作名稱，這樣會很難辨識，所以建議使用 Friendly Name 來命名。
![](/image/20240616_22-57-01.png)


---

### 使用 DLL 連線
這個是使用自己的專案來連線，這樣就可以直接使用專案的資料庫，這樣就可以直接使用專案的資料庫。
![](/image/20240616_22-59-28.png)

1. Path to Custom Assembly : 這是選擇你專案的 DLL 檔案。
2. Full Type Name : 這是選擇你專案的 DbContext 名稱。

如果要使用務必不要選擇DEBUG的DLL，才不會道除錯時候被占用。