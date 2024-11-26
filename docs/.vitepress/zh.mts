import {DefaultTheme, defineConfig} from "vitepress";

export const zh = defineConfig({
    description: "个人知识库",
    lang: 'zh-Hans',
    themeConfig: {
        darkModeSwitchLabel: '主题',
        darkModeSwitchTitle: '切换到深色模式',
        docFooter: {
            next: '下一页',
            prev: '上一页',
        },
        editLink: {
            pattern:
                'https://github.com/lxhcaicai/knowledge-project/docs/src/:path',
            text: '在 GitHub 上编辑此页面',
        },
        footer: {
            copyright: `Copyright © 2024-${new Date().getFullYear()}`,
            message: '基于 MIT 许可发布.',
        },
        langMenuLabel: '多语言',
        lastUpdated: {
            text: '最后更新于',
        },
        lightModeSwitchTitle: '切换到浅色模式',
        nav: nav(),

        outline: {
            label: '页面导航',
        },
        returnToTopLabel: '回到顶部',

        sidebar: {
            '/guide/': { base: '/guide/', items: sidebarGuide() },
        },
        sidebarMenuLabel: '菜单',
    },
});


function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '例子',
            items: [
                { text: 'Markdown 例子', link: 'markdown-examples' },
                { text: '运行时API例子', link: 'api-examples' }
            ]
        }
    ]
}


function nav(): DefaultTheme.NavItem[] {
    return [
        {
            activeMatch: '^/(guide|components)/',
            text: '文档',
            items: [
                {
                    activeMatch: '^/guide/',
                    link: '/guide/markdown-examples',
                    text: '指南',
                },
            ],
        }
    ]
}