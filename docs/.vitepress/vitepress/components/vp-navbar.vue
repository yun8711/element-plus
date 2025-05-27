<script setup lang="ts">
import { computed } from 'vue'
import { inBrowser, useData } from 'vitepress'

import VPNavbarSearch from './navbar/vp-search.vue'
import VPNavbarMenu from './navbar/vp-menu.vue'
import VPNavbarThemeToggler from './navbar/vp-theme-toggler.vue'
import VPNavbarTranslation from './navbar/vp-translation.vue'
import VPNavbarSocialLinks from './navbar/vp-social-links.vue'
import VPNavbarHamburger from './navbar/vp-hamburger.vue'

defineProps<{
  fullScreen: boolean
}>()

defineEmits(['toggle'])

const { theme, page } = useData()

const currentLink = computed(() => {
  if (!inBrowser) {
    return `/${page.value?.frontmatter?.lang || ''}/`
  }
  const existLangIndex = theme.value.langs.findIndex((lang) =>
    window?.location?.pathname.startsWith(`/${lang}`)
  )

  return existLangIndex === -1 ? '/' : `/${theme.value.langs[existLangIndex]}/`
})
</script>

<template>
  <div class="navbar-wrapper">
    <div class="header-container">
      <!-- 顶部导航栏-logo区域 -->
      <div class="logo-container">
        <a :href="currentLink">
          <img
            class="logo"
            src="/images/element-plus-logo.svg"
            alt="Element Plus Logo"
          />
        </a>
      </div>
      <div class="content">
        <!-- 顶部导航栏-站内搜索组件 -->
        <VPNavbarSearch class="search" :options="theme.agolia" multilang />
        <!-- 顶部导航栏-导航菜单组件 -->
        <VPNavbarMenu class="menu" />
        <!-- 顶部导航栏-主题切换组件 -->
        <VPNavbarThemeToggler class="theme-toggler" />
        <!-- 顶部导航栏-语言切换组件 -->
        <VPNavbarTranslation class="translation" />
        <!-- 顶部导航栏-社交链接组件 -->
        <VPNavbarSocialLinks class="social-links" />
        <!-- 顶部导航栏-h5端hamburger组件 -->
        <VPNavbarHamburger
          :active="fullScreen"
          class="hamburger"
          @click="$emit('toggle')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: var(--header-height);
  > a {
    height: 28px;
    width: 128px;
  }
  .logo {
    position: relative;
    height: 100%;
  }
}
.dark {
  .logo {
    filter: drop-shadow(2px 2px 6px #409eff);
  }
}
</style>
