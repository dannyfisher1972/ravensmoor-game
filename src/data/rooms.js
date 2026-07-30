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
// The ten rooms form a simple loop: study -> library -> westparlor -> bedroom -> drwrenroom
// -> kitchen -> diningroom -> grounds -> greenhouse -> juliansroom -> (back to study). Any
// room can reach any other by stepping through the loop; it doesn't need to be a full mesh
// to make the manor feel connected.
//
// `studyBody` is a separate close-up sub-scene, not part of the loop — clicking Edmund's
// body (E-01) in the study jumps here instead of showing an inline note, then both nav
// buttons lead back to the study. It's deliberately left out of ROOM_ORDER below so it
// doesn't count against the "visited every room" achievement or appear in room-count math;
// it's a closer look at a room already visited, not a new location.

export const ROOM_ORDER = [
  'study', 'library', 'westparlor', 'bedroom', 'drwrenroom',
  'kitchen', 'diningroom', 'grounds', 'greenhouse', 'juliansroom'
];

export const ROOMS = {
  study: {
    label: 'The Study',
    bgKey: 'bg-study',
    prevRoom: 'juliansroom',
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
        note: 'Tucked inside: a scrap of paper reading "4 – 2 – 7 – _" and a note: "the last digit is Hymn 214\'s verse."'
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
        fx: 0.9,
        fy: 0.35,
        name: 'A hymnal, spine cracked open',
        note: 'Hymn No. 214, "Rock of Ages, Cleft for Me." This copy is worn soft at verse 3.',
        requires: { evidence: 'E-20' }
      },
      {
        id: 'E-28',
        fx: 0.72,
        fy: 0.86,
        name: "A locked desk drawer",
        note: "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\"",
        puzzle: true,
        puzzleCode: '4273'
      },
      {
        id: 'W-06',
        fx: 0.3,
        fy: 0.2,
        name: "Harriet's spectacles case",
        note: "Harriet swears she never left her room upstairs all night — yet her own spectacles case turned up here, in the study, of all places.",
        requires: { killer: 'Harriet Voss' },
        implicates: 'Harriet Voss'
      },
      {
        id: 'E-50',
        fx: 0.1,
        fy: 0.55,
        name: 'The fire poker, wiped clean',
        note: 'Wiped down and left back on its stand — but not well enough. A few dark flecks remain in the grip, and the curved iron hook at its tip is bent slightly out of true, like it struck something far harder than a log.',
        requires: { killer: 'Marcus Thorne' },
        implicates: 'Marcus Thorne'
      },
      {
        id: 'E-51',
        fx: 0.37,
        fy: 0.63,
        name: 'A tapestry cushion, out of place',
        note: "From the good parlor, tucked behind the desk as if someone hoped it wouldn't be noticed — a few pale gold threads pulled loose from its edge, snagged and drawn tight, as if it had been pressed hard against something for a while.",
        requires: { killer: 'Harriet Voss' },
        implicates: 'Harriet Voss'
      },
      {
        id: 'E-55',
        fx: 0.82,
        fy: 0.72,
        name: "A signet ring, its stone chipped",
        note: 'Wedged beneath the desk — the chip matches a scrape at Edmund\'s temple exactly.',
        requires: { killer: 'Julian Voss' },
        implicates: 'Julian Voss'
      },
      {
        id: 'E-56',
        fx: 0.41,
        fy: 0.66,
        name: "Edmund's heart tonic",
        note: 'Refilled just this week. Tested twice the strength it should have been.',
        requires: { killer: 'Nathaniel Cole' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'I-01',
        fx: 0.78,
        fy: 0.2,
        name: "The desk's spare key",
        note: "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet.",
        pickup: true,
        icon: 'key-desk.png'
      },
      {
        id: 'E-75',
        fx: 0.58,
        fy: 0.28,
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
        fx: 0.21,
        fy: 0.36,
        name: 'That same page, read properly',
        note: '"IF SOMETHING HAPPENS TO ME THIS WEEK, LOOK CLOSER AT WHO STANDS TO LOSE THE MOST." Three letters back from what\'s written, same as his note said.',
        requires: { evidence: 'E-75' }
      }
    ],
    npcs: [
      {
        tint: 0xf2d9a0,
        name: 'Harriet Voss',
        portraitKey: 'portrait-harriet',
        fx: 0.85,
        fy: 0.1,
        line: '"I read until I fell asleep. This family, honestly — always something."'
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
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'E-74',
        fx: 0.6,
        fy: 0.28,
        name: 'A ledger page, torn and refolded',
        note: "Years of small transfers out of the children's trust, each one just under the amount that would have needed Marcus or Priya's signature to approve. Vivienne's own handwriting notes the running total in the margin, like she never once stopped keeping score.",
        requires: { killer: 'Vivienne Thorne' },
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
        fx: 0.53,
        fy: 0.6,
        name: 'A brandy glass, poured but untouched',
        note: 'Left on the round table since before eleven. Odd, for a woman who claims to have worked steadily until nearly midnight.',
        requires: { killer: 'Diana Reyes' },
        implicates: 'Diana Reyes'
      },
      {
        id: 'W-10',
        fx: 0.14,
        fy: 0.7,
        name: 'The library fire, banked low',
        note: 'Barely more than embers all evening — an odd thing, if he and Diana truly worked here past midnight in this weather. Odder still that anything burned at all, if neither of them ever lit it.',
        requires: { killer: 'Nathaniel Cole' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'E-70',
        fx: 0.2,
        fy: 0.65,
        name: 'Scorched fragments in the grate',
        note: "Barely anything left to read, but one line survives, in Edmund's own hand: \"...both the money and Nathaniel's — time he answered for—\" Someone fed this to the fire tonight, and didn't wait for it to catch properly first.",
        requires: { killer: 'Nathaniel Cole' },
        implicates: 'Nathaniel Cole'
      },
      {
        id: 'E-71',
        fx: 0.42,
        fy: 0.48,
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
        pickup: true,
        icon: 'key-luggage.png'
      }
    ],
    npcs: [
      {
        tint: 0xd9b75a,
        name: 'Nathaniel Cole',
        portraitKey: 'portrait-nathaniel',
        fx: 0.25,
        fy: 0.15,
        line: '"I hardly left my room. Paperwork doesn\'t draft itself, especially not this weekend\'s."'
      },
      {
        tint: 0x8fb49a,
        name: 'Diana Reyes',
        portraitKey: 'portrait-diana',
        fx: 0.75,
        fy: 0.15,
        line: '"Edmund and I disagreed about the direction of the company. That\'s Tuesday, not motive."'
      },
      {
        tint: 0xc76b4a,
        name: 'Vivienne Thorne',
        portraitKey: 'portrait-vivienne',
        fx: 0.5,
        fy: 0.12,
        line: '"I was in the west parlor, reading, same as always. Ask anyone — though I doubt anyone was paying attention to me."'
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
        fy: 0.25,
        name: 'A faded ticket stub',
        note: 'Tucked behind a cushion, half the ink gone: "2 – 0 – _ – 7." A keepsake of some kind, going by the box it was found next to.'
      },
      {
        id: 'E-84',
        fx: 0.5,
        fy: 0.45,
        name: 'A hand-stitched sampler',
        note: 'On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish.'
      },
      {
        id: 'E-85',
        fx: 0.42,
        fy: 0.85,
        name: 'A locked keepsake box',
        note: "A small photograph inside, corners worn soft from handling — Vivienne, decades younger, laughing at something just out of frame. Whatever this marriage became, someone kept this all the same.",
        puzzle: true,
        puzzleCode: '2067'
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
        fx: 0.79,
        fy: 0.38,
        name: 'A crushed foxglove petal',
        note: "On her dressing table, of all places — gardening was never her hobby. That's Priya's domain, not hers.",
        requires: { killer: 'Victoria Thorne' },
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
        implicates: 'Victoria Thorne'
      },
      {
        id: 'E-69',
        fx: 0.62,
        fy: 0.22,
        name: "A torn page from Edmund's journal",
        note: "Half a sentence, the rest torn away: \"...Nathaniel, of all people. After this long, I should have expected — no more waiting.\" Dated three days ago. Whatever he'd only just learned, it didn't wait for morning.",
        requires: { killer: 'Victoria Thorne' },
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
        fx: 0.5,
        fy: 0.28,
        name: 'A small iron curio key',
        note: "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\"",
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
        fx: 0.31,
        fy: 0.61,
        name: 'The same page, read properly',
        note: '"EVERY ONE OF THEM HAS A REASON TONIGHT. I HAVE STOPPED PRETENDING NOT TO SEE IT." Once you know the trick, it reads plain as day.',
        requires: { evidence: 'E-75' }
      }
    ],
    npcs: [
      {
        tint: 0xe6a9d9,
        name: 'Victoria Thorne',
        portraitKey: 'portrait-victoria',
        fx: 0.85,
        fy: 0.1,
        line: '"I said goodnight to Edmund after dinner and went straight up. I had a wretched headache."'
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
        pickup: true,
        icon: 'key-sideboard.png'
      },
      {
        id: 'E-80',
        fx: 0.65,
        fy: 0.35,
        name: 'A torn prescription pad corner',
        note: 'A few digits jotted in the corner, half the pad torn away: "9 – 3 – _ – 5." No telling what it opens, from this alone.',
        requires: { npc: 'Dr. Wren' }
      },
      {
        id: 'E-81',
        fx: 0.3,
        fy: 0.45,
        name: 'A tally scratched in the appointment book',
        note: 'Eight house calls this month alone, each one just a hash mark and a date — no names, the same discretion as everything else in this room.',
        requires: { npc: 'Dr. Wren' }
      },
      {
        id: 'E-82',
        fx: 0.5,
        fy: 0.5,
        name: 'A locked medical strongbox',
        note: "A slim ledger inside, entries stripped of names — just amounts, dates, and one word repeated again and again: \"discretion.\" Being this family's physician has clearly required more than medicine, over the years.",
        puzzle: true,
        puzzleCode: '9385'
      }
    ],
    npcs: [
      {
        tint: 0x9cb8c9,
        name: 'Dr. Wren',
        portraitKey: 'portrait-drwren',
        fx: 0.15,
        fy: 0.15,
        line: '"Weak heart. I told him for months. He never did know how to slow down."'
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
        implicates: 'Harriet Voss'
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
        note: "It thanks her for understanding what he needed, and asks her to make it look natural, for the family's sake. Whatever that large payment was actually for, this is the only place it's spelled out.",
        requires: { killer: 'Eleanor Pemberton' },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'W-11',
        fx: 0.58,
        fy: 0.42,
        name: 'Her own tidy record of the evening',
        note: "Every task accounted for, down to the minute — except brewing his evening tea. Yet the tray came from her kitchen all the same.",
        requires: { killer: 'Eleanor Pemberton' },
        implicates: 'Eleanor Pemberton'
      },
      {
        id: 'I-03',
        fx: 0.85,
        fy: 0.25,
        name: 'A small brass padlock key',
        note: "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything.",
        pickup: true,
        icon: 'key-padlock.png'
      }
    ],
    npcs: [
      {
        tint: 0xb8c4d9,
        name: 'Eleanor Pemberton',
        portraitKey: 'portrait-eleanor',
        fx: 0.5,
        fy: 0.15,
        line: '"I found him and I touched nothing. I called for Dr. Wren immediately."'
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
    nextRoom: 'grounds',
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
      }
    ],
    npcs: []
  },

  grounds: {
    label: 'Garage & Grounds',
    bgKey: 'bg-grounds',
    prevRoom: 'diningroom',
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
        implicates: 'Marcus Thorne'
      },
      {
        id: 'W-04',
        fx: 0.8,
        fy: 0.68,
        name: "The stable boy's account",
        note: 'Sent out near midnight to fetch a tarp, he swears the garage was dark and empty — no sign of Marcus, despite what he told you.',
        requires: { killer: 'Marcus Thorne' },
        implicates: 'Marcus Thorne'
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
      }
    ],
    npcs: [
      {
        tint: 0xd88a7a,
        name: 'Marcus Thorne',
        portraitKey: 'portrait-marcus',
        fx: 0.6,
        fy: 0.15,
        line: '"We argued about the business, like we always do. I left, I had a smoke, I went to bed."'
      },
      {
        tint: 0xa8925c,
        name: 'Tom Yarrow',
        portraitKey: 'portrait-groundskeeper',
        fx: 0.08,
        fy: 0.2,
        line: '"Storm knocked half the hedge over. Been out here most of the night seeing to it."'
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
        note: "Foxglove — digitalis. The cabinet needs Priya's key, or the desk spare. This narrows things sharply.",
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
        note: 'Matching bitter residue. This wasn\'t natural causes — and it ties the poison straight back to this room.',
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
        requires: { killer: 'Priya Thorne-Kapoor' },
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-33',
        fx: 0.5,
        fy: 0.18,
        name: 'The hanging lamp, unlit',
        note: "Its oil reservoir is still full to the brim — this lamp hasn't burned all evening, yet Priya swears she was out here tending the orchids past midnight.",
        requires: { killer: 'Priya Thorne-Kapoor' },
        implicates: 'Priya Thorne-Kapoor'
      },
      {
        id: 'E-31',
        fx: 0.44,
        fy: 0.6,
        name: 'A tortoiseshell hair clip',
        note: 'A few strands of unmistakably red hair still caught in the clasp — wedged behind the potting shed door.',
        requires: { killer: 'Vivienne Thorne' },
        implicates: 'Vivienne Thorne'
      },
      {
        id: 'E-45',
        fx: 0.65,
        fy: 0.78,
        name: 'Her fountain pen',
        note: 'Found by the potting shed, the one she always carries — she swears she never left the library.',
        requires: { killer: 'Diana Reyes', killerMethod: 'poison' },
        implicates: 'Diana Reyes'
      },
      {
        id: 'E-54',
        fx: 0.15,
        fy: 0.32,
        name: 'A second key to the poison cabinet',
        note: "Worn quietly on her own ring for years — the only thing that explains how she came by it so easily.",
        requires: { killer: 'Eleanor Pemberton' },
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
      }
    ],
    npcs: [
      {
        tint: 0x9fcf9f,
        name: 'Priya Thorne-Kapoor',
        portraitKey: 'portrait-priya',
        fx: 0.4,
        fy: 0.15,
        line: '"I don\'t do well at parties. I went to check on the orchids and then to bed."'
      }
    ]
  },

  juliansroom: {
    label: "Julian's Room",
    bgKey: 'bg-juliansroom',
    prevRoom: 'greenhouse',
    nextRoom: 'study',
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
        implicates: 'Julian Voss'
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
      }
    ],
    npcs: [
      {
        tint: 0xd98fd9,
        name: 'Julian Voss',
        portraitKey: 'portrait-julian',
        fx: 0.6,
        fy: 0.15,
        line: '"I was with Marcus, then I turned in. I don\'t even like this house."'
      }
    ]
  }
};
