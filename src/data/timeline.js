// A curated timeline of the night, in chronological order — independent of
// which killer this game got, since it's built entirely from shared,
// killer-invariant testimony. Each entry only appears once its reveal
// condition is actually satisfied (a specific clue found, or a specific
// question asked of a specific person), so the timeline can't hand the
// player anything they haven't learned themselves yet.
//
// reveal is either { evidence: 'id' } or { npc: 'Full Name', questionId: 'id' }.
export const TIMELINE = [
  {
    time: '22:30', label: '10:30 PM',
    text: 'Marcus knocks on the greenhouse door wanting to "talk business" — Priya turns him away.',
    reveal: { npc: 'Priya Thorne-Kapoor', questionId: 'alibi' }
  },
  {
    time: '22:30', label: '10:30 PM',
    text: "Marcus leaves Julian's company, saying he needs air.",
    reveal: { npc: 'Julian Voss', questionId: 'alibi' }
  },
  {
    time: '22:50', label: '10:50 PM',
    text: 'The butler hears raised voices coming from the study.',
    reveal: { evidence: 'W-01' }
  },
  {
    time: '23:00', label: '11:00 PM',
    text: "Harriet hears raised voices from the study, and assumes it's nothing.",
    reveal: { npc: 'Harriet Voss', questionId: 'alibi' }
  },
  {
    time: '23:00', label: '11:00 PM',
    text: 'Eleanor hears the study door, and thinks nothing of it.',
    reveal: { npc: 'Eleanor Pemberton', questionId: 'alibi' }
  },
  {
    time: '23:00', label: '11:00 PM',
    text: 'Victoria goes upstairs, passing Marcus on the stairs.',
    reveal: { npc: 'Victoria Thorne', questionId: 'alibi' }
  },
  {
    time: '23:00', label: '11:00 PM',
    text: 'The groundskeeper sees a figure crossing from the greenhouse toward the garden door.',
    reveal: { evidence: 'W-03' }
  },
  {
    time: '23:00', label: '11:00 PM',
    text: 'Vivienne claims the west parlor clock struck eleven while she read, undisturbed.',
    reveal: { npc: 'Vivienne Thorne', questionId: 'alibi' }
  },
  {
    time: '23:00', label: '11 PM – Midnight',
    text: 'Diana and Nathaniel say they worked through merger paperwork together in the library.',
    reveal: { npc: 'Diana Reyes', questionId: 'alibi' }
  },
  {
    time: '23:00', label: '11 PM – Midnight',
    text: 'Priya says she stayed with the orchids until nearly midnight.',
    reveal: { npc: 'Priya Thorne-Kapoor', questionId: 'alibi' }
  },
  {
    time: '23:47', label: '11:47 PM',
    text: "The housekeeper finds Edmund slumped at his desk.",
    reveal: { evidence: 'E-01' }
  }
];
