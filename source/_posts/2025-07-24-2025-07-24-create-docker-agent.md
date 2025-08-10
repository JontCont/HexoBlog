---
title: '[DevOps] 創建一個 docker agent'
date: 2025-07-24
categories:
  - DevOps
tags:
  - docker
  - agent
cover: /image/20250810_08-16-08.png
---

## 前言：為什麼要自建 Azure DevOps Docker Agent？

在企業或團隊導入 CI/CD 流程時，Azure DevOps 雖然提供雲端 agent，但很多時候我們需要「自訂環境」來跑特殊的 build、測試或部署腳本。這時候，自己架設一個 docker agent 就變得超級重要！

**動機與場景：**
- 需要安裝特定版本的 SDK、CLI 或工具
- 需要存取內部網路資源（如私有資料庫、API）
- 想要更彈性地控管 agent 的資源、隔離性與安全性
- 減少雲端 agent 排隊、加速 pipeline 執行

這篇文章就是要教你，如何用 Docker 快速打造一個專屬於 Azure DevOps 的自動化 agent，讓你的 CI/CD 流程更穩定、更可控！

> 🚀 延伸閱讀：如果你還沒玩過 Docker，建議先看這篇入門文：[Docker (一)- 基本使用方式](./【Docker】01%20基本使用方式.md)




## 架構與重點檔案

這個專案的核心，就是用 Docker 容器包裝 Azure DevOps agent，並用 docker-compose 管理多個服務（如前後端、資料庫等），讓 agent 可以在「完全自訂」的環境下執行 pipeline。

```
agent/
├── docker-compose.yml    # 主要容器配置，定義 agent 及相關服務
├── docker-compose-backend.yml # 可獨立啟動前後端/資料庫服務
├── .env                  # Azure DevOps 連線資訊（URL、Token、Pool、Agent Name）
├── start-all.ps1         # 一鍵啟動/管理所有服務
├── deploy.ps1            # 安全部署腳本
├── manage-container-files.ps1 # 檔案同步與管理
└── ...（其他專案目錄）
```

### 重要 docker-compose 語法片段說明

#### 1. Azure DevOps Agent 服務（docker-compose.yml）

```yaml
services:
  azdo-agent:
    image: mcr.microsoft.com/azure-pipelines/vsts-agent:latest
    container_name: azdo-agent
    environment:
      - VSTS_ACCOUNT=${VSTS_ACCOUNT}
      - VSTS_TOKEN=${VSTS_TOKEN}
      - VSTS_POOL=${VSTS_POOL}
      - VSTS_AGENT=${VSTS_AGENT}
      - VSTS_WORK=${VSTS_WORK:-/vsts/work}
    restart: unless-stopped
    volumes:
      - agent-data:/azp
      - ./work:/vsts/work
      - ./tcbbank:/vsts/work/r1/tcbbank
      - ./tcbbank-web:/vsts/work/r1/tcbbank-web
    ports:
      - "5300:5300"
      - "5200:5200"
volumes:
  agent-data:
```

- `image`：直接用官方 Azure Pipelines agent 映像檔，省去自己維護底層環境。
- `environment`：用 `.env` 變數注入帳號、token、pool 等資訊，確保敏感資料不寫死在檔案裡。
- `volumes`：將本地專案目錄掛載進容器，讓 agent 可以直接存取、同步程式碼。
- `ports`：如需本地測試服務，可直接對外開放端口。

#### 2. 前後端與資料庫服務（docker-compose-backend.yml）

```yaml
services:
  tcbbank-backend:
    build:
      context: ./tcbbank
      dockerfile: Dockerfile
    container_name: tcbbank-backend
    environment:
      - NODE_ENV=production
      - PORT=5300
      - REACT_APP_API_URL=http://tcbbank-backend:5300
    ports:
      - "5300:5300"
    volumes:
      - ./tcbbank:/app
      - /app/node_modules
    restart: unless-stopped
    networks:
      - fullstack-network

  tcbbank-frontend:
    build:
      context: ./tcbbank-web
      dockerfile: Dockerfile
    container_name: tcbbank-frontend
    environment:
      - NODE_ENV=production
      - PORT=5200
      - REACT_APP_API_URL=http://tcbbank-backend:5300
    ports:
      - "5200:5200"
    volumes:
      - ./tcbbank-web:/app
      - /app/node_modules
    depends_on:
      - tcbbank-backend
    restart: unless-stopped
    networks:
      - fullstack-network

  database:
    image: postgres:13
    container_name: tcbbank-db
    environment:
      - POSTGRES_DB=tcbbank
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - fullstack-network

volumes:
  db-data:

networks:
  fullstack-network:
    driver: bridge
```

- `build`：可自訂 Dockerfile，讓每個服務有獨立的環境（如安裝特定 SDK、lib）。
- `depends_on`：確保前端服務啟動前，後端已經 ready。
- `networks`：所有服務都在同一個 bridge network，方便互通。
- `database`：可選，直接用官方 Postgres image，方便本地測試與 CI/CD。

這些設定讓你能彈性組合、擴充服務，並確保每個 pipeline 執行時，環境都是一致、可控的。

> 🧩 延伸閱讀：想知道 docker-compose 怎麼玩？[Docker (三)- 創建 docker 環境 (無 docker run)](./【Docker】03%20創建%20docker%20環境%20(無%20docker%20run).md)



## 如何快速建立 Azure DevOps Docker Agent？

1. **安裝必要工具**：Docker Desktop、PowerShell 5.1+、Git。
2. **下載專案**：
  ```powershell
  git clone <repository-url>
  cd agent
  ```
3. **設定 .env**：填入 Azure DevOps URL、Token、Pool、Agent Name。
4. **啟動 agent 容器**：
  ```powershell
  docker-compose up -d
  ```
5. **（可選）同步專案檔案**：
  ```powershell
  .\manage-container-files.ps1 -Action extract-all
  ```
6. **一鍵啟動所有服務**：
  ```powershell
  .\start-all.ps1
  ```

> 💡 延伸閱讀：如果你對 port 設定、網路互通有疑問，推薦這兩篇：
> - [Docker (四)- port設定篇(httpd)](./【Docker】04%20port設定篇(httpd).md)
> - [Docker】使用network解決無法互通問題](./【Docker】使用network解決無法互通問題.md)



## 關鍵腳本與自動化流程

- `start-all.ps1`：一鍵啟動/停止/重啟/檢查所有服務。
- `deploy.ps1`：安全部署、備份、強制部署、自動驗證。
- `manage-container-files.ps1`：同步、備份、進入容器、看日誌。

這些腳本讓 agent 的生命週期、檔案同步、部署都能自動化，確保每次 pipeline 執行都在「乾淨、可控」的環境下。

> 🛠️ 延伸閱讀：如果你想深入了解 Docker 指令、run/start 差異，推薦這篇：[Docker (二)- docker run 與 docker start](./【Docker】02%20docker%20run%20與%20docker%20start.md)



## 進階應用與最佳實踐

- **自訂 agent 環境**：可在 Dockerfile 安裝任何你 pipeline 需要的工具。
- **多 agent 部署**：可同時啟動多個 agent，分流 pipeline 任務。
- **安全隔離**：每個 agent 都在獨立容器，避免環境污染。
- **資源控管**：可在 docker-compose.yml 設定記憶體、CPU 限制。

> 🔥 延伸閱讀：
> - [Docker】dotnet 與 node 一次用上起來](./【Docker】dotnet%20與%20node%20一次用上起來.md)



## 常見問題與排解

### 1. agent 無法註冊/連線不上 Azure DevOps
- 檢查 .env 內容（URL、Token、Pool 名稱）是否正確
- 檢查網路、防火牆設定

### 2. 容器啟動失敗/port 衝突
- 檢查 docker-compose.yml port 是否被佔用
- 停止其他佔用服務，或調整 port

### 3. pipeline 執行時缺少工具
- 修改 Dockerfile，安裝所需 SDK/CLI
- 重新 build image 並重啟 agent

> 🧑‍💻 延伸閱讀：[Docker (六) Windowns 11 疑難排解](./【Docker】06%20Windowns%2011%20疑難排解.md)



## 結語：讓 CI/CD 更彈性、更安全！

自建 Azure DevOps docker agent，讓你能完全掌控 pipeline 執行環境，無論是特殊工具、內部資源存取、還是多 agent 分流，都能輕鬆搞定。這就是現代 DevOps 團隊提升自動化、效率與安全的關鍵！

有任何問題或想法，歡迎留言討論，一起讓 DevOps 生活更美好！




