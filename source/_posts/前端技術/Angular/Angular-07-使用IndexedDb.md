---
title: Angular (七) - 使用 IndexedDb
date: 2023-10-17 19:54:58
categories: 
  - 前端技術
  - Angular
  - IndexedDb
tags: 
  - Angular
description:
keyword: 'ES6, Angular ,網頁'
cover: /img/Web/bg/Angular-bg-01.png
---

## 前言
IndexedDb 是一個瀏覽器內建的資料庫，可以透過 Javascript 進行操作，並且可以在瀏覽器關閉後，資料依然存在，因此可以用來做離線儲存的功能。

---
## 實作 CRUD 範例

### 創建 Service
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDatabase();
  }
  private async connectDataBase(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('MyDatabase', 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const objectStoreNames = db.objectStoreNames;
        console.log(objectStoreNames);
        resolve(db);
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }

  private initDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('MyDatabase', 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        // 创建数据表
        const contactsStore = db.createObjectStore('contacts', {
          keyPath: 'id',
          autoIncrement: true,
        });
        // 定义数据表的索引
        contactsStore.createIndex('name', 'name', { unique: false });
        contactsStore.createIndex('email', 'email', { unique: true });
        console.log('数据库升级成功');
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        console.log('数据库打开成功');
        resolve();
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }

  async getContactList(): Promise<any> {
    await this.connectDataBase();

    if (!this.db) {
      throw new Error('Database is not initialized.');
    }

    const transaction = this.db.transaction(['contacts'], 'readonly');
    const store = transaction.objectStore('contacts');

    return new Promise<void>((resolve, reject) => {
      const getRequest = store.getAll();
      getRequest.onsuccess = (event: any) => {
        const contact = event.target.result;
        resolve(contact);
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async getContact(id: number): Promise<any> {
    await this.connectDataBase();

    if (!this.db) {
      throw new Error('Database is not initialized.');
    }

    const transaction = this.db.transaction(['contacts'], 'readonly');
    const store = transaction.objectStore('contacts');

    return new Promise<void>((resolve, reject) => {
      const getRequest = store.get(id);
      getRequest.onsuccess = (event: any) => {
        const contact = event.target.result;
        resolve(contact);
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async addContact(contact: any): Promise<void> {
    await this.connectDataBase();

    if (!this.db) {
      throw new Error('Database is not initialized.');
    }

    const transaction = this.db.transaction(['contacts'], 'readwrite');
    const store = transaction.objectStore('contacts');

    return new Promise<void>((resolve, reject) => {
      const addRequest = store.add(contact);
      addRequest.onsuccess = () => resolve();
      addRequest.onerror = () => reject(addRequest.error);
    });
  }

  async updateContact(contact: any): Promise<void> {
    await this.connectDataBase();

    if (!this.db) {
      throw new Error('Database is not initialized.');
    }

    const transaction = this.db.transaction(['contacts'], 'readwrite');
    const store = transaction.objectStore('contacts');

    return new Promise<void>((resolve, reject) => {
      const updateRequest = store.put(contact);
      updateRequest.onsuccess = () => resolve();
      updateRequest.onerror = () => reject(updateRequest.error);
    });
  }

  async deleteContact(id: number): Promise<void> {
    await this.connectDataBase();

    if (!this.db) {
      throw new Error('Database is not initialized.');
    }

    const transaction = this.db.transaction(['contacts'], 'readwrite');
    const store = transaction.objectStore('contacts');

    return new Promise<void>((resolve, reject) => {
      const deleteRequest = store.delete(id);
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    });
  }

}
```

### 加入 Service 到 AppModule
```ts
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    BrowserAnimationsModule,
  ],
  providers: [IndexedDbService], // 这里添加 IndexedDbService
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 創建 Component
```ts
import { Component } from '@angular/core';
import { IndexedDbService } from 'src/app/@Service/indexed-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private dbService: IndexedDbService) {}
  data: any;
  row = {
    id: 0,
    name: '',
    email: '',
  } as any;
  
  ngOnInit(): void {
    this.listContacts();
  }

  addContact(row: any) {
    this.dbService
      .addContact(row)
      ?.then(() => {
        this.listContacts();
      })
      .catch((error) => {
        console.error('Error adding contact', error);
      });
  }

  listContacts() {
    this.dbService
      .getContactList()
      .then((contact) => {
        // console.log(contact);
        this.data = contact;
      })
      .catch((error) => {
        console.error('Error getting contact', error);
      });
  }

  deleteContact(row: any) {
    let id = row.id;
    this.dbService
      .deleteContact(id)
      .then(() => {
        this.listContacts();
      })
      .catch((error) => {
        console.error('Error deleting contact', error);
      });
  }

  updateContact(row: any) {
    this.dbService
      .updateContact(row)
      .then(() => {
        this.listContacts();
      })
      .catch((error) => {
        console.error('Error deleting contact', error);
      });
  }

  saveContact() {
    if (this.row.id == 0) {
      this.addContact(this.row);
    } else {
      this.updateContact(this.row);
    }
    this.row = {
      id: 0,
      name: '',
      email: '',
    };
  }

  onClickUpdate(row:any){
    console.log(row);
    this.row = {
      id: row.id,
      name: row.name,
      email: row.email,
    };
  }
}
```

