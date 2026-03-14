# Contributing to 4Browser

We welcome contributions to 4Browser! Here's how to get started.

## Code Style

### C++
- Use modern C++17 features
- Follow Google C++ Style Guide
- Use smart pointers (unique_ptr, shared_ptr)
- Const correctness

### Rust
- Follow Rust API Guidelines
- Use cargo fmt for formatting
- Use clippy for linting
- Document public APIs

### JavaScript/TypeScript
- Use TypeScript for type safety
- Follow ESLint configuration
- Use React Hooks (not classes)
- Write JSDoc comments

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Write tests
5. Run linters and tests
6. Commit with descriptive messages
7. Push to your fork
8. Create a Pull Request

## Testing

```bash
# Run all tests
npm test
cargo test

# Run specific test
cargo test module_name
npm test -- --testNamePattern="test name"
```

## Git Commit Messages

Format: `<type>(<scope>): <subject>`

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions
- `chore:` Maintenance

Example: `feat(ui): add dark mode support`

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Request review from maintainers
5. Address review feedback

## Areas to Contribute

- **Core Engine**: Performance improvements, Chromium integration
- **UI**: Design improvements, accessibility
- **Rust Engine**: Layout calculations, CSS processing
- **Testing**: Unit tests, integration tests
- **Documentation**: API docs, guides, examples

## Reporting Bugs

Include:
- Browser version
- OS and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable

---

Thank you for contributing to 4Browser!
