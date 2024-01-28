---
title: 【Git】活用Git與Azure DevOps (一) - 常見的用法
date: 2024-01-28 12:00:30
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
Git 是一個分散式版本控制系統，比較常見GUI工具為 SourceTree、GitKraken、GitHub Desktop等等。這篇我就用 Git Cli + VSCode 來做示範。



---
### Git Cli - 常用指令
#### 一、Git reset 
Git reset 可以用來回復到某個 commit，並且可以選擇要回復到哪個狀態，有三種模式，分別為 soft、mixed、hard，這邊我們就來看看這三種模式的差異。

##### 1.1 soft
soft 模式會回復到某個 commit，但是會保留原本的檔案內容，並且會將 commit 之後的檔案都放在 staging area，這樣就可以直接 commit 了。

```bash
git reset --soft <commit>
```

##### 1.2 mixed
mixed 模式會回復到某個 commit，但是會保留原本的檔案內容，並且會將 commit 之後的檔案都放在 working directory，這樣就可以直接 commit 了。

```bash
git reset --mixed <commit>
```

##### 1.3 hard
hard 模式會回復到某個 commit，但是會刪除原本的檔案內容，並且會將 commit 之後的檔案都放在 working directory，這樣就可以直接 commit 了。

```bash
git reset --hard <commit>
```

#### 二、Git revert
Git revert 可以用來回復到某個 commit，但是會保留原本的檔案內容，並且會產生一個新的 commit，這樣就可以直接 commit 了。

```bash
git revert <commit>
```

#### 三、Git cherry-pick
Git cherry-pick 可以用來將某個 commit 的內容，放到目前的 branch 上，這樣就可以直接 commit 了。

```bash
git cherry-pick <commit>
```

#### 四、Git rebase
Git rebase 可以用來將某個 branch 的內容，放到目前的 branch 上，這樣就可以直接 commit 了。

```bash
git rebase <branch>
```

#### 五、Git stash
Git stash 可以用來將目前的檔案暫存起來，這樣就可以直接 commit 了。

```bash
git stash
```

#### 六、Git tag
Git tag 可以用來將某個 commit 打上 tag，這樣就可以直接 commit 了。

```bash
git tag <tag name> <commit>
```

#### 七、Git branch
Git branch 可以用來建立一個新的 branch，這樣就可以直接 commit 了。

```bash
git branch <branch name>
```

#### 八、Git merge
Git merge 可以用來將某個 branch 的內容，合併到目前的 branch 上，這樣就可以直接 commit 了。

```bash
git merge <branch>
```

#### 九、Git pull
Git pull 可以用來將某個 remote 的內容，合併到目前的 branch 上，這樣就可以直接 commit 了。

```bash
git pull <remote> <branch>
```

#### 十、Git push
Git push 可以用來將目前的 branch 的內容，推到某個 remote 上，這樣就可以直接 commit 了。

```bash
git push <remote> <branch>
```

#### 十一、Git clone
Git clone 可以用來將某個 remote 的內容，複製到本機上，這樣就可以直接 commit 了。

```bash
git clone <remote>
```

#### 十二、Git fetch
Git fetch 可以用來將某個 remote 的內容，更新到本機上，這樣就可以直接 commit 了。

```bash
git fetch <remote>
```

#### 十三、Git remote
Git remote 可以用來將某個 remote 的內容，更新到本機上，這樣就可以直接 commit 了。

```bash
git remote <remote>
```

#### 十四、Git log
Git log 可以用來查看目前的 commit 紀錄。

```bash
git log
```

#### 十五、Git status
Git status 可以用來查看目前的檔案狀態。

```bash
git status
```

#### 十六、Git diff
Git diff 可以用來查看目前的檔案差異。

```bash
git diff
```

#### 十七、Git worktree
Git worktree 可以用來建立一個新的 worktree，這樣就可以直接 commit 了。

```bash
git worktree <path> <branch name>
```

#### 十八、Git submodule
Git submodule 可以用來建立一個新的 submodule，這樣就可以直接 commit 了。

```bash
git submodule <path> <branch name>
```
