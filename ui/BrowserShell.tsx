// Main UI Component - Browser Shell
// React/TypeScript component for the browser interface

import React, { useState, useEffect, useRef } from 'react';
import './BrowserShell.css';
import { ChromeKeyBinds } from './keybinds.js';

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  active: boolean;
  isLoading: boolean;
}

const BrowserShell: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      title: 'New Tab',
      url: 'about:home',
      active: true,
      isLoading: false
    }
  ]);

  const [address, setAddress] = useState('about:home');
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);
  const [zoom, setZoom] = useState(100);
  const addressBarRef = useRef<HTMLInputElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = buildKeyCombo(e);
      
      const keybind = ChromeKeyBinds[key as keyof typeof ChromeKeyBinds];
      if (!keybind) return;

      e.preventDefault();
      executeAction(keybind.action, keybind.args);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tabs]);

  const buildKeyCombo = (e: KeyboardEvent): string => {
    const parts = [];
    if (e.ctrlKey) parts.push('ctrl');
    if (e.altKey) parts.push('alt');
    if (e.shiftKey) parts.push('shift');
    if (e.metaKey) parts.push('cmd');
    parts.push(e.key.toLowerCase());
    return parts.join('+');
  };

  const executeAction = (action: string, args?: any) => {
    switch (action) {
      case 'newTab':
        createNewTab();
        break;
      case 'closeTab':
        closeTab(tabs.find(t => t.active)?.id || '');
        break;
      case 'focusAddress':
        addressBarRef.current?.focus();
        break;
      case 'reload':
        reloadTab();
        break;
      case 'zoomIn':
        setZoom(z => Math.min(z + 10, 300));
        break;
      case 'zoomOut':
        setZoom(z => Math.max(z - 10, 50));
        break;
      case 'resetZoom':
        setZoom(100);
        break;
      // Add more actions as needed
    }
  };

  const createNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: 'New Tab',
      url: 'about:home',
      active: true,
      isLoading: false
    };
    setTabs(prevTabs => 
      [...prevTabs.map(t => ({ ...t, active: false })), newTab]
    );
  };

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(t => t.id !== tabId);
    if (newTabs.length === 0) createNewTab();
    setTabs(newTabs);
  };

  const switchTab = (tabId: string) => {
    setTabs(prevTabs =>
      prevTabs.map(t => ({
        ...t,
        active: t.id === tabId
      }))
    );
    const tab = tabs.find(t => t.id === tabId);
    if (tab) setAddress(tab.url);
  };

  const reloadTab = () => {
    // Trigger reload event
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleAddressSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let url = address;
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('about:')) {
        url = 'https://' + url;
      }
      setAddress(url);
      // Navigate active tab
    }
  };

  return (
    <div className="browser-shell" style={{ zoom: `${zoom}%` }}>
      {/* Tab Bar */}
      <div className="tab-bar">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${tab.active ? 'active' : ''}`}
            onClick={() => switchTab(tab.id)}
          >
            {tab.favicon && <img src={tab.favicon} className="favicon" />}
            <span className="tab-title">{tab.title}</span>
            {tab.isLoading && <div className="loader"></div>}
            <button className="close-btn" onClick={() => closeTab(tab.id)}>×</button>
          </div>
        ))}
        <button className="new-tab-btn" onClick={createNewTab}>+</button>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <button className="nav-btn">←</button>
        <button className="nav-btn">→</button>
        <button className="nav-btn">↻</button>
        <input
          ref={addressBarRef}
          type="text"
          className="address-bar"
          value={address}
          onChange={handleAddressChange}
          onKeyDown={handleAddressSubmit}
          placeholder="Search or type URL"
        />
        <button className="menu-btn">⋮</button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        <iframe className="page-frame" src={address} title="page"></iframe>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <span className="status-text">Ready</span>
      </div>
    </div>
  );
};

export default BrowserShell;
