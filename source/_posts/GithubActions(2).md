---
title: 使用 Github Action (二) - 使用 MVC (MSbuild) CI/CD
categories: Github Action
tags: 
  - Github Action
keyword: 'Github Action,Github'
cover: /img/githubActions/bg.png
---

繼上篇文章，快速進行MVC CI/CD 這部分相對的有很多使用者還在使用這種架框，本篇使用```Framework 4.7.2``` ，當中有得知一些github actions小技巧。

本篇只有到Publish，剩下請參考上篇使用方式。

# Github Action
## 一、創建Workflow
下方參考使用方式。
***注意 : MVC 建議是使用Windows系統進行編譯，這邊再次聲明 MVC Framework 是用 MSbuild 會跟上篇 CLI使用方式有差異 。***

```yml
name: dontnet Mvc to CI Test

on:
  push:
    branches: [ main ]
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  build:
    runs-on: windows-latest

    steps:
      - uses: actions/checkout@v2
               
      - name: setup-msbuild
        uses: microsoft/setup-msbuild@v1.1
      
      - name: Setup NuGet.exe for use with actions
        uses: NuGet/setup-nuget@v1.0.5
      
      - name: Restore NuGet Packages
        run: nuget restore ./dotnetMVC/dotnetMVC.sln
      
      - name: Build and Publish Web App
        run: msbuild ./dotnetMVC/dotnetMVC.sln /p:Configuration=Release /p:DeployOnBuild=true /p:PublishProfile=FolderProfile

      # Runs a set of commands using the runners shell
      - name: Upload Artifact
        uses: actions/upload-artifact@v1.0.0
        with:
          name: published_webapp
          path: ./dotnetMVC/dotnetMvcUnitTests/bin/Release
```

## 二、創建FolderProfile.pubxml
如過上方圖有通過，恭喜你可以跳過這邊。
MVC初始化的專案是沒有.pubxml相關的檔案，下方直接用快速方式創建.pubxml。

1. 按下[建置]->[發佈]。
![](/img/githubActions/2-01.png)

2. 如果事先有發行過的可以再新增一個。
![](/img/githubActions/2-02.png)

3. 選擇資料夾，直接按下下一步、完成
![](/img/githubActions/2-03.png)
![](/img/githubActions/2-04.png)

4. 產生完成，也可以用下拉式查看有哪些.pubxml
![](/img/githubActions/2-05.png)

## 三、確認最後小問題
1. NeGet 失效?
NeGet 安裝失效問題，網路上很多有寫Nuget動作，但是怎樣做都會失敗。排除方式可以看右側選項，Github Action提供很方便的功能，可以直接使用安裝指令、寫法。
  
![](/img/githubActions/2-06.png)

2. msbuild 注意點
msbuild 部分可以使用.csproj ，必須要留意```/p:DeployOnBuild=true```必須要一起填寫，```/p:PublishProfile=FolderProfile```就不會引發錯誤。

3. upload抓取publish路徑
[ Upload Artifact ] 本篇最需要的動作，必須要對應Repoitory路徑，若有錯誤訊息可以得知.pubxml檔案，會發行到哪個位置。

## 參考文件
1. [Using GitHub Actions for .NET Framework apps](https://timheuer.com/blog/building-net-framework-apps-using-github-actions/)
2. [使用 Visual Studio：命令列部署來 ASP.NET Web 部署](https://docs.microsoft.com/zh-tw/aspnet/web-forms/overview/deployment/visual-studio-web-deployment/command-line-deployment)
3. [使用 MSBuild 建置方案檔(sln)與建置專案檔(csproj)的陷阱與注意事項](https://blog.miniasp.com/post/2021/08/28/Build-Solution-or-Csproj-using-MSBuild)

