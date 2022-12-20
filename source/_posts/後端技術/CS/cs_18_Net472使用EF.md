---
title: Net 4.7.2 使用 Entity Framework
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - EF
cover: /image/20221219_21-45-27.png
---
使用前必須要先知道 Entity Framework 有兩個版本。
- Entity Framework Core : 適用於 .NET 的新式物件資料庫對應程式。 其支援 LINQ 查詢、變更追蹤、更新以及結構描述移轉。
- Entity Framework 6 (最新版) : 透過資料庫提供者外掛程式模型搭配使用 SQL Server/Azure SQL Database、SQLite、Azure Cosmos DB、MySQL、PostgreSQL 及更多資料庫。

參考文件 : https://learn.microsoft.com/zh-tw/ef/efcore-and-ef6/


## 創建方式
創建方式選擇 ADO.NET 實體資料模型即可。
![](/image/20221219_21-32-03.png)
![](/image/20221219_21-32-27.png)
![](/image/20221219_21-32-58.png)
![](/image/20221219_21-33-18.png)
![](/image/20221219_21-33-49.png)

## 起手前介紹
創建完成後，EF的核心 "DbContext" 繼承方式方取得DB資料。
留意一下，base裡面的參數是對應 "web.config"參數。

![](/image/20221219_22-46-00.png)
![](/image/20221219_21-59-01.png)

## 使用方式
基礎使用方式會想到以下四種執行方式，這邊會使用非常簡單處理方式執行。
EF 使用規則 :
1. 需要先初始化 dbcontext
2. 每當執行變更DB動作需要使用SaveChanges()動作

## 新增
```cs
  public class CRUD
  {
      public EF_Demo db = null;

      public CRUD()
      {
          db = new EF_Demo(); // 初始化 dbcontext
      }

      public void Add()
      {
          db.DEMO_1.Add(new DEMO_1
          {
              text1 = "111",
              text2 = "222",
              text3 = "333",
          });
          db.SaveChanges();
      }
  }

```



## 修改
```cs
  public class CRUD
  {
      public EF_Demo db = null;

      public CRUD()
      {
          db = new EF_Demo(); // 初始化 dbcontext
      }

      public void Update(string key)
      {
          var data = db.DEMO_1.Find(key);
          data.text2 = "222";
          data.text3 = "333";
          db.SaveChanges();
      }
  }

```

## 刪除
```cs
  public class CRUD
  {
      public EF_Demo db = null;

      public CRUD()
      {
          db = new EF_Demo(); // 初始化 dbcontext
      }

      public void Delete(string key)
      {
          var data = db.DEMO_1.Find(key);
          db.DEMO_1.Remove(data);
          db.SaveChanges();
      }
  }

```

## 查詢
```cs
  public class CRUD
  {
      public EF_Demo db = null;

      public CRUD()
      {
          db = new EF_Demo(); // 初始化 dbcontext
      }

      public void Query()
      {
          var datas =db.DEMO_1.ToList(); //取得資料

          foreach (var item in datas)
          {
              Console.WriteLine(item);
          }
      }
  }

```