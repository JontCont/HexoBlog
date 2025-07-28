---
title: 【Docker】使用VSC部屬minimal api 
date: 2024-06-23 03:35:59
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: /image/20240622_23-45-22.png
---
## 前言
近期因為有上課需求，剛好有提到 docker 部屬部分稍微研究一下，發現VS Code擴充套件還不錯用，所以這邊簡單紀錄一下如何使用 Visual Studio Code 部屬 minimal api 到 docker 中。


### 必要工具
這邊我使用 windows 環境，如果沒有下載 docker desktop 可以先下載，這邊不會特別教學，可以參考官網下載。
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Visual Studio Code](https://code.visualstudio.com/)

#### VS Code Docker 
- 相關連結 : [Docker in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

這套件可以讓你在 VS Code 中直接操作 docker ，不需要再開啟 terminal 來操作，而且也幫忙把 container 與 image 顯示出來，操作方面相當方便。
![](/image/20240622_23-10-41.png)

如果有顯示 failed to connect to docker daemon 之類訊息，請確認 docker hub 有沒有打開。主要原因是 docker 服務會透過 Docker Desktop 來打開，若要使用其方式打開可以參考 dockercli.exe 方式開啟。

![](/image/20240622_23-13-08.png)

---
### 部屬 minimal api 專案
### 一、創建、開啟 minimal api 專案
這邊我們使用 dotnet new minimalapi 來建立一個 minimal api 專案，這邊我們使用 dotnet 8.0 版本。

```cmd
dotnet new web -n minimalapi
cd .\minimalapi\
```

如果打開專案後，可以參考看看 Program.cs 內容，這邊我們不會特別修改，只是要部屬到 docker 中。

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

```

#### 二、部屬 minimal api 專案
接下來我們要部屬 minimal api 專案到 docker 中，這邊我們使用 Visual Studio Code 來操作。
```cmd
dotnet publish /t:PublishContainer
```
執行完成後，在 docker UI 上面可以看到 image 已經在裡面了，這邊我們可以直接選擇 image 來執行。
![](/image/20240622_23-27-04.png)
![](/image/20240622_23-27-47.png)


### 補充
##### 非 Web .NET 應用
對於非 Web 的 .NET 應用（例如控制台應用或工作者模板），```/t:PublishContainer``` 是必須的參數，用來指示 ```dotnet publish``` 命令將應用程式發佈為容器

#### Web .NET 應用
對於 Web 應用，如 ASP.NET Core 應用，你需要使用不同的參數。例如，可以使用 ```-p:PublishProfile=DefaultContainer``` 或其他適用的發佈配置檔來取代 ```PublishContainer``` 參數

---

#### 三、利用 docker run 啟動 minimal api 專案
我們這邊可以透過下拉選單上面的 ```run insteractive``` 來啟動 minimal api 專案，這邊我們可以看到執行結果。其實你們可以看到當我直接執行時候，他的行為是 rm 動作，當 container 停止時候會自動刪除。
![](/image/20240622_23-30-57.png)

因為是預設的行為，docker 預設是8080 port ，所以我們可以直接在瀏覽器上面輸入 [http://localhost:8080/](http://localhost:8080/) 來看到結果。如果剛好8080被使用可以透過 docker run --rm -p 8081:8080 來指定 port。

順便補充一下，如果要在背景且執行中斷後要移除要使用以下做法 ```docker run -d --rm -p 8080:8080 minimal``` 就可以了。


#### 四、部屬時候設定 image 版本
一般來說，我們在部屬時候會設定版本號，這邊我們可以透過 docker run -d --rm -p 8080:8080 minimal:1.0 來設定版本號。但是如果在donet 部屬時候預設版號則是 latest 版本，如果要有版本關係可以參考下方作法。

```cmd
dotnet publish /t:PublishContainer -p:ContainerImageTags="1.0.0;latest"
```

這樣就可以在部屬時候設定版本號了。

#### 五、指定 PORT 來啟動
這邊使用方式很簡單，docker 預設時候是用 8080 port 所以輸入方式會如下 : 
```cmd
docker run -d --rm -p 5000:8080 minimal:1.0.0
```
這樣就可以在 5000 port 啟動 minimal api 專案了。

---
### 參考文件
1. [Docker in Visual Studio Code](https://code.visualstudio.com/docs/containers/overview)