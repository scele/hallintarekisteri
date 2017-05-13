import Hammer from 'objects/Hammer';
import Bug from 'objects/Bug';

const STAGE_DURATION = 5;

const BUGS = [
  { index: 0, name: 'Juha', party: 'Keskusta' },
  { index: 1, name: 'Anne', party: 'Keskusta' },
  { index: 2, name: 'Juha', party: 'Keskusta' },
  { index: 3, name: 'Sampo', party: 'Perussuomalaiset' },
  { index: 4, name: 'Kaj', party: 'Perussuomalaiset' },
  { index: 5, name: 'Alex', party: 'Kokoomus' },
  { index: 6, name: 'Juhana', party: 'Kokoomus' },
  { index: 7, name: 'Alex', party: 'Kokoomus' },
  { index: 8, name: 'Harri', party: 'Kokoomus' },
  { index: 10, name: 'Petteri', party: 'Kokoomus' },
];

class GameState extends Phaser.State {

  create() {
    this.game.add.sprite(0, -100, 'bg', 0);
    this.hammer = new Hammer(this.game);
    this.bugs = this.game.add.group();
    this.stageDuration = 0;
    this.spawnScale = 5;
    this.gameOver = false;

    this.tick = this.game.add.audio('clock');
    this.tick.loopFull(1);
    this.gameOverSound = this.game.add.audio('gameover');

    this.talkClips = [];
    for (let i = 0; i < 4; i++) {
      const sound = this.game.add.audio('talk' + i);
      sound.loopFull(0);
      this.talkClips.push(sound);
    }

    //this.spawnBug();
    this.scheduleNextSpawn();
  }

  bugClicked(bug) {
    this.hammer.squashBug(bug);
  }

  scheduleNextSpawn() {
    const scale = (1 + this.game.rnd.frac()) * this.spawnScale;
    console.log("Next bug will appear in " + scale + " seconds.");
    this.game.time.events.add(Phaser.Timer.SECOND * scale, () => this.spawnBug());
  }

  update() {
    this.stageDuration += this.game.time.physicsElapsed;
    if (this.stageDuration > STAGE_DURATION) {
      this.stageDuration = 0;
      this.spawnScale = this.spawnScale * 0.5;
    }
    this.bugs.sort('y');

    if (this.bugs.countLiving() == 0) {
      this.talkClips.forEach((s) => { s.volume = 0; });
      this.tick.volume = 1;
    }
  }

  onDefeat(bug) {
    while (this.bugs.getTop() != bug) {
      this.bugs.moveUp(bug);
    }
    this.bugs.forEach((b) => b.freeze());
    this.gameOver = true;
    this.talkClips.forEach((s) => { s.volume = 0; });
    this.gameOverSound.play();
    this.hammer.kill();
  }

  spawnBug() {
    if (!this.gameOver) {
      let center = { x: this.game.world.centerX, y: this.game.world.centerY }
      const availableBugs = BUGS.filter(x => !this.bugs.children.find(y => y.meta === x));
      const character = this.game.rnd.pick(availableBugs);
      if (character) {
        const x = this.game.rnd.between(100, this.game.world.width-200);
        const y = this.game.rnd.between(this.game.world.height * 0.6, this.game.world.height);
        const newBug = new Bug(this.game, x, y, character.index, (bug) => this.bugClicked(bug), (bug) => this.onDefeat(bug));
        newBug.meta = character;
        this.bugs.add(newBug);
        this.talkClips.forEach((s) => { s.fadeTo(500, 1); });
        this.tick.volume = 0;
      }
      if (this.bugs.countLiving() < 20) {
        this.scheduleNextSpawn(); 
      }
    }
  }

}

export default GameState;
