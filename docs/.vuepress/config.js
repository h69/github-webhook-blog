module.exports = {
  base: "/",
  title: " ",
  theme: "x",
  themeConfig: {
    editLinkText: "编辑",
    editLinks: false,
    repo: "h69/blog",
    search: true,
    nav: [],
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
