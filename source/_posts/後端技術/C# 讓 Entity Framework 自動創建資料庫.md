---
title: C# 讓 Entity Framework 自動創建資料庫
date: 2022-12-19 21:45:27
categories: 
  - 後端技術
  - C#
tags: 
  - Core
  - C#
keyword: 'Core, dotnet  , C#'
cover: /image/20221219_21-45-27.png
---

## 前言
最近需要放送心情，將這個主題延後兩三個月才公布。EF 已經在業界當中不可或缺的一個技術，這次就來介紹如何使用EF自動創建資料庫。

---

## EF 創建資料庫方法
### 一、EnsureCreated
這個方法是在EF Core 1.0版本中新增的，這個方法會檢查資料庫是否存在，如果不存在就會建立資料庫，但是這個方法只會建立資料庫，不會建立資料表，所以這個方法只適合在開發階段使用。

EnsureCreated() 創建是空白資料表。因此，需要使用還是要有個地方站存資料，例如 : excel 、access 、json等。

規則 :
1. 如果資料庫不存在，就會建立資料庫、資料表。
2. 如果資料庫存在，就不會做任何事情。
3. 如果資料庫存在且資料表不存在，就不會建立資料表。 

介於這個方法特性，可以知道他不具有更新資料表的能力，通常會與Migrations使用或是自動測試之類。

```cs
using (var context = new BloggingContext())
{
    context.Database.EnsureCreated();
}
```

### 二、Migrations
可以利用Migrations檔案達到版控的效果，裡面還提供版本號讓後續維護更有彈性。
![](/image/20230711_22-31-16.png)

#### 2-1 前置作業
1. 安裝套件
```cmd  
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

2. 新增資料庫連線字串
```json
"ConnectionStrings": {
    "Dev": "Data Source=***;Initial Catalog=***;Persist Security Info=True;User ID=***;Password=***"
  }
```

3. 建立資料庫連線
```cs
public class Comm
{
    public string ConnectionString(string Connect)
    {
        IConfiguration config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .Build();
        return config.GetConnectionString(Connect);
    }
}
```

4. 建立資料庫連線
```cs
public class BloggingContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(new Comm().ConnectionString("Dev"));
    }
}
```

5. 建立資料表
```cs
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }

    public List<Post> Posts { get; set; }
}

public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}
```

#### 2-2 使用方式
1. 建立 Migrations
利用 ```dotnet ef migrations add InitialCreate``` 指令，會在專案中建立一個 Migrations 資料夾，裡面會有一個檔案，檔案名稱是我們指定的名稱，這個檔案就是我們的 Migrations 檔案，裡面會有一些我們的資料表建立的指令。

```cmd
dotnet ef migrations add InitialCreate
```

如果資料表有異動可以利用 ```dotnet ef migrations add InitialCreate``` 指令，他會將異動的資料表建立的指令，寫入到 Migrations 檔案中。

注意 : 如果 Create 多張表而產生的 migrations ，當異動想還原必須要把之前的 table 異動修至上一個版本。 


2. 更新資料庫
假設我們有多個 Migrations 檔案，我們可以使用 ```dotnet ef database update``` 指令，會依照我們的 Migrations 檔案順序，依序執行資料表建立的指令。

```cmd
dotnet ef database update
```

### 2-3 程式碼使用方式
這個作法如同上面的使用方式  ```dotnet ef database update``` ，只是將指令改成程式碼而已。需要事先加入 migrations 檔案。

```cs
using (var context = new BloggingContext())
{
    context.Database.Migrate();
}
```
