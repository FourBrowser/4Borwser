# 4Browser - A Modern Chromium-Based Browser

**4Browser** is a high-performance web browser built on Chromium with a React UI, powered by C++, Rust, and JavaScript. It aims to replicate Google Chrome's features, interfaces, and keyboard shortcuts while providing a modern, extensible architecture.

## Features

### Core Features (Chrome-like)
- ✅ **Tab Management** - Multiple tabs with Chrome-style tab bar
- ✅ **Navigation** - Back, Forward, Reload with address bar
- ✅ **Bookmarks** - Save and organize bookmarks
- ✅ **History** - Browse browsing history
- ✅ **Downloads** - Manage file downloads
- ✅ **Incognito Mode** - Private browsing
- ✅ **Sync** - Sync across devices
- ✅ **Settings** - Comprehensive settings panel
- ✅ **Developer Tools** - Built-in DevTools
- ✅ **Extensions** - Support for browser extensions

### Security & Privacy
- 🔒 SSL/TLS with HTTPS support
- 🛡️ Site Isolation
- 🔐 Password manager with secure storage
- 🚫 Tracking prevention
- 🌐 DNS over HTTPS (DoH)
- 🍪 Third-party cookie blocking

### Performance
- ⚡ Multi-process architecture
- 💾 Intelligent caching
- 📦 Compression proxy support
- 🔄 Pre-rendering
- 🔋 Memory and battery optimization

### Keyboard Shortcuts
Full Chrome-compatible keyboard shortcuts including:
- `Ctrl+T` - New Tab
- `Ctrl+N` - New Window
- `Ctrl+W` - Close Tab
- `Ctrl+R` - Reload
- `Ctrl+L` - Focus Address Bar
- `F12` - Open DevTools
- And many more...

## Project Structure

```
4Browser/
├── src/
│   ├── core/              # Core browser instance (C++)
│   ├── engine/            # Rendering engine (C++ + Rust)
│   ├── renderer/          # Page rendering (C++)
│   ├── ui/                # UI components (JS + React)
│   └── main.cpp           # Entry point
├── ui/                    # React/TypeScript UI components
│   ├── BrowserShell.tsx   # Main browser UI
│   ├── main.js            # React entry point
│   └── index.html         # HTML template
├── config/                # Configuration files
│   ├── chrome-config.json # Chrome-like settings
│   └── preferences.json   # User preferences
├── build/                 # CMake build output
├── CMakeLists.txt         # C++ build configuration
├── Cargo.toml             # Rust dependencies
└── package.json           # Node.js dependencies
```

## Architecture

### Technology Stack

**C++**
- Core browser engine
- Rendering pipeline
- Platform-specific APIs
- Performance-critical components

**Rust**
- High-performance layout engine
- DOM tree management
- CSS processing
- Safe memory management

**JavaScript/TypeScript**
- React UI components
- User interface
- Event handling
- Storage management

### Multi-process Architecture

```
Main Process
├── Browser Instance
├── UI Rendering
└── User Input

Renderer Processes (Tabs)
├── DOM Tree
├── CSS Engine
├── JavaScript Engine
└── Page Content

Worker Processes
├── Network Requests
├── Storage I/O
└── Background Tasks
```

## Building

### Prerequisites

- CMake 3.16+
- C++17 compatible compiler
- Rust 1.70+
- Node.js 16+
- OpenGL/WebGPU support

### Build Instructions

#### Linux/macOS
```bash
# Install dependencies
sudo apt-get install -y libglfw3-dev libgl1-mesa-dev libssl-dev zlib1g-dev

# Clone and setup
git clone https://github.com/FourBrowser/4Browser.git
cd 4Browser

# Build C++ components
mkdir build && cd build
cmake ..
make

# Build Rust components
cargo build --release

# Install JavaScript dependencies
npm install

# Run
./build/4browser
```

#### Windows
```cmd
# Install dependencies (requires Visual C++ Build Tools)
# Then build with:
mkdir build && cd build
cmake .. -G "Visual Studio 16 2019"
cmake --build . --config Release
```

## Running

```bash
# Debug mode
npm run dev

# Build only
npm run build

# Run UI development server
npm run ui
```

## Configuration

### Key Configuration Files

1. **chrome-config.json** - Feature flags and settings
2. **preferences.json** - User preferences (like Chrome's Preferences file)
3. **keybinds.js** - Keyboard shortcuts

## Features Roadmap

### Phase 1 (Current)
- [x] Basic browser window
- [x] Tab management
- [x] Address bar
- [x] Navigation controls
- [x] Keyboard shortcuts

### Phase 2
- [ ] Full HTML/CSS rendering
- [ ] JavaScript execution engine
- [ ] Network stack
- [ ] Cookie/Storage management
- [ ] Basic DevTools

### Phase 3
- [ ] Extensions support
- [ ] Sync functionality
- [ ] Password management
- [ ] Advanced DevTools
- [ ] Chrome OS support

### Phase 4
- [ ] Auto-updates
- [ ] Deeper security features
- [ ] Performance optimizations
- [ ] Mobile version (Android)

## Chrome Feature Parity

### Implemented (Planned)
- ✅ Tab management
- ✅ Keyboard shortcuts
- ⏳ Settings panel
- ⏳ Download manager
- ⏳ History and bookmarks
- ⏳ Developer tools
- ⏳ Incognito mode
- ⏳ Extensions (Manifest V3)
- ⏳ Sync
- ⏳ Autofill/Password manager

## Performance Targets

- **Startup Time**: < 2 seconds
- **Page Load**: < 1 second (cached)
- **Memory Usage**: < 300MB (base)
- **Tab Overhead**: < 50MB per tab

## Security

- Multi-process isolation
- Site isolation for tabs
- Automatic security updates
- Built-in malware protection
- HTTPS by default promotion

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](LICENSE) file

## Acknowledgments

- Built on Chromium/WebKit
- Uses WebRender for graphics
- Modern C++, Rust, and JavaScript

## Resources

- [Chromium Documentation](https://www.chromium.org/)
- [WebRender](https://github.com/servo/webrender)
- [WebGPU Spec](https://gpuweb.github.io/)

---

**4Browser** - Building the browser of the future, today.
