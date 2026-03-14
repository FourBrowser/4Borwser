# 4Browser Architecture Documentation

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    4Browser Application                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐    ┌──────────────────────────────┐ │
│  │  Main Process    │    │  Renderer Processes (Tabs)   │ │
│  │                  │    │                              │ │
│  │ • Browser Core   │◄──►│ • HTML/CSS/JS Engine        │ │
│  │ • UI Management  │    │ • DOM Tree                   │ │
│  │ • Event Loop     │    │ • Page Rendering             │ │
│  │ • IPC Router     │    │                              │ │
│  └────────┬─────────┘    └──────────────────────────────┘ │
│           │                                                │
│           ├── Network I/O                                  │
│           ├── Disk I/O                                     │
│           └── GPU Rendering                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Core Browser Engine (C++)

**Location**: `src/core/`

Responsible for:
- Browser instance lifecycle
- Tab management
- Window management
- Settings/Preferences
- Plugin/Extension loading

**Key Classes**:
```cpp
class BrowserInstance {
    - CreateWindow()
    - CreateTab()
    - NavigateTo()
    - CloseTab()
};
```

### 2. Rendering Engine (C++ + Rust)

**Location**: `src/engine/`

**C++ Components** (`src/engine/render_engine.cpp`):
- Graphics context management
- WebRender integration
- GPU command queuing

**Rust Components** (`src/engine/rust/src/`):
- **renderer.rs**: WebGPU rendering pipeline
- **layout.rs**: CSS box model and flexbox/grid
- **dom.rs**: DOM tree representation
- **css.rs**: CSS parsing and style application

### 3. Renderer (C++)

**Location**: `src/renderer/`

Handles:
- Page rendering pipeline
- Layout calculations
- Paint operations
- Viewport management

### 4. UI Layer (React/TypeScript)

**Location**: `ui/`

**Main Components**:
- `BrowserShell.tsx` - Main browser window UI
- Tab bar, address bar, navigation controls
- Status bar, menu

**Supporting Modules**:
- `network-manager.js` - HTTP requests, caching
- `storage-manager.js` - IndexedDB for bookmarks, history
- `settings-manager.js` - User preferences
- `browser-bridge.js` - IPC communication

## Data Flow

### Page Navigation

```
User Input (Address Bar)
    ↓
JavaScript (BrowserShell.tsx)
    ↓
IPC - browser-bridge.js
    ↓
C++ BrowserInstance::NavigateTo()
    ↓
Network Manager Fetch
    ↓
HTML Parsing (Rust DOM)
    ↓
CSS Processing (Rust CSS Engine)
    ↓
Layout Calculation (Rust Layout Engine)
    ↓
WebRender Pipeline (C++)
    ↓
GPU Rendering (OpenGL/WebGPU)
    ↓
Display in UI
```

### Storage Operations

```
User Action (Bookmark)
    ↓
JavaScript (React Component)
    ↓
StorageManager.saveBookmark()
    ↓
IndexedDB API
    ↓
Browser Storage Backend (C++)
    ↓
Disk I/O
```

## Process Model

### Main Process

```
Main Process
├── Browser Instance
├── UI Thread (React)
├── IPC Router
├── Event Loop
└── Settings Manager
```

**Responsibilities**:
- Application lifecycle
- Window management
- Bridge between UI and renderer processes
- Event dispatching

### Renderer Process (Per Tab)

```
Renderer Process (Tab 1)
├── HTML Parser
├── CSS Engine
├── JavaScript Engine
├── DOM Tree
├── Layout Engine
└── Rendering Pipeline
```

**Responsibilities**:
- Parse and render web content
- Execute JavaScript
- Handle user input
- Communicate with main process

## Module Dependencies

```
main.cpp
    ↓
browser_core (C++)
    ↓
    ├─→ RenderEngine (C++)
    │       ↓
    │       └─→ Rust Engine Module
    │           ├─→ renderer.rs
    │           ├─→ layout.rs
    │           ├─→ dom.rs
    │           └─→ css.rs
    │
    ├─→ BrowserUI (React)
    │       ├─→ BrowserShell.tsx
    │       ├─→ network-manager.js
    │       ├─→ storage-manager.js
    │       ├─→ settings-manager.js
    │       └─→ browser-bridge.js
    │
    └─→ WindowManager (C++)
```

## Key Design Patterns

### 1. Multi-Process Architecture
- Isolates tabs for stability
- Prevents one tab crash from affecting others
- Enables parallel rendering

### 2. IPC (Inter-Process Communication)
- JSON-based message passing
- Async/await for request-response
- Event-based for notifications

### 3. Layered Architecture
- **Presentation Layer**: React UI
- **Business Logic**: Core browser logic
- **Rendering Layer**: Rust + WebRender
- **Storage Layer**: IndexedDB + File I/O

### 4. Observer Pattern
- Settings changes notify components
- Events propagate through IPC bridge
- React hooks listen to state changes

## Performance Considerations

### Memory Management
- Lazy loading of tabs
- Content script sandboxing
- Shared memory for compiled code

### Rendering Optimization
- Dirty rect tracking
- Layer caching
- GPU acceleration for transforms

### Network Optimization
- HTTP/2 multiplexing
- DNS caching
- Connection pooling

## Security Architecture

### Sandbox Isolation
```
┌─────────────────────────┐
│   Renderer Process      │
│  (Sandboxed Context)    │
│                         │
│  • Limited Syscalls     │
│  • No Direct Disk Access│
│  • IPC-mediated I/O     │
└────────────┬────────────┘
             │ (IPC)
┌────────────▼────────────┐
│   Main Process          │
│  (Full Privileges)      │
│                         │
│  • Filesystem Access    │
│  • Network Requests     │
│  • Plugin Loading       │
└─────────────────────────┘
```

### Site Isolation
Each site runs in a separate renderer process to prevent one site from accessing another's data.

## Extension System

```
Extension Package (.4ext)
    ↓
Manifest Parsing
    ↓
Permission Validation
    ↓
Content Script Injection
    ↓
Background Service Worker
```

## Configuration System

```
Config Files:
├── chrome-config.json (Feature flags)
├── preferences.json (User settings)
└── keybinds.js (Keyboard shortcuts)

Storage:
├── localStorage (Settings)
├── IndexedDB (Bookmarks, History)
└── FileSystem (Downloads, Cache)
```

## Testing Architecture

```
Unit Tests
├── C++ Tests (catch2)
├── Rust Tests (cargo test)
└── JS Tests (Jest)

Integration Tests
├── Tab Management
├── Navigation Flow
└── IPC Communication

E2E Tests
├── User Workflows
├── Performance
└── Security Boundaries
```

---

**Last Updated**: March 14, 2026
