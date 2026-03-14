#ifndef BROWSER_UI_WINDOW_MANAGER_H
#define BROWSER_UI_WINDOW_MANAGER_H

#include <memory>
#include <vector>

class BrowserWindow;

class WindowManager {
public:
    WindowManager();
    ~WindowManager();

    void CreateMainWindow();
    void RunEventLoop();
    void Quit();

private:
    std::vector<std::unique_ptr<BrowserWindow>> windows_;
    bool running_;
};

#endif // BROWSER_UI_WINDOW_MANAGER_H
