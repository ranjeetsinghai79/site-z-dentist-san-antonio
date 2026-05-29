import 'dotenv/config'
import { getLeadsByStatus } from './db/supabase.js'
import { runGbpAgent } from './agents/gbp-agent.js'
import { runReviewsAgent } from './agents/reviews-agent.js'
import { runAnalyticsAgent } from './agents/analytics-agent.js'

async function runRetention() {
  console.log('\n=== Client Care Run ===')
  console.log(new Date().toISOString())

  const clients = await getLeadsByStatus('deployed')
  console.log(`${clients.length} active clients\n`)

  if (!clients.length) {
    console.log('No deployed clients yet.')
    return
  }

  const summary = { gbp: 0, reviews: 0, analytics: 0, errors: 0 }

  for (const client of clients) {
    console.log(`\n→ ${client.name}`)

    // GBP weekly post (only if credentials configured)
    if (process.env.GBP_ACCOUNT_ID && process.env.GBP_LOCATION_ID) {
      const gbp = await runGbpAgent(client)
      if (gbp.success) { console.log('  GBP post created'); summary.gbp++ }
      else console.log(`  [!] GBP: ${gbp.error}`)
    }

    // Auto-reply to unanswered reviews
    if (process.env.GBP_ACCOUNT_ID && process.env.GBP_LOCATION_ID) {
      const reviews = await runReviewsAgent(client)
      if (reviews.success) {
        console.log(`  Reviews: ${reviews.data?.replied} replied, ${reviews.data?.skipped} skipped`)
        summary.reviews += reviews.data?.replied ?? 0
      } else console.log(`  [!] Reviews: ${reviews.error}`)
    }

    // Weekly analytics email
    if (client.email) {
      const analytics = await runAnalyticsAgent(client)
      if (analytics.success) { console.log('  Analytics report sent'); summary.analytics++ }
      else console.log(`  [!] Analytics: ${analytics.error}`)
    } else {
      console.log('  Analytics: no email on file')
    }
  }

  console.log('\n=== Client Care Complete ===')
  console.log(`GBP posts: ${summary.gbp}`)
  console.log(`Review replies: ${summary.reviews}`)
  console.log(`Analytics reports: ${summary.analytics}`)
}

runRetention().catch(console.error)
