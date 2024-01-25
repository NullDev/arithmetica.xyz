import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Arithmetica Wiki",
    description: "Setup and Information about Arithmetica",
    base: "/wiki/",
    lang: "en-US",
    outDir: "../dist/wiki",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/markdown-examples" },
        ],

        sidebar: [
            {
                text: "Examples",
                items: [
                    { text: "Markdown Examples", link: "/markdown-examples" },
                    { text: "Runtime API Examples", link: "/api-examples" },
                ],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
    },
});
