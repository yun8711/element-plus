import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { defaultLang } from '../constant'

// 从页面路径获取当前页面语言，默认是en-US，
export const useLang = () => {
  const route = useRoute()
  return computed(() => {
    // the first part of the first slash
    // 获取当前页面的相对路径
    const path = route.data?.relativePath
    let lang: string

    if (path?.includes('/')) {
      // 路径按/分割，取第一个字符串
      lang = path.split('/').shift()! || defaultLang
    } else {
      lang = defaultLang
    }
    return lang
  })
}
