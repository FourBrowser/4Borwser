add_library(browser_ui STATIC)

target_sources(browser_ui PRIVATE
    window_manager.cpp
    window_manager.h
)

target_include_directories(browser_ui PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
