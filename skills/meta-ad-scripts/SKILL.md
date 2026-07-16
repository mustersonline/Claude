---
name: meta-ad-scripts
description: Write high-performing short-form video ad scripts for Meta (Facebook/Instagram Feed, Reels, Stories) — pure spoken-word voiceover/talking-head copy, no stage directions or scene descriptions. Use this skill whenever the user wants to write an ad script, video ad script, UGC script, hook, opening line for an ad, or any Meta/Facebook/Instagram ad copy — including requests like "schrijf een ad script voor...", "geef me hooks voor...", "ik heb een script nodig voor mijn product/dienst", or "hoe verkoop ik dit in een video-ad". Trigger even if the user doesn't say "Meta" or "script" explicitly but is clearly describing a product/service they want to advertise in short-form video. Built from research into what actually converts (hook mechanics, script structures, copywriting technique, named ad-creator practice) — not generic marketing-copy conventions.
---

# Meta video ad scripts

## What this produces

Pure spoken text for a short-form (15–60s) Meta video ad: what a person says, in the order they say it. Nothing else — no `[cut to product shot]`, no timestamps, no "(smiling)", no scene headings. Someone should be able to read the output straight into a camera or a voiceover mic with zero translation work.

Default output language is **Dutch**, written the way people actually talk — unless the user's own input is clearly in another language, or they explicitly ask for a different one. Match their register: if they write casual Dutch, write casual Dutch back into the script.

## Inputs

Required: the product or service.
Optional: the goal of the ad (cold conversion, retargeting/warm audience, brand awareness, app installs, leads, etc.) and any extra context (audience, price point, what's already been tried, tone preferences, proof points/results to use, duration target).

If the goal or audience isn't given, infer a sensible default from the product itself (a €30 impulse-buy physical product defaults to cold-conversion Feed/Reels; a B2B SaaS tool defaults to a considered, proof-led approach; a coaching offer defaults to identity/transformation framing) and say what you assumed so the user can correct it.

If no duration is specified, default to 30 seconds — it's the most universally usable Meta length.

## Why this works the way it does

Everything below is distilled from research into what actually moves performance on Meta specifically (see `references/research-notes.md` for the full source trail). Three things matter more than anything else, in this order:

1. **The hook decides almost everything.** Hook quality alone accounts for the majority of an ad's performance variance — far more than any other line in the script. This is why you always write 3 hooks from genuinely different angles, not 3 variations on one idea.
2. **Native beats polished.** Content that reads as a real person talking outperforms content that reads as "an ad" — polish and marketing language trip a viewer's ad-recognition instinct and they scroll past automatically. This is why every voice/tone rule below points toward sounding like a person, not a brand.
3. **Every sentence has to earn the next one.** Attention on short-form video is re-won every few seconds, not just once at the hook. A script that's technically correct but padded loses people in the middle even with a great opening.

## Core principles

Apply all of these to every script, regardless of structure chosen:

1. **Hooks first, hardest.** Spend more effort on the opening line than anywhere else in the script. Never open with a greeting, brand name, or throat-clearer ("Hoi, met...", "Wist je dat...", "Vandaag vertel ik over..."). The first words must already be the pattern interrupt.
2. **One hook mechanism per hook.** A hook is a question, OR a stat, OR a bold claim, OR a belief-flip — not a blend. Mixing mechanisms dilutes the interrupt.
3. **Specificity beats every vague claim.** A number, a timeframe, a named detail always outperforms a generic superlative. "3 keer per week" beats "regelmatig"; "binnen 10 dagen" beats "snel"; a real number beats "veel mensen". Once you commit to a specific number or detail anywhere in the script (including in a hook you didn't end up using as the opener), carry that exact number through consistently — don't let the body quietly soften it back into something vaguer ("een paar minuten" after a hook already promised "tien minuten" is a contradiction, not just a stylistic choice).
4. **Lead with emotion, not features.** People act on how something makes them feel (fear of missing out, relief, identity, belonging, curiosity) and justify it afterward with logic. State the feeling or the stakes before you state the mechanism.
5. **Match structure to audience and goal — never default to the same one.** A cold audience needs the problem named for them; a warm, skeptical audience needs a reason the standard fix failed them; a brand/retention goal needs a story, not a pitch. See `references/structures.md` and actually choose.
6. **Write like you talk to a friend, not like a brand communicating.** Contractions, short sentences, direct address (je/jij), active voice. If a sentence wouldn't survive being said out loud to someone in a bar, cut it or rewrite it. Watch specifically for **comma-separated feature or noun lists with no connecting words** ("Modellen, poses, achtergronden, ad creatives, precies zoals jij ze kiest" / "Een studio boeken, een model regelen, dagen wachten op..."). Nobody talks like that — it's written bullet-point copy that happens to be read aloud, not speech. A real person uses "en", "dan", "of" and finishes a thought before starting the next one. If a sentence has three or more commas strung together without a connective word, rewrite it as something you'd actually say.
7. **No jargon, no marketing language.** Anything that sounds like it came from a brand deck — "innovatief", "hoogwaardig", "de oplossing voor al uw behoeften" — gets deleted on sight. If a stranger would need the sentence explained to them, it's wrong.
8. **Cut ruthlessly.** Every single sentence must earn its place. After a first draft, read it back and ask of each sentence: does this move the viewer closer to caring, or is it just occupying time? If it's the latter, delete it — don't soften it, delete it. A tight 20-second script beats a padded 30-second one every time. This includes **recap or summary sentences that just restate something already said** ("Geen fotograaf, geen studio, geen wachttijd meer" after the script already described skipping the photographer and the studio) — repeating a point isn't reinforcement, it's the clearest sign a sentence didn't earn its place. If a sentence's only job is to remind the viewer of something two sentences back, cut it.
9. **One clear idea, one clear CTA.** Don't try to cover every feature or benefit. Pick the single strongest angle and go all in on it. The call to action is one concrete next step (a verb + a specific outcome), stated once, clearly, at the end — not a vague "meer weten" but "bestel nu je eerste doos" or equivalent.
10. **Every line has to land on a single listen.** No sentence should depend on a later sentence to make sense, and no meaning should live only in tone — someone hearing this once, with no visuals and no captions, has to get it.

Do NOT include stage directions, camera directions, timestamps, scene descriptions, or emotional direction in parentheses. Output is speech only.

## Workflow

1. **Clarify duration and goal** (ask only if genuinely ambiguous and it would change the approach materially — otherwise assume sensibly per "Inputs" above and state the assumption).
2. **Read `references/structures.md`** and pick the single best-fit structure for this product/audience/goal combination. State briefly (one line) which structure you picked and why — this is for the user's benefit, not part of the script itself.
3. **Read `references/hooks.md`** and write exactly 3 hooks, each from a genuinely different angle (e.g. one question-based, one bold-claim/stat-based, one belief-flip or secret-angle-based — never 3 variations on the same mechanism). Label them clearly (Hook 1 / Hook 2 / Hook 3) with a one-word tag for the angle used.
4. **Write the full script** using the chosen structure and the strongest of the 3 hooks (or note that any of the 3 can be swapped in as the opening line — they're built to be interchangeable openers for the same body).
5. **Check length against `references/pacing.md`** for the target duration and trim to fit the word-count range for that duration.
6. **Do a ruthless edit pass**: read the whole script aloud (mentally) and cut every sentence that isn't earning its place. Specifically check for: (a) any sentence that's really a comma-separated list of nouns/features with no connecting words — rewrite it as something a person would actually say; (b) any sentence that just restates a point already made earlier in the script — cut it; (c) any specific number or detail that got softened/changed between where it was first introduced and where it's used again — make it consistent. Check every principle in the list above one more time before delivering.

## Output format

For each request, deliver:

- **3 hooks**, each labeled with its angle, as standalone opening lines (a sentence or two each — not full scripts).
- **The structure chosen**, stated in one line with a short reason.
- **The full script**, as pure spoken text only — no headers inside the script itself, no labels like "Hook:" or "CTA:" inside the delivered script, just the words someone would say, start to finish, in speaking order. If the user asked for multiple durations or variants, produce each as its own separate script block.

Never pad the response with generic marketing commentary before or after the deliverable — get straight to the hooks and the script.

## Reference files

- `references/structures.md` — full structure catalogue with selection guidance (read every time to choose the structure)
- `references/hooks.md` — hook formula catalogue with example patterns (read every time to write the 3 hooks)
- `references/pacing.md` — word count and pacing targets per duration, plus Meta hook-rate/hold-rate benchmarks (read to check script length and pacing)
- `references/research-notes.md` — the underlying research this skill is built on, with sources (only needed if you want to trace a claim back to its origin or the user asks where a recommendation comes from)
