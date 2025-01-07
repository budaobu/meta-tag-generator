import { NextRequest, NextResponse } from 'next/server'
import satori from 'satori'
import sharp from 'sharp'
import { join } from 'path'
import * as fs from 'fs'

const fontPath = join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf')
let fontData = fs.readFileSync(fontPath)

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  const svg = await satori(
    <div
      style={{
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
      }}
    >
      <div style={{ marginTop: 40 }}>Meta Tag Generator</div>
      <div
        style={{
          fontSize: 30,
          marginTop: 40,
          maxWidth: 800,
        }}
      >
        {url}
      </div>
    </div>,
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

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer()

  // In a real-world scenario, you'd upload this buffer to a file storage service
  // and return the URL. For this example, we'll return a data URL.
  const dataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`

  return NextResponse.json({ imageUrl: dataUrl })
}

