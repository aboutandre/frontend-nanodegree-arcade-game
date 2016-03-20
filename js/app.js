// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  // When enemies reach the end of the screen they loop back to the beginning
  if (this.x > 6 * 83) {
    this.resetEnemy();
  }
  // Check for collision with objects or enemies
  checkCollision(this);
};
Enemy.prototype.resetEnemy = function() {
  this.col = -1;
  this.row = randomInt(1, 3);
  this.x = squareWidth * this.col;
  this.y = squareHeight * this.row;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
}

// Draws the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // Shows the current score below the canvas
  displayScoreLevel(score, gameLevel);

};
// Function to display player's score
var displayScoreLevel = function(aScore, aLevel) {
  var canvas = document.getElementsByTagName('canvas');
  var firstCanvasTag = canvas[0];

  Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
      player.x -= player.speed;
    }
    if (keyPress == 'up') {
      player.y -= player.speed;
    }
    if (keyPress == 'right') {
      player.x += player.speed;
    }
    if (keyPress == 'down') {
      player.y += player.speed;
    }
  };
  // Creates a div with the score and levels
  scoreLevelDiv.innerHTML = 'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;
  document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

// Checks if player collided with an enemy
var checkCollision = function(anEnemy) {
  if (
    player.y + 131 >= anEnemy.y + 90 && player.x + 25 <= anEnemy.x + 88 && player.y + 73 <= anEnemy.y + 135 && player.x + 76 >= anEnemy.x + 11) {
    player.x = 202.5;
    player.y = 383;
    console.log('Bummer! Those nasty bugs got you!');
  }

  // This checks to see if the player reached the top of the canvas
  // if yes, increase the score and level
  // 'cause the player is rocking those bugs out of their socks!
  if (player.y + 63 <= 0) {
    player.x = 202.5;
    player.y = 383;
    console.log('Awesome! You are a real bug dodger!');
// This covers the top of the player head when he/she finishes the level
    ctx.fillStyle = '#fcfcfc';
    ctx.fillRect(0, 0, 505, 171);

    score += 1;
    gameLevel += 1;
    console.log('Current score: ' + score + ', Current level: ' + gameLevel + '.\nKeep on rocking! Those bugs got nothing on you!');
    increaseDifficulty(score);

  }

  // Check to see if player is inside the canvas' walls
  // Keeps the player from moving beyond the canvas
  if (player.y > 383) {
    player.y = 383;
  }
  if (player.x > 402.5) {
    player.x = 402.5;
  }
  if (player.x < 2.5) {
    player.x = 2.5;
  }
};

// If the player completes the level. The dificulty increases
var increaseDifficulty = function(numEnemies) {
  allEnemies.length = 0;

  // Load more enemies base on the new dificulty
  for (var i = 0; i <= numEnemies; i++) {
    var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

    allEnemies.push(enemy);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// The enemy is placed somewhere in the valid rows above grass and below water
// Declaring score and level variables to store score and level
var allEnemies = [];

for (var row = 1; row <= enemyRows; row++) {
  for (var x = 1; x <= enemiesPerRow; x++) {
    var randomColumn = Math.floor((Math.random() * 4) + -1);
    var randomSpeed = Math.floor((Math.random() * 200) + 150);
    var enemy = new Enemy(randomColumn * squareWidth, row * squareHeight, randomSpeed);
    allEnemies.push(enemy);
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Global variables
var player = new Player(202.5, 383, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
scoreLevelDiv.className = 'score';
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

//Board settings
var boardRows = 6;
var boardColumns = 5;
var enemyRows = boardRows - 3;
var enemiesPerRow = 2;
var squareWidth = 101;
var squareHeight = 83;

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
  console.log('Player pressed: ' + allowedKeys[e.keyCode]);
});
