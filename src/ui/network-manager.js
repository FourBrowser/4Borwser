// Network and HTTP handling for 4Browser
// Manages requests, caching, and network protocols

export class NetworkManager {
  private cache: Map<string, CacheEntry> = new Map();
  private cookieJar: CookieJar;
  private requestQueue: Array<PendingRequest> = [];

  constructor() {
    this.cookieJar = new CookieJar();
  }

  async fetchResource(url: string, options: RequestOptions = {}): Promise<Response> {
    // Check cache first
    const cached = this.getFromCache(url);
    if (cached && !this.isCacheExpired(cached)) {
      return cached.response;
    }

    try {
      const request = new Request(url, {
        headers: {
          'User-Agent': '4Browser/1.0 (Like Chrome)',
          ...options.headers
        },
        ...options
      });

      const response = await fetch(request);

      // Store in cache
      this.storeInCache(url, response);

      return response;
    } catch (error) {
      console.error('Network error:', error);
      throw error;
    }
  }

  private getFromCache(url: string): CacheEntry | null {
    return this.cache.get(url) || null;
  }

  private storeInCache(url: string, response: Response, ttl: number = 3600000) {
    this.cache.set(url, {
      response: response.clone(),
      timestamp: Date.now(),
      ttl
    });
  }

  private isCacheExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  clearCache() {
    this.cache.clear();
  }

  setCookie(cookie: string, domain: string) {
    this.cookieJar.set(domain, cookie);
  }

  getCookies(domain: string): string[] {
    return this.cookieJar.get(domain);
  }
}

interface CacheEntry {
  response: Response;
  timestamp: number;
  ttl: number;
}

interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  followRedirects?: boolean;
}

interface PendingRequest {
  url: string;
  priority: number;
  callback: (response: Response) => void;
}

class CookieJar {
  private cookies: Map<string, string[]> = new Map();

  set(domain: string, cookie: string) {
    if (!this.cookies.has(domain)) {
      this.cookies.set(domain, []);
    }
    this.cookies.get(domain)!.push(cookie);
  }

  get(domain: string): string[] {
    return this.cookies.get(domain) || [];
  }

  clear(domain?: string) {
    if (domain) {
      this.cookies.delete(domain);
    } else {
      this.cookies.clear();
    }
  }
}

export default NetworkManager;
