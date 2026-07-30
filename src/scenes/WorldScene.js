import Phaser from 'phaser';
import manorMap from '../data/manorMap.json';

const TILE = 16;

// Character spritesheet frame indices (12 cols x 11 rows, tiny-dungeon character row)
const CHAR_FRAMES = {
  player: 98,     // plain robed figure -> the detective
  victoria: 111,  // dress silhouette
  harriet: 99,    // elder figure
  marcus: 110,    // fighter silhouette
  nathaniel: 96   // robed/hatted figure
};

// Evidence hotspots, positioned in cropped tile coordinates (0,0 = top-left of manorMap)
const EVIDENCE = [
  { id: 'E-20', x: 2, y: 2, name: 'A hollowed-out book', note: 'Tucked inside: a scrap of paper with a four-digit code, and a reference to a hymn number.' },
  { id: 'W-01', x: 19, y: 3, name: 'A cold kitchen cupboard', note: 'The butler swears he heard raised voices coming from the study around 10:50 PM.' },
  { id: 'E-10', x: 12, y: 7, name: 'Scorched paper in the hearth', note: 'Someone burned a page of handwritten notes here. The initials "K-V" are still legible.' }
];

// The hearth sits roughly here, in cropped tile coordinates
const HEARTH = { x: 12, y: 7 };

export default class WorldScene extends Phaser.Scene {
  constructor() { super('World'); }

  create() {
    const w = manorMap.width, h = manorMap.height;

    const map = this.make.tilemap({ tileWidth: TILE, tileHeight: TILE, width: w, height: h });
    const tileset = map.addTilesetImage('tiles', 'tiles', TILE, TILE, 0, 1);

    this.tileLayers = [];
    ['Floor', 'Carpet', 'Objects', 'Details'].forEach((name, i) => {
      const layer = map.createBlankLayer(name, tileset, 0, 0, w, h);
      const grid = manorMap[name];
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const gid = grid[y][x];
          if (gid > 0) layer.putTileAt(gid - 1, x, y);
        }
      }
      layer.setDepth(i);
      this.tileLayers.push(layer);
    });

    const worldW = w * TILE, worldH = h * TILE;
    this.physics.world.setBounds(0, 0, worldW, worldH);
    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.setZoom(3.4);
    this.cameras.main.setRoundPixels(true);

    // player
    this.player = this.physics.add.sprite(6 * TILE + 8, 4 * TILE + 8, 'characters', CHAR_FRAMES.player);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(11, 10).setOffset(2.5, 5);
    this.player.setDepth(10);

    this.cameras.main.startFollow(this.player, true, 0.15, 0.15);

    // NPCs
    this.npcs = [];
    this.addNPC(3, 2, CHAR_FRAMES.victoria, 0xe6a9d9, 'Victoria Thorne', "\"I said goodnight to Edmund after dinner and went straight up. I had a wretched headache.\"");
    this.addNPC(18, 2, CHAR_FRAMES.harriet, 0xf2d9a0, 'Harriet Voss', '"I read until I fell asleep. This family, honestly — always something."');

    // soft radial-gradient dot texture, used for anything that should glow/bloom
    // (Phaser's Bloom postFX silently no-ops on Circle/Arc shape objects, so glowing
    // things must be Image game objects using this generated texture instead)
    if (!this.textures.exists('glowDot')) {
      const size = 32;
      const glowCanvas = this.textures.createCanvas('glowDot', size, size);
      const gctx = glowCanvas.getContext();
      const grad = gctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.6)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, size, size);
      glowCanvas.refresh();
    }

    // evidence markers (visual only, positions match EVIDENCE array)
    this.evidenceMarkers = EVIDENCE.map(ev => {
      const mx = ev.x * TILE + 8, my = ev.y * TILE + 8;
      const marker = this.add.image(mx, my, 'glowDot');
      marker.setTint(0xe8b84b);
      marker.setScale(0.32);
      marker.setAlpha(0.95);
      marker.setDepth(9);
      this.tweens.add({ targets: marker, scale: { from: 0.32, to: 0.44 }, alpha: { from: 0.95, to: 0.55 }, duration: 900, yoyo: true, repeat: -1 });
      return { ev, marker, x: mx, y: my };
    });

    this.found = new Set();
    this.worldW = worldW;
    this.worldH = worldH;

    // ---------- graphics: dynamic lighting ----------
    this.setupLighting();

    // ---------- graphics: weather (rain, embers, dust) ----------
    this.setupRain();
    this.setupEmbers();
    this.setupDust();

    // ---------- graphics: bloom on glowing things ----------
    this.setupBloom();

    // ---------- graphics: post-processing ----------
    this.setupPostFX();

    // ---------- graphics: lightning scheduler ----------
    this.scheduleLightning();

    // ---------- graphics: idle breathing tween for NPCs ----------
    this.npcs.forEach((npc, i) => {
      this.tweens.add({
        targets: npc, scaleY: { from: 1, to: 1.05 }, duration: 1400 + i * 220,
        yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
      });
    });

    // camera intro fade
    this.cameras.main.fadeIn(700, 5, 5, 8);

    // input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    this.input.keyboard.on('keydown-SPACE', () => this.tryInteract());

    this.nearestEvidence = null;
    this.nearestNPC = null;
    this._walkTimer = 0;
    this._squash = false;

    // DOM refs
    this.promptEl = document.getElementById('prompt');
    this.dialogEl = document.getElementById('dialog');
    this.dialogTitleEl = document.getElementById('dialog-title');
    this.dialogBodyEl = document.getElementById('dialog-body');
    this.dialogPortraitEl = document.getElementById('dialog-portrait');
    this.dialogEl.addEventListener('click', () => this.closeDialog());

    // ---------- graphics: minimap ----------
    this.setupMinimap();
  }

  setupLighting() {
    this.lights.enable();
    this.lights.setAmbientColor(0x2c2a3a);

    // every tile layer and character must opt into the Light2D pipeline to be affected by lights
    this.tileLayers.forEach(l => l.setPipeline('Light2D'));
    this.player.setPipeline('Light2D');
    this.npcs.forEach(n => n.setPipeline('Light2D'));

    // warm light fixed at the hearth
    this.hearthLight = this.lights.addLight(
      HEARTH.x * TILE + 8, HEARTH.y * TILE + 8, 130, 0xffab5e, 2.4
    );

    // a soft light near each NPC (like a reading lamp) and one that follows the player like a lantern
    this.playerLight = this.lights.addLight(this.player.x, this.player.y, 85, 0xfff0cf, 1.4);
  }

  setupRain() {
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0xbfd7ea, 1);
    g.fillRect(0, 0, 1, 7);
    g.generateTexture('raindrop', 1, 7);
    g.destroy();

    const cam = this.cameras.main;
    this.rain = this.add.particles(0, 0, 'raindrop', {
      x: { min: 0, max: cam.width },
      y: -8,
      lifespan: 750,
      speedY: { min: 300, max: 380 },
      speedX: { min: -30, max: -10 },
      scaleX: { min: 0.8, max: 1.4 },
      scaleY: { min: 0.8, max: 1.6 },
      quantity: 2,
      frequency: 18,
      alpha: { start: 0.45, end: 0.08 }
    });
    this.rain.setScrollFactor(0);
    this.rain.setDepth(50);
  }

  setupPostFX() {
    const cam = this.cameras.main;
    if (cam.postFX) {
      cam.postFX.addVignette(0.5, 0.5, 0.78, 0.35);
      const cm = cam.postFX.addColorMatrix();
      cm.night(0.12);
    }
  }

  setupEmbers() {
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(1, 1, 1);
    g.generateTexture('ember', 3, 3);
    g.destroy();

    this.embers = this.add.particles(HEARTH.x * TILE + 8, HEARTH.y * TILE + 4, 'ember', {
      speedY: { min: -34, max: -62 },
      speedX: { min: -8, max: 8 },
      lifespan: 950,
      scale: { start: 1.3, end: 0.2 },
      alpha: { start: 0.9, end: 0 },
      frequency: 240,
      tint: [0xffb066, 0xff7a3d, 0xffe08a]
    });
    this.embers.setDepth(9);
  }

  setupDust() {
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0xfff2cc, 1);
    g.fillCircle(1, 1, 1);
    g.generateTexture('dust', 2, 2);
    g.destroy();

    this.dust = this.add.particles(0, 0, 'dust', {
      x: { min: 0, max: this.worldW }, y: { min: 0, max: this.worldH },
      lifespan: 6000,
      speedX: { min: -4, max: 4 }, speedY: { min: -4, max: 4 },
      alpha: { start: 0.22, end: 0 },
      scale: { min: 0.6, max: 1.2 },
      frequency: 260,
      quantity: 1
    });
    this.dust.setDepth(8);
  }

  setupBloom() {
    this.hearthGlow = this.add.image(HEARTH.x * TILE + 8, HEARTH.y * TILE + 6, 'glowDot');
    this.hearthGlow.setTint(0xffb066);
    this.hearthGlow.setScale(0.55);
    this.hearthGlow.setAlpha(0.55);
    this.hearthGlow.setBlendMode(Phaser.BlendModes.ADD);
    this.hearthGlow.setDepth(8);
    this.tweens.add({ targets: this.hearthGlow, scale: { from: 0.5, to: 0.72 }, alpha: { from: 0.4, to: 0.65 }, duration: 650, yoyo: true, repeat: -1 });
    if (this.hearthGlow.postFX) this.hearthGlow.postFX.addBloom(0xffb066, 1, 1, 1.1, 1.3);

    this.evidenceMarkers.forEach(m => {
      if (m.marker.postFX) m.marker.postFX.addBloom(0xffe9a8, 1, 1, 1, 0.7);
    });
  }

  setupMinimap() {
    this.mmEl = document.getElementById('minimap');
    this.mmDot = document.getElementById('minimap-dot');
    const hearthEl = document.getElementById('mm-hearth');
    hearthEl.style.left = (HEARTH.x * TILE / this.worldW * 100) + '%';
    hearthEl.style.top = (HEARTH.y * TILE / this.worldH * 100) + '%';

    this.npcs.forEach(npc => {
      const dot = document.createElement('div');
      dot.className = 'mm-npc';
      dot.style.left = (npc.x / this.worldW * 100) + '%';
      dot.style.top = (npc.y / this.worldH * 100) + '%';
      this.mmEl.appendChild(dot);
    });
  }

  getPortraitDataURL(frame, tintHex) {
    this._portraitCache = this._portraitCache || {};
    const cacheKey = frame + ':' + tintHex;
    if (this._portraitCache[cacheKey]) return this._portraitCache[cacheKey];

    const img = this.textures.get('characters').getSourceImage();
    const cols = 12, stride = 17, size = 16, scale = 6;
    const col = frame % cols, row = Math.floor(frame / cols);
    const sx = col * stride, sy = row * stride;

    const canvas = document.createElement('canvas');
    canvas.width = size * scale;
    canvas.height = size * scale;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, sx, sy, size, size, 0, 0, size * scale, size * scale);

    if (tintHex !== undefined && tintHex !== null) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = '#' + tintHex.toString(16).padStart(6, '0');
      ctx.globalAlpha = 0.4;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }

    const dataUrl = canvas.toDataURL();
    this._portraitCache[cacheKey] = dataUrl;
    return dataUrl;
  }

  punchZoom() {
    const cam = this.cameras.main;
    const baseZoom = 3.4;
    this.tweens.add({
      targets: cam, zoom: 4.1, duration: 190, yoyo: true, ease: 'Sine.easeInOut',
      onComplete: () => { cam.zoom = baseZoom; }
    });
  }

  scheduleLightning() {
    const delay = Phaser.Math.Between(9000, 17000);
    this.time.delayedCall(delay, () => {
      this.triggerLightning();
      this.scheduleLightning();
    });
  }

  triggerLightning() {
    this.cameras.main.flash(180, 235, 240, 255, false);
    this.cameras.main.shake(220, 0.0035);
    if (this.hearthLight) {
      const original = this.hearthLight.intensity;
      this.tweens.add({
        targets: this.hearthLight, intensity: 0.4, duration: 70, yoyo: true,
        onComplete: () => { this.hearthLight.intensity = original; }
      });
    }
    const prevAmbient = 0x2c2a3a;
    this.lights.setAmbientColor(0x9aa3c2);
    this.time.delayedCall(140, () => this.lights.setAmbientColor(prevAmbient));
  }

  addNPC(tx, ty, frame, tint, name, line) {
    const npc = this.physics.add.sprite(tx * TILE + 8, ty * TILE + 8, 'characters', frame);
    npc.setTint(tint);
    npc.setImmovable(true);
    npc.setDepth(10);
    npc.npcName = name;
    npc.npcLine = line;
    npc.npcFrame = frame;
    npc.npcTint = tint;
    this.npcs.push(npc);
    this.physics.add.collider(this.player, npc);
    return npc;
  }

  tryInteract() {
    if (this.dialogEl.style.display === 'block') { this.closeDialog(); return; }
    if (this.nearestEvidence) {
      this.found.add(this.nearestEvidence.ev.id);
      this.showDialog(this.nearestEvidence.ev.name, this.nearestEvidence.ev.note, null);
      this.nearestEvidence.marker.setTint(0x8fb49a);
      this.nearestEvidence.marker.setAlpha(0.9);
      this.punchZoom();
      return;
    }
    if (this.nearestNPC) {
      const portrait = this.getPortraitDataURL(this.nearestNPC.npcFrame, this.nearestNPC.npcTint);
      this.showDialog(this.nearestNPC.npcName, this.nearestNPC.npcLine, portrait);
    }
  }

  showDialog(title, body, portraitUrl) {
    this.dialogTitleEl.textContent = title;
    this.dialogBodyEl.innerHTML = '<span class="cursor"></span>';
    this.dialogEl.style.display = 'block';
    this.promptEl.style.display = 'none';

    if (portraitUrl) {
      this.dialogPortraitEl.src = portraitUrl;
      this.dialogPortraitEl.style.display = 'block';
    } else {
      this.dialogPortraitEl.style.display = 'none';
    }

    clearInterval(this._typeInterval);
    let i = 0;
    this._typeInterval = setInterval(() => {
      i++;
      this.dialogBodyEl.textContent = body.slice(0, i);
      if (i >= body.length) clearInterval(this._typeInterval);
    }, 16);
  }
  closeDialog() {
    clearInterval(this._typeInterval);
    this.dialogEl.style.display = 'none';
  }

  update(_time, delta) {
    if (this.playerLight) {
      this.playerLight.x = this.player.x;
      this.playerLight.y = this.player.y;
    }
    if (this.mmDot) {
      this.mmDot.style.left = (this.player.x / this.worldW * 100) + '%';
      this.mmDot.style.top = (this.player.y / this.worldH * 100) + '%';
    }

    if (this.dialogEl.style.display === 'block') {
      this.player.setVelocity(0, 0);
      this.player.setScale(1, 1);
      return;
    }

    const speed = 92;
    let vx = 0, vy = 0;
    if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -speed;
    else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = speed;
    if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -speed;
    else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = speed;
    if (vx !== 0 && vy !== 0) { vx *= 0.7071; vy *= 0.7071; }
    this.player.setVelocity(vx, vy);
    if (vx < 0) this.player.setFlipX(true);
    else if (vx > 0) this.player.setFlipX(false);

    // simple squash-stretch "waddle" while moving, snaps back to normal when idle
    const isMoving = vx !== 0 || vy !== 0;
    if (isMoving) {
      this._walkTimer += delta;
      if (this._walkTimer > 200) {
        this._walkTimer = 0;
        this._squash = !this._squash;
        this.player.setScale(this._squash ? 1.08 : 0.94, this._squash ? 0.94 : 1.08);
      }
    } else {
      this._walkTimer = 0;
      this.player.setScale(1, 1);
    }

    this.nearestEvidence = null;
    for (const m of this.evidenceMarkers) {
      if (this.found.has(m.ev.id)) continue;
      if (Phaser.Math.Distance.Between(this.player.x, this.player.y, m.x, m.y) < 18) {
        this.nearestEvidence = m;
        break;
      }
    }
    this.nearestNPC = null;
    if (!this.nearestEvidence) {
      for (const npc of this.npcs) {
        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y) < 24) {
          this.nearestNPC = npc;
          break;
        }
      }
    }

    if (this.nearestEvidence) {
      this.promptEl.textContent = 'Space to examine: ' + this.nearestEvidence.ev.name;
      this.promptEl.style.display = 'block';
    } else if (this.nearestNPC) {
      this.promptEl.textContent = 'Space to talk to ' + this.nearestNPC.npcName;
      this.promptEl.style.display = 'block';
    } else {
      this.promptEl.style.display = 'none';
    }
  }
}
