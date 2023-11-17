---
title: Git (六) - 回到先前的commit
date: 2023-03-02 10:12:45
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---

## 前言
這篇紀錄一下上篇文章的補充，因為有時候會需要回到先前的commit，所以這邊紀錄一下。

## 問題
近期專案會想要把 commit 重新整理，發覺現在的commit 與先前commit結果不一樣，所以想要回到先前的commit。

## 解決方式
首先請將 現有的分支在copy一份出來，並且要切換到該分支。
```cmd
git checkout -b <new branch name>
```

再將commit回到正常版本
```cmd
git reset --hard <commit id>
```

之後會遇到現行分支需要把它pull下來，這時候要把它 force 掉，因為現行分支的commit已經不是最新的了。
以下兩種方式可以使用，但是要注意，請不要再重要分支這樣搞，不然會有很大的風險。
```cmd
git push -f
git push -force
```



