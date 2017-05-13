export default class Bug extends Phaser.Sprite {

  constructor(game, x, y, frame, onClick, onDefeat) {
    const initialPos = { x: game.world.centerX, y: game.world.centerY * 1.2 };
    const initialScale = { x: 0.1, y: 0.1 };
    super(game, initialPos.x, initialPos.y, 'bug');
    //this.game.stage.addChild(this);
    this.anchor.setTo(0.5, 1);
    this.frame = frame;
    this.scale = initialScale;
    this.inputEnabled = true;
    this.events.onInputDown.add(() => this.onInputDown());
    const targetScale = 0.3 * y / this.game.world.height;

    const tween = this.game.add.tween(this.position).to({x: x,    y: y   }, 0, Phaser.Easing.Linear.Out, true, 0);
                  this.game.add.tween(this.scale)   .to({x: targetScale, y: targetScale}, 0, Phaser.Easing.Linear.Out, true, 0);
    tween.onComplete.add(() => { this._walking = false; });

    this._onClick = onClick;
    this._onDefeat = onDefeat;
    this._age = 0;
    this._frozen = false;
    this._walking = true;
  }

  freeze() {
      this._frozen = true;
  }

  update() {
    if (!this._frozen) {
      this._age += this.game.time.physicsElapsed;
      if (this._age >= 3) {
        const center = { x: this.game.world.centerX, y: this.game.world.centerY + this.height / this.scale.x / 2 };
        this.game.add.tween(this.scale).to({x: 1, y: 1}, 0, Phaser.Easing.Exponential.Out, true, 0);
        this.game.add.tween(this.position).to(center, 0, Phaser.Easing.Exponential.Out, true, 0);
        this._onDefeat(this);
      } else if (this._age >= 2) {
        this.angle = 3 * Math.cos(this.game.time.time / 15);
      } else if (this._walking) {
        this.angle = 5 * Math.cos(this.game.time.time / 30);
      } else {
        this.angle = 0;
      }
    }
    super.update();
  }

  squash() {
      if (!this._frozen) {
        this.freeze();
        const tween = this.game.add.tween(this.scale).to({y: 0}, 200, Phaser.Easing.Quadratic.Out, true, 100);
                      //this.game.add.tween(this.position).to({y: this.y + this.height/2}, 0, Phaser.Easing.Exponential.Out, true, 200);
        tween.onComplete.add(() => this.destroy());
      }
  }

  onInputDown() {
    if (!this._frozen) {
      this._onClick(this);
    }
  }
}