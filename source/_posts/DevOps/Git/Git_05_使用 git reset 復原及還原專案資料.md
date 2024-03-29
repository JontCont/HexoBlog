---
title: 【Git】- 使用 git reset 復原及還原專案資料
date: 2023-03-02 10:12:45
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---

專案有時因功能需求或是其他原因，會需要回復到之前的版本。通常會有兩種狀況不是專案壞掉、設定檔跑掉，初起可以先用以下做法來驗證。

## 還原方式
## 一、還原最新的commit 
通常使用時機會是因為專案壞掉，或是設定檔跑掉，可以先還原最新的commit。
```cmd
git reset --hard HEAD
```

## 二、還原其他commit指令
若發現還原最新的commit後，還是有問題，可以使用以下指令還原其他commit。
```cmd
git reset --hard <commit id>
```

---
## 補充
.git 是git的版本控制資料夾，裡面存放了git的版本控制資料，如果刪除了這個資料夾，就無法使用git來控制版本了，但是這並不會影響到你的專案資料，只是無法使用git來控制版本。

相對，如果你只有取得一個.git是可以利用 ```git reset```把資料還原回來，可以不必要打包太大資料給對方。
