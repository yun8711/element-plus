import path from 'path'
import fs from 'fs'
import { docRoot } from '@element-plus/build-utils'
import type { MarkdownRenderer } from 'vitepress'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?: MarkdownRenderer['renderer']['rules']['container']
}
function createDemoContainer(md: MarkdownRenderer): ContainerOpts {
  return {
    // 验证语法
    validate(params) {
      // 匹配 ::: demo 或 ::: demo 描述文本 这样的语法
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      // 1. 获取描述文本
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : ''
        // 2. 获取源码文件
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        console.log('sourceFile', sourceFile)

        // 3. 读取源码内容
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
            'utf-8'
          )
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        // 4。生成组件
        return `<Demo source="${encodeURIComponent(
          md.render(`\`\`\` vue\n${source}\`\`\``)
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(md.render(description))}">
  <template #source><ep-${sourceFile.replaceAll('/', '-')}/></template>`
      } else {
        return '</Demo>\n'
      }
    },
  }
}

export default createDemoContainer
