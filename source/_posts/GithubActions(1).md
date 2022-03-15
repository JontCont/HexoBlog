---
title: 使用 Github Action (一) - CI/CD
categories: Github Action
tags: 
  - Github Action
keyword: 'Github Action,Github'
cover: /img/githubActions/bg.png
---

CI/CD 之前很多人提倡的架構，近期努力學習之前新技術。企業、工作上面都可以發現DevOps工程師，DevOps 也是會用到CI/CD功能。這篇用簡單方式使用 Github Actions，若是剛學習的人可以參考使用方式。

# Github Actions 
Github提供的CI工具是2019年上架，之前Github通常與Jenkins、Gitlab 配合 CI/CD ，直到2019年後Github Actions可簡易製作CI/CD。

## 1. 創建Github Action 檔案
進入Github 選擇 repository，按下[Action] 創建Workflows。
![](/img/githubActions/01.png)
自訂自己的 Workflow ，可以點選圖片中的選項。 
![](/img/githubActions/02.png)

回到選單，可以看到repository內，已經存放workflows，副檔名為[yml]。
![](/img/githubActions/03.png)

## 2. 設定 CI 配置
下方是本篇設定方式，可以依據自己想要的順序調整。

```yml
name: .NET

on:
  push:
    branches: [ DEV ]
  pull_request:
    branches: [ DEV ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 5.0.x

    - name: Restore NuGet Packages
      run: nuget restore ./MVC_CI_Demo/MVC_CI_Demo.sln 
        
    - name: Build Project
      run: dotnet build ./MVC_CI_Demo/MVC_CI_Demo.sln       
      
    - name: UnitTest Project
      run: dotnet test ./MVC_CI_Demo/MVC_CI_Demo.sln   
```



{% note info flat %}
說明 :
1. (第1行) name : 設定Workflows名稱，如果run在Actions可以看得出來要使用哪種檔案。
2. (第3行) on : 設定狀態，範例用push、pull_request觸發時，會啟動workflows，但是要記得填寫相對應的branch。
3. (第9行) jobs : 執行工作(作業)，當中一定要設定到```runs-on```，actions有提供 windows 、liunx 、MacOS自行參閱官方網文件。
4. (第14行) step : 請自行依規劃順序執行(本文為.Net Core 開啟)。 

{% endnote %}

這邊不一樣的是```Restore NuGet Packages``` 用.sln安裝，這點請大家留意。

設定完成後，就可以Commit 上去。下方圖為執行成功的畫面，點選方式請到Actions頁面點選。

![](/img/githubActions/04.png)

---

# IIS Deploy
本篇使用CD方式為以下文章參考。參考文件 : [ https://ithelp.ithome.com.tw/articles/10266050 ]

CI部分設定方式都可以快速理解，從 code -> bulid -> Test，workflows 可以簡單創建完畢。使用指令部分會遇到需要使用系統管理員身分或是系統管理員帳號。安裝方式按照下方指令輸入即可。
![](/img/githubActions/06.png)

{% note info flat %}
備註 : 
1. 執行前，請確認command 、powershell 是否使用 系統管理員身分執行。
2. 上圖runs-on:```self-hosted``` 是待會要設定的workflows。
{% endnote %}

執行完畢後，可以到Runners上可以看到 PC 名稱，表示安裝成功。

## 設定runners
設定位置為Reopitory -> settings -> Actions -> Runners -> New self-hosted runner。
按照執行部屬的主機OS為主，此範例為Windows x64。
![](/img/githubActions/05.png)

## 設定workflow
注意: 如果不要對上方功能有衝突問題，可以再新增一個workflow。
大概簡述下方執行內容 : 
1. 使用Actions 提供的ubuntu-latest環境執行。
2. 將專案發布指定位置存放。
3. 將發布完畢的檔案，上傳到actions並指定名稱。
4. 使用指定的主機環境。
5. 下載指定名稱的檔案。
6. 存放在iis 指定路徑。

原則上，執行完畢後會成功執行，但會遇到權限上的問題，必須要留意。
```yml
name:  Build and deploy ASP.Net Core app to IIS - GitHubDemo

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Setup .NET
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 5.0.x

    - name: dotnet publish
      run: dotnet publish ./MVC_CI_Demo/MVC_CI_Demo.sln -c Release -o ${{env.DOTNET_ROOT}}/demo
  
    - name: Upload artifact for deployment job
      uses: actions/upload-artifact@v2
      with:
        name: .net-app
        path: ${{env.DOTNET_ROOT}}/demo

  deploy:
    runs-on: self-hosted
    needs: build

    steps:
    - name: Download artifact from build job
      uses: actions/download-artifact@v2
      with:
        name: .net-app
        path: D:/GitHub_Action/dotnetcore-webapp
    - name: Deploy to IIS
      run: |
        iisreset /stop
        Copy-Item D:\GitHub_Action\dotnetcore-webapp C:/inetpub -Recurse -Force
        iisreset /start
```

## (選擇性)開啟 administrator
如果你遇到權限問題可以參考以下步驟。

1. 在"我的電腦"按右鍵”，進入“管理-系統工具-本機使用者和群組-administrator”
![](/img/githubActions/07.png)

2. 找到administrator，按右鍵內容，把 “帳戶已停用”前面的勾去掉。
![](/img/githubActions/08.png)

3. 重新開機看看是否有出現 administrator 系統管理員用戶選項若無則以其他使用者登入後
4. 左下方->開始->附屬應用程式->命令提示字元
5. 按滑鼠右鍵，選擇 以系統管理員身分執行
6. 輸入 net user administrator /active:yes
7. 按下Enter鍵執行
8. 重新開機

完成後，直接重新Re-run all jobs即可。
![](/img/githubActions/09.png)


---
## 結論
執行 command 部分麻煩點，重啟iis需要用到 administrator身分，這部分網路上沒有詳細的說明，執行過程中可以得知主機環境會直接影響run.cmd的執行效果，也就是command (/windows/system32/)部分。 

## 參考文件 
1. [https://caiomsouza.medium.com/fix-for-powershell-script-not-digitally-signed-69f0ed518715]
2. [https://social.technet.microsoft.com/Forums/zh-TW/956f9d90-bdf1-4fbc-ac76-a77602c0084a/win10209862969438656352013666420837319953211331649297022172923494?forum=win10itprogeneralTW]
3. [https://ithelp.ithome.com.tw/articles/10266050]