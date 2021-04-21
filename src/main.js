//Timothy Tai | Title: Lone Iron | Work Time: 16 Hours
//Background Music created using FL Studio
//Background parallax and assets created using Photoshop
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

let keyF, keyR, keyLEFT, keyRIGHT, keyE, keyW, keyUP, keyDOWN;