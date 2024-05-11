---
title: 【C#】使用 Microsoft Access 作為資料庫 (使用 .NET 6) 
date: 2022-07-19 21:28:02
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - VSC
  - Access
description:
keyword: 'C#, DB, Microsoft, Access'
cover: /img/dotnet/bg/cs_bg_006_WSDL.png
---

## 前言
使用 Access 主要原因是為了做小型專案減少開發才會使用的一個DB 環境，廣泛性不大但是可以做簡單的系統，可以使用看看。


## 創建 AccessContext
前期可以得之 EF 通常都是用在Ms SQL 、My SQL 等載入，若要達到建議版本可以參考下方做法。

### 取得連線字串
驅動方式可以參考 : [【Microsoft】](https://learn.microsoft.com/zh-tw/office/troubleshoot/access/cannot-use-odbc-or-oledb)
```cs
        public AccessContextcs()
        {
            string connectionString = "Driver={Microsoft Access Driver (*.mdb, *.accdb)}; Dbq=D:\\Git\\Github\\00_Source\\ng-homestay\\WebApi\\lanyuanApi\\DbContext\\AccessUsers.accdb; ";
            Connection = new OdbcConnection(connectionString);
        }

```
### 製作相關Table
```cs
    public IEnumerable<Information> InformationData()
    {
        var queryText = "SELECT * FROM Information";
        var data = Connection.Query<Information>(queryText);
        return data.AsEnumerable();
    }

    public IEnumerable<BasicUserAccess> BasicUserAccessonData()
    {
        var queryText = "SELECT * FROM BasicUserAccess";
        var data = Connection.Query<BasicUserAccess>(queryText);
        return data.AsEnumerable();
    }
    public IEnumerable<Introduction> IntroductionData()
    {
        var queryText = "SELECT * FROM Introduction";
        var data = Connection.Query<Introduction>(queryText);
        return data.AsEnumerable();
    }

```

### 整體程式碼
```cs
using Dapper;
using lanyuanApi.Models;
using System.Data.Odbc;

namespace lanyuanApi.DbContext
{
    public class AccessContextcs
    {
        public OdbcConnection Connection { get; set; } = default!;
        public AccessContextcs()
        {
            string connectionString = "Driver={Microsoft Access Driver (*.mdb, *.accdb)}; Dbq=D:\\Git\\Github\\00_Source\\ng-homestay\\WebApi\\lanyuanApi\\DbContext\\AccessUsers.accdb; ";
            Connection = new OdbcConnection(connectionString);
        }

        public IEnumerable<Information> InformationData()
        {
            var queryText = "SELECT * FROM Information";
            var data = Connection.Query<Information>(queryText);
            return data.AsEnumerable();
        }

        public IEnumerable<BasicUserAccess> BasicUserAccessonData()
        {
            var queryText = "SELECT * FROM BasicUserAccess";
            var data = Connection.Query<BasicUserAccess>(queryText);
            return data.AsEnumerable();
        }
        public IEnumerable<Introduction> IntroductionData()
        {
            var queryText = "SELECT * FROM Introduction";
            var data = Connection.Query<Introduction>(queryText);
            return data.AsEnumerable();
        }
    }
}
```

