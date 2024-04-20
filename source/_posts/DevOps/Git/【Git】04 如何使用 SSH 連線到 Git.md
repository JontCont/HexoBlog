---
title: 【Git】- 如何使用 SSH 連線到 Git
date: 2023-03-02 10:12:45
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---

## 前言
這邊主要是針對使用SSH方式進行Git操作，因為有時候會遇到需要使用SSH方式進行操作，因此這邊紀錄一下。

## 什麼是 SSH（Secure Shell）
SSH（Secure Shell）是一種網路協議，用於安全地在網絡上進行數據通信、遠程訪問和遠程管理。SSH 的目的是通過加密和認證機制來保護網絡通信的安全性，特別是在不受信任的網絡中進行數據傳輸。

1. 遠程登錄（Remote Login）：SSH 允許用戶從遠程位置（例如家中或辦公室之外）安全地登錄到遠程服務器或計算機上，並在遠程計算機上運行命令。

2. 文件傳輸（Secure File Transfer）：SSH 提供了安全的文件傳輸機制，允許用戶在本地計算機和遠程服務器之間傳輸文件，這種機制通常用於上傳或下載文件。

3. 遠程管理（Remote Management）：系統管理員可以使用 SSH 遠程管理遠程服務器或設備，包括配置、監控和維護。

### 安全性 
1. 加密（Encryption）：SSH 使用加密算法對數據進行加密，使得數據在傳輸過程中無法被未經授權的第三方窺探或修改。

2. 身份驗證（Authentication）：SSH 使用公鑰加密和私鑰解密的技術，允許用戶通過憑證來證明自己的身份，從而防止未經授權的訪問。


## 如何使用SSH
這邊主要是使用Git Bash 進行操作，首先需要進入到Git Bash 進行操作，這邊會有兩種方式進行操作。

### 一、ssh-keygen指令
ssh-keygen 是一個用於生成 SSH 密鑰對的工具，它允許用戶生成用於身份驗證的公鑰和私鑰

#### 參數
1. `-t <keytype>`：指定要生成的密鑰類型。常用的類型包括 rsa（默認）、dsa、ecdsa 和 ed25519。
2. `-b <bits>`：指定 RSA 密鑰的位數。默認值是 2048。
3. `-C <comment>`：添加一個註釋，通常用於識別該密鑰的用途。
4. `-f <filename>`：指定要保存生成的密鑰文件的路徑和文件名。
5. `-N <passphrase>`：為私鑰加上密碼短語，增加安全性。
6. `-q`：靜默模式，生成過程中不顯示進度。
7. `-E <hash>` OpenSSH 7.2 及更高版本）。
8. `-F <hostname>`：檢查特定主機的 known_hosts 文件，用於查找指定主機的密鑰。
9. `-l`：列出指定密鑰文件的指紋（fingerprint）。
10. `-B`：顯示指定密鑰文件的 bubblebabble 格式。

![](/image/20230801_23-21-38.png)

### 二、使用Git Bash 進行操作
1. 首先進入到Git Bash 進行操作，輸入以下指令。
```bash
ssh-keygen
```
2. 如果沒特別指定路徑預設(C:\Users\使用者名稱/.ssh/id_rsa)，沒有特定指定密碼可以直接按下Enter。

![](/image/20230801_23-20-46.png)
![](/image/20230801_23-23-11.png)

### 三、使用Git SSH Key
使用 SSH KEY 使用 id_rsa.pub 檔案內容即可。
### Gitlab
1. 首先進入到Gitlab，點選右上角的頭像，點選Settings。
![](/image/20230801_23-31-26.png)
2. 點選左邊的SSH Keys，將剛剛產生的SSH Key 貼上，並且輸入Title，點選Add key。
![](/image/20230801_23-32-43.png)

### Github
1. 首先進入到Github，點選右上角的頭像，點選Settings。
![](/image/20230801_23-34-17.png)

2. 點選左邊的SSH and GPG keys，點選New SSH key。
![](/image/20230801_23-34-03.png)

3. 將剛剛產生的SSH Key 貼上，並且輸入Title，點選Add SSH key。
4. 加入後會看到如下畫面。
![](/image/20230801_23-36-23.png)


## 參考資料
1. [Day 23 — 實驗室前置作業：GitLab 開發前置設定 (SSH 通道)](https://ithelp.ithome.com.tw/articles/10305020)
2. [SSH 金鑰：免密碼登入遠端主機、傳遞檔案](https://noob.tw/ssh-key/)