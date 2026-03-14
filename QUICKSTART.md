# 4Browser Quick Start Guide

## For Developers

### System Requirements

**macOS:**
```bash
xcode-select --install
brew install cmake rust node
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y build-essential cmake rustc cargo nodejs npm libglfw3-dev libgl1-mesa-dev libssl-dev zlib1g-dev
```

**Windows:**
1. Install Visual C++ Build Tools
2. Install CMake from cmake.org
3. Install Rust from rustup.rs
4. Install Node.js from nodejs.org

### Initial Setup

#### macOS/Linux
```bash
# Clone repository
git clone https://github.com/FourBrowser/4Browser.git
cd 4Browser

# Install Node.js dependencies
npm install

# Build C++ components
mkdir -p build
cd build
cmake ..
cmake --build . --config Debug
cd ..

# Build Rust components
cargo build

# You're ready to run!
npm run dev
```

#### Windows (using build.bat)
```bash
# Clone repository
git clone https://github.com/FourBrowser/4Browser.git
cd 4Browser

# Install dependencies
build.bat install

# Build everything
build.bat build

# Run the browser
build.bat dev
```

Or use individual commands:
```bash
build.bat help       # Show all available commands
build.bat build      # Build C++ and Rust
build.bat ui         # Start UI dev server
build.bat test       # Run tests
build.bat lint       # Lint code
build.bat format     # Format code
build.bat clean      # Clean build artifacts
```

### Project Commands

**macOS/Linux (using make):**
```bash
# Start development
npm run dev          # Builds and runs browser

# Build only
npm run build        # Builds C++ with CMake

# Run UI dev server
npm run ui          # Starts Vite dev server on :3000

# Linting
npm run lint        # Runs ESLint

# Testing
npm test            # Runs all tests
cargo test          # Runs Rust tests
```

**Windows (using build.bat):**
```bash
# Start development
build.bat dev        # Builds and runs browser

# Build only
build.bat build      # Builds C++ and Rust

# Run UI dev server
build.bat ui         # Starts Vite dev server on :3000

# Linting
build.bat lint       # Runs ESLint and Clippy

# Testing
build.bat test       # Runs all tests

# Other commands
build.bat clean      # Remove build artifacts
build.bat format     # Format code
build.bat help       # Show all commands
```

### File Organization

- **src/core/** - Browser core/main process
- **src/engine/** - Rendering engine (C++ + Rust hybrid)
- **src/renderer/** - Page rendering pipeline
- **src/ui/** - Utility modules (network, storage, etc.)
- **ui/** - React UI components
- **config/** - Configuration files

### Adding Features

1. **UI Changes**: Modify React components in `ui/`
2. **C++ Logic**: Add to `src/core/`, `src/engine/`, or `src/renderer/`
3. **Rust Performance**: Implement in `src/engine/rust/src/`
4. **Configuration**: Update `config/chrome-config.json`
5. **Shortcuts**: Modify `src/ui/keybinds.js`

### Debugging

**Visual Studio Code:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug 4Browser",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/build/4browser",
      "cwd": "${workspaceFolder}",
      "stopAtEntry": false,
      "MIMode": "gdb"
    }
  ]
}
```

**Chrome DevTools:** Open with `F12` in the running browser

### Common Issues

**CMake errors:**
```bash
rm -rf build
mkdir build
cd build
cmake .. -DCMAKE_BUILD_TYPE=Debug
```

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Rust compilation errors:**
```bash
rustup update
cargo clean
cargo build
```

## Next Steps

1. Read [README.md](README.md) for full documentation
2. Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
3. Explore the codebase structure
4. Implement your first feature!

## Resources

- C++ Docs: [cppreference.com](https://en.cppreference.com/)
- Rust Docs: [doc.rust-lang.org](https://doc.rust-lang.org/)
- React Docs: [react.dev](https://react.dev/)
- Chromium: [chromium.org/developers](https://www.chromium.org/developers)

Happy coding! 🚀
