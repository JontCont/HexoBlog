---
title: Git 學習新花樣(一) Git Flow 基本流程
date: 2023-03-02 10:12:45
categories: 
  - DevOps
  - Git
tags: 
  - Git
cover: /image/20230302_10-12-45.png
---
# Git Flow 
期初使用 Git 多人開發時候，常因為沒定義規則，遇到 Commit 集中一堆會造成後續維護很大困擾。因此於 2010年提出一套流程 [【Git Flow】](https://nvie.com/posts/a-successful-git-branching-model/)，而這套流程廣泛被應用。

## 五種分支
Git Flow 使用主分支（master）和開發分支（develop）以及支援分支（feature）、修復分支（hotfix）、發布分支（release）分支類型，以適應不同的開發場景和需求。

### 主要 Branch
通常會用來給 DevOps 或是程式碼集中點，不會輕易刪除掉 Branch 。 
1. 正式環境 (Master) : 代表著穩定的產品版本，只會從發布分支或熱修分支合併過來。
2. 開發環境 (Develop): 代表著正在開發的下一個版本，所有的開發工作都在這個分支上進行。

### 次要 Branch
1. 功能分支（feature）：代表著新功能的開發分支，通常是由開發分支分出來的，完成後再合併回開發分支。
2. 修復分支（hotfix）：代表著緊急修復的分支，通常是由主分支分出來的，完成後再合併回主分支和開發分支。
3. 發布分支（release）：代表著發布準備的分支，通常是由開發分支分出來的，完成後再合併回主分支和開發分支。

## 分支運作方式
### Master / Develop 分支
當中 Master 與 Develop 會有一定的關聯性，必須要與 Develop 、Master 維持上下版本關係，才能有效達到效果。
如果過程中遇到Master 更新有 Bug 其實相當危險，所以會需要使用到 release 分支。
![](/image/20230302_09-47-37.png)


### 發布分支 release
作用是在更新到 Master 前，需要建立一版到 Release 進行測試，可以達到版本號、控管作用。
![](/image/20230302_09-53-51.png)


### 整體運作模式
功能分支（feature） 使用情境會是因"需求"而需要加入到 Develop 。修復分支（hotfix）則情境會是功能Bug 需要修繕需要更新雙方分支達到同步修繕效果。

![](/image/20230302_10-01-46.png)

圖片中有標示 (1)、(2)是指雙方分支需要同步過去。留意是 release 不能直接把它當作測試區使用，因為他作用是作為 Develop 進版時測試環境，並非測試區。
