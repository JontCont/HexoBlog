---
title: Docker (四)- port設定篇(httpd)
date: 2023-12-13 19:53:46
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: https://www.docker.com/wp-content/uploads/2021/09/Moby-run.png
---
## 使用 httpd 
這邊使用上篇使用方式設定port。步驟如下

### 創建 images
```cmd
docker pull httpd
```

### 創建 Container 環境
這裡需要留意 ```-p``` 、```--publish```兩個參數可以使用，都是設定port forwarding。
```8080:80```部分是指 host 8080連線後，會直接轉到Container 中的 80 port。
```cmd
docker create -p 8080:80 --name web -i httpd
```

稍微補充資訊，像是沒有特別指定 port 參數是不會有預設port ，如下圖顯示。
![](/image/20221213_19-53-46.png)

### 執行畫面
start沒有設定port參數，所以需要從 Container 設定 ，啟動後就可以使用 httpd畫面
```cmd
docker start web
```
![](/image/20221213_19-57-32.png)


## 刪除背景程式
httpd 執行後會以背景程式方式執行，如果想要直接結束作業必須要使用 ```-f```參數，如下指令。
```cmd
docker rm -f web
```
