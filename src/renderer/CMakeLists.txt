add_library(browser_renderer STATIC)

target_sources(browser_renderer PRIVATE
    renderer.cpp
    renderer.h
)

target_include_directories(browser_renderer PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
