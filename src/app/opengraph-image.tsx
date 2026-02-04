import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Honolulu Arrest Logs'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #333',
            padding: '40px 80px',
            borderRadius: '20px',
            backgroundColor: '#111',
          }}
        >
          <h1
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            Honolulu Arrest Logs
          </h1>
          <p
            style={{
              fontSize: 30,
              color: '#888',
              textAlign: 'center',
            }}
          >
            Recent arrest records from HPD
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
