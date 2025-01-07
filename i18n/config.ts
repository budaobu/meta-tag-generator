export const defaultLocale = 'en'
export const locales = ['en', 'zh'] as const
export type ValidLocale = typeof locales[number]

export const localeNames: Record<ValidLocale, string> = {
  en: 'English',
  zh: '中文',
}

export interface Translation {
  title: string
  description: string
  type: string
  imageUrl: string
  width: string
  height: string
  generate: string
  copy: string
  preview: string
  instructions: {
    title: string
    steps: string[]
  }
  siteName: string
  twitterUsername: string
}

export const translations: Record<ValidLocale, Translation> = {
  en: {
    title: 'Open Graph Meta Tag Generator',
    description: 'An up-to-date, well-tested tool to generate Open Graph meta tags for your website.',
    type: 'Type',
    imageUrl: 'Image URL',
    width: 'Width (px)',
    height: 'Height (px)',
    generate: 'Generate OG Image',
    copy: 'Copy',
    preview: 'Preview',
    instructions: {
      title: 'Using the Meta Tags',
      steps: [
        'Copy the meta tags you generated above',
        'Place them in the <head> tag of your page',
        'Test how various social media platforms will render your Open Graph images',
      ],
    },
    siteName: 'Site Name',
    twitterUsername: 'Twitter Username',
  },
  zh: {
    title: 'Open Graph Meta 标签生成器',
    description: '一个最新的、经过测试的工具，用于为您的网站生成 Open Graph meta 标签。',
    type: '类型',
    imageUrl: '图片 URL',
    width: '宽度 (px)',
    height: '高度 (px)',
    generate: '生成 OG 图片',
    copy: '复制',
    preview: '预览',
    instructions: {
      title: '如何使用 Meta 标签',
      steps: [
        '复制上面生成的 meta 标签',
        '将它们放在页面的 <head> 标签中',
        '测试各种社交媒体平台如何呈现您的 Open Graph 图片',
      ],
    },
    siteName: '网站名称',
    twitterUsername: 'Twitter 用户名',
  },
}

