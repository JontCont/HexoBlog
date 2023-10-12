---
title: C# - .NEt Cli Port 設定方式
date: 2023-10-12 22:56:41
categories: 
  - 後端技術
  - C#
tags: 
  - Core
  - C#
keyword: 'Core, 2FA , C#'
cover: /image/20231012_23-08-02.png
---
## 前言
近期想要用 Cli 執行專案遇到 Port 不是自己當初設定的Port，因此想要記錄一下。


### dotnet run
dotnet run 有含 --urls 參數可以將網址設定進去，如下方範例。
```cmd
dotnet run --urls=http://localhost:5000
```
#### 補充 launchSettings 使用方式
可以透過 Properties > launchSettings.json 進行設定並執行，如下方範例。
```json
{
  "profiles": {
    "WebApplication1": {
      "commandName": "Project",
      "dotnetRunMessages": "true",
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5000;https://localhost:5001",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```
```cmd
dotnet run --launch-profile "WebApplication1"
```


### dotnet watch 
dotnet watch 與run 不同，沒有一個參數可以設定Port有關的參數，因此需要透過 Program.cs案進行設定。
```cs
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000);
});
```

```cmd
dotnet watch 
```

#### 補充 launchSettings 使用方式
如果想要依照 launchSettings.json 進行設定，可以透過下方方式進行設定。
```json
{
  "profiles": {
    "test": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "https://localhost:4001;http://localhost:4000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
  }
}
```

```cmd
dotnet watch run --launch-profile "test"
```
