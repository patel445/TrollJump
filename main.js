var mainState = {
    preload: function () { // general phaser project loading assetes function
        game.load.image('troll', 'images/troll.png');
        game.load.image('pipe', 'images/chain.png');
    }
    , create: function () { // phaser creating the game function
        game.stage.backgroundColor = '#28af25';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.troll = game.add.sprite(150, 250, 'troll'); // create the bird
        game.physics.arcade.enable(this.troll);
        this.troll.body.gravity.y = 800; // drop speed
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        this.pipes = game.add.group();
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    }
    , update: function () {
        if (this.troll.y < 0 || this.troll.y > 800) this.restartGame(); // height of game
        game.physics.arcade.overlap(this.troll, this.pipes, this.restartGame, null, this);
    }
    , jump: function () {
        this.troll.body.velocity.y = -400; // jump speed 
    }
    , restartGame: function () {
        game.state.start('main');
    }
    , addOnePipe: function (x, y) {
        var pipe = game.add.sprite(x, y, 'pipe');
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -350;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }
    , addRowOfPipes: function () {
        var hole = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 16; i++)
            if (i != hole && i != hole + 1) this.addOnePipe(1000, i * 70 + 10); // create the row of pipes
    }
};
var game = new Phaser.Game('100', '100');
game.state.add('main', mainState);
game.state.start('main');