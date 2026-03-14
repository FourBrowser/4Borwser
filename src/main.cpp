#include <iostream>
#include <memory>
#include "core/browser_instance.h"
#include "engine/render_engine.h"
#include "ui/window_manager.h"

int main(int argc, char* argv[]) {
    try {
        std::cout << "Initializing 4Browser..." << std::endl;

        // Initialize browser core
        auto browser = std::make_unique<BrowserInstance>();
        browser->Initialize();

        // Initialize rendering engine
        auto render_engine = std::make_unique<RenderEngine>();
        render_engine->Initialize();

        // Initialize UI/Window manager
        auto window_manager = std::make_unique<WindowManager>();
        window_manager->CreateMainWindow();

        // Main event loop
        window_manager->RunEventLoop();

        std::cout << "4Browser exited successfully." << std::endl;
        return 0;
    } catch (const std::exception& e) {
        std::cerr << "Fatal error: " << e.what() << std::endl;
        return 1;
    }
}
