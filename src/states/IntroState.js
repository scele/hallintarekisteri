export default class IntroState extends Phaser.State {

  create() {
    const style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
    const text1 = this.game.add.text(0, 0, 'Tehtävänäsi on torpata hallintarekisteriä ajavien poliitikkojen aikeet.', style);
    const text2 = this.game.add.text(0, 0, 'Oletko valmis?', style);
    text1.setTextBounds(0, this.game.height/2 - 100, this.game.width, 100);
    text2.setTextBounds(0, this.game.height/2 +   0, this.game.width, 100);
    this.game.time.events.add(Phaser.Timer.SECOND * 4, () => this.startGame());
    text1.alpha = 0;
    text2.alpha = 0;
    this.game.add.tween(text1).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0);
    this.game.add.tween(text2).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 2000);
  }

  startGame() {
    this.game.state.start('GameState');
  }

  update() {
  }
}