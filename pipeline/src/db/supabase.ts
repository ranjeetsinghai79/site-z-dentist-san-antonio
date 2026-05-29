import pg from 'pg'
import type { Lead } from '../types.js'

const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

function rowToLead(row: any): Lead {
  return {
    id:               row.id,
    place_id:         row.place_id,
    name:             row.name,
    phone:            row.phone,
    email:            row.email,
    website:          row.website,
    address:          row.address,
    city:             row.city,
    state:            row.state,
    niche:            row.niche,
    tier:             row.tier,
    rating:           row.rating != null ? parseFloat(row.rating) : undefined,
    review_count:     row.review_count != null ? parseInt(row.review_count) : undefined,
    gbp_claimed:      row.gbp_claimed,
    is_open:          row.is_open,
    site_score:       row.site_score,
    site_issues:      row.site_issues,
    brand_data:       row.brand_data,
    config_ts:        row.config_ts,
    github_repo:      row.github_repo,
    vercel_url:       row.vercel_url,
    cloudflare_url:   row.cloudflare_url,
    hero_video_url:   row.hero_video_url,
    outreach_sent:    row.outreach_sent,
    outreach_sent_at: row.outreach_sent_at,
    sms_sent:         row.sms_sent,
    sms_sent_at:      row.sms_sent_at,
    paid:             row.paid,
    paid_at:          row.paid_at,
    handed_off:       row.handed_off,
    handed_off_at:    row.handed_off_at,
    status:           row.status,
    created_at:       row.created_at,
  }
}

export async function saveLead(lead: Lead): Promise<Lead | null> {
  try {
    const { rows } = await pool.query(
      `INSERT INTO leads
         (place_id, name, phone, email, website, address, city, state, niche,
          tier, rating, review_count, gbp_claimed, is_open, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       ON CONFLICT (place_id) DO UPDATE
         SET name=$2, phone=$3, email=$4, website=$5,
             tier=$10, rating=$11, review_count=$12, gbp_claimed=$13, is_open=$14,
             status=$15
       RETURNING *`,
      [lead.place_id, lead.name, lead.phone ?? null, lead.email ?? null,
       lead.website ?? null, lead.address, lead.city, lead.state, lead.niche,
       lead.tier ?? null, lead.rating ?? null, lead.review_count ?? null,
       lead.gbp_claimed ?? null, lead.is_open ?? null, lead.status]
    )
    return rows[0] ? rowToLead(rows[0]) : null
  } catch (e: any) {
    console.error('[DB] save error:', e.message)
    return null
  }
}

export async function updateLead(lead: Lead): Promise<void> {
  if (!lead.id) return
  try {
    await pool.query(
      `UPDATE leads SET
         site_score=$1, site_issues=$2, brand_data=$3, config_ts=$4,
         github_repo=$5, vercel_url=$6, outreach_sent=$7, outreach_sent_at=$8, status=$9
       WHERE id=$10`,
      [lead.site_score, JSON.stringify(lead.site_issues), JSON.stringify(lead.brand_data),
       lead.config_ts, lead.github_repo, lead.vercel_url,
       lead.outreach_sent, lead.outreach_sent_at, lead.status, lead.id]
    )
  } catch (e: any) {
    console.error('[DB] update error:', e.message)
  }
}

export async function getTotalLeadCount(): Promise<number> {
  try {
    const { rows } = await pool.query(`SELECT COUNT(*) as count FROM leads`)
    return parseInt(rows[0]?.count ?? '0')
  } catch {
    return 0
  }
}

export async function leadExists(placeId: string): Promise<boolean> {
  try {
    const { rows } = await pool.query(
      `SELECT 1 FROM leads WHERE place_id=$1 LIMIT 1`,
      [placeId]
    )
    return rows.length > 0
  } catch {
    return false
  }
}

export async function getLeadsByStatus(status: string): Promise<Lead[]> {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM leads WHERE status=$1 ORDER BY created_at DESC`,
      [status]
    )
    return rows.map(rowToLead)
  } catch (e: any) {
    console.error('[DB] query error:', e.message)
    return []
  }
}
