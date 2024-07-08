---
title: ASP NET Core Module (ANCM) 運作方式
date: 2024-07-08 16:23:40
categories: 
  - DevOps
  - IIS
tags: 
  - IIS
---

## ANCM 是什麼？

ASP.NET Core 模組 (ANCM) 是一個本機 IIS 模組，用於在 IIS 上托管 ASP.NET Core 應用程序。它允許 IIS 作為正向代理，用來將 web 請求轉發給後端的 ASP.NET Core 應用程序。

### ANCM 的運作方式

ANCM 可以透過兩種主要的模型來運行 ASP.NET Core 應用程序：

- **In-process hosting model**：在這種模式下，ASP.NET Core 應用程序運行在 IIS 的工作進程（w3wp.exe）內。這樣可以減少數據傳輸的開銷，提升性能。
![](/image/20240708_10-33-58.png)

- **Out-of-process hosting model**：這種模式下，IIS 會將 HTTP 請求轉發給後端運行的 Kestrel 服務器（ASP.NET Core 的內置 Web 服務器）。這種方式具有更高的靈活性，允許後端進行更獨立的配置和管理。
![](/image/20240708_10-34-42.png)

此外，ANCM 還負責管理 ASP.NET Core 應用程序的進程，包括啟動、停止和監控應用程序的運行狀態。

### ANCM 的優點

- **高性能**：預設採用進程內托管模型，有助於提升應用程序的性能和診斷能力。
- **進程管理**：ANCM 能夠監控應用程序進程並在崩潰時自動重啟，確保應用程序的高可用性。
- **靈活性**：支援進程內和進程外兩種托管模型，可以根據實際需求進行靈活選擇。
- **易於部署**：ANCM 支援自動化部署，如使用 "app_offline.htm" 文件來優雅地關閉應用程序並進行更新。

---
## 觀察 ANCM 的運作方式

我們可以利用 [Process Explorer](https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer) 觀察 ANCM 的運作方式。

### 一、In-process hosting model
預設 ASP.NET Core 應用程序使用進程內托管模型(In-process hosting model)，可以在 IIS 的工作進程（w3wp.exe）內運行。
![](/image/20240708_10-40-19.png)

### 二、Out-of-process hosting model
如果將 ASP.NET Core 應用程序配置為使用進程外托管模型(Out-of-process hosting model)，則 IIS 會將 HTTP 請求轉發給後端運行的 Kestrel 服務器。下圖可以看到 dotnet process 和 w3wp process 分別運行在不同的process中
![](/image/20240708_10-42-32.png)


#### 補充 : 如何在 publish 時設定 ANCM 的運作方式
```bash
dotnet publish -c Release /p:AspNetCoreHostingModel=InProcess
dotnet publish -c Release /p:AspNetCoreHostingModel=OutOfProcess
```

---

## 參考資料
1. 適用於 IIS 的 ASP.NET Core 模組 (ANCM):  [https://learn.microsoft.com/zh-tw/aspnet/core/host-and-deploy/aspnet-core-module?view=aspnetcore-8.0](https://learn.microsoft.com/zh-tw/aspnet/core/host-and-deploy/aspnet-core-module?view=aspnetcore-8.0)