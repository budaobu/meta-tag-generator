import { ImageResponse } from 'next/server'
import { NextRequest, NextResponse } from 'next/server'
import satori from 'satori'
import { join } from 'path'
import * as fs from 'fs'

export const runtime = 'edge'

const fontPath = join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf')
let fontData: ArrayBuffer

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    if (!fontData) {
      fontData = await fetch(new URL(fontPath, import.meta.url)).then(res => res.arrayBuffer())
    }

    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
            fontSize: 60,
            letterSpacing: -2,
            fontWeight: 700,
            textAlign: 'center',
          },
          children: [
            {
              type: 'div',
              props: {
                style: { marginTop: 40 },
                children: 'Meta Tag Generator',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 30,
                  marginTop: 40,
                  maxWidth: 800,
                },
                children: url,
              },
            },
          ],
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )

    const imageData = new ImageResponse(svg, {
      width: 1200,
      height: 630,
    })

    const arrayBuffer = await imageData.arrayBuffer()
    const base64Image = Buffer.from(arrayBuffer).toString('base64')
    const dataUrl = `data:image/png;base64,${base64Image}`

    return NextResponse.json({ url: dataUrl })
  } catch (e) {
    console.error('Error in OG image generation:', e)
    return NextResponse.json(
      { error: 'Failed to generate image', details: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    )
  }
}

