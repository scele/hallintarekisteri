import GameState from 'states/GameState';

class Game extends Phaser.Game {

  constructor() {
    super(1280, 720, Phaser.AUTO, 'content', null);
      this.state.add('GameState', GameState, false);
      this.state.start('GameState');
      this.input.addMoveCallback((pointer, x, y) => {
        // pointer is the active pointer, x and y give you the position of the pointer
        // on the canvas so here you can position you custom cursor sprite

      });
    }
}

new Game();
