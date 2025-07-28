---
title: 【LinqPAD】使用 LinQ (四) - Join 使用方式 
date: 2022-12-12 14:22:46
categories: 
  - 後端技術
  - LINQPad
tags: 
  - LINQPad
description:

cover: /img/Linq-Use-Day03/bg.png
---
LinQ 使用join 需要知道Outer及Inner兩個資料型別物件。

## JOIN 定義
Join方法如下:
```CS
public static IEnumerable<TResult> Join<TOuter, TInner, TKey, TResult>(
    this IEnumerable<TOuter> outer,
    IEnumerable<TInner> inner,
    Func<TOuter, TKey> outerKeySelector,
    Func<TInner, TKey> innerKeySelector,
    Func<TOuter, TInner, TResult> resultSelector);

public static IEnumerable<TResult> Join<TOuter, TInner, TKey, TResult>(
    this IEnumerable<TOuter> outer,
    IEnumerable<TInner> inner,
    Func<TOuter, TKey> outerKeySelector,
    Func<TInner, TKey> innerKeySelector,
    Func<TOuter, TInner, TResult> resultSelector,
    IEqualityComparer<TKey> comparer);
```
方法參數說明:
    - outer : 第一個序列項目的類型。
    - inner : 與 Outer 類型比對項目 (第二個序列項目類型)。
    - outerKeySelector : 跟 Inner 有關的屬性
    - innerKeySelector : 跟 Outer 有關的屬性
    - resultSelector   : 查詢結果內容
    - comparer : Inner 、 Outer 屬性的等值比較器
LINQ的Join方法是Inner Join，所以尋找的內容不存在資料不會出現

## 查詢運算式
使用 Join 簡易方式，以下方式有包含著多個Select 內容。
1. LINQ Query Expression
```cs
from row in Persons   
join part1 in Scores on row.Name equals part1.Name
select new { row.Name, Score = decimal.Parse(part1.Content)}

```

2. Lambda Expression
```cs
Persons
.Join(
	Scores, //抓取table
	x => x.Name , //抓取 table Persons
	y => y.Name , //抓取 table Scores
	(x,y)=>	new{ x.Name , Score = decimal.Parse(y.Content) }
)
```

## Join - 比對多筆
LinQ會比對同一行的資料，如果有多個不同資料內容就會需要對好資料內容。
1. LINQ Query Expression
```cs
from row in Persons 
join a in Scores on 
    new { row.Name } equals 
    new {   a.Name }
select new { a.Name,row.Sex , a.Content }
```

2. Lambda Expression
Lambda 則是比對x,y同樣也必須要同一個位置、同個名稱如果遇到名稱不一樣，可以使用 ```new{name = x.ClassName}```方式。
```cs
Persons.Join(
	Scores,
	x=>  new{ x.Name } , //比對1 
	y => new{ y.Name } , //比對2
	(x,y)=>new {
		Name    = x.Name,
		Sex     = x.Sex,
		Content = y.Content
})
```

## Left Join
LinQ 有 Join()是交集的概念，若要有Left join 可以使用 DefaultIfEmpty()，使用方式如下。

1. LINQ Query Expression
```cs
from row in Persons 
join a in Scores on row.Name equals a.Name 
into ps from a in ps.DefaultIfEmpty() //需加入這行
select a
```
使用會與SQL LEFT Join 觀念不太同，所以使用方式需要自行判斷。

## 參考文件
1. [Will - 分享幾個 LINQ to SQL 執行各種 Join 查詢的技巧] : https://blog.miniasp.com/post/2010/10/14/LINQ-to-SQL-Query-Tips-INNER-JOIN-and-LEFT-JOIN

2. [ 艾瑞克 - C# Linq Join & Lambda Join] : https://dotblogs.com.tw/erictsaiblog/2015/05/17/151321

## 結語
使用LinQ Join部分會比較難使用，需要多多測試練習才能上手。
如果是多Join (兩個以上)，建議能把它拆開就把它拆開，有可能遇到Join太多會導致搜尋效能會變差。