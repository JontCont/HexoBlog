---
title: LinQ　介紹
categories: C#
tags: 
  - C#
  - Net FrameWork
description:
keyword: 'Net FrameWork, C# , linq '
cover: /img/Linq-introduce/bg.jpg
---

# Linq 簡介
## 何謂Linq ?
語言整合查詢（英語：Language Integrated Query，縮寫：LINQ）， 顧名思義就是此程式語言擁有查詢資料的能力，LINQ的出現使得C#(F#、VB.NET也可以使用)有能力可以在程式中查找資料。
利用標準查詢運算子(Standard Query Operators)，工程師可以用原生的C#語言對資料做處理，選擇資料來源、進行篩選到組合、分組都可以利用標準查詢運算子完成，而且在撰寫的過程中還可以享受到型別檢查及自動完成帶來的便捷。

## LINQ的組成
LINQ是一種能力，微軟開發出了很多不同的技術讓C#擁有這樣的能力。

## 1. Standard Query Operators
標準查詢運算子是應用於集合類別的運算子，它對集合實作了篩選、組合、排序..等等的運算功能，像是Select、Where、OrderBy...等方法，而這些方法就是運作於IEnumerable<T>、IQueryable<T>之上，所以前面的章節說明IEnumerable及泛型就是想要講解LINQ的核心運作方式。

## 2. Language Extensions
為了使LINQ可以更加便捷的使用而將C#擴充了以下的功能:

### a. Query Expression(Query Syntax)
查詢運算式(Query Expression)是一種跟SQL搜尋語法相似的運算式，透過查詢運算式，我們可以對資料做相關的處理，下面是一個最基本的查詢運算式:

```C# 
from x in Products
select x.ProductName
```

此段語法會被Compiler轉譯為標準查詢運算子:

```C#
Products
   .Select (x => x.ProductName)
```

 而最後進資料庫的會是下面這樣的SQL語法:

```C#
SELECT [t0].[ProductName]
FROM [Products] AS [t0]
```

### b. Implicitly typed variables
隱含型別變數就是我們在JavaScript上又愛又恨的var，但C#中的var變數還是強型別的變數，它會透過賦予變數的型別來推斷此變數為何種型別(type inference)。

### c. Anonymous types
匿名型別可以只宣告資料欄位而不需要明確定義類別，這樣的技術在Select或是Join的時候非常好用，因為這些查詢有很大的機會不會是原來的物件。

### d. Object Initializer

可以直接在new的時候訂定類別的參數初始值，例如說像是下面這樣:
```c#
Person person = new Person {
    Name = "John Doe",
    Age = 39
};  // Object Initializer

// Equal to
Person person = new Person();
person.Name = "John Doe";
person.Age = 39;
```
## 3. Lambda Expression
是一種匿名方法，LINQ在Query Expression轉為Standard Query Operators時會使用它來做轉換，另外我們以方法使用LINQ時也會使用Lambda。
---

# LINQ providers
有沒有想過為什麼LINQ可以對Objects、Database做查詢?這中間其實就是有Provider在幫我們做事情，透過Provider，我們可以在不需要了解實際運作下對其做資料的處理。

## LINQ to Objects
Provider就是利用這個介面去對任何要查詢的物件做處理，只要你的物件有實作IEnumerable這個物件，你就可以使用LINQ。

## LINQ to SQL
因為Database有自己的查詢引擎，所以無法直接透過LINQ的語法做處理，Provider處理了LINQ與SQL查詢語法間的轉換還有應用程式與資料庫間的溝通。

## LINQ to JSON