import Phaser from 'phaser';
import { currentRoom } from '../state.js';

// Every real background/portrait asset the game might use. A file that
// doesn't exist yet simply fails to load — tracked in failedKeys below —
// and RoomScene falls back to a labeled placeholder instead of crashing.
const ROOM_BACKGROUNDS = {
  'bg-study': 'study.png',
  'bg-library': 'library.png',
  'bg-bedroom': 'bedroom.png',
  'bg-kitchen': 'kitchen.png',
  'bg-grounds': 'grounds.png',
  'bg-greenhouse': 'greenhouse.png',
  'bg-juliansroom': 'juliansroom.png',
  'bg-study-body': 'body.png',
  'bg-westparlor': 'westparlor.png',
  'bg-drwrenroom': 'drwrenroom.png',
  'bg-diningroom': 'diningroom.png'
};

const PORTRAITS = {
  'portrait-victoria': 'victoria.png',
  'portrait-marcus': 'marcus.png',
  'portrait-diana': 'diana.png',
  'portrait-priya': 'priya.png',
  'portrait-nathaniel': 'nathaniel.png',
  'portrait-harriet': 'harriet.png',
  'portrait-julian': 'julian.png',
  'portrait-eleanor': 'eleanor.png',
  'portrait-edmund': 'edmund.png',
  'portrait-vivienne': 'vivienne.png',
  'portrait-drwren': 'drwren.png',
  'portrait-groundskeeper': 'groundskeeper.png'
};

export default class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload() {
    this.load.spritesheet('characters', 'assets/characters.png', {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 1
    });

    this.failedKeys = new Set();
    this.load.on('loaderror', (file) => this.failedKeys.add(file.key));

    Object.entries(ROOM_BACKGROUNDS).forEach(([key, file]) => {
      this.load.image(key, 'assets/ai-art/' + file);
    });
    Object.entries(PORTRAITS).forEach(([key, file]) => {
      this.load.image(key, 'assets/ai-art/' + file);
    });
  }

  create() {
    this.scene.start('Room', {
      room: currentRoom || 'study',
      failedKeys: this.failedKeys
    });
  }
}
