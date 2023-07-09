---
title: React (七) - 簡易製作Login 製作【內建 react-redix】
categories: 
  - 前端技術
  - React
tags: 
  - React
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: /img/Web/react/react_bg.png
---

## 複習
React Redux 是一個用於在 React 應用程序中管理狀態的領先狀態管理庫。它與 Redux 库密切配合，提供了一個可預測的狀態容器，並通過使用 React 的 Context API 實現了高效的狀態管理。React Redux 基於 Flux 架構，使用單向數據流模型來處理應用程序的狀態更新。

React Redux 的主要特點包括：

- 提供一個 Provider 組件，使整個應用程序中的組件都能夠訪問 Redux 的狀態。
- 通過 useSelector Hook Function和 useDispatch Hook Function，簡化了組件與 Redux 的交互。
- 通過使用 connect 函數，可以將組件與 Redux 的狀態和操作相連接，使它們能夠自動更新。
- 支持中間件，例如 Redux Thunk 或 Redux Saga，用於處理異步操作和複雜的業務邏輯。

## 登入

### 1. 創建 src/store/stroe.js
```js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export default store;
```

2. 加入 authSlice.js
```js
// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    //授權動作
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;

```


### 3. index.js 加入狀態

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();

```

### 4. 加入 App.js 登入頁面
在這個例子中，我們使用了 useSelector 函數來從 Redux Store 中獲取登入狀態。然後根據狀態顯示不同的按鈕。當按鈕被點擊時，我們使用 useDispatch 函數分發相應的 action，從而更新登入狀態。
```js
import logo from './logo.svg';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './store/counter/counterSlice'
import React, { useState } from 'react';
import { loginSuccess } from './store/auth/authSlice';
import './App.css';

function App() {
  //initial value 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const user = { id: 1, username: 'exampleuser' };
    dispatch(loginSuccess(user));
  }

  return (
    <div className="d-flex flex-center h-100vh">
      <div className='d-inline-block padding-1'>
        <h3 className='text-center'>登入</h3>
        <p>製作簡易版本登入，比較react redux 與 react auto kit 功能</p>
        <p>作品參考請至 Github 查詢</p>
      </div>
      <div className='card d-inline-block'>
        <form className='' onSubmit={handleSubmit}> 
          <div>
            <label>User</label>
            <input type='text' 
              placeholder='User'
              value={username}
              onChange={(e) => setUsername(e.target.value)}>
          </input>
          </div>
          <div>
            <label>pass</label>
            <input type='password' 
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ></input>
          </div>
          <div>
            <button type='submit'>Sign in</button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default App;
```

## 實作範例
1. [JontCont/react-login-redux](https://github.com/JontCont/react-login-redux)
2. [JontCont/redux-login-example](https://github.com/JontCont/redux-login-example)