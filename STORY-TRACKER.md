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

Normal play randomizes which of the 11 scenarios you get. To deliberately
test one, append `?scenario=N` to the game's URL before starting a new
investigation (see the index below for N). This only affects which killer
gets picked — everything else plays normally. Existing saved investigations
are unaffected; the override only applies the moment a *new* random story is
rolled.

## Scenario index (killerIndex → `?scenario=N`)

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

## Cross-cutting / structural threads

Things that touch more than one scenario or the game's shared systems.

- **Diana's dual-scenario disambiguation.** Any NEW evidence added to
  either of her scenarios in the future must be gated on `killerMethod` as
  well as `killer: 'Diana Reyes'`, or it will leak into her other story.
  This is the one place in the data model where "same killer name" isn't
  enough to distinguish content.
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
