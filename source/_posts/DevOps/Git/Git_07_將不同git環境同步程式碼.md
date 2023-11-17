---
title: Git (七) - 將不同git環境同步程式碼
date: 2023-03-02 10:12:45
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---

## 前言
不少人會有經驗，當一個專案時候會有兩者開發人員進行開發，那開發有可能是 github、gitlab、azure devops等之類軟體。這邊提供一個git處理方式，可以快速同步對方的程式碼不用一個一個的copy。

---
## 處理方式
### 1. 取得對方的clone link
不論是什麼環境，第一步就是要對方的git 權限，沒有權限就只能一個一個copy了。接下來，我們拿到clone link後，輸入遠端url。
- remote name : 隨意輸入，要識別對方的git
- clone link : 對方的clone link
```cmd
git remote add <remote name> <clone link>
```
### 2. 選擇要更新的分支
這邊有兩種方式一種是更新指定分支、一種是拉取分支。遇到衝突記得解衝突，那如果是比較肥大、歷史悠久的程式碼務必尋求同事協助，不然會有很大的風險。
#### 2-1. 更新指定分支
```cmd
git fetch <remote name> <branch name>
```

### 2-2. 指定拉取單一分支
```cmd
git pull <remote name> <branch name>
```

原則上動作只有這兩種，但是如果遇到衝突，請先解衝突，再進行commit。

---

## 補充
依據remote特性，他只能抓下遠端分支的資料給當前要使用的git respoitity ，如果要讓雙方同步對方也要將程式碼同步給你，這時候就不會有覆蓋、複寫問題。

### 1. 變更 remote url 
如果對方的git url有變更，可以使用以下指令變更。
```cmd
git remote set-url <remote name> <clone link>
```

### 2. 刪除 remote url
如果對方的git url有變更，可以使用以下指令變更。
```cmd
git remote remove <remote name>
```

### 3. 查看 remote
如果想要查看目前有哪些remote，可以使用以下指令查看。
```cmd
git remote -v
```

### 4. 變更 remmote name
如果想要變更remote name，可以使用以下指令變更。
```cmd
git remote rename <old name> <new name>
```

