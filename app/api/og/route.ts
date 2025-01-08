import { ImageResponse } from 'next/server'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const imageData = new ImageResponse(
      {
        type: 'div',
        props: {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            fontSize: 32,
            fontWeight: 600,
          },
          children: [
            {
              type: 'div',
              props: {
                style: { marginBottom: 24 },
                children: 'Meta Tag Generator',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 24,
                  fontWeight: 400,
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
      }
    )

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

