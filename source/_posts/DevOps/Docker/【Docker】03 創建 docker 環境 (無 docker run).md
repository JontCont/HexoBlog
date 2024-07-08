---
title: Docker (三)- 創建 docker 環境 (無 docker run)
date: 2023-11-30 14:36:04
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: https://www.docker.com/wp-content/uploads/2021/09/Moby-run.png
---

上一章節有敘述使用 docker run 與 docker start 差異，一般使用Docker 除非是需要兩種同時生成，不然這東西相當不方便。以下作法會是用 pull、create 、start(stop) 。


## 清除 Images 映像檔
刪除Images如下方指令。如果執行後跟下方圖片一樣有錯誤訊息，可以看到 container 還有在使用中是不可以任意刪除，所以記得需要先刪除 container 才能刪除 Images。

```cmd
docker rmi [ContainerID]
docker rmi [names] 
```

![](/image/20221128_22-19-14.png)


# 初次使用 Docker 動作 
這次需要記一下使用順序，之後就會比較順手一些。
1. docker pull 
2. docker create 
3. docker start
4. docker stop

## 創建 Images (docker pull)
使用方式可以透過search 查詢名稱。這邊我們一樣使用```hello-world```來展示。
輸入方式如下:
```cmd
docker pull hello-world
```

![](/image/20221128_22-27-04.png)


## 創建 Container(docker create)
輸入方式如下:
```
docker create -i --name [Container Name] [Image Name]
```

## 執行 (docker start)
使用方式如下 :
```docker
docker start -i [ContainerID]
docker start -i [names] 
```

## 暫停 (docker stop)
使用方式如下 :
```docker
docker stop [ContainerID]
docker stop [names] 
```