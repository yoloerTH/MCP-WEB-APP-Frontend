import type { BlogPost } from './blogPosts'

/**
 * Posts drawn from building and running Total Football Studio. Each one targets a
 * search people actually make, answers it in plain language, and links to the
 * case study that proves we did it. House rules for this copy: round, natural
 * numbers (no oddly exact counts), say plainly that growth was organic, and no
 * em dashes.
 */

const author = {
  name: 'Athanasios-Ioannis Panagiotakopoulos',
  avatar: '/ceo-thanos.jpg',
}

export const totalFootballPosts: BlogPost[] = [
  {
    slug: 'instagram-comment-to-dm-automation-without-manychat',
    title: 'How to Set Up Instagram Comment-to-DM Automation Without ManyChat',
    description: 'A plain-English guide to auto-replying to Instagram and Facebook comments with a private message, using Meta\'s official API. What you need, how it works, and the edge cases most tools miss.',
    content: `
# How to Set Up Instagram Comment-to-DM Automation Without ManyChat

**TL;DR:** When someone comments a keyword under your post, Meta lets your Page send them one private message. You can build that yourself on Meta's official API with a small cloud function, no monthly per-contact fee. The hard part is not the happy path. It is the people who spell the keyword differently and the people whose messages are closed. We built this for our own product and it has answered hundreds of comments automatically.

You have seen it a hundred times: "Comment GUIDE and I'll send it to you." It works because it turns a passive viewer into a lead in one step, and every comment also tells the algorithm the post is worth showing to more people.

Most businesses do it with ManyChat or a similar tool. That is a perfectly good choice. But if you want no per-contact fees, full control of the edge cases, and leads that go straight into your own database and email list, building it yourself is very doable.

## What is comment-to-DM automation?

It is a small program that watches the comments on your Instagram or Facebook posts. When a comment contains your keyword, it sends that person a private message, usually with a link. The person never has to message you first.

Meta supports this officially through a feature called **private replies**: a business can send one private message in response to a comment on its own post, for a limited window after the comment was made.

## What you need before you start

- **An Instagram professional account** (Business or Creator) connected to a **Facebook Page**
- **A Meta developer app** with the permissions for reading comments and sending messages on Instagram and your Page
- **Webhooks** subscribed to Instagram comments and your Page feed, so Meta tells your app the moment a comment arrives
- **A long-lived Page access token**, stored as a secret, never in your code
- **Somewhere to run a small function**: a Supabase Edge Function, a Netlify or Vercel function, or n8n if you prefer no code
- **App Review**: while your app is in development mode it only works for people with a role on the app. To reply to the public, Meta has to approve it

## How the flow works

1. Someone comments "433" under your reel.
2. Meta sends a webhook to your function with the comment text, the comment ID and who wrote it.
3. Your function checks the text against your keyword.
4. If it matches, it calls Meta's API to send a private reply to that comment, with your link.
5. Optionally, it likes the comment or posts a short public reply so others see it works.
6. The person taps the link and lands on a page that asks for their email.

That is the whole system. In our case the bot went from idea to live in one day.

## The edge cases that decide whether it works

This is where off-the-shelf setups quietly lose people.

### People type the keyword in many ways

Your keyword is "433". People type "4-3-3", "4:3:3", "4 3 3", "1-4-3-3" and "433!!". If you match the exact string only, you miss a real share of your leads and you never find out.

**The fix:** normalise the comment before matching. Strip spaces and punctuation, lower-case it, and accept the variants you see in your own comments. Then audit: once a week, compare every comment against every reply your bot sent.

### Some people have messages from businesses switched off

When that happens Meta refuses the private message. Most tools log an error and move on, so the person who asked for your guide gets nothing.

**The fix:** catch that refusal and reply to the comment publicly with the link instead. Nobody is left without an answer.

### Do not send the same person the link twice

People comment twice, or reply to their own comment. Keep a small record of which comments you have already answered and skip repeats.

### Keep the message simple

We learned this one the hard way: a link full of tracking parameters looked suspicious and people did not click it. A plain, clean link performs better. And if your landing page asks for an email, say so in the message, or people will reply with their email in the chat instead.

## Build it yourself or use ManyChat?

| | ManyChat and similar | Custom on Meta's API |
|---|---|---|
| Setup time | An afternoon | A day or two with a developer |
| Cost | Monthly, grows with contacts | Hosting is usually free or close to it |
| Edge cases | What the tool supports | Whatever you decide |
| Your data | Lives in their platform | Goes straight to your database and email list |
| Flexibility | Templates | Anything the API allows |

If you post occasionally and want it running today, use a tool. If comments are a real lead channel for you, a custom bot pays for itself quickly and you own the whole funnel.

## What happens after the DM matters most

The DM is only the first step. The link should go to a fast page that asks for an email in exchange for something genuinely useful. Then a welcome email should arrive straight away, followed by a short series. That is where the comment turns into a customer. We cover that part in [our email automation case study](/case-studies/email-marketing-automation-newsletters-transactional/).

## Frequently asked questions

### Is comment-to-DM automation allowed by Instagram?

Yes, when it uses Meta's official API and private replies feature from your own business account. Avoid tools that log in as you or scrape, which can get an account restricted.

### Do I need a Facebook Page for Instagram DM automation?

Yes. Instagram's messaging API works through a professional Instagram account connected to a Facebook Page.

### How fast does the DM arrive?

Usually within a few seconds of the comment, because Meta notifies your function straight away through a webhook.

### Can it work on Facebook posts too?

Yes. The same function can listen to your Page's post comments and send private replies through Messenger.

---

*See how we built ours, and the numbers behind it, in [the comment-to-DM case study](/case-studies/instagram-facebook-comment-to-dm-automation/). Want one for your business? [Tell us about your posts](/contact/).*
`,
    author,
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    category: 'Tutorials',
    tags: ['Comment to DM', 'Instagram', 'Marketing Automation', 'Lead Generation'],
    featured: true,
    isPillar: true,
    image: '/blog/instagram-comment-to-dm-automation-without-manychat.png',
    readingTime: 7,
    keywords: 'instagram comment to dm automation, comment to dm without manychat, manychat alternative, instagram auto dm comments, facebook comment auto reply private message, instagram private replies api, comment keyword automation, instagram dm automation free',
    howTo: {
      name: 'How to set up Instagram comment-to-DM automation without ManyChat',
      description: 'Auto-reply to Instagram and Facebook comments with a private message using Meta\'s official API.',
      steps: [
        { name: 'Connect your accounts', text: 'Use an Instagram professional account connected to a Facebook Page.' },
        { name: 'Create a Meta developer app', text: 'Add the permissions for reading comments and sending messages, and generate a long-lived Page access token.' },
        { name: 'Subscribe to webhooks', text: 'Subscribe the app to Instagram comments and your Page feed so new comments reach your function.' },
        { name: 'Deploy a small function', text: 'Receive the webhook, normalise the comment text and check it against your keyword.' },
        { name: 'Send the private reply', text: 'Call the private replies API with your link. If messages are closed, reply publicly instead.' },
        { name: 'Pass App Review and audit weekly', text: 'Get the app approved for public use, then compare comments with replies each week.' },
      ],
    },
  },
  {
    slug: 'how-we-got-30-million-organic-views-in-3-months',
    title: 'How We Got 30M+ Organic Views in 3 Months With Motion Graphics (No Ads)',
    description: 'The short-form video system behind 30M+ organic views and 80K+ followers in three months: videos made from code, retention data, and the format rules that changed everything.',
    content: `
# How We Got 30M+ Organic Views in 3 Months With Motion Graphics (No Ads)

**TL;DR:** We stopped posting reaction clips and started building videos from code. Then we let the retention data write the rules. A typical video now reaches more than five times as many people as before, the channel passed 30M+ views in three months and 80K+ followers across Facebook, Instagram, TikTok and YouTube, and every bit of it was organic. No ads.

This is the system behind the content for Total Football Studio, our own product. It is a football channel, but nothing in this post is specific to football. It works for any business that has something to explain.

## Where we started

The channel was posting reaction clips and hot takes. Most posts got under a thousand plays and almost no shares. Every video was edited by hand, so the length and pace changed every time, and we had no idea why one clip took off and the next one died.

There was a second problem: TV footage meant a copyright claim was possible on every single upload.

## Step 1: Make videos you can repeat

We stopped editing videos and started building them. Each short is a small program that draws every frame: the pitch, the players, the arrows, the captions. Nothing is filmed and nothing is borrowed.

That sounds like a technical detail. It is actually the whole strategy, for three reasons:

- **Consistency.** Every video has the same quality, the same pacing and the same look. Your audience learns what to expect.
- **Speed.** A new video is new content dropped into a proven template, not a new edit from scratch.
- **Safety.** No borrowed footage means no copyright claims. Ever.

## Step 2: Measure the right thing

Plays and likes tell you what happened. They do not tell you why.

After every post we pulled the watch time, shares and, most importantly, the **second-by-second retention curve** from Facebook and Instagram. That curve shows the exact moment people swipe away.

Once we had dozens of settled videos, the pattern was obvious. The single number that predicted reach best was **watch-through rate**: the share of people who watched to the end. Not likes, not follower count, not posting time.

## Step 3: Turn the data into rules

The retention curves gave us a short list of rules that every video now follows:

- **Get to the point in the first three seconds.** The first real step lands on screen within about three and a half seconds. Every second of setup before that loses viewers.
- **Cut the slow ending.** A recap at the end feels polished but people leave during it, and those exits hurt the whole video.
- **Teach whole systems, not single tricks.** Videos explaining how a whole team works reached far more people than videos about one individual skill. People pass on things that make them look smart to their group.
- **Check before you publish.** Watch-through became a quality gate. If a draft would not hold attention, it gets fixed before it goes out.

## Step 4: Turn views into a business

Views are not revenue. The content engine only became valuable when every video had somewhere to send people:

- **Comment-to-DM:** comment a word, get a free playbook by private message. [Here is how we built it](/blog/instagram-comment-to-dm-automation-without-manychat/).
- **A website built for search:** every video idea also became a page, so the same work keeps bringing people in from Google long after the video stops trending.
- **Email:** the playbook page collects an email, and a welcome series takes it from there.

That chain is how organic content turned into hundreds of sign-ups in a couple of weeks for the product.

## What this means for your business

You do not need a film crew or an ad budget. You need:

1. A format you can repeat, ideally one that explains something your customers care about
2. The retention data from every post, read honestly
3. A short list of rules that you actually follow
4. Somewhere for viewers to go next

Motion graphics are especially good for businesses that sell something hard to film: software, services, processes, numbers. A clear animated explanation beats a talking head for those almost every time.

## Frequently asked questions

### Did you use paid ads to get 30M views?

No. Every view and follower came from organic content on Facebook, Instagram, TikTok and YouTube.

### What tool makes videos from code?

We use Remotion, which builds videos with React. Any approach works as long as your format is repeatable and quick to produce.

### What is the most important metric for short-form video?

In our data it was watch-through rate, the share of viewers who reach the end. It predicted reach far better than likes or posting time.

### How long until results show?

The new rules lifted reach per video once they were in place. The big numbers came from posting consistently with them, week after week.

---

*Read the full [motion graphics content engine case study](/case-studies/ai-motion-graphics-content-engine-social-growth/), or see [all eight systems behind Total Football Studio](/case-studies/total-football-studio/). Want this for your brand? [Book a free call](/contact/).*
`,
    author,
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    category: 'Industry Insights',
    tags: ['Social Media Growth', 'Short-Form Video', 'Motion Graphics', 'Organic Marketing'],
    featured: true,
    isPillar: true,
    image: '/blog/how-we-got-30-million-organic-views-in-3-months.png',
    readingTime: 7,
    keywords: 'how to get organic views, organic social media growth, short form video strategy, grow on instagram without ads, motion graphics for social media, watch through rate, retention rate reels, tiktok growth strategy 2026, faceless content',
  },
  {
    slug: 'why-your-emails-go-to-spam-spf-dkim-dmarc-explained',
    title: 'Why Your Emails Go to Spam: SPF, DKIM and DMARC Explained Simply',
    description: 'If your invoices, sign-up emails or newsletters land in spam, the cause is usually three DNS records. Here is what SPF, DKIM and DMARC do, how to set them up, and the mistakes we fixed in production.',
    content: `
# Why Your Emails Go to Spam: SPF, DKIM and DMARC Explained Simply

**TL;DR:** Email providers like Gmail and Outlook decide whether to trust your mail mostly by checking three DNS records: SPF, DKIM and DMARC. If one is missing or wrong, good emails land in spam or vanish. Set up all three for every service that sends as your domain, check them after any change, and have a backup sender for the emails that must never fail.

When customers say "I never got the email", it is tempting to blame them. Usually the problem is on your side, and it is fixable in an afternoon.

We run all the email for Total Football Studio, our own product: sign-up and login emails, a welcome series, team invites and a regular newsletter to hundreds of subscribers. Here is what we learned keeping it out of spam.

## The three records in plain English

### What is SPF?

SPF is a list of the services allowed to send email for your domain. It lives in one DNS record. When Gmail receives a message from you, it checks whether the server that sent it is on your list.

### What is DKIM?

DKIM is a digital signature. Your email service signs every message, and publishes the matching key in your DNS. The receiver checks the signature to confirm the message really came from you and was not changed on the way.

### What is DMARC?

DMARC tells receivers what to do when a message fails SPF or DKIM: let it through, send it to spam, or reject it. It also asks them to send you reports, so you can see who is sending as your domain.

## How to set them up

1. **List every service that sends email as your domain.** Your mailbox provider, your newsletter tool, your app's login emails, your invoicing tool, your CRM. People forget at least one.
2. **SPF: one record, all services included.** You can only have one SPF record per domain. Add each service's "include". Keep it under the limit of ten DNS lookups.
3. **DKIM: one key per service.** Each service gives you its own record to add. Add them all, then verify inside each service.
4. **DMARC: start gentle.** Begin with a policy that only monitors and sends reports. Once everything passes, tighten it so failing mail goes to spam.
5. **Test.** Send to a Gmail address, open the message, choose "Show original" and check that SPF, DKIM and DMARC all say PASS.

Since 2024, Gmail and Yahoo require bulk senders to have SPF, DKIM and DMARC in place, plus one-click unsubscribe on marketing email. This is no longer optional for newsletters.

## The mistakes we actually hit

### The wrong region in the SPF record

Some email services run separate server regions, for example one for the US and one for Europe, with different addresses for each. Our SPF record pointed to the US region while our account sent from the EU. The two lists of servers do not overlap, so the first campaign would have failed SPF. A one-word fix, but only if you spot it.

### Hidden Apple addresses

Apple lets users hide their real email behind a private relay address. Mail to those addresses only arrives if your sending domain is registered with Apple. If you offer Sign in with Apple, register your sender, or a slice of your users will never get your emails.

### One provider, one point of failure

Our main email provider ran out of credit with no warning. Sign-up and password emails depend on it, so when it fails, it looks like users simply never confirm. We moved all mail to a new provider within two days and added a second one behind it. Now if the first fails, mail goes out through the backup automatically.

## A quick checklist

| Check | What good looks like |
|---|---|
| SPF | One record, every sending service included, under ten lookups |
| DKIM | A key for each service, verified in each dashboard |
| DMARC | Present, reports arriving, tightened once everything passes |
| Gmail "Show original" | PASS on all three |
| Unsubscribe | One click on every marketing email |
| Critical emails | A backup provider for sign-up, login and invoices |

## Frequently asked questions

### Why do my emails go to spam even with SPF set up?

SPF alone is not enough. Without DKIM and DMARC, or with a service missing from your SPF record, providers still treat your mail with suspicion.

### Can I have two SPF records?

No. Multiple SPF records make SPF fail. Combine every service into one record.

### How long do DNS changes take?

Usually minutes to a few hours. Test with "Show original" in Gmail before sending anything important.

### Do I need DMARC for a small business?

Yes, if you send newsletters or any volume of mail. Gmail and Yahoo require it for bulk senders, and it protects your domain from being used by scammers.

---

*See how we built every email for our product in [the email marketing and automation case study](/case-studies/email-marketing-automation-newsletters-transactional/). Emails landing in spam? [We can fix it](/contact/).*
`,
    author,
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    category: 'Tutorials',
    tags: ['Email Deliverability', 'Email Marketing', 'DNS', 'Automation'],
    featured: false,
    isPillar: true,
    image: '/blog/why-your-emails-go-to-spam-spf-dkim-dmarc-explained.png',
    readingTime: 6,
    keywords: 'why do my emails go to spam, spf dkim dmarc explained, how to set up spf dkim dmarc, email deliverability small business, emails going to spam gmail, dmarc setup, gmail bulk sender requirements, apple private relay email',
  },
  {
    slug: 'how-to-change-domain-without-losing-seo-rankings',
    title: 'How to Change Your Domain Without Losing Google Rankings: A Step-by-Step Checklist',
    description: 'Moving to a new domain is when many sites lose their search traffic. Here is the exact checklist we followed for our own product: redirects, Search Console, sitemaps and what to keep for months after.',
    content: `
# How to Change Your Domain Without Losing Google Rankings: A Step-by-Step Checklist

**TL;DR:** Redirect every old page to its matching new page with a permanent (301) redirect, keep both domains verified in Google Search Console, file a Change of Address, update every internal link and sitemap, and keep the redirects running for at least a year. Skip any one of those and rankings can reset instead of moving across.

A rebrand, a better name, a product outgrowing a subdomain. There are good reasons to change domain. Done carelessly, it can wipe out years of search traffic overnight.

We moved Total Football Studio, our own product, from a subdomain to its own domain, totalfootballstudio.com. Google accepted the Change of Address the same day. Here is the checklist we used.

## Before the move

### 1. Make a list of every URL

Export every page from your sitemap and from Search Console's pages report. This list is your redirect map. Anything missing from it will break.

### 2. Keep the same paths if you can

The simplest migration is one where only the domain changes and every path stays the same. Then one rule redirects everything correctly. Change the domain and the structure at the same time only if you must.

### 3. Set up the new domain in Search Console

Add and verify the new domain before you switch anything. Keep the old one verified too. Google needs both to process the move.

## On the day

### 4. Redirect page to page, permanently

Every old URL should send a **301 (permanent) redirect** to its exact equivalent on the new domain. Not to the homepage. Redirecting everything to the homepage tells Google the old pages are gone.

### 5. File the Change of Address

In Search Console, on the old property, use the Change of Address tool and pick the new domain. Google checks that your redirects work before accepting it.

### 6. Update everything that points at the old domain

- Canonical tags on every page
- Internal links in your content and navigation
- Your XML sitemap, and submit it in the new property
- Structured data, Open Graph tags and your robots.txt sitemap line
- Social profiles, email signatures, your app store listings and ad accounts

### 7. Do not forget the special files

If a verification file or other special page has to stay reachable on the old domain, add an exception so it is served instead of redirected. We kept the old domain's verification working on purpose, because Google re-checks it during the move.

## After the move

### 8. Keep the redirects for a long time

Google recommends keeping redirects for at least 180 days. We plan to keep ours permanently. Old links on other websites will keep sending visitors, and the redirect is what passes their value to the new domain.

### 9. Watch both properties

For the following weeks, watch indexing in the new property rise as the old one falls. Check for crawl errors and fix any URL that returns a 404.

### 10. Ask for your best backlinks to be updated

Redirects pass most of a link's value, but a direct link is better. Contact the sites that send you the most traffic and ask them to update the address.

## The checklist in one table

| Step | Done right looks like |
|---|---|
| URL list | Every page accounted for |
| Redirects | 301, page to page, never all to the homepage |
| Search Console | Both domains verified, Change of Address filed |
| Internal links and canonicals | All on the new domain |
| Sitemap | Updated and submitted to the new property |
| Old domain | Kept, verified and redirecting for a year or more |

## Frequently asked questions

### Will I lose SEO when I change my domain?

There is often a short wobble while Google processes the move. With page-to-page 301 redirects and a Change of Address, rankings generally carry over to the new domain.

### How long should I keep 301 redirects after a domain change?

At least 180 days, and ideally permanently. Removing them early cuts off the value of every old link.

### Should I redirect old pages to the homepage?

No. Redirect each page to its matching new page. Sending everything to the homepage is treated like the pages were deleted.

### Can I change domain and redesign at the same time?

You can, but it makes problems harder to trace. If possible, move the domain first and redesign later.

---

*See the full story in [the website, SEO and domain move case study](/case-studies/seo-website-build-domain-migration/). Planning a move or a rebrand? [Talk to us first](/contact/).*
`,
    author,
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    category: 'Tutorials',
    tags: ['SEO', 'Domain Migration', 'Google Search Console', 'Website'],
    featured: false,
    isPillar: true,
    image: '/blog/how-to-change-domain-without-losing-seo-rankings.png',
    readingTime: 7,
    keywords: 'change domain without losing seo, domain migration seo checklist, google search console change of address, 301 redirect new domain, how to move website to new domain, rebrand domain seo, site migration checklist, subdomain to domain migration',
    howTo: {
      name: 'How to change your domain without losing Google rankings',
      description: 'A step-by-step domain migration checklist using 301 redirects and Google Search Console.',
      steps: [
        { name: 'List every URL', text: 'Export every page from your sitemap and Search Console to build your redirect map.' },
        { name: 'Verify both domains', text: 'Add and verify the new domain in Search Console and keep the old one verified.' },
        { name: 'Redirect page to page', text: 'Send a 301 redirect from every old URL to its matching new URL.' },
        { name: 'File the Change of Address', text: 'Use the Change of Address tool on the old property and choose the new domain.' },
        { name: 'Update links and sitemaps', text: 'Update canonicals, internal links, structured data and submit the new sitemap.' },
        { name: 'Keep redirects running', text: 'Keep the old domain and its redirects for at least 180 days, ideally permanently.' },
      ],
    },
  },
  {
    slug: 'build-saas-mvp-and-ios-app-in-8-weeks',
    title: 'From Idea to Paid SaaS and iPhone App in 8 Weeks: What It Really Takes',
    description: 'How we took Total Football Studio from an empty folder to a web app, a native iPhone app and paid plans in eight weeks, and what any founder can copy from it.',
    content: `
# From Idea to Paid SaaS and iPhone App in 8 Weeks: What It Really Takes

**TL;DR:** We built Total Football Studio, a tactics app for football coaches, from the first line of code to paid plans in about eight weeks: a web app, a native iPhone and iPad app, team accounts, logins, emails and billing. Hundreds of coaches signed up in the first couple of weeks, all from organic content. The speed came from a few decisions, not from working around the clock.

Founders ask us the same question all the time: how long does it take to build a real product? Not a prototype. Something people sign up to, use, and pay for.

Here is an honest answer, with our own product as the example.

## The timeline

| When | What shipped |
|---|---|
| Week 1 | First line of code; the core: an animated tactics board in the browser |
| Weeks 2 to 3 | Web app and website live; hundreds of sign-ups from organic content |
| Weeks 4 to 6 | Native iPhone and iPad app built and launched on the App Store; the site moves to its own domain |
| Week 7 | Voice-over videos, live present mode and team invites |
| Week 8 | Comment-to-DM bot, then paid plans, a free trial, team seats and an affiliate programme |

## Five decisions that made it fast

### 1. Build the one thing that is new first

The only part of our product that did not exist anywhere was a tactics board that actually moves. So that came first, before logins, before payments, before the website. If the core does not work, nothing else matters.

### 2. Put real users on it in weeks, not months

We put the web app in front of coaches within the first couple of weeks. Their feedback decided what we built next. Every week without users is a week of guessing.

### 3. Use boring, proven building blocks

Logins, the database, file storage and real-time updates all run on Supabase. Payments run on Stripe. The website is plain, fast HTML. None of that is exciting, and that is the point: we spent our time on the product, not on rebuilding infrastructure.

### 4. Go native on mobile when it matters

We could have wrapped the website in an app. We wrote a real native app in SwiftUI instead, because the board has to feel smooth under a finger. It shares the same accounts and data as the web, so a coach's work is everywhere. It went from first line of Swift to the App Store in about two weeks.

### 5. Build the growth system alongside the product

Most products launch to silence because marketing starts after the build. Ours had an audience from day one: short videos made from code, a comment-to-DM bot, a website that ranks and an email series. The product launched into a crowd. [Here is how the content side works](/blog/how-we-got-30-million-organic-views-in-3-months/).

## What it costs to go faster

Speed has trade-offs, and it is better to know them up front:

- **Scope is ruthless.** Every feature has to earn its place. "Nice to have" waits.
- **You ship, then polish.** The first version of everything is plain. It gets better because users tell you what matters.
- **Safety is not optional.** Moving fast is no excuse for leaking data. We put strict access rules on the database from the start, and private data, like players' photos, stays private by default.

## What you can copy

1. Write down the one thing your product does that nothing else does. Build only that first.
2. Get it in front of ten real users as soon as it works at all.
3. Use proven services for logins, payments, email and hosting.
4. Start the audience before the launch, not after.
5. Add payments once people are using it regularly, not on day one.

## Frequently asked questions

### How long does it take to build a SaaS MVP?

For a focused product, a usable first version in a few weeks is realistic. Ours had real users within a couple of weeks and paid plans after about eight.

### Should I build a native app or a web app first?

Start where your users are. We started on the web for speed, then added a native app because our core feature needed to feel great on a touchscreen.

### What tech stack is fastest for a SaaS?

Proven building blocks: a managed database with logins built in, Stripe for payments, and a fast static website. Spend your time on what makes your product different.

### Do I need to raise money to build a SaaS?

Not necessarily. With a small, experienced team and a focused scope, a real product can be built and launched without a large budget.

---

*See every part of the build in [the Total Football Studio case study](/case-studies/total-football-studio/) and [the software case study](/case-studies/saas-product-development-web-and-ios-app/). Have a product idea? [Book a free call](/contact/).*
`,
    author,
    publishedAt: '2026-10-02',
    updatedAt: '2026-10-02',
    category: 'Business',
    tags: ['SaaS', 'MVP', 'iOS App', 'Startup'],
    featured: true,
    isPillar: true,
    image: '/blog/build-saas-mvp-and-ios-app-in-8-weeks.png',
    readingTime: 7,
    keywords: 'how long does it take to build a saas, build saas mvp, mvp development timeline, how to build a saas product, saas and ios app development, build an app in 8 weeks, startup mvp, swiftui app development, supabase stripe saas',
  },
]
