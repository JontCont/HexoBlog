---
title: 使用 Github Action (四) - 使用 Runner、參數介紹
date: 2023-04-01 23:11:09
categories: 
  - DevOps
  - Github
tags: 
  - Github Action
keyword: 'Github Action,Github'
cover: /image/20230401_23-11-09.png
---

# 前言
本篇設定會與 [使用 Github Action (一) - CI/CD](https://jontcont.github.io/2022/03/13/GithubActions(1)/) 設定很類似，這次要細講與上篇提到的 *server pull repository* 問題。此外，本章會在說明 windows 參數使用。

# Github Action
## Runner 
如果要使用本機執行，會需要準備路徑給他存放。

### 1. 指定 repository 按下新增 runners
![](/img/GitHub/action/4-1.png)
### 2. 新增前往創建資料夾
按照github 上面的指令輸入即可，如果有錯誤訊息可以參考第一章節。
![](/img/GitHub/action/4-2.png)
### 3. 打開 run.cmd
用意是要確認有沒有有效執行。 
![](/img/GitHub/action/4-4.png)

### 4. 撰寫 Github Actions
```yml
  pull_repository:
    runs-on: self-hosted
    need: build
    steps:
      - name: 確認 當前位置
        run: |
          ls
```

##  Runner 執行路徑
從圖片可以看到，這邊他會將當前檔案download下來，執行後都會在指定repository path，如果你要確認指定路徑使用pull 就會需要用```ls``` 或是 ```dir```確認。 
![](/img/GitHub/action/4-3.png)


## 使用參數
參數部分比較需要注意，如果使用widowns輸入會遇到兩種問題。
1. 全域參數
全域參數方式是，在 build 底下區塊都可以使用這變數，需要取用方式則是要 ```${{env.name}}```方式填寫，這邊也可以當作```${{}}```是全域變數的外殼。

echo 使用方式如果你的變數是指令的名稱，powershell使用方式則為```$()```，例如:```$(${{env.name}})```。

```yml
  jobs:
  build:
    runs-on: windows-latest
    env:
        MY_SECRET   : ${{secrets.commit_secret}}
        USER_NAME   : github-actions[bot]
        USER_EMAIL  : 41898282+github-actions[bot]@users.noreply.github.com
        PUBLISH_DIR : ./dotnetMVC/dotnetMVC/bin/publish
        PRJ_SLN     : ./dotnetMVC/dotnetMVC.sln
        COMMIT_STR  : "Bots Update : $(Get-Date -Format \"yyyy.MMdd.HHmm\")"
    steps:
      - name: git pull repository 
        run: | 
          echo "${{env.MY_SECRET}}"
          echo "${{env.COMMIT_STR}}"
```

2. 區域參數
windows、macos 使用方式為```$env:name```取得，如果是用linux 執行只需要```$name```就好，所以需要小心留意使用。
```yml
  jobs:
  build:
    runs-on: windows-latest

    steps:
      - name: git pull repository 
        env:
          USER_NAME   : github-actions[bot]
          USER_EMAIL  : 41898282+github-actions[bot]@users.noreply.github.com
          PUBLISH_DIR : ./dotnetMVC/dotnetMVC/bin/publish
          PRJ_SLN     : ./dotnetMVC/dotnetMVC.sln
        run: | 
          echo "$env:MY_SECRET"
          echo "$env:COMMIT_STR"
```


# 參考文件
- github : [Environment variables](https://docs.github.com/en/actions/learn-github-actions/environment-variables)