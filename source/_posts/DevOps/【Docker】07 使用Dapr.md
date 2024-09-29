---
title: 【Docker】使用 Dapr 與 WebAPI
date: 2024-09-29 13:35:59
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
  - dapr
description:
cover: /image/20240929_11-34-27.png
---

## Dapr 是什麼
Dapr 是一個開源的分散式應用程式運行時，它提供了一個簡單的方式來編寫微服務應用程式，並且可以在任何地方運行。Dapr 可以在任何地方運行，無論是在本地開發機器、Kubernetes 集群、虛擬機器、容器或者 IoT 裝置上。Dapr 通過提供一組獨立於語言的 API，來幫助開發人員編寫微服務應用程式。這些 API 包括狀態管理、消息發送、事件驅動、觀察、密碼管理等功能。
### 一、安裝方式
- 安裝dapr cli : ```powershell -Command "iwr -useb https://raw.githubusercontent.com/dapr/cli/master/install/install.ps1 | iex"```
- 使用 winget 安裝:  ```winget install Dapr.CLI```

安裝完成後，從新開啟一個終端機，輸入```dapr -h```，如果有顯示以下畫面代表安裝成功。
![](/image/20240929_10-34-11.png)


### 二、dapr 初始化動作
- 使用```dapr init```初始化一個新的專案 (若要確認版本號，可以使用```dapr --version``` 或 ```dapr -v```)
- 初始化後，會在 ```%USERPROFILE%/.dapr``` 下產生一個 ```config.yaml``` 檔案，這個檔案是dapr的設定檔，可以在這邊設定dapr的一些參數。
- 而外初始化會有 docker 容器啟動，可以使用```docker ps```查看啟動的容器。
![](/image/20240929_10-54-40.png)


### 三、建立一個新的專案
以上都開起來之後，可以直揭開使用API專案串接，以下是一個簡單的範例。
(更新 24/9/29 : dapr 最近有更新語法在特定blog是沿用舊的CLI，下方是最近的語法)
1. 建立一個新的專案: ```dotnet new webapi -n daprSample```
2. 啟動 dapr: ``` dapr run --app-id api --app-port 5212 --dapr-http-port 3500 dotnet run```

以上動作就完成API的建立，可以使用```http://localhost:5212/weatherforecast```來測試API是否有成功建立。


#### 3-1 使用 .http 檔案來測試API
這邊是使用 NET 8 系列，C#已經有提供 ```.http``` 檔案給開發者來測試API，這邊是一個簡單的範例。
基本上進去到檔案資料夾會長這樣，可以直接點擊檔案來測試API。
```http
@nonUseDapr = http://localhost:5212

### non dapr
GET {{nonUseDapr}}/weatherforecast/
Accept: application/json
```

![](/image/20240929_11-14-24.png)

這樣代表API已經成功建立，但是這動作並非是 dapr 功能所以我們來調整 dapr 提供的網址。

#### 3-2 使用 dapr 提供的網址來測試API
這邊再請各位讀者使用以下範例執行就可以得出 3-1 的結果，是一樣的結果。
```http
@dapr = http://localhost:3500/v1.0/invoke/api/method
### dapr
GET {{useDapr}}/weatherforecast/
Accept: application/json
```

**如何知道 dapr 預設的網址呢？**  
Dapr 的root API 路徑，後面可以加上具體的 API 路徑來調用不同的功能。例如：
- 狀態管理 API: http://localhost:3500/v1.0/state/{storeName}
- 服務調用 API: http://localhost:3500/v1.0/invoke/{appId}/method/{methodName}
- 發布/訂閱 API: http://localhost:3500/v1.0/publish/{pubsubName}/{topic}

API 使用要使用 **服務調用 API** 網址來調用。 appId 就是使用 CLI 時候給予的參數，而 methodName 就是 API 的路徑。

解析CLI指令參數 : 
範例指令 : ```dapr run --app-id api --app-port 5212 --dapr-http-port 3500 dotnet run```
- appId: api
- app-port: 5212  <- 這是API的port
- methodName: weatherforecast
- dapr-http-port: 3500 <- 這是dapr的port (調用API的port)