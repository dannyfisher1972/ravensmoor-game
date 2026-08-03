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
// Beta 1.1 replayability passes extended the same mechanism to universal
// clues that aren't scenario-exclusive — W-01 (the butler's account,
// Kitchen), then Phase 3 added ten more of the earliest/most-repeated
// universal clues (I-01, E-28, I-04, EN-14, E-84, E-83, I-05, E-59, I-02,
// I-03). All of these vary by METHOD CATEGORY, never by killer — five
// categories (Poisoning / Struggle / Suffocation / Accident / Medical
// Event), the same grouping already used for the Case File's opening
// impression in main.js, so the tone stays consistent everywhere a player
// sees it. Because method assignment is independent of which of the real
// suspects is guilty, none of this narrows down who did it.
export const SOLUTIONS = [
  {
    killer: 'Priya Thorne-Kapoor',
    method: 'poison',
    keyEvidence: ['E-23', 'E-06', 'E-02', 'E-24', 'W-03'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally, one loosely around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell on his breath that has nothing to do with the whisky decanter beside him.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this was someone he trusted enough not to react to.",
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, grown right here. The cabinet takes Priya's key, or the desk spare — not that anyone in this house has ever been especially careful about who knows where that spare lives.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door — the kind of hiding spot that stops being a secret after a season or two on staff.",
      'E-02': "The same bitter residue as the vial. Natural causes this was not — whatever did this came from this greenhouse, one way or another.",
      'W-03': "Someone crossed from the greenhouse toward the garden door around 11:00 PM — that much he's certain of, even in that storm.",
      'E-61': "His card still marks the seat. A small dark stain has worked into the cloth by his water glass — could be wine. Could be something else entirely.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
    },
    explanation: [
      "It was Priya. Edmund's unsent letter said what he'd never say to her face — he was pulling every penny of funding from her research trust. Tonight, she was about to lose the one thing that was ever fully hers.",
      'The empty foxglove vial and the second glass both trace back to her own greenhouse stock. Her gardening gloves, found still damp with the same bitter residue, seal it.',
      "She told everyone she \"went to check on the orchids and then to bed\" — but the groundskeeper saw a figure crossing from the greenhouse toward the garden door around 11:00 PM, the opposite direction from her room. Edmund set his glasses down calmly before he died. He wasn't afraid of her. That's what let her get close enough."
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
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, grown right here in the greenhouse beds. The cabinet's meant to need Priya's key, though the desk spare makes something of a mockery of that.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door. Priya's key was never really the only way in, whatever the lock likes to pretend.",
      'E-02': "Matching residue, matching bitterness. Wherever it went from here, it started in this room — the rest is a question of who carried it out.",
      'W-03': "A figure, greenhouse to garden door, right around 11:00 PM. He'll swear to the timing even if the storm blurred the rest.",
      'E-61': "His place is still set, card and all. That stain near his water glass hasn't fully dried yet — wine, most likely, though not certainly.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
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
      'EN-10': "Parting his hair back gently reveals it clearly now — a single, hard blow to the back of the skull, delivered from behind, the wound curved rather than flat. Whatever was used, it was heavy, hooked at the tip, and swung with real anger. There's no sign he ever saw it coming.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
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
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, and grown close enough to hand that no one would have needed to go far to find it. The cabinet takes Priya's key, or the desk spare, whichever came easier.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door, in plain enough sight that half the household could probably find it blindfolded.",
      'E-02': "The residue matches exactly. This greenhouse is where it began, whatever else remains to be worked out about who left with it.",
      'W-03': "Around 11:00 PM, someone made their way from the greenhouse to the garden door — brief enough that he almost missed it entirely.",
      'E-61': "Nobody's cleared his setting yet. The stain by his glass is dark enough to wonder about — wine spilled in a hurry, or something poured more deliberately.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
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
      'EN-10': "Up close, a single fine thread — pale gold, the kind woven into an antique cushion, not his own clothing — is caught in the stubble at his jaw. Whatever pressed over his face, it wasn't there long. It didn't need to be.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Everything else in this drawer is exactly where it should be — nothing here looks touched at all.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it ended without a sound.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, and nothing else on the shelf looks so much as nudged out of line.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The house has gone almost too still since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. Nothing about it looks disturbed. If anyone passed this way tonight, they left no sign of it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — everything around it sits exactly as it must have all evening, undisturbed.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box sits precisely where it always has, undisturbed.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, no one downstairs heard enough to call for help in time.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — everything in this room is exactly as neat as it always is, no sign anyone passed through tonight at all.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, and everything here sits exactly as tidy as it always does."
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
      'EN-10': "The graze at his temple lines up exactly with the sharp corner of the marble mantel across the room — too exactly, for a man who supposedly never left his chair. Someone wanted this to look like he simply lost his footing.",
      'W-01': "He heard some kind of noise from the study around 10:50 PM — hard to say what, with the storm going. Could have been furniture. Could have been nothing at all.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet, though nothing about this drawer suggests anyone came looking for it in a hurry.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, the study gives no sign anyone else was ever in the room to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though with the storm rattling the windows tonight, it's hard to say what shifted on its own.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Nothing in this room looks disturbed either — whatever happened tonight, it didn't start here.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. Whatever happened in this house tonight, this small, careful thing survived it untouched.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — a small, ordinary thing that has nothing to do with whatever else happened tonight.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" A small, ordinary detail, same as any other night in this room.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whether tonight was an accident or something else, that heart was never going to make it easy to tell the difference.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — a small, practical arrangement, unrelated to whatever else happened in the house tonight.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, a small, practical habit, same as any other night in this kitchen."
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
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, grown right here. The cabinet takes Priya's key, or the desk spare — not that anyone in this house has ever been especially careful about who knows where that spare lives.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door — the kind of hiding spot that stops being a secret after a season or two on staff.",
      'E-02': "The same bitter residue as the vial. Natural causes this was not — whatever did this came from this greenhouse, one way or another.",
      'W-03': "Someone crossed from the greenhouse toward the garden door around 11:00 PM — that much he's certain of, even in that storm.",
      'E-61': "His card still marks the seat. A small dark stain has worked into the cloth by his water glass — could be wine. Could be something else entirely.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
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
      'EN-10': "The empty glass by his hand still carries a faint chalky residue, heavier than his usual heart tonic should leave behind. Someone doubled the dose and trusted no one would think to check.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — though tonight, that may turn out to matter less than it first seems.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, his own tired heart may have beaten him to it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, a small, forgettable thing, same as any other night in this library.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The house has been quiet enough tonight that a single closing door carried clean down the hall.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, unbothered by whatever's happening elsewhere in the house tonight.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — a small keepsake that will outlast the man who kept it by one more night than he expected.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" A small, ordinary detail that outlived him by only a few hours, in the end.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever the family wants to believe, that heart alone may be all the explanation this case needs.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — a small kindness that, tonight, may matter more than anyone realizes yet.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, a small, practical habit that outlasted the man who never had to ask for it twice."
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
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is stronger here than anywhere else in the room. Whatever was in that teacup, it worked fast — and quietly.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, grown right here in the greenhouse beds. The cabinet's meant to need Priya's key, though the desk spare makes something of a mockery of that.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door. Priya's key was never really the only way in, whatever the lock likes to pretend.",
      'E-02': "Matching residue, matching bitterness. Wherever it went from here, it started in this room — the rest is a question of who carried it out.",
      'W-03': "A figure, greenhouse to garden door, right around 11:00 PM. He'll swear to the timing even if the storm blurred the rest.",
      'E-61': "His place is still set, card and all. That stain near his water glass hasn't fully dried yet — wine, most likely, though not certainly.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
    },
    explanation: [
      "It was Eleanor — though not for any reason the family ever imagined. That unexplained payment was never severance, or a loan, or a bonus. A sealed note in Edmund's own hand, hidden in the kitchen, thanked her for a kindness he said he could repay no other way, and asked that whatever people assumed about the money, she let them keep assuming it. Nobody in that house ever thought to ask what he actually meant by it — until now.",
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
      'EN-10': "Up close, there's no bruise, no residue, no sign anyone else was ever this near him. Just an old man's tired heart, and a doctor's letter on the nightstand upstairs that he never got around to reading.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — though tonight, that may turn out to matter less than it first seems.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, his own tired heart may have beaten him to it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, a small, forgettable thing, same as any other night in this library.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The house has been quiet enough tonight that a single closing door carried clean down the hall.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, unbothered by whatever's happening elsewhere in the house tonight.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — a small keepsake that will outlast the man who kept it by one more night than he expected.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" A small, ordinary detail that outlived him by only a few hours, in the end.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever the family wants to believe, that heart alone may be all the explanation this case needs.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — a small kindness that, tonight, may matter more than anyone realizes yet.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, a small, practical habit that outlasted the man who never had to ask for it twice."
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
      'EN-10': "Up close, the wound at his temple is unmistakably a blow, not a fall — round, heavy, and delivered in a single, deliberate swing, not the wild strike of someone caught off guard. Whoever did this had already decided, long before they picked anything up.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Diana — though not for the reason anyone suspected. The Kessler-Vance dealings were real enough, and worth ending a partnership over on their own. But that wasn't what got him killed. Thirty years ago, in Geneva, Edmund buried a batch of trial data that should have delayed the cardiac patent the whole company was built on — and Diana had known it, and held it over him, quietly, every year since. Tonight, for the first time, he told her he didn't care anymore what she did with it.",
      "The anonymous note found in his room — \"I know what you did in Geneva. Meet me at midnight or everyone learns.\" — was typed on her own machine in the library; the ribbon's crooked lowercase e matches it exactly. Edmund's brass globe paperweight — the one that always sat on his own desk — turned up wiped clean and hidden behind her own shelves, the dent in it lining up with the blow that caught him at the temple. She hadn't grabbed the nearest thing in a panic. She'd carried it in with her.",
      "She swore she never left the library before midnight — but a full glass of brandy sat forgotten there since before eleven, poured and never touched by a woman supposedly buried in paperwork until midnight. Thirty years of partnership, and in the end, the secret mattered more to her than the man who'd trusted her to keep it."
    ]
  },

  // --- Second, third, and fourth stories for the cast above -----------------
  // Every real suspect below already has one method (see their entry
  // earlier in this file). These give each of them up to three more —
  // a different secret, a different weapon, a different way it could have
  // gone — so no single wound or object is ever a permanent tell for one
  // person across replays. Their ORIGINAL motive clues (gated on npc, not
  // killer) stay visible in every one of their stories, same as always —
  // real people accumulate more than one real grievance. Alibi-break clues
  // are reused as-is across a character's stories too: where someone
  // claims to have been doesn't depend on which weapon they reached for.

  {
    killer: 'Priya Thorne-Kapoor',
    method: 'blunt-force',
    keyEvidence: ['E-86', 'E-33', 'E-23'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. At a glance it looks peaceful enough — but a faint, curved bruise mars his temple, an odd shape for a simple fall.",
      'EN-06': "Set down neatly enough, save for a thin ring of dried clay dust beside them — as if something freshly broken had rested there a moment before it was cleared away.",
      'EN-10': "Up close, the bruise is unmistakably curved, not flat — heavy stoneware or ceramic, swung hard, and only once.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Priya. The patent filing said everything Edmund never would to her face — he'd taken credit for her own hybrid and meant to sell it out from under her, erasing her name from years of work in a single contract.",
      "A shattered urn, swept hastily behind the potting bench, still had traces of the same clay dust found on Edmund's own reading glasses — and the curved bruise at his temple matched its shape exactly. Whatever she'd built in that greenhouse, she wasn't going to watch him take it too."
    ]
  },
  {
    killer: 'Priya Thorne-Kapoor',
    method: 'stabbing',
    keyEvidence: ['E-87', 'E-33', 'E-23'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A dark stain has spread through his shirtfront, deeper and stranger than spilled wine.",
      'EN-06': "Folded and set aside with unusual care, further from his hand than he'd normally leave them — whoever did this had a moment alone with him first.",
      'EN-10': "Up close, the wound is narrow and deep, a single decisive thrust rather than a wild swing. Whoever held the blade knew exactly where to aim, and didn't hesitate.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Priya. The torn merger contract made it plain — Edmund had promised her hand in marriage to secure a distributor's backing, her name signed in his own hand, never asking hers first.",
      "The pruning shears, wiped clean and hung back on their hook, still carried a fresh nick in the blade. Whatever he thought he could arrange for her without asking, she made sure it was the last decision he ever made for her."
    ]
  },
  {
    killer: 'Priya Thorne-Kapoor',
    method: 'strangulation',
    keyEvidence: ['E-88', 'E-33', 'E-23'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A thin, dark line rings his throat, half-hidden by his collar.",
      'EN-06': "Knocked askew and left folded crookedly on the blotter — he never got the chance to set them down properly.",
      'EN-10': "Up close, the mark at his throat is a single thin cord's width, drawn tight from behind. Whoever did this stood over him while he was still seated, and never let go until it was over.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Priya. The shipping manifest, hidden beneath her own workbench, confirmed what Edmund had only just discovered — two years of rare seed stock sold quietly to a rival lab. He meant to call her a traitor in front of the entire family that very night.",
      "A length of garden wire, cut clean from the coil in the greenhouse, was never found again — until the thin mark it left at Edmund's throat told the rest of the story. She stood over him until it was finished, and never looked away."
    ]
  },

  {
    killer: 'Victoria Thorne',
    method: 'strangulation',
    keyEvidence: ['E-89', 'E-34', 'E-15'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A thin, dark line rings his throat, mostly hidden beneath his collar.",
      'EN-06': "Knocked askew, one arm bent — he never got the chance to set them down properly.",
      'EN-10': "Up close, the mark at his throat is a single narrow band, drawn tight from behind. Whoever did this stood close, and waited until it was over.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Victoria. Edmund had finally tracked down proof of a marriage she'd never told anyone about — a husband from years before she ever met him — and meant to have it annulled publicly, dragging her name through every paper in the county by morning.",
      "A silk sash, missing from her own dressing gown and quietly replaced, matched the single narrow mark at Edmund's throat exactly. Seven years of careful appearances, and in the end, the truth that undid her had nothing to do with Nathaniel at all."
    ]
  },
  {
    killer: 'Victoria Thorne',
    method: 'blunt-force',
    keyEvidence: ['E-90', 'E-34', 'E-15'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A small, round bruise sits just above his ear, easy to miss under the lamp light.",
      'EN-06': "Knocked loose and left folded crookedly on the blotter, as if set down in a hurry rather than a habit.",
      'EN-10': "Up close, the bruise is round and shallow — something smooth and heavy, not sharp. A single blow, close range, someone he never expected to swing at all.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Victoria. Edmund had noticed the forgery on the loan document himself — her signature for his, competent enough to nearly pass — and meant to have her accounts frozen the moment the banks opened.",
      "Her own silver hand mirror, wiped clean but for a hairline crack down the handle, matched the round, shallow bruise at Edmund's temple. He never saw the blow coming from the one drawer he never thought to check."
    ]
  },
  {
    killer: 'Victoria Thorne',
    method: 'stabbing',
    keyEvidence: ['E-91', 'E-34', 'E-15'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A dark stain has soaked through his shirt, just left of center.",
      'EN-06': "Set down with unusual care, further from his hand than habit would explain.",
      'EN-10': "Up close, the wound is narrow, precise, angled from above — someone standing over him, not struggling with him.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Victoria — though not entirely for herself. Edmund's drafted complaint to the bar association would have ended Nathaniel's career and very possibly his freedom, on top of exposing them both. She'd risked plenty for that affair already; she wasn't going to let Edmund be the one to finish it.",
      "A bent hairpin, small enough to overlook, matched the narrow, precise wound at Edmund's chest — a single thrust from someone standing over him, not struggling with him. Whatever else was true about her, when it came to protecting Nathaniel, she didn't hesitate."
    ]
  },

  {
    killer: 'Marcus Thorne',
    method: 'poison',
    keyEvidence: ['E-92', 'E-26', 'E-11'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally around an empty nightcap glass. His lips have a faint bluish tinge, and there's a bitter smell that has nothing to do with the whisky itself.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this was someone he trusted enough not to react to.",
      'EN-10': "Up close, the bluish tinge at his lips is unmistakable, and the bitter smell is strongest here. Whatever was in that glass, it worked fast — and quietly.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, and grown close enough to hand that no one would have needed to go far to find it. The cabinet takes Priya's key, or the desk spare, whichever came easier.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door, in plain enough sight that half the household could probably find it blindfolded.",
      'E-02': "The residue matches exactly. This greenhouse is where it began, whatever else remains to be worked out about who left with it.",
      'W-03': "Around 11:00 PM, someone made their way from the greenhouse to the garden door — brief enough that he almost missed it entirely.",
      'E-61': "Nobody's cleared his setting yet. The stain by his glass is dark enough to wonder about — wine spilled in a hurry, or something poured more deliberately.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
    },
    explanation: [
      "It was Marcus. Edmund meant to read his gambling debts aloud at the very announcement meant to name an heir — public ruin before any inheritance at all, trust or no trust.",
      "A fresh chip in the nightcap decanter's stopper and a bitter film on the rim traced straight back to him. He'd always been better with a bottle than a plan — and it turned out that was all he needed."
    ]
  },
  {
    killer: 'Marcus Thorne',
    method: 'staged-accident',
    discoveryDelayed: true,
    firstGlanceNote: "He's slumped in his chair, still as anything. It could almost be nothing — an old man who fell asleep over his letters. Something makes you take a second look.",
    keyEvidence: ['E-93', 'W-04', 'E-11'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him — except for a thin, dark graze at his temple, half-hidden by his hair. It could almost pass for a stumble, if you didn't know better.",
      'EN-06': "Snapped clean at one hinge and shoved under a stack of papers — not the careful placement of a man who treated them like his own hands.",
      'EN-10': "The graze lines up exactly with the sharp corner of the mantel — too exactly, for a man who never left his chair. Someone wanted this to look like an accident, and very nearly managed it.",
      'W-01': "He heard some kind of noise from the study around 10:50 PM — hard to say what, with the storm going. Could have been furniture. Could have been nothing at all.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet, though nothing about this drawer suggests anyone came looking for it in a hurry.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, the study gives no sign anyone else was ever in the room to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though with the storm rattling the windows tonight, it's hard to say what shifted on its own.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Nothing in this room looks disturbed either — whatever happened tonight, it didn't start here.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. Whatever happened in this house tonight, this small, careful thing survived it untouched.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — a small, ordinary thing that has nothing to do with whatever else happened tonight.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" A small, ordinary detail, same as any other night in this room.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whether tonight was an accident or something else, that heart was never going to make it easy to tell the difference.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — a small, practical arrangement, unrelated to whatever else happened in the house tonight.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, a small, practical habit, same as any other night in this kitchen."
    },
    explanation: [
      "It was Marcus. Edmund's unsent letter to a city specialist requested a formal competency evaluation — not concern for his son's health, but a plan to have him declared unfit to inherit anything at all.",
      "Half-burned matches scattered near the garage suggest a long, nervous wait before he could go through with it. The graze at Edmund's temple, lined up exactly with the mantel's corner, was made to look like nobody's fault. It very nearly was."
    ]
  },
  {
    killer: 'Marcus Thorne',
    method: 'strangulation',
    keyEvidence: ['E-94', 'E-26', 'E-11'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A dark, uneven mark rings his throat, only visible once you look closely.",
      'EN-06': "Knocked to the floor entirely, one lens cracked — whoever did this wasn't thinking about tidiness.",
      'EN-10': "Up close, the mark at his throat is wide and uneven, not a clean cord — bare hands, not a weapon. Whoever did this wasn't calm about it.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Marcus. Nobody who was at dinner disputes it — the argument in the study was the loudest anyone could remember, and Marcus had been drinking since before the first course.",
      "A shattered whisky glass, flung hard enough to scatter across the gravel outside, matched the uneven, bare-handed mark at Edmund's throat. Whatever started as shouting didn't end that way."
    ]
  },

  {
    killer: 'Vivienne Thorne',
    method: 'staged-accident',
    discoveryDelayed: true,
    firstGlanceNote: "He's slumped in his chair, utterly still. It looks peaceful enough from here — head bowed, hands loose in his lap. Almost too peaceful.",
    keyEvidence: ['E-95', 'W-05', 'E-30'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him — except for a thin, dark graze at his temple. It could almost pass for a stumble.",
      'EN-06': "Snapped at the hinge, shoved carelessly aside — not how he usually left them.",
      'EN-10': "The graze lines up with the mantel's corner exactly. Someone wanted this to look accidental.",
      'W-01': "He heard some kind of noise from the study around 10:50 PM — hard to say what, with the storm going. Could have been furniture. Could have been nothing at all.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet, though nothing about this drawer suggests anyone came looking for it in a hurry.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, the study gives no sign anyone else was ever in the room to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though with the storm rattling the windows tonight, it's hard to say what shifted on its own.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Nothing in this room looks disturbed either — whatever happened tonight, it didn't start here.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. Whatever happened in this house tonight, this small, careful thing survived it untouched.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — a small, ordinary thing that has nothing to do with whatever else happened tonight.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" A small, ordinary detail, same as any other night in this room.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whether tonight was an accident or something else, that heart was never going to make it easy to tell the difference.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — a small, practical arrangement, unrelated to whatever else happened in the house tonight.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, a small, practical habit, same as any other night in this kitchen."
    },
    explanation: [
      "It was Vivienne. A decades-old hospital record, hidden behind a loose floorboard for years, finally caught up with her — proof of a parentage secret Edmund had only just uncovered, and meant to reveal to his own children that very night, whatever it cost the family name.",
      "The graze at Edmund's temple lined up exactly with the mantel's corner — too exactly for the fall it was made to resemble — and a single strand of her unmistakable red hair, caught on that same corner, put her right there when it happened. Whatever this marriage became, she was never going to let him unmake her place in it with a single conversation."
    ]
  },
  {
    killer: 'Vivienne Thorne',
    method: 'smothering',
    keyEvidence: ['E-96', 'W-05', 'E-30'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. No wounds, no struggle — but his color is wrong, a faint mottled flush that doesn't belong on a man who simply dozed off.",
      'EN-06': "Folded and set down with unusual care, further from his hand than habit. Whoever did this had a moment alone with him first.",
      'EN-10': "Up close, a single fine thread — pale, from an old shawl, not his own clothing — is caught at his jaw. Whatever pressed over his face wasn't there long. It didn't need to be.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Everything else in this drawer is exactly where it should be — nothing here looks touched at all.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it ended without a sound.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, and nothing else on the shelf looks so much as nudged out of line.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The house has gone almost too still since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. Nothing about it looks disturbed. If anyone passed this way tonight, they left no sign of it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — everything around it sits exactly as it must have all evening, undisturbed.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box sits precisely where it always has, undisturbed.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, no one downstairs heard enough to call for help in time.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — everything in this room is exactly as neat as it always is, no sign anyone passed through tonight at all.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, and everything here sits exactly as tidy as it always does."
    },
    explanation: [
      "It was Vivienne. The eviction notice, drafted and dated for the end of the month, would have put her out of Ravensmoor entirely — no rooms, no claim, nowhere left to be underfoot.",
      "A pale shawl thread, caught at Edmund's jaw, matched one missing from her own sitting room. Being poor never frightened her. Having nowhere left to go finally did."
    ]
  },
  {
    killer: 'Vivienne Thorne',
    method: 'stabbing',
    keyEvidence: ['E-97', 'W-05', 'E-30'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A dark stain has spread through his shirtfront.",
      'EN-06': "Set aside with care, further from his hand than usual.",
      'EN-10': "Up close, the wound is narrow and sudden — someone who struck once, in anger, and didn't plan a second.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Vivienne. Edmund's own engagement announcement — to someone younger, someone the papers would adore — was never going to include her, not even as an afterthought. Losing money was survivable. Being erased in front of everyone who still called her Mrs. Thorne was not.",
      "A letter opener from the parlor's own writing desk, wiped down but for a last dark fleck near the tip, told the physical story; a crumpled save-the-date thrown behind the settee told the rest of it. The wound was narrow, sudden, and entirely unplanned — much like the moment itself."
    ]
  },

  {
    killer: 'Harriet Voss',
    method: 'stabbing',
    keyEvidence: ['E-98', 'W-06', 'E-40'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A dark stain has spread across his shirt.",
      'EN-06': "Set aside with unusual care, further than habit would explain.",
      'EN-10': "Up close, the wound is narrow and controlled — someone who knew exactly what they were doing, and didn't linger.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Harriet. Edmund had only just found her own pawnshop ledger — years of quietly selling off her late husband's watch, a painting she called a family heirloom at every holiday dinner, silver that was never really hers to sell.",
      "The letter opener, wiped but not polished clean, still carried a duller stain near its point. She'd spent a decade lecturing this family about honesty. It turned out she couldn't survive her own."
    ]
  },
  {
    killer: 'Harriet Voss',
    method: 'poison',
    keyEvidence: ['E-99', 'W-06', 'E-40'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell that has nothing to do with the whisky decanter.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this, he trusted enough not to react.",
      'EN-10': "Up close, the bluish tinge is unmistakable, and the bitter smell is strongest here. Whatever was in that tea, it worked fast and quietly.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, grown right here. The cabinet takes Priya's key, or the desk spare — not that anyone in this house has ever been especially careful about who knows where that spare lives.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door — the kind of hiding spot that stops being a secret after a season or two on staff.",
      'E-02': "The same bitter residue as the vial. Natural causes this was not — whatever did this came from this greenhouse, one way or another.",
      'W-03': "Someone crossed from the greenhouse toward the garden door around 11:00 PM — that much he's certain of, even in that storm.",
      'E-61': "His card still marks the seat. A small dark stain has worked into the cloth by his water glass — could be wine. Could be something else entirely.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
    },
    explanation: [
      "It was Harriet. An old affair from decades ago, one that would have scandalized the family every bit as badly as anything she'd ever accused anyone else of, was about to slip out at dinner — gently, plainly, and permanently.",
      "A tin of headache powder, relabeled in her own hand, matched the bitter tea that never should have killed anyone. She'd built a whole reputation on being the one who saw through everyone else. She just made sure no one saw through her."
    ]
  },
  {
    killer: 'Harriet Voss',
    method: 'blunt-force',
    keyEvidence: ['E-100', 'W-06', 'E-40'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him — a small, dark bruise sits above his hairline, easy to miss under the lamp light.",
      'EN-06': "Knocked askew and left folded crookedly, as if set down in a hurry.",
      'EN-10': "Up close, the bruise is round and shallow — something heavy and close at hand, not brought in with intent. A single blow, in the heat of an argument that went further than words.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Harriet. The property sale prospectus was real enough, and the argument over it, by every account, was the loudest anyone in the house could remember that night.",
      "A heavy book, knocked from the shelf and left where it fell rather than replaced, carried a freshly dented corner. Whatever she meant to say to him, it went further than words before either of them meant it to."
    ]
  },

  {
    killer: 'Julian Voss',
    method: 'poison',
    keyEvidence: ['E-101', 'W-07', 'E-42'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally around a cold teacup. His lips have a faint bluish tinge, and there's a bitter smell that has nothing to do with the whisky.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this, he trusted enough not to react.",
      'EN-10': "Up close, the bluish tinge is unmistakable, and the bitter smell is strongest here. Whatever was in that tea, it worked fast.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, grown right here in the greenhouse beds. The cabinet's meant to need Priya's key, though the desk spare makes something of a mockery of that.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door. Priya's key was never really the only way in, whatever the lock likes to pretend.",
      'E-02': "Matching residue, matching bitterness. Wherever it went from here, it started in this room — the rest is a question of who carried it out.",
      'W-03': "A figure, greenhouse to garden door, right around 11:00 PM. He'll swear to the timing even if the storm blurred the rest.",
      'E-61': "His place is still set, card and all. That stain near his water glass hasn't fully dried yet — wine, most likely, though not certainly.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
    },
    explanation: [
      "It was Julian. The pawnshop ticket for his grandfather's own watch — pawned that very afternoon, not weeks ago like the cufflinks — meant whatever he owed couldn't wait for a slow, careful plan.",
      "A spare greenhouse key, tucked in the same pocket as the pawn ticket, still carried the same bitter residue as the vial itself. He couldn't wait to be formally disinherited to feel the walls closing in — whoever he owed wanted their money that night, and he made sure Edmund's would be available to take."
    ]
  },
  {
    killer: 'Julian Voss',
    method: 'blunt-force',
    keyEvidence: ['E-102', 'W-07', 'E-42'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him — a small, dark bruise sits above his hairline.",
      'EN-06': "Knocked loose and left folded crookedly, as if set down in a hurry.",
      'EN-10': "Up close, the bruise is round and shallow. Whoever swung it wasn't calm about it, and wasn't carrying it in from elsewhere.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Julian. Caught mid-search of the study desk that same night — not planning ahead, just looking for anything worth enough to sell before morning — he panicked the moment Edmund walked in on him.",
      "A silver candlestick, wiped down and shoved under his bed, still carried a telling bend at its base. Whatever he meant to steal, he ended up taking something far worse instead."
    ]
  },
  {
    killer: 'Julian Voss',
    method: 'stabbing',
    keyEvidence: ['E-103', 'W-07', 'E-42'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A dark stain has spread through his shirtfront.",
      'EN-06': "Set aside with unusual care, further from his hand than usual.",
      'EN-10': "Up close, the wound is sudden and unpracticed — someone who'd never done this before, and didn't stop to think twice.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Julian. Edmund confronted him directly that night — no letter, no solicitor, just the two of them and the theft laid bare between them, man to man.",
      "A hunting knife, missing from its mount above his own mantel, left a dust outline no one could argue with. It was over before either of them had time to think better of it."
    ]
  },

  {
    killer: 'Nathaniel Cole',
    method: 'blunt-force',
    keyEvidence: ['E-104', 'W-10', 'E-46'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him — a small, dark bruise sits above his hairline.",
      'EN-06': "Knocked askew and left folded crookedly on the blotter.",
      'EN-10': "Up close, the bruise is round and shallow — heavy and deliberate, delivered by someone he never thought to flinch from.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Nathaniel. Long before any audit was ever proposed, he'd forged an earlier version of Edmund's will himself — and Edmund, reviewing his own old papers, had only just noticed the mismatch in the handwriting.",
      "A heavy bookend, wiped down and set back on the shelf slightly askew, matched the round bruise at Edmund's temple exactly. Twelve years of trust, undone by a single forgery finally caught."
    ]
  },
  {
    killer: 'Nathaniel Cole',
    method: 'poison',
    keyEvidence: ['E-105', 'W-10', 'E-46'],
    sceneNotes: {
      'E-01': "He's still slumped forward in his chair, exactly as the housekeeper found him. No sign of struggle — his hands rest naturally around a cold teacup. His lips have a faint bluish tinge.",
      'EN-06': "He wasn't attacked — he set them down calmly. Whoever did this, he trusted enough not to react.",
      'EN-10': "Up close, the bluish tinge is unmistakable. Whatever was in that glass, it worked fast and quietly.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'E-06': "Foxglove — digitalis, and grown close enough to hand that no one would have needed to go far to find it. The cabinet takes Priya's key, or the desk spare, whichever came easier.",
      'E-73': "Tucked under an overturned flowerpot by the greenhouse door, in plain enough sight that half the household could probably find it blindfolded.",
      'E-02': "The residue matches exactly. This greenhouse is where it began, whatever else remains to be worked out about who left with it.",
      'W-03': "Around 11:00 PM, someone made their way from the greenhouse to the garden door — brief enough that he almost missed it entirely.",
      'E-61': "Nobody's cleared his setting yet. The stain by his glass is dark enough to wonder about — wine spilled in a hurry, or something poured more deliberately.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet — of all the rooms in this house, tonight, that one feels like it matters most.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, he never got the chance to say it out loud — not to anyone who stayed in the room long enough to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about. Whoever left it there wasn't in any hurry.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The whole wing's been unnervingly quiet since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. A small, patient thing, in a house that's about to need a great deal more patience than usual.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to. Whatever else is true tonight, someone still kept this close enough to matter.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" Whatever else changed in this house tonight, he never got around to updating the label.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, it wasn't his heart that ran out of patience first.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like. Tonight, of all nights, that's a detail worth remembering.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything. Tonight, that habit of hers is doing a great deal of quiet work."
    },
    explanation: [
      "It was Nathaniel. Edmund had drafted a letter to the bar association himself — disbarment, publicly, rather than any quiet settlement, whatever it cost the family's own name in the process.",
      "A brandy glass, rinsed but never quite clean, still carried the same bitter film as everything else that killed him. He'd spent twelve years managing everyone else's secrets. He couldn't manage his own exposure."
    ]
  },
  {
    killer: 'Nathaniel Cole',
    method: 'strangulation',
    keyEvidence: ['E-106', 'W-10', 'E-46'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A thin mark rings his throat, mostly hidden by his collar.",
      'EN-06': "Knocked to the floor, one lens cracked clean through.",
      'EN-10': "Up close, the mark is a single narrow cord, drawn tight from behind. Whoever did this meant to finish it, not just frighten him.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Nathaniel. Edmund's half-burned notes threatened to tell Victoria's husband everything — ruining her and Nathaniel together, in the same breath, the same night.",
      "A length of curtain cord, cut down from the library's own tall window, matched the single narrow mark at Edmund's throat. Whatever he'd risked the affair for, he wasn't going to lose it to a letter."
    ]
  },

  {
    killer: 'Diana Reyes',
    method: 'stabbing',
    keyEvidence: ['E-107', 'W-08', 'E-44'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A dark stain has spread through his shirtfront.",
      'EN-06': "Set aside with unusual care, further from his hand than usual.",
      'EN-10': "Up close, the wound is narrow and precise — a single, decisive thrust from someone who'd clearly thought about exactly where to aim.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Diana. An insurance policy on Edmund's own life, naming her sole beneficiary and taken out years before anyone thought to ask why, was suddenly worth more than the partnership itself — the company's fortunes had been sinking quietly for two years.",
      "A letter opener from her own desk, the only thing in the library actually pointed and sharp, matched the single decisive wound exactly. Thirty years of partnership, and in the end, the payout mattered more than either of them."
    ]
  },
  {
    killer: 'Diana Reyes',
    method: 'strangulation',
    keyEvidence: ['E-108', 'W-08', 'E-44'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. A thin mark rings his throat, half-hidden by his collar.",
      'EN-06': "Knocked askew, one arm bent awkwardly against the blotter.",
      'EN-10': "Up close, the mark is a single narrow band. Whoever did this had thirty years of practice reading exactly how far he could be pushed — and pushed further.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Diana — though not for Kessler-Vance at all, in the end. She'd been quietly feeding both of her partners' secrets to a third company entirely, playing every side against the other for a payout bigger than any single deal. Edmund had only just pieced together whose interests she was really serving.",
      "A braided cord from her own reading lamp, snapped clean and never replaced, matched the mark at Edmund's throat exactly. Behind that same lamp, a torn telegram from a firm neither Edmund nor Kessler-Vance had ever done business with confirmed who she was really working for. Thirty years of trust, and she'd never once been playing for either side she claimed."
    ]
  },

  {
    killer: 'Eleanor Pemberton',
    method: 'asphyxiation',
    discoveryDelayed: true,
    firstGlanceNote: "He's slumped at his desk, head bowed, utterly still. It looks like he simply dozed off over his letters. You'll need to look closer.",
    keyEvidence: ['E-109', 'E-53'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him. His color is faintly off, a headache-thin flush that doesn't quite belong on a man who simply nodded off.",
      'EN-06': "Folded neatly enough, though slightly nearer the lamp than he usually leaves them.",
      'EN-10': "Up close, there's a faint, sweetish smell that has nothing to do with the whisky decanter — the same smell that lingers near an unlit gas fixture left open too long.",
      'W-01': "He didn't hear anything unusual from the study that night — no raised voices, nothing out of place. If something happened up there, it happened quietly.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Everything else in this drawer is exactly where it should be — nothing here looks touched at all.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it ended without a sound.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, and nothing else on the shelf looks so much as nudged out of line.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. The house has gone almost too still since the study door closed for the night.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. Nothing about it looks disturbed. If anyone passed this way tonight, they left no sign of it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — everything around it sits exactly as it must have all evening, undisturbed.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box sits precisely where it always has, undisturbed.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, no one downstairs heard enough to call for help in time.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — everything in this room is exactly as neat as it always is, no sign anyone passed through tonight at all.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, and everything here sits exactly as tidy as it always does."
    },
    explanation: [
      "It was Eleanor. Not gratitude, not a bonus — a termination letter, drafted in Edmund's own hand, quietly letting her go after twenty-six years without so much as a pension, in favor of someone younger. She found her own copy before he ever worked up the nerve to hand it over.",
      "The gas fixture in his own study, left open long after the lamps should have been the only thing lit, explains the faint sweetish smell that never should have been there. Twenty-six years of loyalty, and he still thought she'd go quietly."
    ]
  },
  {
    killer: 'Eleanor Pemberton',
    method: 'blunt-force',
    keyEvidence: ['E-110', 'E-53'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair, exactly as the housekeeper found him — a small, dark bruise sits above his hairline.",
      'EN-06': "Knocked loose, left folded crookedly on the blotter.",
      'EN-10': "Up close, the bruise is round and shallow — something from the kitchen, not the study, swung once in something closer to panic than plan.",
      'W-01': "He swears he heard raised voices from the study around 10:50 PM — an argument, by the sound of it, though he couldn't make out a single word through the door.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet. Whoever last opened this drawer wasn't being careful about it — it's sitting askew, not tucked neatly away.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, it didn't end quietly.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though it's been knocked half out of place, like someone brushed past the shelf without stopping to notice.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Even from here, you can still feel the echo of raised voices carrying down the hall earlier.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. It's hung slightly crooked tonight — knocked, maybe, by someone moving too quickly past it.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — though the cushion it was tucked behind has been shoved half off the settee.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" The writing box itself has been jostled half off the desk.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whatever finally happened to him tonight, a weak heart was the least of what he needed to survive it.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like, though nothing in this tidy room suggests anyone came through here tonight in any particular hurry.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, though the tins themselves have been knocked slightly out of their usual row."
    },
    explanation: [
      "It was Eleanor. A kitchen ledger, skimmed carefully over years, and a photograph of a family that had never once set foot in Ravensmoor told the truth Edmund had only just started asking about — a life she'd built entirely outside these walls, on money that was never hers.",
      "Whatever she used, kept close in the kitchen rather than carried in from elsewhere, matched the shallow, round bruise exactly. She panicked the moment he asked the right question, and never got the chance to explain herself."
    ]
  },
  {
    killer: 'Eleanor Pemberton',
    method: 'fall',
    discoveryDelayed: true,
    firstGlanceNote: "He's slumped forward at his desk, exactly where he always sits. From here, nothing looks out of place at all.",
    keyEvidence: ['E-111', 'E-53'],
    sceneNotes: {
      'E-01': "He's slumped forward in his chair — except the study clearly isn't where he died. Faint drag marks track across the rug toward the desk, and a thin trail of dust from the back stairwell hasn't been swept away.",
      'EN-06': "Set down carefully enough, but at an angle that doesn't match where his hands would naturally have rested.",
      'EN-10': "Up close, the injury pattern doesn't match a fall from standing height — more consistent with a tumble down a full flight of stairs, moved afterward to look like he never left his desk at all.",
      'W-01': "He heard some kind of noise from the study around 10:50 PM — hard to say what, with the storm going. Could have been furniture. Could have been nothing at all.",
      'I-01': "A small brass key, kept in the drawer for emergencies. It looks like it might fit the greenhouse cabinet, though nothing about this drawer suggests anyone came looking for it in a hurry.",
      'E-28': "Edmund's private diary, one entry read aloud only to himself: \"They all think I don't see it. I see everything. Tonight, I end the guessing.\" Whatever he meant to end tonight, the study gives no sign anyone else was ever in the room to hear it.",
      'I-04': "Wedged into the spine of an old atlas, like a bookmark someone forgot about, though with the storm rattling the windows tonight, it's hard to say what shifted on its own.",
      'EN-14': "Not a single ember, not even ash swept fresh. Whatever kept this room warm tonight, it wasn't a fire. Nothing in this room looks disturbed either — whatever happened tonight, it didn't start here.",
      'E-84': "On the wall, a little uneven with age: six roses stitched round the border, one for each year the room says it took to finish. Whatever happened in this house tonight, this small, careful thing survived it untouched.",
      'E-83': "Tucked behind a cushion, half the ink gone: \"2 – 0 – _ – 7.\" A keepsake of some kind, going by the box it was found next to — a small, ordinary thing that has nothing to do with whatever else happened tonight.",
      'I-05': "In Edmund's own writing box, labeled in faded ink: \"V's cabinet.\" A small, ordinary detail, same as any other night in this room.",
      'E-59': "A weak heart, worsening for months. Edmund refused to slow down despite repeated warnings — the birthday announcement was, in Dr. Wren's own words, \"the last thing keeping him upright.\" Whether tonight was an accident or something else, that heart was never going to make it easy to tell the difference.",
      'I-02': "Eleanor's doing, most likely — physicians keeping late hours get given odd keys, for medicinal brandy and the like — a small, practical arrangement, unrelated to whatever else happened in the house tonight.",
      'I-03': "Tucked behind the spice tins — Eleanor keeps a spare of nearly everything, a small, practical habit, same as any other night in this kitchen."
    },
    explanation: [
      "It was Eleanor — though the family had the dynamic backward the whole time. A locked strongbox, forced open the night he died, held years of Edmund's own letters, kept as leverage rather than loyalty. He confronted her with the box itself, and she couldn't let him walk away with it.",
      "The drag marks across the study rug and the dust from the back stairwell tell the real story — he never died at that desk at all. Twenty-six years of watching this family perform for each other, and in the end, she was the one who'd been quietly holding all the real cards."
    ]
  }
];
