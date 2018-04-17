var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', '../images/background-gradient.svg')
    this.load.image('arrow', '../images/arrow.png')
    this.load.image('bike', '../images/bike-vector-full.png')
    this.load.image('wheel', '../images/wheel.png')
    this.load.image('brake', '../images/disc-brake-logo.png')
  },
  //executed after everything is loaded
  create: function() {

    console.log('hello strava');
    // consider refactoring all these create statements
    // make a function that takes the x, y, and image name
    // and does the pixelPerfectClick, ect... in it.
    // Also write a func for setting/getting the customParams

    // need to use local storage to keep last clicked bike part,
    // and read from there to rewrite it to the db.


    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true

    this.background = this.game.add.sprite(0, 0, 'background')

    //load bike
    this.bike = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bike')
    this.bike.anchor.setTo(0.5)
    this.bike.inputEnabled = true;
    this.bike.input.pixelPerfectClick = true;

    //stats will be pulled in from db and written here
    this.bike.customParams = {
      health: 99,
      distance: 1200,
      lifespan: 5000
    }
    this.start(this.bike, 'input', this.bike)

    //load wheel
    this.wheel = this.game.add.sprite(this.game.world.centerX + 183, this.game.world.centerY + 66, 'wheel')
    this.wheel.anchor.setTo(0.5)
    //stats will be pulled in from db and written here
    this.wheel.customParams = {
      health: 10,
      distance: 600,
      lifespan: 500
    }
    this.start(this.wheel, 'input', this.wheel)

    //load brake
    this.brake = this.game.add.sprite(this.game.world.centerX - 184, this.game.world.centerY + 66, 'brake')
    this.brake.anchor.setTo(0.5)
    this.brake.scale.setTo(0.04)

    //stats will be pulled in from db and written here
    this.brake.customParams = {
      health: 100,
      distance: 0,
      lifespan: 5000
    }
    this.start(this.brake, 'input', this.brake)

    //adds back arrow
    this.arrow = this.game.add.sprite(this.game.world.centerX - 330, this.game.world.centerY - 200, 'arrow')
    this.arrow.anchor.setTo(0.5)
    this.arrow.scale.x = -1
    backText = game.add.text(0, 0, "Back!", this.arrow);
    backText.addColor('#ffffff')
    backText.anchor.set(0.5);
    this.start(this.arrow, 'back', this.arrow)

    //adds fixed button
    this.fixed = this.game.add.sprite(this.game.world.centerX + 330, this.game.world.centerY - 200, 'arrow')
    this.fixed.anchor.setTo(0.5)
    fixedText = game.add.text(0, 0, "Fixed!", this.fixed);
    fixedText.anchor.set(0.5);
    this.start(this.fixed, 'fixed', this.fixed)
  },

  update: function() {
    //wheels spinnin'
    this.wheel.angle += .5
    //text sticks to arrow
    backText.x = Math.floor(this.arrow.x + 8);
    backText.y = Math.floor(this.arrow.y + 2);

    fixedText.x = Math.floor(this.fixed.x - 8);
    fixedText.y = Math.floor(this.fixed.y + 2);


  },

  writeBikeStats: function(part) {
    console.log(part);

    let obj = {
      'distance': part.customParams.distance,
      'health': part.customParams.health,
      'lifespan':part.customParams.lifespan,
      name:part.key
    }

    hpLabel = this.game.add.text(this.game.world.centerX - 150, 20, `Health: ${obj.health}`, {
      font: '24px Arial',
      fill: '#000'
    })
    distLabel = this.game.add.text(this.game.world.centerX + 50, 60, `Distance: ${obj.distance}`, {
      font: '24px Arial',
      fill: '#000'
    })
    lifespanLabel = this.game.add.text(this.game.world.centerX - 150, 60, `Wear: ${(obj.distance / obj.lifespan)*100}  %`, {
      font: '24px Arial',
      fill: '#000'
    })

    localStorage.setItem('partObj', JSON.stringify(obj))

  },

  fixBikeStats: function() {

    let partObj = JSON.parse(localStorage.getItem('partObj'))

    partObj.distance = 0
    partObj.health = 100

    console.log(partObj)
    //write new stats to db


  },

  back: function() {
    hpLabel.destroy()
    lifespanLabel.destroy()
    distLabel.destroy()
  },

  start: function(btn, string, activePart) {
    btn.inputEnabled = true;
    btn.input.pixelPerfectClick = true;
    if (string === 'back') btn.events.onInputDown.add(this.back, this)
    if (string === 'input') btn.events.onInputDown.add(this.writeBikeStats, this)
    if (string === 'fixed') btn.events.onInputDown.add(this.fixBikeStats, this)
  },

};

let game = new Phaser.Game(800, 600, Phaser.AUTO)

game.state.add('GameState', GameState);
game.state.start('GameState');
