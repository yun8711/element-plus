import consola from 'consola'
import { REPO_BRANCH, REPO_PATH } from '@element-plus/build-constants'
import { docsDirName } from '@element-plus/build-utils'
import { languages } from '../utils/lang'
import { features } from './features'
import { head } from './head'
import { nav } from './nav'
import { mdPlugin } from './plugins'
import { sidebars } from './sidebars'
import { getViteConfig } from './vite'
import { vueCompiler } from './vue-compiler'

import type { UserConfig } from 'vitepress'

const buildTransformers = () => {
  const transformer = () => {
    return {
      props: [],
      needRuntime: true,
    }
  }

  const transformers = {}
  const directives = [
    'infinite-scroll',
    'loading',
    'popover',
    'click-outside',
    'repeat-click',
    'trap-focus',
    'mousewheel',
    'resize',
  ]
  directives.forEach((k) => {
    transformers[k] = transformer
  })

  return transformers
}

consola.debug(`DOC_ENV: ${process.env.DOC_ENV}`)

const locales = {}
languages.forEach((lang) => {
  locales[`/${lang}`] = {
    label: lang,
    lang,
  }
})

const setupConfig = (configEnv) => {
  const config: UserConfig<any> = {
    // 应用级配置
    title: 'Element Plus',
    description: 'A Vue 3 based component library for designers and developers',
    lastUpdated: true,
    // 页面头部head标签设置，增加SEO相关、网站图标、字体等配置
    head,
    // 主题配置
    themeConfig: {
      // 仓库地址
      repo: REPO_PATH,
      // 文档分支
      docsBranch: REPO_BRANCH,
      // 文档目录
      docsDir: docsDirName,
      // 编辑链接
      editLinks: true,
      // 编辑链接文本
      editLinkText: 'Edit this page on GitHub',
      // 导航栏上显示的 Logo
      logo: '/images/element-plus-logo.svg',
      logoSmall: '/images/element-plus-logo-small.svg',
      // 侧边栏配置
      sidebars,
      // 导航栏配置
      nav,
      // 搜索配置
      agolia: {
        apiKey: '99caf32e743ba77d78b095b763b8e380',
        appId: 'ZM3TI8AKL4',
      },
      features,
      langs: languages,
    },
    locales,
    // 配置vite
    vite: getViteConfig(configEnv),
    // 配置markdown解析器
    markdown: {
      // markdown-it插件配置
      config: (md) => mdPlugin(md),
    },
    // 配置@vitejs/plugin-vue，即vue的编译器选项
    // 参考：https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options
    vue: {
      compiler: vueCompiler,
      template: {
        compilerOptions: {
          hoistStatic: false,
          directiveTransforms: buildTransformers(),
        },
      },
    },
    // 构建钩子，在 SSG 渲染完成时调用。它将允许在 SSG 期间处理传递的内容
    postRender(context) {
      // Inject the teleport markup
      if (context.teleports) {
        const body = Object.entries(context.teleports).reduce(
          (all, [key, value]) => {
            if (key.startsWith('#el-popper-container-')) {
              return `${all}<div id="${key.slice(1)}">${value}</div>`
            }
            return all
          },
          context.teleports.body || ''
        )

        context.teleports = { ...context.teleports, body }
      }

      return context
    },
  }

  return config
}

export default setupConfig
