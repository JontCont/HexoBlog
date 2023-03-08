---
title: sourcetree(二)-目前分支解衝突
categories: 
  - DevOps
  - sourcetree
tags: 
  - sourcetree
cover: /image/20230101_23-33-32.png
---

## 前言
SourceTree 目前是眾多企業使用的一套Git GUI 介面軟體，初期因為努力摸索有幾些問題不知道怎樣排除，會配合Github Desktop 解決目前問題。遇到問題是當需要 Push 時候與Pull產生衝突，要如何解決。

## 驗證方式
使用 Commit 中， "Amend latest commit" 選項達成當前情境。 
![](/image/20230308_11-05-06.png)

### 步驟
1. 創建新的分支，建議不要跟develop或是 master 有任何關聯。
![](/image/20230308_11-14-38.png)

2. 新增 .Txt 就可
![](/image/20230308_11-15-45.png)

3. 第一次Commit 不要勾選任何選項。但切記要**隨便寫任何字**。
![](/image/20230308_11-16-35.png)


4. 第二次設定 Commit 需要把 "Amend latest commit"  勾起來，就可以達到這樣效果。
![](/image/20230308_11-25-04.png)
![](/image/20230308_11-26-03.png)

## 解決步驟
選擇要Commit 項目 (通常是第一個)，再選擇 "Reset current branch to this commit"，選擇要保留方式即可完成。
![](/image/20230308_11-29-48.png)
![](/image/20230308_11-30-03.png)
![](/image/20230308_11-38-08.png)

目前為止還沒發現，Push 前可以使用 Undo 的方式 (Github 有這項功能)，那只能暫時使用這招解決現行問題。