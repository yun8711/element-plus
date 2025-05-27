import ElementPlus, {
  ID_INJECTION_KEY,
  ZINDEX_INJECTION_KEY,
} from 'element-plus'
// 判断当前代码是否在浏览器客户端环境中运行
import { isClient } from '@vueuse/core'

import VPApp, { NotFound, globals } from '../vitepress'
import { define } from '../utils/types'
import 'uno.css'
import './style.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'virtual:group-icons.css'
import type { Theme } from 'vitepress'

export default define<Theme>({
  NotFound,
  Layout: VPApp,
  enhanceApp: async ({ app, router }) => {
    // 注册element-plus组件库
    app.use(ElementPlus)
    // 提供ID_INJECTION_KEY，用于生成唯一的ID
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    // 提供ZINDEX_INJECTION_KEY，用于生成唯一的Z-index
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
    // 如果当前代码不在浏览器客户端环境中运行，则返回
    if (!isClient) return
    // 导入nprogress库
    const nprogress = await import('nprogress')
    // 监听页面路由变化，显示进度条
    router.onBeforeRouteChange = nprogress.start
    // 监听页面路由变化，隐藏进度条
    router.onAfterRouteChanged = nprogress.done
  },
})
