// Eleven possible ways this night could have gone, chosen at random each time
// a new investigation starts (see state.js's killerIndex and
// NUM_KILLER_VARIANTS), or pinned directly via the title screen's storyline
// picker. Every game, ALL motive clues for the real suspects are visible —
// they're real people with real reasons, not padding. What changes per game
// is the actual method (see `method`, checked via requires.killerMethod in
// rooms.js) and which killer-exclusive physical clue and contradicting
// testimony confirm who — or, in two scenarios, whether anyone — did this.
//
// Five of these use the shared poison evidence (the vial, the second glass,
// the groundskeeper's sighting) — those only appear at all when this game's
// method is 'poison'. The rest each have their own method and their own
// dedicated physical clue instead. Diana appears twice, as two entirely
// different stories (her long-standing Kessler-Vance motive, and a much
// older secret from Geneva) — same person, different method, so their
// evidence never crosses: anything exclusive to one of her two scenarios is
// gated on killerMethod as well as her name. 'No One' isn't a real person —
// it's the genuine-accident scenario, and its "killer" name only exists to
// give the title screen's special accusation tile something to match
// against.
//
// `sceneNotes` overrides specific hotspot text (by id) for this scenario —
// used by E-01 (the body), EN-06 (his glasses), and EN-10 (the close-up
// examination) so the same room/hotspot layout can describe a completely
// different manner of death without needing separate art per scenario.
export const SOLUTIONS = [
  {
    killer: 'Priya Thorne-Kapoor',
    method: 'poison',
    keyEvidence: ['E-23', 'E-06', 'E-02', 'E-24', 'W-03'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally, one loosely around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell on his breath that has nothing to do with the whisky decanter beside him.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this was someone he trusted enough not to react to.",
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly."
    },
    explanation: [
      "It was Priya. Edmund's unsent letter said what he'd never say to her face — he was pulling every penny of funding from her research trust. Tonight, she was about to lose the one thing that was ever fully hers.",
      'The empty foxglove vial and the second glass both trace back to her own greenhouse stock. Her gardening gloves, found still damp with the same bitter residue, seal it.',
      'She told everyone she "went to check on the orchids and then to bed" — but the groundskeeper saw a figure crossing from the greenhouse toward the garden door around 11:00 PM, the opposite direction from her room. Edmund set his glasses down calmly before he died. He wasn\'t afraid of her. That\'s what let her get close enough.'
    ]
  },
  {
    // Victoria's motive clue and reveal wording depend on state.js's
    // victoriaStatus (wife or girlfriend this game), so both fields are
    // functions here instead of plain arrays — main.js calls them with the
    // current status rather than reading them directly.
    killer: 'Victoria Thorne',
    method: 'poison',
    keyEvidence: (status) => [status === 'wife' ? 'E-12' : 'E-29', 'E-69', 'E-06', 'E-02', 'E-25', 'W-03'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally, one loosely around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell on his breath that has nothing to do with the whisky decanter beside him.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this was someone he trusted enough not to react to.",
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly."
    },
    explanation: (status) => [
      status === 'wife'
        ? "It was Victoria. Edmund had finally learned about her and Nathaniel — eighteen months of it, by the look of what they'd written each other — and the unsigned divorce petition was dated the very day he died. He meant to end the marriage that night, and a divorced ex-wife walks away with nothing. A widow inherits everything."
        : "It was Victoria. Edmund had finally learned about her and Nathaniel — eighteen months of it — and confirmed, the same week, that his will still named his first wife's trust as sole beneficiary, never updated after the divorce. After three years together, she was never going to inherit a thing unless something changed before he died — and now she knew exactly why he'd stopped pretending otherwise.",
      "A torn page from his own journal, dated three days before he died, named Nathaniel outright — whatever he'd only just learned, he wasn't willing to wait on it. A crushed foxglove petal turned up on her dressing table soon after — and gardening was never her hobby. That's Priya's domain, not hers. She'd been in the greenhouse, not asleep with a headache like she claimed.",
      `The groundskeeper saw a figure crossing from the greenhouse toward the garden door around 11:00 PM — not heading up to bed, but back from where the poison was kept. Edmund set his glasses down calmly before he died. After ${status === 'wife' ? 'seven years of marriage' : 'three years together'}, he never saw it coming from her.`
    ]
  },
  {
    killer: 'Marcus Thorne',
    method: 'blunt-force',
    keyEvidence: ['E-11', 'E-50', 'E-26', 'W-04'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. At a glance it looks peaceful enough — but there's a small, dark bruise just above his hairline, easy to miss under the lamp light. Whoever struck him made sure it wouldn't show unless you were looking for it.",
      'EN-06': "Knocked askew and left folded on the blotter, as if someone tidied up after the fact. He wasn't wearing them when it happened — which means whoever did this had time to think, even in a rage.",
      'EN-10': "Parting his hair back gently reveals it clearly now — a single, hard blow to the back of the skull, delivered from behind, the wound curved rather than flat. Whatever was used, it was heavy, hooked at the tip, and swung with real anger. There's no sign he ever saw it coming."
    },
    explanation: [
      "It was Marcus. The hidden trust in Edmund's desk quietly redirected every controlling share away from him — drafted years ago, updated just last month. Tonight wasn't going to be his inheritance. It was going to be the night he lost the company for good.",
      'The fire poker from the study hearth turned up wiped down in the garage — not a calculated cleanup, but the kind of frantic, half-finished job someone does with their hands still shaking. A few dark flecks remained in the grip all the same.',
      "He claimed he stepped out for a cigarette and stayed by the garage alone — but the stable boy, sent out near midnight for a tarp, swears the garage was dark and empty the whole time. A half-smoked cigarette, still warm, turned up by the tool cart instead. Edmund never raised a hand to defend himself. His own son was the last person he'd have suspected."
    ]
  },
  {
    killer: 'Vivienne Thorne',
    method: 'poison',
    keyEvidence: ['E-30', 'E-74', 'W-05', 'E-06', 'E-02', 'E-31', 'W-03'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally, one loosely around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell on his breath that has nothing to do with the whisky decanter beside him.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this was someone he trusted enough not to react to.",
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly."
    },
    explanation: [
      "It was Vivienne. The private investigator's report Edmund's lawyer commissioned proved what she'd spent a decade hiding — the \"alimony\" she'd been quietly padding for years had actually been skimmed from the trust meant for Marcus and Priya's inheritance. He wasn't only cutting her off financially, tonight; he meant to tell his own children exactly what their mother had done to what should have been theirs, and have her removed from Ravensmoor for good. Being poor never frightened her. Being cast out of the one family that still had to tolerate her did.",
      "A ledger page in her own hand, torn from the trust's records and refolded to hide the running total she'd kept of every transfer, turned up in the library. The empty foxglove vial and the second glass trace back to the greenhouse, same as always. A tortoiseshell hair clip — a few strands of her unmistakable red hair still caught in the clasp — was found wedged behind the potting shed door.",
      "The groundskeeper saw a figure crossing from the greenhouse toward the garden door around 11:00 PM. Her own alibi didn't survive Eleanor's nightly hearth tally either — no fire was ever laid in the west parlor that night, whatever she claimed about reading there undisturbed for hours. Edmund set his glasses down calmly before he died. Whatever she'd become to him, he still thought her incapable of this. That was his mistake."
    ]
  },
  {
    killer: 'Harriet Voss',
    method: 'smothering',
    // Smothering leaves no obvious mark, so the study starts with only the
    // "first glance" hotspot instead of the full clue set — see RoomScene's
    // special-case for the study room, gated on state.js's bodyDiscovered flag.
    discoveryDelayed: true,
    firstGlanceNote: "From across the room, he looks like he's simply nodded off at his desk, head bowed over his papers. You'll need to look closer.",
    keyEvidence: ['E-40', 'E-51', 'W-06'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. No wounds, no struggle — but his color is wrong, a faint mottled flush at his cheeks that doesn't belong on a man who simply fell asleep.",
      'EN-06': "Folded and set down with unusual care, further from his hand than he'd normally leave them. Whoever did this had a moment alone with him first — long enough to make the room look undisturbed.",
      'EN-10': "Up close, a single fine thread — pale gold, the kind woven into an antique cushion, not his own clothing — is caught in the stubble at his jaw. Whatever pressed over his face, it wasn't there long. It didn't need to be."
    },
    explanation: [
      "It was Harriet. The property sale prospectus in the library confirmed what she'd feared — Edmund meant to sell Ravensmoor Hall itself to developers, and announce it that very night. She had nowhere else to go.",
      'A tapestry cushion from the good parlor turned up in the study, tucked behind the desk as if someone hoped it wouldn\'t be noticed. A few pale gold threads matched exactly what was caught at Edmund\'s jaw.',
      "She swore she'd dozed off before ever leaving her room — yet her own spectacles case turned up in the study, nowhere near her bed. No struggle, no raised voice loud enough to carry. His own sister was the last person he'd have thought to fear."
    ]
  },
  {
    killer: 'Julian Voss',
    method: 'staged-accident',
    discoveryDelayed: true,
    firstGlanceNote: "He's slumped in his chair, still as anything. It could almost be nothing — an old man dozing over his letters. Something makes you take a second look.",
    keyEvidence: ['E-42', 'E-55', 'W-07'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him — except for the thin, dark graze at his temple, half-hidden by his hair. It could almost pass for an ordinary stumble, if you didn't know better.",
      'EN-06': "Snapped clean at one hinge and shoved carelessly under a stack of papers — not the careful, deliberate placement you'd expect from a man who treated them like an extension of his own hands.",
      'EN-10': "The graze at his temple lines up exactly with the sharp corner of the marble mantel across the room — too exactly, for a man who supposedly never left his chair. Someone wanted this to look like he simply lost his footing."
    },
    explanation: [
      "It was Julian. The letter to the family solicitor made it plain — Edmund meant to have him formally disinherited and reported to the police for the pawnshop theft, first thing in the morning. It wasn't only ruin he was facing: the men he owed for the debts that started this don't extend grace periods, and an empty name is worse to them than an empty pocket. By tomorrow, he'd have lost everything at once, with nothing left to buy himself out of the rest.",
      'A signet ring, its stone chipped clean off, was found wedged beneath the desk — the exact match for the scrape at Edmund\'s temple, and the sharp corner of the mantel across the room.',
      "He claimed he turned in not long after Marcus left him, but his bed was still made, sheets undisturbed from that morning. Whatever happened in that study was made to look like an accident — and very nearly did. He never saw it coming from his own nephew."
    ]
  },
  {
    killer: 'Diana Reyes',
    method: 'poison',
    keyEvidence: ['E-44', 'E-06', 'E-02', 'E-45', 'W-08', 'W-03'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally, one loosely around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell on his breath that has nothing to do with the whisky decanter beside him.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this was someone he trusted enough not to react to.",
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly."
    },
    explanation: [
      "It was Diana. The termination letter drafted at Edmund's desk confirmed it — he'd found out about her secret dealings with Kessler-Vance, and meant to end their thirty-year partnership publicly, that very night. What the letter didn't say was why she'd gone looking for a way out in the first place: Kessler-Vance had offered her something Edmund never would in thirty years of partnership — her own name on the door, credited at last as the company's actual co-founder, not merely his invaluable \"associate.\"",
      'The empty foxglove vial and the second glass both trace back to the greenhouse, same as always. Her own fountain pen, the one she always carries, was found by the potting shed — nowhere near the library she swore she never left.',
      "A brandy glass, poured but untouched, sat on the library's round table since before eleven — odd, for a woman who claimed to have worked steadily until nearly midnight. The groundskeeper saw a figure crossing from the greenhouse toward the garden door around 11:00 PM. Edmund set his glasses down calmly before he died. Thirty years of partnership, and he never saw this coming."
    ]
  },
  {
    killer: 'Nathaniel Cole',
    method: 'tampered-medication',
    keyEvidence: ['E-46', 'E-70', 'E-56', 'W-10'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally, one curled loosely near an empty medicine glass. His breathing had clearly been labored before it stopped altogether.",
      'EN-06': "He wasn't attacked — he set them down calmly, mid-page, as if he'd simply grown tired. Whoever did this didn't need force. They only needed him to trust his own medicine cabinet.",
      'EN-10': "The empty glass by his hand still carries a faint chalky residue, heavier than his usual heart tonic should leave behind. Someone doubled the dose and trusted no one would think to check."
    },
    explanation: [
      "It was Nathaniel. Buried in the final will draft was an audit clause — an independent review of every account he'd managed, set to begin within the week. Worse, Edmund had learned about Victoria too, eighteen months of it, and meant to confront him about both in the same sitting. A decade of quiet mismanagement and a stolen affair, surfacing on the same night. Every discreet withdrawal had gone toward the same thing: a life that looked like he belonged among the family he served, not merely employed by them.",
      "Edmund's heart tonic, refilled just that week, tested twice the strength it should have been. Only one person besides his physician had ever handled that prescription.",
      "The library fire was banked down to barely embers all evening — an odd thing, if he and Diana truly worked there past midnight in this weather. What little survived in the grate told the real story: scorched fragments in Edmund's own hand, naming the audit and 'the other matter' in the same breath. He trusted his own lawyer completely, right down to the medicine cabinet. That was his mistake."
    ]
  },
  {
    // Eleanor didn't want him dead — he asked her to do it. Reuses the same
    // poison mechanism and shared greenhouse evidence as the five poison
    // killers above (still gated by requires.killerMethod:'poison' in
    // rooms.js), but her motive clue and reveal are about the arrangement
    // itself rather than a personal grudge.
    killer: 'Eleanor Pemberton',
    method: 'poison',
    keyEvidence: ['E-53', 'E-68', 'E-06', 'E-02', 'E-54', 'W-11', 'W-03'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally, one loosely around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell on his breath that has nothing to do with the whisky decanter beside him.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this was someone he trusted enough not to react to.",
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly."
    },
    explanation: [
      "It was Eleanor — though not for any reason the family ever imagined. That unexplained payment was never severance, or a loan, or a bonus — it was payment in full. A note in Edmund's own hand, sealed and hidden in the kitchen, thanked her for understanding what he needed, and asked her to make it look natural, for the family's sake. He hadn't been murdered. He'd asked her to do this.",
      'The empty foxglove vial and the second glass both trace back to the greenhouse, same as always. A second key to the poison cabinet, worn quietly on her own ring for years, is the only thing that explains how she came by it so easily.',
      "Her own tidy record of every task that night doesn't include brewing his evening tea — yet the tray came from her kitchen all the same. Twenty-six years of loyalty, and in the end, it was the one request she couldn't refuse him."
    ]
  },
  {
    // Not a killer at all — the genuine-accident scenario. This "killer" name
    // never appears in the accusation grid (it isn't a real person in
    // CHARACTERS); main.js matches it against a dedicated "It Was an
    // Accident" tile instead.
    killer: 'No One',
    method: 'none',
    discoveryDelayed: true,
    firstGlanceNote: "He's sitting at his desk, head bowed, utterly still. It looks peaceful enough from here. Almost too peaceful.",
    keyEvidence: ['E-52'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. His hand is pressed loosely to his chest, his expression startled rather than pained — the look of a man whose heart simply gave out before he could call for help.",
      'EN-06': "Folded neatly on the blotter, right where he always left them before rubbing his eyes late at night. Nothing here looks disturbed at all — which, this time, might be exactly the point.",
      'EN-10': "Up close, there's no bruise, no residue, no sign anyone else was ever this near him. Just an old man's tired heart, and a doctor's letter on the nightstand upstairs that he never got around to reading."
    },
    explanation: [
      "There was no murder. Dr. Wren's letter, found unopened on his nightstand, had warned him for weeks to slow down — a weak heart, made worse by the stress of the night's announcement.",
      'Every clue that looked damning under close questioning washed out under closer scrutiny: no poison unaccounted for, no bruise, no wound, nothing missing from the study but an old man\'s next tired breath.',
      "He simply sat down at his desk after everyone had gone, and his heart, tired from seventy years and one very long night, finally stopped. No one in that house did this to him — though more than a few, if they're honest, will spend a long time wondering if they should have seen it coming."
    ]
  },
  {
    // Diana's second possible story — same person, a completely different
    // reason, and a different method (blunt-force, not poison), so her two
    // scenarios never cross-contaminate each other's evidence: every clue
    // exclusive to this one is gated on killerMethod:'blunt-force' as well as
    // her name, and her one poison-only clue (E-45) got the same qualifier
    // added so it can't leak in here. Her Kessler-Vance motive (E-44/E-13)
    // still shows up every game regardless, same as always — it's real, it's
    // just not what actually got him killed this time.
    killer: 'Diana Reyes',
    method: 'blunt-force',
    keyEvidence: ['E-71', 'E-72', 'W-08'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. At a glance it looks like he simply put his head down — but there's a dark, heavy bruise at his temple, angled oddly for a fall, and a thin line of dried blood he never had the chance to wipe away.",
      'EN-06': "Knocked clean off and skidded halfway across the blotter — whatever hit him came from someone standing close enough to have been talking with him first, not lunging in sudden anger.",
      'EN-10': "Up close, the wound at his temple is unmistakably a blow, not a fall — round, heavy, and delivered in a single, deliberate swing, not the wild strike of someone caught off guard. Whoever did this had already decided, long before they picked anything up."
    },
    explanation: [
      "It was Diana — though not for the reason anyone suspected. The Kessler-Vance dealings were real enough, and worth ending a partnership over on their own. But that wasn't what got him killed. Thirty years ago, in Geneva, Edmund buried a batch of trial data that should have delayed the cardiac patent the whole company was built on — and Diana had known it, and held it over him, quietly, every year since. Tonight, for the first time, he told her he didn't care anymore what she did with it.",
      "The anonymous note found in his room — \"I know what you did in Geneva. Meet me at midnight or everyone learns.\" — was typed on her own machine in the library; the ribbon's crooked lowercase e matches it exactly. Edmund's brass globe paperweight — the one that always sat on his own desk — turned up wiped clean and hidden behind her own shelves, the dent in it lining up with the blow that caught him at the temple. She hadn't grabbed the nearest thing in a panic. She'd carried it in with her.",
      "She swore she never left the library before midnight — but a full glass of brandy sat forgotten there since before eleven, poured and never touched by a woman supposedly buried in paperwork until midnight. Thirty years of partnership, and in the end, the secret mattered more to her than the man who'd trusted her to keep it."
    ]
  }
];
