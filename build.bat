@echo off
REM 4Browser Windows Build Script

if "%1"=="" goto help
if "%1"=="help" goto help
if "%1"=="install" goto install
if "%1"=="build" goto build
if "%1"=="dev" goto dev
if "%1"=="ui" goto ui
if "%1"=="test" goto test
if "%1"=="lint" goto lint
if "%1"=="format" goto format
if "%1"=="clean" goto clean
if "%1"=="rebuild" goto rebuild

goto help

:help
echo.
echo 4Browser Windows Build Commands:
echo.
echo   build.bat install   - Install all dependencies
echo   build.bat build     - Build C++ and Rust components
echo   build.bat dev       - Build and run browser
echo   build.bat ui        - Start UI dev server (Vite)
echo   build.bat test      - Run all tests
echo   build.bat lint      - Run linters
echo   build.bat format    - Format code
echo   build.bat clean     - Remove build artifacts
echo   build.bat rebuild   - Clean and rebuild
echo   build.bat help      - Show this message
echo.
goto end

:install
echo Installing dependencies...
call npm install
echo Dependencies installed!
goto end

:build
echo Building C++ components...
if not exist build mkdir build
cd build
cmake .. -G "Visual Studio 17 2022"
cmake --build . --config Release
cd ..
echo Building Rust components...
call cargo build --release
echo Build complete!
goto end

:dev
call :build
if exist "build\Release\4browser.exe" (
    echo Running 4Browser...
    build\Release\4browser.exe
) else (
    echo Build failed - executable not found
)
goto end

:ui
echo Starting UI dev server...
call npm run ui
goto end

:test
echo Running Rust tests...
call cargo test
echo Running JavaScript tests...
call npm test
goto end

:lint
echo Running ESLint...
call npm run lint
echo Running Clippy...
call cargo clippy -- -D warnings
goto end

:format
echo Formatting JavaScript/TypeScript...
call npx prettier --write "ui/**/*.{js,jsx,ts,tsx}" "src/**/*.{js,ts}"
echo Formatting Rust...
call cargo fmt
goto end

:clean
echo Cleaning build artifacts...
if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
call cargo clean
echo Cleanup complete!
goto end

:rebuild
call :clean
call :build
echo Rebuild complete!
goto end

:end
