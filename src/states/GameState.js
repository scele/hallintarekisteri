import Hammer from 'objects/Hammer';
import Bug from 'objects/Bug';

const STAGE_DURATION = 10;

class GameState extends Phaser.State {

  create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    this.game.add.sprite(0, -100, 'bg', 0);
    this.hammer = new Hammer(this.game, center.x, center.y);
    this.bugs = this.game.add.group();
    this.stageDuration = 0;
    this.spawnScale = 5;
    this.gameOver = false;
    this.spawnBug();
    //this.scheduleNextSpawn();
  }

  bugClicked(bug) {
    this.hammer.squashBug(bug);
  }

  scheduleNextSpawn() {
    const scale = this.game.rnd.frac() * this.spawnScale;
    console.log("Next bug will appear in " + scale + " seconds.");
    this.game.time.events.add(Phaser.Timer.SECOND * scale, () => this.spawnBug());
  }

  update() {
    this.stageDuration += this.game.time.physicsElapsed;
    if (this.stageDuration > STAGE_DURATION) {
      this.stageDuration = 0;
      this.spawnScale = this.spawnScale * 0.7;
    }
  }

  onDefeat(bug) {
    while (this.bugs.getTop() != bug) {
      this.bugs.moveUp(bug);
    }
    this.bugs.forEach((b) => b.freeze());
    this.gameOver = true;
    this.hammer.kill();
  }

  spawnBug() {
    if (!this.gameOver) {
      let center = { x: this.game.world.centerX, y: this.game.world.centerY }
      const character = this.game.rnd.between(0, 5);
      const x = this.game.rnd.between(100, this.game.world.width-200);
      const y = this.game.rnd.between(this.game.world.height * 0.4, this.game.world.height - 100);
      this.bugs.add(new Bug(this.game, x, y, character, (bug) => this.bugClicked(bug), (bug) => this.onDefeat(bug)));
      if (this.bugs.countLiving() < 20) {
        this.scheduleNextSpawn(); 
      }
    }
  }

}

export default GameState;
