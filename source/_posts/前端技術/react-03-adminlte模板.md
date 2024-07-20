---
title: React (三) - 套用 AdminLTE3 模板
date: 2022-05-04
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
在上一篇文章中，我們介紹了如何操作 components 與 router，這篇文章將教你如何在你的專案中加入 AdminLTE3 的 CSS 樣式，讓你的專案能夠擁有漂亮的 UI 設計。

---

# AdminLTE
是一個基於 Bootstrap 框架的免費管理儀表板模板，可以快速建立具有相應外觀和功能的後台管理系統。AdminLTE 3 是其最新版本，提供了大量的 UI 元件、各種頁面佈局和功能，例如表格、圖表、表單、地圖、日曆等等，也可以輕鬆自訂主題樣式。

## AdminLTE 3
AdminLTE 3 支援多種框架和平台，包括 Angular、React、Vue、ASP.NET Core、Laravel 等等，因此非常適合用於各種 Web 開發項目。此外，AdminLTE 3 的文件非常完整，提供了詳細的使用說明和示例，方便開發者快速入門和使用。

---

## 區分定義
起手前，請依據這個大區塊方式切割。後期時候可以再把裡面內容再次切割，後續工作就不會太複雜。
![](/image/20230508_20-15-39.png)


### 需要的動作
1. 創建 components/@Shared 資料夾
2. 安裝 admin-lte 3   ``` npm i admin-lte ```

備註 : 
如果你想要抓取全部的 js 資料，可以參考下方 reactJs 
booleanhunter/ReactJS-AdminLTE : (https://github.com/booleanhunter/ReactJS-AdminLTE)[https://github.com/booleanhunter/ReactJS-AdminLTE]

## 結構說明
1. body : 請到 public / index.html 修改即可
2. AppRouter : 加入 class => wrapper  
3. AppRouter : 加入 class => content-wrapper
4. AppRouter : 加入 adminLTE css、js 檔案
從 adminLTE 作者設計的結構來看，建議先把外層先建立起來，完成我們的第一步。

### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>AdminLTE 3</title>
  </head>
  <body class="hold-transition sidebar-mini layout-fixed">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```


### AppRouter.tsx
```tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//append css or js
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/fontawesome-free/css/all.css'
import 'admin-lte/dist/js/adminlte'

//append layout
import Header from '../component/@Shared/Header';
import MenuSidebar from '../component/@Shared/MenuSidebar';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className='content-wrapper'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;

```


## 加入 Header、Menu
![](/image/20230508_20-31-34.png)


### Header.tsx
```tsx
import { Link } from 'react-router-dom';
import users from 'admin-lte/dist/img/user1-128x128.jpg'
import users_8 from 'admin-lte/dist/img/user8-128x128.jpg'
import users_3 from 'admin-lte/dist/img/user3-128x128.jpg'

const Header = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/about" className="nav-link">About</Link>
            </li>
          </ul>
      
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                <i className="fas fa-search"></i>
              </a>
              <div className="navbar-search-block">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search"></i>
                      </button>
                      <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
      
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-comments"></i>
                <span className="badge badge-danger navbar-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="#" className="dropdown-item">
                  <div className="media">
                    <img src={users} alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <div className="media">
                    <img src={users_8} alt="User Avatar" className="img-size-50 img-circle mr-3" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <div className="media">
                    <img src={users_3}alt="User Avatar" className="img-size-50 img-circle mr-3" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell"></i>
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-envelope mr-2"></i> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-users mr-2"></i> 8 friend requests
                  <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-file mr-2"></i> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                <i className="fas fa-expand-arrows-alt"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                <i className="fas fa-th-large"></i>
              </a>
            </li>
          </ul>
        </nav>
    );
}

export default Header;
```


### MenuSidebar
```tsx
import logo from 'admin-lte/dist/img/AdminLTELogo.png'
import users from 'admin-lte/dist/img/user1-128x128.jpg'
import { Link } from 'react-router-dom';


const MenuSidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={users} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                </div>

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="../../index.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Dashboard v1</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../../index2.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Dashboard v2</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="../../index3.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Dashboard v3</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

            </div>
        </aside>
    );
}

export default MenuSidebar;
```

## 完成後
完成後如同下圖畫面。
下篇會著重於如何看 adminLTE 結構以及規劃。
![](/image/20230508_20-40-44.png)


