---
title: 【VS Code】Live Server 解決 Https、SSL 問題
date: 2023-01-01 19:18:57
categories: 
  - 筆記 
  - 生活雜記
tags: 
  - vsc
  - Chocolatey
  - mkcert
cover: /image/20230101_19-18-57.png
---
## 前置作業
### 準備工具、網址
1. Chocolatey : [https://chocolatey.org/](https://chocolatey.org/)
2. Live Server : [https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)


### 安裝方式
1. 開啟系統管理員 Powershell 安裝 Chocolatey
```cmd
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
2. 安裝 mkcert
```cmd
choco install mkcert
```

## Mkcert使用步驟
###  一、創建專案
![](/image/20230101_19-15-11.png)

### 二、創建本機CA
```
mkcert localhost
```

### 三、設定 setting 參數
```json
{
    "liveServer.settings.host": "localhost",
    "liveServer.settings.https": {
        "enable": true, //set it true to enable the feature.
        "cert": "E:\\LiveServer\\CA\\localhost.pem", //full path
        "key": "E:\\LiveServer\\CA\\localhost-key.pem", //full path
        "passphrase": "12345"
    },
}
```

### 執行
打開後，上方就可以看到是否有沒有 SSL。
![](/image/20230101_19-17-46.png)