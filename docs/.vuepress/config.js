module.exports = {
  title: "黄宝权",
  theme: "x",
  themeConfig: {
    editLinkText: "编辑",
    editLinks: true,
    repo: "h69/blog",
    search: true,
    nav: [
      {
        text: "github",
        link: "https://github.com/h69",
      },
    ],
    sidebar: {},
  },
  plugins: ["@vuepress/back-to-top"],
  head: [
    ["meta", { name: "baidu-site-verification", content: "code-FacPXl4enQ" }],
    ["script", { type: "text/javascript", src: "/assets/js/push.js" }],
    ["script", { type: "text/javascript", src: "/assets/js/hm.js" }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap" }], 
  ],
};
