'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Translation } from '@/i18n/config'
import { Wand2 } from 'lucide-react'

interface MetaTagFormProps {
  t: Translation
}

export function MetaTagForm({ t }: MetaTagFormProps) {
  const [formData, setFormData] = useState({
    type: 'website',
    title: '',
    description: '',
    url: process.env.NEXT_PUBLIC_BASE_URL || '',
    imageUrl: '',
    width: '1200',
    height: '630',
    siteName: '',
    twitterUsername: '',
  })

  const [generatedTags, setGeneratedTags] = useState('')

  useEffect(() => {
    generateTags()
  }, [formData])

  const generateTags = () => {
    const tags = `
<!-- Standard Meta Tags -->
<meta name="title" content="${formData.title}" />
<meta name="description" content="${formData.description}" />

<!-- Open Graph Meta Tags -->
<meta property="og:type" content="${formData.type}" />
<meta property="og:title" content="${formData.title}" />
<meta property="og:description" content="${formData.description}" />
<meta property="og:url" content="${formData.url}" />
<meta property="og:image" content="${formData.imageUrl}" />
<meta property="og:image:width" content="${formData.width}" />
<meta property="og:image:height" content="${formData.height}" />
<meta property="og:site_name" content="${formData.siteName}" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${formData.title}" />
<meta name="twitter:description" content="${formData.description}" />
<meta name="twitter:image" content="${formData.imageUrl}" />
<meta name="twitter:site" content="${formData.twitterUsername}" />
    `.trim()
    setGeneratedTags(tags)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }))
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.type}</Label>
                <Select
                  value={formData.type}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="profile">Profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Site Name</Label>
                <Input
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                name="url"
                type="url"
                value={formData.url}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.imageUrl}</Label>
              <div className="flex space-x-2">
                <Input
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex items-center gap-2 whitespace-nowrap"
                  onClick={() => window.open('https://og.dakaiai.app/', '_blank')}
                >
                  <Wand2 className="h-4 w-4" />
                  Generate OG Image
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t.width}</Label>
                <Input
                  name="width"
                  type="number"
                  value={formData.width}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>{t.height}</Label>
                <Input
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Twitter Username</Label>
                <Input
                  name="twitterUsername"
                  value={formData.twitterUsername}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold">{t.preview}</h3>
            <pre className="overflow-x-auto rounded bg-muted p-4">
              <code>{generatedTags || '<!-- Generated tags will appear here -->'}</code>
            </pre>
            <Button
              onClick={() => navigator.clipboard.writeText(generatedTags)}
              disabled={!generatedTags}
              className="w-full"
            >
              {t.copy}
            </Button>
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">{t.instructions.title}</h3>
              <ol className="list-decimal space-y-2 pl-4">
                {t.instructions.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

