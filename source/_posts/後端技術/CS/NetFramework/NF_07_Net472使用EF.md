---
title: 使用 Entity Framework 6 CRUD
date: 2022-12-19 21:30:00
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
- Entity Framework 6 : 透過資料庫提供者外掛程式模型搭配使用 SQL Server/Azure SQL Database、SQLite、Azure Cosmos DB、MySQL、PostgreSQL 及更多資料庫。

因此，使用EF6表現上會與 EF core 功能會也所不同。EF6是基於ADO.NET發展出來的物件關聯對應 (O/R Mapping)，利用了抽象化資料結構的方式，將每個資料庫物件都轉換成應用程式物件 (entity)，而資料欄位都轉換為屬性 (property)，關聯則轉換為結合屬性 (association)，讓資料庫的 E/R 模型完全的轉成物件模型。
![](/image/20221220_09-11-30.png)


參考文件 
1. microsoft : [microsoft Entity Framewor](https://learn.microsoft.com/zh-tw/ef/efcore-and-ef6/)
2. Wiki : [Entity Framework](https://zh.wikipedia.org/wiki/Entity_Framework )
3. Wiki : [Entity Framework Core](https://zh.wikipedia.org/wiki/Entity_Framework_Core)
4. Wiki : [ADO.NET](https://zh.wikipedia.org/wiki/ADO.NET)
5. The Will Will Web: [EF Core 已經不會在 SaveChanges() 的時候對實體模型進行額外驗證](https://blog.miniasp.com/post/2022/04/23/EF-Core-has-no-ValidateOnSaveEnabled-anymore)
6. [複雜類型 - EF 設計工具](https://learn.microsoft.com/zh-tw/ef/ef6/modeling/designer/data-types/complex-types)
7. [Entity Framework 6](https://learn.microsoft.com/en-us/ef/ef6/)


## 創建方式
這邊操作建議獨立 folder 存放"實體資料模型"。如以下步驟操作步驟
1. 選擇 ADO.NET 實體資料模型
2. 選擇 "來自資料庫的EF Designer" (本文使用 DB First) 
3. 選擇連線方式 (連線資訊會直接寫如Web.config當中)
4. 選擇版本 (建議選擇6.x穩定版本)
5. 選擇指定結構

![](/image/20221219_21-32-03.png)
![](/image/20221219_21-32-27.png)
![](/image/20221219_21-32-58.png)
![](/image/20221219_21-33-18.png)
![](/image/20221219_21-33-49.png)

### 起手前介紹
如果是初次使用EF的讀者，看看以下說明。
EF 創建後會產生 "DbContext"  可以從 xxx.context.cs 查看、修改、複寫。基於ADO.Net來說 EF 很貼心把 Connection Open()/Close() 寫好，使用上會比較友善許多、簡單。

![](/image/20221219_22-46-00.png)
![](/image/20221219_21-59-01.png)

xxx.edmx 下一篇會介紹如何此用，原則上他是資料庫、實體資料模型比較的參考文件後面再細談。

## 使用方式
這邊我們看看如何使用 CRUD 方式測試，這邊會使用非常簡單處理方式執行。如果想要本章節DB結構可以參考最下方。
EF 使用規則 :
1. 需要先初始化 dbcontext
2. 每當執行變更DB動作需要使用SaveChanges()動作

### 新增
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
        //存入
        db.DEMO_1.Add(new DEMO_1
        {
            text1 = "111",
            text2 = "222",
            text3 = "333",
        });

        //驗證、存檔
        db.SaveChanges();
      }
  }

```

## 修改
這邊稍微留意 EFCore 中是使用 ```Update```方式更新，EF則是直接修改當前"資料"使用上需要小心使用。
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

## 本章使用DB結構
```SQL
/****** Object:  Table [dbo].[DEMO_1]    Script Date: 2022/12/20 上午 09:59:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[DEMO_1](
	[text1] [nchar](10) NOT NULL,
	[text2] [nchar](10) NULL,
	[text3] [nchar](10) NULL,
 CONSTRAINT [PK_DEMO_1] PRIMARY KEY CLUSTERED 
(
	[text1] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
```