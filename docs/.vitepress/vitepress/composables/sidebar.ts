import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { ensureStartingSlash } from '../utils'
import { useLang } from './lang'

export const useSidebar = () => {
  // 获取当前页面路由
  const route = useRoute()
  // 获取当前页面数据
  // site:站点元数据，page:页面元数据
  const { site, page } = useData()
  // 获取当前页面语言
  const lang = useLang()
  // 如果当前页面没有数据，则返回空
  if (!page.value) {
    return {
      sidebars: computed(() => []),
      hasSidebar: computed(() => false),
    }
  }
  // 获取侧边栏配置
  const sidebars = computed(() => {
    // 如果页面元信息中没有sidebar配置，则返回空
    if (page.value.frontmatter.sidebar === false) return []
    // 获取侧边栏配置
    const sidebars = getSidebarConfig(
      site.value.themeConfig.sidebars, // 站点配置中的侧边栏配置
      route.data.relativePath, // 当前页面相对路径
      lang.value // 当前页面语言
    )
    return sidebars
  })

  return {
    sidebars,
    hasSidebar: computed(() => sidebars.value.length > 0),
  }
}

// 判断侧边栏配置是否有效
export function isSideBarConfig(sidebar) {
  return sidebar === false || sidebar === 'auto' || Array.isArray(sidebar)
}
// 判断侧边栏配置是否为组，即有children属性
export function isSideBarGroup(item) {
  return item.children !== undefined
}
// 判断侧边栏配置是否为空，即没有内容
export function isSideBarEmpty(sidebar) {
  return Array.isArray(sidebar) ? sidebar.length === 0 : !sidebar
}

type SidebarItem = {
  text: string
  link: string
}

type SidebarConfig = SidebarItem[]

type Sidebar =
  | {
      [key: string]: SidebarConfig
    }
  | false
  | 'auto'

// 获取侧边栏配置
export function getSidebarConfig(sidebar: Sidebar, path: string, lang: string) {
  // 如果侧边栏配置为false，或为数组，或为auto，则返回空
  if (sidebar === false || Array.isArray(sidebar) || sidebar === 'auto') {
    return []
  }

  // 确保路径以/开头
  path = ensureStartingSlash(path)
  // 遍历侧边栏配置
  for (const dir in sidebar) {
    // make sure the multi sidebar key starts with slash too
    // 如果路径以侧边栏配置的key开头，则返回侧边栏配置
    if (path.startsWith(ensureStartingSlash(`${lang}${dir}`))) {
      return sidebar[dir][lang]
    }
  }
  return []
}

// 获取侧边栏配置的扁平化链接
export function getFlatSideBarLinks(sidebar) {
  return sidebar.reduce((links, item) => {
    if (item.link) {
      links.push({ text: item.text, link: item.link })
    }
    if (isSideBarGroup(item)) {
      links = [...links, ...getFlatSideBarLinks(item.children)]
    }
    return links
  }, [])
}
