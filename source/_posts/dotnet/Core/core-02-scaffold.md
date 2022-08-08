---
title: (筆記) Net Core - Scaffold 
categories: 
  - dotnet
  - C#
tags: 
  - core
  - C#
  - Scaffold
description:
keyword: 'core  , C# , Scaffold'
cover: /img/dotnet/bg/cs_bg_005.jpg
---

# Scaffold 
又可稱"鷹架"、"支架"。Scaffold 是可以解釋為程式碼產生器，可以透由指令產生出想要的檔案、專案，使用部分通常是透由指令方式呼叫、產生指令。dotnet.exe內也有提供scaffold概念。

## 專案
Net Core SDK安裝時候會提供預先定義的 scaffold 範本(example: dotnet.exe)。 以下指令參考 : 
- 展開 dotnet.exe 清單 : ```dotnet new --lists ```
- 求救指令 : ``` dotnet new -h```


## Entity Framework Core 
EF Core 使用方式與 EF 不同，EF Core 基於 Scaffolding 實體類型類別和 DbCoNtext 類別的程式。可以透由套件管理員主控台 (PMC):```Scaffold-DbContext```或是 NET 命令列介面 (CLI): ```dotnet ef dbcontext scaffold``` 產生出檔案。

### 注意事項
- 必須使用```Microsoft.EntityFrameworkCore.Design``` NuGet 套件
- 需要安裝相關工具 : 
  1. [套件管理員主控台 (PMC)](https://docs.microsoft.com/zh-tw/ef/core/cli/powershell)
  2. [NET 命令列介面 (CLI)](https://docs.microsoft.com/zh-tw/ef/core/cli/dotnet)

### 使用方式 - NET 命令列介面 (CLI)
```cmd
dotnet ef dbcontext scaffold "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Chinook" Microsoft.EntityFrameworkCore.SqlServer
```

### 使用方式 - 套件管理員主控台 (PMC)
```cmd
Scaffold-DbContext 'Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Chinook' Microsoft.EntityFrameworkCore.SqlServer
```

## 參考文件
1. [反向工程](https://docs.microsoft.com/zh-tw/ef/core/managing-schemas/scaffolding?tabs=dotnet-core-cli)
2. [[Web API]基本CRUD 程式碼產生器(Scaffold)](https://dotblogs.com.tw/stanley14/2016/07/02/193832)