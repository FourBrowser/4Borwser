#ifndef BROWSER_ENGINE_RENDER_ENGINE_H
#define BROWSER_ENGINE_RENDER_ENGINE_H

#include <memory>

class RenderContext;

class RenderEngine {
public:
    RenderEngine();
    ~RenderEngine();

    void Initialize();
    void Shutdown();
    void Present();

    RenderContext* GetContext();

private:
    std::unique_ptr<RenderContext> context_;
    bool initialized_;
};

#endif // BROWSER_ENGINE_RENDER_ENGINE_H
