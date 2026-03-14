#ifndef BROWSER_CORE_BROWSER_INSTANCE_H
#define BROWSER_CORE_BROWSER_INSTANCE_H

#include <string>
#include <vector>
#include <memory>

class BrowserTab;
class BrowserWindow;

class BrowserInstance {
public:
    BrowserInstance();
    ~BrowserInstance();

    void Initialize();
    void Shutdown();

    BrowserWindow* CreateWindow();
    void CloseWindow(BrowserWindow* window);
    
    BrowserTab* CreateTab(BrowserWindow* window);
    void NavigateTo(BrowserTab* tab, const std::string& url);

    void ApplySettings();
    void SavePreferences();

private:
    std::vector<std::unique_ptr<BrowserWindow>> windows_;
    std::string user_agent_;
    bool initialized_;
};

#endif // BROWSER_CORE_BROWSER_INSTANCE_H
