---
title: StartFMS.Extensions.Configuration 使用方式
categories: 
  - 雲端平台
  - Nuget
tags: 
  - Nuget
description:
keyword: 'Nuget, C# ,.Net'
cover: /image/20230402_16-57-24.png
---
## 安裝方式
.NET Cli
```cli
dotnet add package StartFMS.Extensions.Configuration --version 1.0.0
```

Package Manager
```cli
NuGet\Install-Package StartFMS.Extensions.Configuration -Version 1.0.0
```

## 使用目的
利用擴充方式減少呼叫的動作以及方便呼叫 Azure 設定、管理使用者密碼(secrets.json)等檔案。

![](/image/20230405_11-36-23.png)

## 使用方式
1. 使用 ```Config``` 呼叫
2. ```GetConfiguration()``` 可抓取 appsetting、secrets
3. Azure Confidential 參數使用 ```GetAzureConfiguration()```

## 範例
透過 Program.cs 傳入參數 
```cs
var config = Config.GetConfiguration(); //加入設定檔
var  ChannelToken = config.GetValue<string>("Line:Bots:channelToken");
var  AdminUserID = config.GetValue<string>("Line:Bots:adminUserID");
```

## Method
目前有以下Function可以使用
1. GetConnectionString(string name)
2. GetAzureConfiguration(string connectionString)
3. GetConfiguration()
4. GetConfiguration(string path)
5. GetAzureConfiguration<T>()
6. GetAzureConfiguration<T>(string path)

GetAzureConfiguration(string connectionString) 主要是給 Azure Configuration 使用，記得把連線字串加入上去即可。
