add_library(browser_engine STATIC)

target_sources(browser_engine PRIVATE
    render_engine.cpp
    render_engine.h
)

target_include_directories(browser_engine PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
