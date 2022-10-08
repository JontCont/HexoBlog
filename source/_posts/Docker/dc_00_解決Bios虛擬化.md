---
title: (筆記) Docker Desktop - 解決 "Hardware assisted virtualization and data execution protection must be enabled in the BIOS" 
categories: 
  - dotnet
  - C#
tags: 
  - core
  - C#
  - API
description:
keyword: 'core  , C# ,API'
cover: https://www.docker.com/wp-content/uploads/2022/05/Docker_Temporary_Image_Google_Blue_1080x1080_v1.png
---

為了再次學習之前學一半的Docker ，重新再次安裝 Docker Desktop 。安狀完成以為可以正常使用，發生 "Hardware assisted virtualization and data execution protection must be enabled in the BIOS" 錯誤訊息，急忙地排除這問題。
![](/img/Docker/Snipaste_2022-10-06_21-40-59.png)


## 問題排除一、指令方式排除
來源 [Stock Overflow](https://stackoverflow.com/questions/39684974/docker-for-windows-error-hardware-assisted-virtualization-and-data-execution-p)

第一次使用安裝使用，先馬上看有沒有要開啟項目。從下方指令明顯看到對象是Hyper-V，看來只要針對這個項目開放因該可以成功。

一、**SOLUTION A** (If Hyper-V is totally disabled or not installed)
1. Open PowerShell as administrator and
2. Enable Hyper-V with

```cmd
dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All
```

二、**SOLUTION B** (If Hyper-V feature is already enabled but doesn't work)

1. Enable Hypervisor with
```cmd
bcdedit /set hypervisorlaunchtype auto
```
![](/img/Docker/Snipaste_2022-10-06_21-43-21.png)

以上方式結果一樣卻沒辦法成功開啟，看似是透過其他方式開啟，因此，嘗試用其他方式解決。



## 問題排除二、BIOS 開啟虛擬化(CPU MOD) 
檢查方式 : 開啟工作管理員 > 效能 > 模擬。

底下會有 "模擬: 關閉"，看似是這個搞的鬼。這時候需要透過BIOS方式打開，進入Advanced Mode > 開啟 (SVM) 即可。
![](/img/Docker/Snipaste_2022-10-06_22-11-35.png)

備註 : Intel 虛擬化功能名稱會不相同 (Virtualization Technology)。

重新開機後，從工作管理員可見已經開啟，Docker Desktop 順利開起來
結束這怪問題。
![](/img/Docker/Snipaste_2022-10-06_22-40-03.png)
![](/img/Docker/Snipaste_2022-10-06_22-40-10.png)

這幾周稍微摸摸如何使用Docker，努力推進 DevOps 工具之一。

