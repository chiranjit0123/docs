const canvas = document.getElementById("canvas1");
let leftDirection = document.getElementById("moveleft");
let rightDirection = document.getElementById("moveright");

const ctx = canvas.getContext("2d");
const playerMoveImgArray = new Array(12);
const playerIdleImgArray = new Array(12);
const playerAttackImgArray = new Array(18);

const enemyWalkArray = new Array();

const ground = new Image();

canvas.height = innerHeight/2;
canvas.width = innerWidth;

const playerspeed = 4;
let enemyspeed = 0;
let playerframe = 0;
let playerwidth = 100;
let playerheight = 100;
let groundwidth = canvas.width/3;
let groundheight = canvas.height/3;
let playerX = 0;
let playerY = canvas.height - (groundheight + 20); 

let left = false;
let right = false;
let playerattack = false;

class Enemy
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }
  draw()
  {
    
  }
  update()
  {
    
  }
}

class Ground
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 500;
    
  }
  draw()
  {
    
  }
  update()
  {
    
  }
}
const magicballArray = [];
const magicball = new Image();
magicball.src = "images/player/Spell.png";

class SpellBall
{
  constructor()
  {
    this.x = playerX + 55;
    this.y = playerY + 40;
    this.height = 30;
    this.width = 30;
    this.velocity = 2;
    this.speed = 0;
  }
  draw()
  {
    ctx.drawImage(magicball, this.x, this.y, this.height, this.width);
  }
  update()
  {
    this.speed += this.velocity;
    this.speed *= 0.72;
    this.x += this.speed;
  }
}
/*let ground = new Ground();*/
let player = new Enemy();

function loadImage()
{
  for(let i = 0; i < 12; i++)
  {
    playerMoveImgArray[i] = new Image();
    playerMoveImgArray[i].src = "images/player/Walk/Walk"+i+".png";
    

    playerIdleImgArray[i] = new Image();
    playerIdleImgArray[i].src = "images/player/Blink/Wraith_03_Idle Blinking_00"+i+".png";
  }
  for(let i=0; i <= 17; i++)
  {
    playerAttackImgArray[i] = new Image();
    playerAttackImgArray[i].src = "images/player/Spell/Wraith_03_Casting Spells_00"+i+".png";
    
  }
  
  ground.src = "images/Ground.png";
}

function movePlayer(direction)
{
  if(left)
  {
    playerX -= playerspeed;
  }
  if(right)
  {
    playerX += playerspeed;
  }
}

function playerIsMoving()
{
      ctx.drawImage(playerMoveImgArray[playerframe], playerX, playerY, playerwidth, playerheight);
  
}

function playerIsIdle()
{
  
ctx.drawImage(playerIdleImgArray[playerframe], playerX, playerY, playerwidth, playerheight);
}

function playerAttack()
{
  ctx.drawImage(playerAttackImgArray[playerframe], playerX, playerY, playerwidth, playerheight);
  
  if(playerframe == 10)
  {
    magicballArray.unshift(new SpellBall);
  }
}

function animate()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < 3; i++)
  {
  ctx.drawImage(ground, groundwidth * i, canvas.height - groundheight + 10, groundwidth, groundheight);
  }
  
  if(!playerattack)
  {
    if (playerframe > 11)
    {
      playerframe = 0;
    }
    if(left || right )
    {
      playerIsMoving();
    }
    else
    {
      playerIsIdle();
    }
  }
  else
  {
    if (playerframe > 17)
    {
      playerframe = 0;
    }
    playerAttack();
  }
  
  for(let i = 0; i < magicballArray.length; i++)
  {
    magicballArray[i].draw();
    magicballArray[i].update();
  }
  
  if(magicballArray.length > 5 )
  {
    magicballArray.pop(magicballArray[0]);
  }
  
  playerframe++;
  movePlayer();
}

loadImage();
setInterval(animate, 1000/25);

function touchLeft()
{
  left = true;
  right = false;
  playerframe = 0;
}

function touchRight()
{
  left = false;
  right = true;
  playerframe = 0;
}

function leftBtnNotPressed()
{
  left = false;
}

function rightBtnNotPressed()
{
  right = false;
}

function attackBtnPressed()
{
  playerattack = true;
  playerframe = 0;
}

function attackBtnNotPressed()
{
  playerattack = false;
}