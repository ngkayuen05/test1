var game = new Phaser.Game(900, 620, Phaser.CANVAS, 'gameDiv', {
    preload: preload,
    create: create,
    update: update
});

var map, layer, player;
var cursorKeys;
var bg;
var timer, elapsedSec;
var fishCollected = 0;
var score, gg;

function preload() {
    game.load.tilemap('layer', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'game_img/gtile.png');
    game.load.spritesheet('starfish', 'game_img/starfish.png', 32, 48);
    game.load.image('background', 'game_img/game_bg.png');

    game.load.spritesheet('fish', 'game_img/fish.png', 64, 64);    
    game.load.spritesheet('door', 'game_img/door1.png', 64, 64);
}

function create() {
    //game.stage.backgroundColor = '#fff'; // pure color

    //background
    bg = game.add.tileSprite(0, 0, 900, 620, 'background'); //pic
    bg.fixedToCamera = true;

    //map
    map = game.add.tilemap('layer');
    map.addTilesetImage('tileset');
    map.setCollisionByExclusion([0]); //可穿過0
    layer = map.createLayer('layer');
    layer.resizeWorld();

    fish1 = game.add.group();
    fish1.enableBody = true; //enable physics for any coin that is created in this group
    map.createFromObjects('objectLayer1', 34, 'fish', 0, true, true, fish1);
    fish1.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish1.callAll('animations.play', 'animations', 'spin');

    fish2 = game.add.group();
    fish2.enableBody = true;
    map.createFromObjects('objectLayer2', 35, 'fish', 0, true, true, fish2);
    fish2.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish2.callAll('animations.play', 'animations', 'spin');

    fish3 = game.add.group();
    fish3.enableBody = true;
    map.createFromObjects('objectLayer3', 36, 'fish', 0, true, true, fish3);
    fish3.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish3.callAll('animations.play', 'animations', 'spin');

    fish4 = game.add.group();
    fish4.enableBody = true;
    map.createFromObjects('objectLayer4', 37, 'fish', 0, true, true, fish4);
    fish4.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish4.callAll('animations.play', 'animations', 'spin');

    fish5 = game.add.group();
    fish5.enableBody = true;
    map.createFromObjects('objectLayer5', 38, 'fish', 0, true, true, fish5);
    fish5.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish5.callAll('animations.play', 'animations', 'spin');

    fish6 = game.add.group();
    fish6.enableBody = true;
    map.createFromObjects('objectLayer6', 39, 'fish', 0, true, true, fish6);
    fish6.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish6.callAll('animations.play', 'animations', 'spin');

    fish7 = game.add.group();
    fish7.enableBody = true;
    map.createFromObjects('objectLayer7', 40, 'fish', 0, true, true, fish7);
    fish7.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish7.callAll('animations.play', 'animations', 'spin');

    fish8 = game.add.group();
    fish8.enableBody = true;
    map.createFromObjects('objectLayer8', 41, 'fish', 0, true, true, fish8);
    fish8.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish8.callAll('animations.play', 'animations', 'spin');

    fish9 = game.add.group();
    fish9.enableBody = true;
    map.createFromObjects('objectLayer9', 42, 'fish', 0, true, true, fish9);
    fish9.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    fish9.callAll('animations.play', 'animations', 'spin');

    door = game.add.group();
    door.enableBody = true;
    map.createFromObjects('objectLayerDoor', 99, 'door', 0, true, true, door);
    door.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4], 5, true);
    door.callAll('animations.play', 'animations', 'spin');

    //timer
    timer = game.add.text(750, 32, 'Time:  0s', {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
    });
    timer.fixedToCamera = true;

    gg = game.add.text(150, 250, '', {
        font: '40px kongtextRegular',
        fill: '#ffffff',
        align: "middle",
        backgroundColor: 'rgba(0,255,0,0.25)'
    });
    gg.fixedToCamera = true;

    score = game.add.text(20, 32, 'Solved: 0 / 9', {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
    });
    score.fixedToCamera = true;

    //player
    player = game.add.sprite(350, 400, 'starfish');
    player.body.bounce.y = 0.2; //彈起
    player.body.minVelocity.y = 4;
    player.body.setRectangle(16, 32, 8, 16);
    player.body.collideWorldBounds = true; //會碰撞到視窗邊界

    //player's action
    player.animations.add('left', [0, 1, 2, 3], 10, true); //left
    player.animations.add('middle', [4], 20, true); //trun
    player.animations.add('right', [5, 6, 7, 8], 10, true); //right

    //view
    //game.physics.gravity.y = 250; //下降速度
    player.body.gravity.y = 250;
    game.camera.follow(player);

    cursorKeys = game.input.keyboard.createCursorKeys();

    //對齊
    this.game.stage.scale.pageAlignHorizontally = true;
    this.game.stage.scale.pageAlignVeritcally = true;
    this.game.stage.scale.refresh();

}

function update() {

    game.physics.collide(player, layer); //check player是否碰撞平台 (平台群組裡的所有物件) 
    game.physics.overlap(player, fish1, collectFish1, null, this);
    game.physics.overlap(player, fish2, collectFish2, null, this);
    game.physics.overlap(player, fish3, collectFish3, null, this);
    game.physics.overlap(player, fish4, collectFish4, null, this);
    game.physics.overlap(player, fish5, collectFish5, null, this);
    game.physics.overlap(player, fish6, collectFish6, null, this);
    game.physics.overlap(player, fish7, collectFish7, null, this);
    game.physics.overlap(player, fish8, collectFish8, null, this);
    game.physics.overlap(player, fish9, collectFish9, null, this);
    
    game.physics.overlap(player, door, hitDoor, null, this); //gameover

    player.body.velocity.x = 0;

    elapsedSec = game.time.totalElapsedSeconds().toFixed(1);
    timer.content = 'Time: ' + elapsedSec + 's';

    if (cursorKeys.left.isDown) {
        player.body.velocity.x = -200;
        player.animations.play('left');
    } else if (cursorKeys.right.isDown) {
        player.body.velocity.x = 200;
        player.animations.play('right');
    } else {
        player.body.velocity.x = 0;
        player.animations.play('middle');
    }

    if (cursorKeys.up.isDown && player.body.onFloor()) {
        player.body.velocity.y = -290; //向上跳
    }

    //if (fishCollected == 1) {
      //  hitDoor();
    //}
}

function collectFish1(player, coin) {
    coin.kill();
    player.x = player.position.x + 64;
    player.y = player.position.y;

    Swal.fire({
        title: 'Question',
        text: 'What is the plaintext of "suxebbg" with key = 13 that is encrypted by Caesar Cipher?',
        input: 'text',
        inputPlaceholder: 'Please enter the answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/dog.gif")
            left top
            no-repeat
        `
    }).then((result) => {
        if (result.value) {
            //console.log(result.value);
            if (result.value.toLowerCase() === "fhkroot") {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    title: 'Excellent',
                    text: 'You got it！',
                    icon: 'success'
                });
            } else {
                coin.reset(960, 480);
                Swal.fire({
                    title: 'Oops..！',
                    text: 'Try again please~',
                    icon: 'error',
                    footer: '<b><a href = "../caesar.html" target="_blank">Click here for more hints</a></b>'
                });
            }
        } else {
            coin.reset(120, 492);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} //caesar

function collectFish2(player, coin) {
    coin.kill();
    player.x = player.position.x + 64;
    player.y = player.position.y;
    //player.x = 450;
    //player.y = 128;
    Swal.fire({
        title: 'Question',
        text: 'In Vigenere cipher, plaintext is given as "ATTACK AT DAWN". Find the ciphertext if the key is "ABLE".',
        input: 'text',
        inputPlaceholder: 'Please enter answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/star.gif")
            left top 30%
            no-repeat
        `
    }).then((result) => {
        if (result.value) {

            if (result.value.toLowerCase() === "aueecl lx dbhr" || result.value.toLowerCase() === "aueecllxdbhr" ) {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    title: 'Correct！',
                    text: 'You are a genius！',
                    icon: 'success'
                });
            } else {
                coin.reset(736, 224);
                Swal.fire({
                    title: 'Wrong answer！',
                    text: 'Try it one more time',
                    icon: 'error',
                    footer: '<b><a href = "../vigenere.html" target="_blank">Click here for more hints</a></b>'
                });
            }
        } else {
            coin.reset(320, 128);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} //Vigenere

function collectFish3(player, coin) {
    coin.kill();
    player.x = player.position.x - 40;
    player.y = player.position.y;
    //player.x = 320;
    //player.y = 928;
    Swal.fire({
        title: 'Question',
        text: 'In a public key system, the cipher text received is C = 10 if RSA encryption used with a public key (e = 11, n = 77) to deduce the plaintext. Determine the value of Φ(n).',
        input: 'text',
        inputPlaceholder: 'Please enter answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/star2.gif")
            right top 80%
            no-repeat
        `
    }).then((result) => {
        if (result.value) {

            if (result.value === "60") {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    title: 'You are right！',
                    text: 'Very good',
                    icon: 'success'
                });
            } else {
                coin.reset(608, 1088);
                Swal.fire({
                    title: 'This is not a correct answer！',
                    text: 'Think again. You may get p and q via n',
                    icon: 'error',
                    footer: '<b><a href = "../rsanum.html" target="_blank">Click here for more hints</a></b>'
                });
            }
        } else {
            coin.reset(300, 960);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} //rsa

function collectFish4(player, coin) {
    coin.kill();
    player.x = player.position.x + 32;
    player.y = player.position.y;
    //player.x = 200;
    //player.y = 1276;
    Swal.fire({
        title: 'Question',
        text: 'What will be the ciphertext corresponding to plaintext "DOLLAR" if playfair cipher is used with keyword as "SECRET" (assuming J is combined with I)?',
        input: 'text',
        inputPlaceholder: 'Please enter answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/star4.gif")
            left top 80%
            no-repeat
        `
    }).then((result) => {
        if (result.value) { 
            if (result.value.toUpperCase() === "BPKYFS") {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    title: 'Wow！',
                    text: 'You are correct！',
                    icon: 'success'
                });
            } else {
                coin.reset(480, 1408);
                Swal.fire({
                    title: 'Ohh！',
                    text: 'Try again！',
                    icon: 'error',
                    footer: '<b><a href = "../playfair.html" target="_blank">Click here for more hints</a></b>'
                });
            }
        } else {
            coin.reset(120, 1408);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} //playfair

function collectFish5(player, coin) {
    coin.kill();
    player.x = player.position.x - 32;
    player.y = player.position.y;

    Swal.fire({
        title: 'Question',
        text: 'In Vigenere cipher, ciphertext is given as "TIZUCMHT". Find the key if the plaintext is "NDSKKJBH".',
        input: 'text',
        inputPlaceholder: 'Please enter answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/star.gif")
            left top 50%
            no-repeat
        `
    }).then((result) => {
        if (result.value) {
            if (result.value.toLowerCase() === "gfhksdgm") {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    icon: 'success',
                    title: 'Bingo！',
                    text: 'You got it！'
                    
                });
            } else {
                coin.reset(800, 1024);
                Swal.fire({
                    icon: 'error',
                    title: 'UH-OHh！',
                    text: 'Give it another shot! Add Oil!!',
                    footer: '<b><a href = "../vigenere.html" target="_blank">Click here for more hints</a></b>'
                });
            }
        } else {
            coin.reset(864, 768);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} //Vigenere

function collectFish6(player, coin) {
    coin.kill();
    player.x = player.position.x - 64;
    player.y = player.position.y;
    
    Swal.fire({
        title: 'Question',
        text: 'In AES, for a key 25D5 and input A479, what is the output we obtain after the "add round key" function?',
        input: 'text',
        inputPlaceholder: 'Please enter answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/star3.gif")
            left top 80%
            no-repeat
        `
    }).then((result) => {
        if (result.value) {
            //console.log(result.value);

            if (result.value.toUpperCase() === "81AC") {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    title: 'Point taken！',
                    text: 'You got that right！',
                    icon: 'success'
                });
            } else {
                coin.reset(1792, 1408);
                Swal.fire({
                    title: 'It is wrong',
                    text: 'Keep trying！ Try to "XOR" the key and input',
                    icon: 'error',
                    footer: '<b><a href = "../aes.html" target="_blank">Click here for more hints</a></b>'
                    
                });
            }
        } else {
            coin.reset(1088, 1280);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} // aes?

function collectFish7(player, coin) {
    coin.kill();
    player.x = player.position.x + 64;
    player.y = player.position.y;
    //player.x = 1636;
    //player.y = 224;
    Swal.fire({
        title: 'Question',
        text: 'Given p = 17, q = 11, e = 7, Ciphertext C = 11. What is the Plaintext M value?',
        input: 'text',
        inputPlaceholder: 'Please enter answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/star4.gif")
            right top 20%
            no-repeat
        `
    }).then((result) => {
        if (result.value) {
            //console.log(result.value);

            if (result.value === "88") {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    title: 'Correct！',
                    text: 'You got a point here',
                    icon: 'success'
                });
            } else {
                coin.reset(896, 128);
                Swal.fire({
                    title: 'Ohhh！',
                    text: 'You made a mistake. Think again the formula: M = C^d (mod n)',
                    icon: 'error',
                    footer: '<b><a href = "../rsanum.html" target="_blank">Click here for more hints</a></b>'
                });
            }
        } else {
            coin.reset(1536, 224);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} //rsa

function collectFish8(player, coin) {
    coin.kill();
    player.x = player.position.x - 32;
    player.y = player.position.y;
    //player.x = 1648;
    //player.y = 640;
    Swal.fire({
        title: 'Question',
        text: 'What is the plaintext of "p sprl lhapun hwwsl" that is encrypted by Caesar Cipher?',
        input: 'text',
        inputPlaceholder: 'Please enter answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/star5.gif")
            left top
            no-repeat
        `
    }).then((result) => {
        if (result.value) {
            //console.log(result.value);

            if (result.value.toLowerCase() === "i like eating apple") {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    title: 'Perfect！',
                    text: 'It is the correct answer！',
                    icon: 'success'
                });
            } else {
                coin.reset(1824, 704);
                Swal.fire({
                    title: 'Oh no',
                    text: 'You got it wrong！',
                    icon: 'error',
                    footer: '<b><a href = "../vigenere.html" target="_blank">Click here for more hints</a></b>'
                });
            }
        } else {
            coin.reset(1568, 640);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} //caesar

function collectFish9(player, coin) {
    coin.kill();
    player.x = player.position.x - 64;
    player.y = player.position.y;
    //player.x = 1648;
    //player.y = 1120;
    Swal.fire({
        title: 'Question',
        text: 'What will be the plaintext corresponding to ciphertext "ODGIIGTOHNYY" if playfair cipher is used with keyword as "PERFECT" (assuming J is combined with I)?',
        input: 'text',
        inputPlaceholder: 'Please enter answer',
        confirmButtonText: 'Submit',
        width: 600,
        padding: '3em',
        background: '#fff url(game_img/swalbg3.jpg)',
        backdrop: `
            rgba(0,123,200,0.3)
            url("game_img/star2.gif")
            right top 100%
            no-repeat
        `
    }).then((result) => {
        if (result.value) {
            if (result.value.toLowerCase() === "saammaanthx") {
                fishCollected += 1;
                score.content = 'Solved: ' + fishCollected + ' / 9';
                Swal.fire({
                    title: 'Very good！',
                    text: 'You are right! All things are on the right way.',
                    icon: 'success'
                });
            } else {
                coin.reset(864, 1376);
                Swal.fire({
                    title: 'Incorrect answer！',
                    text: 'Try again!',
                    icon: 'error',
                    footer: '<b><a href = "../playfair.html" target="_blank">Click here for more hints</a></b>'
                });
            }
        } else {
            coin.reset(1568, 1120);
            Swal.fire({
                title: 'Let Try~！',
                text: 'Please input answer~',
                icon: 'warning'
            });
        }
    });
} //playfair

function hitDoor() {
    if (fishCollected == 9) {          //gameover
        player.animations.stop();
        gg.content = 'Congratulations!\nYou Have Done\n';
    }
}



