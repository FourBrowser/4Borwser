cmake_minimum_required(VERSION 3.16)
project(4Browser VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(OpenGL REQUIRED)

# GLFW3 - try to find, but make it optional on Windows
find_package(GLFW3 CONFIG QUIET)
if(NOT GLFW3_FOUND)
    message(WARNING "GLFW3 not found. On Windows, install with: vcpkg install glfw3:x64-windows")
endif()

# Optional dependencies for Windows
find_package(ZLIB QUIET)
find_package(OpenSSL QUIET)
if(NOT OPENSSL_FOUND)
    message(WARNING "OpenSSL not found. On Windows, install with: vcpkg install openssl:x64-windows")
endif()

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
)

# Conditionally link libraries if they were found
if(GLFW3_FOUND)
    target_link_libraries(4browser GLFW::GLFW)
endif()

if(ZLIB_FOUND)
    target_link_libraries(4browser ZLIB::ZLIB)
endif()

if(OPENSSL_FOUND)
    target_link_libraries(4browser OpenSSL::SSL OpenSSL::Crypto)
endif()

# Build settings
if(MSVC)
    target_compile_options(4browser PRIVATE /W4 /WX)
else()
    target_compile_options(4browser PRIVATE -Wall -Wextra -Werror)
endif()
