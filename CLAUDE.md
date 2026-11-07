# Cole for OK 86: saved campaign content (for 2028)

After the 2026 race, the site at **coleforok86.com** became a single farewell page. This file keeps
the written content from every page of the 2026 campaign site so it can be reused for 2028.
It holds content only, not code.

The full original site (HTML, CSS, JS and every image) is still in git history. The last
commit of the full multi-page site is `f60c891` ("Add Kituwah Press article coverage to news
section (#4)"). To restore any file: `git show f60c891:<path>` or
`git checkout f60c891 -- <path>`.

---

## Campaign basics

- **Candidate:** Hannah Cole (pronouns: she / hers)
- **Office:** Oklahoma House of Representatives, District 86 (Northeast Oklahoma)
- **Party:** Democrat. The 2026 opponent was incumbent Rep. David Hardin.
- **Campaign name:** Cole for OK 86
- **Slogan:** "Values over party."
- **Volunteer program name:** the **Dirt-road Collective**
- **Campaign tone (from the Meet page):** Bold. Welcoming. Honest.
- **Website:** https://coleforok86.com (custom domain set in the `CNAME` file)

## Contact details and social links

- **Mailing address:** P.O. Box 100, Rose, OK 74364
- **TikTok:** @coleforok86, https://www.tiktok.com/@coleforok86
- **Facebook:** Cole for OK 86, https://www.facebook.com/profile.php?id=61575354639890
- **Donations (ActBlue):** https://secure.actblue.com/donate/coleforok86
- **Google Analytics ID:** G-LELJ1FE73V
- **Legal disclaimer (footer):** "Authorized and paid for by Cole for OK 86"
- **Footer compliance line:** "Compliance: OK Ethics Commission"
- **Form intake endpoint (Google Apps Script)** used for the signup, contact and volunteer forms:
  `https://script.google.com/macros/s/AKfycbxgAcbkJ6ZXSZcYJN2NSvw8dXPzfHlNR5p3oFkwbQMfywlTH9q7TaznqMhdgA9HIYE/exec`
- **Comments widget:** HTMLCommentBox, page id `cole-for-ok-86-comments`
- **Events calendar:** an embedded Google Calendar titled "Cole Events" (America/Chicago time zone).
  Calendar source id (base64 in the embed URL):
  `NDE5NzNmMmJiN2I1N2YwZGNiZGI2NTI4NDA2NmEzOWVhYWFkZWI2OWYzMWFiYzk3ZDczZDRiNTk0MjE2ZmNlOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t`

## Site navigation (2026)

Home · Meet Hannah · Issues · Events · News · Comments · Get Involved · Contact · **Donate** (button
that linked to ActBlue)

Footer "Links" column: Meet Hannah · Get involved · Events · Contact

---

## Home (`index.html`)

- **Page title:** Hannah Cole for OK House 86 | Values Over Party
- **Meta description:** Hannah Cole for Oklahoma House District 86. Join the Dirt-road Collective.
  Volunteer, get updates, and stay involved.
- **Social share title / description:** "Hannah Cole for OK House 86" / "Join the Dirt-road
  Collective. Volunteer, get updates, and stay involved." (share image: `hannah-hero.jpg`)

### Hero
- **H1:** Cole for OK 86 / *Values over party.*
- **Tagline:** I'm Hannah Cole. I'm running for Oklahoma House District 86 to protect our rural
  way of life, strengthen practical access to care, and make sure our communities are heard at the
  Capitol.
- **Buttons:** "Join the Dirt-road Collective" (to Get Involved) · "Meet Hannah"
- **Signup form fields:** First Name, Last Name, Email, Phone, ZIP Code, then Submit
- **Form note:** No spam. Just campaign updates, events, and ways to help.
- **Photo:** `hannah-hero.jpg`

### You can be involved
Volunteering can look like many things, driving someone to knock doors, hosting a "get to know the
candidate" party, helping organize neighbors, or showing up at events. Any help is appreciated.
Tell us what you can do.

- **Grassroots fuel: Volunteer time.** Door knocking wins rural races. If you can knock, drive,
  host, call, text, or help gather folks, we can put your strengths to work. (Button: Volunteer)
- **Stay informed: Attend events.** Town halls, meet-and-greets, and fundraisers, come say hello,
  bring a neighbor, and ask what you want your representative to fight for. (Button: See events)

### What I'm fighting for
District 86 deserves practical leadership rooted in human decency, common sense, and justice,
focused on rural realities.

(Shown beside the `District86.png` map.)

- **Rural strength: Protect our land and way of life.** Keep Northeast Oklahoma livable, support
  conservation, responsible stewardship, and policies that respect rural communities and working
  families.
- **Care that works: Practical access to care.** Expand real access, especially in rural areas,
  so families can get care without unreasonable travel, delays, or financial strain.
- Button: Read the issues

### Upcoming events
Town halls, meet-and-greets, fundraisers, and community stops across District 86. Check the
campaign calendar for dates near you. (Button: View the calendar)

---

## Meet Hannah (`meet.html`)

- **Page title:** Meet Hannah | Cole for OK 86
- **Meta description:** Meet Hannah Cole, candidate for Oklahoma House District 86.
- **H1:** Meet Hannah
- **Intro:** I'm running because District 86 deserves a representative who shows up, listens, and
  fights for rural communities with common sense, human decency, and real work.

### My story: Why I'm running

My name is Hannah Cole. I was born at Hastings hospital in Tahlequah, and I was born and raised
just north of there in Rose, Oklahoma. I grew up on a small farm. My dad was a carpenter, and my
mom was a nurse. Many of my childhood days were spent on my grandparents' dairy farm, walking their
gardens, chasing (unlucky) chickens, and learning what it means to live close to the land.

I grew up riding horses, swimming in spring-fed creeks, looking for arrowheads (I've only found
one), and spending a lot of time outdoors. I've been a geriatric nurse for over a decade. I'm
happily married, and my husband and I look forward to starting a family one day.

Shortly after my father passed away in 2024, my husband and I decided to move back to my father's
land in Oklahoma. Since moving back to a rural environment, my need for community has grown. I have
a heightened awareness for the preservation of this land, the wildlife within it, and the knowledge
people hold alongside it.

Constituents of District 86 are the guardians of a beautiful landscape. Northeast Oklahoma is a gem
that deserves a representative committed to safeguarding what nature has endured since time
immemorial, and to giving voice to the values of the people who make up District 86.

I'm an average American. I work hard for what I have, just like the folks of District 86. I am not
perfect and I do not have all the answers, but what I do have is values. I believe in human
decency, common sense, and justice in our government.

This campaign will be rooted in the wisdom from our past, and it will grow with mindful strength
and cooperation for our future. I need a team of volunteers who can commit to helping me. It won't
be glamorous. It will be hard work. Door knocking will be the key to success, getting out into the
community and meeting constituents face to face.

(Button: Join the Dirt-road Collective)

### Quick facts (sidebar, with photo `hannah-meet.jpg`)
- **Pronouns:** She / Hers
- **Background:** Geriatric nurse (10+ years), raised rural, rooted in Northeast Oklahoma
- **Campaign tone:** Bold. Welcoming. Honest.
- Button: Read the issues
- **Campaign materials:** Need campaign photos, logos, or a short biography for an event or story?
  Contact the campaign and we'll send the right materials. (Button: Request materials)

---

## Issues (`issues.html`)

- **Page title:** Issues | Cole for OK 86
- **Meta description:** Hannah Cole's priorities for Oklahoma House District 86.
- **H1:** Issues
- **Intro:** This campaign is rooted in rural realities. These priorities are practical, local, and
  focused on what families in District 86 need from state government.

### What I'll fight for
**Priorities: District 86 priorities.** Hannah is focused on issues that affect daily life: access
to care, protecting rural land and water, strengthening local schools, and making government answer
to people instead of party politics.

1. **Protect rural land, water, and working families.** Defend the natural resources, farms, homes,
   and outdoor spaces that make Northeast Oklahoma livable for the next generation.
2. **Improve practical access to care.** Support rural clinics, nurses, emergency services, mental
   health access, and policies that reduce long drives and delays for basic care.
3. **Put community needs over party pressure.** Listen first, explain votes clearly, and focus on
   schools, roads, services, and household costs instead of political games.

### Calls to action
- **Not seeing your issue? Tell me what matters locally.** I'm not running to talk at you. I'm
  running to represent you. Send your priorities and real-world problems so I can focus on what
  matters in District 86. (Button: Send a message)
- **Join the team: Door knocking wins rural races.** This campaign is grassroots. The key is
  showing up, neighborhood by neighborhood, road by road. (Button: Join the Dirt-road Collective)

---

## Events (`events.html`)

- **Page title:** Events | Cole for OK 86
- **Meta description:** Fundraisers, town halls, and community events for Hannah Cole for OK House 86.
- **Social share description:** Town halls, fundraisers, and community stops across District 86.
- **H1:** Events
- **Intro:** I believe representation starts face-to-face. Below you'll find upcoming town halls,
  fundraisers, and community stops across District 86.

### Campaign calendar
All upcoming public events, fundraisers, town halls, and community stops, updated as the campaign
grows. (Embedded Google Calendar: month view on desktop, agenda view on phones. See the calendar id
above.)

### Where to meet me
The campaign is building a district-wide calendar around house parties, town halls, farm-shop
conversations, and community stops. Invite Hannah to your area or sign up to get the next public
date.

- **Host Hannah: Bring a conversation to your community.** Living rooms, barns, cafes, churches,
  shops, and community rooms all work. If you can gather neighbors, the campaign will help shape a
  simple event. (Button: Invite Hannah)
- **Get updates: Know when public events are scheduled.** Join the campaign list for town halls,
  meet-and-greets, volunteer days, and fundraisers across District 86. (Button: Get event updates)

### Host or help
- **Host an event: Get to know the candidate gatherings.** If you can gather neighbors, I'll show
  up and do the work. Living room, shop, barn, wherever people are comfortable meeting and talking.
  (Button: Host a gathering)
- **Volunteer: Help us build the calendar.** I need people who can help coordinate locations,
  spread the word, and make sure folks feel welcome when they show up. (Button: Join the Dirt-road
  Collective)

---

## News (`news.html`)

- **Page title:** News | Cole for OK 86
- **Meta description:** News and social media updates from Hannah Cole for Oklahoma House District 86.
- **H1:** News
- **Intro:** Press coverage and social updates from Hannah Cole for Oklahoma House District 86.

### Press coverage
1. **Kituwah Press:** "In House District 86, Democrat Hannah Cole Challenges Hardin on the Distance
   Between Home and a Doctor"
   - Summary: Kituwah Press profiled Hannah Cole's run for Oklahoma House District 86, where she is
     challenging incumbent Rep. David Hardin. The story looks at rural health care access across the
     district and how far families have to travel to see a doctor.
   - Link: https://www.kituwahpress.com/p/in-house-district-86-democrat-hannah
   - Image: `article-hannah-cole-kituwah.webp`
2. **Tahlequah Daily Press:** "Hannah Cole to run on District 86 Democratic ticket"
   - Summary: The Tahlequah Daily Press covered Hannah Cole's campaign for Oklahoma House District 86
     on the Democratic ticket.
   - Link: https://www.tahlequahdailypress.com/news/hannah-cole-to-run-on-district-86-democratic-ticket/article_a1fbe9e5-22d1-4770-94d4-a8c2e8cd1a93.html
   - Image: `article-hannah-cole-district86.png`

### Social Media
"Follow the campaign and watch recent updates from TikTok and Facebook." (Buttons: TikTok, Facebook)

**Embedded Facebook posts** (all from the campaign page, id 61575354639890). Post `story_fbid`s:
- pfbid02L8ExcMnjL3XrzLUZRRSNyQbuqyiUQGkuU6esqTNB9oQaaKw4B6RpZxFnEJ48vMpol
- pfbid0v73mcAGuxXNNsc7Xg2USdMgritaTVvZBjkLNq7gt71qTpbQ3bxtNJFdNex6UrVh7l
- pfbid02bGBWQqk4LBp5p8Mr5CFSciQ3q7x9gtiXuZVz2aTp4gxsEmgKJPUwKLnJ1fa3Q1sRl
- pfbid0D5uXD3NfRgkMEH4y7LkKohqEELaxtmokQ6b3Vi3siPqRfM3kzKsB1rEaYgyzapssl
- pfbid02hiSmHPDhrVrFucBSkRaGnfNr9G1tb4Wyu895FPhFohreSR8qkZLWdLbnUpewwdiBl
- pfbid025nsUrTWxjxhQ8KD2DB4g7Gcr1MadhRVihLznmLefWZeaGRWt87fcWaFLRHkZbCrl
- pfbid032kLifx5dp6X4WwedSumpeT4MJbVdEmCCxKisPK1fSsvnJmD8H7F4i4S9zZL6GNijl
- pfbid0iJxRieceedkdenLZSRHoAp8N5DnooXqoLSc9bkFpkDLihDfbN1Xfm8BfPt8DXnwCl
- pfbid02N4QDcyBUSh6YPGPiec2Lk1UbdvF96m8yJu4H4wahyLMDZ1XLK8jT7zKSg4QpnuTQl
- pfbid0hJ6JPQp8FxTDPbM5F8EH8uzidxTYd3HRCu256DbGdxEKkw5nQ6wGuQgypgpHTsuBl

Facebook reels: https://www.facebook.com/reel/857077284082889/ ·
https://www.facebook.com/reel/1680942893360963/

**Embedded TikTok videos** (https://www.tiktok.com/@coleforok86/video/ID), with their captions:
| Video ID | Caption |
|---|---|
| 7626463722071969055 | Cole for OK 86 |
| 7634721517879692574 | Cole for Ok 86. |
| 7633814056352156959 | It's always fun when someone knows where your from! |
| 7632891090114268446 | @Drake |
| 7632181378146127134 | Thanks to all who have volunteered and donated. I see you, you are appreciated. |
| 7631975186048273695 | Cole for OK 86. Yall, we've gotta vote for our values, not a for a party. @Drake |
| 7631803777598721311 | (no caption) |
| 7631065941354253599 | Cole for Ok 86. School vouchers. Thank you Adair Co Dems for your support. |
| 7630278754375453982 | Cole for OK 86. Values over party. |
| 7629078829612420383 | Cole for OK 86. |
| 7628681843952422174 | Cole for OK 86 |
| 7627648281421679903 | Cole for OK 86 @Drake |
| 7627173837045615902 | Cole for OK 86. |
| 7626779612634254622 | Cole for OK 86 |
| 7626490015589190942 | Candidate filing day at the OKC capitol. |

---

## Comments (`comments.html`)

- **Page title:** Comments | Cole for OK 86
- **Meta description:** Community comments and feedback for Hannah Cole for Oklahoma House
  District 86. Comments are moderated.
- **H1:** Comments
- **Intro:** I want to hear from you. Share your thoughts, concerns, or ideas for District 86.
  Comments are public and moderated, so please keep it respectful and avoid private information.
- **Prompt card** (Hannah Cole, badge "Campaign Prompt"): What's one thing you want your State
  Representative to fight for this year? I'm reading and replying to these, your input helps shape
  our priorities.
- **Prompt footnote:** Please keep comments respectful. Comments appear publicly after moderation,
  so do not include private information.
- Comment thread: HTMLCommentBox (see id above). The comments themselves were stored by
  HTMLCommentBox, not in this repository.

---

## Get Involved (`get-involved.html`)

- **Page title:** Get Involved | Cole for OK 86
- **Meta description:** Volunteer with Hannah Cole for Oklahoma House District 86. Join the
  Dirt-road Collective.
- **H1:** Get involved
- **Intro:** Join the **Dirt-road Collective**. This campaign is built the old-fashioned way, by
  showing up, listening, and doing the work. Door knocking will be the key to success, but there
  are many ways to help.

- **Grassroots means people: However you can help, it counts.** Volunteering can look like many
  things. Would you want to donate your time and drive someone to knock doors? Are you good at
  gathering folks? Maybe you could host a "get to know the candidate" party. Any help will be
  appreciated.
- **Field work: Door knocking + community presence.** Rural communities thrive when knowing your
  neighbors and lending a helping hand is commonplace. We're going to do this face-to-face,
  neighborhood by neighborhood, town by town.

### Volunteer signup
Tell us how you'd like to help. This form is the fastest way for the team to follow up.

- Fields: Full Name, Phone, Email, ZIP Code, "How would you like to help?" (Door knocking · Host
  an event · Phone or text banking · Driving or logistics · Whatever is needed), and a details box.
- Details box placeholder: Volunteering can look like many things. Would you want to donate your
  time and drive someone to knock doors? Are you good at gathering folks? Maybe you could host a
  'get to know the candidate' party. Any help will be appreciated. Please let me know what you're
  able to volunteer for.
- Form note: Note: Submissions are not public. A team member will follow up.
- Success message: Thank you for stepping up. A team member will follow up soon.

---

## Contact (`contact.html`)

- **Page title:** Contact | Cole for OK 86
- **Meta description:** Contact Hannah Cole for Oklahoma House District 86.
- **H1:** Contact
- **Intro:** No consultants. Real people. Tell me what your community is struggling with or
  excelling at. What should your elected state rep be doing to make our rural district better?

### Contact form
- Fields: Full Name, Email, Phone (optional), ZIP Code (optional), topic (Constituent concern ·
  Host an event · Volunteer question · Media or press · Other), Message.
- Message placeholder: Tell me what your community needs, what you're proud of, or what's being
  ignored.
- Form note: Note: Messages sent here go directly to the campaign.
- Success message: Message sent. Thank you.

### Sidebar
- **Mailing address:** P.O. Box 100, Rose, OK 74364
- **Want to host a gathering?** Living room, shop, barn, wherever people are. If you can gather
  neighbors, I'll show up.
- **Prefer to volunteer?** If you're ready to knock doors, drive, host, call neighbors, or help
  coordinate events, join the Dirt-road Collective. (Button: Get involved)

---

## Donate (`donate.html`)

- **Page title:** Donate | Cole for OK 86
- **Meta description:** Donate securely to Hannah Cole for Oklahoma House District 86 through ActBlue.
- **H1:** Donate
- **Intro:** Your contribution helps Hannah reach voters across District 86 with door knocking,
  events, signs, mail, and practical grassroots organizing.
- **Secure contribution: Donate through ActBlue.** Donations are processed securely by ActBlue. The
  button below opens the campaign's ActBlue contribution page in a new tab. (Button: Open ActBlue)
- **Prefer another way? Contact the campaign.** If the secure donation page does not open, or if
  you have a question about contributing, send the campaign a message and someone will follow up.
  (Button: Contact us)

---

## Images

| File | What it showed | Where it was used | Status |
|---|---|---|---|
| `images/hannah-hero.jpg` | Hannah standing in a dry winter field with bare trees and a small white shed behind her. She wears glasses, a white pinstripe vest over a sheer black blouse, and jeans, with her hands clasped. Landscape, 2675×1783. | Home hero, comments prompt avatar, social share image | **Kept** (farewell page photo) |
| `images/logo-display.png` | Vintage badge-style logo: an orange sunrise with rust-red rays over green hills and a winding blue river, with "COLE *for* OK86" in orange letters on slate blue. Portrait, 383×512. | Header logo and favicon | **Kept** |
| `images/hannah-meet.jpg` | Hannah smiling and leaning against a navy-blue barn door with white trim, same outfit as the hero photo, one hand in her pocket. Landscape, 2684×1789. | Meet Hannah sidebar | Deleted (in git history) |
| `images/District86.png` | Map of Oklahoma's state House districts in pastel colors, with District 86 in the northeast corner outlined in black. 673×371. | Home "What I'm fighting for" | Deleted (in git history) |
| `images/article-hannah-cole-kituwah.webp` | Hannah, hair up, in a white tank top and jeans, speaking and gesturing to seated residents at a community meeting. | News: Kituwah Press card | Deleted (in git history) |
| `images/article-hannah-cole-district86.png` | Black-and-white close-up headshot of Hannah smiling, with wavy hair and round glasses, against a wooden fence. | News: Tahlequah Daily Press card | Deleted (in git history) |

---

## Visual style (2026)

- **Look:** Rural, warm, "vintage sunrise" feel that matches the logo. Bold uppercase labels with
  wide letter spacing, rounded corners (10px), soft card shadows, and a short rust-colored rule
  under section headings.
- **Fonts:** The system sans-serif stack (system-ui, -apple-system, Segoe UI, Roboto, Arial). Heavy
  weights (800–900) for headings and labels. No web fonts were loaded.
- **Palette:**
  - Rust `#A6372D` (nav pills, heading underline)
  - Orange `#D97925` (main buttons)
  - Wheat `#E6B458` (secondary buttons, active nav, footer top border, focus outline)
  - Beige `#F2E3C9` (light page-top wash)
  - Espresso `#4A3728`
  - Pine `#1B2E28` (hero panel, dark green)
  - Moss `#4D6A47` (issue bullet dots)
  - Slate `#59748C`, Mist `#A8BCC2`
  - Ink `#0f1720` (body text), Cloud `#f1efe9` (alternating section background),
    Footer navy `#0b1420`, heading green `#22332C`
- **Layout:** The homepage had a 50/50 split hero (pine-green text panel on the left, photo on the
  right). On phones the photo came first and faded into green. Inner pages used centered section
  headings, two-column card grids and a dark navy footer.
