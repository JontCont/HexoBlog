---
title: React (七) - 簡易製作Login 製作【套件 react auth kit】
date: 2022-05-09
categories: 
  - 前端技術
  - React
tags: 
  - React
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: /img/Web/react/react_bg.png
---

## 一、react auth kit
是簡化身份驗證和授權在 React 應用程式中的整合過程。它提供了一種靈活的方式來管理使用者身份驗證狀態、處理登入和註銷，以及控制使用者對特定功能和資源的存取權限。

### 特徵
1. 身份驗證狀態管理
2. 身份驗證元件
3. 存取控制
4. 路由保護

它提供了一套強大而靈活的工具，讓你能夠輕鬆地構建安全可靠的使用者身份驗證系統。

## 二· 使用方式
### 1-1 新增login 設定
```ts
const privateElement = (element: JSX.Element) => {
    return (
        <RequireAuth loginPath={"/login"}>
            {element}
        </RequireAuth>
    );
}
```

### 1-2 區分Layout 用法
#### 1-2-1 需登入頁面設定
```ts
    {/* user authrozie element */}
    <Route path="/Login" element={<LoginLayout />}>
        <Route path="/Login" element={<Login />} />
    </Route>
```
#### 1-2-2 登入後頁面
使用不同的Layout這邊可以使用下方作法
1. LoginLayout : 新增一個 LoginLayout.ts 製作 登入的模板
2. /Login : 底下為允許使用 LoginLayout 套版的也面。
```ts
{/* System element */}
<Route path="/" element={<MainLayout />}>
    <Route path="/" element={privateElement(<Home />)} />
    <Route path="/Profile" element={privateElement(<ProfileHome />)} />
    <Route path="/about" element={privateElement(<About />)} />
</Route>
```

### 1-3 登入頁面處理
#### 1-3-1 判斷有登入過
```ts
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
//是否有驗證
const isAuthenticated = useIsAuthenticated();

useEffect(() => {
    if (!isAuthenticated()) {
        navigate("/login", { replace: true });
    } else {
        navigate("/");
    }
}, []);
```

#### 1-3-2 登入做法
```ts
    const signIn = useSignIn();

    // 權限 (透過Ajax 取得token)
    const token = await services?.auth.login(useremail, password);
        if (!token) {
        toast.error('帳號或密碼輸入錯誤，請重新輸入');
        return false;
    }

    // 登入
    signIn({
        token: token, //Just a random token
        tokenType: "Bearer", // Token type set as Bearer
        authState: { name: "React User", uid: 123456 }, // Dummy auth user state
        expiresIn: 120 // Token Expriration time, in minutes
    })
```
