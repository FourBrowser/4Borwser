#ifndef BROWSER_RENDERER_RENDERER_H
#define BROWSER_RENDERER_RENDERER_H

#include <vector>
#include <memory>

class PageContent;

class Renderer {
public:
    Renderer();
    ~Renderer();

    void Render(const PageContent* content);
    void Clear();
    void UpdateLayout(int width, int height);

private:
    bool initialized_;
};

#endif // BROWSER_RENDERER_RENDERER_H
