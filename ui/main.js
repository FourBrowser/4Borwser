// Main.js - Entry point for 4Browser UI
import React from 'react';
import ReactDOM from 'react-dom/client';
import BrowserShell from './BrowserShell';
import StorageManager from './storage-manager.js';
import NetworkManager from './network-manager.js';
import './index.css';

// Initialize managers
const storageManager = new StorageManager();
const networkManager = new NetworkManager();

// Initialize storage
storageManager.initialize().catch(err => {
  console.error('Failed to initialize storage:', err);
});

// Mount React app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserShell />
  </React.StrictMode>
);

// Make managers global for debugging
(window as any).storageManager = storageManager;
(window as any).networkManager = networkManager;
