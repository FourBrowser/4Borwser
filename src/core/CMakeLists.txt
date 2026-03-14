add_library(browser_core STATIC)

target_sources(browser_core PRIVATE
    browser_instance.cpp
    browser_instance.h
)

target_include_directories(browser_core PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
