---
title: Github - 解決 PR merge 衝突問題
categories: 
  - DevOps
  - Github
tags: 
  - Github
keyword: 'Github, Token'
cover: /img/GitHub/bg/bg_01.jpg
---
Github merge 遇到衝突的問題已經是常有的事情，既然要 merge 需要將新舊的資料比對、修改。Github 有提供網頁版本可以直接將衝突檔案修改後再merge。

## 建立 Pull Request
這邊簡單敘述一下　Pull Request。當Create PR 時候，如果有衝突資訊會出現 "Can't autoatiocally merge" 資訊，其實可以直接創建PR給作者去比對。

這邊可以把這些動作當成創建**留言區塊**，作者會透過 pull requests 分頁內審閱檢查內容。
![](/image/20221016_15-32-44.png)
![](/image/20221016_15-34-45.png)
![](/image/20221016_15-35-20.png)


## 修改衝突內容
當作者發現對方有發出訊息時候，可以透過 Resolve conflicts 排除衝突問題。
![](/image/20221016_15-41-15.png)
![](/image/20221016_15-41-38.png)

## 修正注意事項
Github 這塊需要留意以下幾點 
1. 修改完畢後點選 "Mark as resolved"
2. 必須要將左側衝突檔案全部修改完成

以上修改完成後，就可以正常merge 內容。
![](/image/20221016_15-42-02.png)
![](/image/20221016_16-03-41.png)
![](/image/20221016_16-04-11.png)


## 參考文件
- [Resolving a merge conflict on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)


