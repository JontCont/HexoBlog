---
title: 【LinqPAD】使用 LinQ (三) - LinqPad 工具
date: 2022-12-12 14:22:46
categories: 
  - 後端技術
  - LinQ
tags: 
  - LinQ
description:
keyword: 'Net FrameWork, C# , linq '
cover: /img/linq_use_day02/bg.png
---

如果要繼續深入使用 LinQ ，那一定要說一下最近使用的工具 LinqPad。

## [LinQpad](http://www.linqpad.net/)
這工具是一套免費軟體，注意一下環境必須要安裝 .NET Framework 3.5或是4.0以上，免費版功能已經夠用測試LinQ使用。

如果需要code snippets,autocompletion, smart tags, code outlining, .NET Reflector integration 功能就前往升級版本。

詳細說明請至 IT邦幫忙(Peter Chen) : https://ithelp.ithome.com.tw/articles/10193063

---

# 創造資料庫
這邊為了快速建檔，可以使用下方語法創建資料庫。
我們需要創建個人資料以及成績，之後會用 LINQ 串出來。

## 資料庫
```sql
/****** Object:  Database [TestDB]    Script Date: 2021/12/3 下午 10:40:32 ******/

CREATE DATABASE [TestDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TestDB', FILENAME = N'd:\SQL\TestDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TestDB_log', FILENAME = N'd:d:\SQL\TestDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

```

## 資料表結構
```SQL
CREATE TABLE [dbo].[person](
	[name] [nchar](10) NULL,
	[age] [nchar](10) NULL,
	[sex] [nchar](10) NULL
) ON [PRIMARY]
GO


CREATE TABLE [dbo].[score](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nchar](10) NULL,
	[score] [nchar](10) NULL
) ON [PRIMARY]
GO

```

## 連接LinQ
畫面左邊可以看到有 [add connection] 字眼，點選後選擇 Sql Server 選項，如果不是Sql Server可以選擇下方選項。
![](/img/linq_use_day02/01.jpg)
![](/img/linq_use_day02/02.jpg)
這裡會需要自己得登入Sql Server 後，按下完成即可。
![](/img/linq_use_day02/03.jpg)
![](/img/linq_use_day02/04.jpg)

---

## 使用 LinQPad
使用前到LinQPad記得要切換資料庫，再來請自行在資料庫key資料。
![](/img/linq_use_day02/05.jpg)

## Select 字句
linQ 有兩種寫法，LINQ Query Expression、Lambda Expression。
1. LINQ Query Expression
寫法會比較偏向 SQL 語法比較容易學起來，需要注意是每一個結尾都要加上 ```SELECT``` 字眼。
```cs
from row in Persons select row
```
2. Lambda Expression
LINQ方法配上Lambda運算式，句子會比較好識別。
```cs
Persons.Select(x=>x)
```

## Where 字句
1. LINQ Query Expression
以下範例是簡易判斷，如果要增加判斷自行使用(&& 、 ||)。
Example : ```row.Age != "13" && row.Name == "Eric" ``` 

```cs
from row in Persons 
where row.Age != "13" 
select row
```

2. Lambda Expression

```cs
Persons.Where(row=> row.Age!= "13")
```

### Contains 
Linq遇到沒有Like語法怎麼辦? 這裡使用 " Contains " 類似於Link效果。
1. LINQ Query Expression

```cs
from row in Persons 
where !row.Age.Contains("3")
select row
```

2. Lambda Expression

```cs
Persons.Where(row=> !row.Age.Contains("3"))
```

## OrderBy 排序
排序在Sql中是扮演很重要角色，所以要先使用看看LinQ如何呈現。
### Asc 
用過Sql 都知道Asc代表結果會以由小往大的順序列出，以下使用為例。

1. LINQ Query Expression

```cs
from row in Persons 
where !row.Age.Contains("3")
orderby row.Age 
select row
```

2. Lambda Expression

```cs
Persons
	.Where(row=> !row.Age.Contains("3"))
	.OrderBy(row=> row.Age)
```

### Desc
如果有使用過LinQ Desc排序需要打很長的英文字是很正常的，LINQ Query Expression 會需要在結尾加上 " descending " 請各位多多留意千萬不要打成Desc。

定義 : DESC 代表結果會以由大往小的順序列出。
1. LINQ Query Expression

```cs
from row in Persons 
where !row.Age.Contains("3")
orderby row.Age descending
select row
```

2. Lambda Expression

```cs
Persons
	.Where(row=> !row.Age.Contains("3"))
	.OrderByDescending(row=> row.Age)
```

## GroupBy 群組
GroupBy群組會直接影顯顯示內容，如果需要顯示多筆請加入```new{}```字句。
1. LINQ Query Expression

```cs
from row in Persons 
where !row.Age.Contains("3")
group row by row.Age into groups 
select groups
```

2. Lambda Expression

```cs
Persons
	.Where(row=> !row.Age.Contains("3"))
	.GroupBy(row=>row.Age)
```
---
## 結語
LinQ 使用上如果遇到多種、多個資料行，需要加入 ```new{}```方式。
以上的介紹的寫法比較常使用的方式，下次章節會介紹 join使用方式。

