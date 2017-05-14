import Hammer from 'objects/Hammer';
import Bug from 'objects/Bug';
import Scoreboard from 'objects/Scoreboard';

const STAGE_DURATION = 5;

const BUGS = [
  { index:  0, name: 'Juha',    party: 1 },
  { index:  1, name: 'Anne',    party: 1 },
  { index:  2, name: 'Juha',    party: 1 },
  { index:  3, name: 'Sampo',   party: 2 },
  { index:  4, name: 'Kaj',     party: 2 },
  { index:  5, name: 'Alex',    party: 0 },
  { index:  6, name: 'Juhana',  party: 0 },
  { index:  7, name: 'Alex',    party: 0 },
  { index:  8, name: 'Harri',   party: 0 },
  { index:  9, name: 'Petteri', party: 0 },
];

class GameState extends Phaser.State {

  create() {
    const bg = this.game.add.sprite(0, 0, 'bg', 0);
    bg.width = this.game.width;
    bg.height = this.game.height;
    this.hammer = new Hammer(this.game);
    this.bugs = this.game.add.group();
    this.stageDuration = 0;
    this.spawnScale = 5;
    this.gameOver = false;

    const headerHeight = 120;
    const border = this.game.add.graphics(0, 0);
    border.lineStyle(10, 0xFFFFFF, 1);
    border.drawRoundedRect(0, headerHeight, this.game.width, this.game.height - headerHeight, 10);
    border.beginFill(0xFFFFFF, 1);
    border.drawRect(0, 0, this.game.width, headerHeight, 0);
    border.endFill();
    this._scoreboard = new Scoreboard(this.game);
    this.game.add.existing(this._scoreboard);

    this._scores = [0, 0, 0];
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

  bugSquashed(bug) {
    const party = bug.meta.party;
    this._scores[party] += 1;
    this._scoreboard.setPartyScore(party, this._scores[party]);
    this._scoreboard.setTotalScore(this._scores[0] + this._scores[1] + this._scores[2]);
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
    if (!this.gameOver) {
      this.bugs.sort('y');
    }

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
    const style = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
    const bar = this.game.add.graphics();
    const text = this.game.add.text(0, 0, 'Voi että, ' + bug.meta.name + ' sai hallintarekisterin runnottua läpi eduskunnassa!', style);
    bar.beginFill(0xFFFFFF, 1);
    bar.drawRect(0, this.game.height - 200, this.game.width, 100);
    text.setTextBounds(0, this.game.height - 200, this.game.width, 100);
    const border = this.game.add.graphics(0, 0);
    border.lineStyle(10, 0xFFFFFF, 1);

    const btn = this.game.add.button(this.game.width / 2, this.game.height - 80, 'restart', () => this.restart(), this, 0, 0, 0);
    btn.anchor.x = 0.5;
    btn.scale.x = 0.5;
    btn.scale.y = 0.5;
  }

  restart() {
    this.game.state.start('IntroState');
  }

  spawnBug() {
    if (!this.gameOver) {
      let center = { x: this.game.world.centerX, y: this.game.world.centerY }
      const availableBugs = BUGS.filter(x => !this.bugs.children.find(y => y.meta === x));
      const character = this.game.rnd.pick(availableBugs);
      if (character) {
        const x = this.game.rnd.between(100, this.game.world.width-200);
        const y = this.game.rnd.between(this.game.world.height * 0.6, this.game.world.height);
        const newBug = new Bug(this.game, x, y, character.index, {
          onClick: (bug) => this.bugClicked(bug),
          onDefeat: (bug) => this.onDefeat(bug),
          onSquash: (bug) => this.bugSquashed(bug)
        });
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
