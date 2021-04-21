//Timothy Tai | Project Title: Lone Iron | Work Time: 16 Hours
//All Background Music created on my own using FL Studio
//Background parallax assets created on my own using Photoshop
//Redesigned artwork, UI, and sound to change theme/aesthetic(60)
//Implement parallax scrolling (10)


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
  }
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;