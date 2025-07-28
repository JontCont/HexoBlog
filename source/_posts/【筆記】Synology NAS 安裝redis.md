---
title: 【筆記】Synology NAS 安裝 redis
date: 2024-05-02 23:10:05
categories: 
  - 筆記 
  - 技術
tags: 
  - redis
description:
cover: https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Redis_Logo.svg/1200px-Redis_Logo.svg.png
---

## 前言
前段時間入購一台 Synology NAS (DS 923+) 發現在套件上面有 redis 可以安裝，因此在這裡紀錄一下安狀方式。
**⁜本篇引用: [How to Install Redis on Your Synology NAS](https://mariushosting.com/how-to-install-redis-on-your-synology-nas/)**


---

## 安裝 redis
### 一、安裝 Container Manager
透過 Synology 的 "Package Center" 安裝 Container Manager。如果你正在運行較舊的 DSM 版本（低於 7.2），則搜尋 Container Manager  而非 Docker。
![](/image/20240501_22-26-39.png)


### 二、建立 File Station 資料夾
前往 File Station 並開啟 docker 資料夾。在 docker 資料夾內，創建一個新的資料夾並命名為 redis。請按照下方圖片的指示進行操作。
**注意：請確保只輸入小寫字母，不要輸入大寫字母。**
![](/image/20240501_22-28-52.png)


### 三、建立排程
在 DSM 主頁面上，前往 控制面板 / 任務排程 / 建立 / 排程任務 / 使用者定義的腳本。請按照下方圖片的指示進行操作。
![](/image/20240501_22-30-00.png)

### 四、設定排程
當你點擊使用者定義的腳本後，一個新的視窗將會開啟。請按照以下的指示進行操作：
1. 一般 (General)：在任務欄位中輸入 Install Redis。取消勾選 "Enabled" 選項。選擇 root 使用者。 
2. 排程 (Schedule)：選擇在以下日期運行，然後選擇 "不重複"。 
3. 任務設定 (Task Settings)：勾選 "透過電子郵件發送運行詳情"，添加你的電子郵件，然後在運行指令區域複製貼上下面的代碼。之後，點擊 OK。

```bash
docker run -d --name=redis \
-v /volume1/docker/redis:/data \
--net=host \
--restart always \
redis/redis-stack
```
![](/image/20240501_22-31-38.png)

之後會彈出一個視窗，直接按下確定即可，下一個就是輸入密碼輸入完畢後就結束。
![](/image/20240501_22-32-10.png)
![](/image/20240501_22-33-23.png)


### 五、啟動排程
選擇創建完成的 "Install Redis" 任務，然後點擊 "Run" 標籤。系統將會詢問你是否運行 Install Redis - 點擊 OK。請按照下方圖片的指示進行操作。
![](/image/20240501_22-34-33.png)



### 六、啟動 redis
安裝過程可能需要幾秒鐘到幾分鐘的時間，這將取決於你的網路速度。現在打開你的瀏覽器，並在地址欄輸入 http://[Synology-ip-address]:8001 接受條款後，點擊提交。請按照下方圖片的指示進行操作。
![](/image/20240501_22-35-33.png)
![](/image/20240501_22-35-38.png)