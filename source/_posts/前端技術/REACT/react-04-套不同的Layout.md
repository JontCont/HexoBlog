---
title: React (四) - 套不同的Layout
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
一段時間沒有發學習文，主要是為了搞這東西翻找了兩個禮拜終於找到原因以及使用方式，雖然有ChatGPT還是沒有解決道我現在要特別標記的主題。

(P.S. 這次主題先介紹我卡很久時間為主。) 

## React Router 中 Outlet
在父路由元素中應該使用 <Outlet> 來呈現其子路由元素。這樣當子路由被渲染時，嵌套的使用者介面就能夠顯示出來。如果父路由完全匹配，它會渲染一個子索引路由，如果沒有索引路由則不會呈現任何內容。

### Type declaration
```tsx
interface OutletProps {
  context?: unknown;
}
declare function Outlet(
  props: OutletProps
): React.ReactElement | null;
```
### 參考官方作法
```tsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route
          path="messages"
          element={<DashboardMessages />}
        />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  );
}
```

---

## 前置作業
先把【index.tsx】放入要執行的Router ，本次修改會以這個為主。
![](/image/20230530_22-04-10.png)

## AppRouter 原始作法
簡單敘述下方程式碼作用。
1. Adminlte 需要加入 Js或是 css 才能使用他們的css
```tsx
//append css or js
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/fontawesome-free/css/all.css'
import 'admin-lte/plugins/bootstrap/js/bootstrap'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
import 'admin-lte/dist/js/adminlte'
```

2. 拆開的Layout
其實這邊因該要解釋為元件，我把 Header、Menu拆出來把它當作我的元件。實際上，還是很習慣MVC 中 Shared 放置方式，因此我歸類在Layout使用。
```tsx
//append layout
import Header from '../component/@Shared/@Layout/Header';
import MenuSidebar from '../component/@Shared/@Layout/MenuSidebar';
```

3. Router 路徑
可以看一下下方程式碼。【Routes、Route】使用的Layout 相當尷尬。
尷尬部分會有幾種情況不會使用同一個版面，如 登入、註冊、形象首頁等。不符合Layout的定義。
這邊就會需修改一下程式碼。
```tsx
import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, Await } from 'react-router-dom';

//append css or js
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/fontawesome-free/css/all.css'
import 'admin-lte/plugins/bootstrap/js/bootstrap'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
import 'admin-lte/dist/js/adminlte'

//append layout
import Header from '../component/@Shared/@Layout/Header';
import MenuSidebar from '../component/@Shared/@Layout/MenuSidebar';
// append page (only views)
import Home from '../component/@Views/TopList/Home';
import About from '../component/@Views/TopList/About';

import BDP000A from '../component/@Views/Systems/BDP000A/Index';
import BDP000A_EditorForm from '../component/@Views/Systems/BDP000A/EditorForm';

import ProfileHome from '../component/@Views/Profile/ProfileHome';
import Alert from '../component/@Views/Template/Alert';
import SampleTable from '../component/@Views/Template/SampleTable';
import SampleReactTable from '../component/@Views/Template/SampleReactTable';

import SystemConfig from '../component/@Views/Systems/SystemConfig/Index'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header />
                <MenuSidebar  />

                <div className='content-wrapper'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>

                    <Routes>
                        <Route path="/BDP000A" element={<SystemConfig />} />
                        <Route path="/BDP000A/:key" element={<BDP000A_EditorForm />} />


                        <Route path="/Profile" element={<ProfileHome />} />
                        <Route path="/Menu" element={<SampleReactTable />} />
                        <Route path="/Temp/Alert" element={<Alert />} />
                        <Route path="/Temp/Table" element={<SampleTable />} />
                    </Routes>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;
```

### 變更方式
#### 1. 將Layout拆開
1. 創建 MainLayout.tsx
```tsx
import { ReactNode } from "react";
import Header from "./Header";
import MenuSidebar from "./MenuSidebar";
//append css or js
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/fontawesome-free/css/all.css'
import 'admin-lte/plugins/bootstrap/js/bootstrap'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
import 'admin-lte/dist/js/adminlte'
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="wrapper">
            <Header />
            <MenuSidebar />

            <div className='content-wrapper'>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
```

2. 創建LoginLayout.tsx
```tsx
import { ReactNode } from "react";
import Login from "../../@Views/Login/Index";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default LoginLayout;
```

#### 2. 將 AppRouter 加入Layout版本
```tsx
import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, Await } from 'react-router-dom';

// append page (only views)
import Home from '../component/@Views/TopList/Home';
import About from '../component/@Views/TopList/About';

import BDP000A from '../component/@Views/Systems/BDP000A/Index';
import BDP000A_EditorForm from '../component/@Views/Systems/BDP000A/EditorForm';

import ProfileHome from '../component/@Views/Profile/ProfileHome';
import Alert from '../component/@Views/Template/Alert';
import SampleTable from '../component/@Views/Template/SampleTable';
import SampleReactTable from '../component/@Views/Template/SampleReactTable';

import SystemConfig from '../component/@Views/Systems/SystemConfig/Index'
import LoginLayout from '../component/@Shared/@Layout/LoginLayout';
import Login from '../component/@Views/Login/Index';
import MainLayout from '../component/@Shared/@Layout/MainLayout';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<LoginLayout />}> 
                    <Route path="/Login" element={<Login />} />
                </Route>

                <Route path="/" element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
```


## 參考文件
1. [[Bonus 系列] - 來看看 React Router v6 有什麼新功能?和 v5 有哪些地方不同?](https://ithelp.ithome.com.tw/articles/10282773)
2. [React Router](https://reactrouter.com/en/main/components/outlet)