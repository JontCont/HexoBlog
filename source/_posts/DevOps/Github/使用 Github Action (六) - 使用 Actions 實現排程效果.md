---
title: 使用 Github Action (六) - 使用 Actions 實現排程效果
date: 2023-12-17 23:11:09
categories:
  - DevOps
  - Github
tags:
  - Github Action
keyword: "Github Action,Github"
cover: /image/20230401_23-11-09.png
---

## 一、前言

近期已經完成 WebJob 章節，後續衍生一些問題是 Azure WebJob 排程上的問題一直沒有執行成功，利用最簡單方式 CI/CD 來解決這個問題。

### 1-1. 期初想法

第一次使用 CICD 會有幾個想法。

1. 動作 : CICD 可以編譯、發佈、測試、部署、排程、通知等等。可以把所有事情都做完，非常符合我的需求。
2. 定時/手動 : CICD 是可以定時執行，也可以手動執行，非常方便。
3. 環境 : CICD 可以在不同環境執行，例如：測試、正式、開發等等。
4. Git 選擇 : Github 必定是首選。光 Actions 額度、便利性、社群、擴充性等等都是首選。

---

## 二、Github Action

前幾篇有提到 Actions 實作方式，這裡就用最簡單方式來實作排程。
需要步驟如下 :

1. 手動/定時執行 : 手動排程可以直接點選執行，定時排程可以設定排程時間。當功能異常可以利用手動排程來執行。
2. 環境 : 因為我使用的是 .NET CORE 可以用 linux 減少建置、執行時間。
3. 執行動作 : 動作需要安裝Nuget、建置、執行

### 2-1 手動/定時執行

actions 的設定如下，可以看到有兩個觸發方式，一個是手動觸發，一個是定時觸發。手動部分比較特別是 `workflow_dispatch`，這個是手動觸發的方式，可以在 Actions 頁面點選執行。定時觸發方式是 `schedule`，這個是定時觸發的方式，可以設定排程時間。

```yml
on:
  workflow_dispatch:
  schedule:
    - cron: "0 0 * * *" # UTC 時間，每天 00:00 執行
```

#### 2-1-1 手動觸發
手動觸發方式參考如下
![](/image/20231217_22-20-27.png)
![](/image/20231217_22-19-57.png)

### 2-2 環境
github 有幾些要細節每個執行的系統環境不一定是一樣的ram、cpu、硬碟空間等等，可以參考 [Virtual environments for GitHub-hosted runners](https://docs.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners)。這裡我使用的是 ubuntu-latest，因為我使用的是 .NET CORE 可以用 linux 減少建置、執行時間。

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    
```

![](/image/20231217_22-27-06.png)

### 2-3 執行動作
執行動作如下。這邊只需要安裝Nuget、net版本、建置、執行，就可以完成執行動作。那留意是排程動作如過太過頻繁會被github停用，所以這邊我設定每天執行一次。
```yml
    steps:
    - uses: actions/checkout@v3
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 8.0.x
        
    - name: Restore dependencies
      run: dotnet restore
      
    - name: Build
      run: dotnet build --no-restore
    
    - name: Run
      run: dotnet run
```

