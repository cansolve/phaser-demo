var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'container');
game.MyStates = {};
//游戏初始化设置
game.MyStates.boot = {
        preload: function() {
            game.stage.backgroundColor = '#fff';
            game.load.image('preloadGif', './images/preloader.gif');
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        },
        create: function() {
            game.state.start('loader');
        }
    }
    //游戏预加载场景
game.MyStates.loader = {
        init: function() {
            progressText = game.add.text(game.world.centerX, game.world.centerY + 70, '0%', {
                fill: '#444444',
                fontSize: '40px'
            });
            progressText.anchor = {
                x: 0.5,
                y: 0.5
            };
        },
        preload: function() {
            var preloadSprite = game.add.sprite(game.width / 2 - 440 / 2, game.height / 2 - 38 / 2, 'preloadGif');
            game.load.setPreloadSprite(preloadSprite);
            preloadSprite.scale.setTo(2, 2)
            game.load.image('background', './images/bg.jpg');
            game.load.image('bg2', './images/bg2.jpg');
            game.load.spritesheet('fire', 'images/fire.png', 171, 242);
            game.load.spritesheet('gongbingBtn', './images/gongbingBtn.png', 106, 106);
            game.load.spritesheet('bubingBtn', './images/bubingBtn.png', 106, 106);
            game.load.spritesheet('qibingBtn', './images/qibingBtn.png', 106, 106);
            game.load.spritesheet('paobingBtn', './images/paobingBtn.png', 106, 106);
            game.load.spritesheet('qibing', './images/qibing.png', 304, 209);
            game.load.spritesheet('bubing', './images/bubing.png', 256, 283);
            game.load.spritesheet('gongbing', './images/gongbing.png', 213, 190);
            game.load.spritesheet('paobing', './images/paobing.png', 188, 190);
            game.load.spritesheet('bomm_fire', 'images/bomm_fire.png', 338, 329);
            game.load.image('arrow', './images/arrow.png');
            game.load.image('boom', './images/boom.png');
            game.load.image('scoreBoard', './images/scoreBoard.png');
            game.load.image('reset', './images/reset.png');
            game.load.image('restart', './images/restart.png');
            game.load.image('attack', './images/attack.png');
            game.load.image('install', './images/install.png');
            game.load.image('hand', './images/hand.png');
            game.load.image('win', './images/win.png');
            game.load.image('lose', './images/lose.png');
            game.load.image('arrowLight', './images/arrowLight.png');
            game.load.image('zhen', './images/zhen.png');
            game.load.image('zhen1', './images/zhen1.png');
            game.load.image('zhen2', './images/zhen2.png');
            game.load.image('zhen3', './images/zhen3.png');
            game.load.image('zhen4', './images/zhen4.png');
            game.load.image('zhen5', './images/zhen5.png');
            game.load.image('zhen6', './images/zhen6.png');
            game.load.image('zhen7', './images/zhen7.png');
            game.load.image('zhen8', './images/zhen8.png');
            game.load.image('zhen9', './images/zhen9.png');

            game.load.onFileComplete.add(function(progress) {
                progressText.text = progress + '%'
            });
        },
        create: function() {
            game.state.start('begin');
        }
    }
    //游戏开始界面 
game.MyStates.begin = {
    create: function() {
        //开启物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // 我们把游戏世界的区域放大一点，这样地震左右摇动时不至于超出边界
        var margin = 50;
        // 四边都增加一个margin
        var x = -margin;
        var y = -margin;
        var w = game.world.width + margin * 2;
        var h = game.world.height + margin * 2;
        // 设置游戏区域
        game.world.setBounds(x, y, w, h);
        // 设置相机
        game.world.camera.position.set(0);
        //开启物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //我的背景
        this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
        this.scoreBoard = game.add.image(120, 5, "scoreBoard");
        this.scoreBoardnum = 15;
        this.scoreBoardText = game.add.text(205, 45, "x" + this.scoreBoardnum, {
            fill: '#fff',
            fontSize: '40px'
        });
        //我的小火
        var fire = game.add.sprite(550, -50, 'fire');
        fire.animations.add('firing');
        fire.animations.play('firing', 8, true);

        this.zhens = game.add.group();
        this.enemys = game.add.group();
        this.myBullets = game.add.group();
        this.mypaoBullets = game.add.group();
        this.enemyBullets = game.add.group();
        this.enemys = game.add.group();
        this.mybubingGroup = game.add.group();
        this.mygongbingGroup = game.add.group();
        this.myqibingGroup = game.add.group();
        this.mypaobingGroup = game.add.group();
        // 拖拽中步兵
        this.mybubing = game.add.sprite(400, game.height - 115, "bubing");
        this.mybubing.scale.setTo(0.4, 0.4);
        this.mybubing.anchor.setTo(1, 0);
        this.mybubing.alpha = 0;
        this.mybubing.angle = -90;
        this.mybubing.inputEnabled = true;
        this.mybubing.input.enableDrag(true, true);
        this.mybubing.input.priorityID = 2;
        this.bubingBtn = game.add.sprite(400, game.height - 110, "bubingBtn");
        // 拖拽中弓兵
        this.mygongbing = game.add.sprite(520, game.height - 115, "gongbing");
        this.mygongbing.scale.setTo(0.4, 0.4);
        this.mygongbing.anchor.setTo(1, 0);
        this.mygongbing.alpha = 0;
        this.mygongbing.angle = -90;
        this.mygongbing.inputEnabled = true;
        this.mygongbing.input.enableDrag(true, true);
        this.mygongbing.input.priorityID = 2;
        this.gongbingBtn = game.add.sprite(520, game.height - 110, "gongbingBtn");

        // 拖拽中骑兵
        this.myqibing = game.add.sprite(game.width / 2, game.height - 115, "qibing");
        this.myqibing.scale.setTo(0.4, 0.4);
        this.myqibing.anchor.setTo(.9, -.1);
        this.myqibing.alpha = 0;
        this.myqibing.angle = -90;
        this.myqibing.inputEnabled = true;
        this.myqibing.input.enableDrag(true, true);
        this.myqibing.input.priorityID = 2;
        this.qibingBtn = game.add.sprite(game.width / 2, game.height - 110, "qibingBtn");

        // 拖拽中炮兵
        this.mypaobing = game.add.sprite(830, game.height - 115, "paobing");
        this.mypaobing.scale.setTo(0.4, 0.4);
        this.mypaobing.anchor.setTo(.9, -.1);
        this.mypaobing.alpha = 0;
        this.mypaobing.angle = 0;
        this.mypaobing.inputEnabled = true;
        this.mypaobing.input.enableDrag(true, true);
        this.mypaobing.input.priorityID = 2;
        this.paobingBtn = game.add.sprite(760, game.height - 110, "paobingBtn");
        // 重置按钮
        this.reset = game.add.button(880, game.height - 100, "reset", this.onResetClick, this);
        // 攻击按钮
        this.attack = game.add.button(game.width - 260, game.height - 170, "attack", this.onAttackClick, this);
        // 提示箭头
        // this.arrowLight = game.add.image(game.width / 2 - 80, game.height - 280, "arrowLight")
        // 提示手势
        // this.hand = game.add.image(490, game.height - 55 - 20, "hand")
        // game.add.tween(this.arrowLight).to({
        //     alpha: 0
        // }, 800, null, true, 0, Number.MAX_VALUE, true)
        // game.add.tween(this.hand).to({
        //         x: game.width - 640,
        //         y: game.height - 280
        //     }, 800, null, true, 0, Number.MAX_VALUE, true)
        // 阵型位置
        this.zhen1 = this.zhens.create(48, 116, "zhen1");
        this.zhen2 = this.zhens.create(123, 116, "zhen2");
        this.zhen3 = this.zhens.create(196, 116, "zhen3");
        this.zhen4 = this.zhens.create(28, 158, "zhen4");
        this.zhen5 = this.zhens.create(117, 158, "zhen5");
        this.zhen6 = this.zhens.create(202, 158, "zhen6");
        this.zhen7 = this.zhens.create(0, 216, "zhen7");
        this.zhen8 = this.zhens.create(111, 216, "zhen8");
        this.zhen9 = this.zhens.create(210, 216, "zhen9");
        this.zhens.x = game.width / 2 - 160;
        this.zhens.y = game.height - 410;
        this.weStrength = 0;
        this.gameFire = false;
        this.buBingScoreNum = 2;
        this.gongBingScoreNum = 2;
        this.qiBingScoreNum = 3;
        this.paoBingScoreNum = 5;
        this.qibingBtnCan = true;
        this.gongbingBtnCan = true;
        this.bubingBtnCan = true;
        this.paobingBtnCan = true;
        //敌方弓兵
        this.enemysG = this.enemys.create(game.width / 2 - 5, game.height / 2 - 130, 'gongbing');
        this.enemysG.animations.add("attack", [0, 1, 2, 3, 4], 6, true);
        this.enemysG.animations.add("wait", [5, 6], 6, true);
        this.enemysG.animations.play("wait");
        //敌方步兵
        this.enemysB = this.enemys.create(game.width / 2 - 5, game.height / 2 - 95, 'bubing');
        this.enemysB.animations.add("attack", [0, 1, 2, 3, 4, 5], 6, true);
        this.enemysB.animations.add("wait", [6, 7, 8], 6, true);
        this.enemysB.animations.play("wait");
        //敌方骑兵1
        this.enemysQ1 = this.enemys.create(game.width / 2 - 50, game.height / 2 - 100, 'qibing');
        this.enemysQ1.animations.add("attack", [0, 1, 2], 6, true);
        this.enemysQ1.animations.add("wait", [3, 4], 6, true);
        this.enemysQ1.animations.play("wait");
        //敌方骑兵2
        this.enemysQ2 = this.enemys.create(game.width / 2 + 50, game.height / 2 - 100, 'qibing');
        this.enemysQ2.animations.add("attack", [0, 1, 2], 6, true);
        this.enemysQ2.animations.add("wait", [3, 4], 6, true);
        this.enemysQ2.animations.play("wait");
        //设置敌方小兵各种属性
        this.enemys.setAll("anchor.x", "0.5");
        this.enemys.setAll("anchor.y", "0.5");
        this.enemys.setAll("angle", "90");
        this.enemys.setAll("scale.x", "0.1")
        this.enemys.setAll("scale.y", "0.1")
            //新加我方阵容组
        for (var i = 1; i < 10; i++) {
            this['myzhen' + i] = game.add.group();
        }

        //按下鼠标之后
        game.input.onDown.addOnce(this.startGame, this);
        //按下步兵按钮之后
        this.mybubing.events.onInputDown.add(this.bubingDownFunction, this)
        this.mybubing.events.onInputUp.add(this.bubingUpFunction, this)
            //按下弓兵按钮之后
        this.mygongbing.events.onInputDown.add(this.gongbingDownFunction, this)
        this.mygongbing.events.onInputUp.add(this.gongbingUpFunction, this)
            //按下骑兵按钮之后
        this.myqibing.events.onInputDown.add(this.qibingDownFunction, this)
        this.myqibing.events.onInputUp.add(this.qibingUpFunction, this)
            //按下炮兵按钮之后
        this.mypaobing.events.onInputDown.add(this.paobingDownFunction, this)
        this.mypaobing.events.onInputUp.add(this.paobingUpFunction, this)
    },
    update: function() {
        var now = game.time.now;
        if (this.gameFire && now - this.fireTime > 300 && this.enemysG.alive) {
            //敌方小兵射
            var enemyBullet = this.enemyBullets.getFirstExists(false);
            var math = Math.random() * 50 + 10;
            if (enemyBullet) {
                enemyBullet.reset(this.enemysG.x + math, this.enemysG.y + 80);
            } else {
                enemyBullet = game.add.sprite(this.enemysG.x + math, this.enemysG.y + 80, "arrow");
                enemyBullet.outOfBoundsKill = true;
                enemyBullet.checkWorldBounds = true;
                enemyBullet.angle = 180
                enemyBullet.scale.setTo(0.4, 0.4)
                this.enemyBullets.addChild(enemyBullet);
                game.physics.enable(enemyBullet, Phaser.Physics.ARCADE);
            }
            enemyBullet.body.velocity.y = 30;
            //我方小兵射
            if (this.mygongbingB1 && this.mygongbingB1.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB1.x + math, this.mygongbingB1.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB1.x + math, this.mygongbingB1.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
            };
            if (this.mygongbingB2 && this.mygongbingB2.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB2.x + math, this.mygongbingB2.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB2.x + math, this.mygongbingB2.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
            }
            if (this.mygongbingB3 && this.mygongbingB3.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB3.x + math, this.mygongbingB3.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB3.x + math, this.mygongbingB3.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
            }
            if (this.mygongbingB4 && this.mygongbingB4.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB4.x + math, this.mygongbingB4.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB4.x + math, this.mygongbingB4.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
                myBullet.body.velocity.x = 10;
            }
            if (this.mygongbingB5 && this.mygongbingB5.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB5.x + math, this.mygongbingB5.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB5.x + math, this.mygongbingB5.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
            }
            if (this.mygongbingB6 && this.mygongbingB6.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB6.x + math, this.mygongbingB6.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB6.x + math, this.mygongbingB6.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
                myBullet.body.velocity.x = -10;
            }
            if (this.mygongbingB7 && this.mygongbingB7.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB7.x + math, this.mygongbingB7.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB7.x + math, this.mygongbingB7.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
                myBullet.body.velocity.x = 20;
            }
            if (this.mygongbingB8 && this.mygongbingB8.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB8.x + math, this.mygongbingB8.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB8.x + math, this.mygongbingB8.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
            }
            if (this.mygongbingB9 && this.mygongbingB9.alive) {
                var myBullet = this.myBullets.getFirstExists(false);
                var math = Math.random() * 50 + 10;
                if (myBullet) {
                    myBullet.reset(this.mygongbingB9.x + math, this.mygongbingB9.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mygongbingB9.x + math, this.mygongbingB9.y - 80, "arrow");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5)
                    this.myBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -100;
                myBullet.body.velocity.x = -20;
            }
            // 炮兵
            if (this.mypaobingB7 && this.mypaobingB7.alive) {
                var myBullet = this.mypaoBullets.getFirstExists(false);
                var math = Math.random() * 50 + 20;
                if (myBullet) {
                    myBullet.reset(this.mypaobingB7.x + math, this.mypaobingB7.y);
                } else {
                    myBullet = game.add.sprite(this.mypaobingB7.x + math, this.mypaobingB7.y, "boom");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5);
                    myBullet.angle = 180;
                    this.mypaoBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -150;
                myBullet.body.velocity.x = 20;
                game.add.tween(myBullet.scale).to({ x: .2, y: .2 }, 2000, Phaser.Easing.Linear.None, true, 0, 2000, true);
            }
            if (this.mypaobingB8 && this.mypaobingB8.alive) {
                var myBullet = this.mypaoBullets.getFirstExists(false);
                var math = Math.random() * 50 + 20;
                if (myBullet) {
                    myBullet.reset(this.mypaobingB8.x + math, this.mypaobingB8.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mypaobingB8.x + math, this.mypaobingB8.y - 80, "boom");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5);
                    myBullet.angle = 180;
                    this.mypaoBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -150;
                game.add.tween(myBullet.scale).to({ x: .2, y: .2 }, 2000, Phaser.Easing.Linear.None, true, 0, 2000, true);
            }
            if (this.mypaobingB9 && this.mypaobingB9.alive) {
                var myBullet = this.mypaoBullets.getFirstExists(false);
                var math = Math.random() * 50 + 20;
                if (myBullet) {
                    myBullet.reset(this.mypaobingB9.x + math, this.mypaobingB9.y - 80);
                } else {
                    myBullet = game.add.sprite(this.mypaobingB9.x + math, this.mypaobingB9.y - 80, "boom");
                    myBullet.outOfBoundsKill = true;
                    myBullet.checkWorldBounds = true;
                    myBullet.scale.setTo(0.5, 0.5);
                    myBullet.angle = 180;
                    this.mypaoBullets.addChild(myBullet);
                    game.physics.enable(myBullet, Phaser.Physics.ARCADE);
                }
                myBullet.body.velocity.y = -150;
                myBullet.body.velocity.x = -20;
                game.add.tween(myBullet.scale).to({ x: .2, y: .2 }, 2000, Phaser.Easing.Linear.None, true, 0, 2000, true);
            }
            this.fireTime = now;
        }
        if (this.gameFire) {
            //敌方小兵移动
            game.physics.enable(this.enemys, Phaser.Physics.ARCADE);
            game.physics.enable(this.mybubingGroup, Phaser.Physics.ARCADE);
            game.physics.enable(this.myqibingGroup, Phaser.Physics.ARCADE);
            game.physics.enable(this.mygongbingGroup, Phaser.Physics.ARCADE);
            this.enemysB.body.velocity.y = 30;
            this.enemysQ1.body.velocity.y = 30;
            this.enemysQ1.body.velocity.x = -20;
            this.enemysQ2.body.velocity.y = 30;
            this.enemysQ2.body.velocity.x = 20;
            game.add.tween(this.enemysB.scale).to({ x: .5, y: .5 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, false);
            game.add.tween(this.enemysQ1.scale).to({ x: .4, y: .4 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, false);
            game.add.tween(this.enemysQ2.scale).to({ x: .4, y: .4 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, false);
            // this.enemysQ2.scale.set(.7, .7);
            if (this.enemysB.top > 320) {
                this.enemysB.body.velocity.y = 0;
                this.enemysQ1.body.velocity.y = 0;
                this.enemysQ2.body.velocity.y = 0;
            }
            this.enemys.callAll("animations.play", 'animations', "attack");
            this.mygongbingGroup.callAll("animations.play", 'animations', "attack");
            this.mybubingGroup.callAll("animations.play", 'animations', "attack");
            this.myqibingGroup.callAll("animations.play", 'animations', "attack");
            this.mypaobingGroup.callAll("animations.play", 'animations', "attack");
            //敌方和我方碰撞检测
            game.physics.arcade.collide(this.enemyBullets, this.mybubingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemyBullets, this.myqibingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemyBullets, this.mygongbingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemyBullets, this.mypaobingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.myBullets, this.enemys, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.mypaoBullets, this.enemys, this.paocollisioHandler, null, this);

            game.physics.arcade.collide(this.enemysB, this.mybubingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysB, this.myqibingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysB, this.mygongbingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysB, this.mypaobingGroup, this.bingCollisionHandler, null, this);

            game.physics.arcade.collide(this.enemysQ1, this.mybubingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysQ1, this.myqibingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysQ1, this.mygongbingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysQ1, this.mypaobingGroup, this.bingCollisionHandler, null, this);

            game.physics.arcade.collide(this.enemysQ2, this.mybubingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysQ2, this.myqibingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysQ2, this.mygongbingGroup, this.bingCollisionHandler, null, this);
            game.physics.arcade.collide(this.enemysQ2, this.mypaobingGroup, this.bingCollisionHandler, null, this);
            //我方小兵移动
            game.physics.enable(this.enemys, Phaser.Physics.ARCADE);
            game.physics.enable(this.mybubingGroup, Phaser.Physics.ARCADE);
            game.physics.enable(this.myqibingGroup, Phaser.Physics.ARCADE);
            game.physics.enable(this.mygongbingGroup, Phaser.Physics.ARCADE);
            game.physics.enable(this.mypaobingGroup, Phaser.Physics.ARCADE);
            // 判断每一块的兵是否存活
            for (var i = 1; i < 10; i++) {
                this[`mybubingB${i}`] && this[`mybubingB${i}`].alive ? this[`mybubingB${i}`].body.velocity.y = -100 : 0;
                if (this[`mybubingB${i}`] && this[`mybubingB${i}`].alive && this[`mybubingB${i}`].top < 280) {
                    game.add.tween(this[`mybubingB${i}`].scale).to({ x: .2, y: .2 }, 2000, Phaser.Easing.Linear.None, true, 0, 1, false);
                    this[`mybubingB${i}`].body.velocity.y = 0;
                }
            }
            for (var i = 1; i < 10; i++) {
                this['myqibingB' + i] && this['myqibingB' + i].alive ? this['myqibingB' + i].body.velocity.y = -100 : 0;
                if (this[`myqibingB${i}`] && this[`myqibingB${i}`].alive && this[`myqibingB${i}`].top < 280) {
                    this[`myqibingB${i}`].body.velocity.y = 0;
                }
            }
        }
        //计分板
        if (!this.gameFire) {
            if (this.scoreBoardnum - this.buBingScoreNum >= 0) {
                this.bubingBtnCan = true;
            } else {
                this.bubingBtnCan = false;
            };
            if (this.scoreBoardnum - this.gongBingScoreNum >= 0) {
                this.gongbingBtnCan = true;
            } else {
                this.gongbingBtnCan = false;
            };
            if (this.scoreBoardnum - this.qiBingScoreNum >= 0) {
                this.qibingBtnCan = true;
            } else {
                this.qibingBtnCan = false;
            };
            if (this.scoreBoardnum - this.paoBingScoreNum >= 0) {
                this.paobingBtnCan = false;
            } else {
                this.paobingBtnCan = false;
            };
        } else {
            this.bubingBtnCan = false;
            this.gongbingBtnCan = false;
            this.qibingBtnCan = false;
            this.paobingBtnCan = false;
        }
        if (!this.bubingBtnCan) {
            this.bubingBtn.frame = 1;
        };
        if (!this.gongbingBtnCan) {
            this.gongbingBtn.frame = 1;
        };
        if (!this.qibingBtnCan) {
            this.qibingBtn.frame = 1;
        };
        if (!this.paobingBtnCan) {
            this.paobingBtn.frame = 1;
        };
        //胜负判断
        if (this.gameFire && this.myqibingGroup.countLiving() === 0 && this.mybubingGroup.countLiving() === 0 && this.mygongbingGroup.countLiving() === 0 && this.mypaobingGroup.countLiving() === 0) {
            game.state.start('lose');
        }
        if (this.gameFire && this.enemys.countLiving() === 0) {
            game.state.start('win');
        }

    },
    bingCollisionHandler: function(bing, enemyBullets) {
        setInterval(function() {
            bing.kill();
            enemyBullets.kill();
        }, 1000)
    },
    paocollisioHandler: function(mypaoBullets, enemys) {
        var x = enemys.x - 20;
        var y = enemys.y;
        var sx = enemys.scale.x;
        var sy = enemys.scale.y;
        mypaoBullets.kill();
        enemys.kill();
        //添加层级组
        this.bottomGroup = game.add.group();
        var baozha = game.add.sprite(x - (50 * sx), 260, 'bomm_fire');
        this.bottomGroup.add(baozha);
        baozha.scale.setTo(sx * 2, sy * 2);
        baozha.animations.add("flower");
        baozha.animations.play("flower", 9, false)
        baozhaTweene = game.add.tween(baozha).to({ alpha: 0 }, 1000, Phaser.Easing.Circular.In, true, 1000);
        if (enemys.tweenAnimations) {
            enemys.tweenAnimations.pause();
        } else { return }

    },
    //重置按钮事件
    onResetClick: function() {
        game.state.start('loader');
    },
    //开战按钮事件
    onAttackClick: function() {
        this.zhens.kill();
        this.gameFire = true;
        this.fireTime = 0;
        var timer = game.time.create(false);
        timer.add(2500, this.timerUp, this); //设置最长2.5秒结束战斗
        timer.start();
        console.log(timer)
    },
    //时间到
    timerUp: function() {
        game.state.start('lose');
    },
    //按下鼠标之后
    startGame: function() {
        // this.arrowLight.kill();
        // this.hand.kill();
    },
    //按下鼠标之后
    bubingDownFunction: function() {
        if (this.bubingBtnCan) {
            this.mybubing.alpha = 1;
        } else {
            return false
        }
    },
    //抬起鼠标之后
    bubingUpFunction: function() {
        if (this.bubingBtnCan) {
            //步兵按钮
            if (this.mybubing.x > this.zhens.x + this.zhen1.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen1.x + 10 &&
                this.mybubing.y > this.zhens.y + this.zhen1.y - 50 &&
                this.mybubing.y < this.zhens.y + this.zhen1.y - 10) {
                this.zhen1.kill();
                if (this.mygongbingB1) {
                    this.mygongbingB1.kill();
                } else if (this.myqibingB1) {
                    this.myqibingB1.kill();
                } else if (this.mybubingB1) {
                    this.mybubingB1.kill();
                };
                //阵1里的兵
                this.mybubingB1 = this.mybubingGroup.create(this.zhens.x + this.zhen1.x - 20, this.zhens.y + this.zhen1.y - 40, "bubing");
                this.mybubingB1.scale.set(.2, .3);
                this.mybubingB1.position.set(525, 470);
                this.bubingReady();
            } else if (this.mybubing.x > this.zhens.x + this.zhen2.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen2.x + 10 &&
                this.mybubing.y > this.zhens.y + this.zhen2.y - 50 &&
                this.mybubing.y < this.zhens.y + this.zhen2.y - 10) {
                this.zhen2.kill();
                if (this.mygongbingB2) {
                    this.mygongbingB2.kill();
                } else if (this.myqibingB2) {
                    this.myqibingB2.kill();
                } else if (this.mybubingB2) {
                    this.mybubingB2.kill();
                };
                //阵2里的兵
                this.mybubingB2 = this.mybubingGroup.create(this.zhens.x + this.zhen2.x - 20, this.zhens.y + this.zhen2.y - 40, "bubing");
                this.mybubingB2.scale.set(.2, .3);
                this.mybubingB2.position.set(600, 470);
                this.bubingReady();
            } else if (this.mybubing.x > this.zhens.x + this.zhen3.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen3.x + 10 &&
                this.mybubing.y > this.zhens.y + this.zhen3.y - 50 &&
                this.mybubing.y < this.zhens.y + this.zhen3.y - 10) {
                this.zhen3.kill();
                if (this.mygongbingB3) {
                    this.mygongbingB3.kill();
                } else if (this.myqibingB3) {
                    this.myqibingB3.kill();
                } else if (this.mybubingB3) {
                    this.mybubingB3.kill();
                };
                //阵3里的兵
                this.mybubingB3 = this.mybubingGroup.create(this.zhens.x + this.zhen3.x - 10, this.zhens.y + this.zhen3.y - 40, "bubing");
                this.mybubingB3.scale.set(.2, .3);
                this.mybubingB3.position.set(675, 470);
                this.bubingReady();
            } else if (this.mybubing.x > this.zhens.x + this.zhen4.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen4.x + 10 &&
                this.mybubing.y > this.zhens.y + this.zhen4.y - 50 &&
                this.mybubing.y < this.zhens.y + this.zhen4.y - 10) {
                this.zhen4.kill();
                if (this.mygongbingB4) {
                    this.mygongbingB4.kill();
                } else if (this.myqibingB4) {
                    this.myqibingB4.kill();
                } else if (this.mybubingB4) {
                    this.mybubingB4.kill();
                };
                //阵4里的兵
                this.mybubingB4 = this.mybubingGroup.create(this.zhens.x + this.zhen4.x, this.zhens.y + this.zhen4.y - 40 + 20, "bubing");
                this.mybubingB4.scale.set(.25, .35);
                this.mybubingB4.position.set(510, 525);
                this.bubingReady();
            } else if (this.mybubing.x > this.zhens.x + this.zhen5.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen5.x + 10 &&
                this.mybubing.y > this.zhens.y + this.zhen5.y - 50 &&
                this.mybubing.y < this.zhens.y + this.zhen5.y - 10) {
                this.zhen5.kill();
                if (this.mygongbingB5) {
                    this.mygongbingB5.kill();
                } else if (this.myqibingB5) {
                    this.myqibingB5.kill();
                } else if (this.mybubingB5) {
                    this.mybubingB5.kill();
                };
                //阵5里的兵
                this.mybubingB5 = this.mybubingGroup.create(this.zhens.x + this.zhen5.x - 10, this.zhens.y + this.zhen5.y - 40 + 20, "bubing");
                this.mybubingB5.scale.set(.25, .35);
                this.mybubingB5.position.set(595, 525);
                this.bubingReady();
            } else if (this.mybubing.x > this.zhens.x + this.zhen6.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen6.x + 10 &&
                this.mybubing.y > this.zhens.y + this.zhen6.y - 50 &&
                this.mybubing.y < this.zhens.y + this.zhen6.y - 10) {
                this.zhen6.kill();
                if (this.mygongbingB6) {
                    this.mygongbingB6.kill();
                } else if (this.myqibingB6) {
                    this.myqibingB6.kill();
                } else if (this.mybubingB6) {
                    this.mybubingB6.kill();
                };
                //阵6里的兵
                this.mybubingB6 = this.mybubingGroup.create(this.zhens.x + this.zhen6.x - 20, this.zhens.y + this.zhen6.y - 40 + 20, "bubing");
                this.mybubingB6.scale.set(.25, .35);
                this.mybubingB6.position.set(680, 525);
                this.bubingReady();
            } else if (this.mybubing.x > this.zhens.x + this.zhen7.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen7.x + 40 &&
                this.mybubing.y > this.zhens.y + this.zhen7.y - 60 &&
                this.mybubing.y < this.zhens.y + this.zhen7.y + 20) {
                this.zhen7.kill();
                if (this.mygongbingB7) {
                    this.mygongbingB7.kill();
                } else if (this.myqibingB7) {
                    this.myqibingB7.kill();
                } else if (this.mybubingB7) {
                    this.mybubingB7.kill();
                } else if (this.mypaobingB7) {
                    this.mypaobingB7.kill();
                };
                this.mybubingB7 = this.mybubingGroup.create(this.zhens.x + this.zhen7.x + 10, this.zhens.y + this.zhen7.y - 40 + 20, "bubing");
                //阵7里的兵
                this.mybubingB7.scale.set(.35, .4);
                this.mybubingB7.position.set(490, 600);
                this.bubingReady();
            } else if (this.mybubing.x > this.zhens.x + this.zhen8.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen8.x + 40 &&
                this.mybubing.y > this.zhens.y + this.zhen8.y - 60 &&
                this.mybubing.y < this.zhens.y + this.zhen8.y + 20) {
                this.zhen8.kill();
                if (this.mygongbingB8) {
                    this.mygongbingB8.kill();
                } else if (this.myqibingB8) {
                    this.myqibingB8.kill();
                } else if (this.mybubingB8) {
                    this.mybubingB8.kill();
                } else if (this.mypaobingB8) {
                    this.mypaobingB8.kill();
                };
                this.mybubingB8 = this.mybubingGroup.create(this.zhens.x + this.zhen8.x, this.zhens.y + this.zhen8.y - 40 + 20, "bubing");
                //阵8里的兵
                this.mybubingB8.scale.set(.35, .4);
                this.mybubingB8.position.set(590, 600);
                this.bubingReady();
            } else if (this.mybubing.x > this.zhens.x + this.zhen9.x - 50 &&
                this.mybubing.x < this.zhens.x + this.zhen9.x + 40 &&
                this.mybubing.y > this.zhens.y + this.zhen9.y - 60 &&
                this.mybubing.y < this.zhens.y + this.zhen9.y + 20) {
                this.zhen9.kill();
                if (this.mygongbingB9) {
                    this.mygongbingB9.kill();
                } else if (this.myqibingB9) {
                    this.myqibingB9.kill();
                } else if (this.mybubingB9) {
                    this.mybubingB9.kill();
                } else if (this.mypaobingB9) {
                    this.mypaobingB9.kill();
                };
                this.mybubingB9 = this.mybubingGroup.create(this.zhens.x + this.zhen9.x, this.zhens.y + this.zhen9.y - 40 + 20, "bubing");
                //阵9里的兵
                this.mybubingB9.scale.set(.35, .4);
                this.mybubingB9.position.set(690, 600);
                this.bubingReady();
            }
            game.physics.enable(this.mybubingGroup, Phaser.Physics.ARCADE);
            this.mybubingGroup.callAll("animations.add", "animations", "attack", [0, 1, 2, 3, 4, 5], 6, true);
            this.mybubingGroup.callAll("animations.add", "animations", "wait", [6, 7, 8], 6, true);
            this.mybubingGroup.callAll("animations.play", "animations", "wait");
            this.mybubingGroup.setAll("angle", "-90");
            this.mybubing.x = 400;
            this.mybubing.y = game.height - 115;
            this.mybubing.alpha = 0; //0
        } else {
            return false
        }
    },
    //按下鼠标之后
    gongbingDownFunction: function() {
        if (this.gongbingBtnCan) {
            this.mygongbing.alpha = 1;
        } else {
            return false
        }
    },
    //抬起鼠标之后
    gongbingUpFunction: function() {
        if (this.gongbingBtnCan) {
            //弓兵按钮
            if (this.mygongbing.x > this.zhens.x + this.zhen1.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen1.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen1.y - 50 &&
                this.mygongbing.y < this.zhens.y + this.zhen1.y - 10) {
                this.zhen1.kill();
                if (this.mybubingB1) {
                    this.mybubingB1.kill();
                } else if (this.myqibingB1) {
                    this.myqibingB1.kill();
                } else if (this.mygongbingB1) {
                    this.mygongbingB1.kill();
                };
                //阵1里的兵
                this.mygongbingB1 = this.mygongbingGroup.create(this.zhens.x + this.zhen1.x, this.zhens.y + this.zhen1.y - 40, "gongbing");
                this.mygongbingB1.scale.set(.25, .4);
                this.mygongbingB1.position.set(530, 470);
                this.gongbingReady();

            } else if (this.mygongbing.x > this.zhens.x + this.zhen2.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen2.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen2.y - 50 &&
                this.mygongbing.y < this.zhens.y + this.zhen2.y - 10) {
                this.zhen2.kill();
                if (this.mybubingB2) {
                    this.mybubingB2.kill();
                } else if (this.myqibingB2) {
                    this.myqibingB2.kill();
                } else if (this.mygongbingB2) {
                    this.mygongbingB2.kill();
                };
                //阵2里的兵
                this.mygongbingB2 = this.mygongbingGroup.create(this.zhens.x + this.zhen2.x, this.zhens.y + this.zhen2.y - 40, "gongbing");
                this.mygongbingB2.scale.set(.25, .4);
                this.mygongbingB2.position.set(605, 470);
                this.gongbingReady();
            } else if (this.mygongbing.x > this.zhens.x + this.zhen3.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen3.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen3.y - 50 &&
                this.mygongbing.y < this.zhens.y + this.zhen3.y - 10) {
                this.zhen3.kill();
                if (this.mybubingB3) {
                    this.mybubingB3.kill();
                } else if (this.myqibingB3) {
                    this.myqibingB3.kill();
                } else if (this.mygongbingB3) {
                    this.mygongbingB3.kill();
                };
                //阵3里的兵
                this.mygongbingB3 = this.mygongbingGroup.create(this.zhens.x + this.zhen3.x, this.zhens.y + this.zhen3.y - 40, "gongbing");
                this.mygongbingB3.scale.set(.25, .4);
                this.mygongbingB3.position.set(680, 470);
                this.gongbingReady();
            } else if (this.mygongbing.x > this.zhens.x + this.zhen4.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen4.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen4.y - 50 &&
                this.mygongbing.y < this.zhens.y + this.zhen4.y - 10) {
                this.zhen4.kill();
                if (this.mybubingB4) {
                    this.mybubingB4.kill();
                } else if (this.myqibingB4) {
                    this.myqibingB4.kill();
                } else if (this.mygongbingB4) {
                    this.mygongbingB4.kill();
                };
                this.mygongbingB4 = this.mygongbingGroup.create(this.zhens.x + this.zhen4.x + 20, this.zhens.y + this.zhen4.y - 40 + 20, "gongbing");
                this.mygongbingB4.scale.set(.3, .45);
                this.mygongbingB4.position.set(515, 525);
                this.gongbingReady();
                //阵4里的兵

            } else if (this.mygongbing.x > this.zhens.x + this.zhen5.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen5.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen5.y - 50 &&
                this.mygongbing.y < this.zhens.y + this.zhen5.y - 10) {
                this.zhen5.kill();
                if (this.mybubingB5) {
                    this.mybubingB5.kill();
                } else if (this.myqibingB5) {
                    this.myqibingB5.kill();
                } else if (this.mygongbingB5) {
                    this.mygongbingB5.kill();
                };
                this.mygongbingB5 = this.mygongbingGroup.create(this.zhens.x + this.zhen5.x + 10, this.zhens.y + this.zhen5.y - 40 + 20, "gongbing");
                this.mygongbingB5.scale.set(.3, .45);
                this.mygongbingB5.position.set(605, 525);
                this.gongbingReady();
                //阵5里的兵

            } else if (this.mygongbing.x > this.zhens.x + this.zhen6.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen6.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen6.y - 50 &&
                this.mygongbing.y < this.zhens.y + this.zhen6.y - 10) {
                this.zhen6.kill();
                if (this.mybubingB6) {
                    this.mybubingB6.kill();
                } else if (this.myqibingB6) {
                    this.myqibingB6.kill();
                } else if (this.mygongbingB6) {
                    this.mygongbingB6.kill();
                };
                this.mygongbingB6 = this.mygongbingGroup.create(this.zhens.x + this.zhen6.x + 10, this.zhens.y + this.zhen6.y - 40 + 20, "gongbing");
                this.mygongbingB6.scale.set(.3, .45);
                this.mygongbingB6.position.set(690, 525);
                this.gongbingReady();
                //阵6里的兵

            } else if (this.mygongbing.x > this.zhens.x + this.zhen7.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen7.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen7.y - 60 &&
                this.mygongbing.y < this.zhens.y + this.zhen7.y + 20) {
                this.zhen7.kill();
                if (this.mybubingB7) {
                    this.mybubingB7.kill();
                } else if (this.myqibingB7) {
                    this.myqibingB7.kill();
                } else if (this.mygongbingB7) {
                    this.mygongbingB7.kill();
                } else if (this.mypaobingB7) {
                    this.mypaobingB7.kill();
                };
                this.mygongbingB7 = this.mygongbingGroup.create(this.zhens.x + this.zhen7.x + 30, this.zhens.y + this.zhen7.y - 40 + 30, "gongbing");
                this.mygongbingB7.scale.set(.4, .5);
                this.mygongbingB7.position.set(500, 600);
                this.gongbingReady();
                //阵7里的兵

            } else if (this.mygongbing.x > this.zhens.x + this.zhen8.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen8.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen8.y - 60 &&
                this.mygongbing.y < this.zhens.y + this.zhen8.y + 20) {
                this.zhen8.kill();
                if (this.mybubingB8) {
                    this.mybubingB8.kill();
                } else if (this.myqibingB8) {
                    this.myqibingB8.kill();
                } else if (this.mygongbingB8) {
                    this.mygongbingB8.kill();
                } else if (this.mypaobingB8) {
                    this.mypaobingB8.kill();
                };
                this.mygongbingB8 = this.mygongbingGroup.create(this.zhens.x + this.zhen8.x + 20, this.zhens.y + this.zhen8.y - 40 + 30, "gongbing");
                this.mygongbingB8.scale.set(.4, .5);
                this.mygongbingB8.position.set(600, 600);
                this.gongbingReady();
                //阵8里的兵
            } else if (this.mygongbing.x > this.zhens.x + this.zhen9.x - 30 &&
                this.mygongbing.x < this.zhens.x + this.zhen9.x + 40 &&
                this.mygongbing.y > this.zhens.y + this.zhen9.y - 60 &&
                this.mygongbing.y < this.zhens.y + this.zhen9.y + 20) {
                this.zhen9.kill();
                if (this.mybubingB9) {
                    this.mybubingB9.kill();
                } else if (this.myqibingB9) {
                    this.myqibingB9.kill();
                } else if (this.mygongbingB9) {
                    this.mygongbingB9.kill();
                } else if (this.mypaobingB9) {
                    this.mypaobingB9.kill();
                };
                this.mygongbingB9 = this.mygongbingGroup.create(this.zhens.x + this.zhen9.x + 20, this.zhens.y + this.zhen9.y - 40 + 30, "gongbing");
                this.mygongbingB9.scale.set(.4, .5);
                this.mygongbingB9.position.set(700, 600);
                this.gongbingReady();
                //阵9里的兵
            }
            game.physics.enable(this.mygongbingGroup, Phaser.Physics.ARCADE);
            this.mygongbingGroup.callAll("animations.add", "animations", "attack", [0, 1, 2, 3, 4], 6, true);
            this.mygongbingGroup.callAll("animations.add", "animations", "wait", [5, 6], 6, true);
            this.mygongbingGroup.callAll("animations.play", "animations", "wait");
            this.mygongbingGroup.setAll("angle", "-90");
            this.mygongbing.x = game.width / 2 - 100;
            this.mygongbing.y = game.height - 115;
            this.mygongbing.alpha = 0; //0
        } else {
            return false
        }
    },
    //按下鼠标之后
    qibingDownFunction: function() {
        if (this.qibingBtnCan) {
            this.myqibing.alpha = 1;
            this.myqibing.scale.setTo(0.5, 0.5);
        } else {
            return false
        }
    },
    //抬起鼠标之后
    qibingUpFunction: function() {
        if (this.qibingBtnCan) {
            //骑兵按钮
            if (this.myqibing.x > this.zhens.x + this.zhen1.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen1.x + 10 &&
                this.myqibing.y > this.zhens.y + this.zhen1.y - 50 &&
                this.myqibing.y < this.zhens.y + this.zhen1.y - 10) {
                this.zhen1.kill();
                if (this.myqibingB1) {
                    this.myqibingB1.kill();
                } else if (this.mybubingB1) {
                    this.mybubingB1.kill();
                } else if (this.mygongbingB1) {
                    this.mygongbingB1.kill();
                };
                //阵1里的兵
                this.myqibingB1 = this.myqibingGroup.create(this.zhens.x + this.zhen1.x - 20, this.zhens.y + this.zhen1.y - 40, "qibing");
                this.myqibingB1.scale.set(.2, .3);
                this.myqibingB1.position.set(535, 470);
                this.qibingReady();

            } else if (this.myqibing.x > this.zhens.x + this.zhen2.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen2.x + 10 &&
                this.myqibing.y > this.zhens.y + this.zhen2.y - 50 &&
                this.myqibing.y < this.zhens.y + this.zhen2.y - 10) {
                this.zhen2.kill();
                if (this.myqibingB2) {
                    this.myqibingB2.kill();
                } else if (this.mybubingB2) {
                    this.mybubingB2.kill();
                } else if (this.mygongbingB2) {
                    this.mygongbingB2.kill();
                };
                //阵2里的兵
                this.myqibingB2 = this.myqibingGroup.create(this.zhens.x + this.zhen2.x - 10, this.zhens.y + this.zhen2.y - 40, "qibing");
                this.myqibingB2.scale.set(.2, .3);
                this.myqibingB2.position.set(610, 470);
                this.qibingReady();
            } else if (this.myqibing.x > this.zhens.x + this.zhen3.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen3.x + 10 &&
                this.myqibing.y > this.zhens.y + this.zhen3.y - 50 &&
                this.myqibing.y < this.zhens.y + this.zhen3.y - 10) {
                this.zhen3.kill();
                if (this.myqibingB3) {
                    this.myqibingB3.kill();
                } else if (this.mybubingB3) {
                    this.mybubingB3.kill();
                } else if (this.mygongbingB3) {
                    this.mygongbingB3.kill();
                };
                //阵3里的兵
                this.myqibingB3 = this.myqibingGroup.create(this.zhens.x + this.zhen3.x - 10, this.zhens.y + this.zhen3.y - 40, "qibing");
                this.myqibingB3.scale.set(.2, .3);
                this.myqibingB3.position.set(685, 470);
                this.qibingReady();
            } else if (this.myqibing.x > this.zhens.x + this.zhen4.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen4.x + 10 &&
                this.myqibing.y > this.zhens.y + this.zhen4.y - 50 &&
                this.myqibing.y < this.zhens.y + this.zhen4.y - 10) {
                this.zhen4.kill();
                if (this.myqibingB4) {
                    this.myqibingB4.kill();
                } else if (this.mybubingB4) {
                    this.mybubingB4.kill();
                } else if (this.mygongbingB4) {
                    this.mygongbingB4.kill();
                };
                this.myqibingB4 = this.myqibingGroup.create(this.zhens.x + this.zhen4.x, this.zhens.y + this.zhen4.y - 40 + 20, "qibing");
                this.myqibingB4.scale.set(.2, .35);
                this.myqibingB4.position.set(520, 525);
                this.qibingReady();
                //阵4里的兵

            } else if (this.myqibing.x > this.zhens.x + this.zhen5.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen5.x + 10 &&
                this.myqibing.y > this.zhens.y + this.zhen5.y - 50 &&
                this.myqibing.y < this.zhens.y + this.zhen5.y - 10) {
                this.zhen5.kill();
                if (this.myqibingB5) {
                    this.myqibingB5.kill();
                } else if (this.mybubingB5) {
                    this.mybubingB5.kill();
                } else if (this.mygongbingB5) {
                    this.mygongbingB5.kill();
                };
                this.myqibingB5 = this.myqibingGroup.create(this.zhens.x + this.zhen5.x - 10, this.zhens.y + this.zhen5.y - 40 + 20, "qibing");
                this.myqibingB5.scale.set(.2, .35);
                this.myqibingB5.position.set(605, 525);
                this.qibingReady();
                //阵5里的兵

            } else if (this.myqibing.x > this.zhens.x + this.zhen6.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen6.x + 10 &&
                this.myqibing.y > this.zhens.y + this.zhen6.y - 50 &&
                this.myqibing.y < this.zhens.y + this.zhen6.y - 10) {
                this.zhen6.kill();
                if (this.myqibingB6) {
                    this.myqibingB6.kill();
                } else if (this.mybubingB6) {
                    this.mybubingB6.kill();
                } else if (this.mygongbingB6) {
                    this.mygongbingB6.kill();
                };
                this.myqibingB6 = this.myqibingGroup.create(this.zhens.x + this.zhen6.x - 20, this.zhens.y + this.zhen6.y - 40 + 20, "qibing");
                this.myqibingB6.scale.set(.2, .35);
                this.myqibingB6.position.set(690, 525);
                this.qibingReady();
                //阵6里的兵

            } else if (this.myqibing.x > this.zhens.x + this.zhen7.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen7.x + 40 &&
                this.myqibing.y > this.zhens.y + this.zhen7.y - 60 &&
                this.myqibing.y < this.zhens.y + this.zhen7.y + 20) {
                this.zhen7.kill();
                if (this.myqibingB7) {
                    this.myqibingB7.kill();
                } else if (this.mybubingB7) {
                    this.mybubingB7.kill();
                } else if (this.mygongbingB7) {
                    this.mygongbingB7.kill();
                } else if (this.mypaobingB7) {
                    this.mypaobingB7.kill();
                };
                this.myqibingB7 = this.myqibingGroup.create(this.zhens.x + this.zhen7.x + 10, this.zhens.y + this.zhen7.y - 40 + 20, "qibing");
                this.myqibingB7.scale.set(.3, .4);
                this.myqibingB7.position.set(500, 600);
                this.qibingReady();
                //阵7里的兵

            } else if (this.myqibing.x > this.zhens.x + this.zhen8.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen8.x + 40 &&
                this.myqibing.y > this.zhens.y + this.zhen8.y - 60 &&
                this.myqibing.y < this.zhens.y + this.zhen8.y + 20) {
                this.zhen8.kill();
                if (this.myqibingB8) {
                    this.myqibingB8.kill();
                } else if (this.mybubingB8) {
                    this.mybubingB8.kill();
                } else if (this.mygongbingB8) {
                    this.mygongbingB8.kill();
                } else if (this.mypaobingB8) {
                    this.mypaobingB8.kill();
                };
                this.myqibingB8 = this.myqibingGroup.create(this.zhens.x + this.zhen8.x, this.zhens.y + this.zhen8.y - 40 + 20, "qibing");
                this.myqibingB8.scale.set(.3, .4);
                this.myqibingB8.position.set(600, 600);
                this.qibingReady();
                //阵8里的兵

            } else if (this.myqibing.x > this.zhens.x + this.zhen9.x - 50 &&
                this.myqibing.x < this.zhens.x + this.zhen9.x + 40 &&
                this.myqibing.y > this.zhens.y + this.zhen9.y - 60 &&
                this.myqibing.y < this.zhens.y + this.zhen9.y + 20) {
                this.zhen9.kill();
                if (this.myqibingB9) {
                    this.myqibingB9.kill();
                } else if (this.mybubingB9) {
                    this.mybubingB9.kill();
                } else if (this.mygongbingB9) {
                    this.mygongbingB9.kill();
                } else if (this.mypaobingB9) {
                    this.mypaobingB9.kill();
                };
                this.myqibingB9 = this.myqibingGroup.create(this.zhens.x + this.zhen9.x, this.zhens.y + this.zhen9.y - 40 + 20, "qibing");
                this.myqibingB9.scale.set(.3, .4);
                this.myqibingB9.position.set(700, 600);
                this.qibingReady();
                //阵9里的兵

            }
            game.physics.enable(this.myqibingGroup, Phaser.Physics.ARCADE);
            this.myqibing.scale.setTo(0.4, 0.5);
            this.myqibingGroup.callAll("animations.add", "animations", "attack", [0, 1, 2], 6, true);
            this.myqibingGroup.callAll("animations.add", "animations", "wait", [3, 4], 6, true);
            this.myqibingGroup.callAll("animations.play", "animations", "wait");
            this.myqibingGroup.setAll("angle", "-90");
            this.myqibing.x = 630;
            this.myqibing.y = game.height - 115;
            this.myqibing.alpha = 0;
        } else {
            return false
        }
    },

    //按下鼠标之后炮兵
    paobingDownFunction: function() {
        if (this.paobingBtnCan) {
            for (var i = 1; i < 7; i++) {
                this[`zhen${i}`].kill();
            }
            this.mypaobing.alpha = 1;
            this.mypaobing.scale.setTo(0.5, 0.5);
        } else {
            return false
        }
    },
    // 抬起鼠标之后炮兵
    paobingUpFunction: function() {
        this.zhen1 = this.zhens.create(48, 116, "zhen1");
        this.zhen2 = this.zhens.create(123, 116, "zhen2");
        this.zhen3 = this.zhens.create(196, 116, "zhen3");
        this.zhen4 = this.zhens.create(28, 158, "zhen4");
        this.zhen5 = this.zhens.create(117, 158, "zhen5");
        this.zhen6 = this.zhens.create(202, 158, "zhen6");

        if (this.paobingBtnCan) {
            if (this.mypaobing.x > this.zhens.x + this.zhen7.x + 50 &&
                this.mypaobing.x < this.zhens.x + this.zhen7.x + 140 &&
                this.mypaobing.y > this.zhens.y + this.zhen7.y - 60 &&
                this.mypaobing.y < this.zhens.y + this.zhen7.y + 20) {
                this.zhen7.kill();
                if (this.myqibingB7) {
                    this.myqibingB7.kill();
                } else if (this.mybubingB7) {
                    this.mybubingB7.kill();
                } else if (this.mygongbingB7) {
                    this.mygongbingB7.kill();
                } else if (this.mypaobingB7) {
                    this.mypaobingB7.kill();
                };
                this.mypaobingB7 = this.mypaobingGroup.create(this.zhens.x + this.zhen7.x + 10, this.zhens.y + this.zhen7.y - 40 + 20, "paobing");
                this.mypaobingB7.scale.set(.4, .4);
                this.mypaobingB7.position.set(500, 520);
                this.paobingReady();
                //阵7里的兵

            } else if (this.mypaobing.x > this.zhens.x + this.zhen8.x + 50 &&
                this.mypaobing.x < this.zhens.x + this.zhen8.x + 140 &&
                this.mypaobing.y > this.zhens.y + this.zhen8.y - 60 &&
                this.mypaobing.y < this.zhens.y + this.zhen8.y + 20) {
                this.zhen8.kill();
                if (this.myqibingB8) {
                    this.myqibingB8.kill();
                } else if (this.mybubingB8) {
                    this.mybubingB8.kill();
                } else if (this.mygongbingB8) {
                    this.mygongbingB8.kill();
                } else if (this.mypaobingB8) {
                    this.mypaobingB8.kill();
                };
                this.mypaobingB8 = this.mypaobingGroup.create(this.zhens.x + this.zhen8.x, this.zhens.y + this.zhen8.y - 40 + 20, "paobing");
                this.mypaobingB8.scale.set(.4, .4);
                this.mypaobingB8.position.set(600, 520);
                this.paobingReady();
                //阵8里的兵

            } else if (this.mypaobing.x > this.zhens.x + this.zhen9.x + 50 &&
                this.mypaobing.x < this.zhens.x + this.zhen9.x + 140 &&
                this.mypaobing.y > this.zhens.y + this.zhen9.y - 60 &&
                this.mypaobing.y < this.zhens.y + this.zhen9.y + 20) {
                this.zhen9.kill();
                if (this.myqibingB9) {
                    this.myqibingB9.kill();
                } else if (this.mybubingB9) {
                    this.mybubingB9.kill();
                } else if (this.mygongbingB9) {
                    this.mygongbingB9.kill();
                } else if (this.mypaobingB9) {
                    this.mypaobingB9.kill();
                };
                this.mypaobingB9 = this.mypaobingGroup.create(this.zhens.x + this.zhen9.x, this.zhens.y + this.zhen9.y - 40 + 20, "paobing");
                this.mypaobingB9.scale.set(.4, .4);
                this.mypaobingB9.position.set(700, 520);
                this.paobingReady();
                //阵9里的兵

            }
            game.physics.enable(this.mypaobingGroup, Phaser.Physics.ARCADE);
            this.mypaobing.scale.setTo(0.4, 0.5);
            // this.mypaobingGroup.callAll("animations.add", "animations", "attack", [0, 1, 2], 6, true);
            // this.mypaobingGroup.callAll("animations.add", "animations", "wait", [3, 4], 6, true);
            this.mypaobingGroup.callAll("animations.play", "animations", "wait");
            // this.mypaobingGroup.setAll("angle", "-90");
            this.mypaobing.x = 845;
            this.mypaobing.y = game.height - 130;
            this.mypaobing.alpha = 0;
        } else {
            return false
        }
    },
    // 步兵放置完能量扣除
    bubingReady: function() {
        this.scoreBoardnum -= 2;
        this.scoreBoardText.text = "x" + this.scoreBoardnum;
        this.addQuake();
    },
    // 弓兵放置完能量扣除
    gongbingReady: function() {
        this.scoreBoardnum -= 2;
        this.scoreBoardText.text = "x" + this.scoreBoardnum;
        this.addQuake();
    },
    // 骑兵放置完能量扣除
    qibingReady: function() {
        this.scoreBoardnum -= 3;
        this.scoreBoardText.text = "x" + this.scoreBoardnum;
        this.addQuake();
    },
    // 炮兵放置完能量扣除
    paobingReady: function() {
        this.scoreBoardnum -= 5;
        this.scoreBoardText.text = "x" + this.scoreBoardnum;
        this.addQuake();
    },
    addQuake: function() {
        // rumble是隆隆作响的意思，这里rumbleOffset指地震的振幅
        var rumbleOffset = 5;
        // 设置tween的参数
        var properties = {
            x: game.camera.x - rumbleOffset
        };
        var duration = 50;
        var repeat = 10;
        var ease = Phaser.Easing.Bounce.InOut;
        var autoStart = false;
        var delay = 0;
        var yoyo = true;
        // 给相机一个动画
        var quake = game.add.tween(game.camera).to(properties, duration, ease, autoStart, delay, 2, yoyo);
        // 开始动画
        quake.start();
    }
}
game.MyStates.win = {
    create: function() {
        this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
        this.scoreBoard = game.add.image(120, 5, "scoreBoard");
        this.scoreBoardnum = 20;
        this.scoreBoardText = game.add.text(205, 45, "x" + this.scoreBoardnum, {
            fill: '#fff',
            fontSize: '40px'
        });

        this.bubingBtn = game.add.sprite(400, game.height - 110, "bubingBtn");
        this.gongbingBtn = game.add.sprite(520, game.height - 110, "gongbingBtn");
        this.qibingBtn = game.add.sprite(game.width / 2, game.height - 110, "qibingBtn");
        this.paobingBtn = game.add.sprite(760, game.height - 110, "paobingBtn");
        this.attack = game.add.button(game.width - 260, game.height - 170, "attack", this.onAttackClick, this);
        this.zhens = game.add.group();
        this.zhen1 = this.zhens.create(48, 116, "zhen1");
        this.zhen2 = this.zhens.create(123, 116, "zhen2");
        this.zhen3 = this.zhens.create(196, 116, "zhen3");
        this.zhen4 = this.zhens.create(28, 158, "zhen4");
        this.zhen5 = this.zhens.create(117, 158, "zhen5");
        this.zhen6 = this.zhens.create(202, 158, "zhen6");
        this.zhen7 = this.zhens.create(0, 216, "zhen7");
        this.zhen8 = this.zhens.create(111, 216, "zhen8");
        this.zhen9 = this.zhens.create(210, 216, "zhen9");
        this.zhens.x = game.width / 2 - 160;
        this.zhens.y = game.height - 410;
        this.lose = game.add.image(game.width / 2 - 665 / 2, 50, "win");
        this.install = game.add.button(game.width / 2 - 240, 380, 'install', function() {
            mraid.open('https://itunes.apple.com/us/app/lords-mobile/id1071976327?mt=8m');
            // window.location.href = "https://itunes.apple.com/us/app/lords-mobile/id1071976327?mt=8m";
        }, this, 1, 1, 0, 1);
        this.restart = game.add.button(game.width / 2, 380, "restart", this.onResetClick, this);
    },
    //重置按钮事件
    onResetClick: function() {
        game.state.start('loader');
    }
}
game.MyStates.lose = {
    create: function() {
        this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
        this.scoreBoard = game.add.image(120, 5, "scoreBoard");
        this.scoreBoardnum = 20;
        this.scoreBoardText = game.add.text(205, 45, "x" + this.scoreBoardnum, {
            fill: '#fff',
            fontSize: '40px'
        });

        this.bubingBtn = game.add.sprite(400, game.height - 110, "bubingBtn");
        this.gongbingBtn = game.add.sprite(520, game.height - 110, "gongbingBtn");
        this.qibingBtn = game.add.sprite(game.width / 2, game.height - 110, "qibingBtn");
        this.paobingBtn = game.add.sprite(760, game.height - 110, "paobingBtn");
        this.attack = game.add.button(game.width - 260, game.height - 170, "attack", this.onAttackClick, this);
        this.zhens = game.add.group();
        this.zhen1 = this.zhens.create(48, 116, "zhen1");
        this.zhen2 = this.zhens.create(123, 116, "zhen2");
        this.zhen3 = this.zhens.create(196, 116, "zhen3");
        this.zhen4 = this.zhens.create(28, 158, "zhen4");
        this.zhen5 = this.zhens.create(117, 158, "zhen5");
        this.zhen6 = this.zhens.create(202, 158, "zhen6");
        this.zhen7 = this.zhens.create(0, 216, "zhen7");
        this.zhen8 = this.zhens.create(111, 216, "zhen8");
        this.zhen9 = this.zhens.create(210, 216, "zhen9");
        this.zhens.x = game.width / 2 - 160;
        this.zhens.y = game.height - 410;
        this.lose = game.add.image(game.width / 2 - 665 / 2, 50, "lose");
        this.install = game.add.button(game.width / 2 - 240, 380, 'install', function() {
            mraid.open('https://itunes.apple.com/us/app/lords-mobile/id1071976327?mt=8m');
            // window.location.href = "https://itunes.apple.com/us/app/lords-mobile/id1071976327?mt=8m";
        }, this, 1, 1, 0, 1);
        this.restart = game.add.button(game.width / 2, 380, "restart", this.onResetClick, this);
    },
    //重置按钮事件
    onResetClick: function() {
        game.state.start('loader');
    }
}

game.state.add('boot', game.MyStates.boot); //基础
game.state.add('loader', game.MyStates.loader); //加载
game.state.add('begin', game.MyStates.begin); //开始
game.state.add('win', game.MyStates.win); //赢了
game.state.add('lose', game.MyStates.lose); //输了
game.state.start('boot'); //启动场景