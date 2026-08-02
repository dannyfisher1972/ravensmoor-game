import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import RoomScene from './scenes/RoomScene.js';
import { CHARACTERS } from './data/characters.js';
import { getAllEvidence } from './data/evidenceCatalog.js';
import { SOLUTIONS } from './data/solutions.js';
import { BASE_QUESTIONS, FOLLOWUPS } from './data/questions.js';
import { TIMELINE } from './data/timeline.js';
import { ROOM_ORDER, ROOMS } from './data/rooms.js';
import { ACHIEVEMENTS } from './data/achievements.js';
import {
  FOUND_EVIDENCE, TALKED_TO, onStateChange, resetProgress, hasSavedProgress,
  UNLOCKED_ACHIEVEMENTS, checkAchievements, recordAccusationAttempt, accusationAttempts, killerIndex,
  ASKED_QUESTIONS,
  victoriaStatus, activeStory, storyName, renameActiveStory, startRandomStory,
  getSavedStories, renameStory, deleteStory,
  INVENTORY, armedItem, armItem, disarmItem, currentRoom,
  recordSolvedCase, getCasebook, NUM_KILLER_VARIANTS, CURRENT_PACK
} from './state.js';
import { startRainAmbience, setMuted, isMuted, playClick, playWinSting, playLoseSting } from './audio.js';
import { logEvent, logEventOncePerStory, hasCompletedStory, hasFeedbackResponse, getAnalyticsSummary } from './analytics.js';

// Single place to update the feedback destination without hunting through
// the codebase — a real Google Form URL should replace this before release.
const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfx0gEoMk6E0fDGaUShYORl2Mun4dyrvzGQHEuv19jA3LGrEA/viewform';

// Fixed for the whole playthrough (only reshuffles via resetProgress on a new
// investigation), so it's safe to resolve once here rather than threading it
// through every function that needs to know the evidence total or the answer.
const SOLUTION = SOLUTIONS[killerIndex];

// Analytics V1 — fires once per distinct story slot regardless of how many
// times that slot's page gets reloaded (see analytics.js's dedup-by-storyId).
logEventOncePerStory('investigation_started', activeStory, { scenarioId: killerIndex });
const ALL_EVIDENCE = getAllEvidence(SOLUTION.killer, victoriaStatus, SOLUTION.method);

// Reflects Victoria's randomized relationship status ("He leaves behind a
// wife/girlfriend...") anywhere the case file mentions it, so the briefing
// text never contradicts what the notebook and clues say about her.
document.querySelectorAll('.spouse-word').forEach((el) => {
  el.textContent = victoriaStatus === 'wife' ? 'wife' : 'girlfriend';
});

// Note: no global `pixelArt: true` here — it would force nearest-neighbor
// filtering on every texture, which would ruin the photorealistic
// AI-generated backgrounds and portraits (crunchy/aliased instead of smooth).
const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 960,
  height: 640,
  backgroundColor: '#0a0908',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 640
  },
  render: { preserveDrawingBuffer: true },
  // A second active pointer is needed for pinch-to-zoom (RoomScene tracks the
  // distance between two simultaneous touches) — Phaser only tracks one by
  // default.
  input: { activePointers: 2 },
  scene: [BootScene, RoomScene]
};

let game = null;

const startBtn = document.getElementById('startBtn');
const startBtnVerbEl = document.getElementById('startBtnVerb');
const startBtnStoryNameEl = document.getElementById('startBtnStoryName');
function renderStartBtnLabel() {
  if (hasSavedProgress()) {
    startBtnVerbEl.textContent = 'Resume Investigation';
    // Quoted and rendered in its own normal-case span (see .start-btn-story-name)
    // so a never-renamed save — literally named "New Investigation" — doesn't
    // collide with the verb into a single uppercase, self-contradictory phrase.
    startBtnStoryNameEl.textContent = `"${storyName}"`;
  } else {
    startBtnVerbEl.textContent = 'Begin the Investigation';
    startBtnStoryNameEl.textContent = '';
  }
}
renderStartBtnLabel();

// Lets a returning player deliberately wipe their saved room/evidence instead
// of always resuming — only shown when there's actually something to clear.
const resetLink = document.getElementById('resetLink');
if (hasSavedProgress()) resetLink.style.display = 'block';
resetLink.addEventListener('click', () => {
  resetProgress();
  location.reload();
});

// Only meaningful once there's an existing save to branch away from — for
// a never-played slot, this would just be a second, redundant way to do
// exactly what "Begin the Investigation" already does.
const newInvestigationControls = document.getElementById('newInvestigationControls');
if (hasSavedProgress()) newInvestigationControls.style.display = 'flex';

// The player's own name for whichever investigation is currently active —
// never the killer's, purely a label they pick for themselves. Renaming
// just relabels the save in place; it doesn't touch progress or reload.
const storyNameInput = document.getElementById('storyNameInput');
storyNameInput.value = storyName;
document.getElementById('renameStoryBtn').addEventListener('click', () => {
  playClick();
  renameActiveStory(storyNameInput.value);
  renderStartBtnLabel();
  renderSavedStories();
});

// Starts something new: if the currently active slot has never actually
// been played, it's rerolled in place (no orphaned empty saves pile up);
// otherwise a brand new save is created so existing progress is never lost.
document.getElementById('randomStoryBtn').addEventListener('click', () => {
  playClick();
  startRandomStory(storyNameInput.value);
  location.reload();
});

// Every other started investigation (the active one already has its own
// Continue button above) — resume, rename inline, or delete. Never labeled
// with who the killer is, just the player's own name and progress so far.
const savedStoriesSection = document.getElementById('savedStoriesSection');
const savedStoriesList = document.getElementById('savedStoriesList');
function renderSavedStories() {
  const others = getSavedStories().filter((s) => s.id !== activeStory);
  if (!others.length) {
    savedStoriesSection.style.display = 'none';
    return;
  }
  savedStoriesSection.style.display = 'block';
  savedStoriesList.innerHTML = others.map((s) => `
    <div class="saved-story-row" data-id="${s.id}">
      <input class="saved-story-name" value="${s.name.replace(/"/g, '&quot;')}" maxlength="60">
      <span class="saved-story-meta">${s.evidenceCount} clue${s.evidenceCount === 1 ? '' : 's'} found</span>
      <button class="btn secondary saved-story-resume">Resume</button>
      <button class="saved-story-delete" title="Delete this investigation" aria-label="Delete this investigation">&times;</button>
    </div>
  `).join('');
  savedStoriesList.querySelectorAll('.saved-story-row').forEach((row) => {
    const id = Number(row.dataset.id);
    const nameEl = row.querySelector('.saved-story-name');
    nameEl.addEventListener('change', () => renameStory(id, nameEl.value));
    row.querySelector('.saved-story-resume').addEventListener('click', () => {
      playClick();
      // ?resume=<id> is the one-shot signal state.js looks for to bypass its
      // normal "every load rerolls" behavior and actually reopen this exact
      // saved game — see state.js's resumeRequestedId() for the other half.
      location.href = location.pathname + '?resume=' + id;
    });
    row.querySelector('.saved-story-delete').addEventListener('click', () => {
      playClick();
      deleteStory(id);
      renderSavedStories();
    });
  });
}
renderSavedStories();

startBtn.addEventListener('click', () => {
  document.getElementById('titleScreen').classList.add('hidden');
  startRainAmbience(); // first user gesture on the page — safe to start the AudioContext here
  if (!game) {
    game = new Phaser.Game(config);
    window.__game = game;
  }
});

// Click-to-enlarge lightbox for Edmund's portrait on the briefing screen.
const victimModal = document.getElementById('victimModal');
document.getElementById('victimPortrait').addEventListener('click', () => {
  victimModal.classList.add('open');
});

// In-game "Case File" — lets the player revisit the murder briefing and
// Edmund's dossier at any point during play, not just before starting.
const caseFileModal = document.getElementById('caseFileModal');
document.getElementById('caseFileBtn').addEventListener('click', () => {
  playClick();
  caseFileModal.classList.add('open');
});

// Real portrait path for a character, plus an inline-SVG fallback (a ring in
// their board color around their initial) for anyone whose art hasn't been
// generated yet. Needed because these are plain <img> tags outside Phaser —
// RoomScene's own placeholder system doesn't cover the title screen, board,
// or accusation grid. A same-origin dev server returning 200 for a missing
// file (instead of a 404) would otherwise show a broken-image icon here.
function portraitSrc(c) {
  return `${import.meta.env.BASE_URL}assets/ai-art/${c.portraitKey.replace('portrait-', '')}.png`;
}
function portraitFallbackSrc(c) {
  const color = '#' + c.tint.toString(16).padStart(6, '0');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">`
    + `<rect width="100" height="100" fill="#2a2622"/>`
    + `<circle cx="50" cy="50" r="45" fill="none" stroke="${color}" stroke-width="4"/>`
    + `<text x="50" y="64" font-family="Georgia,serif" font-size="46" font-weight="700" fill="#e9e6da" text-anchor="middle">${c.name.charAt(0)}</text>`
    + `</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
function portraitImgAttrs(c) {
  return `src="${portraitSrc(c)}" onerror="this.onerror=null;this.src='${portraitFallbackSrc(c)}'"`;
}

// The full-screen "Meet the Household" cast modal, opened from its own
// button on the briefing screen rather than a side panel — the sidebar
// version left the roster below the fold (and off-screen entirely) on
// mobile, so a returning-to-scroll discovery wasn't reliable. Built from
// src/data/characters.js so it stays in sync with the NPCs actually placed
// in each room. Grid card click swaps to a single-character detail view
// within the same modal; "Back" swaps back. Re-opening the modal always
// resets to the grid, since it's the only entry point.
const castModal = document.getElementById('castModal');
const castGridView = document.getElementById('castGridView');
const castDetailView = document.getElementById('castDetailView');
const castGrid = document.getElementById('castGrid');
const castDetailImg = document.getElementById('castDetailImg');
const castDetailName = document.getElementById('castDetailName');
const castDetailRole = document.getElementById('castDetailRole');
const castDetailBio = document.getElementById('castDetailBio');

// Edmund isn't in CHARACTERS (built from ROOMS' npcs — he's the victim, never
// an NPC you talk to, so he'd wrongly show up on the deduction board and
// retalk panel if he were). He still belongs in the household roster though,
// so he's added here only, for the grid's benefit.
const EDMUND_HOUSEHOLD_ENTRY = {
  name: 'Edmund Thorne',
  tint: 0xc9a86a,
  portraitKey: 'portrait-edmund',
  role: 'The Victim — Founder & Chairman, Thorne Pharmaceutical Holdings',
  bio: "Edmund built Thorne Pharmaceutical Holdings from a single cardiac-drug patent into a four-hundred-million-pound company over forty years. He treated family loyalty as a debt to be collected on, and kept careful track of exactly what everyone around him owed."
};

[EDMUND_HOUSEHOLD_ENTRY, ...CHARACTERS].forEach((c) => {
  const shownName = c.displayName || c.name;
  const card = document.createElement('div');
  card.className = 'cast-card';
  card.innerHTML = `
    <img ${portraitImgAttrs(c)} alt="${shownName}">
    <span class="cast-card-name">${shownName}</span>
    <span class="cast-card-role">${c.role || ''}</span>
  `;
  card.addEventListener('click', () => {
    castDetailImg.onerror = () => { castDetailImg.onerror = null; castDetailImg.src = portraitFallbackSrc(c); };
    castDetailImg.src = portraitSrc(c);
    castDetailImg.alt = shownName;
    castDetailName.textContent = shownName;
    castDetailRole.textContent = c.role || '';
    castDetailBio.textContent = c.bio || '';
    castGridView.style.display = 'none';
    castDetailView.style.display = 'block';
  });
  castGrid.appendChild(card);
});

document.getElementById('castDetailBack').addEventListener('click', () => {
  castDetailView.style.display = 'none';
  castGridView.style.display = 'block';
});

document.getElementById('meetHouseholdBtn').addEventListener('click', () => {
  playClick();
  castDetailView.style.display = 'none';
  castGridView.style.display = 'block';
  castModal.classList.add('open');
});

// Both lightboxes (Edmund's dossier and each suspect's bio) share the
// .person-modal class, so one set of handlers closes whichever is open. For
// castModal specifically, "close" while a character's detail is showing
// should back out to the household grid instead of leaving the modal
// entirely — a player closing Harriet's bio almost certainly meant "stop
// looking at Harriet," not "stop looking at the household."
function closePersonModal(modal) {
  if (modal === castModal && castDetailView.style.display !== 'none') {
    castDetailView.style.display = 'none';
    castGridView.style.display = 'block';
    return;
  }
  modal.classList.remove('open');
}
document.querySelectorAll('.person-modal-close').forEach((btn) => {
  btn.addEventListener('click', () => closePersonModal(btn.closest('.person-modal')));
});
document.querySelectorAll('.person-modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePersonModal(modal);
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.person-modal.open').forEach((m) => closePersonModal(m));
  }
});
// Any <button> keeps DOM focus after being clicked, so a later Space/Enter
// press can silently re-trigger it (room-nav arrows are the case that bit
// us). Blurring right after the click removes that lingering focus everywhere,
// not just for room-nav buttons.
document.addEventListener('click', (e) => {
  if (e.target instanceof HTMLButtonElement) {
    e.target.blur();
  }
});

// --- Progress counter ---------------------------------------------------
const progressBadge = document.getElementById('progressBadge');
function renderProgress() {
  progressBadge.textContent = `${FOUND_EVIDENCE.size} / ${ALL_EVIDENCE.length} clues found`;
}
onStateChange(renderProgress);
renderProgress();

// --- Onboarding hint dismissal ----------------------------------------------
// #hint / #hint-touch sit at a fixed spot near the top of the game area (see
// index.html) — fine as a one-time nudge, but on a short mobile landscape
// viewport that fixed position can land right on top of a room's own
// top-row clues, and CSS alone has no way to know the player already got
// the message. Once they've found anything or talked to anyone, they've
// demonstrated they know to tap glowing things — hide it for good so it
// stops covering clues for the rest of the playthrough.
const hintEl = document.getElementById('hint');
const hintTouchEl = document.getElementById('hint-touch');
function renderHintVisibility() {
  const seenIt = FOUND_EVIDENCE.size > 0 || TALKED_TO.size > 0;
  // Clearing back to '' (rather than never touching it) lets a brand new
  // investigation slot show the hint again instead of staying hidden from
  // a previous playthrough's progress.
  hintEl.style.display = seenIt ? 'none' : '';
  hintTouchEl.style.display = seenIt ? 'none' : '';
}
onStateChange(renderHintVisibility);
renderHintVisibility();

// --- Inventory ------------------------------------------------------------
// Carryable items (rooms.js's `pickup` flag) live in the same evidence
// catalog as every other clue, so the inventory panel just filters
// ALL_EVIDENCE down to the ones flagged pickup rather than keeping its own
// separate item list to maintain.
const inventoryModal = document.getElementById('inventoryModal');
const inventoryGrid = document.getElementById('inventoryGrid');
const armedBanner = document.getElementById('armedBanner');
const armedItemNameEl = document.getElementById('armedItemName');
const PICKUP_ITEMS = ALL_EVIDENCE.filter((h) => h.pickup);

function renderInventory() {
  const owned = PICKUP_ITEMS.filter((item) => INVENTORY.has(item.id));
  inventoryGrid.innerHTML = owned.length
    ? owned.map((item) => `
        <div class="accuse-suspect${armedItem === item.id ? ' armed' : ''}" data-item="${item.id}">
          ${item.icon
            ? `<img src="${import.meta.env.BASE_URL}assets/ai-art/${item.icon}" alt="${item.name}">`
            : '<div class="accuse-icon">🗝</div>'}
          <span>${item.name}</span>
        </div>
      `).join('')
    : '<p class="notebook-empty">Nothing in your pockets yet.</p>';
  inventoryGrid.querySelectorAll('[data-item]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.dataset.item;
      playClick();
      if (armedItem === id) disarmItem();
      else armItem(id);
    });
  });
}

function renderArmedBanner() {
  if (armedItem) {
    const item = PICKUP_ITEMS.find((h) => h.id === armedItem);
    armedItemNameEl.textContent = item ? item.name : armedItem;
    armedBanner.style.display = 'flex';
  } else {
    armedBanner.style.display = 'none';
  }
}

onStateChange(renderInventory);
onStateChange(renderArmedBanner);
renderInventory();
renderArmedBanner();

document.getElementById('inventoryBtn').addEventListener('click', () => {
  playClick();
  inventoryModal.classList.add('open');
});
document.getElementById('putAwayBtn').addEventListener('click', () => {
  playClick();
  disarmItem();
});

// --- Hints -----------------------------------------------------------------
// Points a stuck player at their single most useful next step without
// spelling out the clue itself — three tiers escalating from a vague nudge
// to naming the exact object, so leaning on it doesn't feel like reading a
// full walkthrough. Recomputed fresh every time the modal opens rather than
// cached, since what's most useful changes the moment new evidence, a new
// person, or a new question comes in.
const hintModal = document.getElementById('hintModal');
const hintTierLabelEl = document.getElementById('hintTierLabel');
const hintTextEl = document.getElementById('hintText');
const hintMoreBtn = document.getElementById('hintMoreBtn');
const hintBtn = document.getElementById('hintBtn');

const NPC_ROOM_LABEL = {};
Object.values(ROOMS).forEach((room) => {
  (room.npcs || []).forEach((npc) => { NPC_ROOM_LABEL[npc.name] = room.label; });
});

// Same gating rules as RoomScene's isUnlocked, minus the killer/method/
// victoriaStatus/optional checks — ALL_EVIDENCE has already excluded
// anything that doesn't apply to this game's scenario (see evidenceCatalog.js).
function isPendingClue(h) {
  if (FOUND_EVIDENCE.has(h.id)) return false;
  if (!h.requires) return true;
  if (h.requires.npc && !TALKED_TO.has(h.requires.npc)) return false;
  if (h.requires.evidence && !FOUND_EVIDENCE.has(h.requires.evidence)) return false;
  return true;
}

const HINT_TIER_LABELS = ['A gentle nudge', 'A clearer direction', 'The direct answer'];

// Picks ONE thing to hint at. An unused key with a known lock comes first —
// the exact "found 5 keys, no idea where they go" complaint this feature
// exists to answer — but after that, talking to people outranks poking
// around rooms: meeting someone new or asking a fresh question is how new
// clues and questions unlock in the first place, so it's the more useful
// nudge for a stuck player far more often than "there's an object somewhere
// you haven't clicked yet." Only falls back to a generic unexamined-clue
// hint once the interview side is fully caught up.
function buildHintTiers() {
  const pending = ALL_EVIDENCE.filter(isPendingClue);

  const lockTarget = pending.find((h) => h.itemLock && INVENTORY.has(h.itemLock));
  if (lockTarget) {
    const item = ALL_EVIDENCE.find((h) => h.id === lockTarget.itemLock);
    const itemName = (item ? item.name : "something you're carrying").toLowerCase();
    return [
      "You're holding something that hasn't found its lock yet.",
      `Somewhere in ${lockTarget.room}, you'll find exactly where it fits.`,
      `In ${lockTarget.room}, use ${itemName} on ${lockTarget.name.toLowerCase()}.`
    ];
  }

  const unmet = CHARACTERS.find((c) => !TALKED_TO.has(c.name));
  if (unmet) {
    const shown = unmet.displayName || unmet.name;
    const room = NPC_ROOM_LABEL[unmet.name];
    return [
      "There's still someone in this house you haven't spoken to.",
      room ? `Someone in ${room} is still waiting to meet you.` : "Keep exploring the manor — someone hasn't been found yet.",
      `Introduce yourself to ${shown}${room ? ` in ${room}` : ''}.`
    ];
  }

  for (const c of CHARACTERS) {
    if (!TALKED_TO.has(c.name)) continue;
    const askable = [
      ...BASE_QUESTIONS,
      ...FOLLOWUPS.filter((f) => f.target === c.name && isFollowupUnlockedForAchievement(f))
    ];
    const unasked = askable.find((q) => !ASKED_QUESTIONS.has(`${c.name}|${q.id}`));
    if (unasked) {
      const shown = c.displayName || c.name;
      return [
        "Someone you've already met might have more to say.",
        `Go back and talk to ${shown} again.`,
        `Ask ${shown}: "${unasked.text}"`
      ];
    }
  }

  const clueTarget = pending.find((h) => !h.itemLock);
  if (clueTarget) {
    const verb = clueTarget.pickup ? 'pick up' : 'take a closer look at';
    return [
      "There's still something worth examining, somewhere you can already reach.",
      `Have another look around ${clueTarget.room}.`,
      `In ${clueTarget.room}, ${verb} ${clueTarget.name.toLowerCase()}.`
    ];
  }

  return [
    "You've turned over everything reachable right now, and asked everyone what they'll say. The Notebook's Board view lays out how it all connects — if you're confident, it's time to make your accusation."
  ];
}

let hintTiers = [];
let hintTierIndex = 0;

function renderHintTier() {
  hintTierLabelEl.textContent = HINT_TIER_LABELS[hintTierIndex] || '';
  hintTextEl.textContent = hintTiers[hintTierIndex] || '';
  const atLast = hintTierIndex >= hintTiers.length - 1;
  hintMoreBtn.style.display = atLast ? 'none' : '';
}

hintBtn.addEventListener('click', () => {
  playClick();
  hintTiers = buildHintTiers();
  hintTierIndex = 0;
  renderHintTier();
  hintModal.classList.add('open');
  logEvent('hint_used', { scenarioId: killerIndex, hintTier: hintTierIndex + 1 });
});

hintMoreBtn.addEventListener('click', () => {
  playClick();
  hintTierIndex = Math.min(hintTierIndex + 1, hintTiers.length - 1);
  renderHintTier();
  logEvent('hint_used', { scenarioId: killerIndex, hintTier: hintTierIndex + 1 });
});

// --- Issue reporting --------------------------------------------------------
// A tester never has to explain which story they were in or dig up a
// screenshot themselves — this grabs both automatically. The screenshot is
// the Phaser canvas only (readable because the game config sets
// preserveDrawingBuffer: true); DOM overlay content (an open dialog or
// modal) isn't part of that pixel buffer, so its text is captured separately
// as plain text in the same report rather than left out entirely.
const reportModal = document.getElementById('reportModal');
const reportBtn = document.getElementById('reportBtn');
const reportScreenshotEl = document.getElementById('reportScreenshot');
const reportDescriptionEl = document.getElementById('reportDescription');
const reportSendBtn = document.getElementById('reportSendBtn');
const reportStatusEl = document.getElementById('reportStatus');
const reportDetailsTextEl = document.getElementById('reportDetailsText');

function describeOnScreenState() {
  const openModal = document.querySelector('.person-modal.open');
  const lines = [];
  if (openModal) lines.push(`Open panel: ${openModal.id}`);
  const dialogEl = document.getElementById('dialog');
  if (dialogEl && getComputedStyle(dialogEl).display !== 'none') {
    const title = document.getElementById('dialog-title')?.textContent;
    const body = document.getElementById('dialog-body')?.textContent;
    if (title || body) lines.push(`Open dialog: "${title || ''}" — ${(body || '').slice(0, 200)}`);
  }
  return lines.length ? lines.join('\n') : 'Nothing open — main room view.';
}

function buildDiagnosticReport() {
  return [
    'Ravensmoor Hall — Issue Report',
    `Time: ${new Date().toISOString()}`,
    `Version: Beta 1.0`,
    `Story: "${storyName}" (slot ${activeStory})`,
    `Scenario #${killerIndex}: ${SOLUTION.killer} — ${SOLUTION.method}`,
    `Victoria status: ${victoriaStatus}`,
    `Current room: ${ROOMS[currentRoom]?.label || currentRoom || '(not yet loaded)'}`,
    `Evidence found: ${FOUND_EVIDENCE.size} / ${ALL_EVIDENCE.length}`,
    `People talked to: ${TALKED_TO.size} / ${CHARACTERS.length}`,
    `Accusation attempts used: ${accusationAttempts} / ${MAX_ACCUSATIONS}`,
    `Viewport: ${window.innerWidth}x${window.innerHeight}`,
    `User agent: ${navigator.userAgent}`,
    '',
    '--- On-screen at time of report ---',
    describeOnScreenState()
  ].join('\n');
}

let reportScreenshotDataUrl = null;

reportBtn.addEventListener('click', () => {
  playClick();
  reportDescriptionEl.value = '';
  reportStatusEl.style.display = 'none';
  reportSendBtn.disabled = false;
  reportSendBtn.textContent = 'Share Report';
  try {
    reportScreenshotDataUrl = game.canvas.toDataURL('image/png');
  } catch {
    reportScreenshotDataUrl = null;
  }
  reportScreenshotEl.src = reportScreenshotDataUrl || '';
  reportDetailsTextEl.textContent = buildDiagnosticReport();
  reportModal.classList.add('open');
});

reportSendBtn.addEventListener('click', async () => {
  playClick();
  const description = reportDescriptionEl.value.trim();
  const diagnosticText = buildDiagnosticReport();
  const fullText = (description ? description + '\n\n' : '') + diagnosticText;
  reportSendBtn.disabled = true;

  try {
    let file = null;
    if (reportScreenshotDataUrl) {
      const blob = await (await fetch(reportScreenshotDataUrl)).blob();
      file = new File([blob], `ravensmoor-report-${Date.now()}.png`, { type: 'image/png' });
    }
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text: fullText, title: 'Ravensmoor Hall — Issue Report' });
      reportStatusEl.textContent = 'Report shared. Thank you!';
      reportStatusEl.style.display = '';
    } else {
      // Download and clipboard-copy are independent fallback steps — one
      // failing (e.g. the browser denies clipboard access) shouldn't hide
      // that the other one worked, so each gets its own try/catch rather
      // than sharing one that reports total failure on a partial success.
      let downloaded = false;
      if (reportScreenshotDataUrl) {
        try {
          const a = document.createElement('a');
          a.href = reportScreenshotDataUrl;
          a.download = `ravensmoor-report-${Date.now()}.png`;
          a.click();
          downloaded = true;
        } catch { /* handled by the status message below */ }
      }
      let copied = false;
      try {
        await navigator.clipboard.writeText(fullText);
        copied = true;
      } catch { /* handled by the status message below */ }

      if (downloaded && copied) {
        reportStatusEl.textContent = 'Screenshot downloaded and details copied to your clipboard — paste them into an email or message.';
      } else if (downloaded) {
        reportStatusEl.textContent = "Screenshot downloaded. Couldn't copy the details automatically — expand \"Details included\" below and copy them yourself.";
      } else if (copied) {
        reportStatusEl.textContent = "Details copied to your clipboard, but the screenshot couldn't be saved automatically.";
      } else {
        reportStatusEl.textContent = "Couldn't prepare the report automatically — expand \"Details included\" below and copy them yourself.";
      }
      reportStatusEl.style.display = '';
    }
  } catch (err) {
    // AbortError just means the user closed the native share sheet — not a
    // real failure, so it shouldn't show as one.
    if (err?.name !== 'AbortError') {
      reportStatusEl.textContent = "Couldn't prepare the report automatically — expand \"Details included\" below and copy the text yourself.";
      reportStatusEl.style.display = '';
    }
  } finally {
    reportSendBtn.disabled = false;
  }
});

// --- Casebook ----------------------------------------------------------
// Cross-investigation record of solved scenarios (see state.js's
// getCasebook/recordSolvedCase) — independent of any single story slot, so
// it persists across new investigations and resets. Killer/method are
// never shown for a scenario that hasn't actually been solved yet.
const casebookModal = document.getElementById('casebookModal');
const casebookBtn = document.getElementById('casebookBtn');
const casebookGrid = document.getElementById('casebookGrid');
const casebookCountEl = document.getElementById('casebookCount');

function renderCasebook() {
  const book = getCasebook();
  const solvedEntries = Object.values(book.solved);
  casebookCountEl.textContent = `Solved Cases: ${solvedEntries.length} / ${NUM_KILLER_VARIANTS}`;
  const cards = [];
  for (let i = 0; i < NUM_KILLER_VARIANTS; i++) {
    const entry = solvedEntries.find((e) => e.pack === CURRENT_PACK && e.scenarioId === i);
    if (entry) {
      const dateStr = new Date(entry.solvedAt).toLocaleDateString();
      cards.push(`
        <div class="casebook-card solved">
          <div class="casebook-killer">${entry.killer}</div>
          <div class="casebook-method">✓ ${entry.method}</div>
          <div class="casebook-date">${dateStr}</div>
        </div>
      `);
    } else {
      cards.push(`
        <div class="casebook-card unsolved">
          <div class="casebook-killer">Case #${i + 1}</div>
          <div class="casebook-method">????</div>
        </div>
      `);
    }
  }
  casebookGrid.innerHTML = cards.join('');
}

casebookBtn.addEventListener('click', () => {
  playClick();
  renderCasebook();
  casebookModal.classList.add('open');
});

// --- Analytics (V1) ------------------------------------------------------
// Simple local counters only — no charts, no export, no backend. See
// analytics.js for the underlying event log this reads from.
const analyticsModal = document.getElementById('analyticsModal');
const analyticsBtn = document.getElementById('analyticsBtn');
const analyticsStatsEl = document.getElementById('analyticsStats');

function renderAnalytics() {
  const s = getAnalyticsSummary();
  const rows = [
    ['Investigations Started', s.started],
    ['Investigations Completed', s.completed],
    ['Correct Accusations', s.correct],
    ['Incorrect Accusations', s.incorrect],
    ['Hint Usage Count', s.hints],
    ['Cases Solved', s.casesSolved],
    ['Success Rate', `${s.successRate}%`]
  ];
  analyticsStatsEl.innerHTML = rows.map(([label, value]) => `
    <div class="analytics-row"><span>${label}</span><b>${value}</b></div>
  `).join('');
}

analyticsBtn.addEventListener('click', () => {
  playClick();
  renderAnalytics();
  analyticsModal.classList.add('open');
});

// --- Feedback (V1) -------------------------------------------------------
// Google Form only — no custom survey, no backend. The HUD button always
// opens the form directly; the end-of-case prompt is the gentler, opt-in
// version shown at most once per completed investigation (see
// hasFeedbackResponse in analytics.js).
const feedbackBtn = document.getElementById('feedbackBtn');
const feedbackPromptEl = document.getElementById('feedbackPrompt');
const feedbackGiveBtn = document.getElementById('feedbackGiveBtn');
const feedbackLaterBtn = document.getElementById('feedbackLaterBtn');

feedbackBtn.addEventListener('click', () => {
  playClick();
  window.open(FEEDBACK_FORM_URL, '_blank', 'noopener');
  logEvent('feedback_opened', { scenarioId: killerIndex, storyId: activeStory, source: 'hud' });
});

feedbackGiveBtn.addEventListener('click', () => {
  playClick();
  window.open(FEEDBACK_FORM_URL, '_blank', 'noopener');
  logEvent('feedback_opened', { scenarioId: killerIndex, storyId: activeStory, source: 'end_screen' });
  feedbackPromptEl.style.display = 'none';
});

feedbackLaterBtn.addEventListener('click', () => {
  playClick();
  logEvent('feedback_prompt_dismissed', { scenarioId: killerIndex, storyId: activeStory });
  feedbackPromptEl.style.display = 'none';
});

// --- Mute toggle ---------------------------------------------------------
// Two buttons — one on the title screen (so sound can be turned off before
// the rain ambience ever starts), one in the in-game HUD — both reflect the
// same underlying muted flag in audio.js, so toggling either updates both.
const muteBtn = document.getElementById('muteBtn');
const titleMuteBtn = document.getElementById('titleMuteBtn');
function syncMuteButtons() {
  muteBtn.textContent = isMuted() ? '🔇' : '🔊';
  titleMuteBtn.textContent = isMuted() ? '🔇 Sound Off' : '🔊 Sound';
}
function toggleMute() {
  setMuted(!isMuted());
  syncMuteButtons();
}
muteBtn.addEventListener('click', toggleMute);
titleMuteBtn.addEventListener('click', toggleMute);
syncMuteButtons();

// --- Case notebook ---------------------------------------------------------
const notebookModal = document.getElementById('notebookModal');
const notebookEvidenceEl = document.getElementById('notebookEvidence');
const notebookPeopleEl = document.getElementById('notebookPeople');

// Rooms in manor-tour order, for grouping the evidence list the way the
// player actually walked through the house — with any room not on that
// tour (currently just the studyBody close-up) tacked on at the end rather
// than dropped.
const ROOM_LABEL_ORDER = [
  ...ROOM_ORDER.map((key) => ROOMS[key].label),
  ...Object.keys(ROOMS).filter((key) => !ROOM_ORDER.includes(key)).map((key) => ROOMS[key].label)
];

// A hotspot's note can vary by scenario (see solutions.js's sceneNotes,
// resolved the same way RoomScene does it in-game) — without this, the
// notebook could show generic poison-flavored wording for a game that was
// actually blunt-force, smothering, etc., contradicting what the player
// actually read when they found it.
function resolveNoteForNotebook(entry) {
  return SOLUTION.sceneNotes?.[entry.id] ?? entry.note;
}

function renderNotebook() {
  const found = ALL_EVIDENCE.filter((e) => FOUND_EVIDENCE.has(e.id));
  const byRoom = new Map();
  found.forEach((e) => {
    if (!byRoom.has(e.room)) byRoom.set(e.room, []);
    byRoom.get(e.room).push(e);
  });
  const roomsInOrder = [...byRoom.keys()].sort(
    (a, b) => ROOM_LABEL_ORDER.indexOf(a) - ROOM_LABEL_ORDER.indexOf(b)
  );

  notebookEvidenceEl.innerHTML = found.length
    ? roomsInOrder.map((room) => `
        <div class="notebook-room-group">
          <h4 class="notebook-room-heading">${room}</h4>
          ${byRoom.get(room).map((e) => {
            const implicatesTag = e.implicates
              ? `<span class="implicates-tag">${(Array.isArray(e.implicates) ? e.implicates : [e.implicates]).map((n) => SUSPECT_DISPLAY_NAMES[n] || n).join(', ')}</span>`
              : '';
            return `
              <div class="notebook-entry">
                <div class="notebook-entry-head">
                  <b>${e.name}</b>
                  <span class="notebook-tags">
                    ${e.redHerring ? '<span class="dead-end-tag">Dead End</span>' : ''}
                    ${e.alibiBreak ? '<span class="alibi-break-tag">Alibi Break</span>' : ''}
                    ${e.pickup ? '<span class="item-tag">Item</span>' : ''}
                    ${implicatesTag}
                  </span>
                </div>
                <p>${resolveNoteForNotebook(e)}</p>
              </div>
            `;
          }).join('')}
        </div>
      `).join('')
    : '<p class="notebook-empty">No evidence found yet.</p>';
  const remaining = ALL_EVIDENCE.length - found.length;
  if (remaining > 0) {
    notebookEvidenceEl.innerHTML += `<p class="notebook-empty">${remaining} more clue${remaining === 1 ? '' : 's'} still out there.</p>`;
  }

  const talked = CHARACTERS.filter((c) => TALKED_TO.has(c.name));
  notebookPeopleEl.innerHTML = talked.length
    ? talked.map((c) => {
      const askable = [...BASE_QUESTIONS, ...FOLLOWUPS.filter((f) => f.target === c.name)];
      const asked = askable.filter((q) => ASKED_QUESTIONS.has(`${c.name}|${q.id}`));
      const qAndA = asked.length
        ? asked.map((q) => `<p class="notebook-qa"><em>${q.text}</em><br>${c.answers?.[q.id] || ''}</p>`).join('')
        : '';
      return `
        <div class="notebook-entry">
          <b>${c.displayName || c.name}</b>
          <span>${c.role || ''} · ${asked.length} of ${askable.length} question${askable.length === 1 ? '' : 's'} asked</span>
          <p>"${c.line.replace(/^"|"$/g, '')}"</p>
          ${qAndA}
        </div>
      `;
    }).join('')
    : '<p class="notebook-empty">You haven\'t spoken to anyone yet.</p>';
}

// --- Deduction board -----------------------------------------------------
// Suspects sit in evenly-spaced rows across the top and bottom; found
// evidence that implicates someone gets a card in the middle with a
// string-line drawn to them. Undiscovered evidence simply isn't shown, so
// the board can't spoil what a clue reveals before the player finds it.
//
// Two things used to make this confusing at 10 suspects: the row math only
// ever placed things at "row 0" or "the bottom row," so a 3rd row of
// suspects landed exactly on top of the 1st extra row instead of getting
// its own line; and the suspect/evidence cards were positioned with raw
// pixel offsets sized for a 720x420 canvas while the SVG lines scaled with
// the container via viewBox — the two coordinate systems only agreed when
// the modal happened to render at exactly that width. Both are fixed below:
// positions are computed per-row (any row count, any row size, centered
// independently), and everything — lines and cards alike — is placed with
// percentages of BOARD_W/BOARD_H so they scale together.
const boardWrap = document.getElementById('boardWrap');
const BOARD_W = 900, BOARD_H = 480;
const pctX = (x) => `${(x / BOARD_W) * 100}%`;
const pctY = (y) => `${(y / BOARD_H) * 100}%`;

// Every suspect gets their own color, used for both their portrait ring and
// any line connecting evidence to them — so following "which clues point at
// Marcus" is a matter of looking for his color, not untangling same-colored
// string crossing the whole board.
const SUSPECT_COLORS = {};
// Evidence's `implicates` field (rooms.js) always names the fixed internal
// identifier (matching a hotspot's `requires: { killer/npc: ... }` gates),
// never the display name — this map is how notebook/board text showing an
// `implicates` value gets the player-facing name instead (see Victoria's
// randomized wife/girlfriend display name in characters.js).
const SUSPECT_DISPLAY_NAMES = {};
CHARACTERS.forEach((c, i) => {
  SUSPECT_COLORS[c.name] = `hsl(${Math.round((i * 360) / CHARACTERS.length)}, 60%, 68%)`;
  SUSPECT_DISPLAY_NAMES[c.name] = c.displayName || c.name;
});

// Centers `count` items evenly across [margin, total-margin], returning the
// position for `index`. A single item centers on the midpoint instead of
// dividing by zero.
function evenSpread(index, count, total, margin) {
  if (count <= 1) return total / 2;
  return margin + (index / (count - 1)) * (total - 2 * margin);
}

function renderBoard() {
  const cols = Math.min(5, CHARACTERS.length) || 1;
  const rows = Math.ceil(CHARACTERS.length / cols);
  const suspectPos = {};
  for (let row = 0; row < rows; row++) {
    const rowItems = CHARACTERS.slice(row * cols, row * cols + cols);
    const y = evenSpread(row, rows, BOARD_H, 50);
    rowItems.forEach((c, colIdx) => {
      suspectPos[c.name] = { x: evenSpread(colIdx, rowItems.length, BOARD_W, 90), y };
    });
  }

  // Grouping same-suspect clues together (rather than plain discovery order)
  // keeps their lines running roughly parallel instead of crossing the
  // whole board to interleave with someone else's.
  const foundWithLinks = ALL_EVIDENCE
    .filter((e) => FOUND_EVIDENCE.has(e.id) && e.implicates)
    .slice()
    .sort((a, b) => {
      const an = Array.isArray(a.implicates) ? a.implicates[0] : a.implicates;
      const bn = Array.isArray(b.implicates) ? b.implicates[0] : b.implicates;
      return an.localeCompare(bn);
    });

  const evCols = Math.max(1, Math.min(4, foundWithLinks.length));
  const evRows = Math.ceil(foundWithLinks.length / evCols) || 1;
  const evYStart = BOARD_H * 0.28, evYEnd = BOARD_H * 0.72;
  const evPos = [];
  for (let row = 0; row < evRows; row++) {
    const rowItems = foundWithLinks.slice(row * evCols, row * evCols + evCols);
    const y = evenSpread(row, evRows, evYEnd - evYStart, 0) + evYStart;
    rowItems.forEach((entry, colIdx) => {
      evPos.push({ entry, x: evenSpread(colIdx, rowItems.length, BOARD_W, 80), y });
    });
  }

  let svgLines = '';
  evPos.forEach(({ entry, x, y }) => {
    const targets = Array.isArray(entry.implicates) ? entry.implicates : [entry.implicates];
    targets.forEach((name) => {
      const sp = suspectPos[name];
      if (!sp) return;
      const color = entry.redHerring ? '#6a6a5f' : (SUSPECT_COLORS[name] || '#d989bc');
      svgLines += `<line x1="${x}" y1="${y}" x2="${sp.x}" y2="${sp.y}"
        stroke="${color}"
        stroke-width="${entry.redHerring ? 1 : 1.8}"
        stroke-dasharray="${entry.redHerring ? '4,4' : 'none'}"
        opacity="${entry.redHerring ? 0.5 : 0.8}" />`;
    });
  });

  const suspectHtml = CHARACTERS.map((c) => `
    <div class="board-suspect" style="left:${pctX(suspectPos[c.name].x)}; top:${pctY(suspectPos[c.name].y)};">
      <img ${portraitImgAttrs(c)} alt="${c.displayName || c.name}" style="border-color:${SUSPECT_COLORS[c.name]};">
      <span>${c.displayName || c.name}</span>
    </div>
  `).join('');

  const evidenceHtml = evPos.map(({ entry, x, y }) => `
    <div class="board-evidence" style="left:${pctX(x)}; top:${pctY(y)};">${entry.name}</div>
  `).join('');

  boardWrap.innerHTML = `
    <svg viewBox="0 0 ${BOARD_W} ${BOARD_H}" preserveAspectRatio="none">${svgLines}</svg>
    ${suspectHtml}
    ${evidenceHtml}
  `;
  if (!foundWithLinks.length) {
    boardWrap.innerHTML += '<p class="notebook-empty" style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);">Find some evidence to start connecting the case.</p>';
  }
}

// --- Timeline -------------------------------------------------------------
// Built from a fixed, killer-invariant script of the night (src/data/timeline.js);
// each entry only renders once its own reveal condition — a specific clue
// found, or a specific question asked of a specific person — is actually
// true, so this never hands the player something they haven't learned yet.
function timelineRevealed(reveal) {
  if (reveal.evidence) return FOUND_EVIDENCE.has(reveal.evidence);
  if (reveal.npc && reveal.questionId) return ASKED_QUESTIONS.has(`${reveal.npc}|${reveal.questionId}`);
  return false;
}

const timelineListEl = document.getElementById('timelineList');
function renderTimeline() {
  const revealed = TIMELINE.filter((t) => timelineRevealed(t.reveal));
  timelineListEl.innerHTML = revealed.length
    ? revealed.map((t) => `
      <div class="timeline-entry">
        <span class="timeline-time">${t.label}</span>
        <span class="timeline-dot"></span>
        <span class="timeline-text">${t.text}</span>
      </div>
    `).join('')
    : '<p class="notebook-empty">Nothing placed on the timeline yet — find clues and ask people about their evenings.</p>';
  renderContradictions();
}

// Two independent sources feed this section: a followup tagged
// `contradiction: true` (see questions.js — always the same lines every
// game, so it's flavor/food-for-thought, never a guilt tell) and a piece of
// physical evidence tagged `alibiBreak: true` (see rooms.js — a clue whose
// own note sets someone's claimed account against a contrary fact). Either
// way, this just collects the "wait, those two accounts don't quite match"
// moments the player already unlocked in one place, instead of relying on
// them to remember a conversation or a clue from several rooms back.
const contradictionsSectionEl = document.getElementById('contradictionsSection');
const contradictionsListEl = document.getElementById('contradictionsList');
function renderContradictions() {
  const noticedFollowups = FOLLOWUPS.filter((f) => f.contradiction && ASKED_QUESTIONS.has(`${f.target}|${f.id}`));
  const noticedEvidence = ALL_EVIDENCE.filter((e) => e.alibiBreak && FOUND_EVIDENCE.has(e.id));
  contradictionsSectionEl.style.display = (noticedFollowups.length || noticedEvidence.length) ? '' : 'none';
  if (!noticedFollowups.length && !noticedEvidence.length) return;
  const followupHtml = noticedFollowups.map((f) => {
    const target = CHARACTERS.find((c) => c.name === f.target);
    const answer = target?.answers?.[f.id] || '';
    return `
      <div class="contradiction-entry">
        <span class="contradiction-icon">⚠</span>
        <span class="contradiction-body"><em>${f.target}</em> — ${answer}</span>
      </div>
    `;
  }).join('');
  const evidenceHtml = noticedEvidence.map((e) => `
    <div class="contradiction-entry">
      <span class="contradiction-icon">⚠</span>
      <span class="contradiction-body"><em>${e.name}</em> — ${resolveNoteForNotebook(e)}</span>
    </div>
  `).join('');
  contradictionsListEl.innerHTML = followupHtml + evidenceHtml;
}

// --- Notebook view switching ------------------------------------------------
const notebookViews = {
  list: { btn: document.getElementById('notebookListBtn'), el: document.getElementById('notebookListView') },
  timeline: { btn: document.getElementById('notebookTimelineBtn'), el: document.getElementById('notebookTimelineView'), onShow: renderTimeline },
  board: { btn: document.getElementById('notebookBoardBtn'), el: document.getElementById('notebookBoardView'), onShow: renderBoard }
};
Object.entries(notebookViews).forEach(([key, view]) => {
  view.btn.addEventListener('click', () => {
    Object.values(notebookViews).forEach((v) => { v.btn.classList.remove('active'); v.el.style.display = 'none'; });
    view.btn.classList.add('active');
    view.el.style.display = '';
    if (view.onShow) view.onShow();
  });
});

// --- Achievements ---------------------------------------------------------
const achievementsRowEl = document.getElementById('achievementsRow');
function renderAchievements() {
  achievementsRowEl.innerHTML = ACHIEVEMENTS.map((a) => {
    const unlocked = UNLOCKED_ACHIEVEMENTS.has(a.id);
    return `
      <div class="achievement-badge ${unlocked ? 'unlocked' : ''}">
        <span class="ach-icon">${unlocked ? '🏆' : '🔒'}</span>
        <span>
          <b>${a.title}</b>
          <span>${a.description}</span>
        </span>
      </div>
    `;
  }).join('');
}

const achievementToast = document.getElementById('achievementToast');
let toastQueue = [];
let toastBusy = false;
function showNextToast() {
  if (toastBusy || !toastQueue.length) return;
  const ach = toastQueue.shift();
  toastBusy = true;
  achievementToast.innerHTML = `<b>🏆 Achievement Unlocked</b><span>${ach.title}</span>`;
  achievementToast.classList.add('show');
  setTimeout(() => {
    achievementToast.classList.remove('show');
    setTimeout(() => { toastBusy = false; showNextToast(); }, 300);
  }, 3000);
}
function handleNewAchievements(ids) {
  if (!ids.length) return;
  ids.forEach((id) => {
    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    if (ach) toastQueue.push(ach);
  });
  showNextToast();
  renderAchievements();
}

// Mirrors RoomScene.js's isFollowupUnlocked — duplicated rather than shared
// since this module has no access to the live scene, but keep them in sync.
function isFollowupUnlockedForAchievement(f) {
  if (f.unlocksAfter.evidence) return FOUND_EVIDENCE.has(f.unlocksAfter.evidence);
  if (f.unlocksAfter.npc && f.unlocksAfter.questionId) {
    return ASKED_QUESTIONS.has(`${f.unlocksAfter.npc}|${f.unlocksAfter.questionId}`);
  }
  return false;
}

// True once every base question, plus every follow-up that's actually
// unlocked so far, has been asked of every single person in the house — a
// stricter superset of "Interrogator" (which only requires talking to them).
function allAvailableQuestionsAsked() {
  if (TALKED_TO.size < CHARACTERS.length) return false;
  return CHARACTERS.every((c) => {
    const askable = [
      ...BASE_QUESTIONS,
      ...FOLLOWUPS.filter((f) => f.target === c.name && isFollowupUnlockedForAchievement(f))
    ];
    return askable.every((q) => ASKED_QUESTIONS.has(`${c.name}|${q.id}`));
  });
}

function achievementTotals(extra) {
  return {
    totalEvidence: ALL_EVIDENCE.length, totalRooms: ROOM_ORDER.length, totalCharacters: CHARACTERS.length,
    allQuestionsAsked: allAvailableQuestionsAsked(),
    ...extra
  };
}

onStateChange(() => handleNewAchievements(checkAchievements(achievementTotals({}))));
renderAchievements();

document.getElementById('notebookBtn').addEventListener('click', () => {
  playClick();
  renderNotebook();
  renderAchievements();
  const activeView = Object.values(notebookViews).find((v) => v.btn.classList.contains('active'));
  if (activeView?.onShow) activeView.onShow();
  notebookModal.classList.add('open');
});

// --- Accusation ---------------------------------------------------------
const accuseModal = document.getElementById('accuseModal');
const accuseGrid = document.getElementById('accuseGrid');
const accuseConfirmBtn = document.getElementById('accuseConfirmBtn');
const accuseWarningEl = document.getElementById('accuseWarning');
const accuseSubEl = document.getElementById('accuseSub');
const accuseBtn = document.getElementById('accuseBtn');
const evidenceMeterEl = document.getElementById('evidenceMeter');
const evidenceMeterFillEl = document.getElementById('evidenceMeterFill');
const evidenceMeterLabelEl = document.getElementById('evidenceMeterLabel');
let selectedSuspect = null;
let accusePendingConfirm = false;

// Two tries total, right or wrong — not two WRONG tries. Getting it right
// on try 1 ends things anyway; this cap only really bites when both come up
// empty, at which point the case closes for good and the HUD button locks
// out rather than letting the player grind through guesses. Critically, a
// wrong guess that still leaves a try remaining doesn't reveal the solution
// (see accuseConfirmBtn's click handler) — otherwise the second guess would
// just be a formality after already being told the answer.
const MAX_ACCUSATIONS = 2;

function renderAccuseAvailability() {
  const remaining = Math.max(0, MAX_ACCUSATIONS - accusationAttempts);
  if (remaining > 0) {
    accuseSubEl.textContent = `Choose carefully — you have ${remaining} accusation${remaining === 1 ? '' : 's'} left.`;
    accuseBtn.disabled = false;
    accuseBtn.title = '';
  } else {
    accuseSubEl.textContent = `You've used all ${MAX_ACCUSATIONS} of your accusations. The case is closed.`;
    accuseBtn.disabled = true;
    accuseBtn.title = 'No accusations left this investigation';
  }
}
renderAccuseAvailability();
onStateChange(renderAccuseAvailability);

// Below this fraction of evidence actually pointing at the accused person,
// confirming asks once more before committing — a nudge against guessing
// blind, not a hard block. Clicking "Confirm Accusation" again (now
// relabeled) goes through.
const LOW_EVIDENCE_THRESHOLD = 1 / 3;

// What actually supports naming a given suspect: clues exclusive to them
// being this game's killer (requires.killer, gated so they can never
// appear for anyone else), plus any clue that names them via `implicates` —
// deliberately excluding redHerring entries, since those resolve as dead
// ends and shouldn't count toward a case against anyone. This is checked
// per accused suspect rather than as a flat "% of all evidence found"
// count, so a player who found exactly the handful of clues that actually
// implicate their pick isn't nagged the same as someone guessing blind —
// and, just as important, someone who found lots of OTHER suspects'
// evidence but nothing on their actual pick still gets asked to reconsider.
function suspectEvidence(suspectName) {
  return ALL_EVIDENCE.filter((e) => {
    if (e.redHerring) return false;
    const namesThisSuspect = e.implicates &&
      (Array.isArray(e.implicates) ? e.implicates.includes(suspectName) : e.implicates === suspectName);
    return namesThisSuspect || e.requires?.killer === suspectName;
  });
}

// Shows how much of the found evidence backs whichever suspect is currently
// selected — reusing the exact same fraction the low-evidence soft-gate
// warning already computes (suspectEvidence + LOW_EVIDENCE_THRESHOLD), just
// surfaced continuously instead of only after attempting to confirm.
// Deliberately a qualitative bar + label, never a raw count: showing exact
// numbers side-by-side across suspects would itself be a spoiler, since the
// real killer's exclusive evidence pool is always larger than an innocent
// suspect's red-herring-only pool. Only ever describes ONE suspect at a
// time and never states whether that suspect is actually guilty.
// Shared by the meter display and analytics logging, so both agree on what
// "weak/building/strong" means without duplicating the threshold checks.
function evidenceBucketFor(suspectName) {
  const relevant = suspectEvidence(suspectName);
  const relevantFound = relevant.filter((e) => FOUND_EVIDENCE.has(e.id)).length;
  const fraction = relevant.length > 0 ? relevantFound / relevant.length : 0;
  if (relevant.length > 0 && fraction >= 0.75) return 'strong';
  if (relevant.length > 0 && fraction >= LOW_EVIDENCE_THRESHOLD) return 'building';
  return 'weak';
}

function updateEvidenceMeter(suspectName) {
  const relevant = suspectEvidence(suspectName);
  const relevantFound = relevant.filter((e) => FOUND_EVIDENCE.has(e.id)).length;
  const fraction = relevant.length > 0 ? relevantFound / relevant.length : 0;
  const bucket = evidenceBucketFor(suspectName);
  const label = bucket === 'strong' ? 'Strong — the evidence points here clearly.'
    : bucket === 'building' ? 'Building — a real case is forming.'
    : 'Weak — not much evidence points here yet.';
  evidenceMeterFillEl.style.width = `${Math.round(fraction * 100)}%`;
  evidenceMeterFillEl.className = 'evidence-meter-fill' + (bucket !== 'weak' ? ` ${bucket}` : '');
  evidenceMeterLabelEl.textContent = label;
  evidenceMeterEl.style.display = '';
}

function resetAccuseConfirmState() {
  accusePendingConfirm = false;
  accuseConfirmBtn.textContent = 'Confirm Accusation';
  accuseWarningEl.style.display = 'none';
}

CHARACTERS.forEach((c) => {
  const cell = document.createElement('div');
  cell.className = 'accuse-suspect';
  cell.innerHTML = `
    <img ${portraitImgAttrs(c)} alt="${c.name}">
    <span>${c.name}</span>
  `;
  cell.addEventListener('click', () => {
    selectedSuspect = c;
    document.querySelectorAll('.accuse-suspect').forEach((el) => el.classList.remove('selected'));
    cell.classList.add('selected');
    accuseConfirmBtn.disabled = false;
    resetAccuseConfirmState(); // switching suspects should re-ask, not carry over a pending confirm
    updateEvidenceMeter(c.name);
  });
  accuseGrid.appendChild(cell);
});

// Not a real suspect — some games genuinely have no killer (see solutions.js's
// 'No One' scenario). Its `name` doubles as the sentinel SOLUTION.killer
// value, so the existing `selectedSuspect.name === SOLUTION.killer` check
// below needs no special-casing at all — this tile just slots in as if it
// were a tenth person.
const ACCIDENT_SUSPECT = { name: 'No One' };
const accidentCell = document.createElement('div');
accidentCell.className = 'accuse-suspect';
accidentCell.innerHTML = `
  <div class="accuse-icon">?</div>
  <span>It Was an Accident</span>
`;
accidentCell.addEventListener('click', () => {
  selectedSuspect = ACCIDENT_SUSPECT;
  document.querySelectorAll('.accuse-suspect').forEach((el) => el.classList.remove('selected'));
  accidentCell.classList.add('selected');
  accuseConfirmBtn.disabled = false;
  resetAccuseConfirmState();
  updateEvidenceMeter(ACCIDENT_SUSPECT.name);
});
accuseGrid.appendChild(accidentCell);

accuseBtn.addEventListener('click', () => {
  if (accusationAttempts >= MAX_ACCUSATIONS) return; // button is disabled too; this is just a backstop
  playClick();
  resetAccuseConfirmState();
  // Selection carries over between modal opens (pre-existing behavior) —
  // keep the meter in sync with that instead of forcing a reset.
  if (selectedSuspect) updateEvidenceMeter(selectedSuspect.name);
  else evidenceMeterEl.style.display = 'none';
  accuseModal.classList.add('open');
});

const endModal = document.getElementById('endModal');
const endCard = document.getElementById('endCard');
const endTitle = document.getElementById('endTitle');
const endSub = document.getElementById('endSub');
const endExplanation = document.getElementById('endExplanation');
const endKeepBtn = document.getElementById('endKeepBtn');
const endCasebookBtn = document.getElementById('endCasebookBtn');

endCasebookBtn.addEventListener('click', () => {
  playClick();
  endModal.classList.remove('open');
  renderCasebook();
  casebookModal.classList.add('open');
});

// Frames how thorough the investigation actually was, rather than treating
// every correct (or wrong) guess the same regardless of how much evidence
// backed it up.
function describeCaseStrength(count, total, correct) {
  const fraction = total > 0 ? count / total : 0;
  if (correct) {
    if (fraction >= 0.75) return `an airtight case — ${count} of ${total} clues, all pointing the same way`;
    if (fraction >= 0.4) return `a solid case, built on ${count} of ${total} clues`;
    return `honestly, more of a lucky guess than a case — only ${count} of ${total} clues found`;
  }
  if (fraction >= 0.75) return `a thorough investigation that still landed on the wrong name`;
  if (fraction >= 0.4) return `a reasonable case, built on ${count} of ${total} clues — just aimed at the wrong person`;
  return `not much to go on — only ${count} of ${total} clues found before naming a name`;
}

// A short framing line ahead of the full explanation, so a thin-evidence
// guess doesn't read identically to one backed by nearly everything in the
// notebook — describeCaseStrength's note (the numeric tally) still runs
// after the explanation; this is tone, not a repeat of that count.
function epilogueIntro(count, total, correct) {
  const fraction = total > 0 ? count / total : 0;
  if (correct) {
    if (fraction >= 0.75) return "You laid it all out, piece by piece. Here's how it adds up.";
    if (fraction >= 0.4) return "You had enough to be sure. Here's the rest of it.";
    return "You called it right, more on instinct than proof. Here's everything you didn't stay to find.";
  }
  if (fraction >= 0.75) return 'You did the work and still named the wrong person. Here\'s what actually happened.';
  if (fraction >= 0.4) return "You had a real case — just not against the right person. Here's the truth of it.";
  return "You barely scratched the surface before naming a name. Here's what you missed.";
}

accuseConfirmBtn.addEventListener('click', () => {
  if (!selectedSuspect) return;

  const relevant = suspectEvidence(selectedSuspect.name);
  const relevantFound = relevant.filter((e) => FOUND_EVIDENCE.has(e.id)).length;
  const fraction = relevant.length > 0 ? relevantFound / relevant.length : 0;
  if (fraction < LOW_EVIDENCE_THRESHOLD && !accusePendingConfirm) {
    playClick();
    accusePendingConfirm = true;
    accuseWarningEl.textContent = relevant.length > 0
      ? `You've only found ${relevantFound} of ${relevant.length} clues actually pointing to ${selectedSuspect.name}. Accuse anyway?`
      : `Nothing you've found so far points to ${selectedSuspect.name}. Accuse anyway?`;
    accuseWarningEl.style.display = 'block';
    accuseConfirmBtn.textContent = 'Yes, Accuse Anyway';
    return;
  }

  playClick();
  accuseModal.classList.remove('open');

  recordAccusationAttempt();
  const correct = selectedSuspect.name === SOLUTION.killer;
  if (correct) recordSolvedCase(killerIndex, SOLUTION.killer, SOLUTION.method);
  // A win doesn't lock out further accusations (Keep Investigating stays
  // available), so without this guard a stray re-accusation after already
  // winning would log a second outcome event for the same investigation.
  if (!hasCompletedStory(activeStory)) {
    logEvent(correct ? 'correct_accusation' : 'incorrect_accusation', {
      scenarioId: killerIndex, suspect: selectedSuspect.name, evidenceStrength: evidenceBucketFor(selectedSuspect.name)
    });
  }
  const exhausted = !correct && accusationAttempts >= MAX_ACCUSATIONS;
  if (correct || exhausted) logEventOncePerStory('investigation_completed', activeStory, { scenarioId: killerIndex });
  const remaining = Math.max(0, MAX_ACCUSATIONS - accusationAttempts);
  handleNewAchievements(checkAchievements(achievementTotals({ lastAccusationCorrect: correct })));
  correct ? playWinSting() : playLoseSting();
  endCard.className = 'end-card ' + (correct ? 'win' : 'lose');
  endTitle.textContent = correct ? 'Case Closed' : (exhausted ? 'The Case Goes Cold' : 'The Wrong Verdict');
  const remainingNote = (!correct && !exhausted) ? ` You have ${remaining} accusation${remaining === 1 ? '' : 's'} left.` : '';
  if (selectedSuspect.name === 'No One') {
    endSub.textContent = correct
      ? "You concluded it was an accident — and you were right."
      : `You concluded it was an accident. It wasn't.${remainingNote}`;
  } else {
    endSub.textContent = correct
      ? `You named ${selectedSuspect.name} — and you were right.`
      : `You named ${selectedSuspect.name}. It wasn't them.${remainingNote}`;
  }
  const strengthNote = describeCaseStrength(FOUND_EVIDENCE.size, ALL_EVIDENCE.length, correct);
  // A wrong guess only actually reveals the solution once every accusation
  // is spent (or, of course, once it's actually correct) — naming the real
  // killer after just one wrong guess, with a real try still left, would
  // spoil the mystery for nothing.
  const revealSolution = correct || exhausted;
  if (revealSolution) {
    const explanationParas = typeof SOLUTION.explanation === 'function'
      ? SOLUTION.explanation(victoriaStatus)
      : SOLUTION.explanation;
    const introNote = epilogueIntro(FOUND_EVIDENCE.size, ALL_EVIDENCE.length, correct);
    const exhaustedNote = exhausted
      ? `<p class="end-strength-note"><em>${MAX_ACCUSATIONS} accusations, ${MAX_ACCUSATIONS} wrong names. Ravensmoor Hall keeps its secrets now.</em></p>`
      : '';
    endExplanation.innerHTML = `<p class="end-epilogue-intro"><em>${introNote}</em></p>`
      + explanationParas.map((p) => `<p>${p}</p>`).join('')
      + `<p class="end-strength-note"><em>${strengthNote.charAt(0).toUpperCase() + strengthNote.slice(1)}.</em></p>`
      + exhaustedNote;
  } else {
    endExplanation.innerHTML = `<p class="end-epilogue-intro"><em>Wrong — but the case isn't closed yet.</em></p>`
      + `<p class="end-strength-note"><em>${strengthNote.charAt(0).toUpperCase() + strengthNote.slice(1)}.</em></p>`;
  }
  // Once every accusation is spent, there's nothing left to "keep
  // investigating" toward — only starting a fresh case makes sense.
  endKeepBtn.style.display = exhausted ? 'none' : '';
  if (correct) {
    const solvedCount = Object.values(getCasebook().solved).filter((e) => e.pack === CURRENT_PACK).length;
    endCasebookBtn.textContent = `View Casebook (${solvedCount} / ${NUM_KILLER_VARIANTS})`;
    endCasebookBtn.style.display = '';
  } else {
    endCasebookBtn.style.display = 'none';
  }
  // Only on a genuinely concluded investigation (win or exhausted loss —
  // never a non-final wrong guess), and at most once per story: don't
  // interrupt an unresolved case, and don't re-ask after Give Feedback/Maybe
  // Later has already been answered for this one.
  feedbackPromptEl.style.display = (correct || exhausted) && !hasFeedbackResponse(activeStory) ? '' : 'none';
  endModal.classList.add('open');
});

document.getElementById('endKeepBtn').addEventListener('click', () => {
  endModal.classList.remove('open');
});
document.getElementById('endNewBtn').addEventListener('click', () => {
  // Not resetProgress() — the case you just closed is a finished save worth
  // keeping. startRandomStory() only reuses a slot in place if it was never
  // actually played; a completed investigation always gets a fresh one.
  startRandomStory();
  location.reload();
});
