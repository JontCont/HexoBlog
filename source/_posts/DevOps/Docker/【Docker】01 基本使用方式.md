---
title: Docker (一)- 基本使用方式 
date: 2023-11-28 14:36:04
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: https://www.docker.com/wp-content/uploads/2021/09/Moby-run.png
---



# Docker 
是一個快速建立、測試、部署程式的軟體平台。Docker 作為容器的作業系統與虛擬機器虛擬化伺服器硬體的方法相似，容器可虛擬化伺服器的作業系統。Docker 安裝在每部伺服器上，並提供簡單的命令讓您使用以建立、啟動或停止容器。

## 系統架構
Docker 系統架構主要是主從式(client-server)架構。如下方
- Docker Daemon (伺服器) : 用來執行管理 Docker image、啟動 container、停止 container 的 service，它是一個 long time service。
- Docker Client (客戶端) : 使用 Restful API 連到 Docker daemon，並且提供 command line 的方式讓使用者可以操作 docker。

## 主要元件
- 映像檔（image）: 執行特定環境所需要的資源，特色只允許唯獨。
- 容器（container）: 基於 image 可以建立出 Container，特色可讀寫。
- 倉庫（repository）: 存放 image 的空間，處理方式類似於git 。預設存取的 registry 為 DockerHub。

## 初次使用 
- 安裝網址:[https://www.docker.com/](https://www.docker.com/)
安裝方式不再贅述，原則上主機板如果有支援虛擬化都是可以使用docker ，如果有遇到錯誤問題可以考慮參考上一篇。

- 備註 : 本篇使用 powershell 。

接下來，我們要驗證是否有安裝成功需要輸入下方動作。
```cmd
docker run hello-world
```

若環境下出現 ```Hello from Docker!```恭喜各位完成第一步了。

### 查看狀態
這邊我們可以利用下方指令執行，可以顯示當前狀態。從狀態查看可以知道```Exited (0)```這裡面的狀態，查看方式 0為正常，其餘數值都為異常狀況，
```cmd
docker ps
```

### 移除 Container
docker image 作為映像檔不像 Container 可以不斷生成。若container 數量不斷成長會造成容量、管理相當不便，可以透由移除方式移出。

```cmd
# 使用 CONTAINER ID
docker rm [CONTAINER ID]

# 使用 Names
docker rm [Names]
```

補充 : 
若無法移除Container 需要加入 ```-f``` 參數。


### 移除 images
若要移除images 可以使用下方指令，這邊稍微留意Container 是否存在，必須要先移除Container 才能移除image。

```cmd
docker rmi [IMAGE]
```


## 參考文件
- [Day2：認識 Docker 基本概念](https://ithelp.ithome.com.tw/articles/10190728)
- [Day09 - Docker CLI 常用語法](https://ithelp.ithome.com.tw/articles/10215989)
- [30 天與鯨魚先生做好朋友系列](https://ithelp.ithome.com.tw/articles/10237506)
- [Understanding Docker Container Exit Codes](https://betterprogramming.pub/understanding-docker-container-exit-codes-5ee79a1d58f6ㄏ)