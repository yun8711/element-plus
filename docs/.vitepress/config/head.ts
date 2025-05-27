import fs from 'fs'
import path from 'path'
import { vpRoot } from '@element-plus/build-utils'
import { languages } from '../utils/lang'

import type { HeadConfig } from 'vitepress'

// 页面 HTML 的 <head> 标签中呈现的其他元素
export const head: HeadConfig[] = [
  // 添加网站图标
  [
    'link',
    {
      rel: 'icon',
      href: '/images/element-plus-logo-small.svg',
      type: 'image/svg+xm',
    },
  ],
  // 适配苹果设备图标
  [
    'link',
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
  // 适配苹果设备图标
  [
    'link',
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#5bbad5',
    },
  ],
  // 设置主题色
  [
    'meta',
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  // 设置微软应用图标颜色 用于SEO
  [
    'meta',
    {
      name: 'msapplication-TileColor',
      content: '#409eff',
    },
  ],
  // 设置微软应用图标 用于SEO
  [
    'meta',
    {
      name: 'msapplication-config',
      content: '/browserconfig.xml',
    },
  ],
  // 设置 og:image 用于SEO
  [
    'meta',
    {
      property: 'og:image',
      content: '/images/element-plus-og-image.png',
    },
  ],
  // 设置 og:image:width，用于SEO
  [
    'meta',
    {
      property: 'og:image:width',
      content: '1200',
    },
  ],
  // 设置 og:image:height，用于SEO
  [
    'meta',
    {
      property: 'og:image:height',
      content: '630',
    },
  ],
  // 设置 og:description，用于SEO
  [
    'meta',
    {
      property: 'og:description',
      content: 'A Vue 3 based component library for designers and developers',
    },
  ],
  // 添加百度站长验证
  [
    'meta',
    {
      name: 'baidu-site-verification',
      content: 'codeva-q5gBxYcfOs',
    },
  ],
  // 添加语言文件
  [
    'script',
    {},
    `;(() => {
      window.supportedLangs = ${JSON.stringify(languages)}
    })()`,
  ],
  // 添加语言文件
  ['script', {}, fs.readFileSync(path.resolve(vpRoot, 'lang.js'), 'utf-8')],
  // 添加谷歌分析
  [
    'script',
    {
      async: 'true',
      src: 'https://www.googletagmanager.com/gtag/js?id=UA-175337989-1',
    },
  ],
  // 添加谷歌分析
  [
    'script',
    {},
    `if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(function(registration) {
          console.log(registration);
        })
        .catch(function(err) {
          console.log(err);
        });
    }`,
  ],
  // 添加谷歌分析
  [
    'script',
    {
      async: 'true',
    },
    `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-175337989-1');`,
  ],
  // 添加谷歌分析
  [
    'script',
    {
      async: 'true',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-M74ZHEQ1M1',
    },
  ],
  // 添加谷歌分析
  [
    'script',
    {},
    `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-M74ZHEQ1M1');
    `,
  ],
  // 添加谷歌字体
  [
    'script',
    {
      async: 'true',
    },
    `
  var resource = document.createElement('link');
  resource.setAttribute("rel", "stylesheet");
  resource.setAttribute("href","https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700,800|Open+Sans:400,600;display=swap");
  resource.setAttribute("type","text/css");
  var head = document.querySelector('head');
  head.appendChild(resource);
    `,
  ],
]
