cmake_minimum_required(VERSION 3.16)
project(4Browser VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(OpenGL REQUIRED)
find_package(GLFW3 REQUIRED)

# Add Chromium/Skia dependencies
find_package(ZLIB REQUIRED)
find_package(OpenSSL REQUIRED)

# Rust components
enable_language(Rust)

# Core engine
add_subdirectory(src/core)
add_subdirectory(src/engine)
add_subdirectory(src/renderer)
add_subdirectory(src/ui)

# Main executable
add_executable(4browser 
    src/main.cpp
)

target_link_libraries(4browser
    browser_core
    browser_engine
    browser_renderer
    browser_ui
    OpenGL::GL
    GLFW::GLFW
    ZLIB::ZLIB
    OpenSSL::SSL
    OpenSSL::Crypto
)

# Build settings
if(MSVC)
    target_compile_options(4browser PRIVATE /W4 /WX)
else()
    target_compile_options(4browser PRIVATE -Wall -Wextra -Werror)
endif()
