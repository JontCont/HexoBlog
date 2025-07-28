---
title: Docker (五) - httpd 修改 index 內容
date: 2023-12-13 20:03:00
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: https://www.docker.com/wp-content/uploads/2021/09/Moby-run.png
---

## 前置作業
完成下方指令已可繼續本章節。
```
 docker pull httpd
 docker create -p 8080:80 --name web -i httpd
 docker start web
```

## 進入 Container 內 Cli
```
docker ps -a #看狀態 
docker exec -it web bash
```


## 修改 index.html 內容
```
#找到 htdocs內的index.html
cat htdocs/index.html

## 修改index.html內容
echo Hello world - Docker > htdocs/index.html && exit

```
離開後直接開啟 http://localhost:8080/ 即可看到效果，如果看不到效果請再重新整理container。