# 4Browser Development Guide

## Getting Started

### 1. Environment Setup

Choose your development environment:

**Option A: Using Docker (Recommended)**
```bash
docker build -t 4browser-dev .
docker run -it -v $(pwd):/workspace 4browser-dev
```

**Option B: Local Development**
Follow [QUICKSTART.md](QUICKSTART.md) for your OS.

### 2. IDE Setup

#### VS Code
```json
{
  "extensions": [
    "ms-vscode.cpptools",
    "rust-lang.rust-analyzer",
    "es7-react-js-snippets",
    "eslint.vsl-eslint"
  ],
  "settings": {
    "cmake.configureOnOpen": true,
    "rust-analyzer.server.path": "~/.cargo/bin/rust-analyzer"
  }
}
```

#### CLion
1. Open project
2. Configure CMake toolchain
3. Enable Rust plugin
4. Set up Node.js SDK

### 3. Build Verification

```bash
make help                 # Show all commands
make install             # Install dependencies
make build               # Build everything
make test               # Run tests
make lint               # Check code quality
```

## Development Workflow

### Adding a New Feature

1. **Create Feature Branch**
   ```bash
   git checkout -b feat/my-feature
   ```

2. **UI Changes** (React)
   ```bash
   # Edit ui/BrowserShell.tsx or add new component
   npm run ui              # Start dev server
   ```

3. **C++ Logic Changes**
   ```bash
   # Edit src/core/, src/engine/, or src/renderer/
   make build             # Rebuild
   make dev               # Test
   ```

4. **Rust Performance Code**
   ```bash
   # Edit src/engine/rust/src/
   cargo build            # Compile Rust
   cargo test             # Test Rust
   ```

5. **Configuration**
   ```bash
   # Edit config/ files
   # Changes auto-load on restart
   ```

### Testing Your Changes

```bash
# Unit tests
cargo test                        # Rust
npm test                         # JavaScript
./build/4browser --test-mode     # Integration tests

# Manual testing
npm run dev                      # Start browser
# Test feature manually
```

### Code Style

**Automatic Formatting**
```bash
make format              # Format all code
npm run lint -- --fix   # Fix ESLint issues
```

**Manual Guidelines**:
- **C++**: Google C++ Style Guide
- **Rust**: rustfmt default + clippy warnings
- **JS**: ESLint + Prettier config

## File Structure Cheatsheet

| Path | Purpose | Language |
|------|---------|----------|
| `src/core/*.cpp` | Browser instance logic | C++ |
| `src/engine/render_engine.cpp` | Graphics rendering | C++ |
| `src/engine/rust/src/` | High-perf components | Rust |
| `src/renderer/*.cpp` | Page rendering pipeline | C++ |
| `src/ui/*.js` | Utility modules | JS |
| `ui/*.tsx` | React UI components | TypeScript |
| `ui/index.html` | HTML entry point | HTML |
| `config/*.json` | Configuration | JSON |

## Common Tasks

### Add a New Keyboard Shortcut

1. Edit `src/ui/keybinds.js`:
```javascript
'ctrl+shift+x': { 
  action: 'myAction', 
  description: 'My action description' 
}
```

2. Implement the action in `ui/BrowserShell.tsx`:
```typescript
case 'myAction':
  doMyAction();
  break;
```

### Add a New Setting

1. Add to `src/ui/settings-manager.js` defaults:
```javascript
this.defaults.set('my.setting', defaultValue);
```

2. Use in code:
```javascript
const value = settingsManager.get('my.setting');
settingsManager.set('my.setting', newValue);
```

### Access Native Browser Features

Use the browser bridge in React components:
```typescript
import { browserBridge } from '@ui/browser-bridge';

// Send message to main process
browserBridge.send('request-data', { id: 123 });

// Receive response
const result = await browserBridge.invoke('get-data', { id: 123 });

// Listen for events
browserBridge.on('data-updated', (data) => {
  console.log('Data updated:', data);
});
```

### Implement a C++ Class

1. Create header file `src/core/my_class.h`:
```cpp
#pragma once
class MyClass {
public:
    MyClass();
    void DoSomething();
};
```

2. Create implementation `src/core/my_class.cpp`:
```cpp
#include "my_class.h"
MyClass::MyClass() { }
void MyClass::DoSomething() { }
```

3. Update `src/core/CMakeLists.txt` to include files

4. Include in `src/main.cpp` if needed

### Implement a Rust Module

1. Create file `src/engine/rust/src/mymodule.rs`:
```rust
pub struct MyStruct {
    pub field: String,
}

impl MyStruct {
    pub fn new() -> Self { ... }
}
```

2. Include in `src/engine/rust/src/lib.rs`:
```rust
pub mod mymodule;
pub use mymodule::MyStruct;
```

3. Use in C++ via FFI bindings

## Debugging

### Debug C++ Code
```bash
# With GDB
gdb ./build/4browser
(gdb) run
(gdb) break src/core/browser_instance.cpp:42
(gdb) continue

# With VS Code
# F5 to start debugging (requires .vscode/launch.json)
```

### Debug Rust Code
```bash
# With LLDB
rust-lldb ./target/debug/deps/4browser_engine-...
(lldb) run
(lldb) breakpoint set -f renderer.rs -l 50
```

### Debug JavaScript
```bash
# Browser DevTools
npm run dev
# Open F12 in running browser

# Node debugging
node --inspect-brk ui/main.js
# Visit chrome://inspect in Chrome
```

### Debug Network Issues
```bash
# Use network-manager debug logs
localStorage.setItem('debug', 'network-manager:*');

# Check storage
browserBridge.invoke('get-network-stats');
```

## Performance Profiling

### CPU Profiling
```bash
# Rust
cargo build --release
perf record ./target/release/4browser-engine
perf report

# C++
gprof ./build/4browser gmon.out
```

### Memory Profiling
```bash
# Valgrind
valgrind --leak-check=full ./build/4browser

# massif
valgrind --tool=massif ./build/4browser
ms_print massif.out.* | head -100
```

### JavaScript Profiling
1. Open DevTools (F12)
2. Go to Performance tab
3. Record interactions
4. Analyze flame chart

## Troubleshooting

### Build Fails with CMake Error
```bash
# Clean build
make clean
rm -rf build

# Verbose build
cd build
cmake .. -DCMAKE_VERBOSE_MAKEFILE=ON
make VERBOSE=1
```

### Rust Compilation Error
```bash
# Update toolchain
rustup update

# Clean cargo cache
cargo clean

# Check for unsupported features
cargo check --all-features
```

### DevTools Won't Open
```bash
# Disable F12 override in keybinds temporarily
# Or use Ctrl+Shift+I instead
# Or invoke via browser-bridge:
browserBridge.send('open-devtools');
```

### IPC Communication Issues
```bash
# Enable IPC logging
localStorage.setItem('debug', 'ipc:*');

# Check browser-bridge connection
console.log(window.nativeAPI);
```

## Performance Targets

Always keep an eye on:

| Metric | Target |
|--------|--------|
| Startup | < 2s |
| Tab creation | < 500ms |
| Page load | < 1s |
| Memory (base) | < 300MB |
| Memory (per tab) | < 100MB |
| Scroll FPS | 60+ |

## Resources

- [Chromium Design Docs](https://chromium.googlesource.com/chromium/src/+/main/docs/design/)
- [WebRender Guide](https://github.com/servo/webrender/wiki)
- [Rust Async Book](https://rust-lang.github.io/async-book/)
- [React Internals](https://react-internals-explorer.vercel.app/)

## Getting Help

1. Check existing issues: `https://github.com/FourBrowser/4Browser/issues`
2. Read ARCHITECTURE.md for design decisions
3. Ask in discussions: `https://github.com/FourBrowser/4Browser/discussions`
4. Submit PR with `[WIP]` prefix for early feedback

---

Happy coding! 🚀
