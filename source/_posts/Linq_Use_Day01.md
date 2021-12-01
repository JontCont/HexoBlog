---
title: Linq CS 常見使用方式
categories: CS
tags: 
  - CS
  - Net FrameWork
description:
keyword: 'Net FrameWork, CS , linq '
cover: /img/Linq-Use-Day01/bg.jpg
---

# VSC - 所需的套件
## [Mindbox.Data.Linq]
- https://www.nuget.org/packages/Mindbox.Data.Linq/

## [System.Linq]
- https://www.nuget.org/packages/System.Linq/

## [System.Data.SqlClient]
- https://www.nuget.org/packages/System.Data.SqlClient/

# 使用方式
## 1. Array
linQ可以將陣列重新排序或是重新查詢，以下使用讀取方式：
```CS
    public void linqArrayExmple(){
        string[] sName = {"周杰輪","周潤發","劉得華","周深"};
        var vSearch = from s in sName  select s ;
        //或  var vSearch = sName; 為全部搜尋
        
        foreach(var i in vSearch){
            Console.WriteLine(i + "\t" );
        }
    }
```

linQ有很多種寫法，也可以使用下方兩種寫法設定變數。
```var vSearch = from s in sName where s.Contains("周") select s ;```
```var vSearch = sName.Where(sName => sName.Contains("周"));```

linQ也提供很多Function可以使用，如下方式用取得第一個、最後一個資料 First()、Last():
```CS
Console.WriteLine("ElementAt -> 2 = {0}", sName.ElementAt(2));
Console.WriteLine("First no.1 = {0} no.2 = {1}" 
    ,sName.First(), sName.First(name => name.Length == 3));
Console.WriteLine("Last  no.1 = {0} no.2 = {1}" 
    ,sName.Last() , sName.Last(name => name.Length == 3));
```

## 2. SQL
如果使用SQL不用DataTable使用方式，先創建Student的Class。
當資料庫抓取會依據Student內容抓取。
```CS 
    using System.Data.Linq.Mapping;
    
    [Table(Name="學生備份")] //對應資料表
    class Student{
        [Column(Name="學號")]
        public string Std_ID {get;set;}
        [Column(Name="姓名")]
        public string Name {get;set;}
        [Column(Name="性別")]
        public string Sex {get;set;}
        [Column(Name="電話")]
        public string Tel {get;set;}
    }

```
這邊我使用的方式是Function來呈現，取得資料庫中叫做 Student的table讀到 Class Student 三個內容。
讓他打印出 學號、姓名、電話。
```CS
public void LinqEaxmple(){
    //conn sql string
    string strConn = "Data Source=DESKTOP-2HU7NL0\\CONT;Initial Catalog=Linq_Example;User ID=sa;Password=root;Pooling=True";
    DataContext dc = new DataContext(strConn);
    //GET TABLE
    Table<Student> students = dc.GetTable<Student>();
    //select data
    var data= from s in students select s;
    Console.WriteLine("學號\t姓名\t電話");
    foreach(var i in data){
        Console.WriteLine(i.Std_ID+"\t"+i.Name+"\t"+ i.Tel);
    }
}
```

## DataTable  
資料表比較多種情況，這範例講解簡單的使用方式，後續詳細說明使用linQ方式。
DataTable必須要先使用 AsEnumerable() 才能用linQ查詢，如果你要Where() 就需要配合 Field<>，比較麻煩是資料需要轉換資料型態，轉型失敗就會有錯誤問題。
```CS
using CS;
using System;
using System.Data.Linq;
using System.Data;
using System.Collections.Generic;
namespace CS
{
    class Program
    {
        static void Main(string[] args)
        {
            comm comm = new comm();
            //將資料轉成dataTable
            string sSql = "SELECT * FROM Student"; 
            DataTable dt = comm.Get_DataTable(sSql);
            
            var test = from row in dt.AsEnumerable() select row ;
            foreach(var i in test){
                Console.WriteLine(i.Field<string>("pro_name"));
            }
        }
    }
}
```

## List
List跟DataTable是差不多的問題，都要使用AsEnumerable()，過程中可能需要拿捏好取值得方式。
這邊範例可以參考DataTable寫法。
```CS
using CS;
using System;
using System.Linq;
using System.Data.Linq;
using System.Data;
using System.Collections.Generic;
namespace CS
{
    class Program
    {
        static void Main(string[] args)
        {
            comm comm = new comm();
            string sSql = "SELECT * FROM MEB20_0000"; 
            DataTable dt = comm.Get_DataTable(sSql);
            List<MEB20_0000> result = dt.AsEnumerable()
                .Select( row => new MEB20_0000{
                    pro_name = row.Field<string>("pro_name")
                }).ToList();
            foreach(var i in result){
                Console.WriteLine(i.pro_name);
            }
        }
    }
}
```