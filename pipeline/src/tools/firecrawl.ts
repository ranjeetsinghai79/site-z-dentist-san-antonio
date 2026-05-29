export async function scrapeSite(url: string): Promise<string | null> {
  try {
    const res = await fetch(`${process.env.FIRECRAWL_URL}/v2/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
        onlyMainContent: false,
      }),
    })

    const data = await res.json() as any
    return data.data?.markdown || data.data?.content || null
  } catch {
    return null
  }
}
