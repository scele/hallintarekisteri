import Button from 'objects/Button';

export default class IntroState extends Phaser.State {

  create() {
    const style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
    const text1 = this.game.add.text(0, 0, 'Tehtävänäsi on torpata hallintarekisteriä ajavien poliitikkojen aikeet.', style);
    text1.setTextBounds(0, this.game.height/2 - 100, this.game.width, 100);
    const btn = new Button(this.game, this.game.width / 2 - 130, this.game.height / 2 + 200, 260, 60, "Aloita peli", () => this.startGame());
    this.game.add.existing(btn);
    text1.alpha = 0;
    btn.alpha = 0;
    this.game.add.tween(text1).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
    this.game.add.tween(btn).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 2000);
  }

  startGame() {
    this.game.state.start('GameState');
  }

  update() {
  }
}