const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight/2;

let up = false;
let left = false;
let fire = false;
let right = false;
let down = false;
let pathchanged = false;
let face = "down";
let attack = false;
let delay = 0;
let enemyNum = 0;

const size = 4; 
const playerimage = new Image(); 
const enemyimage = new Image();
const enemyArray = [];

function init()
{
  
  playerimage.src = "image/player/wizard.png";
  enemyimage.src = "image/Enemy/enemy0.png";
  
}

class Player
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.dx = 100;
    this.dy = 100;
    this.width = 32;
    this.height = 48; 
    this.speed = 3;
  }
  
  playerX()
  {
    return this.x;
  }
  
  draw()
  {
    ctx.drawImage(playerimage, this.x * this.width, this.y * this.height, this.width, this.height, this.dx, this.dy, this.width, this.height);
  }
  
  move()
  {
    if(this.dx + this.width > canvas.width)
    {
      this.dx = canvas.width - this.width;
    }
    if(this.dy + this.height > canvas.height)
    {
      this.dy = canvas.height - this.height;
    }
    if(this.dx < 0)
    {
      this.dx = 0;
    }
    if(this.dy < 0)
    {
      this.dy = 0;
    }
    if(right)
    {
      this.dx += this.speed;
      this.y = 2;
     // console.log("player moving right");
    }
    if(down)
    {
      this.dy += this.speed;
      this.y = 0;
     // console.log("player moving down");
    }
    if(left)
    {
      this.dx -= this.speed;
      this.y = 1;
      //console.log("player moving left");
    }
    if(up)
    {
      this.dy -= this.speed;
      this.y = 3;
     // console.log("player moving up");
    }
  }
  
  update()
  {
    // move wizard if button pressed
    if(up || left || right || down)
    {
      // direction change or step more than 4
      if (this.x == 3 || pathchanged)
      {
        this.x = 0;
        pathchanged = false;
      }
      this.move();
      this.x += 1;
    }
    
    this.draw();
  }
}

const player = new Player();

// wizard magic attack on enemy
const magicArray = [];

class Magic
{
  constructor()
  {
    this.x = player.dx;
    this.y = player.dy;
    this.speed = 0;
    this.velocity = 2;
    this.height = 10;
    this.width = 10;
    this.direction = face;
  }
  draw()
  {
    //ctx.drawImage(spellimage, this.x, this.y, this.width, this.height);
  /*  ctx.fillRect(this.x + player.width/2 - 4, this.y + (player.height/2), this.width, this.height);*/
    ctx.beginPath();
    ctx.arc(this.x + player.width/2 -2, this.y + player.height/2, 5, 0, Math.PI * 2, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    
  }
  update()
  {
    this.speed += this.velocity;
    this.speed *= 0.8;
    if(this.direction === "down")
    {
      this.y += this.speed;
    }
    if(this.direction === "up")
    {
      this.y -= this.speed;
    }
    if(this.direction === "left")
    {
      this.x -= this.speed;
    }
    if(this.direction === "right")
    {
      this.x += this.speed;
    }

    this.draw();
  }
}

function fireMagic()
{
    magicArray.push(new Magic());
  
  if(magicArray.length > 20)
  {
    magicArray.shift(magicArray[0]);
  }
  console.log("fireMagic = "+magicArray.length);
}

// enemy movement and attack

class Enemy
{
  constructor(posx, posy, espeed)
  {
    this.x = 0;
    this.y = 0;
    this.dx = posx;
    this.dy = posy;
    this.speed = espeed;
    this.dir = "none";
    this.width = 32;
    this.height = 48;
  }
  
  move()
  {
    // moving left
    if(this.dx > player.dx)
    {
      this.dir = "left";
      this.dx -= this.speed;
    }
    
    // moving right
    if(this.dx < player.dx)
    {
      this.dir = "right";
      this.dx += this.speed;
    }
    
    // moving up
    if (this.dy > player.dy)
    {
      this.dir = "up";
      this.dy -= this.speed;
    }
    
    // moving down
    if (this.dy < player.dy)
    {
      this.dir = "down";
      this.dy += this.speed;
    }
    
    if(this.x > 2)
    {
      this.x = 0;
    }
    else{
      this.x += 1;
    }
  }
  
  draw()
  {
    ctx.drawImage(enemyimage, this.x * this.width, this.y * this.height, this.width, this.height, this.dx, this.dy, this.width, this.height);
  }
  
  direction()
  {
    switch(this.dir)
    {
      case "up": 
        this.y = 3;
        break;
      case "left": 
        this.y = 1;
        break;
      case "down":
        this.y = 0;
        break;
      case "right": 
        this.y = 2;
        break;
    }
    //console.log(" enemy direction = "+this.dir);
  }
  
  update()
  {
    this.direction();
    this.move();
    this.draw();
  }
  
}

// enemy attacking
function enemyHorde()
{ 
  let entry = Math.floor(Math.random() * 4);
  let enemyX, enemyY, enemyspeed;
  
  enemyspeed = 0.5;
  
  // enemy entry position 
  if(entry == 0)
  {
    enemyX = -16;
    enemyY = Math.floor(Math.random() * canvas.height);
  }
  else if(entry == 1)
  {
    enemyX = canvas.width + 16;
    enemyY = Math.floor(Math.random() * canvas.height);
  }
  else if(entry == 2)
  {
    enemyY = -24;
    enemyX = Math.floor(Math.random() * canvas.height);
  }
  else
  {
    enemyY = canvas.height + 24;
    enemyX = Math.floor(Math.random() * canvas.height);
  }
  
  if(enemyArray.length < 11)
  {
  enemyArray.push(new Enemy(enemyX, enemyY, enemyspeed));
  }
   
    
   // console.log("enemy horde called");
    //console.log("enemyArray lenght = "+enemyArray.length);
}

// up button 

function upBtnPressed()
{
  up = true;
  pathchanged = true;
  face = "up";
  //console.log("Up Button pressed");
}

function upBtnReleased()
{
  up = false;
  //console.log("Up Button released");
}

// left button

function leftBtnPressed()
{
  left = true;
  pathchanged = true;
  face = "left";
  //console.log("Left Button pressed");
}

function leftBtnReleased()
{
  left = false;
  //console.log("Left Button released");
}

// fire button

function fireBtnPressed()
{
  fire = true;
  attack = true;
  fireMagic();
 // console.log("Fire Button pressed");
}

function fireBtnReleased()
{
  fire = false;
  //console.log("Fire Button released");
}

// right button

function rightBtnPressed()
{
  right = true;
  pathchanged = true;
  face = "right";
  //console.log("Right Button pressed");
}

function rightBtnReleased()
{
  right = false;
  //console.log("Right Button released");
}

// bottom button

function downBtnPressed()
{
  down = true;
  newpath = 0;
  face = "down";
 // console.log("Bottom Button pressed");
}

function downBtnReleased()
{
  down = false;
  //console.log("Bottom Button released");
}

function enemyKilled()
{
  for(let i = 0; i < magicArray.length; i++)
  {
    for(let j = 0; j < enemyArray.length; j++)
    {
      // magic shot up
      if(((magicArray[i].x > enemyArray[j].dx ) && (magicArray[i].x + magicArray[i].width < enemyArray[j].dx + enemyArray[j].width) && (magicArray[i].y < enemyArray[j].dy + enemyArray[j].height ) && (magicArray[i].y > enemyArray[j].dy)) || (( magicArray[i].x + magicArray[i].width > enemyArray[j].dx ) && (magicArray[i].y > enemyArray[j].dy) && (magicArray[i].y + magicArray[i].height < enemyArray[j].dy + enemyArray[j].height) && (magicArray[i].x + magicArray[i].width < enemyArray[j].dx + enemyArray[j].width)))
      {
        magicArray.pop(magicArray[i]);
       // enemyArray.splice(0,j);
        enemyArray.pop(enemyArray[j]);
        console.log("enemy hitted");
      }
      
      }
      //console.log("direction = "+magicArray[i].direction);
  }
 // console.log("checking kills");
}

function animate()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < magicArray.length; i++)
  {
    magicArray[i].update();
  }
  
  player.update();

  for (let i = 0; i < enemyArray.length; i++)
  {
    enemyArray[i].update();
  }
  
  enemyKilled();
  
 // requestAnimationFrame(animate);
}

init();
setInterval(animate, 1000/25);
setInterval(enemyHorde, 4000);
//animate();
