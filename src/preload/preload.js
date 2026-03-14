// Example preload script for IPC setup
// This runs before web content in the renderer process

const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to web content
contextBridge.exposeInMainWorld('nativeAPI', {
  send: (channel, data) => {
    // Whitelist allowed channels
    const validChannels = [
      'navigate',
      'reload',
      'go-back',
      'go-forward',
      'close-window'
    ];
    
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  invoke: (channel, data) => {
    // Whitelist allowed channels
    const validChannels = [
      'execute-command',
      'get-browser-info',
      'get-network-stats'
    ];
    
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
  },

  on: (channel, callback) => {
    // Whitelist allowed channels
    const validChannels = [
      'data-updated',
      'settings-changed',
      'tab-closed'
    ];
    
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, data) => callback(data));
    }
  }
});
