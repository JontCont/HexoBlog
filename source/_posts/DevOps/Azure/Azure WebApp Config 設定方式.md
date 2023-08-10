---
title: 【Azure】Web Application 設定方式
categories: 
  - 雲端平台
  - Azure
tags: 
  - Azure
description:
keyword: 'Cloud  ,Azure'
cover: /image/20230310_08-44-55.png
---

## 使用方式
可以使用 [StartFMS.Extensions.Configuration](https://www.nuget.org/packages/StartFMS.Extensions.Configuration)進行開發

## 使用概念
開始前，先釐清 json 呼叫方式。以下為 appsetting.json 並示範如何呼叫下方內容
```json

{
  "Line" :{
    "LineToken" :""
  },
  "Setting": ""
}
```
使用方式很簡單，只需要知道上層下層關係即可，例如 需要取得 ```LineToken``` 對應是 ```Line:LineToken```，若只有單層只需要 "Setting" 就可以舉得到值。


## 應用程式設定
位於 【Web 應用程式】> 【組態】專案進行設定即可，使用方式需要用 Json 命名如下圖。
![](/image/20230405_12-49-29.png)


如何在 C# 舉得到 Azure 參數，其實是透過 ```AddEnvironmentVariables()```這個來取得，預設它會自動帶入 ```EnvironmentVariables``` 所以無需要特別針對 ```AddAzureAppConfiguration```進行設定。


## 連接字串
連線字串與上面不同使用方式，呼叫方式則是用 ```GetConnectionString()```取得連線字串與DB連線。


## StartFMS.Extensions.Configuration 作法
如果是用這擴充套件使用方式如下範例，如同 Azure 參數設定一樣很簡單。
```cs
var config = Config.GetConfiguration(); //加入設定檔
var  ChannelToken = config.GetValue<string>("Line:Bots:channelToken");
var  AdminUserID = config.GetValue<string>("Line:Bots:adminUserID");
```

目前有以下Function可以使用
1. GetConnectionString(string name)
2. GetAzureConfiguration(string connectionString)
3. GetConfiguration()
4. GetConfiguration(string path)
5. GetAzureConfiguration<T>()
6. GetAzureConfiguration<T>(string path)

GetAzureConfiguration(string connectionString) 主要是給 Azure Configuration 使用，記得把連線字串加入上去即可。