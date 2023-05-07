---
title: React (一) - Components
categories: 
  - 前端技術
  - React
tags: 
  - React
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: /img/Web/react/react_bg.png
---
## 起因
近期會慢慢研究 react 使用方式，今後會使用 TS 來完成專案，並包含其他前端架購。本篇使用以下版本，若無法正常執行請確認版本再進行作業。


## 設定檔
```json
//package.json
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.26",
    "@types/react": "^18.2.6",
    "@types/react-dom": "^18.2.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
```
--- 
# React 
## 前置作業
必須要安裝 Node.Js 套件才能進行以下作業 。
- Node.Js 
- Visual Studio Code


## 創建 TypeScript 環境
首先我們起手可以下以下指令，安裝 react 專案  
```cmd
npx create-react-app [專案名稱] --template typescript
```

### node_moduls 
這個資料夾主要存放 擴充套件、工具、layout 等東西，會依據 package.json 內容設定檔決定下載哪些設定檔。假設沒有出現 node_moduls 請輸入以下內容 : 

```cmd
npm i 
```

## 資料夾說明
- src : 專案內容存放的內容
- ppublic : 發行後的存放的資料夾，通常專案build 時候就會打包一個js並使用html 呼叫。 

## 新增一個 components 
### 加入HelloWorld.tsx
請再 src 創建一個 components\template 資料夾並創建 HelloWorld.tsx。內容如下
 ```tsx
    import React from "react";


    function HelloWorld(){

        return <h1>Hello, World!</h1>;
    }

    export default HelloWorld;
 ```

### index.ts 修改內容
我們把 root.render 加入 HelloWorld 即可，可以達到我們想要的畫面。 

備註 : 這邊是不能殘留未使用的import 會造成錯誤訊息。
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HelloWorld from './component/template/HelloWorld';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```












