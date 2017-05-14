export default class Button extends Phaser.Button {

  constructor(game, x, y, width, height, text, onClick) {
    super(game, x, y, null, onClick);
    const bg = new Phaser.Graphics(this.game, 0, 0);
    bg.lineStyle(3, 0x000000, 1);
    bg.beginFill(0xFFFFFF, 1);
    bg.drawRoundedRect(0, 0, width, height, 10);
    this.addChild(bg);
    const textStyle = { font: "bold 32px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
    const textElement = new Phaser.Text(this.game, 0, 0, text, textStyle);
    textElement.setTextBounds(0, 0, width, height);
    this.addChild(textElement);
  }
}