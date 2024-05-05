---
title: 【Docker】 安裝 Docker Desktop 疑難排解 (使用 Windowns 11)                                                                                                                              
date: 2024-05-05 18:03:00
categories: 
  - DevOps
  - Docker
tags: 
  - Docker
description:
cover: https://www.docker.com/wp-content/uploads/2021/09/Moby-run.png
---

## 前言
先前電腦重新改為 Windows 11 安裝 Docker Desktop 後，發現無法正常運作，這邊紀錄一下解決方法。


## Docker Desktop 安裝
這邊就請自行到 Docker 官網下載安裝，這邊就不再贅述。

- [Docker Desktop 官網](https://www.docker.com/products/docker-desktop)

### 一、打開 BIOS 虛擬化功能    
- 開啟說明 : [點擊連結](https://www.asus.com/tw/support/faq/1045141/)

Intel 和 AMD 虛擬化名稱:
- Intel : VT-x Mode
- AMD : SVM Mode

上面文章有特別寫 Intel 與 AMD 的虛擬化功能開啟方式，這邊就不再贅述。


### 二、安裝 WSL
- 開啟說明 : [點擊連結](https://docs.microsoft.com/zh-tw/windows/wsl/install)

安裝 WSL 方式可以透過指令方式安裝，也可以到 Windows Store 下載 ubuntu 來安裝。
![](/image/20240505_13-17-44.png)



### 三、開啟 Windows 虛擬化功能

這邊可以直接下以下指令來開啟 Windows 虛擬化功能，開啟後需要重新開機。
```cmd
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

- 來源 : [點擊連結](https://github.com/lewagon/data-setup/issues/72)

### 四、 Error : running wsl-bootstrap failed: exit status 1 錯誤訊息
這是最近看到最新的錯誤訊息，這段跟以往安裝方式不同，這邊提供一個解決方式。使用下方語法後重新開機就可以使用了。

```bash
wsl --update 
netsh winsock reset
```

- 來源 : [點擊連結](https://stackoverflow.com/questions/75390347/wsl2-failed-install-docker-desktop-on-windows-11)