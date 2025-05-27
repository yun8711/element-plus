<script setup lang="ts">
import { computed } from 'vue'
// https://vitepress.dev/zh/reference/runtime-api#usedata
import { useData, useRoute } from 'vitepress'
import { useSidebar } from '../composables/sidebar'
import VPHeroContent from './vp-hero-content.vue'
import VPDocContent from './vp-doc-content.vue'
import VPNotFound from './vp-not-found.vue'
import VPFooter from './globals/vp-footer.vue'

// 获取当前页面数据，即vitepress中md文档最前面的 frontmatter 数据
const { frontmatter } = useData()
const route = useRoute()
const isNotFound = computed(() => route.component === VPNotFound)
const isHeroPost = computed(() => frontmatter.value.page === true)
const { hasSidebar } = useSidebar()
</script>

<template>
  <main
    id="page-content"
    :class="{ 'page-content': true, 'has-sidebar': hasSidebar }"
  >
    <!-- 404页面 -->
    <VPNotFound v-if="isNotFound" />
    <!-- 首页内容 -->
    <VPHeroContent v-else-if="isHeroPost" />
    <!-- 文档内容 -->
    <VPDocContent v-else>
      <template #content-top><slot name="content-top" /></template>
      <template #content-bottom><slot name="content-bottom" /></template>
    </VPDocContent>
    <!-- 底部 -->
    <VPFooter v-if="!isHeroPost" />
  </main>
</template>
