class Hammer extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'hammer');
    this.animations.add('hit', [0, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1], 20, true);
    this.game.stage.addChild(this);
    //this.animations.play('hit', 15, true);
    //this.animations.stop();
    this.anchor.setTo(0.4, 0.8);
    this.frame = 0;
    this.scale.setTo(0.3, 0.3);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this._target = this.position.clone();
  }

  hit() {
      this.animations.play('hit', 30, false);
  }

  update() {
    if (this.game.input.activePointer.justPressed()) {
        this._target = this.game.input.activePointer.position.clone();
        this._moving = true;
    }

    const speed = this.game.time.physicsElapsed * 1000;
    const dir = Phaser.Point.subtract(this._target, this.position);
    if (dir.getMagnitudeSq() > speed * speed) {
        dir.setMagnitude(speed);
    } else if (this._moving) {
        this.hit();
        this._moving = false;
    }

    this.x += dir.x;
    this.y += dir.y;
    super.update();
  }
}

export default Hammer;