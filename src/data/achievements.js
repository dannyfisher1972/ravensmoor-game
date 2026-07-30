// Definitions only — src/state.js tracks the raw progress (evidence, talked-to,
// rooms visited, accusation attempts) and decides when each one unlocks.
export const ACHIEVEMENTS = [
  { id: 'thorough', title: 'Thorough Investigator', description: 'Find every piece of evidence in the house.' },
  { id: 'full-house', title: 'Full House', description: 'Visit every room in Ravensmoor Hall.' },
  { id: 'interrogator', title: 'Interrogator', description: 'Speak with everyone in the house.' },
  { id: 'first-instinct', title: 'First Instinct', description: 'Name the killer correctly on your very first accusation.' },
  { id: 'no-stone-unturned', title: 'No Stone Unturned', description: "Ask every question — base and follow-up — that becomes available across the whole household." }
];
