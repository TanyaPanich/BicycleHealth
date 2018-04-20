var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', '../images/background-gradient.svg')
    this.load.image('Arrow', '../images/arrow.png')
    this.load.image('Bike', '../images/bike-vector-full.png')
    this.load.image('Wheel', '../images/wheel.png')
    this.load.image('Brake', '../images/disc-brake-logo.png')
    this.load.image('Seat', '../images/seat.png')
    this.load.image('Chain', '../images/chain.png')
    this.load.image('Pedal', '../images/pedal.png')
    this.load.image('Handlebars', '../images/handlebars.png')
    this.load.image('Chainring', '../images/chainring.png')
  },

  //executed after everything is loaded
  create: function() {

    //sets world defaults
    console.log('hello strava');
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.background = this.game.add.sprite(0, 0, 'background')


    //load bike
    this.bike = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'Bike')
    this.bike.anchor.setTo(0.5)

    //stats will be pulled in from db and written here
    // this.bike customParams = db shenanigans here
    this.bike.customParams = {
      health: 99,
      distance: 1200,
      lifespan: 5000
    }
    this.start(this.bike, 'input', this.bike)

    //load wheel
    this.wheel = this.game.add.sprite(this.game.world.centerX + 183, this.game.world.centerY + 66, 'Wheel')
    this.wheel.anchor.setTo(0.5)
    //stats will be pulled in from db and written here
    this.wheel.customParams = {
      health: 10,
      distance: 600,
      lifespan: 500
    }
    this.start(this.wheel, 'input', this.wheel)

    //load brake
    this.brake = this.game.add.sprite(this.game.world.centerX - 184, this.game.world.centerY + 66, 'Brake')
    this.brake.anchor.setTo(0.5)
    this.brake.scale.setTo(0.04)
    //stats will be pulled in from db and written here
    this.brake.customParams = {
      health: 100,
      distance: 0,
      lifespan: 5000
    }
    this.start(this.brake, 'input', this.brake)

    //load handlebars
    this.handlebars = this.game.add.sprite(this.game.world.centerX + 104, this.game.world.centerY - 154, 'Handlebars')
    this.handlebars.anchor.setTo(0.5)
    //stats will be pulled in from db and written here
    this.handlebars.customParams = {
      health: 100,
      distance: 1500,
      lifespan: 15000
    }
    this.start(this.handlebars, 'input', this.handlebars)
    // this.healthGlow(this.handlebars)

    //load seat
    this.seat = this.game.add.sprite(this.game.world.centerX - 104, this.game.world.centerY - 150, 'Seat')
    this.seat.anchor.setTo(0.5)
    //stats will be pulled in from db and written here
    this.seat.customParams = {
      health: 11,
      distance: 1500,
      lifespan: 15000
    }
    this.start(this.seat, 'input', this.seat)
    // this.healthGlow(this.seat)

    //load chain
    this.chain = this.game.add.sprite(this.game.world.centerX - 124, this.game.world.centerY + 84, 'Chain')
    this.chain.anchor.setTo(0.5)
    //stats will be pulled in from db and written here
    this.chain.customParams = {
      health: 100,
      distance: 15000,
      lifespan: 15000
    }
    this.start(this.chain, 'input', this.chain)
    // this.healthGlow(this.chain)

    //load pedal
    this.pedal = this.game.add.sprite(this.game.world.centerX - 6, this.game.world.centerY + 144, 'Pedal')
    this.pedal.anchor.setTo(0.5)
    //stats will be pulled in from db and written here
    this.pedal.customParams = {
      health: 111,
      distance: 1555,
      lifespan: 15000
    }
    this.start(this.pedal, 'input', this.pedal)

    //load chainring
    this.chainring = this.game.add.sprite(this.game.world.centerX - 36, this.game.world.centerY + 90, 'Chainring')
    this.chainring.anchor.setTo(0.5)
    //stats will be pulled in from db and written here
    this.chainring.customParams = {
      health: 11,
      distance: 1500,
      lifespan: 15000
    }
    this.start(this.chainring, 'input', this.chainring)

    //adds back arrow
    // this.arrow = this.game.add.sprite(this.game.world.centerX - 330, this.game.world.centerY - 200, 'Arrow')
    // this.arrow.anchor.setTo(0.5)
    // this.arrow.scale.x = -1
    // backText = game.add.text(0, 0, "Back!", this.arrow)
    // backText.anchor.set(0.5)
    // this.start(this.arrow, 'back', this.arrow)

    //adds fixed button
    this.fixed = this.game.add.sprite(this.game.world.centerX + 330, this.game.world.centerY - 200, 'Arrow')
    this.fixed.anchor.setTo(0.5)
    fixedText = game.add.text(0, 0, "Fixed!", this.fixed);
    fixedText.anchor.set(0.5)
    this.start(this.fixed, 'fixed', this.fixed)
  },

  update: function() {
    //wheels spinnin'
    this.wheel.angle += .5
    //text sticks to arrow
    // backText.x = Math.floor(this.arrow.x + 8)
    // backText.y = Math.floor(this.arrow.y + 2)

    fixedText.x = Math.floor(this.fixed.x - 8)
    fixedText.y = Math.floor(this.fixed.y + 2)
  },

  writeBikeStats: function(part) {
    let obj = {
      'distance': part.customParams.distance,
      'health': part.customParams.health,
      'lifespan': part.customParams.lifespan,
      name: part.key
    }

    // hpLabel = this.game.add.text(this.game.world.centerX - 150, 20, `Health: ${obj.health}`, {
    //   font: '24px Arial',
    //   fill: '#000'
    // })
    // distLabel = this.game.add.text(this.game.world.centerX + 50, 60, `Distance: ${obj.distance}`, {
    //   font: '24px Arial',
    //   fill: '#000'
    // })
    // lifespanLabel = this.game.add.text(this.game.world.centerX - 150, 60, `Wear: ${(obj.distance / obj.lifespan)*100}  %`, {
    //   font: '24px Arial',
    //   fill: '#000'
    // })

    localStorage.setItem('partObj', JSON.stringify(obj))
    this.getBikeStats()
  },

  // healthGlow: function(part) {
  //   console.log(part);
  //   shadow = game.add.sprite(game.world.centerX, game.world.centerY, part.key);
  //   shadow.anchor.set(0.5);
  //   shadow.tint = '#46ff13';
  //   shadow.alpha = 0.5;
  // },

  getBikeStats: function() {

    let partObj = JSON.parse(localStorage.getItem('partObj'))

    console.log(partObj.health)
    console.log(partObj.distance)
    console.log(partObj.lifespan)
    console.log(partObj.name)
    //writes stats to html below phaser iframe
    let parts = parent.document.getElementById('partHealth')
    console.log(parts)
    $(parts).html(`Displaying: <b>${partObj.name}</b> <br> Distance since ${partObj.name} changed: ${partObj.distance} mi. <br> Suggested Distance until next swap: ${partObj.lifespan - partObj.distance}<br> Or, roughly ${(partObj.lifespan - partObj.distance) / (.125)} furlongs.`)
  },

  //resets the stats on a part in phaser, shows it below phaser iframe
  fixBikeStats: function() {
    let partObj = JSON.parse(localStorage.getItem('partObj'))

    partObj.distance = 0
    partObj.health = 100

    console.log(partObj.health)
    console.log(partObj.distance)
    console.log(partObj.lifespan)
    console.log(partObj.name)

    // shows it below phaser iframe
    let parts = parent.document.getElementById('partHealth')
    console.log(parts)
    $(parts).html(`Displaying: <b>${partObj.name}</b> <br> Distance since ${partObj.name} changed: ${partObj.distance} mi. <br> Suggested Distance until next swap: ${partObj.lifespan - partObj.distance}`)
  },

  // back: function() {
  //   hpLabel.destroy()
  //   lifespanLabel.destroy()
  //   distLabel.destroy()
  // },

  //adds click events to buttons
  start: function(btn, string, activePart) {
    btn.inputEnabled = true;
    btn.input.pixelPerfectClick = true;
    if (string === 'back') btn.events.onInputDown.add(this.back, this)
    if (string === 'input') btn.events.onInputDown.add(this.writeBikeStats, this)
    if (string === 'fixed') btn.events.onInputDown.add(this.fixBikeStats, this)
  },

};


//inits game size and engine.
let game = new Phaser.Game(800, 800, Phaser.AUTO)

//adds gamestates and starts game
game.state.add('GameState', GameState)
game.state.start('GameState')
