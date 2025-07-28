---
title: React (六) - 先學 react-redux 後學login
date: 2022-05-07
categories: 
  - 前端技術
  - React
tags: 
  - React
description:
keyword: 'ES6, ReactJs  ,網頁'
cover: /img/Web/react/react_bg.png
---

# React Redux

React Redux 是一個用於在 React 應用程序中管理狀態的領先狀態管理庫。它與 Redux 库密切配合，提供了一個可預測的狀態容器，並通過使用 React 的 Context API 實現了高效的狀態管理。React Redux 基於 Flux 架構，使用單向數據流模型來處理應用程序的狀態更新。

React Redux 的主要特點包括：

- 提供一個 Provider 組件，使整個應用程序中的組件都能夠訪問 Redux 的狀態。
- 通過 useSelector 和 useDispatch，簡化了組件與 Redux 的交互。
- 通過使用 connect 函數，可以將組件與 Redux 的狀態和操作相連接，使它們能夠自動更新。
- 支持中間件，例如 Redux Thunk 或 Redux Saga，用於處理異步操作和複雜的業務邏輯。

## useDispatch 
useDispatch 是一個用於獲取 Redux store 的 dispatch 函數的鉤子函數。dispatch 函數用於觸發 Redux store 中的 action，從而更新狀態。通過 useDispatch，我們可以在組件中直接調用 dispatch 函數，而無需手動導入和創建 Redux store。

## useSelector 
useSelector 是一個用於從 Redux store 中選擇和提取數據的鉤子函數。它接收一個函數作為參數，該函數可以從 Redux store 的狀態樹中選擇所需的數據，並將其返回給組件。每當 Redux store 中的狀態發生變化時，useSelector 會自動重新運行，並將新的狀態值提供給組件，從而觸發組件的重新渲染。

## 前置作業

npm : [點選我](https://www.npmjs.com/)
使用工具/套件：

1. @reduxjs/toolkit : [點選我](https://www.npmjs.com/package/@reduxjs/toolkit)
2. react-redux : [點選我](https://www.npmjs.com/package/react-redux)

使用指令/專案:

```command
npx create-react-app react-redux-example --template typescript
```

## 製作計數器 (counter)

官方 react-redux : [點選我](https://react-redux.js.org/)

動作/目標:

1. 創建 ```src/store/store.tsx```
2. 創建 ```src/store/counter/counterSlice.tsx```
3. 修改 index.tsx 、App.tsx

### 創建 store.tsx

因為初次使用暫時把參數那些放一邊

```tsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice'

const store = configureStore({
    reducer: {
    },
});

export default store;
```

### 創建 counterSlice.tsx

```tsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        //method
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

因為已經取得好參數，可以把 store.tsx 內容補齊

```tsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;
```

### 修改 index.tsx 、App.tsx

```tsx index.tsx
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
      <App></App>
  </Provider>

);

reportWebVitals();
```

```tsx App.tsx
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './store/counter/counterSlice';

function App() 
{
  const count = useSelector((state: any) => {
    return state.counter.value;
  });
  const dispatch = useDispatch()
  return (
    <div>
      <h3>React-Redux</h3>
      <div>
        Result : {count}
      </div>

      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
}
export default App;

```

## 畫面完成
![](/image/20230604_14-36-16.png)

