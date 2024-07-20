---
title: Docker (二)- docker run 與 docker start 
date: 2023-11-29 14:36:04
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: https://www.docker.com/wp-content/uploads/2021/09/Moby-run.png
---

這邊簡單操作一次 docker run 與 docker start 有什麼特別差異。
## 準備工具
開始前，兩套工具可以準備，若不使用Desktop也能操作。
- Docker Desktop  : https://www.docker.com/products/docker-desktop/
- Cmd / terminal

## Images 映像檔
Images 作為映像檔，基底需要Containers 來執行。使用image 可以透過 ``` docker search ``` 查詢image name。

### Search 搜尋
搜尋 : **hello-world** 。內容內會有很多相關的hello-world，可以依據需求選擇需要的名稱執行、輸入。
![](/image/20221128_14-36-04.png)

### 建立 Image - Hello World
簡單敘述 Docker 創建方式。如果Docker內容已經有存在Hello World 是不會再產生的二個Image (Hello World) ，從下圖可以得到結果。
執行方式
```docker
docker run hello-world
```
![](/image/20221128_14-47-20.png)

### Docker Desktop - Image / Containers
從Docker Desktop 可以看得出來，只要執行 ```docker run hello-world``` Containers 會不斷的產生出來，當中結論是
- Image初始化會產生 SHA256
- 執行 docker run 同時會新增 **Containers**

![](/image/20221128_14-51-23.png)
![](/image/20221128_14-51-35.png)

{% note info simple %}
### 查詢狀態
指令可以直接看到Container 狀態，可以得知Images 對象。
![](/image/20221128_15-00-00.png)
{% endnote %}

## Containers 容器

### 清除多餘的 container
現在我們先把Docker 裡面的 Container清理。清理方式以下兩行指令
```docker 
docker rm [ContainerID]
docker rm [names] 
```
![](/image/20221128_15-09-23.png)

### 只執行Container
執行方式如下。下方的 ```-i -t ``` 意思是需要Container互動需要加入的參數。
如果執行這個只需要使用暫停 Container。
```docker
docker start -i [ContainerID]
docker start -i [names] 
```

### 暫停 Container
執行方式如下。如果執行這個只需要使用暫停 Container
```docker
docker stop [ContainerID]
docker stop [names] 
```

## 結論
從執行下來 docker run 很貼心把Image 、Container 加入進去，如果需要個別方式執行需要透過以下順序
- pull (抓下 images)
- create (創建 container)
- start (執行 container)
如果直接使用docker run 可能會遇到 contrainer 無法管理的問題，後續會在針對上面三個指令做敘述。

docker run = docker pull + docker create + docker start