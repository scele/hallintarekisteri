export default class Scoreboard extends Phaser.Group {

  constructor(game) {
    super(game);
    let style = { font: "bold 70px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
    this.texts = [];
    this.logos = [];
    const margin = 20;
    const logoSpace = 100;
    const numberSpace = 100;
    let x = margin;
    let y = margin;
    this.logos.push(this.add(new Phaser.Sprite(game, x, y, 'party', 0)));
    x += logoSpace;
    this.texts.push(this.add(new Phaser.Text(game, x, y, "0", style)));
    x += numberSpace;
    this.logos.push(this.add(new Phaser.Sprite(game, x, y, 'party', 1)));
    x += logoSpace;
    this.texts.push(this.add(new Phaser.Text(game, x, y, "0", style)));
    x += numberSpace;
    this.logos.push(this.add(new Phaser.Sprite(game, x, y, 'party', 2)));
    x += logoSpace;
    this.texts.push(this.add(new Phaser.Text(game, x, y, "0", style)));
    x += numberSpace;
    this.totalText = this.add(new Phaser.Text(game, x, y, "= 0", style));
    x += numberSpace;

    this.x = (this.game.width - x) / 2;

    this.logos.forEach(x => {
        x.width = 80;
        x.height = 80;
    });
    this.texts.forEach(x => {
      //x.scale.setTo(1,3);
    });
  }

  setPartyScore(index, score) {
      this.texts[index].text = score;
  }
  setTotalScore(score) {
      this.totalText.text = "= " + score;
  }
}