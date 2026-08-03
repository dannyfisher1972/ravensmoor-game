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
      alibiPoisoning: "I went upstairs just after eleven. Marcus passed me on the stairs — ask him, if you don't believe me. Whatever ended up in his cup that night, it didn't come from my hands.",
      alibiStruggle: "I went upstairs just after eleven. Marcus passed me on the stairs — ask him, if you don't believe me. I didn't hear so much as a raised voice on my way up, for what that's worth.",
      alibiSuffocation: "I went upstairs just after eleven. Marcus passed me on the stairs — ask him, if you don't believe me. Whatever happened, it happened without so much as a sound reaching the stairs.",
      alibiAccident: "I went upstairs just after eleven. Marcus passed me on the stairs — ask him, if you don't believe me. Whatever happened after that, I was well out of the way of it.",
      alibiMedical: "I went upstairs just after eleven. Marcus passed me on the stairs — ask him, if you don't believe me. Whatever the doctor's called it, I was long upstairs by the time anyone came looking.",
      relationship: VICTORIA_BY_STATUS[victoriaStatus].relationshipAnswer,
      relationshipAlt: VICTORIA_BY_STATUS[victoriaStatus].relationshipAltAnswer,
      relationshipPoisoning: VICTORIA_BY_STATUS[victoriaStatus].relationshipAnswer + " Whatever this family thinks of me, poison was never going to be my style — too domestic a task for my taste.",
      relationshipStruggle: VICTORIA_BY_STATUS[victoriaStatus].relationshipAnswer + " We never once raised our voices at each other, whatever anyone assumes about a marriage like ours.",
      relationshipSuffocation: VICTORIA_BY_STATUS[victoriaStatus].relationshipAnswer + " We never once needed to raise our voices to make a point — a look across the room always did the job for us.",
      relationshipAccident: VICTORIA_BY_STATUS[victoriaStatus].relationshipAnswer + " Nothing about us was ever really an accident. Everything with Edmund was calculated, myself included.",
      relationshipMedical: VICTORIA_BY_STATUS[victoriaStatus].relationshipAnswer + " If his heart simply failed him, I suppose it's the one thing about that man I never had to manage.",
      suspicion: "Diana's had her hand in the company's books for years. I wouldn't be surprised what she'd do to keep it that way.",
      suspicionPoisoning: "Diana's had her hand in the company's books for years. If something in this house needed a quiet touch, I wouldn't put it past her to know exactly where to find it.",
      suspicionStruggle: "Diana's had her hand in the company's books for years. Though whatever happened in that study tonight, it doesn't sound like her at all — she's always settled her fights with paperwork, not her fists.",
      suspicionSuffocation: "Diana's had her hand in the company's books for years. She's never needed to raise her voice to get her way in a boardroom — I doubt she'd need to tonight, either.",
      suspicionAccident: "Diana's had her hand in the company's books for years. Whether tonight was an accident or something dressed up to look like one, I wouldn't rule her out of either.",
      suspicionMedical: "Diana's had her hand in the company's books for years. Though if it really was just his heart, I suppose none of that matters much tonight.",
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
      'ask-victoria-affair': "That's between Nathaniel and me, and none of anyone else's business tonight, of all nights. Whatever you're imagining, it has nothing to do with why he's dead.",
      'ask-victoria-affairAlt': "I'm not going to pretend those letters aren't real, but whatever you think they explain, they don't explain this. That's a separate matter entirely, and mine to keep private."
    }
  },
  'Marcus Thorne': {
    role: "Edmund's Son",
    bio: 'The elder of Edmund\'s two children, groomed since childhood to eventually run Thorne Pharmaceutical. His relationship with his father this last year has been anything but smooth.',
    answers: {
      alibi: "I had a cigarette by the garage after we argued. Alone. No one to vouch for it, before you ask.",
      alibiAlt: "Went out to the garage for air after the argument — smoked half a cigarette alone out there. Nobody else was around to see it, which I know doesn't help me.",
      alibiPoisoning: "I had a cigarette by the garage after we argued. Alone. No one to vouch for it, before you ask. I'll leave the poisons and potions to people who actually know one plant from another.",
      alibiStruggle: "I had a cigarette by the garage after we argued. Alone. No one to vouch for it, before you ask. Whatever went on back in that study, I wasn't anywhere near it to hear.",
      alibiSuffocation: "I had a cigarette by the garage after we argued. Alone. No one to vouch for it, before you ask. Can't say I noticed anything at all, but then, I wasn't exactly listening for silence.",
      alibiAccident: "I had a cigarette by the garage after we argued. Alone. No one to vouch for it, before you ask. Wherever the blame lands, it isn't going to land on a cigarette by the garage.",
      alibiMedical: "I had a cigarette by the garage after we argued. Alone. No one to vouch for it, before you ask. None of this business with doctors and diagnoses changes where I was standing.",
      relationship: "He built an empire and expected me to inherit the exhaustion along with it. We argued more than we talked, these last few years.",
      relationshipAlt: "Ask anyone — we argued constantly. He built the company expecting me to want it as badly as he did. I never did, and he never forgave me for that.",
      relationshipPoisoning: "He built an empire and expected me to inherit the exhaustion along with it. Whatever he thought of me, I never once set foot in that greenhouse to find out what grows there.",
      relationshipStruggle: "He built an empire and expected me to inherit the exhaustion along with it. We shouted plenty, the two of us. Neither of us ever went further than that, whatever people assume now.",
      relationshipSuffocation: "He built an empire and expected me to inherit the exhaustion along with it. We were never a quiet family. I can't picture either of us managing something this hushed.",
      relationshipAccident: "He built an empire and expected me to inherit the exhaustion along with it. Half our arguments ended in slammed doors, not staged accidents — that's just not how we operated.",
      relationshipMedical: "He built an empire and expected me to inherit the exhaustion along with it. That heart carried this whole company on its back for forty years. I'm almost surprised it lasted as long as it did.",
      suspicion: "Julian owes money to people who don't send polite reminders. Draw your own conclusions.",
      suspicionPoisoning: "Julian owes money to people who don't send polite reminders. Something quiet and untraceable sounds exactly like his style, if you ask me.",
      suspicionStruggle: "Julian owes money to people who don't send polite reminders. Draw your own conclusions — though he's never once struck me as someone who'd actually swing at a person, not even his own creditors.",
      suspicionSuffocation: "Julian owes money to people who don't send polite reminders. Whatever happened to Father, nobody heard a thing — which, honestly, doesn't sound like Julian at all. He's not exactly subtle.",
      suspicionAccident: "Julian owes money to people who don't send polite reminders. Wouldn't be the first time he made a mess and hoped it read as bad luck.",
      suspicionMedical: "Julian owes money to people who don't send polite reminders. A bad heart doesn't call in favors or send reminders either — it just stops, same as it nearly did to plenty of men before him.",
      suspicionAlt: "Ask about Julian's debts, if you want. Though I know how this looks — the son who argued with his father, alone out back with no one to vouch for him. Draw whatever conclusions you like.",
      // Follow-ups, unlocked by asking specific other people first (see FOLLOWUPS).
      'confirm-victoria-stairs': "That's about right. Everything's a blur after the argument, but I remember passing her, yes.",
      'confirm-victoria-stairsAlt': "She's right, as far as I recall — the whole night's a blur after that argument, but yes, we passed each other on the stairs.",
      'confirm-priya-visit': "I wanted her backing before the announcement. She wasn't interested — she never is. I left and went looking for Father instead.",
      'confirm-priya-visitAlt': "I went to get her on my side before Father's announcement. She turned me down flat, same as always, so I went to find him instead.",
      'dispute-julian-timing': "Julian's sense of time has never been reliable, especially after a few drinks. I was with him closer to eleven.",
      'dispute-julian-timingAlt': "Julian's timing is never reliable once he's had a drink or two. My memory has us together closer to eleven, not half past ten.",
      'confirm-argument-heard': "Yes. It always got loud with him eventually. That's just how we talked, near the end.",
      'confirm-argument-heardAlt': "That was us, yes. Things got loud between us eventually — always did, toward the end.",
      'confront-marcus-ledger': "Fine — yes, I've borrowed against the company more than once. It's not the crime everyone's about to decide it is. A man's allowed to need money without it meaning he'd kill his own father over it.",
      'confront-marcus-ledgerAlt': "All right, it's true — I've taken more than one loan against the company. That's not the same as murdering my own father over needing money.",
      'confirm-tom-sighting-detail': "Haven't the faintest. I was out by the garage the whole time, same as I told you — wherever that figure was headed, it wasn't toward me.",
      'confirm-tom-sighting-detailAlt': "No idea who that could've been. I was by the garage that whole time, exactly as I told you — whoever Tom saw, it wasn't me."
    }
  },
  'Priya Thorne-Kapoor': {
    role: "Edmund's Daughter",
    bio: "The younger of Edmund's two children. She left the family business years ago to study botany, and has little patience left for the Thorne family's usual games.",
    answers: {
      alibi: "Marcus knocked around half past ten, wanting to \"talk business.\" I told him I wasn't interested and sent him away. After that, it was just me and the orchids until nearly midnight.",
      alibiAlt: "Half past ten, Marcus came by wanting to talk business, same as always. I turned him away and spent the rest of the night alone with the orchids, straight through to nearly midnight.",
      alibiPoisoning: "Marcus knocked around half past ten, wanting to \"talk business.\" I told him I wasn't interested and sent him away. After that, it was just me and the orchids until nearly midnight. And yes, that cabinet was exactly where I left it the whole time — draw whatever conclusion you like.",
      alibiStruggle: "Marcus knocked around half past ten, wanting to \"talk business.\" I told him I wasn't interested and sent him away. After that, it was just me and the orchids until nearly midnight. Nothing about that greenhouse got loud enough to notice, if that's what you're asking.",
      alibiSuffocation: "Marcus knocked around half past ten, wanting to \"talk business.\" I told him I wasn't interested and sent him away. After that, it was just me and the orchids until nearly midnight. The orchids don't make noise either, so I suppose we were evenly matched that night.",
      alibiAccident: "Marcus knocked around half past ten, wanting to \"talk business.\" I told him I wasn't interested and sent him away. After that, it was just me and the orchids until nearly midnight. Whatever went wrong up at the house, it happened well away from my orchids.",
      alibiMedical: "Marcus knocked around half past ten, wanting to \"talk business.\" I told him I wasn't interested and sent him away. After that, it was just me and the orchids until nearly midnight. I spent that whole night worrying about the wrong kind of trouble, apparently.",
      relationship: "He never forgave me for choosing plants over the company. Every conversation eventually turned into a lecture about wasted potential.",
      relationshipAlt: "Every conversation with him circled back to the same lecture — wasted potential, choosing plants over the company. He never let it go, right to the end.",
      relationshipPoisoning: "He never forgave me for choosing plants over the company. Everyone assumes the botanist reaches for poison first. I'd rather reach for literally anything else.",
      relationshipStruggle: "He never forgave me for choosing plants over the company. He never once raised a hand to me, whatever else was wrong between us — I'll give him that much.",
      relationshipSuffocation: "He never forgave me for choosing plants over the company. We barely spoke toward the end. A quiet falling-out, I suppose, though not that kind of quiet.",
      relationshipAccident: "He never forgave me for choosing plants over the company. Nothing about my relationship with him was ever an accident — every slight was very much on purpose.",
      relationshipMedical: "He never forgave me for choosing plants over the company. There's a kind of mercy in a heart simply stopping on its own, compared to everything else this family's capable of.",
      suspicion: "Victoria smiles at everyone and tells them exactly what they want to hear. I've never trusted people who do that.",
      suspicionPoisoning: "Victoria smiles at everyone and tells them exactly what they want to hear. Honestly, half this house has wandered through my greenhouse at one time or another — I wouldn't single her out over anyone else who knows where the key lives.",
      suspicionStruggle: "Victoria smiles at everyone and tells them exactly what they want to hear. Whatever happened in that study sounds far too messy for her taste — she's always preferred a cleaner sort of damage.",
      suspicionSuffocation: "Victoria smiles at everyone and tells them exactly what they want to hear. She'd know exactly how to make something disappear without anyone noticing a thing — she's had plenty of practice smoothing things over.",
      suspicionAccident: "Victoria smiles at everyone and tells them exactly what they want to hear. If she needed something to look like an accident, I doubt anyone in this house would ever think to check twice.",
      suspicionMedical: "Victoria smiles at everyone and tells them exactly what they want to hear. Though if his heart simply gave out, I suppose it hardly matters what any of us think about her tonight.",
      suspicionAlt: "I don't know. Everyone in this house wanted something from him. I just wanted to be left alone with my plants — and now I can't even have that.",
      'ask-priya-ledger': "Not remotely. I've watched him resent that company for years while still needing it to bankroll the life he thinks he's owed. I just didn't expect him to be stupid enough to write it all down.",
      'ask-priya-ledgerAlt': "Not even slightly. He resented that company for years and still leaned on it to fund the life he felt he deserved. I just never thought he'd be careless enough to put it all in writing.",
      'ask-priya-cabinet': "I always assumed the second compartment was just for the concentrated stock — the really dangerous stuff. I never once suspected he was watching who came and went that closely. That's unsettling, honestly, now that you mention it.",
      'ask-priya-cabinetAlt': "I'd always figured that second compartment was purely for the concentrated stock. I never imagined he was tracking comings and goings that carefully — unsettling, now that you say it.",
      'ask-priya-vial': "That cabinet's never been as locked as everyone likes to pretend. There's a spare key in the study desk half this house knows about, and Eleanor's had reason to be in and out of here for years besides. I keep foxglove for the borders — I don't exactly hide that, and I don't much like being the obvious answer just because it's my greenhouse.",
      'ask-priya-vialAlt': "That cabinet's far less secure than people want to believe. A spare key sits in the study desk that half the house could name, and Eleanor's been in and out of here plenty over the years. I grow foxglove for the borders openly enough — I just don't love being the easy answer purely because it's my greenhouse.",
      'ask-priya-key-habit': "Longer than I'd like, honestly. I've meant to move it for years and never quite gotten around to it. Half this staff could probably find it blindfolded, same as I could.",
      'ask-priya-key-habitAlt': "Longer than I'd care to admit. I keep meaning to relocate it and never manage to. Most of the staff could probably locate it without even trying, same as I could."
    }
  },
  'Harriet Voss': {
    role: "Edmund's Sister",
    bio: 'Edmund\'s older sister, a widow who has lived at Ravensmoor for over a decade. Sharp-tongued, endlessly well-read, and rarely as sleepy as she lets on.',
    answers: {
      alibi: "I heard raised voices from the study around eleven — Edmund and someone, though I couldn't tell you who. I assumed it was one of the children again, so I didn't think much of it before I dozed off.",
      alibiAlt: "Around eleven I heard voices raised in the study — couldn't say whose, only that it sounded like Edmund and somebody else. I assumed it was nothing new and drifted off shortly after.",
      alibiPoisoning: "I heard raised voices from the study around eleven — Edmund and someone, though I couldn't tell you who. I assumed it was one of the children again, so I didn't think much of it before I dozed off. Nobody raises their voice over a poisoning, I'd imagine — quieter business altogether.",
      alibiStruggle: "I heard raised voices from the study around eleven — Edmund and someone, though I couldn't tell you who. I assumed it was one of the children again, so I didn't think much of it before I dozed off. Whatever it was, it was loud enough to reach me even half-asleep.",
      alibiSuffocation: "I heard raised voices from the study around eleven — Edmund and someone, though I couldn't tell you who. I assumed it was one of the children again, so I didn't think much of it before I dozed off. Though if it was as quiet as they're saying, I can't imagine how I'd have heard a thing from up here regardless.",
      alibiAccident: "I heard raised voices from the study around eleven — Edmund and someone, though I couldn't tell you who. I assumed it was one of the children again, so I didn't think much of it before I dozed off. An accident wouldn't have needed raised voices to precede it, I suppose.",
      alibiMedical: "I heard raised voices from the study around eleven — Edmund and someone, though I couldn't tell you who. I assumed it was one of the children again, so I didn't think much of it before I dozed off. A quiet failing heart wouldn't have made any noise at all, I'd imagine.",
      relationship: "He was insufferable and I loved him anyway. That's what siblings are, in the end.",
      relationshipAlt: "We fought like siblings do and loved each other anyway, underneath it. Insufferable man. I miss him already, God help me.",
      relationshipPoisoning: "He was insufferable and I loved him anyway. Whatever this family thinks, I've never had cause to learn a single thing about poisons.",
      relationshipStruggle: "He was insufferable and I loved him anyway. We bickered like siblings do, but it never once turned to blows — that's simply not who we were.",
      relationshipSuffocation: "He was insufferable and I loved him anyway. Ours was never a subtle family. If something happened this quietly, I can hardly believe either of us was behind it.",
      relationshipAccident: "He was insufferable and I loved him anyway. Nothing about the two of us was ever accidental. Every fight was entirely deliberate, on both sides.",
      relationshipMedical: "He was insufferable and I loved him anyway. A tired heart doesn't need an argument to stop — and heaven knows we gave it enough of those over the years.",
      suspicion: "Marcus has his father's temper without his father's patience. That worries me more than it should.",
      suspicionPoisoning: "Marcus has his father's temper without his father's patience. Though poison's a patient person's game, and patience was never his strong suit.",
      suspicionStruggle: "Marcus has his father's temper without his father's patience. That worries me more than it should, especially tonight.",
      suspicionSuffocation: "Marcus has his father's temper without his father's patience. Then again, nothing about tonight was loud enough to be his usual doing — that unsettles me more than shouting would have.",
      suspicionAccident: "Marcus has his father's temper without his father's patience. Wouldn't be the first time his temper made a mess that looked like bad luck afterward.",
      suspicionMedical: "Marcus has his father's temper without his father's patience. A temper like his needs something to fight. A quiet, failing heart wouldn't have given him anything to push against.",
      suspicionAlt: "I couldn't possibly say — I was asleep, remember. Whatever happened, it happened without me hearing a thing.",
      'ask-harriet-noises': "I told you, I'd already dozed off by then. Ask someone less prone to napping through a murder.",
      'ask-harriet-noisesAlt': "As I said, I was already asleep by then. You'll want someone who wasn't dozing through the whole business.",
      'ask-harriet-trunk': "I knew he was short on money — he always is. I didn't know it had gotten that bad, or that he'd started selling things that weren't only his to sell. I'll have words with him, once all this is behind us.",
      'ask-harriet-trunkAlt': "I've always known he was short on money. I didn't realize it had reached the point of selling things that weren't his alone to sell. I'll be having a word with him, once this is all settled.",
      'ask-harriet-uniform': "Every day, if I let myself. It's easier to keep his things where I won't stumble on them by accident than to pretend I've moved past a man I was married to for thirty years. I don't expect you to understand that, and I don't much need you to.",
      'ask-harriet-uniformAlt': "More often than I'd admit to most people. Keeping his things close is easier than pretending I'm past a man I spent thirty years married to. You needn't understand it — I don't ask you to."
    }
  },
  'Julian Voss': {
    role: "Edmund's Nephew",
    bio: "Harriet's son, and by extension Edmund's nephew. Charming, chronically broke, and always one bad decision from real trouble.",
    answers: {
      alibi: "Marcus left me around half past ten — said he needed air. Knowing him, that meant the garage and a cigarette. I turned in shortly after, alone.",
      alibiAlt: "Half past ten or so, Marcus stepped out saying he needed air — the garage, probably, knowing him. I went to bed shortly after that, on my own.",
      alibiPoisoning: "Marcus left me around half past ten — said he needed air. Knowing him, that meant the garage and a cigarette. I turned in shortly after, alone. I wasn't anywhere near the greenhouse that night, for what it's worth.",
      alibiStruggle: "Marcus left me around half past ten — said he needed air. Knowing him, that meant the garage and a cigarette. I turned in shortly after, alone. I didn't hear a thing from my room, loud or otherwise.",
      alibiSuffocation: "Marcus left me around half past ten — said he needed air. Knowing him, that meant the garage and a cigarette. I turned in shortly after, alone. I was asleep long before anything happened, quiet or otherwise.",
      alibiAccident: "Marcus left me around half past ten — said he needed air. Knowing him, that meant the garage and a cigarette. I turned in shortly after, alone. Whatever happened, it happened well after I'd already turned in.",
      alibiMedical: "Marcus left me around half past ten — said he needed air. Knowing him, that meant the garage and a cigarette. I turned in shortly after, alone. I was fast asleep long before anyone thought to check on him.",
      relationship: "Uncle Edmund thought money fixed people. He was wrong about me, for what it's worth.",
      relationshipAlt: "He always thought a check could fix whatever was wrong with a person. Never once asked what was actually wrong with me. Wrong approach, for what it's worth.",
      relationshipPoisoning: "Uncle Edmund thought money fixed people. I wouldn't know foxglove from any other flower in that greenhouse, whatever anyone assumes about me.",
      relationshipStruggle: "Uncle Edmund thought money fixed people. He never raised a hand to me, for what it's worth — disappointment was always more his weapon of choice.",
      relationshipSuffocation: "Uncle Edmund thought money fixed people. We were never a quiet family, the two of us least of all. I can't picture this being either of our doing.",
      relationshipAccident: "Uncle Edmund thought money fixed people. Nothing about us was ever an accident. He meant every word, every time, and so did I.",
      relationshipMedical: "Uncle Edmund thought money fixed people. A weak heart doesn't care how much money you owe, which is more mercy than most people in this house would show me.",
      suspicion: "Nathaniel's redrafted that will more times than anyone talks about. Lawyers know where every body's buried before anyone else does.",
      suspicionPoisoning: "Nathaniel's redrafted that will more times than anyone talks about. Lawyers know where every body's buried — and every bottle in that cabinet, probably.",
      suspicionStruggle: "Nathaniel's redrafted that will more times than anyone talks about. Though a struggle seems beneath him, honestly — the man irons his own shirts.",
      suspicionSuffocation: "Nathaniel's redrafted that will more times than anyone talks about. A man that careful with paperwork would know exactly how to leave a room looking untouched.",
      suspicionAccident: "Nathaniel's redrafted that will more times than anyone talks about. He'd know exactly how to make something look like nobody's fault.",
      suspicionMedical: "Nathaniel's redrafted that will more times than anyone talks about. A will only matters once someone's actually gone. A tired heart giving out settles that question faster than any lawyer could.",
      suspicionAlt: "Honestly? I wasn't even in the room by then. Ask Marcus what he was really doing out by the garage, if you're looking for someone with something to hide."
    }
  },
  'Diana Reyes': {
    role: 'Business Partner, 30 Years',
    bio: "Co-founded Thorne Pharmaceutical's early expansion alongside Edmund three decades ago. Ambitious, and increasingly unwilling to wait for his permission.",
    answers: {
      alibi: "In the library with Nathaniel until nearly midnight, going over paperwork neither of us wanted to finish.",
      alibiAlt: "Nathaniel and I were buried in paperwork in the library until almost midnight — merger documents neither of us particularly wanted to be looking at.",
      alibiPoisoning: "In the library with Nathaniel until nearly midnight, going over paperwork neither of us wanted to finish. Neither of us touched so much as a teacup all night, buried in paperwork as we were.",
      alibiStruggle: "In the library with Nathaniel until nearly midnight, going over paperwork neither of us wanted to finish. Whatever happened in that study, it certainly didn't reach us over the sound of our own arguing about the merger.",
      alibiSuffocation: "In the library with Nathaniel until nearly midnight, going over paperwork neither of us wanted to finish. We were both far too absorbed in paperwork to notice silence, of all things.",
      alibiAccident: "In the library with Nathaniel until nearly midnight, going over paperwork neither of us wanted to finish. Whatever went wrong, it went wrong somewhere neither of us was.",
      alibiMedical: "In the library with Nathaniel until nearly midnight, going over paperwork neither of us wanted to finish. Whatever the doctor eventually calls it, the timing alone strikes me as unusually cruel.",
      relationship: "Thirty years building something together, and he still introduced me as his 'associate.' We disagreed about a great many things, including that.",
      relationshipAlt: "Thirty years as his partner in every way that mattered, and 'associate' was still the word he reached for in public. We argued about that more than once.",
      relationshipPoisoning: "Thirty years building something together, and he still introduced me as his 'associate.' Thirty years, and I've never once needed anything stronger than a strongly worded letter to make my point.",
      relationshipStruggle: "Thirty years building something together, and he still introduced me as his 'associate.' We disagreed plenty, but always across a table, never with raised hands — that was never how we did business.",
      relationshipSuffocation: "Thirty years building something together, and he still introduced me as his 'associate.' Ours was always a quiet sort of rivalry, if I'm honest — the kind conducted entirely on paper.",
      relationshipAccident: "Thirty years building something together, and he still introduced me as his 'associate.' Nothing between us was ever accidental. Thirty years of partnership doesn't leave room for that kind of carelessness.",
      relationshipMedical: "Thirty years building something together, and he still introduced me as his 'associate.' If his heart simply gave out, I suppose thirty years of partnership ends more quietly than either of us expected.",
      suspicion: "Victoria's been quieter than usual all week. I don't think that's grief.",
      suspicionPoisoning: "Victoria's been quieter than usual all week. I don't think that's grief, though I've learned not to read too much into it — everyone in this house has something they'd rather not explain tonight.",
      suspicionStruggle: "Victoria's been quieter than usual all week. I don't think that's grief. And whatever happened in that study was loud enough that I'm almost surprised it was her doing — shouting's never really been her register.",
      suspicionSuffocation: "Victoria's been quieter than usual all week. I don't think that's grief, though there wasn't so much as a raised voice from that study tonight — which tracks with a woman who's spent years keeping her composure in front of this family.",
      suspicionAccident: "Victoria's been quieter than usual all week. I don't think that's grief. Whether tonight was an accident is a separate question entirely.",
      suspicionMedical: "Victoria's been quieter than usual all week. I don't think that's grief — though if it was simply his heart, I suppose it hardly matters now.",
      suspicionAlt: "I was with Nathaniel the entire evening, going over paperwork — he'll tell you the same. Beyond that, I really couldn't say.",
      'confirm-nathaniel-library': "That's right. Not exactly thrilling company, but reliable — Nathaniel doesn't so much as refill his own glass without a receipt.",
      'confirm-nathaniel-libraryAlt': "That matches what I'd say. Hardly lively company, but dependable — the man accounts for every glass he pours.",
      'ask-diana-fire': "I hadn't even noticed, if I'm honest — we were both too buried in the paperwork to think about the fire. Ask Nathaniel, he tends to it more than I do. I wouldn't have thought twice about it.",
      'ask-diana-fireAlt': "Honestly, I didn't notice at all — we were too deep in that paperwork to think about the hearth. Nathaniel tends to that more than I ever do; it wouldn't have crossed my mind.",
      'ask-diana-scorch': "Kessler-Vance. Edmund and I disagreed about them more than once — hardly a secret, and hardly a reason to burn anything over. I couldn't tell you who fed that particular page to the fire, or why.",
      'ask-diana-scorchAlt': "Kessler-Vance, if you must know. Edmund and I clashed over them more than once, though that's no secret and hardly worth setting anything alight over. Who actually burned that page, I couldn't begin to guess.",
      'ask-diana-glass': "Not especially. That greenhouse has never been as locked up as Priya likes to think. I wouldn't read too much into a second glass on its own.",
      'ask-diana-glassAlt': "Not really, no. That greenhouse has never been half as secure as Priya likes to think it is. A second glass on its own doesn't tell you much."
    }
  },
  'Nathaniel Cole': {
    role: 'Company Lawyer, 12 Years',
    bio: "Edmund's personal solicitor, trusted with every draft of his will for over a decade. Quiet, meticulous, and fiercely protective of the family's reputation.",
    answers: {
      alibi: "The library's just off my room — when I said I hardly left, I meant that whole wing. Diana was there too, most of the night, going over the merger paperwork with me.",
      alibiAlt: "My room and the library are practically the same wing — I barely left either one all evening. Diana was with me most of that time, working through the merger paperwork.",
      alibiPoisoning: "The library's just off my room — when I said I hardly left, I meant that whole wing. Diana was there too, most of the night, going over the merger paperwork with me. A will gets redrafted with ink, not tinctures — that much I can promise you.",
      alibiStruggle: "The library's just off my room — when I said I hardly left, I meant that whole wing. Diana was there too, most of the night, going over the merger paperwork with me. Whatever happened, it didn't carry as far as our end of the house.",
      alibiSuffocation: "The library's just off my room — when I said I hardly left, I meant that whole wing. Diana was there too, most of the night, going over the merger paperwork with me. Discretion was always more his style than mine to comment on, frankly.",
      alibiAccident: "The library's just off my room — when I said I hardly left, I meant that whole wing. Diana was there too, most of the night, going over the merger paperwork with me. Wherever the fault lies, I don't believe it lies anywhere near that wing.",
      alibiMedical: "The library's just off my room — when I said I hardly left, I meant that whole wing. Diana was there too, most of the night, going over the merger paperwork with me. I don't suppose a tired heart needs much explaining beyond what Dr. Wren's already told you.",
      relationship: "I drafted his will more times than I can count. Every version, he found a new person to be disappointed in.",
      relationshipAlt: "Every version of his will meant a new draft and a new disappointment to record. I lost count of how many times I redrew that document over the years.",
      relationshipPoisoning: "I drafted his will more times than I can count. A lawyer's tools are contracts and clauses, not tinctures — I wouldn't know where to begin otherwise.",
      relationshipStruggle: "I drafted his will more times than I can count. Every disagreement between us stayed exactly where disagreements belong — in the drafting, never in the room.",
      relationshipSuffocation: "I drafted his will more times than I can count. Discretion was always the entire point of my job. I'd like to think that extends to more than paperwork.",
      relationshipAccident: "I drafted his will more times than I can count. Nothing in twelve years of drafting his wills was ever accidental. Every clause was deliberate, and so was every disappointment.",
      relationshipMedical: "I drafted his will more times than I can count. If it was simply his heart, I suppose that's one will I never have to explain to anyone.",
      suspicion: "I'd look harder at whoever benefits most from the version of the will he never got to sign.",
      suspicionPoisoning: "I'd look harder at whoever benefits most from the version of the will he never got to sign. Poison takes planning — that narrows the field more than people think.",
      suspicionStruggle: "I'd look harder at whoever benefits most from the version of the will he never got to sign. Whatever happened in that study, I'd leave the manner of it to people who understand these things better than a solicitor does.",
      suspicionSuffocation: "I'd look harder at whoever benefits most from the version of the will he never got to sign. Whoever it was left no mess behind to explain — which, in my experience, usually means someone who plans ahead.",
      suspicionAccident: "I'd look harder at whoever benefits most from the version of the will he never got to sign. An accident this convenient deserves a second look, at the very least.",
      suspicionMedical: "I'd look harder at whoever benefits most from the version of the will he never got to sign. A will only ever answers who benefits. A tired heart doesn't need a motive to finally give out.",
      suspicionAlt: "I really couldn't say. I barely left the library all night — Diana can confirm as much, if it comes to that.",
      'ask-nathaniel-toast': "I drafted three different versions this year alone, and he changed his mind each time. Whatever he meant to say that night, I couldn't tell you which draft he'd finally settled on — if he'd settled on any of them at all.",
      'ask-nathaniel-toastAlt': "Three separate drafts this year, and he kept changing his mind on every one. Whatever he intended to announce, I couldn't say which version he'd actually landed on by the end — if he'd landed on one at all.",
      'ask-nathaniel-affair': "I'd rather not discuss my personal affairs with an amateur detective, if it's all the same to you. Whatever you think you've found, it isn't a confession.",
      'ask-nathaniel-affairAlt': "Those letters are exactly what they look like, and I won't insult either of us by denying it. What they aren't is an answer to anything you're actually here to solve.",
      'ask-nathaniel-stain': "Not that I noticed, and I was watching him fairly closely that night, given everything else on the table besides food. If something was already wrong by dinner, he hid it better than I've ever known him to.",
      'ask-nathaniel-stainAlt': "Not that I saw, and I was paying close attention to him that evening, for more reasons than the meal. If something was already amiss at dinner, he concealed it better than I'd have thought possible."
    }
  },
  'Eleanor Pemberton': {
    role: 'Housekeeper, 26 Years',
    bio: 'Has run the day-to-day of Ravensmoor Hall for over two decades. Knows every creaking floorboard and most of the family\'s secrets — she just doesn\'t share them.',
    answers: {
      alibi: "In the kitchen, same as I told you. I heard the study door once, around eleven, but thought nothing of it at the time.",
      alibiAlt: "The kitchen, all evening, same as always. I did hear the study door once, around eleven — didn't think anything of it at the time.",
      alibiPoisoning: "In the kitchen, same as I told you. I heard the study door once, around eleven, but thought nothing of it at the time. I brewed nothing that night beyond what I always brew, same as every evening.",
      alibiStruggle: "In the kitchen, same as I told you. I heard the study door once, around eleven, but thought nothing of it at the time. Whatever happened up there, it wasn't loud enough to carry all the way down to my kitchen.",
      alibiSuffocation: "In the kitchen, same as I told you. I heard the study door once, around eleven, but thought nothing of it at the time. That single sound at the door is still the only thing I can swear to.",
      alibiAccident: "In the kitchen, same as I told you. I heard the study door once, around eleven, but thought nothing of it at the time. Whatever went wrong, I only heard the one sound all evening, same as I told you.",
      alibiMedical: "In the kitchen, same as I told you. I heard the study door once, around eleven, but thought nothing of it at the time. That single sound I heard is still all I have to offer you, heart or otherwise.",
      relationship: "Twenty-six years of watching that family perform for each other at dinner, and fight the moment the door closed. He was fair to me, at least.",
      relationshipAlt: "Twenty-six years in this house teaches you which fights are for show and which ones are real. He was fair to me, whatever else people say about him.",
      relationshipPoisoning: "Twenty-six years of watching that family perform for each other at dinner, and fight the moment the door closed. Twenty-six years in that kitchen, and I've never once reached for anything from the greenhouse cabinet.",
      relationshipStruggle: "Twenty-six years of watching that family perform for each other at dinner, and fight the moment the door closed. Whatever went on behind closed doors in this house, it was never mine to raise a hand to.",
      relationshipSuffocation: "Twenty-six years of watching that family perform for each other at dinner, and fight the moment the door closed. This has always been a house that performs loudly and suffers quietly — I'd know, I've served it long enough.",
      relationshipAccident: "Twenty-six years of watching that family perform for each other at dinner, and fight the moment the door closed. Twenty-six years teaches you nothing in this family happens entirely by accident, myself included.",
      relationshipMedical: "Twenty-six years of watching that family perform for each other at dinner, and fight the moment the door closed. Twenty-six years, and it turns out the one thing I could never manage in this house was his own heart.",
      suspicion: "I try not to speculate about the family I serve. But grief doesn't usually look this calm.",
      suspicionPoisoning: "I try not to speculate about the family I serve. But grief doesn't usually look this calm, and a quiet thing like this takes a particular kind of person.",
      suspicionStruggle: "I try not to speculate about the family I serve. But grief doesn't usually look this calm — though whatever happened up there wasn't quiet, from what I understand.",
      suspicionSuffocation: "I try not to speculate about the family I serve. But grief doesn't usually look this calm, and neither does a house that stayed this undisturbed tonight.",
      suspicionAccident: "I try not to speculate about the family I serve. But grief doesn't usually look this calm — accident or not.",
      suspicionMedical: "I try not to speculate about the family I serve. A man's heart failing him isn't really something anyone in this house gets to take credit for, myself included.",
      suspicionAlt: "I try not to speculate about the family I serve. Twenty-six years teaches you that much, if nothing else.",
      'ask-eleanor-parlor': "The west parlor's on the other side of the house from my kitchen. I couldn't tell you one way or the other — though I don't recall laying a fire there all evening.",
      'ask-eleanor-parlorAlt': "My kitchen's clear on the other side of the house from that parlor. I couldn't say either way — though I don't remember tending a fire there that night.",
      'confirm-wren-eleanor': "I always fetch the doctor myself if something feels wrong in this house — it's faster than sending anyone else stumbling around at that hour. That night was no different, whatever anyone wants to read into it.",
      'confirm-wren-eleanorAlt': "I make a point of fetching the doctor myself whenever something seems wrong here — quicker than waking someone else to do it at that hour. That night was no exception, whatever anyone reads into it.",
      'ask-eleanor-payment': "That's between me and Edmund, and he's not here to say otherwise. I'll only tell you it wasn't idle generosity — whatever you're imagining, I'd rather you didn't.",
      'ask-eleanor-paymentAlt': "That was a private matter between Edmund and myself, and he isn't here to explain it otherwise. I'll say only that it wasn't given lightly — whatever you're picturing, I'd rather you didn't."
    }
  },
  'Vivienne Thorne': {
    role: "Edmund's Ex-Wife",
    bio: "Edmund's first wife, mother of Marcus and Priya, divorced from him for over two decades — though you'd never guess it from how often she's still underfoot. Narcissistic, endlessly self-mythologizing, and constitutionally incapable of telling the same story twice. She has never forgiven Victoria for existing.",
    answers: {
      alibi: "I was in the west parlor the entire time. I remember distinctly — the clock struck eleven while I was reading, and I hadn't moved an inch.",
      alibiAlt: "The entire evening, the west parlor, reading — I remember the clock striking eleven and not having moved an inch by then. I always remember details like that.",
      alibiPoisoning: "I was in the west parlor the entire time. I remember distinctly — the clock struck eleven while I was reading, and I hadn't moved an inch. Gardening was always beneath me, frankly — ask anyone who's tried to get me to hold a trowel.",
      alibiStruggle: "I was in the west parlor the entire time. I remember distinctly — the clock struck eleven while I was reading, and I hadn't moved an inch. I certainly didn't hear anything resembling a struggle from where I was sitting.",
      alibiSuffocation: "I was in the west parlor the entire time. I remember distinctly — the clock struck eleven while I was reading, and I hadn't moved an inch. I've always found silence rather suspicious in this house, myself included in that judgment.",
      alibiAccident: "I was in the west parlor the entire time. I remember distinctly — the clock struck eleven while I was reading, and I hadn't moved an inch. Whatever happened, it happened somewhere I wasn't, which is more than this family usually credits me for.",
      alibiMedical: "I was in the west parlor the entire time. I remember distinctly — the clock struck eleven while I was reading, and I hadn't moved an inch. Even I can hardly be blamed for a heart giving out on its own.",
      relationship: "Edmund adored me once, before all this family business got in the way. I was the best thing that ever happened to him, and deep down, he always knew it.",
      relationshipAlt: "He adored me once, whatever this second act of his pretended otherwise. I was the best thing to ever happen to that man, and some part of him always knew it.",
      relationshipPoisoning: "Edmund adored me once, before all this family business got in the way. I've never touched that greenhouse in my life — gardening was always beneath a woman of my standing.",
      relationshipStruggle: "Edmund adored me once, before all this family business got in the way. I've never raised a hand to anyone in my life, whatever this family likes to whisper about me.",
      relationshipSuffocation: "Edmund adored me once, before all this family business got in the way. Edmund and I never needed to shout to wound each other. Silence always did more damage in this house.",
      relationshipAccident: "Edmund adored me once, before all this family business got in the way. Nothing between Edmund and me was ever an accident. Every slight, on both sides, was entirely deliberate.",
      relationshipMedical: "Edmund adored me once, before all this family business got in the way. Even his own body finally stopped indulging him. I suppose I always knew someone eventually would.",
      suspicion: "That woman he replaced me with is hiding something. I saw it the moment I met her — I always know.",
      suspicionPoisoning: "That woman he replaced me with is hiding something. I saw it the moment I met her — and a quiet, careful thing like this suits her perfectly.",
      suspicionStruggle: "That woman he replaced me with is hiding something. I saw it the moment I met her — though brawling isn't her style. She's always had other people do the messy work for her.",
      suspicionSuffocation: "That woman he replaced me with is hiding something. I saw it the moment I met her — and I'd wager she still looked perfectly composed doing whatever she did tonight.",
      suspicionAccident: "That woman he replaced me with is hiding something. I wouldn't put it past her to arrange something that only looked like bad luck.",
      suspicionMedical: "That woman he replaced me with is hiding something. Even a failing heart couldn't resist one last dramatic exit, in a house like this one.",
      suspicionAlt: "Victoria, obviously. It's always the young wife, isn't it? I knew the moment I met her. I always know.",
      'ask-vivienne-hearth': "That parlor's always draughty, fire or no fire. I never trouble Eleanor for one unless I'm actually cold enough to complain about it — and that night, I had better things on my mind than comfort.",
      'ask-vivienne-hearthAlt': "That parlor's draughty whether there's a fire or not. I only bother Eleanor for one when I'm genuinely cold enough to complain — and that night, comfort wasn't exactly on my mind.",
      'ask-vivienne-letters': "I didn't, no. Though I can't say I'm surprised — sentimental old fool, underneath all that bluster. Doesn't change how he actually treated me these last few years, though.",
      'ask-vivienne-lettersAlt': "No, I had no idea. Though it hardly surprises me — sentimental old fool, underneath everything. Doesn't change a thing about how he actually treated me these last years.",
      'ask-vivienne-music': "Some evenings, when the house is finally quiet enough to let me pretend it's still mine to sit in. That piano's the one thing in this house that's never once made me feel unwelcome.",
      'ask-vivienne-musicAlt': "Some nights, when the house finally quiets down enough to let me imagine it's still mine. That piano's about the only thing here that's never once made me feel like an outsider.",
      'ask-vivienne-sampler': "I did, if you can believe it. A lifetime ago, when I still thought needlework was something a proper wife did with her evenings. I don't imagine I could manage it now.",
      'ask-vivienne-samplerAlt': "I did, believe it or not. A lifetime ago, back when I thought needlework was simply what a proper wife did of an evening. I doubt I'd have the patience for it now.",
      'ask-vivienne-cold-hearth': "I've sat in colder rooms than that and called it fine, thank you. Cold has never been reason enough to trouble Eleanor for something as small as a fire.",
      'ask-vivienne-cold-hearthAlt': "I've endured colder rooms than that without complaint. Cold has never once been reason enough for me to bother Eleanor over something as trivial as a fire."
    }
  },
  'Dr. Wren': {
    role: "Edmund's Physician",
    bio: "Edmund's personal doctor for over a decade, kept on retainer and, more often than not, kept overnight — Ravensmoor is a long way from anywhere else with a telephone. Precise, unhurried, and professionally reluctant to speculate about anything he can't examine directly.",
    answers: {
      alibi: "Asleep in my room until Eleanor came for me, a little before midnight. I came straight down and confirmed what she already suspected.",
      alibiAlt: "I was asleep until Eleanor woke me, a little before midnight. Came down straightaway and confirmed what she'd already feared.",
      alibiPoisoning: "Asleep in my room until Eleanor came for me, a little before midnight. I came straight down and confirmed what she already suspected. If it's dosages you're asking about, that's rather my department, not my alibi.",
      alibiStruggle: "Asleep in my room until Eleanor came for me, a little before midnight. I came straight down and confirmed what she already suspected. Whatever the commotion, it didn't reach me until Eleanor did.",
      alibiSuffocation: "Asleep in my room until Eleanor came for me, a little before midnight. I came straight down and confirmed what she already suspected. I wasn't summoned any sooner than the hour Eleanor came for me, quiet house or not.",
      alibiAccident: "Asleep in my room until Eleanor came for me, a little before midnight. I came straight down and confirmed what she already suspected. Whatever happened, I only learned of it once summoned, same as always.",
      alibiMedical: "Asleep in my room until Eleanor came for me, a little before midnight. I came straight down and confirmed what she already suspected. If it really was his heart, I'd have expected nothing less, given how long I warned him.",
      relationship: "I've treated this family for over a decade. Edmund was a difficult patient — he hated being told he couldn't do something, which made my job considerably harder these last few months.",
      relationshipAlt: "Over a decade treating this family, and Edmund never once liked being told 'no' by his own physician. These last few months made that considerably harder to manage.",
      relationshipPoisoning: "I've treated this family for over a decade. I prescribe medicine, not poison — the two couldn't be further apart in my own practice.",
      relationshipStruggle: "I've treated this family for over a decade. Ours was never a relationship built on raised voices. He argued with his family, not with his physician.",
      relationshipSuffocation: "I've treated this family for over a decade. Discretion has always been the better part of my profession — quiet is rather how I prefer to do business.",
      relationshipAccident: "I've treated this family for over a decade. Nothing about treating this family for a decade has ever felt accidental. Every visit had its own deliberate reason.",
      relationshipMedical: "I've treated this family for over a decade. A weak heart doesn't send warning shots twice, and I told him as much more times than I care to count.",
      suspicion: "I'm a physician, not a detective. If you're asking whether natural causes explain everything I saw tonight, I'd rather not guess out loud.",
      suspicionPoisoning: "I'm a physician, not a detective. If you're asking whether poison could explain everything I saw tonight, I'd rather not guess out loud.",
      suspicionStruggle: "I'm a physician, not a detective. If you're asking whether a struggle could explain everything I saw tonight, I'd rather not guess out loud.",
      suspicionSuffocation: "I'm a physician, not a detective. If you're asking whether asphyxiation could explain everything I saw tonight, I'd rather not guess out loud.",
      suspicionAccident: "I'm a physician, not a detective. If you're asking whether an accident could explain everything I saw tonight, I'd rather not guess out loud.",
      suspicionMedical: "I'm a physician, not a detective. If you're asking whether natural causes alone could explain everything I saw tonight, I'd rather not guess out loud — though I have my professional opinion, for what it's worth.",
      'ask-wren-heart': "In my professional opinion? Yes — plainly, and without a shadow of anyone's help. I'd warned him for months. A man his age, with a heart that tired, under that kind of stress — I only wish he'd let me say it to his face instead of leaving that letter unopened.",
      'ask-wren-heartAlt': "Professionally speaking, yes — without question, and without anyone's assistance. I'd cautioned him for months. A man of his age, a heart that worn, under that much strain that night — I only regret he never let me tell him so directly instead of leaving that letter unread.",
      'ask-wren-notes': "Closer than he ever let his own family see. I'd have called it a matter of when, not if, months ago — stress like tonight's would only have hastened whatever was already coming. That's a medical opinion, not an alibi for anyone.",
      'ask-wren-notesAlt': "Nearer the edge than he ever showed his own family. I'd have said it was only a matter of time, months back — and a night like this one would only have sped along whatever was already coming. That's my medical judgment, not an alibi for any one of them."
    }
  },
  'Tom Yarrow': {
    role: 'Groundskeeper, 8 Years',
    bio: "Keeps the grounds, the greenhouse boiler, and the garage in order, and knows every path across the estate better than the family does. Quiet, steady, and not in the habit of speculating about people who pay his wages.",
    answers: {
      alibi: "Locking up the toolshed and banking down the greenhouse boiler, same as every night. I did see someone slip between the greenhouse and the garden door round eleven — too dark and too quick to say who.",
      alibiPoisoning: "Locking up the toolshed and banking down the greenhouse boiler, same as every night. I did see someone slip between the greenhouse and the garden door round eleven — too dark and too quick to say who. Can't say I gave the greenhouse itself a second look that night, past locking up same as always.",
      alibiStruggle: "Locking up the toolshed and banking down the greenhouse boiler, same as every night. I did see someone slip between the greenhouse and the garden door round eleven — too dark and too quick to say who. Didn't hear anything from the house itself, loud or otherwise — the storm saw to that.",
      alibiSuffocation: "Locking up the toolshed and banking down the greenhouse boiler, same as every night. I did see someone slip between the greenhouse and the garden door round eleven — too dark and too quick to say who. The grounds were quiet enough on their own that night — the house being quieter too wouldn't have stood out to me.",
      alibiAccident: "Locking up the toolshed and banking down the greenhouse boiler, same as every night. I did see someone slip between the greenhouse and the garden door round eleven — too dark and too quick to say who. Whatever happened up at the house, I wasn't anywhere close enough to see it.",
      alibiMedical: "Locking up the toolshed and banking down the greenhouse boiler, same as every night. I did see someone slip between the greenhouse and the garden door round eleven — too dark and too quick to say who. Can't say there was anything to see out here either way, heart trouble or otherwise.",
      relationship: "Fair enough, as employers go. He left the grounds to me and rarely asked questions, which suited us both fine.",
      relationshipPoisoning: "Fair enough, as employers go. I keep that greenhouse locked same as every night — what's inside it was never really my concern beyond that.",
      relationshipStruggle: "Fair enough, as employers go. He never raised his voice to me in eight years, and I never gave him cause to start.",
      relationshipSuffocation: "Fair enough, as employers go. This house keeps its troubles quiet from the grounds, same as it always has. I'm the last to hear most of it.",
      relationshipAccident: "Fair enough, as employers go. Whatever happened up at the house, it's not for a groundskeeper to say whether it was an accident or not.",
      relationshipMedical: "Fair enough, as employers go. Whatever finally took him, it's not something a groundskeeper's meant to have an opinion about.",
      suspicion: "Not my place to say. I mind the hedges, not the house — whatever's between that family, they've kept it well away from me.",
      suspicionPoisoning: "Not my place to say. I mind the hedges and the greenhouse, not the house — whatever's between that family, they've kept it well away from me.",
      suspicionStruggle: "Not my place to say. I mind the hedges, not the house — whatever's between that family, they've kept it well away from me, loud as it got tonight.",
      suspicionSuffocation: "Not my place to say. I mind the hedges, not the house — though I'll say this much, nothing tonight was loud enough to carry as far as the garden.",
      suspicionAccident: "Not my place to say. I mind the hedges, not the house — accident or not, whatever's between that family, they've kept it well away from me.",
      suspicionMedical: "Not my place to say. A man's heart is between him and his doctor, same as it's always been — nothing out here changes that.",
      'confirm-groundskeeper-sighting': "Same build as most in this house — dark coat, quick steps, keeping to the shadow of the hedge. I didn't think a thing of it till I heard what happened. Wish now I'd looked harder.",
      'confirm-groundskeeper-sightingAlt': "Built like most of the men in that house — dark coat, moving quick, sticking close to the hedge's shadow. Didn't think twice about it until I heard what happened. Wish I'd paid closer attention now."
    }
  }
};

export const CHARACTERS = Object.values(ROOMS)
  .flatMap(room => room.npcs || [])
  .map(npc => ({ ...npc, ...META[npc.name] }));
