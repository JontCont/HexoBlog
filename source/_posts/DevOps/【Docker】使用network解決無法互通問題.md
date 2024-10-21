---
title: 【Docker】使用network解決無法互通問題
date: 2024-10-21 15:10:00
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: /image/20241021_10-38-58.png
---

## 前言
近期都在玩 Discord Bot 開發。使用方式一定使用 docker 當作工作排程器讓程式運行時候，可以透過 docker desktop 來管理。但是在使用 docker 的時候發現一個問題就是無法互通，因為他本身架構是各之間的docker都是。這時候就需要使用 network 來解決這個問題。

---

## 一、Docker容器互相無法連線問題
對於一個 docker 使用不久的人來說，會以為都在同一個local network 應該要能互通，而且設定 port 也要吃得回去才合理。過程中得出一個結論就是隔離性，如下圖 :

![](/image/20241021_10-41-57.png)

其中，每個 docker 內部若允許 3000 port，但在本機的 ```http://localhost:3000``` 並不會吃得回去，這就是為什麼指令需要加入 `-p 3000:3000` 這個參數。

### 1-1 解決方式
解決方向就是要讓 docker 容器A可以允許容器B的請求，這時候就需要使用 network 來解決這個問題。

### 1-1-1 創建一個新的 network
我們需要有個環境中，彼此可以互通的網路，這時候就需要創建一個新的 network。
```cmd
docker nework create my-network
docker network ls # 查看 network 清單
```

### 1-1-2 將容器加入 network
加入前必須要注意，當容器加入 network 後，localhost 要改成 ```http://container_name:port``` 這樣才能互通。下面範例中是 ```http://my-services:3000```要設定給 my-bots 。
```cmd
docker run --network my-network --name my-bots discordbot
docker run --network my-network --name my-services -p 3000:3000 discordbot_db
```

### 補充 - docker-compose
- 若是使用 docker-compose 的話，可以在 docker-compose.yml 中加入 network 的設定。
```yml
version: '3'
services:
  my-bots:
    image: discordbot
    networks:
      - my-network
  my-services:
    image: discordbot_db
    ports:
      - "3000:3000"
    networks:
      - my-network
networks:
  my-network:
```

### 補充 - 測試連線
- 可以透過以下指令來測試是否可以互通。
```cmd
docker exec -it [容器名字] bash
apt-get update && apt-get install -y curl # 如果容器沒有 curl 的話，需要安裝
curl http://my-services:3000
```

---

## 參考文件
- [Day-8 解析 Docker Network](https://ithelp.ithome.com.tw/articles/10242460)