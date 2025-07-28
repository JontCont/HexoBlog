---
title: 【Docker】dotnet 與 node 一次用上起來
date: 2024-10-13 21:40:59
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: /image/20241013_21-40-29.png
---

## 前言
最近已經荒廢學習技術相關東西，主要經營都是在 discord 上面。剛好這次想要透過 docker 代替常駐程式作法，因此，這次來試試看 dotnet 與 node 一次用上起來。


## 一、dotnet 環境
上次我有一篇是提到 api 上架部分，這邊我考慮不使用任何程式碼快速產生一個 dotnet、dockerfile。

- 相關連結 : [Docker】使用VSC部屬minimal api](https://jontcont.github.io/2024/06/23/DevOps/%E3%80%90Docker%E3%80%91%E4%BD%BF%E7%94%A8%20minimal%20api%20%E9%83%A8%E5%B1%AC/?highlight=webapi+docker)

處理方式很簡單，但我們實際要用的是 Console App，因此我們可以透過 dotnet new console 來建立一個 Console App。

```cmd
dotnet new console -n dotnet_node
cd .\dotnet_node\
code . # 開啟 VS Code
```
### 1-1 VS Code 加入 Dockerfile
這邊我們可以看到 Program.cs 內容，這邊我們不會特別修改，只是要部屬到 docker 中。接著我們用 ```ctrl + shift + p``` 來搜尋 docker: add docker files to workspace，這邊我們選擇 .NET Core 就完成了，連程式碼都不用打就完成裡面的內容。
以下範例是用 **StartFMS.DiscordBot** 範本。

```dockerfile
# 基礎映像
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 1950 # 開放 port

ENV ASPNETCORE_URLS=http://+:1950

# 構建映像
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["StartFMS.DiscordBot.csproj", "./"]
RUN dotnet restore "StartFMS.DiscordBot.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "StartFMS.DiscordBot.csproj" -c $configuration -o /app/build

# 發佈映像
FROM build AS publish
ARG configuration=Release
RUN dotnet publish "StartFMS.DiscordBot.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# 最終映像
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StartFMS.DiscordBot.dll"]
```

### 1-2 執行 docker build / run
使用方式依據下方指令即可執行。restart=always 是指當 container 關閉時會自動重啟，如果重開/開機電腦就會隨著 docker 一起啟動。
```cmd
docker build -t dotnet_node . # 建立映像
docker run -d --restart=always dotnet_node . # 執行映像
```

---


## 二、node 環境
我這邊工具會著重於 node express 製作 api + json 當作簡易的資料庫環境。


### 2-1 建立 node 專案
```cmd
npm init # 初始化專案
npm install express # 安裝 express
```

### 2-2 創建 index.js

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

### 2-3 執行 node
基本上 node 就完成了，接續就轉到 dockerfile 的部分。

```cmd
node index.js
```


### 2-4 Dockerfile

創建方式一樣 ```ctrl + shift + p``` 來搜尋 docker: add docker files to workspace，這邊我們選擇 Node.js 就完成了。需要注意是內容不能使用產生的內容，再請改成以下內容。
本次使用 3000 port 如果需要換就自行換掉。

```dockerfile
# 使用官方 Node.js LTS 版本作為基礎映像
FROM node:lts-alpine

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝應用依賴
RUN npm install --production

# 複製應用程式碼
COPY . .

# 暴露應用運行的端口
EXPOSE 3000

# 使用非 root 用戶來運行應用
RUN chown -R node /usr/src/app
USER node

# 啟動應用
CMD ["node", "index.js"]
```

### 2-5 執行 docker build / run
使用指令與 dotnet 稍微不一樣，dotnet 版本後面還有一個點也就是說要指定目錄，而 node 就不用就不會有dotnet問題。啟動後就可以透過 url 來看到結果。

```cmd
docker build -t node_sample # 建立映像
docker run -d --restart=always node_sample # 執行映像
```