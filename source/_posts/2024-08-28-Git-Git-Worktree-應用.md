---
title: 【Git】Git Worktree 應用
date: 2024-08-28 23:12:45
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---

## 前言
最近專案為了要調整node_modules問題，只要切換 master、develop 分支就要重新安裝 node_modules，這樣會花費很多時間，所以我們這邊使用 git worktree 來解決這個問題。


### 一、 Git worktree
Git worktree 功能是在 Git 2.5 版本中引入的，版本於 2015 年 7 月發布。這功能優點如下 :

- 可以在同一個 repository 中，把branch 拆到local 的不同目錄下。
- 可以在不同的目錄下，同時操作不同的 branch。
- 利用 unlock / lock 來控制 worktree 的狀態。


#### 1-1 建立/移動 worktree
worktree 可以用branch name 來建立。如果想要更改位置可以使用 move 指令。

```bash
git worktree add <path> <branch name> ## 建立 worktree
git worktree move <path> <new path> ## 移動 worktree
```

##### 1-2 用拆出來的 branch 切換 branch

```bash
git branch -a ## 查看所有 branch
git checkout -b <branch name>  ## 切換 branch
git worktree list ## 查看目前 worktree
```
![](/image/20240828_21-59-34.png)



#### 1-3 刪除 worktree
若已經不需要 worktree 可以使用 remove 指令刪除。(嚴禁手動刪除務必要用指令刪除，不然這個分支會被鎖死)
```bash
git worktree remove <path> ## 刪除 worktree
```
#### 1-4 lock / unlock
當需要保護 worktree 不要任意被移動或刪除，可以使用 lock / unlock 來控制 worktree 的狀態。
```bash
git worktree lock <path> ## 鎖定 worktree
git worktree unlock <path> ## 解鎖 worktree
```

![](/image/20240828_22-11-26.png)

如果被移動或刪除會出現以下錯誤訊息。
![](/image/20240828_22-21-55.png)


#### 1-5 不小心刪掉解決方式(標記 prune)

如果不小心刪除了有個解決方式，透過 git worktree list 來查看目前的 worktree，然後使用 prune 來刪除已經不存在的 worktree。

```bash
git worktree list
git worktree prune ## 2. 這會移除所有已標記為可修剪的 worktree
```
---

### 二、git worktree 結構應用
回到實際運作上，git一定會透過.git 資料夾來控制版本，所以我們可以透過 git worktree 來看看他做什麼手腳。

#### 2-1 查看 .git worktree 資料夾
當創建一個 worktree 時，會在 .git 資料夾下產生 worktrees 資料夾，這個資料夾會記錄所有 worktree 的資訊。包含創建資料夾的名稱、branch、lock 狀態等等。

下方是直接把 worktree 專案名稱放在 .git 資料夾下的 worktrees 資料夾，主要存在這相對路徑。 
![](/image/20240828_22-33-36.png)
![](/image/20240828_22-34-49.png)

在細微一點的地方，可以看到 worktree 都會列出 sha1 的資訊，其實他也會記錄在 .git/worktrees 資料夾下。
![](/image/20240828_22-38-48.png)

如果要知道 git 全部結構再請各位參考 [30 天精通 Git 版本控管 (06)：解析 Git 資料結構 - 物件結構](https://ithelp.ithome.com.tw/articles/10134089) 這篇文章。


---

## 結論
熟悉了 git worktree 之後，就會開始發現這個功能的強大之處，尤其是在開發環境中，可以同時操作多個 branch，不用一直切換 branch，這樣可以提高開發效率，過程中也減少 git stash 的使用。

