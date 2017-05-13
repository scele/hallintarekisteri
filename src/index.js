import GameState from 'states/GameState';

class Game extends Phaser.Game {

  constructor() {
    console.log("Constructor");
    super(1280, 720, Phaser.CANVAS, 'content', {
      create: () => { console.log("Create!"); this.create2(); },
      preload: () => { console.log("Preload1"); this.preload(); },
    });
    this.state.add('GameState', GameState, false);
  }

  create2() {
    console.log("Create...");
    this.state.start('GameState');
  }

  preload() {
    console.log("Preload...");
    this.load.spritesheet('hammer', 'graphics/hammer.ss.png', 742, 641);
    this.load.spritesheet('bug', 'graphics/bug_squash.ss.png', 774, 922);
    this.load.spritesheet('hero', 'graphics/hero_squash.ss.png', 578, 575);
    this.load.image('bg', 'graphics/bg2.jpg');

    this.load.audio('clock', 'sounds/clock.mp3');
    this.load.audio('squash', 'sounds/squash.mp3');
    this.load.audio('gameover', 'sounds/gameover.mp3');
    this.load.audio('talk0', 'sounds/kauppi.mp3');
    this.load.audio('talk1', 'sounds/stubb1.mp3');
    this.load.audio('talk2', 'sounds/stubb2.mp3');
    this.load.audio('talk3', 'sounds/jaskari.mp3');
    this.load.audio('talk4', 'sounds/orpo.mp3');
    this.load.audio('talk5', 'sounds/hetemaki.mp3');
  }
}

new Game();
