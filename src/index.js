import GameState from 'states/GameState';

class Game extends Phaser.Game {

  constructor() {
    console.log("Constructor");
    super(1280, 720, Phaser.CANVAS, 'content', {
      create: () => { console.log("Create!"); this.create2(); },
      preload: () => { console.log("Preload1"); this.preload(); },
    });
    this.state.add('GameState', GameState, false);
    //this.state.start('GameState');
    //this.input.addMoveCallback((pointer, x, y) => {
      // pointer is the active pointer, x and y give you the position of the pointer
      // on the canvas so here you can position you custom cursor sprite

    //});
  }

  create2() {
    console.log("Create...");
    this.state.start('GameState');
  }

  preload() {
    console.log("Preload...");
    this.load.spritesheet('hammer', 'graphics/hammer.ss.png', 742, 600);
    this.load.spritesheet('bug', 'graphics/bug_squash.ss.png', 774, 922);
    this.load.spritesheet('hero', 'graphics/hero_squash.ss.png', 578, 575);
    this.load.image('bg', 'graphics/bg2.jpg');
  }
}

new Game();
