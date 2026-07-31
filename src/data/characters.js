import { ROOMS } from './rooms.js';
import { victoriaStatus } from '../state.js';

// Edmund is 70; Victoria is twenty years younger, twenty-five going on
// twenty-six years his junior in spirit. Whether they're actually married
// this game is a second random axis independent of who the killer is (see
// state.js's victoriaStatus) — it changes her role/bio/motive-adjacent
// answer, not her alibi or her opinion of the rest of the household.
const VICTORIA_BY_STATUS = {
  wife: {
    displayName: 'Victoria Thorne',
    role: "Edmund's Wife",
    bio: "Edmund's second wife — twenty years his junior, married seven years ago. Elegant and controlled in public, she has spent those years managing the family's opinion of her as carefully as Edmund managed its money. The rest of the family has never quite let her forget she wasn't the first — least of all Vivienne herself, who never really left.",
    relationshipAnswer: "Seven years, and every one of them under a microscope. He liked having a wife young enough to keep up appearances, and old enough, he thought, to know better than to embarrass him.",
    relationshipAltAnswer: "Married seven years, and I still don't think he saw me as anything but an asset that needed careful handling. That's a strange thing to grieve, isn't it."
  },
  girlfriend: {
    // Never married into the family, so "Thorne" was never legitimately
    // hers to begin with — shown throughout the game wherever a
    // player-facing display name is needed (see main.js/RoomScene.js's
    // displayName fallbacks). The internal identifier every hotspot's
    // `requires` and TALKED_TO/ASKED_QUESTIONS tracking key off of stays
    // 'Victoria Thorne' regardless of status; only what's shown to the
    // player changes.
    displayName: 'Victoria Ashworth',
    role: "Edmund's Girlfriend",
    bio: "Edmund's girlfriend of three years — twenty years his junior, and never married, whatever the household staff assume. Elegant and controlled in public, she has spent those years managing the family's opinion of her as carefully as Edmund managed its money. The rest of the family has never quite accepted her at all.",
    relationshipAnswer: "Three years. He never once brought up marriage, and I learned not to ask. Half this house still introduces me as 'Edmund's companion,' like I haven't earned a name.",
    relationshipAltAnswer: "Three years of being the woman everyone whispered about at dinner. He never seemed to mind. I minded plenty."
  }
};

// Household-roster metadata for the briefing screen's suspect panel — role,
// bio, and question answers (see src/data/questions.js for BASE_QUESTIONS
// and FOLLOWUPS — a character's `answers` map holds both, keyed by id), kept
// separate from rooms.js so the in-scene NPC data (portrait, tint, alibi
// line) stays free of screen-specific content.
const META = {
  'Victoria Thorne': {
    displayName: VICTORIA_BY_STATUS[victoriaStatus].displayName,
    role: VICTORIA_BY_STATUS[victoriaStatus].role,
    bio: VICTORIA_BY_STATUS[victoriaStatus].bio,
    answers: {
      alibi: "I went upstairs just after eleven. Marcus passed me on the stairs — ask him, if you don't believe me.",
      alibiAlt: "Just after eleven, up the stairs to bed — Marcus was coming down as I went up, if you need someone besides me to say so.",
      relationship: VICTORIA_BY_STATUS[victoriaStatus].relationshipAnswer,
      relationshipAlt: VICTORIA_BY_STATUS[victoriaStatus].relationshipAltAnswer,
      suspicion: "Diana's had her hand in the company's books for years. I wouldn't be surprised what she'd do to keep it that way.",
      // An alternate phrasing of the line above — see state.js's
      // pickDialogueVariant, which the notes on that function explain in
      // more depth. Which one plays is decided per story slot, at random,
      // completely independent of who this game's killer actually is: it's
      // there purely so replaying doesn't always surface the exact same
      // conversation, not as a hint. (An earlier version of this tied the
      // choice to guilt directly — don't do that again: with only two
      // possible lines, a repeat player memorizes "that phrasing means
      // they did it" the first time they see it happen, which ruins every
      // future game where this character is picked as the killer again.)
      suspicionAlt: "I really couldn't say. I try not to think the worst of people I live with — though I suppose that's rather naive of me tonight, isn't it.",
      'ask-victoria-affair': "That's between Nathaniel and me, and none of anyone else's business tonight, of all nights. Whatever you're imagining, it has nothing to do with why he's dead."
    }
  },
  'Marcus Thorne': {
    role: "Edmund's Son",
    bio: 'The elder of Edmund\'s two children, groomed since childhood to eventually run Thorne Pharmaceutical. His relationship with his father this last year has been anything but smooth.',
    answers: {
      alibi: "I had a cigarette by the garage after we argued. Alone. No one to vouch for it, before you ask.",
      alibiAlt: "Went out to the garage for air after the argument — smoked half a cigarette alone out there. Nobody else was around to see it, which I know doesn't help me.",
      relationship: "He built an empire and expected me to inherit the exhaustion along with it. We argued more than we talked, these last few years.",
      relationshipAlt: "Ask anyone — we argued constantly. He built the company expecting me to want it as badly as he did. I never did, and he never forgave me for that.",
      suspicion: "Julian owes money to people who don't send polite reminders. Draw your own conclusions.",
      suspicionAlt: "Ask about Julian's debts, if you want. Though I know how this looks — the son who argued with his father, alone out back with no one to vouch for him. Draw whatever conclusions you like.",
      // Follow-ups, unlocked by asking specific other people first (see FOLLOWUPS).
      'confirm-victoria-stairs': "That's about right. Everything's a blur after the argument, but I remember passing her, yes.",
      'confirm-priya-visit': "I wanted her backing before the announcement. She wasn't interested — she never is. I left and went looking for Father instead.",
      'dispute-julian-timing': "Julian's sense of time has never been reliable, especially after a few drinks. I was with him closer to eleven.",
      'confirm-argument-heard': "Yes. It always got loud with him eventually. That's just how we talked, near the end."
    }
  },
  'Priya Thorne-Kapoor': {
    role: "Edmund's Daughter",
    bio: "The younger of Edmund's two children. She left the family business years ago to study botany, and has little patience left for the Thorne family's usual games.",
    answers: {
      alibi: "Marcus knocked around half past ten, wanting to \"talk business.\" I told him I wasn't interested and sent him away. After that, it was just me and the orchids until nearly midnight.",
      alibiAlt: "Half past ten, Marcus came by wanting to talk business, same as always. I turned him away and spent the rest of the night alone with the orchids, straight through to nearly midnight.",
      relationship: "He never forgave me for choosing plants over the company. Every conversation eventually turned into a lecture about wasted potential.",
      relationshipAlt: "Every conversation with him circled back to the same lecture — wasted potential, choosing plants over the company. He never let it go, right to the end.",
      suspicion: "Victoria smiles at everyone and tells them exactly what they want to hear. I've never trusted people who do that.",
      suspicionAlt: "I don't know. Everyone in this house wanted something from him. I just wanted to be left alone with my plants — and now I can't even have that.",
      'ask-priya-ledger': "Not remotely. I've watched him resent that company for years while still needing it to bankroll the life he thinks he's owed. I just didn't expect him to be stupid enough to write it all down.",
      'ask-priya-cabinet': "I always assumed the second compartment was just for the concentrated stock — the really dangerous stuff. I never once suspected he was watching who came and went that closely. That's unsettling, honestly, now that you mention it.",
      'ask-priya-vial': "That cabinet's never been as locked as everyone likes to pretend. There's a spare key in the study desk half this house knows about, and Eleanor's had reason to be in and out of here for years besides. I keep foxglove for the borders — I don't exactly hide that, and I don't much like being the obvious answer just because it's my greenhouse."
    }
  },
  'Harriet Voss': {
    role: "Edmund's Sister",
    bio: 'Edmund\'s older sister, a widow who has lived at Ravensmoor for over a decade. Sharp-tongued, endlessly well-read, and rarely as sleepy as she lets on.',
    answers: {
      alibi: "I heard raised voices from the study around eleven — Edmund and someone, though I couldn't tell you who. I assumed it was one of the children again, so I didn't think much of it before I dozed off.",
      alibiAlt: "Around eleven I heard voices raised in the study — couldn't say whose, only that it sounded like Edmund and somebody else. I assumed it was nothing new and drifted off shortly after.",
      relationship: "He was insufferable and I loved him anyway. That's what siblings are, in the end.",
      relationshipAlt: "We fought like siblings do and loved each other anyway, underneath it. Insufferable man. I miss him already, God help me.",
      suspicion: "Marcus has his father's temper without his father's patience. That worries me more than it should.",
      suspicionAlt: "I couldn't possibly say — I was asleep, remember. Whatever happened, it happened without me hearing a thing.",
      'ask-harriet-noises': "I told you, I'd already dozed off by then. Ask someone less prone to napping through a murder.",
      'ask-harriet-trunk': "I knew he was short on money — he always is. I didn't know it had gotten that bad, or that he'd started selling things that weren't only his to sell. I'll have words with him, once all this is behind us."
    }
  },
  'Julian Voss': {
    role: "Edmund's Nephew",
    bio: "Harriet's son, and by extension Edmund's nephew. Charming, chronically broke, and always one bad decision from real trouble.",
    answers: {
      alibi: "Marcus left me around half past ten — said he needed air. Knowing him, that meant the garage and a cigarette. I turned in shortly after, alone.",
      alibiAlt: "Half past ten or so, Marcus stepped out saying he needed air — the garage, probably, knowing him. I went to bed shortly after that, on my own.",
      relationship: "Uncle Edmund thought money fixed people. He was wrong about me, for what it's worth.",
      relationshipAlt: "He always thought a check could fix whatever was wrong with a person. Never once asked what was actually wrong with me. Wrong approach, for what it's worth.",
      suspicion: "Nathaniel's redrafted that will more times than anyone talks about. Lawyers know where every body's buried before anyone else does.",
      suspicionAlt: "Honestly? I wasn't even in the room by then. Ask Marcus what he was really doing out by the garage, if you're looking for someone with something to hide."
    }
  },
  'Diana Reyes': {
    role: 'Business Partner, 30 Years',
    bio: "Co-founded Thorne Pharmaceutical's early expansion alongside Edmund three decades ago. Ambitious, and increasingly unwilling to wait for his permission.",
    answers: {
      alibi: "In the library with Nathaniel until nearly midnight, going over paperwork neither of us wanted to finish.",
      alibiAlt: "Nathaniel and I were buried in paperwork in the library until almost midnight — merger documents neither of us particularly wanted to be looking at.",
      relationship: "Thirty years building something together, and he still introduced me as his 'associate.' We disagreed about a great many things, including that.",
      relationshipAlt: "Thirty years as his partner in every way that mattered, and 'associate' was still the word he reached for in public. We argued about that more than once.",
      suspicion: "Victoria's been quieter than usual all week. I don't think that's grief.",
      suspicionAlt: "I was with Nathaniel the entire evening, going over paperwork — he'll tell you the same. Beyond that, I really couldn't say.",
      'confirm-nathaniel-library': "That's right. Not exactly thrilling company, but reliable — Nathaniel doesn't so much as refill his own glass without a receipt.",
      'ask-diana-fire': "I hadn't even noticed, if I'm honest — we were both too buried in the paperwork to think about the fire. Ask Nathaniel, he tends to it more than I do. I wouldn't have thought twice about it."
    }
  },
  'Nathaniel Cole': {
    role: 'Company Lawyer, 12 Years',
    bio: "Edmund's personal solicitor, trusted with every draft of his will for over a decade. Quiet, meticulous, and fiercely protective of the family's reputation.",
    answers: {
      alibi: "The library's just off my room — when I said I hardly left, I meant that whole wing. Diana was there too, most of the night, going over the merger paperwork with me.",
      alibiAlt: "My room and the library are practically the same wing — I barely left either one all evening. Diana was with me most of that time, working through the merger paperwork.",
      relationship: "I drafted his will more times than I can count. Every version, he found a new person to be disappointed in.",
      relationshipAlt: "Every version of his will meant a new draft and a new disappointment to record. I lost count of how many times I redrew that document over the years.",
      suspicion: "I'd look harder at whoever benefits most from the version of the will he never got to sign.",
      suspicionAlt: "I really couldn't say. I barely left the library all night — Diana can confirm as much, if it comes to that.",
      'ask-nathaniel-toast': "I drafted three different versions this year alone, and he changed his mind each time. Whatever he meant to say that night, I couldn't tell you which draft he'd finally settled on — if he'd settled on any of them at all.",
      'ask-nathaniel-affair': "I'd rather not discuss my personal affairs with an amateur detective, if it's all the same to you. Whatever you think you've found, it isn't a confession."
    }
  },
  'Eleanor Pemberton': {
    role: 'Housekeeper, 26 Years',
    bio: 'Has run the day-to-day of Ravensmoor Hall for over two decades. Knows every creaking floorboard and most of the family\'s secrets — she just doesn\'t share them.',
    answers: {
      alibi: "In the kitchen, same as I told you. I heard the study door once, around eleven, but thought nothing of it at the time.",
      alibiAlt: "The kitchen, all evening, same as always. I did hear the study door once, around eleven — didn't think anything of it at the time.",
      relationship: "Twenty-six years of watching that family perform for each other at dinner, and fight the moment the door closed. He was fair to me, at least.",
      relationshipAlt: "Twenty-six years in this house teaches you which fights are for show and which ones are real. He was fair to me, whatever else people say about him.",
      suspicion: "I try not to speculate about the family I serve. But grief doesn't usually look this calm.",
      suspicionAlt: "I try not to speculate about the family I serve. Twenty-six years teaches you that much, if nothing else.",
      'ask-eleanor-parlor': "The west parlor's on the other side of the house from my kitchen. I couldn't tell you one way or the other — though I don't recall laying a fire there all evening.",
      'confirm-wren-eleanor': "I always fetch the doctor myself if something feels wrong in this house — it's faster than sending anyone else stumbling around at that hour. That night was no different, whatever anyone wants to read into it.",
      'ask-eleanor-payment': "That's between me and Edmund, and he's not here to say otherwise. I'll only tell you it wasn't idle generosity — whatever you're imagining, I'd rather you didn't."
    }
  },
  'Vivienne Thorne': {
    role: "Edmund's Ex-Wife",
    bio: "Edmund's first wife, mother of Marcus and Priya, divorced from him for over two decades — though you'd never guess it from how often she's still underfoot. Narcissistic, endlessly self-mythologizing, and constitutionally incapable of telling the same story twice. She has never forgiven Victoria for existing.",
    answers: {
      alibi: "I was in the west parlor the entire time. I remember distinctly — the clock struck eleven while I was reading, and I hadn't moved an inch.",
      alibiAlt: "The entire evening, the west parlor, reading — I remember the clock striking eleven and not having moved an inch by then. I always remember details like that.",
      relationship: "Edmund adored me once, before all this family business got in the way. I was the best thing that ever happened to him, and deep down, he always knew it.",
      relationshipAlt: "He adored me once, whatever this second act of his pretended otherwise. I was the best thing to ever happen to that man, and some part of him always knew it.",
      suspicion: "That woman he replaced me with is hiding something. I saw it the moment I met her — I always know.",
      suspicionAlt: "Victoria, obviously. It's always the young wife, isn't it? I knew the moment I met her. I always know.",
      'ask-vivienne-hearth': "That parlor's always draughty, fire or no fire. I never trouble Eleanor for one unless I'm actually cold enough to complain about it — and that night, I had better things on my mind than comfort.",
      'ask-vivienne-letters': "I didn't, no. Though I can't say I'm surprised — sentimental old fool, underneath all that bluster. Doesn't change how he actually treated me these last few years, though."
    }
  },
  'Dr. Wren': {
    role: "Edmund's Physician",
    bio: "Edmund's personal doctor for over a decade, kept on retainer and, more often than not, kept overnight — Ravensmoor is a long way from anywhere else with a telephone. Precise, unhurried, and professionally reluctant to speculate about anything he can't examine directly.",
    answers: {
      alibi: "Asleep in my room until Eleanor came for me, a little before midnight. I came straight down and confirmed what she already suspected.",
      alibiAlt: "I was asleep until Eleanor woke me, a little before midnight. Came down straightaway and confirmed what she'd already feared.",
      relationship: "I've treated this family for over a decade. Edmund was a difficult patient — he hated being told he couldn't do something, which made my job considerably harder these last few months.",
      relationshipAlt: "Over a decade treating this family, and Edmund never once liked being told 'no' by his own physician. These last few months made that considerably harder to manage.",
      suspicion: "I'm a physician, not a detective. If you're asking whether natural causes explain everything I saw tonight, I'd rather not guess out loud.",
      'ask-wren-heart': "In my professional opinion? Yes — plainly, and without a shadow of anyone's help. I'd warned him for months. A man his age, with a heart that tired, under that kind of stress — I only wish he'd let me say it to his face instead of leaving that letter unopened."
    }
  },
  'Tom Yarrow': {
    role: 'Groundskeeper, 8 Years',
    bio: "Keeps the grounds, the greenhouse boiler, and the garage in order, and knows every path across the estate better than the family does. Quiet, steady, and not in the habit of speculating about people who pay his wages.",
    answers: {
      alibi: "Locking up the toolshed and banking down the greenhouse boiler, same as every night. I did see someone slip between the greenhouse and the garden door round eleven — too dark and too quick to say who.",
      relationship: "Fair enough, as employers go. He left the grounds to me and rarely asked questions, which suited us both fine.",
      suspicion: "Not my place to say. I mind the hedges, not the house — whatever's between that family, they've kept it well away from me.",
      'confirm-groundskeeper-sighting': "Same build as most in this house — dark coat, quick steps, keeping to the shadow of the hedge. I didn't think a thing of it till I heard what happened. Wish now I'd looked harder."
    }
  }
};

export const CHARACTERS = Object.values(ROOMS)
  .flatMap(room => room.npcs || [])
  .map(npc => ({ ...npc, ...META[npc.name] }));
