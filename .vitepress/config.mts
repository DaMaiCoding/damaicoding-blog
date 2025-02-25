import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";
import { createDetypePlugin } from "vitepress-plugin-detype";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteDemoPreviewPlugin } from "@vitepress-code-preview/plugin";
import { fileURLToPath, URL } from "node:url";
import { demoPreviewPlugin } from "@vitepress-code-preview/plugin";
import container from "markdown-it-container";
import { renderSandbox } from "vitepress-plugin-sandpack";
import { generateSidebar } from "vitepress-sidebar";
import { sideBarData } from "./theme/sidebarOptions";

const { detypeMarkdownPlugin, detypeVitePlugin } = createDetypePlugin();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  srcDir: "docs",
  title: "DaMainCoding's Blog",
  description: "DaMainCoding's Blog Web Site",
  ignoreDeadLinks: true,
  head: [
    ["link", { rel: "icon", href: "/blog.svg" }],
    [
      "script",
      {
        src: "https://cloud.umami.is/script.js",
        "data-website-id": "e2f8a363-b49a-49e7-8bcf-e3f11e1b2995",
      },
    ],
  ],
  //启用深色模式
  appearance: "dark",
  themeConfig: {
    logo: "/logo.svg",
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "home", link: "/" },
      { text: "我的博客", link: "/blog/vitepress" },
      {
        text: "前端面试",
        items: [
          { text: "我的掘金", link: "https://juejin.cn/user/2368772393149325" },
          { text: "HTML", link: "/interview/HTML/index" },
          { text: "CSS", link: "/interview/CSS/prev" },
          { text: "JavaScript", link: "/interview/JavaScript/prev" },
          { text: "Typescript", link: "/interview/Typescript/index" },
          { text: "浏览器网络篇", link: "/interview/Network/index" },
          { text: "前端工程化", link: "/interview/FrontendEngineering/index" },
          { text: "Vue2/3框架", link: "/interview/Vue/index" },
          { text: "React框架", link: "/interview/React/index" },
          { text: "算法&数据结构", link: "/interview/Algorithm/dataStructure" },
          { text: "PWA应用", link: "/interview/PWA/index" },
          { text: "微前端", link: "/interview/MicroFrontEnd/index" },
        ],
      },
      { text: "关于我", link: "https://github.com/DaMaiCoding" },
      {
        text: "博客统计",
        link: "https://cloud.umami.is/share/VR6KiYPELpPLZGGM/damaicoding.fun",
      },
    ],

    sidebar: generateSidebar(sideBarData),
    // 文章右侧大纲目录
    outline: {
      level: [2, 6],
      label: "目录",
    },
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/DaMaiCoding" }],
    // 主题
    darkModeSwitchLabel: "深浅模式",

    returnToTopLabel: "返回顶部",
    // 搜索
    search: {
      provider: "local",
    },
    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present DaMaiCoding",
    },
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
    config(md) {
      const docRoot = fileURLToPath(new URL("../", import.meta.url));

      md.use(groupIconMdPlugin);
      md.use(tabsMarkdownPlugin);
      md.use(detypeMarkdownPlugin);
      md.use(demoPreviewPlugin, { docRoot });

      md.use(container, "sandbox", {
        render(tokens, idx) {
          return renderSandbox(tokens, idx, "sandbox");
        },
      });
    },
  },
  vite: {
    plugins: [
      detypeVitePlugin(),
      groupIconVitePlugin(),
      viteDemoPreviewPlugin(),
      vueJsx(),
    ],
  },
});
