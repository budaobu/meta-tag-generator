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
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div style={{ marginBottom: 24 }}>
            Meta Tag Generator
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            {url}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )

    return new NextResponse(await imageData.arrayBuffer(), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (e) {
    console.error('Error in OG image generation:', e)
    return NextResponse.json(
      { error: 'Failed to generate image', details: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    )
  }
}

