// Analytics V1 — local-only, no network, no backend. A flat, typed event
// log in its own localStorage key, entirely separate from story slots and
// the Casebook. New event types (or new fields on existing ones) need no
// migration: logEvent() takes any string type + any data object, and
// getAnalyticsSummary() only reads the counters it currently knows about —
// unrecognized event types are simply ignored by the summary, not rejected.
const ANALYTICS_KEY = 'ravensmoor-analytics';

function loadAnalytics() {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.events)) return parsed;
  } catch { /* fall through to a fresh log */ }
  return { version: 1, events: [] };
}

function saveAnalytics(book) {
  try { localStorage.setItem(ANALYTICS_KEY, JSON.stringify(book)); } catch { /* ignore */ }
}

// Generic event logger — fires every call, no dedup.
export function logEvent(type, data = {}) {
  const book = loadAnalytics();
  book.events.push({ type, timestamp: new Date().toISOString(), ...data });
  saveAnalytics(book);
}

// For once-per-investigation events (started/completed) — keyed on storyId
// so reloading an in-progress case, or re-confirming an already-won
// accusation, doesn't inflate the count.
export function logEventOncePerStory(type, storyId, data = {}) {
  const book = loadAnalytics();
  if (book.events.some((e) => e.type === type && e.storyId === storyId)) return;
  book.events.push({ type, timestamp: new Date().toISOString(), storyId, ...data });
  saveAnalytics(book);
}

// True once this story's investigation_completed event has already fired —
// used to stop a stray re-accusation (a win doesn't lock out further
// accusation attempts) from logging a second correct/incorrect_accusation
// for an investigation that's already resolved.
export function hasCompletedStory(storyId) {
  const { events } = loadAnalytics();
  return events.some((e) => e.type === 'investigation_completed' && e.storyId === storyId);
}

// True once this story has already gotten a feedback_opened or
// feedback_prompt_dismissed event — used to show the end-screen feedback
// prompt at most once per completed investigation.
export function hasFeedbackResponse(storyId) {
  const { events } = loadAnalytics();
  return events.some((e) => (e.type === 'feedback_opened' || e.type === 'feedback_prompt_dismissed') && e.storyId === storyId);
}

export function getAnalyticsSummary() {
  const { events } = loadAnalytics();
  const count = (type) => events.filter((e) => e.type === type).length;
  const correct = count('correct_accusation');
  const incorrect = count('incorrect_accusation');
  const total = correct + incorrect;
  return {
    started: count('investigation_started'),
    completed: count('investigation_completed'),
    correct,
    incorrect,
    hints: count('hint_used'),
    casesSolved: count('casebook_entry_unlocked'),
    successRate: total > 0 ? Math.round((correct / total) * 100) : 0
  };
}
