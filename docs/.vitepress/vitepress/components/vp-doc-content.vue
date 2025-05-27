<script lang="ts" setup>
import { useData } from 'vitepress'
import VPPageFooter from './doc-content/vp-page-footer.vue'
import VPPageNav from './doc-content/vp-page-nav.vue'
import VPTableOfContent from './doc-content/vp-table-of-content.vue'

const { page } = useData()
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <!-- 文档内容 -->
      <Content class="doc-content" />
      <!-- 底部：“在crodwin上编辑本页面“ -->
      <VPPageFooter />
      <!-- 上一篇、下一篇 导航 -->
      <VPPageNav />
    </div>
    <!-- 右侧目录 -->
    <VPTableOfContent v-if="page.headers" />
  </div>
</template>
