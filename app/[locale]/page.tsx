import { MetaTagForm } from '@/components/meta-tag-form'
import { translations, ValidLocale } from '@/i18n/config'

export default function Home({
  params: { locale },
}: {
  params: { locale: ValidLocale }
}) {
  const t = translations[locale]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>
      <MetaTagForm t={t} />
    </div>
  )
}

