'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function ShareButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      setIsLoading(true)
      const currentUrl = window.location.href
      const response = await fetch('/api/og', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: currentUrl }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to generate image')
      }

      if (!responseData.url) {
        throw new Error('No URL returned from the API')
      }

      setShareUrl(responseData.url)
      setIsOpen(true)
    } catch (error) {
      console.error('Error generating share image:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate share image. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast({
        title: "Success",
        description: "Link copied to clipboard!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy link. Please try again.",
      })
    }
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleShare}
        disabled={isLoading}
      >
        <Share2 className="h-5 w-5" />
        <span className="sr-only">Share</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share this page</DialogTitle>
            <DialogDescription>
              Copy the link below to share this page with the generated image:
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input value={shareUrl} readOnly />
            <Button onClick={handleCopy}>
              Copy Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

