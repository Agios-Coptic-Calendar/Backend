/*  utils/getReadings.ts  */

export function createURL(date: Date): string {
  const base      = 'https://api.katameros.app'
  const calendar  = 'gregorian'
  const dd        = String(date.getDate()).padStart(2, '0')
  const mm        = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy      = date.getFullYear()
  const languageId = '2'
  const bibleId    = '2'

  return `${base}/readings/${calendar}/${dd}-${mm}-${yyyy}` +
         `?languageId=${languageId}&bibleId=${bibleId}`
}

/**
 * Fetches and normalises Katameros readings.
 * If the upstream service is down or returns non-JSON, we return []
 * so callers can decide how to degrade gracefully.
 */
export async function getReadings(date: Date) {
  const url = createURL(date)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000) // 5-second hard timeout

  try {
    const res = await fetch(url, {
      signal : controller.signal,
      headers: { Accept: 'application/json' }
    })

    /* ----------  network / HTTP errors ---------- */
    if (!res.ok) {
      console.error(`Katameros API ${res.status}: ${res.statusText}`)
      return []
    }

    /* ----------  wrong content-type (Cloudflare HTML, etc.) ---------- */
    const cType = res.headers.get('content-type') ?? ''
    if (!cType.includes('application/json')) {
      const snippet = (await res.text()).slice(0, 120)
      console.error(`Katameros returned non-JSON (${cType}): ${snippet}`)
      return []
    }

    /* ----------  happy path ---------- */
    const { sections = [] } = await res.json()

    // original post-processing (unchanged except for minor refactor)
    for (const section of sections) {
      if (section.title === 'Liturgy') {
        section.subSections = section.subSections.filter(
          (s: any) => s.title !== 'Synaxarium'
        )
      }

      for (const sub of section.subSections) {
        for (const reading of sub.readings) {
          if (reading.passages.length > 1) {
            const first = reading.passages[0]
            for (let i = 1; i < reading.passages.length; i++) {
              first.ref    = `${first.ref} & ${reading.passages[i].ref}`
              first.verses = [...first.verses, ...reading.passages[i].verses]
            }
            reading.passages = [first]
          }
        }
      }
    }

    return sections
  } catch (err) {
    console.error('Katameros fetch failed:', err)
    return []          // graceful degradation
  } finally {
    clearTimeout(timer)
  }
}
