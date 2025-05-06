import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'ALPHAS POMPES - Solutions de pompage industrielles en Algérie'
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
          fontSize: 48,
          background: 'linear-gradient(to right, #1e3a8a, #2563eb)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          {/* Logo image */}
          <img
            src={new URL('/public/images/logo.png', import.meta.url).toString()}
            alt="ALPHAS POMPES Logo"
            width={200}
            height={100}
          />
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 16,
          }}
        >
          ALPHAS POMPES
        </h1>
        <p
          style={{
            fontSize: 32,
            color: '#93c5fd',
            marginBottom: 32,
          }}
        >
          Solutions de pompage industrielles en Algérie
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 24px',
              borderRadius: 8,
              color: 'white',
              fontSize: 24,
            }}
          >
            Expertise
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 24px',
              borderRadius: 8,
              color: 'white',
              fontSize: 24,
            }}
          >
            Qualité
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px 24px',
              borderRadius: 8,
              color: 'white',
              fontSize: 24,
            }}
          >
            Innovation
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
