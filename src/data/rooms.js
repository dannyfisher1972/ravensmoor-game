// Room definitions for the static-background point-and-click scene type.
//
// bgKey: the texture key for the room's background image (see BootScene for the asset list).
// hotspots and npcs: fx/fy are fractions (0..1) of the WHOLE screen, matched by eye against
//   each room's actual generated artwork — an object can sit anywhere in the image.
//   tint colors the identifying ring around an NPC's portrait badge. portraitKey points at a
//   loaded real photo (see BootScene); if that failed to load, RoomScene falls back to a
//   plain initial-letter badge instead of the photo.
// prevRoom/nextRoom: keys into this same object, used by the on-screen room-to-room nav.
// requires (optional, on a hotspot): gates a clue until ALL given conditions are met —
//   { npc: 'Full Name' } (that person must have been talked to), { evidence: 'id' }
//   (another hotspot must already be found), { killer: 'Full Name' } (only shows up when
//   that person is this game's randomized killer — see src/data/solutions.js),
//   { killerMethod: 'poison' } (only shows up when this game's method, per that same
//   SOLUTIONS entry, matches — used to gate the shared poison-only evidence so it doesn't
//   mislead players in a blunt-force/smothering/staged-accident/no-murder game), or
//   { victoriaStatus: 'wife' | 'girlfriend' } (only shows up when Victoria's randomized
//   relationship status this game matches — see state.js), or { optional: true } (only
//   shows up if state.js's isOptionalClueActive randomly rolled this id in for this story
//   slot — a 60% chance, rolled once and cached per slot. Reserved for pure atmosphere and
//   red herrings that are never load-bearing for solving the case, so replaying doesn't
//   always surface the exact same set of side details). RoomScene hides the marker
//   entirely until satisfied, so clues can surface progressively as the case unfolds.
//   A hotspot's `note` can be overridden per-scenario via SOLUTIONS[killerIndex].sceneNotes
//   (keyed by hotspot id) — used for E-01, EN-06, and EN-10 so the crime scene's wording
//   matches whatever actually happened this game, without needing separate art per method.
// implicates (optional, on a hotspot): the suspect(s) this clue points at — either a name
//   string or an array of names. Drawn as string-lines on the notebook's deduction board.
//   Omit it for atmospheric/neutral clues that don't point at anyone specific.
// redHerring (optional, on a hotspot): true if the clue's own note resolves it as a dead
//   end. Tagged distinctly in the notebook and drawn with a dashed, muted line on the board.
// puzzle + puzzleCode (optional, on a hotspot): marks it as a locked object. Clicking it
//   before it's found opens the numeric-keypad puzzle modal instead of the usual note;
//   entering puzzleCode correctly examines it normally from then on.
// pickup (optional, on a hotspot): marks it as a carryable item instead of a plain clue.
//   Clicking it shows its note once, adds its id to state.js's INVENTORY, and the marker
//   disappears from the room for good (it's in your pocket now, not lying around). Armed
//   from the inventory panel, then used by clicking an itemLock target elsewhere.
// itemLock (optional, on a hotspot, value: a pickup hotspot's id) + lockedNote: a target
//   that stays locked until the matching item is armed and clicked on it. Clicking it
//   locked shows lockedNote (a hint, doesn't mark it found); clicking it with the right
//   item armed disarms the item, marks it found, and shows the real `note` instead.
//
// The twelve rooms form a simple loop: study -> library -> westparlor -> bedroom ->
// drwrenroom -> kitchen -> diningroom -> musicroom -> grounds -> greenhouse -> juliansroom
// -> attic -> (back to study). Any room can reach any other by stepping through the loop;
// it doesn't need to be a full mesh to make the manor feel connected.
//
// `studyBody` is a separate close-up sub-scene, not part of the loop — clicking Edmund's
// body (E-01) in the study jumps here instead of showing an inline note, then both nav
// buttons lead back to the study. It's deliberately left out of ROOM_ORDER below so it
// doesn't count against the "visited every room" achievement or appear in room-count math;
// it's a closer look at a room already visited, not a new location.

export const ROOM_ORDER = [
  'study', 'library', 'westparlor', 'bedroom', 'drwrenroom',
  'kitchen', 'diningroom', 'musicroom', 'grounds', 'greenhouse', 'juliansroom', 'attic'
];

export const ROOMS = {
  study: {
    label: 'The Study',
    bgKey: 'bg-study',
    prevRoom: 'attic',
    nextRoom: 'library',
    hotspots: [
      {
        id: 'E-01',
        fx: 0.47,
        fy: 0.52,
        name: "Edmund's body",
        note: "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally, one loosely around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell on his breath that has nothing to do with the whisky decanter beside him."
      },
      {
        id: 'E-20',
        fx: 0.04,
        fy: 0.15,
        name: 'A hollowed-out book',
        note: 'Tucked inside: a scrap of paper reading "4 – 2 – 7 – _" and a note: "the last digit is Hymn 214\'s verse."',
        // Phase 7 — this puzzle's digits vary per story slot (see E-27's and
        // E-28's matching noteVariants/puzzleCodeVariants, all sharing
        // puzzleVariantGroup so the same variant index applies to all three
        // and the code always matches its own hints). Picked once via the
        // same pickDialogueVariant mechanism dialogue/method variants use —
        // independent of killer, so it's not a tell, just a fresh code.
        noteVariants: [
          'Tucked inside: a scrap of paper reading "4 – 2 – 7 – _" and a note: "the last digit is Hymn 214\'s verse."',
          'Tucked inside: a scrap of paper reading "6 – 1 – 8 – _" and a note: "the last digit is Hymn 214\'s verse."'
        ],
        puzzleVariantGroup: 'study-lock'
      },
      {
        id: 'E-10',
        fx: 0.16,
        fy: 0.63,
        name: 'Scorched paper in the hearth',
        note: 'Someone burned a page of handwritten notes here. The initials "K-V" are still legible.'
      },
      {
        id: 'EN-06',
        fx: 0.62,
        fy: 0.62,
        name: "Edmund's reading glasses, folded neatly",
        note: "He wasn't attacked — he set them down calmly. Whoever did this was someone he trusted enough not to react to."
      },
      {
        id: 'E-27',
        fx: 0.82,
        fy: 0.15,
        name: 'A hymnal, spine cracked open',
        note: 'Hymn No. 214, "Rock of Ages, Cleft for Me." This copy is worn soft at verse 3.',
        noteVariants: [
          'Hymn No. 214, "Rock of Ages, Cleft for Me." This copy is worn soft at verse 3.',
          'Hymn No. 214, "Rock of Ages, Cleft for Me." This copy is worn soft at verse 5.'
        ],
        puzzleVariantGroup: 'study-lock',
        requires: { evidence: 'E-20' }
      },
      {
        id: 'E-28',
        fx: 0.72,
        fy: 0.86,
        name: "A locked desk drawer",
        note: "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\"",
        puzzle: true,
        puzzleCode: '4273',
        puzzleCodeVariants: ['4273', '6185'],
        puzzleVariantGroup: 'study-lock'
      },
      {
        id: 'W-06',
        fx: 0.3,
        fy: 0.2,
        name: "Harriet's spectacles case",
        note: "Harriet swears she never left her room upstairs all night — yet her own spectacles case turned up here, in the study, of all places.",
        requires: { killer: 'Harriet Voss' },
        implicates: 'Harriet Voss',
        alibiBreak: true
      },
      {
        id: 'E-50',
        fx: 0.1,
        fy: 0.55,
        name: 'The fire poker, wiped clean',
        note: 'Wiped down and left back on its stand — but not well enough. A few dark flecks remain in the grip, and the curved iron hook at its tip is bent slightly out of true, like it struck something far harder than a log.',
        requires: { killer: 'Marcus Thorne', killerMethod: 'blunt-force' },
        implicates: 'Marcus Thorne'
      },
      {
        id: 'E-51',
        fx: 0.37,
        fy: 0.63,
        name: 'A tapestry cushion, out of place',
        note: "From the good parlor, tucked behind the desk as if someone hoped it wouldn't be noticed — a few pale gold threads pulled loose from its edge, snagged and drawn tight, as if it had been pressed hard against something for a while.",
        requires: { killer: 'Harriet Voss', killerMethod: 'smothering' },
        implicates: 'Harriet Voss'
      },
      {
        id: 'E-55',
        fx: 0.82,
        fy: 0.72,
        name: "A signet ring, its stone chipped",
        note: 'Wedged beneath the desk — the chip matches a scrape at Edmund\'s temple exactly.',
        requires: { killer: 'Julian Voss', killerMethod: 'staged-accident' },
        implicates: 'Julian Voss'
      },
      {
        id: 'E-56',
        fx: 0.41,
        fy: 0.66,
        name: "Edmund's heart tonic",
        note: 'Refilled just this week. Tested twice the strength it should have been.',
        requires: { killer: 'Nathaniel Cole', killerMethod: 'tampered-medication' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'I-01',
        fx: 0.65,
        fy: 0.75,
        name: "The desk's spare key",
        note: "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet.",
        // Phase 7B — upgraded from simple jitter to true relocation: a
        // different container (and matching note) each story slot, not just
        // a nudged pixel. The id, and therefore every downstream check
        // (INVENTORY, itemLock:'I-01' on E-57), stays identical regardless
        // of which variant is picked — only where the player finds it and
        // what it says about that spot change.
        relocationVariants: [
          { fx: 0.65, fy: 0.75, note: "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet." },
          { fx: 0.12, fy: 0.45, note: "A small brass key, tucked on the bookshelf behind a row of ledgers. It looks like it might fit the greenhouse cabinet." },
          { fx: 0.85, fy: 0.35, note: "A small brass key, left in a side-table dish by the window. It looks like it might fit the greenhouse cabinet." }
        ],
        pickup: true,
        icon: 'key-desk.png'
      },
      {
        id: 'E-75',
        fx: 0.45,
        fy: 0.12,
        name: 'A note tucked inside a book cover',
        note: "In Edmund's own hand, half a reminder to himself: \"Three back, always three back. Never could trust my own handwriting to keep a secret otherwise.\""
      },
      {
        id: 'E-78',
        fx: 0.2,
        fy: 0.35,
        name: 'A loose diary page, in the same private hand',
        note: 'More of the same looping nonsense: "LI VRPHWKLQJ KDSSHQV WR PH WKLV ZHHN ORRN FORVHU DW ZKR VWDQGV WR ORVH WKH PRVW." Whatever it says, it isn\'t written to be read easily.'
      },
      {
        id: 'E-79',
        fx: 0.53,
        fy: 0.82,
        name: 'That same page, read properly',
        note: '"IF SOMETHING HAPPENS TO ME THIS WEEK, LOOK CLOSER AT WHO STANDS TO LOSE THE MOST." Three letters back from what\'s written, same as his note said.',
        requires: { evidence: 'E-75' }
      },
      {
        id: 'E-98',
        fx: 0.9,
        fy: 0.55,
        name: 'A letter opener, the blade tarnished at the tip',
        note: "Wiped but not polished — a duller stain than tarnish clings near the point. A pawnshop ledger in Harriet's own hand lists years of quiet sales: her late husband's watch, a painting called a \"family heirloom\" at every holiday dinner, silver that was never really hers to sell. Edmund had only just found the ledger himself.",
        requires: { killer: 'Harriet Voss', killerMethod: 'stabbing' },
        implicates: 'Harriet Voss'
      },
      {
        id: 'E-100',
        fx: 0.25,
        fy: 0.85,
        name: 'A heavy book, its spine cracked at the corner',
        note: "Knocked from the shelf and left where it fell rather than replaced — the corner is freshly dented, deep enough to matter. The argument over the property sale, by every account, was the loudest anyone in the house could remember that night.",
        requires: { killer: 'Harriet Voss', killerMethod: 'blunt-force' },
        implicates: 'Harriet Voss'
      },
      {
        // Phase 7 — the Study previously had zero optional-pool content
        // (every non-killer-exclusive hotspot always appeared), making it
        // the single most "solved from memory" room in the house. Pure
        // atmosphere/red herring, same as EN-05/E-58/W-12/E-116 elsewhere —
        // not killer- or method-gated, so it carries no guilt information.
        id: 'E-120',
        fx: 0.55,
        fy: 0.3,
        name: 'A pipe, cold in the ashtray',
        note: "Marcus's brand, half-smoked — though he's never made a secret of sneaking a smoke indoors when Edmund wasn't looking, storm or no storm. Doesn't mean much on its own.",
        requires: { optional: true },
        redHerring: true,
        implicates: 'Marcus Thorne'
      },
      {
        id: 'E-127',
        fx: 0.3,
        fy: 0.75,
        name: "A half-finished crossword, folded into yesterday's paper",
        note: "Only three answers filled in, in a hand that isn't Edmund's. Nothing sinister — just someone's unfinished distraction from before all this began.",
        requires: { optional: true }
      }
    ],
    npcs: [
      {
        tint: 0xf2d9a0,
        name: 'Harriet Voss',
        portraitKey: 'portrait-harriet',
        fx: 0.95,
        fy: 0.15,
        line: '"I read until I fell asleep. This family, honestly — always something."',
        lineAlt: '"I dozed off somewhere in the middle of a chapter, same as most nights. This family never does make it easy to relax, though."'
      }
    ]
  },

  // A close-up sub-scene, not a real room — clicking Edmund's body (E-01) in
  // the study jumps here for a closer look instead of showing an inline note.
  // Deliberately left out of ROOM_ORDER (see the note up top). All hotspots
  // here are always visible; the specific detail found on him still varies
  // by scenario via SOLUTIONS[killerIndex].sceneNotes['EN-10'].
  studyBody: {
    label: "Edmund's Body",
    bgKey: 'bg-study-body',
    prevRoom: 'study',
    nextRoom: 'study',
    hotspots: [
      {
        id: 'EN-10',
        fx: 0.38,
        fy: 0.22,
        name: 'Edmund, up close',
        note: "You steel yourself and look closer."
      },
      {
        id: 'EN-11',
        fx: 0.28,
        fy: 0.63,
        name: 'The overturned teacup',
        note: 'Spilled across an unfinished letter, the ink already feathering into an unreadable stain. Whatever he was writing, it\'s gone now.',
        requires: { optional: true }
      },
      {
        id: 'EN-12',
        fx: 0.5,
        fy: 0.65,
        name: 'The blurred letter',
        note: '"...cannot go on pretending... after tonight, everyone will—" The rest has dissolved into the tea stain.',
        requires: { optional: true }
      },
      {
        id: 'EN-13',
        fx: 0.36,
        fy: 0.8,
        name: 'The stopped pocket watch',
        requires: { optional: true },
        note: "Its hands stopped at 11:52. Whatever happened, it happened fast enough that he never reached to check the time."
      }
    ],
    npcs: []
  },

  library: {
    label: 'The Library',
    bgKey: 'bg-library',
    prevRoom: 'study',
    nextRoom: 'westparlor',
    hotspots: [
      {
        id: 'E-15',
        fx: 0.14,
        fy: 0.35,
        name: 'Love letters, hidden in a hollow book',
        note: 'Correspondence between Victoria and Nathaniel — confirms an affair going back at least eighteen months.',
        requires: { npc: 'Nathaniel Cole' },
        implicates: ['Victoria Thorne', 'Nathaniel Cole']
      },
      {
        id: 'E-13',
        fx: 0.55,
        fy: 0.62,
        name: 'A rival buyout contract',
        note: 'Kessler-Vance Pharmaceuticals — signed with the initials "D.R." Diana was negotiating this in secret.',
        requires: { npc: 'Diana Reyes' },
        implicates: 'Diana Reyes'
      },
      {
        id: 'EN-05',
        fx: 0.68,
        fy: 0.35,
        name: 'A stopped grandfather clock',
        note: 'Stopped at an unrelated time. A genuine mechanical fault — this one means nothing.',
        redHerring: true,
        requires: { optional: true }
      },
      {
        id: 'E-30',
        fx: 0.87,
        fy: 0.8,
        name: "A private investigator's report",
        note: "Commissioned by Edmund's lawyer: proof that the \"alimony\" Vivienne has been quietly padding for a decade was never really alimony at all — it traces back to the trust meant for Marcus and Priya's inheritance. He meant to cut her off, and tell his own children exactly what she'd done, tonight.",
        requires: { npc: 'Vivienne Thorne' },
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'W-05',
        fx: 0.08,
        fy: 0.24,
        name: "Eleanor's hearth tally",
        note: "Her own nightly ledger of every fire laid in the house — the west parlor isn't on it. Vivienne claims she spent the whole night reading there by the fire.",
        requires: { killer: 'Vivienne Thorne' },
        implicates: 'Vivienne Thorne',
        alibiBreak: true
      },
      {
        id: 'E-74',
        fx: 0.6,
        fy: 0.46,
        name: 'A ledger page, torn and refolded',
        note: "Years of small transfers out of the children's trust, each one just under the amount that would have needed Marcus or Priya's signature to approve. Vivienne's own handwriting notes the running total in the margin, like she never once stopped keeping score.",
        requires: { killer: 'Vivienne Thorne', killerMethod: 'poison' },
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'E-40',
        fx: 0.9,
        fy: 0.2,
        name: 'A property sale prospectus',
        note: 'Ravensmoor Hall itself, quietly listed with a development firm. Edmund meant to announce the sale tonight — starting with the wing Harriet calls home.',
        requires: { npc: 'Harriet Voss' },
        implicates: 'Harriet Voss'
      },
      {
        id: 'E-44',
        fx: 0.3,
        fy: 0.85,
        name: 'A termination letter, drafted',
        note: 'Edmund intended to end the partnership publicly tonight, the moment he confirmed her secret dealings with Kessler-Vance. Thirty years, undone in a paragraph.',
        requires: { npc: 'Diana Reyes' },
        implicates: 'Diana Reyes'
      },
      {
        id: 'E-46',
        fx: 0.8,
        fy: 0.55,
        name: 'An audit clause, underlined in red',
        note: "Buried in the final will draft: an independent audit of every account Nathaniel has managed, to begin within the week.",
        requires: { npc: 'Nathaniel Cole' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'W-08',
        fx: 0.47,
        fy: 0.7,
        name: 'A brandy glass, poured but untouched',
        note: 'Left on the round table since before eleven. Odd, for a woman who claims to have worked steadily until nearly midnight.',
        requires: { killer: 'Diana Reyes' },
        implicates: 'Diana Reyes',
        alibiBreak: true
      },
      {
        id: 'W-10',
        fx: 0.14,
        fy: 0.7,
        name: 'The library fire, banked low',
        note: 'Barely more than embers all evening — an odd thing, if he and Diana truly worked here past midnight in this weather. Odder still that anything burned at all, if neither of them ever lit it.',
        requires: { killer: 'Nathaniel Cole' },
        implicates: 'Nathaniel Cole',
        alibiBreak: true
      },
      {
        id: 'E-70',
        fx: 0.24,
        fy: 0.58,
        name: 'Scorched fragments in the grate',
        note: "Barely anything left to read, but one line survives, in Edmund's own hand: \"...both the money and Nathaniel's — time he answered for—\" Someone fed this to the fire tonight, and didn't wait for it to catch properly first.",
        requires: { killer: 'Nathaniel Cole', killerMethod: 'tampered-medication' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'E-71',
        fx: 0.97,
        fy: 0.92,
        name: 'A typewriter, ribbon still fresh',
        note: "Tucked in the corner, its ribbon inked far more recently than any of her paperwork would explain. The crooked lowercase e matches, letter for letter, an anonymous note slipped under his door that afternoon: \"I know what you did in Geneva. Meet me at midnight or everyone learns.\" She sent her own partner a threat, in his own house.",
        requires: { killer: 'Diana Reyes', killerMethod: 'blunt-force' },
        implicates: 'Diana Reyes'
      },
      {
        id: 'E-72',
        fx: 0.6,
        fy: 0.75,
        name: 'A brass globe paperweight, out of place',
        note: "Edmund's, by the engraving on its base — it belongs on his desk in the study, anchoring correspondence, not tucked behind a shelf in here. Wiped clean, but the dent in one hemisphere tells its own story.",
        requires: { killer: 'Diana Reyes', killerMethod: 'blunt-force' },
        implicates: 'Diana Reyes'
      },
      {
        id: 'I-04',
        fx: 0.95,
        fy: 0.65,
        name: 'A tarnished luggage key',
        note: 'Wedged into the spine of an old atlas, like a bookmark someone forgot about.',
        relocationVariants: [
          { fx: 0.95, fy: 0.65, note: 'Wedged into the spine of an old atlas, like a bookmark someone forgot about.' },
          { fx: 0.15, fy: 0.5, note: 'Tucked into a drawer of the writing desk, half-hidden beneath old correspondence.' },
          { fx: 0.75, fy: 0.45, note: 'Left in a small dish on the side cabinet, forgotten among spare buttons and old stamps.' }
        ],
        pickup: true,
        icon: 'key-luggage.png'
      },
      {
        id: 'E-104',
        fx: 0.95,
        fy: 0.35,
        name: 'A heavy legal bookend, one corner freshly chipped',
        note: "Wiped down and set back on the shelf slightly askew. Beneath it, an earlier will — the original one, before the version everyone knows — with a signature Nathaniel forged himself, years before any audit was ever proposed. Edmund had only just noticed the mismatch in his own handwriting.",
        requires: { killer: 'Nathaniel Cole', killerMethod: 'blunt-force' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'E-105',
        fx: 0.75,
        fy: 0.9,
        name: 'A brandy glass, rinsed but not quite clean',
        note: "Rinsed in a hurry, but a faint bitter film still clings to the rim — the same grey residue as the empty vial in the greenhouse. Nathaniel's own glass, kept close at hand in the library he never really left that night. A letter drafted to the bar association sits beneath the blotter — Edmund meant to have Nathaniel disbarred publicly rather than settle anything quietly, whatever it cost the family's own reputation.",
        requires: { killer: 'Nathaniel Cole', killerMethod: 'poison' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'E-106',
        fx: 0.35,
        fy: 0.15,
        name: 'A length of curtain cord, one end frayed',
        note: "Cut down from its usual place at the tall window. Edmund's own notes, half-burned in the grate, threatened to tell Victoria's husband — whichever one counted at the time — everything, ruining her and Nathaniel both in the same breath.",
        requires: { killer: 'Nathaniel Cole', killerMethod: 'strangulation' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'E-107',
        fx: 0.48,
        fy: 0.9,
        name: "A letter opener from Diana's own desk, wiped clean but for one last smear",
        note: "The only thing in this library actually pointed and sharp. Beneath the blotter it sat on: an insurance policy taken out on Edmund's life years ago, naming Diana sole beneficiary and never once mentioned to Edmund directly. The company's fortunes had been sinking quietly for two years — long enough that the payout was worth more than the partnership itself.",
        requires: { killer: 'Diana Reyes', killerMethod: 'stabbing' },
        implicates: 'Diana Reyes'
      },
      {
        id: 'E-108',
        fx: 0.05,
        fy: 0.85,
        name: "A braided cord from the reading lamp's pull-switch, snapped clean",
        note: "Gone from the lamp on Diana's own side of the library, never replaced. Tucked behind the same lamp: a telegram, torn in half, from a firm neither Edmund nor Kessler-Vance had ever done business with — a third company entirely, one Diana had been quietly feeding both of her partners' secrets to, playing every side against the other for a payout bigger than any single deal alone. Edmund had only just pieced together whose interests she was actually serving.",
        requires: { killer: 'Diana Reyes', killerMethod: 'strangulation' },
        implicates: 'Diana Reyes'
      },
      {
        id: 'E-125',
        fx: 0.4,
        fy: 0.3,
        name: 'A pressed flower, forgotten between two pages',
        note: "Long since faded to brown, tucked in a book no one's opened in years. Some sentimental keepsake of nobody's in particular, going by the dust on the shelf around it.",
        requires: { optional: true }
      },
      {
        id: 'E-128',
        fx: 0.45,
        fy: 0.55,
        name: 'A bundle of unopened correspondence, tied with string',
        note: "Addressed to Edmund, postmarked over a year ago and never opened. Whatever this was, it stopped mattering to him a long time before tonight.",
        requires: { optional: true }
      }
    ],
    npcs: [
      {
        tint: 0xd9b75a,
        name: 'Nathaniel Cole',
        portraitKey: 'portrait-nathaniel',
        fx: 0.25,
        fy: 0.15,
        line: '"I\'ve drafted this family\'s wills more times than I care to count. I never once expected to need an alibi for one of them."',
        lineAlt: '"Redrafting his will has been half my job for over a decade. Needing my own alibi over it is a new experience entirely."'
      },
      {
        tint: 0x8fb49a,
        name: 'Diana Reyes',
        portraitKey: 'portrait-diana',
        fx: 0.75,
        fy: 0.22,
        line: '"Edmund and I disagreed about the direction of the company. That\'s Tuesday, not motive."',
        lineAlt: '"Edmund and I argued about the company more often than either of us cared to admit. Doesn\'t make it a reason to kill him."'
      },
      {
        tint: 0xc76b4a,
        name: 'Vivienne Thorne',
        portraitKey: 'portrait-vivienne',
        fx: 0.5,
        fy: 0.12,
        line: '"Edmund and I had our differences, but I never once wished this on him — whatever the rest of this house might prefer to believe."',
        lineAlt: '"Whatever this house wants to believe about me and Edmund, I never once wanted him gone. We simply disagreed, same as always."'
      }
    ]
  },

  // The room Vivienne claims to have spent the whole night in. Nobody's
  // stationed here — that's the point. It's a room you visit to check her
  // story against what's actually here, not to talk to anyone.
  westparlor: {
    label: 'The West Parlor',
    bgKey: 'bg-westparlor',
    prevRoom: 'library',
    nextRoom: 'bedroom',
    hotspots: [
      {
        id: 'EN-14',
        fx: 0.32,
        fy: 0.7,
        name: 'The cold hearth',
        note: "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire."
      },
      {
        id: 'EN-15',
        fx: 0.66,
        fy: 0.32,
        name: 'The grandfather clock',
        note: "Reads a few minutes past eleven. Slow, maybe — but it's kept the same time all night, near as anyone can tell.",
        requires: { optional: true }
      },
      {
        id: 'E-58',
        fx: 0.75,
        fy: 0.85,
        name: 'A glass of sherry, one sip taken',
        note: "Poured hours ago and barely touched — but then, Vivienne's never been much of a drinker, whatever the hour. Just habit, not evidence.",
        requires: { optional: true },
        redHerring: true,
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'W-12',
        fx: 0.88,
        fy: 0.82,
        name: 'The open book, spine barely creased',
        note: "Untouched enough that the spine's hardly bent — but she's always been someone who keeps a book nearby more for effect than for reading. Same on any given night.",
        requires: { optional: true },
        redHerring: true,
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'E-67',
        fx: 0.05,
        fy: 0.58,
        name: 'A locked curio cabinet',
        lockedNote: "An old habit of Edmund's, apparently — keeping some things under lock and key even in a room he rarely used.",
        note: "Inside: a bundle of old letters, tied with ribbon, in a young man's handwriting nothing like Edmund's careful hand in his later years. Whatever this marriage became, it started somewhere — and Vivienne was never quite as replaceable to him as she liked to claim.",
        itemLock: 'I-05'
      },
      {
        id: 'E-83',
        fx: 0.2,
        fy: 0.68,
        name: 'A faded ticket stub',
        note: 'Tucked behind a cushion, half the ink gone: "2 – 0 – _ – 7." A keepsake of some kind, going by the box it was found next to.',
        // Phase 7B — unlike Study/Dr. Wren's Room, this hotspot's note is
        // ALSO overridden per-scenario by every one of the 37 entries in
        // solutions.js's sceneNotes (the Universal Clue Variation system),
        // so a plain noteVariants swap would silently erase that method-
        // category flavor. The digit-bearing PREFIX is identical across
        // every single scenario/category, though (only the trailing
        // sentence after it varies) — verified across all 37 entries before
        // relying on this — so resolveNote does a targeted substring
        // replace on just that prefix, leaving whatever category suffix is
        // active completely untouched.
        prefixVariants: [
          'Tucked behind a cushion, half the ink gone: "2 – 0 – _ – 7." A keepsake of some kind, going by the box it was found next to',
          'Tucked behind a cushion, half the ink gone: "3 – 1 – _ – 8." A keepsake of some kind, going by the box it was found next to'
        ],
        puzzleVariantGroup: 'westparlor-lock'
      },
      {
        id: 'E-84',
        fx: 0.47,
        fy: 0.18,
        name: 'A hand-stitched sampler',
        note: 'On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish.',
        prefixVariants: [
          'On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish.',
          'On the wall, a little uneven with age: four roses stitched round the border, one for each year the room says it took to finish.'
        ],
        puzzleVariantGroup: 'westparlor-lock'
      },
      {
        id: 'E-85',
        fx: 0.42,
        fy: 0.85,
        name: 'A locked keepsake box',
        note: "A small photograph inside, corners worn soft from handling — Vivienne, decades younger, laughing at something just out of frame. Whatever this marriage became, someone kept this all the same.",
        puzzle: true,
        puzzleCode: '2067',
        puzzleCodeVariants: ['2067', '3148'],
        puzzleVariantGroup: 'westparlor-lock'
      },
      {
        id: 'E-95',
        fx: 0.95,
        fy: 0.92,
        name: 'A hospital record, decades old, tucked behind a loose floorboard',
        note: "A birth record from a clinic two counties over, dated years before Marcus was born officially — the father's name left blank. Caught on the same mantel corner that left its mark on Edmund's temple: a single strand of unmistakably red hair. Edmund had only just found the record, and meant to tell his own children the truth about their parentage that very night, whatever it cost the family name.",
        requires: { killer: 'Vivienne Thorne', killerMethod: 'staged-accident' },
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'E-96',
        fx: 0.15,
        fy: 0.85,
        name: "An eviction notice, drafted in Edmund's hand",
        note: "Dated for the end of the month — Vivienne, out of Ravensmoor entirely, no more rooms kept ready for her, no more claim on the only home she has left. He meant to have it delivered the morning after his birthday.",
        requires: { killer: 'Vivienne Thorne', killerMethod: 'smothering' },
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'E-97',
        fx: 0.6,
        fy: 0.65,
        name: "A letter opener from the parlor's own writing desk",
        note: "Wiped down, but for a last dark fleck near the tip. Beneath the settee cushion nearby: a crumpled save-the-date card, Edmund's own engagement announcement — to someone else, someone younger, someone the papers would love. Vivienne was never invited to expect it. Being replaced financially was one thing. Being replaced entirely, in front of everyone who still remembered her as his wife, was another.",
        requires: { killer: 'Vivienne Thorne', killerMethod: 'stabbing' },
        implicates: 'Vivienne Thorne'
      }
    ],
    npcs: []
  },

  bedroom: {
    label: "Edmund's Bedroom & Desk",
    bgKey: 'bg-bedroom',
    prevRoom: 'westparlor',
    nextRoom: 'drwrenroom',
    hotspots: [
      {
        id: 'E-12',
        fx: 0.72,
        fy: 0.68,
        name: 'An unsigned divorce petition',
        note: 'Dated the day of his death. Whoever inherits as his widow only does so because he never got to sign it.',
        requires: { npc: 'Victoria Thorne', victoriaStatus: 'wife' },
        implicates: 'Victoria Thorne'
      },
      {
        id: 'E-29',
        fx: 0.72,
        fy: 0.68,
        name: "A will Edmund never updated",
        note: "It still names his first wife's trust as sole beneficiary — not her. Never updated after the divorce, apparently. As his girlfriend, she stood to inherit nothing at all, unless that changed before he died.",
        requires: { npc: 'Victoria Thorne', victoriaStatus: 'girlfriend' },
        implicates: 'Victoria Thorne'
      },
      {
        id: 'E-11',
        fx: 0.85,
        fy: 0.65,
        name: 'A draft will naming a hidden trust',
        note: 'It quietly redirects every controlling share away from Marcus — drafted years ago, but updated just last month. He was going to lose the company tonight, not inherit it.',
        requires: { npc: 'Victoria Thorne' },
        implicates: 'Marcus Thorne'
      },
      {
        id: 'E-25',
        fx: 0.48,
        fy: 0.42,
        name: 'A crushed foxglove petal',
        note: "On her dressing table, of all places — gardening was never her hobby. That's Priya's domain, not hers.",
        requires: { killer: 'Victoria Thorne', killerMethod: 'poison' },
        implicates: 'Victoria Thorne'
      },
      {
        id: 'E-19',
        fx: 0.09,
        fy: 0.86,
        name: 'An anonymous typed note',
        note: '"I know what you did in Geneva. Meet me at midnight or everyone learns." Slipped under his door that afternoon.',
        requires: { optional: true }
      },
      {
        id: 'E-34',
        fx: 0.04,
        fy: 0.35,
        name: 'A packet of headache powder, unopened',
        note: 'Eleanor left it on her nightstand that morning, same as always. Victoria claims she came up here with a wretched headache — she never touched it.',
        requires: { killer: 'Victoria Thorne' },
        implicates: 'Victoria Thorne',
        alibiBreak: true
      },
      {
        id: 'E-69',
        fx: 0.68,
        fy: 0.48,
        name: "A torn page from Edmund's journal",
        note: "Half a sentence, the rest torn away: \"...Nathaniel, of all people. After this long, I should have expected — no more waiting.\" Dated three days ago. Whatever he'd only just learned, it didn't wait for morning.",
        requires: { killer: 'Victoria Thorne', killerMethod: 'poison' },
        implicates: 'Victoria Thorne'
      },
      {
        id: 'E-52',
        fx: 0.07,
        fy: 0.42,
        name: "Dr. Wren's letter, unopened",
        note: 'A stern warning about his heart, delivered days ago and never read — he\'d been told to slow down for weeks.',
        requires: { killer: 'No One' }
      },
      {
        id: 'I-05',
        fx: 0.93,
        fy: 0.58,
        name: 'A small iron curio key',
        note: "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\"",
        relocationVariants: [
          { fx: 0.93, fy: 0.58, note: "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\"" },
          { fx: 0.2, fy: 0.5, note: "Slipped inside the nightstand drawer, labeled in faded ink: \"V's cabinet.\"" },
          { fx: 0.6, fy: 0.3, note: "Left on top of a stack of books by the window, labeled in faded ink: \"V's cabinet.\"" }
        ],
        pickup: true,
        icon: 'key-curio.png'
      },
      {
        id: 'E-76',
        fx: 0.3,
        fy: 0.6,
        name: 'A diary page, written in a private hand',
        note: 'Rows of looping script that refuse to make sense: "HYHUB RQH RI WKHP KDV D UHDVRQ WRQLJKW. L KDYH VWRSSHG SUHWHQGLQJ QRW WR VHH LW." Some kind of code, maybe — or he\'d finally lost his mind.'
      },
      {
        id: 'E-77',
        fx: 0.15,
        fy: 0.72,
        name: 'The same page, read properly',
        note: '"EVERY ONE OF THEM HAS A REASON TONIGHT. I HAVE STOPPED PRETENDING NOT TO SEE IT." Once you know the trick, it reads plain as day.',
        requires: { evidence: 'E-75' }
      },
      {
        id: 'E-89',
        fx: 0.95,
        fy: 0.25,
        name: 'A silk sash, one end frayed',
        note: "Missing from her own dressing gown, the tie replaced with a plain ribbon so the gap wouldn't show. Beneath her jewel case, folded small: a marriage certificate from years before she ever met Edmund — a husband she told no one about, one Edmund had only just tracked down proof of. He meant to have the marriage annulled and her name dragged through every paper in the county.",
        requires: { killer: 'Victoria Thorne', killerMethod: 'strangulation' },
        implicates: 'Victoria Thorne'
      },
      {
        id: 'E-90',
        fx: 0.5,
        fy: 0.55,
        name: "Her silver hand mirror, the handle cracked",
        note: "Wiped clean and set back on the vanity, a hairline crack running the length of the handle. Tucked in its case: a loan document against the estate, Edmund's signature forged competently enough to nearly pass — nearly. He'd only just noticed the forgery himself, and meant to have her accounts frozen by morning.",
        requires: { killer: 'Victoria Thorne', killerMethod: 'blunt-force' },
        implicates: 'Victoria Thorne'
      },
      {
        id: 'E-91',
        fx: 0.9,
        fy: 0.85,
        name: 'A hatpin, its long steel shaft bent out of true',
        note: "Not the sort of thing that bends on its own — and long enough, sharpened enough, to have done exactly what it looks like it did. Beside it, a note in Edmund's hand naming Nathaniel outright — not just the affair, but a formal complaint to the bar association, drafted and ready to send. Whatever she was willing to risk for herself, she wasn't willing to let Edmund take Nathaniel down with her.",
        requires: { killer: 'Victoria Thorne', killerMethod: 'stabbing' },
        implicates: 'Victoria Thorne'
      },
      {
        id: 'E-126',
        fx: 0.25,
        fy: 0.2,
        name: 'A framed photograph, slightly askew on the wall',
        note: "An old family portrait, the frame knocked a little crooked — dusted around recently, unlike the rest of the room. Probably nothing more than someone straightening up.",
        requires: { optional: true }
      },
      {
        id: 'E-129',
        fx: 0.4,
        fy: 0.75,
        name: 'A pressed corsage, kept in a drawer',
        note: "Long dried, tied with a faded ribbon. Could be from any occasion in forty years of marriages and mistresses in this house. Impossible to say whose it was, or why it's still here.",
        requires: { optional: true }
      }
    ],
    npcs: [
      {
        tint: 0xe6a9d9,
        name: 'Victoria Thorne',
        portraitKey: 'portrait-victoria',
        fx: 0.82,
        fy: 0.22,
        line: '"Edmund and I said our goodnights same as any other evening. I still can\'t quite believe I\'m being asked to account for what came after."',
        lineAlt: '"We said goodnight the same as every other evening, nothing more. I still haven\'t quite absorbed that I\'m the one being questioned about it."'
      }
    ]
  },

  // Referenced constantly (Eleanor called him, his letter turns up as
  // evidence) but never seen — until now. His room is equal parts sickroom
  // and study: a patient bed, a medical bag, and case notes that finally
  // give Edmund's real health a voice of its own, independent of whichever
  // scenario this game rolled.
  drwrenroom: {
    label: "Dr. Wren's Room",
    bgKey: 'bg-drwrenroom',
    prevRoom: 'bedroom',
    nextRoom: 'kitchen',
    hotspots: [
      {
        id: 'E-59',
        fx: 0.4,
        fy: 0.72,
        name: "Dr. Wren's case notes",
        note: "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\""
      },
      {
        id: 'E-60',
        fx: 0.56,
        fy: 0.63,
        name: 'Edmund\'s actual prescription',
        note: "The correct dosage, recorded here in Dr. Wren's own hand — half of what was found in the bottle on Edmund's desk. Someone changed it after it left this room.",
        requires: { killerMethod: 'tampered-medication' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'I-02',
        fx: 0.82,
        fy: 0.62,
        name: "A brass key, tagged \"Dining Rm. Sideboard\"",
        note: "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like.",
        relocationVariants: [
          { fx: 0.82, fy: 0.62, note: "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like." },
          { fx: 0.25, fy: 0.5, note: "Tucked in a drawer of the medical cabinet, tagged same as always — Eleanor's doing, most likely, physicians keeping late hours get given odd keys, for medicinal brandy and the like." },
          { fx: 0.6, fy: 0.75, note: "Left on a side table by the window, tagged same as always — Eleanor's doing, most likely, physicians keeping late hours get given odd keys, for medicinal brandy and the like." }
        ],
        pickup: true,
        icon: 'key-sideboard.png'
      },
      {
        id: 'E-80',
        fx: 0.65,
        fy: 0.35,
        name: 'A torn prescription pad corner',
        note: 'A few digits jotted in the corner, half the pad torn away: "9 – 3 – _ – 5." No telling what it opens, from this alone.',
        noteVariants: [
          'A few digits jotted in the corner, half the pad torn away: "9 – 3 – _ – 5." No telling what it opens, from this alone.',
          'A few digits jotted in the corner, half the pad torn away: "7 – 2 – _ – 4." No telling what it opens, from this alone.'
        ],
        puzzleVariantGroup: 'wren-lock',
        requires: { npc: 'Dr. Wren' }
      },
      {
        id: 'E-81',
        fx: 0.28,
        fy: 0.68,
        name: 'A tally scratched in the appointment book',
        note: 'Eight house calls this month alone, each one just a hash mark and a date — no names, the same discretion as everything else in this room.',
        noteVariants: [
          'Eight house calls this month alone, each one just a hash mark and a date — no names, the same discretion as everything else in this room.',
          'Five house calls this month alone, each one just a hash mark and a date — no names, the same discretion as everything else in this room.'
        ],
        puzzleVariantGroup: 'wren-lock',
        requires: { npc: 'Dr. Wren' }
      },
      {
        id: 'E-82',
        fx: 0.5,
        fy: 0.5,
        name: 'A locked medical strongbox',
        note: "A slim ledger inside, entries stripped of names — just amounts, dates, and one word repeated again and again: \"discretion.\" Being this family's physician has clearly required more than medicine, over the years.",
        puzzle: true,
        puzzleCode: '9385',
        puzzleCodeVariants: ['9385', '7254'],
        puzzleVariantGroup: 'wren-lock'
      },
      {
        id: 'E-109',
        fx: 0.55,
        fy: 0.85,
        name: 'A termination letter, drafted and never delivered',
        note: "Edmund's own hand: thanking her for twenty-six years of service, and letting her go without a pension, in favor of a younger housekeeper better suited to \"the family's future needs.\" She'd found her own copy before he ever had the chance to hand it to her — and she's the only one in this house who's ever damped that study's gas lamp down for the night, same as she has every night for twenty-six years.",
        requires: { killer: 'Eleanor Pemberton', killerMethod: 'asphyxiation' },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'E-121',
        fx: 0.75,
        fy: 0.2,
        name: 'A half-written letter to a colleague',
        note: "Dr. Wren, drafting a request for a second opinion on a difficult case — unsigned, unfinished, and not addressed to anyone in this house. Doctors worry about all sorts of patients, not just this one.",
        requires: { optional: true }
      },
      {
        id: 'E-130',
        fx: 0.35,
        fy: 0.55,
        name: 'A dog-eared medical journal, left open',
        note: "Open to an article on cardiac strain, heavily annotated in Dr. Wren's own hand. Professional curiosity, or something closer to home — hard to say which.",
        requires: { optional: true }
      }
    ],
    npcs: [
      {
        tint: 0x9cb8c9,
        name: 'Dr. Wren',
        portraitKey: 'portrait-drwren',
        fx: 0.15,
        fy: 0.15,
        line: '"Weak heart. I told him for months. He never did know how to slow down."',
        lineAlt: '"I lost count of how many times I warned him about that heart of his. The man simply refused to slow down."'
      }
    ]
  },

  kitchen: {
    label: "Kitchen & Servants' Hall",
    bgKey: 'bg-kitchen',
    prevRoom: 'drwrenroom',
    nextRoom: 'diningroom',
    hotspots: [
      {
        id: 'W-01',
        fx: 0.3,
        fy: 0.5,
        name: 'The butler\'s account',
        note: 'He swears he heard raised voices from the study around 10:50 PM.'
      },
      {
        id: 'W-09',
        fx: 0.6,
        fy: 0.5,
        name: 'A quiet word from the staff',
        note: "They confirm a late-night card game in the servants' hall — not the room Harriet claimed to be in.",
        requires: { npc: 'Harriet Voss' },
        implicates: 'Harriet Voss',
        alibiBreak: true
      },
      {
        // Deliberately ambiguous — this shows up in every game once you've
        // talked to Eleanor, the same way every other suspect's motive clue
        // does, and should read as ordinary suspicious circumstance (maybe
        // severance, maybe a loan, maybe nothing) in the 9 games where she
        // isn't the one who actually went through with anything. The real
        // confirming note is E-68, gated to her scenario specifically.
        id: 'E-53',
        fx: 0.2,
        fy: 0.75,
        name: 'A banker\'s note, an unusually large sum',
        note: "Withdrawn from Edmund's own account within the past month and handed to Eleanor directly — far more than a housekeeper's wages could explain. She's never said why, and no one's thought to ask.",
        requires: { npc: 'Eleanor Pemberton' },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'E-68',
        fx: 0.32,
        fy: 0.62,
        name: "A sealed note, in Edmund's hand",
        note: "Dated the very morning of his birthday. Thanks her for a kindness he says he can repay no other way, and asks that whatever people assume about that payment, she let them keep assuming it — tonight, and after. Whatever passed between them, it was settled before the first guest ever arrived.",
        requires: { killer: 'Eleanor Pemberton', killerMethod: 'poison' },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'W-11',
        fx: 0.62,
        fy: 0.35,
        name: 'Her own tidy record of the evening',
        note: "Every task accounted for, down to the minute, in her own meticulous hand — except brewing his evening tea, the one entry missing from a record that lists everything else. The tray came from her kitchen all the same.",
        requires: { killer: 'Eleanor Pemberton', killerMethod: 'poison' },
        implicates: 'Eleanor Pemberton',
        alibiBreak: true
      },
      {
        id: 'I-03',
        fx: 0.85,
        fy: 0.25,
        name: 'A small brass padlock key',
        note: "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything.",
        positionVariants: [{ fx: 0.85, fy: 0.25 }, { fx: 0.78, fy: 0.3 }],
        pickup: true,
        icon: 'key-padlock.png'
      },
      {
        id: 'E-99',
        fx: 0.4,
        fy: 0.22,
        name: 'A tin of headache powder, relabeled in her own hand',
        note: "The label reads headache powder, but what's left inside is a fine grey dust that's never once cured a headache — the same bitter grey as the residue on Edmund's own teacup. Beneath the tin, a letter from decades ago: proof of an old affair of Harriet's own, one that would have scandalized the family just as badly as anything she's ever accused anyone else of. Edmund threatened, gently but plainly, to finally let it slip at dinner.",
        requires: { killer: 'Harriet Voss', killerMethod: 'poison' },
        implicates: 'Harriet Voss'
      },
      {
        id: 'E-110',
        fx: 0.92,
        fy: 0.85,
        name: 'A kitchen ledger, figures that don\'t quite add up',
        note: "Small amounts, skimmed carefully over years, going somewhere that isn't the household budget. A photograph tucked behind the ledger's back page shows a young family that has never once set foot in Ravensmoor Hall. Edmund had only just started asking questions about the numbers himself.",
        requires: { killer: 'Eleanor Pemberton', killerMethod: 'blunt-force' },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'E-111',
        fx: 0.9,
        fy: 0.6,
        name: 'A locked strongbox, forced open rather than unlocked',
        note: "Inside: years of Edmund's own letters, kept as quiet leverage rather than loyalty — the exact kind of thing a housekeeper collects when she means to protect herself, not the family. He confronted her with the box itself at the top of the back stairwell — the same stairwell that still carries a faint scuff from the house shoes she's worn every day for twenty-six years.",
        requires: { killer: 'Eleanor Pemberton', killerMethod: 'fall' },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'E-122',
        fx: 0.12,
        fy: 0.4,
        name: 'A burnt batch of scones, forgotten on the counter',
        note: "Eleanor's, by the smell of it — badly burnt and never thrown out. Grief does strange things to a routine kept perfectly for twenty-six years.",
        requires: { optional: true }
      }
    ],
    npcs: [
      {
        tint: 0xb8c4d9,
        name: 'Eleanor Pemberton',
        portraitKey: 'portrait-eleanor',
        fx: 0.5,
        fy: 0.15,
        line: '"I found him and I touched nothing. I called for Dr. Wren immediately."',
        lineAlt: '"I found him exactly as he was and didn\'t touch a thing. Sent for Dr. Wren the moment I knew something was wrong."'
      }
    ]
  },

  // Where the birthday dinner actually happened, before whatever came after
  // in the study. Nobody's stayed to clean up — the table's exactly as it
  // was left the moment everyone got up.
  diningroom: {
    label: 'The Dining Room',
    bgKey: 'bg-diningroom',
    prevRoom: 'kitchen',
    nextRoom: 'musicroom',
    hotspots: [
      {
        id: 'E-61',
        fx: 0.3,
        fy: 0.8,
        name: "Edmund's place setting",
        note: "His card still marks his seat. Beside his water glass, a small dark stain has soaked into the cloth — wine, probably. Or something else.",
        requires: { killerMethod: 'poison' }
      },
      {
        id: 'E-62',
        fx: 0.58,
        fy: 0.72,
        name: 'The birthday cake, barely touched',
        note: 'Cut once, served to no one. Whatever was said after the candles were blown out, nobody stayed for cake.',
        requires: { optional: true }
      },
      {
        id: 'E-63',
        fx: 0.15,
        fy: 0.16,
        name: 'The family portraits',
        note: "Four generations of Thornes, watching over the table. Vivienne's portrait still hangs beside Edmund's own parents — never taken down, whatever the family thinks of her these days.",
        requires: { optional: true }
      },
      {
        id: 'E-64',
        fx: 0.12,
        fy: 0.42,
        name: "The sideboard's locked drawer",
        lockedNote: "Locked, and none of the usual house keys fit it. Whoever has this key isn't a regular in this room.",
        note: "Inside: Edmund's handwritten toast, never given. It names his intended heir outright — the page is water-stained and partly illegible, but one line still reads clearly: \"...knowing what I know now, I have no choice but to—\" The rest is gone.",
        itemLock: 'I-02'
      },
      {
        id: 'E-92',
        fx: 0.02,
        fy: 0.45,
        name: "Edmund's nightcap decanter, one glass gone missing",
        note: "A fresh chip in the crystal stopper, and a faint bitter film clinging to the rim that doesn't belong there. Tucked behind the sideboard: a stack of gambling markers in Marcus's name, and a letter Edmund had drafted to read aloud at the announcement — naming the debts publicly before naming any heir at all.",
        requires: { killer: 'Marcus Thorne', killerMethod: 'poison' },
        implicates: 'Marcus Thorne'
      }
    ],
    npcs: []
  },

  musicroom: {
    label: 'The Music Room',
    bgKey: 'bg-musicroom',
    prevRoom: 'diningroom',
    nextRoom: 'grounds',
    hotspots: [
      {
        id: 'E-112',
        fx: 0.2,
        fy: 0.46,
        name: 'Sheet music, left open on the piano stand',
        note: "A waltz, its pages worn soft at the corners from years of playing. Vivienne's own hand pencils a fingering note in the margin — she still slips back some evenings, when the house is quiet enough to let her pretend it's still hers to sit in.",
        requires: { npc: 'Vivienne Thorne' },
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'E-113',
        fx: 0.88,
        fy: 0.51,
        name: 'A gramophone horn, cold to the touch',
        note: "Whatever was playing stopped hours ago. The needle's still resting on the record — nobody thought to lift it before the house went quiet for the night.",
        requires: { optional: true }
      },
      {
        id: 'E-114',
        fx: 0.3,
        fy: 0.73,
        name: "A hairpin, caught in the piano stool's tufting",
        note: "Set with a small pearl — not a style anyone in the family wears. Eleanor recognizes it at once: one of the upstairs maids borrows this room some evenings to practice, when she thinks no one's listening. Nothing stranger than that.",
        requires: { optional: true },
        redHerring: true
      }
    ],
    npcs: []
  },

  grounds: {
    label: 'Garage & Grounds',
    bgKey: 'bg-grounds',
    prevRoom: 'musicroom',
    nextRoom: 'greenhouse',
    hotspots: [
      {
        id: 'E-04',
        fx: 0.3,
        fy: 0.75,
        name: 'Muddy boot prints',
        note: "Lead from the garden door toward the study. They turn out to be Eleanor's own, from her evening rounds.",
        redHerring: true,
        requires: { optional: true },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'EN-02',
        fx: 0.66,
        fy: 0.53,
        name: 'The fuse box',
        note: 'The west wing lost power for fifteen minutes that night — storm-related, but it gave someone cover to move unseen.',
        requires: { optional: true }
      },
      {
        id: 'W-03',
        fx: 0.15,
        fy: 0.55,
        name: "The groundskeeper's account",
        note: 'He saw a figure crossing from the greenhouse toward the garden door around 11:00 PM.',
        requires: { evidence: 'E-06', killerMethod: 'poison' }
      },
      {
        id: 'E-26',
        fx: 0.52,
        fy: 0.63,
        name: 'A half-smoked cigarette',
        note: 'Still warm, dropped by the tool cart — not by the garage, where he claimed to have gone to smoke alone.',
        requires: { killer: 'Marcus Thorne' },
        implicates: 'Marcus Thorne',
        alibiBreak: true
      },
      {
        id: 'W-04',
        fx: 0.8,
        fy: 0.68,
        name: "The stable boy's account",
        note: 'Sent out near midnight to fetch a tarp, he swears the garage was dark and empty — no sign of Marcus, despite what he told you.',
        requires: { killer: 'Marcus Thorne' },
        implicates: 'Marcus Thorne',
        alibiBreak: true
      },
      {
        id: 'E-65',
        fx: 0.92,
        fy: 0.72,
        name: 'A padlocked toolbox',
        lockedNote: "Marcus's, judging by the initials scratched into the lid. Locked tight.",
        note: "Inside: a petty cash ledger, months of small \"loans\" from the company account that were never paid back — all in Marcus's own hand. Whatever else is true tonight, he's been quietly bleeding the business dry for a while.",
        itemLock: 'I-03',
        implicates: 'Marcus Thorne'
      },
      {
        id: 'E-93',
        fx: 0.45,
        fy: 0.85,
        name: 'A doctor\'s letter, unsent, addressed to a specialist in the city',
        note: "Edmund's own hand, requesting a formal competency evaluation — not for himself, for Marcus. He meant to have his own son declared unfit to inherit anything at all, trust or no trust. Half-burned matches litter the ground nearby, like someone stood out here a long time working up the nerve.",
        requires: { killer: 'Marcus Thorne', killerMethod: 'staged-accident' },
        implicates: 'Marcus Thorne'
      },
      {
        id: 'E-94',
        fx: 0.95,
        fy: 0.85,
        name: 'A shattered whisky glass, ground into the gravel',
        note: "Flung, not dropped — the pieces are scattered too wide for an accident. Marcus had been drinking heavily all night, by every account, and the argument in the study was the loudest anyone could remember. Whatever was said in there, it didn't end with words.",
        requires: { killer: 'Marcus Thorne', killerMethod: 'strangulation' },
        implicates: 'Marcus Thorne'
      }
    ],
    npcs: [
      {
        tint: 0xd88a7a,
        name: 'Marcus Thorne',
        portraitKey: 'portrait-marcus',
        fx: 0.6,
        fy: 0.15,
        line: '"Go on and ask what everyone\'s already thinking. I know exactly how it looks — the son who argued with his father, tonight of all nights."',
        lineAlt: '"Ask what you came here to ask. I already know how it looks — the son who argued with his father, the same night he died."'
      },
      {
        tint: 0xa8925c,
        name: 'Tom Yarrow',
        portraitKey: 'portrait-groundskeeper',
        fx: 0.08,
        fy: 0.2,
        line: '"Storm knocked half the hedge over. Been out here most of the night seeing to it."',
        lineAlt: '"This storm\'s made a mess of the hedge and half the grounds besides. I\'ve been out here dealing with it most of the night."'
      }
    ]
  },

  greenhouse: {
    label: 'The Greenhouse',
    bgKey: 'bg-greenhouse',
    prevRoom: 'grounds',
    nextRoom: 'juliansroom',
    hotspots: [
      {
        id: 'E-06',
        fx: 0.7,
        fy: 0.45,
        name: 'An empty labeled tincture vial',
        note: "Foxglove — digitalis, grown right here. The cabinet takes Priya's key, or the desk spare — though half the household seems to know where that spare actually lives, if you ask around.",
        requires: { npc: 'Priya Thorne-Kapoor', killerMethod: 'poison' },
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-73',
        fx: 0.25,
        fy: 0.42,
        name: "The spare key's hiding spot",
        note: "Tucked under an overturned flowerpot by the greenhouse door, exactly where anyone who's worked this house a season or two would know to look. Priya's own key isn't the only way into that cabinet, whatever the lock on it suggests.",
        requires: { npc: 'Priya Thorne-Kapoor', killerMethod: 'poison' }
      },
      {
        id: 'E-02',
        fx: 0.3,
        fy: 0.6,
        name: 'A second glass, hidden in the potting shed',
        note: 'Matching bitter residue. This wasn\'t natural causes — whatever killed him came from this greenhouse, at least. Who actually carried it out the door is a separate question.',
        requires: { evidence: 'E-06', killerMethod: 'poison' },
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-23',
        fx: 0.85,
        fy: 0.7,
        name: 'An unsent letter',
        note: "Drafted but never sent: Edmund withdrawing every penny of funding from Priya's research trust, effective this month. She would have found out tonight.",
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-24',
        fx: 0.5,
        fy: 0.8,
        name: 'A pair of gardening gloves',
        note: 'Still damp, dropped near the door — with the same bitter residue as the poison itself.',
        requires: { killer: 'Priya Thorne-Kapoor', killerMethod: 'poison' },
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-33',
        fx: 0.5,
        fy: 0.18,
        name: 'The hanging lamp, unlit',
        note: "Its oil reservoir is still full to the brim — this lamp hasn't burned all evening, yet Priya swears she was out here tending the orchids past midnight.",
        requires: { killer: 'Priya Thorne-Kapoor' },
        implicates: 'Priya Thorne-Kapoor',
        alibiBreak: true
      },
      {
        id: 'E-31',
        fx: 0.44,
        fy: 0.6,
        name: 'A tortoiseshell hair clip',
        note: 'A few strands of unmistakably red hair still caught in the clasp — wedged behind the potting shed door.',
        requires: { killer: 'Vivienne Thorne', killerMethod: 'poison' },
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'E-45',
        fx: 0.65,
        fy: 0.78,
        name: 'Her fountain pen',
        note: "Found by the potting shed, the one she always carries — she swears she never left the library. Thirty years a fixture at Ravensmoor, she's wandered these grounds longer than half the staff; the flowerpot hiding a spare cabinet key was never much of a secret from her either.",
        requires: { killer: 'Diana Reyes', killerMethod: 'poison' },
        implicates: 'Diana Reyes',
        alibiBreak: true
      },
      {
        id: 'E-54',
        fx: 0.15,
        fy: 0.32,
        name: 'A second key to the poison cabinet',
        note: "Worn quietly on her own ring for years — the only real explanation for how the poison ever left this cabinet without Priya's own key going missing even once.",
        requires: { killer: 'Eleanor Pemberton', killerMethod: 'poison' },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'E-57',
        fx: 0.84,
        fy: 0.38,
        name: "The cabinet's second lock",
        lockedNote: "The cabinet's second compartment — the one even Priya doesn't have a key to. It needs something else.",
        note: "Inside: a hidden ledger tracking every dose dispensed from this cabinet for the past year, in Edmund's own precise hand. He was keeping track of who came and went from here far more closely than anyone realized.",
        itemLock: 'I-01'
      },
      {
        id: 'E-86',
        fx: 0.92,
        fy: 0.85,
        name: 'A shattered ceramic urn, swept behind the bench',
        note: "The dust still clings to the corner where it broke — and half-buried beneath it, torn to pieces: a patent filing for her foxglove-resistant hybrid, years of her own work, with Edmund's name typed in as sole inventor. He meant to sell it to a fertilizer conglomerate without ever telling her he'd taken it.",
        requires: { killer: 'Priya Thorne-Kapoor', killerMethod: 'blunt-force' },
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-87',
        fx: 0.08,
        fy: 0.65,
        name: 'Pruning shears, the blade freshly nicked',
        note: "Wiped down and hung back on their hook — but the edge is chipped clean where it never used to be. Tucked behind the same hook, torn into pieces: a merger contract promising her hand in marriage to secure a distributor's backing, her name already signed in Edmund's looping hand, never hers.",
        requires: { killer: 'Priya Thorne-Kapoor', killerMethod: 'stabbing' },
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-88',
        fx: 0.35,
        fy: 0.9,
        name: 'A coil of garden wire, one length missing',
        note: "Cut clean, not torn — the kind of edge a proper pair of shears leaves, not weather or age. Beneath the workbench, a shipping manifest: rare seed stock, hers to tend, sold quietly to a rival lab for two years running. Edmund had only just found it, and meant to call her a traitor to her own family in front of everyone.",
        requires: { killer: 'Priya Thorne-Kapoor', killerMethod: 'strangulation' },
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-123',
        fx: 0.6,
        fy: 0.28,
        name: 'A cracked terracotta pot, swept into a corner',
        note: "An old accident, nothing more — Priya mentions tripping over a hose out here weeks ago. Green thumbs and clumsy feet, by her own admission.",
        requires: { optional: true },
        redHerring: true
      }
    ],
    npcs: [
      {
        tint: 0x9fcf9f,
        name: 'Priya Thorne-Kapoor',
        portraitKey: 'portrait-priya',
        fx: 0.4,
        fy: 0.15,
        line: '"I already know what this family thinks of me. Ask your questions — I doubt they\'ll surprise me."',
        lineAlt: '"I\'ve heard what this family thinks of me plenty of times already. Go ahead and ask — nothing you say will surprise me."'
      }
    ]
  },

  juliansroom: {
    label: "Julian's Room",
    bgKey: 'bg-juliansroom',
    prevRoom: 'greenhouse',
    nextRoom: 'attic',
    hotspots: [
      {
        id: 'E-18',
        fx: 0.42,
        fy: 0.64,
        name: 'A pawnshop receipt',
        note: "Pawned three weeks ago: a set of silver cufflinks engraved \"E.T.\" — Edmund's own initials, taken from his desk without asking and sold for cash Julian badly needed. Theft, not murder — but it's exactly the theft Edmund found out about, and exactly why he meant to report him for it.",
        requires: { npc: 'Julian Voss' },
        redHerring: true,
        implicates: 'Julian Voss'
      },
      {
        id: 'E-42',
        fx: 0.88,
        fy: 0.42,
        name: 'A letter to the family solicitor',
        note: 'Edmund intended to have Julian formally cut from the will and reported to the police for the pawnshop theft — first thing tomorrow.',
        requires: { npc: 'Julian Voss' },
        implicates: 'Julian Voss'
      },
      {
        id: 'W-07',
        fx: 0.15,
        fy: 0.55,
        name: 'His bed, unslept in',
        note: 'He claims he turned in shortly after Marcus left him — but the sheets are undisturbed, still made from that morning.',
        requires: { killer: 'Julian Voss' },
        implicates: 'Julian Voss',
        alibiBreak: true
      },
      {
        id: 'E-66',
        fx: 0.85,
        fy: 0.85,
        name: "Julian's locked trunk",
        lockedNote: "Locked, and Julian's not exactly the type to misplace a spare key by accident.",
        note: "Inside: a whole stack of pawnshop tickets, going back over a year — watches, silver, a violin that was never his to sell. The cufflinks were never a one-time thing.",
        itemLock: 'I-04',
        implicates: 'Julian Voss'
      },
      {
        id: 'E-101',
        fx: 0.5,
        fy: 0.2,
        name: "A pawned watch's claim ticket, dated that very afternoon",
        note: "Not the cufflinks this time — his grandfather's own pocket watch, pawned hours before dinner for cash he needed that same night, not next month. Tucked in the same pocket as the ticket: a spare greenhouse key, the same bitter grey residue still dried into its teeth. Whatever he owed, and to whom, it couldn't wait for a slow plan.",
        requires: { killer: 'Julian Voss', killerMethod: 'poison' },
        implicates: 'Julian Voss'
      },
      {
        id: 'E-102',
        fx: 0.22,
        fy: 0.9,
        name: 'A silver candlestick, wiped and shoved under the bed',
        note: "Bent slightly at the base, polish rubbed clean in a hurry. He'd been caught mid-search of the study desk that same night — not planning ahead, just looking for anything worth enough to sell before morning.",
        requires: { killer: 'Julian Voss', killerMethod: 'blunt-force' },
        implicates: 'Julian Voss'
      },
      {
        id: 'E-103',
        fx: 0.2,
        fy: 0.3,
        name: 'A hunting knife, usually kept above the mantel, gone from its mount',
        note: "The dust outline on the wall is unmistakable. Edmund had confronted him directly that night, by every account — no letter, no solicitor, just the two of them and the theft laid bare between them.",
        requires: { killer: 'Julian Voss', killerMethod: 'stabbing' },
        implicates: 'Julian Voss'
      },
      {
        id: 'E-124',
        fx: 0.7,
        fy: 0.7,
        name: 'A stack of unopened bills',
        note: "Addressed to Julian, from creditors with increasingly less patient letterhead. Nothing here he hasn't already admitted to, one way or another.",
        requires: { optional: true },
        redHerring: true,
        implicates: 'Julian Voss'
      }
    ],
    npcs: [
      {
        tint: 0xd98fd9,
        name: 'Julian Voss',
        portraitKey: 'portrait-julian',
        fx: 0.6,
        fy: 0.15,
        line: '"Quite a party, in the end. I don\'t imagine Uncle Edmund planned on this being the toast of the evening."',
        lineAlt: '"Quite the evening, all told. I doubt Uncle Edmund pictured this as how his birthday toast would end."'
      }
    ]
  },

  attic: {
    label: 'The Attic',
    bgKey: 'bg-attic',
    prevRoom: 'juliansroom',
    nextRoom: 'study',
    hotspots: [
      {
        id: 'E-115',
        fx: 0.16,
        fy: 0.63,
        name: "A trunk of a dead man's clothes, never given away",
        note: "A soldier's old uniform, carefully folded, smelling faintly of cedar. Harriet's husband, by the look of the photograph tucked in the breast pocket — she's kept every stitch of him longer than most people stay married at all.",
        requires: { npc: 'Harriet Voss' },
        implicates: 'Harriet Voss'
      },
      {
        id: 'E-116',
        fx: 0.6,
        fy: 0.51,
        name: 'A rocking horse, strangely free of dust',
        note: "Everything else up here wears a decade of it, but the horse's mane is clean, like fingers had run through it recently. Eleanor isn't shy about admitting she still comes up to look at it — hers is the only key to this room besides the family's own.",
        requires: { optional: true },
        redHerring: true,
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'E-117',
        fx: 0.78,
        fy: 0.59,
        name: 'A stack of ledgers, decades out of date',
        note: "Nathaniel's own hand fills the margins of the oldest ones — matters the firm settled quietly long before Edmund ever inherited the company. He's been managing this family's secrets for far longer than anyone here has actually known him.",
        requires: { npc: 'Nathaniel Cole' },
        implicates: 'Nathaniel Cole'
      }
    ],
    npcs: []
  }
};
