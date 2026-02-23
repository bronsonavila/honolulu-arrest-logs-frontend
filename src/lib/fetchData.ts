import Papa from 'papaparse'
import type { ArrestRecord, Metadata, ProcessedArrestRecord } from './types'

const CSV_URL = process.env.NEXT_PUBLIC_CSV_URL || 'https://wz2udeuir2iaggjn.public.blob.vercel-storage.com/arrests.csv'

const METADATA_URL =
  process.env.NEXT_PUBLIC_METADATA_URL || 'https://wz2udeuir2iaggjn.public.blob.vercel-storage.com/metadata.json'

function parseReleaseHow(releaseHow: string): { releaseMethod: string | null; bail: number | null } {
  if (!releaseHow) return { releaseMethod: null, bail: null }

  if (releaseHow.includes('/')) {
    const [method, amount] = releaseHow.split('/').map(s => s.trim())

    return {
      releaseMethod: method || null,
      bail: amount ? Number(amount) : null
    }
  }

  const numericValue = Number(releaseHow)

  if (!Number.isNaN(numericValue)) {
    return { releaseMethod: null, bail: numericValue }
  }

  return { releaseMethod: releaseHow, bail: null }
}

export async function fetchArrestData(cacheKey?: string): Promise<ProcessedArrestRecord[]> {
  const url = cacheKey ? `${CSV_URL}?v=${cacheKey}` : CSV_URL
  const response = await fetch(url, {
    next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 60 }
  })
  const csvText = await response.text()

  const result = Papa.parse<ArrestRecord>(csvText, {
    header: true,
    skipEmptyLines: true
  })

  return result.data.map(record => ({
    ...record,
    ...parseReleaseHow(record.release_how)
  }))
}

export async function fetchMetadata(): Promise<Metadata> {
  const response = await fetch(METADATA_URL, {
    cache: 'no-store' // Always fetch fresh metadata
  })
  return response.json()
}
