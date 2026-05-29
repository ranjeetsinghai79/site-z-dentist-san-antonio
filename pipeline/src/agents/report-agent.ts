import pg from 'pg'
import { appendSheetRow } from '../tools/google-sheets.js'

const { Pool } = pg

export async function runDailyReport(): Promise<void> {
  const sheetId = process.env.LEADS_SHEET_ID
  if (!sheetId) {
    console.log('[Report] LEADS_SHEET_ID not set — skipping')
    return
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // All leads deployed/outreach_sent today
    const { rows } = await pool.query(`
      SELECT name, niche, city, state, address, phone, email,
             vercel_url, github_repo, status, created_at
      FROM leads
      WHERE status IN ('deployed','outreach_sent')
        AND DATE(created_at) = CURRENT_DATE
      ORDER BY created_at DESC
    `)

    console.log(`[Report] ${rows.length} new sites today`)

    if (!rows.length) {
      await appendSheetRow({
        spreadsheetId: sheetId,
        sheetName: 'Sheet1',
        values: [
          new Date().toLocaleDateString('en-US'),
          '— no new sites today —', '', '', '', '', '', '', '', ''
        ],
      })
      return
    }

    for (const row of rows) {
      const url = row.vercel_url
        ? `https://${row.vercel_url}`
        : row.github_repo
          ? `https://${row.github_repo.split('/').pop()}.pages.dev`
          : ''

      await appendSheetRow({
        spreadsheetId: sheetId,
        sheetName: 'Sheet1',
        values: [
          new Date().toLocaleDateString('en-US'),
          row.name ?? '',
          row.niche ?? '',
          `${row.city}, ${row.state}`,
          row.address ?? '',
          row.phone ?? '',
          row.email ?? '',
          url,
          '',           // theme — not stored in DB yet, would need config_ts parse
          row.status ?? '',
        ],
      })
    }

    console.log(`[Report] Appended ${rows.length} rows to Google Sheet`)
  } finally {
    await pool.end()
  }
}
