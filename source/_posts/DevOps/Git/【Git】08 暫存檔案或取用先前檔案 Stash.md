---
title: 【Git】- 使用 Git Stash 暫存檔案或取用先前檔案 
date: 2023-11-20 12:00:30
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---

## Git Stash 
git 內有個功能叫做 stash，可以將目前的程式碼暫存起來，這個功能可以用在以下幾種情境。

1. 切 branch 之前功能尚未完成，但是又不想 commit
2. 用解衝突方案

## 使用方式
### 查看 Stash 清單  
```cmd
git stash list
```

### 存檔目前程式碼
```cmd
git stash save <message>
```
### 取出/套用 Stash
以下兩個是不同概念，pop 會將 stash id 移除，apply 會保留 stash id。
若是想要把local參數加入，一般都是使用apply來套用。
```cmd
git stash pop <stash id>
git stash apply <stash id>
```

### 刪除 Stash
```cmd
git stash drop <stash id>
```

### 清除所有 Stash
```cmd
git stash clear
```

## 結論
stash 功能可以將目前的程式碼暫存起來，可以用在切換分支、解衝突等等，但是要注意的是 stash id 會隨著 stash 動作而改變，所以要注意 stash id 是否正確，執行前建議先用list確認過在下語法。

