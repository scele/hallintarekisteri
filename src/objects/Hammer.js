class Hammer extends Phaser.Sprite {

  constructor(game) {
    super(game, 0, 0, 'hammer');
    const hitAnim = this.animations.add('hit', [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 5, 4, 3, 2, 1]);
    hitAnim.onComplete.add(() => this.onHitCompleted());
    this.game.stage.addChild(this);
    this.anchor.setTo(0.4, 0.9);
    this.frame = 0;
    this.scale.setTo(0.5, 0.5);
    this._home = {x: this.game.world.right - this.anchor.x * this.width * 1.4, y: this.game.world.bottom};
    this.position.setTo(this._home.x, this._home.y);
    //const avatar = new Phaser.Sprite(this.game, 400, -30, 'hero', 1);
    //avatar.scale.setTo(0.3, 0.3);
    //avatar.anchor.setTo(0.5, 0.5);
    //this.addChild(avatar);
  }

  hit() {
      this.animations.play('hit', 60, false);
  }

  squashBug(bug) {
    this._target = bug;
    if (this._tween) {
      this._tween.stop();
    }
  }

  onHitCompleted() {
    if (!this._target) {
      this._tween = this.game.add.tween(this.position).to(this._home, 0, Phaser.Easing.Linear.InOut, true, 0);
    }
  }

  update() {
    if (this._target) {
        const speed = this.game.time.physicsElapsed * 2000;
        const dir = Phaser.Point.subtract(this._target.position, this.position);
        if (dir.getMagnitudeSq() > speed * speed) {
            dir.setMagnitude(speed);
            this.x += dir.x;
            this.y += dir.y;
        } else {
            this.position = this._target.position.clone();
            this.hit();
            this._target.squash();
            this._target = null;
        }
    }
    super.update();
  }
}

export default Hammer;