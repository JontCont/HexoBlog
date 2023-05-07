---
title: React (二) - router 簡易應用
categories: 
  - 前端技術
  - React
tags: 
  - React
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: /img/Web/react/react_bg.png
---
## 前言
完成作業初期，你可能會疑惑如何增加多個頁面或佈局，這些問題都需要使用到路由器（router）。前端架構將依賴路由器進行所需頁面和佈局之間的切換。而組件（component）則可以看作是我們的視圖，是可重複使用的程式碼塊，用於呈現單一元件的內容。在上一篇文章中，我們已經實現了組件的基礎並且理解了它的重要性。


---
# React Router

## 安裝 Router
首先，安裝 React Router：在命令行中執行 npm install react-router-dom。

## 創建 component
加入 template-page
![](/image/20230507_19-50-27.png)

下方可以使用範本來快速建檔，如下 : 
```tsx
// Home.tsx
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to my home page!</p>
    </div>
  );
};

export default Home;


// About.tsx
import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <p>Learn more about me and my skills!</p>
    </div>
  );
};

export default About;
```
## 創建 AppRouter.tsx
加入 AppRouter 當作本次的 router並加入以下內容，即可完成顯示功能。介於 router v6 已經不再支援 Switch 務必注意網站上那個 關鍵字。
![](/image/20230507_19-49-02.png)
```tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../component/template-page/Home';
import About from '../component/template-page/About';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>

            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
```

---

## 補充 - Routes
React Router v6 中，```<Routes>``` 元素是用來包裝 ```<Route> ```元素的容器，並且必須直接包含在```<Router> ```< 元素中。如果在 ```<Routes>``` 元素中放置了其他的元素，例如 ```<div>``` 或 ```<span>```，那麼它們就會被視為無效的並且導致錯誤產生。

這是因為 ```<Routes>``` 本身就是一個容器元素，用來定義整個應用程式的路由規則。而且，```<Routes>``` 可以包含多個 ```<Route> ```元素，每個 ```<Route>``` 元素代表一個路徑和要顯示的元件。因此，如果想要在 ```<Routes>``` 元素中添加其他內容，就必須使用有效的 React 元素或組件，例如 ```<Route>``` 或自定義元件。