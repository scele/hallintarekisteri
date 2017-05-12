export default class Bug extends Phaser.Sprite {

  constructor(game, x, y, frame, onClick) {
    super(game, x, y, 'bug');
    this.game.stage.addChild(this);
    this.anchor.setTo(0.5, 0.5);
    this.frame = frame;
    this.scale.setTo(0.25, 0.25);
    this.inputEnabled = true;
    this.events.onInputDown.add(() => this.onInputDown());
    this._onClick = onClick;
  }

  update() {
    super.update();
  }

  squash() {
      const tween = this.game.add.tween(this.scale).to({x: 0, y: 0}, 0, Phaser.Easing.Exponential.Out, true, 400);
      tween.onComplete.add(() => this.kill());
  }

  onInputDown() {
      console.log("onInputDown");
      this._onClick(this);
  }
}