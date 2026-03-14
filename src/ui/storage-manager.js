// Storage Manager - IndexedDB and LocalStorage handling
// Manages persistent storage for bookmarks, history, passwords, etc.

export class StorageManager {
  private db: IDBDatabase | null = null;
  private storeName = '4browser-storage';

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('4BrowserDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('bookmarks')) {
          db.createObjectStore('bookmarks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('history')) {
          db.createObjectStore('history', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('passwords')) {
          db.createObjectStore('passwords', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('tabs')) {
          db.createObjectStore('tabs', { keyPath: 'id' });
        }
      };
    });
  }

  async saveBookmark(bookmark: Bookmark): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['bookmarks'], 'readwrite');
      const store = transaction.objectStore('bookmarks');
      const request = store.add(bookmark);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getBookmarks(): Promise<Bookmark[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['bookmarks'], 'readonly');
      const store = transaction.objectStore('bookmarks');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async saveHistoryEntry(entry: HistoryEntry): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['history'], 'readwrite');
      const store = transaction.objectStore('history');
      const request = store.add(entry);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getHistory(limit: number = 100): Promise<HistoryEntry[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['history'], 'readonly');
      const store = transaction.objectStore('history');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result as HistoryEntry[];
        resolve(results.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit));
      };
    });
  }

  async clearHistory(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['history'], 'readwrite');
      const store = transaction.objectStore('history');
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async savePassword(password: PasswordEntry): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // In production, passwords should be encrypted
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['passwords'], 'readwrite');
      const store = transaction.objectStore('passwords');
      const request = store.add(password);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getPasswords(): Promise<PasswordEntry[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['passwords'], 'readonly');
      const store = transaction.objectStore('passwords');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  icon?: string;
  folder?: string;
  dateAdded: number;
}

export interface HistoryEntry {
  id: string;
  url: string;
  title: string;
  timestamp: number;
  visitCount: number;
}

export interface PasswordEntry {
  id: string;
  url: string;
  username: string;
  password: string; // Should be encrypted
  dateAdded: number;
}

export default StorageManager;
