export default class Bug extends Phaser.Sprite {

  constructor(game, x, y, frame, onClick, onDefeat) {
    super(game, x, y, 'bug');
    this.game.stage.addChild(this);
    this.anchor.setTo(0.5, 0.5);
    this.frame = frame;
    this.scale.setTo(0.25, 0.25);
    this.inputEnabled = true;
    this.events.onInputDown.add(() => this.onInputDown());
    this._onClick = onClick;
    this._onDefeat = onDefeat;
    this.age = 0;
    this._frozen = false;
  }

  freeze() {
      this._frozen = true;
  }

  update() {
    if (!this._frozen) {
      this.age += this.game.time.physicsElapsed;
      if (this.age >= 4) {
        const center = { x: this.game.world.centerX, y: this.game.world.centerY }
        this.game.add.tween(this.scale).to({x: 1, y: 1}, 0, Phaser.Easing.Exponential.Out, true, 0);
        this.game.add.tween(this.position).to(center, 0, Phaser.Easing.Exponential.Out, true, 0);
        this._onDefeat(this);
      } else if (this.age >= 3) {
        this.angle = 3 * Math.cos(this.game.time.time / 15);
      }
    }
    super.update();
  }

  squash() {
      if (!this._frozen) {
        this.freeze();
        const tween = this.game.add.tween(this.scale).to({x: 0, y: 0}, 0, Phaser.Easing.Exponential.Out, true, 400);
        tween.onComplete.add(() => this.destroy());
      }
  }

  onInputDown() {
    if (!this._frozen) {
      this._onClick(this);
    }
  }
}