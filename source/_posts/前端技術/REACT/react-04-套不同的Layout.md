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
好一段時間沒有發表學習文了，主要是因為我花了兩個禮拜的時間研究這個東西，終於找到了原因和使用方式。雖然有ChatGPT的幫助，但還是沒有解決我現在要特別標記的主題。

(P.S. 這次的主題是我卡了很久的一個技術問題。)

## React Router 中 Outlet
在父路由元素中，應該使用 <Outlet> 來呈現其子路由元素。這樣，當子路由被渲染時，嵌套的使用者介面就能夠顯示出來。如果父路由完全匹配，它會渲染一個子索引路由，如果沒有索引路由，則不會呈現任何內容。

### 1. 類型聲明 (Type declaration) 
```tsx
interface OutletProps {
  context?: unknown;
}
declare function Outlet(
  props: OutletProps
): React.ReactElement | null;
```
### 2. 參考官方作法
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
首先，將【index.tsx】放入要執行的Router中，這次的修改將以此為主要依據。
![](/image/20230530_22-04-10.png)

## AppRouter 原始作法
讓我簡單解釋一下下面的程式碼的作用：
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
其實，這部分應該解釋為元件，我將 Header 和 Menu 拆分出來，並將它們作為我的元件使用。實際上，我還是很習慣將它們歸類在MVC模式中的 Shared 資料夾中，所以我將其歸類在 Layout 中使用。

```tsx
//append layout
import Header from '../component/@Shared/@Layout/Header';
import MenuSidebar from '../component/@Shared/@Layout/MenuSidebar';
```

3. Router 路徑
你可以看一下下面的程式碼。在使用 Layout 的地方，會有一些棘手的情況不適用於相同的版面，例如登入、註冊、首頁等。它們不符合 Layout 的定義。這就需要對程式碼進行一些修改。
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