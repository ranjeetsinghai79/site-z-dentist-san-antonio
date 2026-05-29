export interface Lead {
  id?: string
  place_id: string
  name: string
  phone?: string
  email?: string
  website?: string
  address: string
  city: string
  state: string
  niche: string
  // Enriched from Google Maps scrape
  rating?: number           // e.g. 4.7
  review_count?: number     // e.g. 83
  gbp_claimed?: boolean     // Google Business Profile claimed/verified
  is_open?: boolean         // currently open when scraped
  tier?: 'tier1' | 'tier2'   // tier1 = no website ($299-499), tier2 = bad site ($500-999)
  site_score?: number
  site_issues?: string[]
  brand_data?: BrandData
  niche_profile?: NicheProfile
  config_ts?: string
  github_repo?: string
  vercel_url?: string
  cloudflare_url?: string
  hero_video_url?: string
  outreach_sent?: boolean
  outreach_sent_at?: string
  // Sales funnel
  sms_sent?: boolean
  sms_sent_at?: string
  sms_opt_out?: boolean
  meeting_url?: string
  meeting_scheduled_at?: string
  stripe_payment_url?: string
  stripe_session_id?: string
  paid?: boolean
  paid_at?: string
  handed_off?: boolean
  handed_off_at?: string
  status: LeadStatus
  created_at?: string
}

export type LeadStatus =
  | 'found'
  | 'scored'
  | 'analyzed'
  | 'config_generated'
  | 'built'
  | 'deployed'
  | 'outreach_sent'
  | 'sms_sent'
  | 'conversation_active'
  | 'meeting_scheduled'
  | 'payment_link_sent'
  | 'paid'
  | 'handed_off'
  | 'skipped'
  | 'error'

// ─── Niche Brain output ─────────────────────────────────────────────────────

export interface NicheProfile {
  visualStyle:      string   // e.g. 'golden-editorial', 'dramatic-cinematic'
  timeOfDay:        string   // full description used in prompts
  season:           string
  cameraSpec:       string
  colorGrade:       string
  heroImagePrompts: [string, string, string, string]
  heroVideoPrompt:  string
  copyTone:         string
  signature:        string   // uniqueness fingerprint for dedup
}

export interface BrandData {
  name: string
  tagline?: string
  phone?: string
  email?: string
  address?: string
  services?: string[]
  colors?: { primary?: string; secondary?: string; accent?: string }
  tone?: string
  unique_selling_points?: string[]
  years_in_business?: number
  license?: string
  service_areas?: string[]
  testimonials?: Array<{ name: string; text: string; rating: number }>
  google_rating?: string
  review_count?: string
}

export interface PipelineConfig {
  niche:
    | 'hvac'
    | 'roofing'
    | 'dentist'
    | 'medspa'
    | 'lawfirm'
    | 'remodeling'
    | 'cleaning'
    | 'junk-removal'
    | 'daycare'
    | 'auto-detailing'
    | 'restaurant'
    | 'luxury-realestate'
  location: string
  city: string
  state: string
  count: number
  templateOwner: string
  templateRepo: string
  deployOwner: string
  dryRun?: boolean
}

export interface AgentResult<T> {
  success: boolean
  data?: T
  error?: string
}
