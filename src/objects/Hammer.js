class Hammer extends Phaser.Sprite {

  constructor(game, x, y) {
    super(game, x, y, 'hammer');
    this.animations.add('hit', [0, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 5, 4, 3, 2, 1]);
    this.game.stage.addChild(this);
    this.anchor.setTo(0.4, 0.9);
    this.frame = 0;
    this.scale.setTo(0.5, 0.5);
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