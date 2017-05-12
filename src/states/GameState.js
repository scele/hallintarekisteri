import RainbowText from 'objects/RainbowText';
import Hammer from 'objects/Hammer';

class GameState extends Phaser.State {

  create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nFOOBAR!");
    text.anchor.set(0.5);
    let hammer = new Hammer(this.game, center.x, center.y);
  }

}

export default GameState;
