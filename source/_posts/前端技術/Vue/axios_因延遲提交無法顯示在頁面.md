---
title: 【學習】Vue - axios因延遲提交無法顯示在頁面
date: 2022-08-02
categories: 
  - 前端技術
  - Vue
tags: 
  - Vue
description:
keyword: 'ES6, Vue  ,網頁'
cover: /image/20230517_21-58-52.png
---
## 前言
近期有努力將 adminlte 套版在專案上，有試著用別人的專案上面改成自己的API，遇到專案上"Menu"是寫死並非是Ajax 回拋過來進行改寫。


### 使用專案
本篇是用這個來做練習。
- Github : [erdkse/adminlte-3-vue](https://github.com/erdkse/adminlte-3-vue)

## 撰寫 ajax 
使用前務必要自行安裝 axios
- 使用教學 : [點選我](https://www.runoob.com/vue3/vue3-ajax-axios.html)

### 修改服務 Auth.ts
這邊有關 authorizer 定義，我們將 Menu API 加入在這裡專案上面即可。
這個版本有幫你寫好 alert 工具 ，只需要改寫 getError 內容即可。
```ts
export const getUsersMenus = async () => {
    try{
        const url :string = "https://localhost:5001/api/user/menus";
        let menus:any;
        await axios
            .get(url)
            .then((res) => {
                menus = res.data;
                return menus;
            });
        return menus;
    }catch(error : any){
        throw getError({
            message : "伺服器暫時無法使用"
        });
    }
};
```

## 加入 menu-sidebar.ts
這段需要注意。axios 是利用非同步方式回傳，若網頁是先載完後就不再回頭撈一次未跑完的 ajax 。

這驗就使用使用 created() 把 this.menu 資訊存入，可以確保完成前必定會完成這段 ajax 。
- 生命週期 : [點選我](https://book.vue.tw/CH1/1-7-lifecycle.html)

```ts 
import {IUser} from '@/interfaces/user';
import {Options, Vue} from 'vue-class-component';
import MenuItem from '@/components/menu-item/menu-item.vue';
import {PfImage} from '@profabric/vue-components';
import SidebarSearch from '@/components/sidebar-search/sidebar-search.vue';
// import {i18n} from '@/translation';
import {getUsersMenus} from '@/services/auth'

@Options({
    name: 'app-menu-sidebar',
    components: {
        'app-menu-item': MenuItem,
        'app-sidebar-search': SidebarSearch,
        'pf-image': PfImage
    }
})
export default class MenuSidebar extends Vue {
    public menu: any = []; // 設置為空數組，直到 Promise 解決為止
    get user(): IUser {
        return this.$store.getters['auth/user'];
    }

    get sidebarSkin() {
        return this.$store.getters['ui/sidebarSkin'];
    }

    async created() { // 確保 Promise 解決後，再繼續創建組件
        this.menu = await getUsersMenus();
    }
}
``



