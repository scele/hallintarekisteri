class Hammer extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'hammer');
    this.animations.add('hit', [0, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1]);
    this.game.stage.addChild(this);
    this.anchor.setTo(0.4, 0.8);
    this.frame = 0;
    this.scale.setTo(0.5, 0.5);
  }

  hit() {
      this.animations.play('hit', 30, false);
  }

  squashBug(bug) {
    this._target = bug;
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