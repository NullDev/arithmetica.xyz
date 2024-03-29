import { defineConfig } from "vitepress";
import { execSync } from "node:child_process";

export default defineConfig({
    title: "Arithmetica Wiki",
    description: "Setup and Information about Arithmetica",
    base: "/wiki/",
    lang: "en-US",
    outDir: "../dist/wiki",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Installation", link: "/installation/invite" },
            { text: "Commands", link: "/commands/overview" },
            { text: "Maths", link: "/usage/usage" },
            { text: "Invite", link: "https://discordapp.com/oauth2/authorize?client_id=1108279646165942363&scope=bot&permissions=1100048526544" },
        ],

        sidebar: [
            {
                text: "Home",
                items: [
                    { text: "Home", link: "/" },
                ],
            },
            {
                text: "Installation",
                items: [
                    { text: "Invite", link: "/installation/invite" },
                    { text: "Selfhosted", link: "/installation/self" },
                    { text: "Starter Guide", link: "/installation/guide" },
                ],
            },
            {
                text: "Commands",
                items: [
                    { text: "Overview", link: "/commands/overview" },
                    { text: "Admin", link: "/commands/admin" },
                    { text: "User", link: "/commands/user" },
                ],
            },
            {
                text: "Usage",
                items: [
                    { text: "Usage", link: "/usage/usage" },
                ],
            },
            {
                text: "Latest commit",
                items: [
                    { text: `${execSync("git rev-parse --short HEAD").toString().trimEnd()}`, link: `https://github.com/NullDev/arithmetica.xyz/commit/${execSync("git rev-parse HEAD").toString().trimEnd()}` },
                ],
            },
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/NullDev/Arithmetica-Bot" },
        ],
    },
});
