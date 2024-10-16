---
title: 【Git】Cherry Pick 指令篇
date: 2024-10-16 23:12:45
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20241016_22-44-53.png
---

## 前言
最近在工作環境中沒有任何UI可以使用 git 的功能，其中最需要用到多筆 commit 進行 cherry pick 我們可以用以個指令來進行操作。

---

## Cherry Pick
在 Git 中，cherry-pick 是一個強大的命令，允許開發者從一個分支中選擇特定的提交（commit），並將其應用到當前分支。這與傳統的合併（merge）或重疊（rebase）不同，因為這些方法通常會將整個分支的所有提交整合到目標分支中，而 cherry-pick 只選擇單個或多個特定的提交。

### 一、使用方式
一般使用方式 `git cherry-pick <commit>` 是將指定的 commit 合併到目前的 branch 中。

1. 切換到目標分支：首先，確保你在想要應用提交的分支上。例如，如果你想將提交應用到 master 分支，可以使用以下命令：
```bash
git checkout master
```

2. 執行 cherry-pick：然後，使用 cherry-pick 命令來選擇特定的提交：
```bash
git cherry-pick <commit1>
```

如果再執行前覺得 commit 名稱想要修改可以使用 ，```git cherry-pick -e <commit>``` 進行修改。

---

### 二、合併多個 commit
#### 2-1 指定 commit 合併
```bash
git cherry-pick <commit1> <commit2> <commit3> ...
```

#### 2-2 指定 commit 範圍合併
```bash
git cherry-pick <commit1>..<commit2>
```

---


### 三、使用 Merge cherry-pick
如果你想要將一個分支的所有提交應用到另一個分支，可以使用 merge cherry-pick。這樣可以將整個分支的提交應用到目標分支，而不是單個提交。

1. 切換到目標分支：首先，確保你在想要應用提交的分支上。例如，如果你想將提交應用到 master 分支，可以使用以下命令：
```bash
git checkout master
```

2. 使用 merge cherry-pick：然後，使用 merge cherry-pick 命令來選擇特定的提交：
```bash
git cherry-pick -m 1 <commit>
```

備註 
1. `-m 1` 是指定 merge commit 的 parent 1，如果是 parent 2 則是 `-m 2`。
2. parent 1 是指合併 commit 的分支，parent 2 是指被合併的分支。

---

### 四、處理衝突
在某些情況下，cherry-pick 可能會導致衝突。如果發生衝突，Git 會提示你解決這些衝突。解決衝突後，你需要使用以下命令來完成 cherry-pick 操作：

```bash
git cherry-pick --continue
```

如果你想取消當前的 cherry-pick 操作，可以使用：

```bash
git cherry-pick --abort
```
---

### 注意事項
- 重複提交：使用 cherry-pick 可能會導致重複的提交，因為它會創建一個新的提交對象，這個對象有自己的哈希值。這意味著即使內容相同，Git 仍然會將其視為不同的提交。
- 最佳實踐：通常建議在可能的情況下使用合併或重疊，而不是 cherry-pick，因為這樣可以保持提交歷史的清晰性和一致性。

