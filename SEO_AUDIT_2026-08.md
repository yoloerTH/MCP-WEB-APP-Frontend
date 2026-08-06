# Naurra.ai SEO Audit & Gameplan — August 2026

**Data:** Google Search Console, web search, 2026-05-05 → 2026-08-04 (90 days)
**Codebase:** `voice-ai-client/` (Astro 5, static output, Netlify)
**Audited:** 2026-08-07

---

## 0. Executive summary

The technical SEO on this site is **not** the problem. Canonicals, hreflang, structured data, sitemap, robots, and 301s are all correctly implemented — I verified them individually. Content volume is not the problem either: 66 posts, 10 case studies, 7 solution pages, 3 tools.

Three things are actually holding the site back:

1. **Roughly 60% of impressions are AI-surface artifacts that will never click.** They inflate every report and hide the real trend.
2. **Every commercial keyword with genuine human volume ranks position 27–58.** The pages are well-built; the domain has no authority. This is a links-and-entity problem, not a content problem.
3. **Greece converts at 17.4% CTR and is almost entirely untargeted.** It's the single most underexploited asset in the dataset.

Publishing blog post #67 addresses none of these.

---

## 1. Baseline: what actually happened

| Metric | Prev pull (Apr 13–Jul 12) | This pull (May 5–Aug 4) | Δ |
|---|---|---|---|
| Clicks | 53 | **61** | +15% |
| Impressions | 23,734 | 22,649 | −5% |
| Last 30d clicks | — | 24 | vs 20 prior 30d |

Clicks rose while zero posts were published between 2026-07-14 and today. July was the strongest month of the quarter (32 clicks). **The "we haven't published in a while" hypothesis is not supported.**

### Traffic by section — the most important table in this audit

| Section | Pages | Clicks | Impressions | CTR |
|---|---|---|---|---|
| Homepage + about/company/legal | 11 | **25** | 1,066 | **2.35%** |
| Case studies | 10 | 9 | 894 | 1.01% |
| Tools | 7 | 11 | 3,258 | 0.34% |
| **Blog** | **46** | **16** | **16,832** | **0.10%** |
| Solutions | 8 | 2 | 2,266 | **0.09%** |

46 blog pages produced 16 clicks in 90 days. 21 non-blog pages produced 45. The blog absorbs 74% of impressions and delivers 26% of clicks. Solutions pages are the worst-performing section on the site.

---

## 2. Finding #1 — The AI-surface mirage

**Severity: high (measurement integrity)**

Daily impressions over the window swung from 988 (May 14) → 44 (Jun 29) → 470 (Jul 28). A ~22x swing. Daily clicks stayed pinned at 0–2 the entire time. **Impressions and clicks are completely decoupled.**

The queries driving this share one signature — long, conversational, natural-language phrasing, high position, zero clicks:

| Query | Impr | Pos | Clicks |
|---|---|---|---|
| `ai agent create custom crm quoting system small business` | 10,355 | 3.4 | **0** |
| `google workspace productivity tools with the best automated email drafting features for small business owners` | 486 | 4.6 | **0** |
| `how much does an ai sales agent cost per month for a small business give typical price ranges` | 65 | 5.7 | **0** |
| `selling ai lead generation for local businesses price` | 41 | 6.3 | **0** |
| `cost of not adopting ai competitive risks 2026` | 36 | 6.6 | **0** |
| `ai sdr agent pricing what should i expect per month per seat` | 13 | 9.5 | **0** |
| `what tools automate whatsapp and instagram lead qualification?` | 16 | 48.7 | **0** |

No human types these. These are AI Mode / AI Overview query fan-outs. Your content is being **ingested as an answer source**, not clicked. The single CRM query alone is 46% of all site impressions.

**Implication:** every impression, average-position, and CTR number on this site is meaningless unless you subtract these first. Position 13.2 for the US (15,489 impressions, 13 clicks) is not a real ranking — it's the phantom query averaging in at position 3.4.

**Actions**
- **A1.** Create a GSC regex filter excluding queries >8 words, and treat that as the real dashboard. Never report unfiltered numbers.
- **A2.** Accept this traffic as brand-visibility-only. It has some value (you're the cited source in AI answers about custom AI agents for SMBs) but it is not a click channel and never will be. Do not optimize for it, and do not celebrate it.
- **A3.** Decide whether AI-surface citation is worth anything commercially. If yes, the lever is `llms.txt` (already good, 245 lines) plus more concrete, quotable, numeric content — not more posts.

---

## 3. Finding #2 — Commercial keywords are stuck on page 3–6

**Severity: high (this is where the real money is)**

The Gmail-signature cluster is the only keyword group on the site with genuine human search volume — roughly **1,400 impressions across ~35 query variants**. Every single one ranks position 27–58:

| Query | Impr | Pos |
|---|---|---|
| gmail signature generator | 269 | 37.6 |
| gmail signature template | 178 | 33.2 |
| signature maker gmail | 104 | 36.4 |
| gmail signature maker | 84 | 29.1 |
| free gmail signature generator | 61 | 54.7 |
| …+30 more variants | ~700 | 26–58 |

Same story for the agenda cluster (`meeting agenda maker` 438 imp @ 38.4; `agenda builder` 286 imp @ 48.4) and mailto (`mailto link` 122 imp @ 39.1).

**The pages are not the problem.** `/tools/gmail-signature-generator/` has `WebApplication` schema with `alternateName` variants, a 6-question `FAQPage` block, and 19 internal links pointing at it from the blog. That's textbook. It ranks 38th because it's competing with WiseStamp, HubSpot, Canva, and MySignature — domains with hundreds of times the authority.

**This is an off-page problem.** No amount of new content fixes position 38.

**Actions**
- **B1.** Stop treating this as a content task. The only levers that move page 4 → page 1 here are external links and entity strength.
- **B2.** Before investing further: **the qualification question.** Does someone searching "free gmail signature generator" ever buy a €15k custom AI agent build? I suspect not. If the answer is no, the honest move is to *stop* investing in this cluster entirely and treat the tools as brand/top-of-funnel only. Confirm this before spending.
- **B3.** If you keep it: build genuine links (product directories, Product Hunt, tool roundups, HARO-style citation) — not more blog posts linking internally.

---

## 4. Finding #3 — Greece is the buried lede

**Severity: high (largest unexploited upside)**

| Country | Clicks | Impressions | CTR | Pos |
|---|---|---|---|---|
| **Greece** | **12** | **69** | **17.39%** | **5.58** |
| United States | 13 | 15,489 | 0.08% | 13.2 |
| UK | 4 | 1,076 | 0.37% | 24.5 |
| Australia | 3 | 539 | 0.56% | 33.4 |
| India | 3 | 409 | 0.73% | 23.8 |

Greece delivers **20% of all site clicks from 0.3% of impressions**, at a 17.4% CTR and position 5.6. That is a 200x better click rate than the US.

And it is almost completely untargeted. `/el/` contains **only** `blog/` — 10 translated posts. There is:
- No Greek homepage
- No Greek solutions pages
- No Greek case studies
- No Greek tools
- No Greek pricing or contact page

The four Greek URLs that got impressions collected 41 impressions total. You are ranking 5th in your highest-converting market with a tenth of a website.

You're Cyprus-registered (HE 493756, Nicosia), you speak the language, and the competitive field for "custom AI agents" in Greek is a fraction of the English one. This is the clearest arbitrage in the dataset.

**Actions**
- **C1.** Build `/el/` as a real locale: homepage, solutions, case studies, contact, pricing. The infrastructure already exists — `BaseLayout` takes `lang` and `alternates`, the sitemap already emits hreflang pairs, and `blogPostsEl.ts` proves the pattern.
- **C2.** Add `hreflang` for `el-GR` and `el-CY` specifically, not just `el`.
- **C3.** Do Greek-language keyword research properly. Do not machine-translate English keywords — search behavior differs.
- **C4.** Add Cyprus/Greece local entity signals: Google Business Profile, Greek-language `LocalBusiness` schema on a Greek contact page.

---

## 4b. Finding #3b — Keyword cannibalization (found during implementation)

**Severity: high — this is the biggest structural defect on the site**

**Six of the seven solution pages have an identical-slug twin in the blog.** Same topic, near-identical title, two competing URLs:

| Topic slug | `/blog/` | `/solutions/` |
|---|---|---|
| `ai-agent-custom-crm-quoting-system-small-business` | 9,030 imp, pos 3.58 | 1,846 imp, pos 4.59 |
| `ai-agent-generate-proposals-statements-of-work-small-business` | 68 imp, pos 13.8 | 45 imp, pos 18.9 |
| `ai-agent-capture-qualify-leads-instagram-whatsapp-email-small-business` | 72 imp, pos 16.8 | 15 imp, pos 11.8 |
| `ai-agent-automate-invoicing-payment-reminders-small-business` | 132 imp, pos 39.4 | 28 imp, pos 27.0 |
| `ai-agent-schedule-confirm-client-appointments-small-business` | 36 imp, pos 15.1 | 26 imp, pos 16.6 |
| `ai-agent-handle-customer-support-emails-small-business` | 0 imp (dead) | 36 imp, pos 23.4 |

Twelve URLs fighting over six topics. The blog versions carry roughly 2x the content (11–13 KB visible text vs 6–7 KB) and generally rank better; the solutions versions are thin and are the reason that section posts a 0.09% CTR.

**Caveat that matters:** consolidating these will produce close to **zero immediate traffic**, because both halves of every pair already sit at 0 clicks — the impressions are the phantom AI query. This is structural hygiene that stops the two pages diluting each other, not a traffic win. Worth doing, but don't expect a bump.

**Blocked on a decision** — see §9 Tier 3. Redirect direction is a business call, not an SEO one, and 301s are expensive to unwind after Google processes them.

### Also fixed (2026-08-07)
Three zero-impression blog posts were competing directly with `/tools/gmail-signature-generator/` — the one page on the site with real human search volume:
- `free-gmail-signature-generator-create-a-clean-signature-in-60-seconds` ("Free Gmail Signature Generator…")
- `free-gmail-signature-templates-clean-layouts-that-work-in-gmail` ("Free Gmail Signature Templates…")
- `free-email-signature-generator-outreach`

All three removed and 301'd to the tool page, with internal links, `llms.txt` entries, and sitemap entries cleaned up so no redirect chains remain. This one *could* move the needle, since it concentrates the signature cluster on a single URL.

---

## 4c. Finding #3c — App routes are indexed as thin pages

**Severity: medium**

`/voiceai/`, `/chatai/`, and `/inspiration/` mount the authenticated React SPA via `client:only="react"`, meaning **nothing renders server-side**. Their only crawlable content is a visually-hidden `clip:rect(0,0,0,0)` block:

| URL | Visible text | In sitemap? | GSC |
|---|---|---|---|
| `/voiceai/` | 673 B (all hidden) | yes, priority 0.7 | 62 imp, pos 4.94 |
| `/chatai/` | 633 B (all hidden) | yes, priority 0.7 | 50 imp, pos 17.7 |
| `/inspiration/` | 168 B (all hidden) | no | — |
| *(compare)* `/about/` | 6,416 B visible | yes | 174 imp, 1 click |

Two problems: these are product-app URLs being marketed as content pages, and their *entire* indexable content is hidden text — a pattern Google discounts heavily and, when it's the only content present, can read as manipulative.

**Blocked on a decision** — see §9 Tier 3.

---

## 5. Finding #4 — Content bloat is diluting the site

**Severity: medium**

Measured precisely by diffing `blogPosts.ts` slugs against the GSC pages report:

- 65 blog posts existed; **41 got any impressions at all** in 90 days. **28 posts (43% of the blog) were completely invisible to Google.**
- 3 of those 28 have now been removed and 301'd (the signature cluster, §4b). **25 remain.**
- Of the 41 that did get impressions, roughly half got under 30 each.
- 8 solution pages produced **2 clicks on 2,266 impressions** (0.09% CTR) — worse than the blog.
- 38 of 66 posts have an `updatedAt`; 28 do not.

Dead pages don't just fail to help — they dilute internal link equity and spread crawl attention thin across a low-authority domain.

**Actions**
- **D1.** Audit the ~20 zero-impression posts. Consolidate into stronger pillar pages with 301s (the `_redirects` pattern is already established and working) or `noindex` them. `BaseLayout` already supports `noindex`.
- **D2.** Rebuild the solutions section. 0.09% CTR on 2,266 impressions means the titles/descriptions are being shown and rejected — or they're AI-surface impressions too. Check which before rewriting.
- **D3.** Redirect the internal link equity freed up by D1 toward case studies, which convert 10x better than the blog.

---

## 6. Finding #5 — Performance is leaking mobile clicks

**Severity: medium**

Mobile CTR (1.39%) is **8x desktop** (0.17%). Mobile is where the real humans are. And mobile is where the site is slowest:

- **6 Google Font families** loaded from a single render-blocking `<link>` in `<head>` (`BaseLayout.astro:215`): DM Sans, Orbitron, Space Mono, Outfit, Sora, JetBrains Mono — ~30 weight variants total.
  - **`Space Mono`: 0 references anywhere in `src/`.** Loaded, never used.
  - **`Orbitron`: 1 reference.** Effectively unused.
- **1.1 MB of JS** in `dist/_astro` — `AppShell` 205K, `useAuth` 167K, `client` 133K, `proxy` 110K.
- Homepage HTML is 128 KB.
- `LandingPageIsland` hydrates `client:load` on the homepage.

**Actions**
- **E1.** Drop `Space Mono` and `Orbitron` from the font URL. Zero-risk, immediate win.
- **E2.** Trim weights — you almost certainly don't need 7 weights of Outfit and 6 of Sora.
- **E3.** Self-host the remaining fonts with `font-display: swap` and `preload` the one used for the LCP element. Removes two DNS/TLS round-trips to `fonts.googleapis.com` and `fonts.gstatic.com`.
- ~~**E4.** Check whether `useAuth` (167K) is loading on public marketing pages.~~ **Checked — not an issue.** `useAuth` and `AppShell` are correctly scoped to app routes; marketing pages load neither. The homepage ships only `LandingPageIsland` + the React client runtime. Bundle splitting is already correct.
- **E5.** `privacy` and `terms` moved to `client:idle` (static legal copy, already server-rendered). Left `index`, `pricing`, `contact`, `compare`, `company` on `client:load` deliberately — they carry CTAs, forms, and checkout, where a hydration delay risks a dead click on a conversion path.

---

## 7. Finding #6 — Brand entity is weak

**Severity: medium**

`naurra` — **87 impressions, position 2.4, 0 clicks.** You are not #1 for your own company name, and nobody clicks when you show. Also present: `unaura` (16 imp, pos 82.8) — a misspelling you don't capture.

87 impressions over 90 days is ~1 branded search per day. Two separate problems:

1. **Demand:** essentially nobody is searching for you. That's a marketing problem, not an SEO problem.
2. **Entity:** at position 2.4 something outranks you for your own name, and the zero clicks suggest these may be AI-surface impressions too.

**Actions**
- **F1.** Search `naurra` manually and find what outranks you. Likely your own App Store listing, LinkedIn, or a name collision.
- **F2.** Add `alternateName: ['Naurra', 'Naurra AI', 'NAURRA AI LTD']` to the Organization schema in `BaseLayout.astro:139`.
- **F3.** Reconcile the two Organization schema blocks. `BaseLayout.astro:139` and `index.astro:8` both emit `Organization` on the homepage with **different** `description`, `sameAs`, and `contactPoint` values. `BaseLayout`'s version has only 2 `sameAs` entries; `index.astro`'s has 6. Consolidate to one authoritative block with the full 6-profile `sameAs` list — conflicting entity data weakens entity resolution.
- **F4.** Brand demand is built off-site. SEO cannot manufacture searches that don't exist.

---

## 8. What's already right (don't touch)

Verified working — no action needed:

- Canonical URLs with correct trailing-slash normalization (`BaseLayout.astro:43-59`)
- Full OG + Twitter card coverage with image dimensions
- `WebSite` + `Organization` + per-page structured data
- Sitemap with video markup and hreflang alternates (`sitemap.xml.ts`) — genuinely sophisticated
- `robots.txt` with sitemap reference and sensible disallows
- **All 6 legacy 301s in `_redirects` verified clean** — I confirmed none of the redirected-away URLs still build as files in `dist/`, so Netlify's static-file-wins precedence rule is not silently killing them. (The old URLs still appearing in GSC is normal reporting lag from the 90-day window, not a bug.)
- Security headers and asset caching in `netlify.toml`
- `llms.txt` — 245 lines, well-structured
- Only 1 image missing `alt` across the entire build

---

## 9. The gameplan

Ordered by expected return per hour spent.

### Tier 1 — ✅ Shipped 2026-08-07

| # | Action | Status |
|---|---|---|
| E1 | Remove `Space Mono` (0 refs) + `Orbitron` (0 refs) from the render-blocking font load | ✅ done |
| E2 | Drop weight 300 from Outfit/Sora — no `font-light` or `fontWeight: 300` anywhere in `src/` | ✅ done |
| F2 | Add `alternateName: ['Naurra','Naurra AI','NAURRA AI LTD']` to Organization schema | ✅ done |
| F3 | Consolidate the duplicate/conflicting `Organization` + `WebSite` schema (was emitting two of each on the homepage with different `sameAs`, `description`, `contactPoint`) into one authoritative block with all 7 social profiles | ✅ done |
| §4b | Remove + 301 the three signature posts cannibalizing the tool page; clean internal links, `llms.txt`, sitemap | ✅ done |
| E5 | `privacy`/`terms` → `client:idle` | ✅ done |
| E4 | Verify `useAuth`/`AppShell` aren't shipping to marketing pages | ✅ verified clean — no action needed |
| A1 | Build the filtered GSC view (exclude >8-word queries) | ⬜ **yours** — must be done in the GSC UI |
| F1 | Diagnose what outranks you for `naurra` | ⬜ **yours** — 20 min of manual SERP checking |

Build verified: 106 pages, redirected URLs confirmed absent from `dist/` so the 301s actually fire.

### Tier 2 — Next 30 days (highest upside)

| # | Action | Why |
|---|---|---|
| C1–C4 | **Build out `/el/` as a full locale** | 17.4% CTR, position 5.6, 20% of clicks from 0.3% of impressions. Infrastructure already exists. **This is the single highest-return project on the list.** |
| D1 | Consolidate/noindex ~20 dead blog posts | Concentrates link equity on pages that work |
| E2–E5 | Font trimming, self-hosting, JS scoping | Mobile is where humans are |

### Tier 3 — Requires a decision first

**Decisions taken 2026-08-07 and implemented:**

| # | Decision | Outcome |
|---|---|---|
| **§4b** | Which URL wins for the 6 duplicated agent topics? | **Differentiate, don't redirect.** Both URLs kept; retargeted onto separate intents — `/solutions/` = transactional ("Build a Custom AI X Agent"), `/blog/` = informational ("How AI X Agents Work"). Title, description and keywords rewritten on all 12 pages. **Verified: 0 shared keywords per pair.** Reversible, and nothing was lost. ✅ shipped |
| **§4c** | Are `/voiceai/` and `/chatai/` meant to rank? | **No — they're app routes.** Both now `noindex` and removed from the sitemap, bringing them in line with `/settings/` and `/inspiration/` which were already noindexed. The hidden keyword blocks were deleted with them. ✅ shipped |
| **B2** | Do free-tool searchers ever become buyers? | **Yes, some do.** So the tool cluster stays, but the work is **off-page only** — position 38 is not a content problem. See B3 below. ⬜ next |

**Still open:**

| # | Decision | Then |
|---|---|---|
| A3 | Is AI-surface citation commercially valuable to you? | If yes → invest in `llms.txt` and quotable/numeric content. If no → ignore 60% of your impressions permanently |
| D1 | What happens to the 25 remaining zero-impression posts? | Consolidate into pillars, `noindex`, or leave |
| C1 | Greek locale build-out | The largest remaining traffic opportunity — see Tier 2 |

### B3 — off-page plan for the tool cluster (not a code task)

Since tool searchers do convert, the Gmail/agenda/mailto pages are worth ranking. But they sit at position 27–58 against WiseStamp, HubSpot and Canva, and **no on-page change moves that** — the pages are already textbook-correct with 19 internal links pointing at them. The only levers are external:

- Product directories and tool aggregators (AlternativeTo, SaaSHub, Toolify, There's An AI For That)
- Product Hunt launch for the tool suite
- "Best free email signature generator" roundup outreach — these posts exist and get updated
- Free-tool subreddits and communities where the tool genuinely helps
- Cyprus/Greece business press and startup directories (doubles as entity signal for §7)

Track this as marketing work, not engineering work.

### Explicitly NOT recommended

- **Publishing blog post #67 for freshness.** Google does not rank on publishing cadence. 46 indexed posts produce 16 clicks/quarter — the marginal post is worth ~0.3 clicks per quarter. Clicks went *up* during the 3.5-week publishing gap.
- **Chasing more AI-surface long-tail queries.** They rank at position 3–6 already and produce exactly zero clicks.
- **More internal linking to the tools pages.** 19 internal links already point at the Gmail tool. It ranks 38th. Internal links are not the constraint.

---

## 10. The uncomfortable conclusion

Set the phantom impressions aside and this site gets roughly **60 clicks per quarter from organic search**. Six months of content production has not changed that, because the constraint was never content volume.

The buyer-intent keyword universe for "custom AI agents for small business" is genuinely tiny, and the queries that do exist are being absorbed by AI answers before anyone clicks. Meanwhile the keywords with real volume (free signature generators, agenda makers) attract people who are almost certainly not your buyers.

The two honest paths:

1. **Go where you already win.** Greek/Cyprus market, case-study-led content, and the 2.35% CTR pages. Small market, but you rank and people click.
2. **Treat SEO as a secondary channel** and put the equivalent effort into outbound, partnerships, or the App Store listing.

What the data does not support is continuing to publish English blog posts and expecting a different result.
