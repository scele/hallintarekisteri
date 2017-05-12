import Hammer from 'objects/Hammer';
import Bug from 'objects/Bug';

const STAGE_DURATION = 10;

class GameState extends Phaser.State {

  create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    this.game.add.sprite(0, -100, 'bg', 0);
    this.hammer = new Hammer(this.game, center.x, center.y);
    this.bugs = this.game.add.group();
    //let bug0 = new Bug(this.game, center.x, center.y, 0, (bug) => this.bugClicked(bug));
    //let bug1 = new Bug(this.game, center.x/2, center.y, 2, (bug) => this.bugClicked(bug));
    this.stageDuration = 0;
    this.spawnScale = 5;
    this.scheduleNextSpawn();
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

  spawnBug() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    const character = this.game.rnd.between(0, 5);
    const x = this.game.rnd.between(100, this.game.world.width-200);
    const y = this.game.rnd.between(this.game.world.height * 0.4, this.game.world.height - 100);
    this.bugs.add(new Bug(this.game, x, y, character, (bug) => this.bugClicked(bug)));
    if (this.bugs.countLiving() < 20) {
      this.scheduleNextSpawn(); 
    }
  }

}

export default GameState;
