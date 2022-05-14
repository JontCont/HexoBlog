---
title: 使用 Github Action (三) - 自動發行至指定 repository
categories: 
  - Git
  - Github
tags: 
  - Github Action
keyword: 'Github Action,Github'
cover: /img/GitHub/bg/bg_02.png
---

# 前言
近期希望可以有不同的 Server 可以去 clone 相對應的 repository 找很多使用方式，這邊使用 git 方式偏向新手使用方式，歡迎各位可以用自己方式使用 github actions。這邊使用asp.net mvc framework 4.7.3 舊型專案，經歷這連假三天不斷測試、實驗，終於成功執行相當感動，也慢慢提升一些git command 使用方式。


# 一、 Github Actions 操作方式
## ✔前置作業 
這邊我們先建立 兩個環境。
1. 專案 : ASP.net MVC 
2. 發行 : 存放 Deploy 位置
   
## ✔製作流程
1. 創建 token key - 請點選: [參考章節](https://jontcont.github.io/2022/03/21/Github_UseToken/)
2. 設定 repository secrets  - for 專案 repository
3. 創建 workflows - 請點選: [參考章節](https://jontcont.github.io/2022/03/13/GithubActions(1)/)
介於設定 workflows 內容有摻雜很多語法、指令，本篇會用簡述方式帶過。

# 二、開始操作
## 1. 創建 token key
創造目的是為了可以取得repository權限，如果有時間長短設定就請使用者自行評估。

## 2. 設定 repository secrets
設定secrets 需要到 repository > settings > secrets > Action  
name : 輸入可識別的名稱 ,ex : commit_secret
value : token key
![](/img/GitHub/action/3-1.jpg)
![](/img/GitHub/action/3-2.jpg)
![](/img/GitHub/action/3-3.jpg)

## 3. 創建 workflows
這邊我直接奉上設定檔，如果讀者想要創建方式可以參考上一篇。 下方設定逐一說明。

### 3-1. 設定環境 
環境 mvc framework 4.7.3  環境一定要設定 windows ，如果需要linux環境請自行爬文。

```yml
jobs:
  build:
    # for asp.net mvc msbuild 專用
    runs-on: windows-latest
  step:
    - uses: actions/checkout@v2
```

### 3-2. 新增參數
如果想要隨時改參數設定，可以使用env 後續再介紹如何使用env。理論上，上面參數是待會一定會用到的參數，設定上先知道 publish 路徑位置以及sln後，再填入workflows當中。
USER_NAME、USER_EMAIL的參數並非是亂填，本案例是為了不要洩漏我的信箱、名稱才這樣創建，優點是查詢時候就可以區別commit角色。
```yml
jobs:
  build:
    # for asp.net mvc msbuild 專用
    runs-on: windows-latest
    env:
      MY_SECRET   : ${{secrets.commit_secret}}
      USER_NAME   : github-actions[bot]
      USER_EMAIL  : 41898282+github-actions[bot]@users.noreply.github.com
      PUBLISH_DIR : ./dotnetMVC/dotnetMVC/bin/publish
      PRJ_SLN     : ./dotnetMVC/dotnetMVC.sln
  step:
    - uses: actions/checkout@v2
```

{% note info flat %}
### GithubAction Bot
官方網有提供Bots 信箱、名稱，在論壇上也能查得到。
使用方式 :
- 取得 GithubAction bot Url : https://api.github.com/users/github-actions%5Bbot%5D
- name = 可以任意更改，這邊我則是用 ```[  github-actions[bot] ]```
- email = 格式為 ```id +github-actions[bot]@users.noreply.github.com```，如果看到api出來的id值為41898282 就是這樣輸入 ```41898282+github-actions[bot]@users.noreply.github.com```

參考文件 : https://github.community/t/github-actions-bot-email-address/17204/4
{% endnote %}


### 3-3. 新增流程順序
這邊輸入完畢之後，就是從 action -> bulid 這時需要加入git 元素。
```yml
jobs:
  build:
    # for asp.net mvc msbuild 專用
    runs-on: windows-latest
    env:
      MY_SECRET   : ${{secrets.commit_secret}}
      USER_NAME   : github-actions[bot]
      USER_EMAIL  : 41898282+github-actions[bot]@users.noreply.github.com
      PUBLISH_DIR : ./dotnetMVC/dotnetMVC/bin/publish
      PRJ_SLN     : ./dotnetMVC/dotnetMVC.sln
          
    steps:
      - uses: actions/checkout@v2
      
      - name: setup-msbuild
        uses: microsoft/setup-msbuild@v1.1
      
      - name: Setup NuGet.exe for use with actions
        uses: NuGet/setup-nuget@v1.0.5
      
      - name: Restore NuGet Packages
        run: nuget restore ${{env.PRJ_SLN}}

      - name: Build and Publish Web App
        run: msbuild ${{env.PRJ_SLN}} /p:Configuration=Release /p:DeployOnBuild=true /p:PublishProfile=FolderProfile
```

下方用git 方式取得。說明一下使用順序。
1. 創建publish (原因是專案裡面是沒有那個資料夾)
2. 初始git 環境，並加入 遠端repository 環境
3. 設定角色後，自動pull一次資料
4. Build之後，在commits 、push上去。

這邊流程比較單純不會複雜，原本有考慮使用 push --force 但我還是堅持要使用有正常的commits 流程，因此有pull載入時間。
```yml
 steps:
      - uses: actions/checkout@v2
      
      - name: setup-msbuild
        uses: microsoft/setup-msbuild@v1.1
      
      - name: Setup NuGet.exe for use with actions
        uses: NuGet/setup-nuget@v1.0.5
      
      - name: Restore NuGet Packages
        run: nuget restore ${{env.PRJ_SLN}}
      
      - name: git pull repository 
        run: |
          echo "--- create dir. and move dir. path ---"
          mkdir ${{env.PUBLISH_DIR}}
          cd ${{env.PUBLISH_DIR}}
          
          echo "--- init dir. and add remote repository ---"
          git init
          git remote add deploy ${{env.PUBLISH_URL}}
          git checkout -b master
          
          echo "--- set config  ---"
          git config --global user.name  "${{env.USER_NAME}}"
          git config --global user.email "${{env.USER_EMAIL}}"

          echo ============ " pull " ================
          git pull deploy master --rebase
          
      - name: Build and Publish Web App
        run: msbuild ${{env.PRJ_SLN}} /p:Configuration=Release /p:DeployOnBuild=true /p:PublishProfile=FolderProfile

      - name: git push publish From Repository
        run: |
          cd ${{env.PUBLISH_DIR}}
                  
          echo ============ " config list " ============
          git config --list
      
          echo ============ "statut and content add " ============
          git add --all
          git status
          
          echo ============ " check branch list" ============
          git branch -a
          
          echo ============ " commit " =============
          git commit -m "${{env.COMMIT_STR}}"
          
          echo ============ " PUSH " ==============
          git push -u deploy 

```

## 完成品
```yml
jobs:
  build:
    # for asp.net mvc msbuild 專用
    runs-on: windows-latest
    env:
        MY_SECRET   : ${{secrets.commit_secret}}
        USER_NAME   : github-actions[bot]
        USER_EMAIL  : 41898282+github-actions[bot]@users.noreply.github.com
        PUBLISH_DIR : ./dotnetMVC/dotnetMVC/bin/publish
        PRJ_SLN     : ./dotnetMVC/dotnetMVC.sln
        COMMIT_STR  : "github-actions[bot] Update : $(Get-Date -Format \"yyyy.MMdd.HHmm\")"
        
    steps:
      - uses: actions/checkout@v2
      
      - name: setup-msbuild
        uses: microsoft/setup-msbuild@v1.1
      
      - name: Setup NuGet.exe for use with actions
        uses: NuGet/setup-nuget@v1.0.5
      
      - name: Restore NuGet Packages
        run: nuget restore ${{env.PRJ_SLN}}
      
      - name: git pull repository 
        run: |
          echo "--- create dir. and move dir. path ---"
          mkdir ${{env.PUBLISH_DIR}}
          cd ${{env.PUBLISH_DIR}}
          
          echo "--- init dir. and add remote repository ---"
          git init
          git remote add deploy ${{env.PUBLISH_URL}}
          git checkout -b master
          
          echo "--- set config  ---"
          git config --global user.name  "${{env.USER_NAME}}"
          git config --global user.email "${{env.USER_EMAIL}}"

          echo ============ " pull " ================
          git pull deploy master --rebase
          
      - name: Build and Publish Web App
        run: msbuild ${{env.PRJ_SLN}} /p:Configuration=Release /p:DeployOnBuild=true /p:PublishProfile=FolderProfile

      - name: git push publish From Repository
        run: |
          cd ${{env.PUBLISH_DIR}}
                  
          echo ============ " config list " ============
          git config --list
      
          echo ============ "statut and content add " ============
          git add --all
          git status
          
          echo ============ " check branch list" ============
          git branch -a
          
          echo ============ " commit " =============
          git commit -m "${{env.COMMIT_STR}}"
          
          echo ============ " PUSH " ==============
          git push -u deploy 
```



# 心得
這功能耗了我兩天連價沒得好好休息，大多遇到git指令、actions參數、查詢資料，參數部分也被很多範例誤導可能是用windows環境緣故。下篇會用action參數方式寫一篇，希望各位會喜歡。

這邊在小抱怨一下，git remote使用方式，本範例分支是用預設(master)主要原因是只要一指定就會發生意外錯誤(push部分)，後來被妥協用master分支。如果各位知道如何指定分支方式歡迎到下方留言讓我知道。

