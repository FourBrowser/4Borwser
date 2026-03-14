// JS Bridge module for IPC between main and renderer processes

export class BrowserBridge {
  private listeners: Map<string, Function[]> = new Map();

  /**
   * Send message to main process
   */
  send(channel: string, data?: any) {
    // @ts-ignore - Native method
    if (window.nativeAPI?.send) {
      window.nativeAPI.send(channel, data);
    }
  }

  /**
   * Send message and wait for response
   */
  async invoke(channel: string, data?: any): Promise<any> {
    // @ts-ignore
    if (window.nativeAPI?.invoke) {
      return window.nativeAPI.invoke(channel, data);
    }
  }

  /**
   * Listen for messages from main process
   */
  on(channel: string, handler: (data: any) => void) {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, []);
    }
    this.listeners.get(channel)!.push(handler);

    // @ts-ignore
    if (window.nativeAPI?.on) {
      window.nativeAPI.on(channel, handler);
    }
  }

  /**
   * Listen for one message and auto-remove
   */
  once(channel: string, handler: (data: any) => void) {
    const wrapper = (data: any) => {
      handler(data);
      this.removeListener(channel, wrapper);
    };
    this.on(channel, wrapper);
  }

  /**
   * Remove listener
   */
  removeListener(channel: string, handler: Function) {
    const handlers = this.listeners.get(channel);
    if (handlers) {
      const index = handlers.indexOf(handler as never);
      if (index > -1) handlers.splice(index, 1);
    }
  }

  /**
   * Execute native command
   */
  executeCommand(command: string, args?: any[]): Promise<any> {
    return this.invoke('execute-command', { command, args });
  }

  /**
   * Get browser info
   */
  async getBrowserInfo(): Promise<BrowserInfo> {
    return this.invoke('get-browser-info');
  }

  /**
   * Close current window
   */
  closeWindow() {
    this.send('close-window');
  }

  /**
   * Navigate to URL
   */
  navigate(url: string) {
    this.send('navigate', url);
  }

  /**
   * Reload page
   */
  reload() {
    this.send('reload');
  }

  /**
   * Go back
   */
  goBack() {
    this.send('go-back');
  }

  /**
   * Go forward
   */
  goForward() {
    this.send('go-forward');
  }
}

export interface BrowserInfo {
  version: string;
  platform: string;
  userAgent: string;
  locale: string;
}

// Export singleton instance
export const browserBridge = new BrowserBridge();

export default browserBridge;
