// 4Browser - Chrome-like Keybinds Configuration

export const ChromeKeyBinds = {
  // Tab Management
  'ctrl+t': { action: 'newTab', description: 'Open new tab' },
  'ctrl+n': { action: 'newWindow', description: 'Open new window' },
  'ctrl+w': { action: 'closeTab', description: 'Close current tab' },
  'ctrl+shift+w': { action: 'closeWindow', description: 'Close window' },
  'ctrl+shift+t': { action: 'reopenTab', description: 'Reopen last closed tab' },
  'ctrl+shift+n': { action: 'newIncognito', description: 'Open Incognito window' },

  // Navigation
  'alt+left': { action: 'goBack', description: 'Go to previous page' },
  'alt+right': { action: 'goForward', description: 'Go to next page' },
  'ctrl+r': { action: 'reload', description: 'Reload page' },
  'ctrl+shift+r': { action: 'hardReload', description: 'Hard reload (clear cache)' },
  'ctrl+l': { action: 'focusAddress', description: 'Focus address bar' },
  'ctrl+k': { action: 'searchWeb', description: 'Search from address bar' },

  // Page Functions
  'ctrl+f': { action: 'findInPage', description: 'Find in page' },
  'ctrl+g': { action: 'findNext', description: 'Find next match' },
  'ctrl+shift+g': { action: 'findPrevious', description: 'Find previous match' },
  'ctrl+p': { action: 'print', description: 'Print current page' },
  'ctrl+s': { action: 'savePage', description: 'Save page' },

  // History & Bookmarks
  'ctrl+h': { action: 'openHistory', description: 'Open History' },
  'ctrl+d': { action: 'addBookmark', description: 'Bookmark this page' },
  'ctrl+shift+b': { action: 'toggleBookmarks', description: 'Toggle Bookmarks bar' },
  'ctrl+y': { action: 'openDownloads', description: 'Open Downloads' },

  // Settings & Tools
  'ctrl+comma': { action: 'openSettings', description: 'Open Settings' },
  'ctrl+shift+delete': { action: 'clearBrowsingData', description: 'Clear browsing data' },
  'f12': { action: 'openDevTools', description: 'Open Developer Tools' },
  'ctrl+shift+i': { action: 'openDevTools', description: 'Open Developer Tools (alt)' },
  'ctrl+shift+j': { action: 'openConsole', description: 'Open Console' },
  'ctrl+shift+c': { action: 'inspectElement', description: 'Inspect element' },

  // Tab Navigation
  'ctrl+tab': { action: 'nextTab', description: 'Go to next tab' },
  'ctrl+shift+tab': { action: 'previousTab', description: 'Go to previous tab' },
  'ctrl+1': { action: 'goToTab', args: { index: 0 }, description: 'Jump to tab 1' },
  'ctrl+2': { action: 'goToTab', args: { index: 1 }, description: 'Jump to tab 2' },
  'ctrl+3': { action: 'goToTab', args: { index: 2 }, description: 'Jump to tab 3' },
  'ctrl+4': { action: 'goToTab', args: { index: 3 }, description: 'Jump to tab 4' },
  'ctrl+5': { action: 'goToTab', args: { index: 4 }, description: 'Jump to tab 5' },
  'ctrl+6': { action: 'goToTab', args: { index: 5 }, description: 'Jump to tab 6' },
  'ctrl+7': { action: 'goToTab', args: { index: 6 }, description: 'Jump to tab 7' },
  'ctrl+8': { action: 'goToTab', args: { index: 7 }, description: 'Jump to tab 8' },
  'ctrl+9': { action: 'goToTab', args: { index: -1 }, description: 'Jump to last tab' },

  // Misc
  'ctrl+0': { action: 'resetZoom', description: 'Reset zoom' },
  'ctrl+plus': { action: 'zoomIn', description: 'Zoom in' },
  'ctrl+minus': { action: 'zoomOut', description: 'Zoom out' },
  'space': { action: 'scrollPageDown', description: 'Scroll down' },
  'shift+space': { action: 'scrollPageUp', description: 'Scroll up' },
  'ctrl+j': { action: 'openDownloads', description: 'Open Downloads' },
};

export const MacKeyBinds = {
  // Tab Management
  'cmd+t': { action: 'newTab', description: 'Open new tab' },
  'cmd+n': { action: 'newWindow', description: 'Open new window' },
  'cmd+w': { action: 'closeTab', description: 'Close current tab' },
  'cmd+shift+w': { action: 'closeWindow', description: 'Close window' },
  'cmd+shift+t': { action: 'reopenTab', description: 'Reopen last closed tab' },
  'cmd+shift+n': { action: 'newIncognito', description: 'Open Incognito window' },

  // Navigation
  'cmd+left': { action: 'goBack', description: 'Go to previous page' },
  'cmd+right': { action: 'goForward', description: 'Go to next page' },
  'cmd+r': { action: 'reload', description: 'Reload page' },
  'cmd+shift+r': { action: 'hardReload', description: 'Hard reload (clear cache)' },
  'cmd+l': { action: 'focusAddress', description: 'Focus address bar' },
  'cmd+y': { action: 'openHistory', description: 'Open History' },

  // Developer Tools
  'cmd+option+i': { action: 'openDevTools', description: 'Open Developer Tools' },
  'cmd+option+j': { action: 'openConsole', description: 'Open Console' },
  'cmd+option+u': { action: 'viewSource', description: 'View Page Source' },

  // Other
  'cmd+,': { action: 'openSettings', description: 'Open Settings' },
  'cmd+d': { action: 'addBookmark', description: 'Bookmark this page' },
};

// Auto-detect based on platform
export function getDefaultKeyBinds() {
  const platform = process.platform;
  return platform === 'darwin' ? MacKeyBinds : ChromeKeyBinds;
}
