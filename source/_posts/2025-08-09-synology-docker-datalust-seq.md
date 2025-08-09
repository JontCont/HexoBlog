---
title: "[筆記] Synology 創建 Docker datalust/seq 環境"
date: 2025-08-09 10:00:00
categories: [Synology, Docker]
tags: [seq, datalust, logging, 教學]
---

## 前言
最近想要對 Synology 功能增加幾項應用，之前有篇任務排程產生的Redis 環境，這次使用 SSH Terminal 創建 datalust/seq 環境，這樣就可以在 Synology 上集中管理與查詢日誌。

---

# Synology 創建 Docker datalust/seq 環境教學

這篇文章將介紹如何在 Synology NAS 上，透過 Docker 建立 [datalust/seq](https://hub.docker.com/r/datalust/seq) 日誌伺服器環境。

## 一、前置準備
- 已安裝 Docker 套件於 Synology NAS
- 具備管理員權限
- 具備 SSH 存取權限


### 1-1 設定 SSH

在 Synology NAS 上啟用 SSH 功能：
1. 登入 DSM 管理介面。
2. 前往「控制面板」>「終端機與 SNMP」。
3. 啟用「SSH 功能」。

![](/image/20250809_20-11-51.png)



## 二、安裝 Docker

在 Synology NAS 名字不叫做 Docker，而是 [ Container Manager ] 需要到「套件中心」安裝。


## 步驟一：拉取 Seq 映像檔

1. 開啟 Synology Docker 套件。
2. 前往「倉庫伺服器」搜尋 `datalust/seq`，點擊下載最新版映像檔。

## 步驟二： 本機打開 Terminal 並連線 SSH NAS 環境

注意 : 需要使用管理員帳號連線。本篇 root 跟 ```<username>``` 密碼是一樣。

```cmd
ssh <username>@<NAS_IP> -p <port>
sudo -i
```

## 步驟三：建立並執行容器
在終端機中執行以下命令來建立並啟動 Seq 容器：

```bash
docker run -d --name datalust-seq-station --restart unless-stopped \
-e ACCEPT_EULA=Y \
-e SEQ_FIRSTRUN_NOAUTHENTICATION=true \
--network=bridge \
-p 7082:80 -p 5341:5341 \
datalust/seq:latest
```

### 完成 
完成後，你可以在瀏覽器中訪問 `http://<NAS_IP>:7082` 來存取 Seq 的 Web 介面。
![](/image/20250809_20-47-34.png)

如果需要可以透過 network 設定來調整容器的網路配置。
![](/image/20250809_20-48-12.png)

---

## 補充 : 

seq 有幾些會遇到的問題 : 
1. SEQ_FIRSTRUN_ADMINPASSWORD : 設定管理員密碼
2. SEQ_FIRSTRUN_NOAUTHENTICATION : 禁用身份驗證（不建議在生產環境中使用）
3. 會出現 ```  {"Error":"Seq is unavailable. Migrating metadata from an earlier Seq version..."} ``` 這部分可能是因為之前有安裝過 Seq，這時候可以刪除舊的容器並重新建立。


### Seq 監聽端點（Listening Endpoints）作用說明

```[05:20:34 INF] Seq listening on ["http://localhost/", "https://localhost/", "http://localhost:5341/", "https://localhost:45341/"]``` 這是 Seq 的預設或配置的網路端點，用於處理使用者介面（UI）、API 呼叫和日誌攝取（ingestion）。以下我將基於 Seq 的官方文件和配置邏輯，逐一解釋每個端點的作用。請注意，這些是本地端點（localhost），因此外部爬蟲無法存取，導致提供的搜尋結果顯示 "Crawl failed"（無法瀏覽）。這是預期行為，因為它們僅限於本機存取。

#### 每個端點的作用分析
Seq 預設使用 HTTP.sys 網路堆疊來監聽請求，支持 HTTP 和 HTTPS。端點可透過 `api.listenUris` 配置自訂（例如在 Seq 的設定檔中）。以下是這些端點的典型作用：

- **http://localhost/** 、**https://localhost/**：
  - **作用**：這是 Seq 的主要 HTTP 端點，通常綁定到預設端口（如80，如果未指定）。它處理完整的 Seq 功能，包括：
    - 使用者介面（UI）：瀏覽 Seq 的儀表板、查詢日誌等。
    - API 請求：發送/接收事件、配置設定等。
    - 日誌攝取：允許應用程式發送結構化日誌。


- **http://localhost:5341/**：
  - **作用**：這是 Seq 的**攝取專用端點**（ingestion-only port），專門用於接收日誌事件，不支援完整 UI 或 API 操作：
    - 只允許發送結構化事件（logs），如使用 CURL 或 Serilog 發送測試事件。
    - 無法存取 UI 或進行管理操作，這是為了安全設計（減少暴露表面）。
  - **適用情境**：適合從應用程式或容器發送日誌，例如：
    ```
    curl -XPOST "http://localhost:5341/api/events/raw?clef" -d "{'@t':'2025-08-09T13:16:00','@mt':'Test log'}"
    ```
    在 Docker 中，這是容器內的預設攝取端口，可透過 `-p` 映射到主機。

- **https://localhost:45341/**：
  - **作用**：這是 Seq 的**安全攝取專用端點**（HTTPS ingestion-only port），類似上述但使用加密：
    - 只處理日誌攝取，不支援 UI 或完整 API。
    - 提供加密通道，適合需要安全傳輸的環境。
  - **適用情境**：在 Production 中，從遠端應用發送加密日誌。端口 45341 是 Seq 常見的 HTTPS 攝取配置（可透過 `api.ingestionPort` 設定）。


---

## 總結

Seq 是一套強大的結構化日誌伺服器，適合 .NET、Node.js 等多種應用程式集中管理與查詢日誌。歡迎留言討論或分享你的使用經驗！
