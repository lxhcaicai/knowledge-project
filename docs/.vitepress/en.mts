import {DefaultTheme, defineConfig} from "vitepress";


export const en = defineConfig({
    description: 'My Knowledge Project',
    lang: 'en-US',
    themeConfig: {
        darkModeSwitchLabel: 'Theme',
        darkModeSwitchTitle: 'Switch to Dark Mode',
        docFooter: {
            next: 'Next Page',
            prev: 'Previous Page',
        },
        editLink: {
            pattern:
                'https://github.com/lxhcaicai/knowledge-project/docs/src/:path',
            text: 'Edit this page on GitHub',
        },
        footer: {
            copyright: `Copyright © 2024-${new Date().getFullYear()}`,
            message: 'Released under the MIT License.',
        },
        langMenuLabel: 'Language',
        lastUpdated: {
            text: 'Last updated on',
        },
        lightModeSwitchTitle: 'Switch to Light Mode',
        nav: nav(),
        outline: {
            label: 'Navigate',
        },
        returnToTopLabel: 'Back to top',
        sidebar: {
            '/en/guide/': { base: '/en/guide/', items: sidebarGuide() },
        },
    },
});



function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Examples',
            items: [
                { text: 'Markdown Examples', link: '/markdown-examples' },
                { text: 'Runtime API Examples', link: '/api-examples' }
            ]
        }
    ]
}


function nav(): DefaultTheme.NavItem[] {
    return [
        {
            activeMatch: '^/en/(guide|components)/',
            text: 'Doc',
            items: [
                {
                    activeMatch: '^/en/guide/',
                    link: '/guide/markdown-examples',
                    text: 'Guide',
                }
            ],
        },
    ]
}