---
title: 【Git】活用Git與Azure DevOps(一)-Git 常用指令
date: 2024-02-02 12:00:30
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---

## 前言
近期公司有個技術分享日，那我就簡單介紹一下 Git 比較使用的用法以及 Azure DevOps 的使用方式。

### Git 
Git 是一個分散式版本控制系統，比較常見GUI工具為 SourceTree、GitKraken、GitHub Desktop等等。


#### 1. Commit 
##### 1-1 Commit Amend 
此指令是將最近一次提交可以再次編輯、添加、刪除剛才提交的文件。如果你在執行 git commit --amend 之前添加了新的更改到暫存區，那麼這個命令將創建一個新的提交，這個提交將包含原始提交的所有更改，以及新添加到暫存區的所有更改。

```cmd
git commit --amend
```

##### 1-2 Undo Last Commit 
這個指令作用是撤回上一次的commit，但是會保留程式碼、Commit訊息，可在調整commit message後再次commit。

```cmd
git reset --soft HEAD^
```

![](/image/20240202_22-38-55.png)


#### 2. Reset 
1. Soft : 保留工作目錄、暫存區、commit，但是會把commit移除。
2. Mixed : 保留工作目錄、但是會把暫存區、commit移除。
3. Hard : 會把工作目錄、暫存區、commit都移除。

![](/image/20240202_22-46-02.png)


#### 3. Cherry-Pick
cherry-pick 是一個 git 指令，可以將指定的 commit 從其他分支複製到目前的分支。這個做法可以用在很多情境，例如：當你在開發一個新功能的時候，發現你需要一個已經在其他分支上的 commit。

```cmd
git cherry-pick <commit id>
```

![](/image/20240202_22-47-03.png) 

#### 4. Rebase
rebase 是一個 git 指令，可以將一個分支的 commit 移動到另一個分支上。這個指令可以用在很多情境，例如：當你在開發一個新功能的時候，發現你需要一個已經在其他分支上的 commit。

```cmd
git rebase <branch name>
```

![](/image/20240202_22-49-03.png)


#### 5. Stash
stash 是一個 git 指令，可以將目前的程式碼暫存起來，這個功能可以用在以下幾種情境。
1. 切 branch 之前功能尚未完成，但是又不想 commit
2. 用解衝突方案

##### 5-1 使用方式
1. 存檔 : `git stash save <message>`
2. 查看 : `git stash list`
3. 取出/套用 : `git stash pop <stash id>`、`git stash apply <stash id>`
4. 刪除 : `git stash drop <stash id>`

取出/套用的差異在於 pop 會將 stash id 移除，apply 會保留 stash id。


#### 6. Tag
tag 是一個 git 指令，可以將目前的 commit 加上一個標籤，這個功能可以用在以下幾種情境。
1. 釋出版本
2. 重要的commit

```cmd
git tag <tag name>
```

#### 7. Submodule
submodule 是一個 git 指令，可以將其他專案加入到目前的專案中，這個功能可以用在以下幾種情境。
1. 共用的程式碼
2. 共用的設定檔

```cmd
git submodule add <submodule link>
```


#### 9. WorkTree
worktree 是一個 git 指令，可以將目前的專案複製一份出來，這個功能可以用在以下幾種情境。
1. 同時開發多個分支
2. 同時開發多個專案

##### 9-1 使用方式
1. 新增 : `git worktree add <new branch name>`
2. 刪除 : `git worktree remove <new branch name>`
3. 查看 : `git worktree list`
4. 移除 : `git worktree prune`
5. 移除所有 : `git worktree prune --all`

##### 9-2 注意事項
1. .git資訊內容是主體的path
2. 主體的git repository不能切換已經有的worktree分支


#### 10. [Subtree](https://blog.puckwang.com/posts/2020/git-submodule-vs-subtree/)
subtree 是一個 git 指令，可以將其他專案加入到目前的專案中，這個功能可以用在以下幾種情境。
1. 共用的程式碼
2. 共用的設定檔

```cmd
git subtree add --prefix=<prefix> <repository> <ref>
```

![](/image/20240202_22-56-39.png)