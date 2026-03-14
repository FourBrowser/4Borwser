# 4Browser - Project Overview

## What is 4Browser?

**4Browser** is a modern, high-performance web browser built from the ground up using:
- **C++** - Core browser engine and rendering pipeline
- **Rust** - High-performance layout engine and DOM processing
- **JavaScript/TypeScript** - Modern React-based UI layer
- **Chromium** - Underlying web engine

The goal is to create a browser that replicates Google Chrome's features, interface, and keyboard shortcuts while providing a modern, maintainable architecture for future development.

## Quick Stats

| Metric | Value |
|--------|-------|
| **Languages** | C++17, Rust 2021, TypeScript 5 |
| **UI Framework** | React 18+ |
| **Build System** | CMake 3.16+ |
| **Target Platforms** | Windows, macOS, Linux |
| **License** | MIT |
| **Status** | Early Stage (33% implemented) |
| **Team** | FourBrowser Organization |

## Project Structure at a Glance

```
4Browser/
│
├── 📁 src/                    # C++ source code
│   ├── core/                  # Browser instance & lifecycle
│   ├── engine/                # Rendering engine (C++ + Rust)
│   ├── renderer/              # Page rendering pipeline
│   └── ui/                    # Utility modules (network, storage, etc.)
│
├── 📁 ui/                     # React UI components
│   ├── BrowserShell.tsx       # Main browser interface
│   ├── main.js                # React entry point
│   └── index.html             # HTML template
│
├── 📁 config/                 # Configuration files
│   ├── chrome-config.json     # Feature flags
│   └── preferences.json       # User settings
│
├── 📁 build/                  # CMake build output (generated)
│
├── 📄 CMakeLists.txt          # C++ build configuration
├── 📄 Cargo.toml              # Rust dependencies
├── 📄 package.json            # Node.js dependencies
├── 📄 Makefile                # Development commands
├── 📄 Dockerfile              # Docker setup
│
└── 📄 Documentation:
    ├── README.md              # Main documentation
    ├── QUICKSTART.md          # Getting started guide
    ├── DEVELOPMENT.md         # Developer guide
    ├── ARCHITECTURE.md        # System architecture
    ├── FEATURES.md            # Feature checklist
    ├── SHORTCUTS.md           # Keyboard shortcuts
    ├── CONTRIBUTING.md        # Contribution guidelines
    └── LICENSE                # MIT License
```

## Technology Stack

### Frontend
- **React 18** - UI components
- **TypeScript** - Type-safe JavaScript
- **Vite** - Dev server & bundler
- **CSS** - Chrome-like styling

### Backend
- **C++17** - Core browser logic
- **Rust** - High-performance components
- **WebRender** - Graphics engine
- **WebGPU** - GPU acceleration
- **CMake** - Build system

### Storage
- **IndexedDB** - Bookmarks, history, passwords
- **LocalStorage** - User settings
- **Filesystem** - Downloads, cache

### Security
- **OpenSSL** - HTTPS/TLS
- **Chromium** - Web engine
- **Sandbox** - Process isolation

## Core Features (Chrome-like)

### Tab Management ✅
- Multiple tabs with Chrome-style tab bar
- New tab button
- Close tab with × button
- Tab keyboard shortcuts (Ctrl+T, Ctrl+W, etc.)

### Navigation ✅
- Back/Forward/Reload buttons
- Address bar with focus shortcut
- Go to URL functionality
- Navigation history support

### Keyboard Shortcuts ✅
- Full Chrome-compatible shortcuts
- Windows, macOS variants
- 40+ shortcuts implemented
- Easy to customize

### Security & Privacy 🔄
- Framework for HTTPS support
- Third-party cookie blocking
- Privacy mode (Incognito) framework
- Password manager structure

### Storage & Sync 🔄
- Bookmarks storage with IndexedDB
- History tracking
- Downloads manager
- Settings persistence

### Developer Tools 📋
- Framework for DevTools integration
- Console API support
- Inspector foundation
- Extension system design

## Getting Started

### For Users
```bash
# Build the browser
make build

# Run the browser
make dev
```

### For Developers

**1. Clone & Setup**
```bash
git clone https://github.com/FourBrowser/4Browser.git
cd 4Browser
npm install
```

**2. Build**
```bash
make build          # All components
# OR
make dev           # Build and run
```

**3. Develop**
```bash
npm run ui         # Start UI dev server
npm run lint       # Check code quality
npm test           # Run tests
```

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

## Architecture Overview

### Multi-Process Model
```
Main Process (Browser Core)
    ↓ IPC Bridge ↓
Renderer Processes (Tabs)
    ↓ GPU ↓
Graphics Output
```

### Key Components

1. **Browser Instance** (C++) - App lifecycle, window management
2. **Rendering Engine** (C++ + Rust) - HTML/CSS processing
3. **Network Manager** (JS) - HTTP requests, caching
4. **Storage Manager** (JS) - Data persistence
5. **UI Shell** (React) - User interface
6. **Settings Manager** (JS) - Configuration

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed diagrams.

## Development Workflow

### Adding Features

| Type | Location | Language |
|------|----------|----------|
| UI Component | `ui/*.tsx` | TypeScript |
| Browser Logic | `src/core/*.cpp` | C++ |
| Rendering | `src/engine/rust/src/` | Rust |
| IPC Commands | `src/ui/*.js` | JavaScript |
| Configuration | `config/*.json` | JSON |
| Shortcuts | `src/ui/keybinds.js` | JavaScript |

### Common Tasks

**Add Keyboard Shortcut**
```javascript
// src/ui/keybinds.js
'ctrl+shift+x': { action: 'myAction', description: '...' }
```

**Add UI Setting**
```javascript
// src/ui/settings-manager.js
this.defaults.set('my.setting', defaultValue);
```

**Implement C++ Class**
```cpp
// src/core/my_class.h
class MyClass { ... };
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for complete guide.

## Features Implemented vs Roadmap

### Currently Implemented (33%)
✅ Tab management  
✅ Basic navigation  
✅ Keyboard shortcuts  
✅ Settings framework  
✅ Storage infrastructure  
✅ Security foundations  

### In Progress (21%)
🔄 Full HTML/CSS rendering  
🔄 JavaScript engine integration  
🔄 Network stack  
🔄 DevTools basics  

### Planned (46%)
📋 Extensions system  
📋 Advanced features  
📋 Performance optimization  
📋 Mobile support  

See [FEATURES.md](FEATURES.md) for complete checklist.

## Testing & Quality

### Code Quality
- ✅ ESLint for JavaScript
- ✅ Unit tests (Rust + JS)
- ✅ Integration tests
- ✅ Code formatting (Prettier, rustfmt)

### Continuous Integration
- ✅ GitHub Actions CI/CD
- ✅ Multi-platform builds (Windows, macOS, Linux)
- ✅ Automated linting
- ✅ Test automation

Run tests locally:
```bash
npm test           # JavaScript tests
cargo test         # Rust tests
make lint          # Linting
make format        # Auto-format code
```

## Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Main project documentation |
| [QUICKSTART.md](QUICKSTART.md) | Get up and running quickly |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Developer guide & best practices |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design & diagrams |
| [FEATURES.md](FEATURES.md) | Feature checklist & status |
| [SHORTCUTS.md](SHORTCUTS.md) | Keyboard shortcuts reference |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |

## Community

- 📝 **Discussions**: GitHub Discussions
- 🐛 **Bug Reports**: GitHub Issues
- 🔄 **Pull Requests**: Contributions welcome!
- 📚 **Documentation**: Help us improve docs

## License & Credits

- **License**: MIT (See [LICENSE](LICENSE))
- **Built on**: Chromium, WebRender, WebGPU
- **Modern Stack**: C++17, Rust 2021, React 18, TypeScript

## Performance Targets

| Metric | Target |
|--------|--------|
| Startup | < 2 seconds |
| New tab creation | < 500ms |
| Page load | < 1 second (cached) |
| Base memory | < 300MB |
| Per-tab overhead | < 100MB |
| Scroll FPS | 60+ |

## System Requirements

### Minimum
- 4GB RAM
- 2GB disk space
- Modern CPU (x86-64)
- GPU with OpenGL 4.0+

### Recommended
- 8GB+ RAM
- SSD with 5GB space
- Quad-core CPU+
- Dedicated GPU

### Operating Systems
- **Windows** 10 or newer
- **macOS** 10.15 or newer
- **Linux** Ubuntu 20.04 or newer (Fedora, Debian, etc.)

## Next Steps

1. **Start Here**: Read [QUICKSTART.md](QUICKSTART.md)
2. **Setup Dev**: Follow [DEVELOPMENT.md](DEVELOPMENT.md)
3. **Understand Design**: Study [ARCHITECTURE.md](ARCHITECTURE.md)
4. **Contribute**: See [CONTRIBUTING.md](CONTRIBUTING.md)
5. **Build Features**: Use [FEATURES.md](FEATURES.md) as checklist

## Support

- 📧 Email: support@4browser.dev (planned)
- 💬 Discussions: GitHub Discussions
- 📱 Social: Twitter/X (@4BrowserDev)
- 👥 Community: GitHub Issues & PRs

---

**4Browser** - Building the browser of the future, today.

*Making a modern, extensible, high-performance browser that developers and users love.*

**[Get Started](QUICKSTART.md)** | **[Documentation](README.md)** | **[Contributing](CONTRIBUTING.md)**
