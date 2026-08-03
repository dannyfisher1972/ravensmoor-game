// Two tiers of question. BASE_QUESTIONS are offered to every suspect from
// the start (each character's answer lives in src/data/characters.js's
// META[name].answers, keyed by these ids).
//
// FOLLOWUPS only appear once their unlock condition is met — asking a
// specific base (or other followup) question of one NPC, or finding a
// specific piece of evidence, can surface a new, pointed question for a
// *different* NPC that references what was just learned. That's the "go
// back and ask them about it" mechanic: the game doesn't hand you the
// connection, asking the right question (or finding the right clue) does.
// `target` is who the new question appears for; `unlocksAfter` is either
// { npc, questionId } (that question must already be in ASKED_QUESTIONS) or
// { evidence: 'id' } (that id must already be in FOUND_EVIDENCE) — see
// RoomScene.js's isFollowupUnlocked. Answers for a followup live in the
// target's `answers` map too, keyed by the followup's own id.
//
// `contradiction: true` marks a followup whose Q&A already reads as two
// accounts not quite lining up — the notebook's Timeline view surfaces these
// under "Contradictions Noticed" once asked. Only tag ones that are true
// every game (same lines regardless of who the killer is this time), so
// this stays flavor/food-for-thought rather than a guilt tell.
export const BASE_QUESTIONS = [
  { id: 'alibi', text: 'Where exactly were you around 11 PM?' },
  { id: 'relationship', text: 'What was your relationship with Edmund really like?' },
  { id: 'suspicion', text: 'Is there anyone in this house you suspect?' }
];

export const FOLLOWUPS = [
  {
    id: 'confirm-victoria-stairs',
    target: 'Marcus Thorne',
    unlocksAfter: { npc: 'Victoria Thorne', questionId: 'alibi' },
    text: 'Victoria says she passed you on the stairs around eleven. Does that match what you remember?'
  },
  {
    id: 'confirm-priya-visit',
    target: 'Marcus Thorne',
    unlocksAfter: { npc: 'Priya Thorne-Kapoor', questionId: 'alibi' },
    text: 'Priya says you came to the greenhouse around half past ten, wanting to "talk business." What was that about?'
  },
  {
    id: 'dispute-julian-timing',
    target: 'Marcus Thorne',
    unlocksAfter: { npc: 'Julian Voss', questionId: 'alibi' },
    text: 'Julian says you left him around half past ten to "get some air." That\'s earlier than you told me.',
    contradiction: true
  },
  {
    id: 'confirm-argument-heard',
    target: 'Marcus Thorne',
    unlocksAfter: { npc: 'Harriet Voss', questionId: 'alibi' },
    text: 'Harriet and the butler both mention raised voices from the study around eleven. Was that the argument with your father?'
  },
  {
    id: 'ask-harriet-noises',
    target: 'Harriet Voss',
    unlocksAfter: { npc: 'Eleanor Pemberton', questionId: 'alibi' },
    text: 'Eleanor mentions hearing the study door around eleven. Did you hear anyone come or go?'
  },
  {
    id: 'confirm-nathaniel-library',
    target: 'Diana Reyes',
    unlocksAfter: { npc: 'Nathaniel Cole', questionId: 'alibi' },
    text: 'Nathaniel says you were both in the library working through the merger paperwork. Can you confirm that?'
  },
  {
    id: 'ask-eleanor-parlor',
    target: 'Eleanor Pemberton',
    unlocksAfter: { npc: 'Vivienne Thorne', questionId: 'alibi' },
    text: 'Vivienne says she was in the west parlor when the clock struck eleven. Does that match anything you noticed?',
    contradiction: true
  },
  {
    id: 'confirm-wren-eleanor',
    target: 'Eleanor Pemberton',
    unlocksAfter: { npc: 'Dr. Wren', questionId: 'alibi' },
    text: 'Dr. Wren says you came to wake him yourself, a little before midnight. Why go yourself instead of sending someone?'
  },
  {
    id: 'ask-vivienne-hearth',
    target: 'Vivienne Thorne',
    unlocksAfter: { evidence: 'EN-14' },
    text: 'The hearth in the west parlor was stone cold tonight — not even swept ash. If you were there the whole time, why no fire?',
    contradiction: true
  },
  {
    id: 'ask-eleanor-payment',
    target: 'Eleanor Pemberton',
    unlocksAfter: { evidence: 'E-53' },
    text: "There's a banker's note showing a large sum went from Edmund's account straight to you last month. What was that for?"
  },
  {
    id: 'ask-harriet-trunk',
    target: 'Harriet Voss',
    unlocksAfter: { evidence: 'E-66' },
    text: "Julian's been quietly pawning family pieces for over a year — watches, silver, even a violin. Did you know?"
  },
  {
    id: 'ask-priya-ledger',
    target: 'Priya Thorne-Kapoor',
    unlocksAfter: { evidence: 'E-65' },
    text: "Marcus has been siphoning small \"loans\" from the company for months, all in his own ledger. Does that surprise you?"
  },
  {
    id: 'ask-priya-cabinet',
    target: 'Priya Thorne-Kapoor',
    unlocksAfter: { evidence: 'E-57' },
    text: "There's a hidden ledger in the cabinet's second lock — every dose dispensed for the past year, in Edmund's own hand. Did you know he kept track that closely?"
  },
  {
    id: 'ask-nathaniel-toast',
    target: 'Nathaniel Cole',
    unlocksAfter: { evidence: 'E-64' },
    text: "There's a water-stained toast in the sideboard where Edmund names his intended heir outright, before it cuts off. Do you know which draft he'd actually settled on?"
  },
  {
    id: 'ask-vivienne-letters',
    target: 'Vivienne Thorne',
    unlocksAfter: { evidence: 'E-67' },
    text: "There's a locked curio cabinet full of old love letters — early in your marriage, by the look of them — that Edmund apparently kept all these years. Did you know he'd held onto those?"
  },
  {
    id: 'ask-priya-vial',
    target: 'Priya Thorne-Kapoor',
    unlocksAfter: { evidence: 'E-06' },
    text: "There's an empty foxglove vial in the poison cabinet — your cabinet. Who else could have gotten to it?"
  },
  {
    id: 'ask-wren-heart',
    target: 'Dr. Wren',
    unlocksAfter: { evidence: 'E-52' },
    text: "There's an unopened letter of yours in his room, warning him to slow down. In your professional opinion, could his heart really have just given out?"
  },
  {
    id: 'ask-diana-fire',
    target: 'Diana Reyes',
    unlocksAfter: { evidence: 'W-10' },
    text: 'The library fire was barely more than embers all evening. If you and Nathaniel really worked there past midnight in this weather, why let it die down?',
    contradiction: true
  },
  {
    id: 'confirm-groundskeeper-sighting',
    target: 'Tom Yarrow',
    unlocksAfter: { evidence: 'W-03' },
    text: 'Your account mentions someone crossing from the greenhouse to the garden door around eleven. Can you describe them at all?'
  },
  {
    id: 'ask-victoria-affair',
    target: 'Victoria Thorne',
    unlocksAfter: { evidence: 'E-15' },
    text: "There are love letters between you and Nathaniel, hidden in a hollow book — eighteen months' worth. Does Edmund's death have anything to do with that?"
  },
  {
    id: 'ask-nathaniel-affair',
    target: 'Nathaniel Cole',
    unlocksAfter: { evidence: 'E-15' },
    text: 'There are love letters between you and Victoria, hidden in a hollow book. Does that have anything to do with why Edmund is dead?'
  },

  // --- Beta 1.1 replayability pass -----------------------------------------
  // Five new follow-ups off clues that were already universal (present in
  // every one of the 37 scenarios) but had no conversation attached to them
  // yet. Not killer-aware and not guilt-tied — same reason the base
  // suspicion answers stay random-per-slot rather than guilt-linked (see
  // STORY-TRACKER.md's cross-cutting notes on that). These just give a
  // thorough replay more to discover, regardless of which scenario got
  // picked.
  {
    id: 'ask-diana-scorch',
    target: 'Diana Reyes',
    unlocksAfter: { evidence: 'E-10' },
    text: "There's a scorched page in the study hearth — burned down to just the initials \"K-V.\" Anything you'd like to explain about that?"
  },
  {
    id: 'confront-marcus-ledger',
    target: 'Marcus Thorne',
    unlocksAfter: { evidence: 'E-65' },
    text: "There's a petty cash ledger in your own toolbox — months of company \"loans\" in your handwriting, never repaid. Want to explain that?"
  },
  {
    id: 'ask-vivienne-music',
    target: 'Vivienne Thorne',
    unlocksAfter: { evidence: 'E-112' },
    text: "There's a waltz left open on the piano stand in the music room, with your own fingering notes in the margin. You still play?"
  },
  {
    id: 'ask-harriet-uniform',
    target: 'Harriet Voss',
    unlocksAfter: { evidence: 'E-115' },
    text: "There's a trunk in the attic with your husband's old uniform, kept all these years. Does he come up much, these days?"
  },
  {
    id: 'ask-wren-notes',
    target: 'Dr. Wren',
    unlocksAfter: { evidence: 'E-59' },
    text: 'Your case notes describe a weak heart, worsening for months. How close was he to the edge, medically speaking?'
  },

  // --- Replayability Phase 5 ------------------------------------------------
  // Six more follow-ups: two off other under-covered universal clues, three
  // off the shared poison-chain evidence (only reachable in poison-method
  // games, same as that evidence itself), and one that finally gives Marcus
  // a follow-up of his own rather than only being asked about secondhand.
  {
    id: 'ask-vivienne-sampler',
    target: 'Vivienne Thorne',
    unlocksAfter: { evidence: 'E-84' },
    text: "There's a hand-stitched sampler on the west parlor wall — six roses, one for each year it says it took. Did you stitch that yourself?"
  },
  {
    id: 'ask-vivienne-cold-hearth',
    target: 'Vivienne Thorne',
    unlocksAfter: { evidence: 'EN-14' },
    text: 'The west parlor hearth was stone cold tonight, not even fresh ash. If you were really there all evening reading by the fire, how were you not freezing?',
    contradiction: true
  },
  {
    id: 'confirm-tom-sighting-detail',
    target: 'Marcus Thorne',
    unlocksAfter: { npc: 'Tom Yarrow', questionId: 'alibi' },
    text: 'Tom mentions seeing someone slip between the greenhouse and the garden door around eleven. Any idea who that might have been?'
  },
  {
    id: 'ask-priya-key-habit',
    target: 'Priya Thorne-Kapoor',
    unlocksAfter: { evidence: 'E-73' },
    text: "There's a spare cabinet key hidden under a flowerpot by the greenhouse door. How long has that been common knowledge?"
  },
  {
    id: 'ask-diana-glass',
    target: 'Diana Reyes',
    unlocksAfter: { evidence: 'E-02' },
    text: 'There\'s a second glass in the potting shed with the same bitter residue as the vial. Does that surprise you?'
  },
  {
    id: 'ask-nathaniel-stain',
    target: 'Nathaniel Cole',
    unlocksAfter: { evidence: 'E-61' },
    text: "There's a dark stain by Edmund's place setting at dinner — could be wine, could be something else. Did anything seem off to you at the table?"
  }
];
