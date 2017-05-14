export default class Bug extends Phaser.Sprite {

  constructor(game, x, y, frame, events) {
    const initialPos = { x: game.world.centerX, y: game.world.centerY * 1.2 };
    const initialScale = { x: 0.1, y: 0.1 };
    super(game, initialPos.x, initialPos.y, 'bug');
    this.anchor.setTo(0.5, 1);
    this.frame = frame;
    this.scale = initialScale;
    this.inputEnabled = true;
    this.events.onInputDown.add(() => this.onInputDown());
    this.events.onInputOver.add(() => { if (!this._frozen) this.game.canvas.style.cursor = "pointer"; });
    this.events.onInputOut.add(() => { this.game.canvas.style.cursor = "default"; });

    const targetScale = 0.6 * y / this.game.world.height;

    const tween = this.game.add.tween(this.position).to({x: x,    y: y   }, 0, Phaser.Easing.Linear.InOut, true, 0);
                  this.game.add.tween(this.scale)   .to({x: targetScale, y: targetScale}, 0, Phaser.Easing.Linear.InOut, true, 0);
    tween.onComplete.add(() => { this._walking = false; });

    this._squash = this.game.add.audio('squash');
    this._squash.volume = 0.3;
    this._events = events;
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
        const targetScale = 1.7;
        const targetHeight = this.height / (this.scale.x / targetScale);
        const center = { x: this.game.world.centerX, y: this.game.world.centerY + targetHeight / 2 };
        this.game.add.tween(this.scale).to({x: targetScale, y: targetScale}, 0, Phaser.Easing.Exponential.Out, true, 0);
        this.game.add.tween(this.position).to(center, 0, Phaser.Easing.Exponential.Out, true, 0);
        this._events.onDefeat(this);
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
        tween.onComplete.add(() => this.destroy());
        this._squash.play();
        this._events.onSquash(this);
      }
  }

  onInputDown() {
    if (!this._frozen) {
      this._events.onClick(this);
    }
  }
}