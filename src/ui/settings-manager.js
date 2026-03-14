// Settings Manager for 4Browser
// Handles user preferences and configuration

export class SettingsManager {
  private settings: Map<string, any> = new Map();
  private defaults: Map<string, any> = new Map();

  constructor() {
    this.initializeDefaults();
    this.loadSettings();
  }

  private initializeDefaults() {
    // General
    this.defaults.set('homepage', 'about:home');
    this.defaults.set('homepage_is_custom', false);
    this.defaults.set('startup.restorePreviousSessions', true);

    // Search
    this.defaults.set('search.engine', 'google');
    this.defaults.set('search.suggest_enabled', true);

    // Privacy
    this.defaults.set('privacy.block_third_party_cookies', true);
    this.defaults.set('privacy.do_not_track', true);
    this.defaults.set('privacy.https_only', true);

    // Security
    this.defaults.set('security.malware_protection', true);
    this.defaults.set('security.ssl', true);
    this.defaults.set('security.sandbox', true);

    // Performance
    this.defaults.set('performance.enable_cache', true);
    this.defaults.set('performance.memory_saver', false);
    this.defaults.set('performance.battery_saver', false);

    // UI
    this.defaults.set('ui.theme', 'light');
    this.defaults.set('ui.show_bookmark_bar', true);
    this.defaults.set('ui.show_status_bar', true);
    this.defaults.set('ui.tab_grouping', true);

    // Downloads
    this.defaults.set('downloads.default_location', '~/Downloads');
    this.defaults.set('downloads.ask_before_download', false);
  }

  get(key: string, defaultValue?: any): any {
    if (this.settings.has(key)) {
      return this.settings.get(key);
    }
    if (this.defaults.has(key)) {
      return this.defaults.get(key);
    }
    return defaultValue;
  }

  set(key: string, value: any): void {
    this.settings.set(key, value);
    this.saveSettings();
  }

  has(key: string): boolean {
    return this.settings.has(key) || this.defaults.has(key);
  }

  getAll(): Record<string, any> {
    const result: Record<string, any> = {};
    
    // First add defaults
    for (const [key, value] of this.defaults) {
      result[key] = value;
    }
    
    // Then override with user settings
    for (const [key, value] of this.settings) {
      result[key] = value;
    }

    return result;
  }

  reset(key?: string): void {
    if (key) {
      this.settings.delete(key);
    } else {
      this.settings.clear();
    }
    this.saveSettings();
  }

  private loadSettings(): void {
    try {
      const stored = localStorage.getItem('4browser-settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        for (const [key, value] of Object.entries(parsed)) {
          this.settings.set(key, value);
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  private saveSettings(): void {
    try {
      const obj = Object.fromEntries(this.settings);
      localStorage.setItem('4browser-settings', JSON.stringify(obj));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  /**
   * Export settings as JSON
   */
  export(): string {
    return JSON.stringify(this.getAll(), null, 2);
  }

  /**
   * Import settings from JSON
   */
  import(json: string): void {
    try {
      const imported = JSON.parse(json);
      for (const [key, value] of Object.entries(imported)) {
        this.set(key, value);
      }
    } catch (error) {
      console.error('Failed to import settings:', error);
    }
  }
}

export const settingsManager = new SettingsManager();

export default settingsManager;
