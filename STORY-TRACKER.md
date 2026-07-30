# Story Tracker — Ravensmoor Hall

Living doc for tracking narrative/story feedback from beta testing, kept
separate from code bugs (those belong in GitHub Issues, labeled `bug`).
Use this doc for anything that's a *writing* problem: a motive that doesn't
land, a clue that's confusing, a red herring that reads as real evidence, an
ending that falls flat — that kind of thing.

## Triage rule of thumb

- **Bug** (crash, wrong text rendering, broken gating, a clue that literally
  never appears): → GitHub Issues, label `bug`.
- **Story** (motive is weak, clue chain has a logic gap, red herring isn't
  actually ambiguous, pacing/tone issue): → this doc, under the relevant
  scenario section below.
- **Balance/UX** (too hard, too easy, confusing UI, unclear instructions):
  → GitHub Issues, label `ux` or `balance`.

If a beta note could be either a bug or a story problem, default to filing
it here first — it's cheaper to reclassify a doc entry than to lose a
narrative note in an issue tracker que.

## Testing specific scenarios directly

Normal play randomizes which of the 37 scenarios you get. To deliberately
test one, append `?scenario=N` to the game's URL before starting a new
investigation (see the index below for N). This only affects which killer
gets picked — everything else plays normally. Existing saved investigations
are unaffected; the override only applies the moment a *new* random story is
rolled.

## Scenario index (killerIndex → `?scenario=N`)

Every real suspect now has up to 4 possible methods — a different secret,
a different weapon, a different way the night could have gone — so no
single wound or object is ever a permanent tell for one person across
replays (see "Cross-cutting" below for the design rule this follows).
Entries 0–10 are the original set; 11–36 are the added second/third/fourth
stories for each character.

| N | Killer | Method | One-line motive |
|---|---|---|---|
| 0 | Priya Thorne-Kapoor | poison | Research funding pulled |
| 1 | Victoria Thorne | poison | Inheritance + affair with Nathaniel exposed |
| 2 | Marcus Thorne | blunt-force | Hidden trust cuts him out of the company |
| 3 | Vivienne Thorne | poison | Skimming the children's trust, about to be exposed to them |
| 4 | Harriet Voss | smothering | Ravensmoor Hall being sold out from under her |
| 5 | Julian Voss | staged-accident | Disinheritance + police report for theft, owes dangerous people |
| 6 | Diana Reyes | poison | Kessler-Vance dealings exposed; really about 30 years denied credit |
| 7 | Nathaniel Cole | tampered-medication | Embezzlement audit + the affair with Victoria |
| 8 | Eleanor Pemberton | poison | Not really a murder — Edmund asked her to do it |
| 9 | No One | none | Genuine accident (weak heart); no killer at all |
| 10 | Diana Reyes (Geneva) | blunt-force | Decades-old buried clinical trial data, blackmail leverage that stopped working |
| 11 | Priya Thorne-Kapoor | blunt-force | Edmund stole credit for her hybrid patent |
| 12 | Priya Thorne-Kapoor | stabbing | Forced into an arranged business marriage |
| 13 | Priya Thorne-Kapoor | strangulation | Caught selling seed stock to a rival lab |
| 14 | Victoria Thorne | strangulation | A secret prior marriage (bigamy) about to be exposed |
| 15 | Victoria Thorne | blunt-force | Forged a loan against the estate, caught |
| 16 | Victoria Thorne | stabbing | Protecting Nathaniel from disbarment/ruin |
| 17 | Marcus Thorne | poison | Gambling debts about to be read aloud publicly |
| 18 | Marcus Thorne | staged-accident | Threatened with a competency evaluation (unfit to inherit) |
| 19 | Marcus Thorne | strangulation | Drunken rage during the study argument |
| 20 | Vivienne Thorne | staged-accident | A paternity secret Edmund had just uncovered |
| 21 | Vivienne Thorne | smothering | Eviction from Ravensmoor entirely |
| 22 | Vivienne Thorne | stabbing | Publicly replaced by Edmund's new engagement |
| 23 | Harriet Voss | stabbing | Caught secretly selling family heirlooms |
| 24 | Harriet Voss | poison | An old personal scandal about to slip out |
| 25 | Harriet Voss | blunt-force | Property-sale argument escalated past words |
| 26 | Julian Voss | poison | A dangerous debt (loan sharks) needed cash that night |
| 27 | Julian Voss | blunt-force | Caught mid-theft, panicked |
| 28 | Julian Voss | stabbing | Confronted directly about the pawnshop thefts |
| 29 | Nathaniel Cole | blunt-force | An earlier forged will just discovered |
| 30 | Nathaniel Cole | poison | Threatened with public disbarment |
| 31 | Nathaniel Cole | strangulation | Edmund threatened to expose the affair to Victoria's husband |
| 32 | Diana Reyes | stabbing | A secret life-insurance policy on Edmund |
| 33 | Diana Reyes | strangulation | Double-crossing Kessler-Vance for a third rival firm |
| 34 | Eleanor Pemberton | asphyxiation | Fired after 26 years, no pension |
| 35 | Eleanor Pemberton | blunt-force | Embezzling to support a secret family |
| 36 | Eleanor Pemberton | fall | Blackmail dynamic reversed — she held leverage on the family |

---

## Per-scenario notes

Each section below carries forward the strengths/weaknesses identified in
the last full writer's-pass review, plus the changes already made as a
result. Beta notes go at the bottom of each section — add a dated bullet,
don't rewrite the summary above it.

### 0 — Priya Thorne-Kapoor
**Status:** Solid, functional, but structurally the "obvious suspect"
(botanist in a poisoning mystery). Added a reverse-misdirection clue (E-73,
spare cabinet key is common knowledge) so suspicion isn't exclusively hers
from the moment the vial is found.
**Watch for:** does the E-73 addition actually soften the "of course it's
her" read, or is it still too obvious once E-24/E-33 (killer-exclusive) turn up?
**Beta notes:**
-

### 1 — Victoria Thorne
**Status:** Strengthened this pass — the Nathaniel affair (E-15, always
visible once you've talked to him) is now woven into her actual motive
(E-69, the torn journal page) rather than sitting unresolved. Double motive
(money + infidelity exposed) is a good combo.
**Watch for:** the wife/girlfriend variance — confirm both versions of her
explanation read equally well.
**Beta notes:**
-

### 2 — Marcus Thorne
**Status:** One of the strongest — primal motive, distinctive method (only
true crime-of-passion in the set). Reworded the poker cleanup to read as
panicked, not calculated, to match a rage killing.
**Watch for:** nothing outstanding. Lowest-risk scenario in the set.
**Beta notes:**
-

### 3 — Vivienne Thorne
**Status:** Was the weakest link (embarrassment-level stakes for a murder
motive). Reworked so the "secret wealth" is revealed as skimmed from
Marcus/Priya's own inheritance trust — stakes are now "cast out by her own
children," not just financial. Added a new ledger clue (E-74) and corrected
her evidence list to credit the pre-existing hearth-tally clue (W-05) that
wasn't being counted.
**Watch for:** this is the most recently rewritten scenario — give it the
closest read for whether the new motive actually lands, since it hasn't had
a full playtest pass yet.
**Beta notes:**
-

### 4 — Harriet Voss
**Status:** One of the best in the set. Existential motive (losing her only
home), full three-part clue chain, distinct method (smothering, no
struggle). No changes recommended.
**Beta notes:**
-

### 5 — Julian Voss
**Status:** Good double motive (disinheritance + police report), but was
the most interchangeable with Marcus's "money trouble" story. Added a
detail about dangerous creditors to give him a distinct, immediate personal
stake beyond just losing an inheritance.
**Beta notes:**
-

### 6 — Diana Reyes (Kessler-Vance)
**Status:** Mechanically sound but was the most generic "corporate
betrayal" motive, especially next to her own alternate (Geneva) story.
Reworked around 30 years of being introduced as "associate" instead of
credited as co-founder — ties into her existing base dialogue line rather
than new lore.
**Watch for:** whether this version now reads as distinct enough from
scenario 10, given it's the same character.
**Beta notes:**
-

### 7 — Nathaniel Cole
**Status:** Excellent — tightest clue chain in the set (the scorched
library-fire fragments pay off a clue players will have already found
suspicious). Affair-with-Victoria integration gave him a second, personal
motive layered onto the embezzlement. Added a detail about what the money
actually funded (looking like he belonged among the family, not just
employed by them).
**Beta notes:**
-

### 8 — Eleanor Pemberton
**Status:** The most emotionally ambitious scenario — not a murder in the
usual sense, an assisted death by request. This is deliberate; don't
"fix" the ambiguity of the early payment clue (E-53) to make it read as
more obviously sinister, or it undercuts the reveal for the other 10 games
where she isn't the one who went through with it.
**Watch for:** player reactions to the moral complexity — some testers may
find a "no real villain" ending unsatisfying; that's useful signal, not
necessarily a problem to fix.
**Beta notes:**
-

### 9 — No One (the accident)
**Status:** Deliberately the thinnest scenario, evidence-wise — that's the
point (a negative-space mystery). Added a Dr. Wren follow-up (unlocked by
E-52) so the ending has a positive confirming beat instead of pure absence
of evidence.
**Watch for:** whether players feel cheated by a game with no killer at
all. Track how often this comes up in feedback — if it's frequent and
negative, that's a real signal to reconsider frequency, not the writing.
**Beta notes:**
-

### 10 — Diana Reyes (Geneva)
**Status:** Newest scenario, highest stakes in the set (a buried clinical
trial behind the company's founding patent, 30 years of blackmail leverage
finally failing). Pays off E-19 (a note that's a dead end in every other
scenario). Reworked the wound description so the killing reads as
deliberate/premeditated rather than a spontaneous, mid-conversation blow,
matching a calculating character who typed a threat note in advance.
**Watch for:** since she shares a killer name with scenario 6, confirm the
evidence never cross-contaminates between the two (this was fixed via
`killerMethod` qualifiers on her exclusive clues — worth a dedicated test
pass specifically checking this).
**Beta notes:**
-

---

### 11–36 — Second, third, and fourth stories for the existing cast

**Why these exist:** beta feedback flagged that the wound/weapon
description alone was enough to name the killer without gathering any
other evidence, once a player had seen a given character's one-and-only
method in an earlier game (e.g. "blunt force" always meant Marcus). Diana
already had two unrelated stories (Kessler-Vance / Geneva); this pass gives
every other real suspect the same treatment — up to 4 possible methods
each, so the crime-scene description is never a permanent tell for one
person.

**Status:** All 26 written and harness-verified (full evidence seeded per
scenario, evidence count matches total, correct accusation confirmed) —
see #11 (Priya/blunt-force), #20 (Vivienne/staged-accident, delayed
discovery), #36 (Eleanor/fall, delayed discovery), and a re-check of #2
(Marcus's *original* story, confirming the `killerMethod` retrofit below
didn't break it. Not every one of the 26 has had an individual full
playtest pass yet — spot-checked a representative sample across rooms,
methods, and the discoveryDelayed mechanic rather than all 26 individually.

**Design pattern used for all 26:**
- Each character's *original* motive clue (gated on `npc`, not `killer`)
  stays visible in every one of their stories — real people accumulate more
  than one real grievance over 4 variants, they don't swap secrets.
- Each character's existing alibi-break clue is reused as-is across all
  their stories — where someone claims to have been doesn't depend on
  which weapon they reached for, so it never needed a method-specific
  rewrite.
- Each new story adds exactly one new dedicated evidence hotspot combining
  the weapon *and* that story's specific motive-reveal in a single find,
  gated on both `killer` and `killerMethod`.
- `sceneNotes` (E-01/EN-06/EN-10) rewritten per method so the crime scene
  reads consistently with whatever actually happened that game.
- Poison-method variants (Marcus/17, Julian/26) reuse the existing shared
  poison-chain evidence (E-06/E-02/W-03) for free, same as the original 5
  poison killers — only their own "ties it to me" clue is new.

**Watch for:** whether 26 new stories in one pass feel tonally consistent
with the original 11 (deliberately written shorter/more economical — 2
explanation paragraphs instead of 3 — to manage the sheer volume; flag if
any read as thin rather than concise). Also watch for whether players
notice/appreciate the variety at all, versus just experiencing it as "huh,
different this time" without registering *why* — the whole point was
breaking the wound-equals-killer shortcut, so beta feedback specifically
asking "wait, does X always do Y?" (and getting "no" as the answer) is the
signal this worked.
**Beta notes:**
-

---

## Cross-cutting / structural threads

Things that touch more than one scenario or the game's shared systems.

- **Every real suspect now has multiple possible methods, not just
  Diana.** Any NEW evidence added to ANY character's story must be gated
  on `killerMethod` as well as `killer: 'X'` if it's method/weapon-specific
  (not just `killer` alone), or it will leak into that character's *other*
  stories. Retrofitted this onto all the original single-method killers'
  existing weapon clues (E-50, E-51, E-55, E-56, E-70, E-74, E-31, E-25,
  E-69, E-24, E-54, E-68, W-11) when their alternate stories were added —
  double-check this rule before adding a 5th story to anyone, or a 2nd to
  Priya/Victoria/Marcus/Vivienne/Harriet/Julian/Nathaniel/Eleanor beyond
  what's already there.
- **Alibi-break clues are the one thing that stays `killer`-only (no
  `killerMethod`).** Where someone claims to have been that night doesn't
  change based on which weapon they used, so these are deliberately shared
  across all of a character's stories (W-06, W-09, E-26, W-04, W-05, W-08,
  W-10, W-07, E-34, E-33). Don't add a `killerMethod` restriction to these
  unless the alibi story itself is genuinely method-specific.
- **Puzzle/cipher solvability.** The three numeric puzzles and the cipher
  system all rely on their hint clues being *always visible* (no
  `optional: true` gating) so they're guaranteed solvable every game. If a
  future edit moves a hint clue behind `requires`, double-check it can't
  end up permanently hidden.
- **Red herrings that don't self-resolve.** The recurring bug pattern this
  project has hit more than once: an ungated/optional clue that implicates
  someone with accusatory-sounding text but never resolves as innocent
  (Vivienne's sherry glass and book were the last confirmed instance,
  now fixed). If beta feedback says "the evidence pointed at the wrong
  person," check first whether it's this pattern before assuming it's a
  balance issue.
