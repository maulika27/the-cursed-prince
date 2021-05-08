/*
level 0 = story & dialougeBox1
level 1 = maze challange
*/


var forestImg, firstBgImg, secondBgImg, thirdBgImg;
var wizardImg, princeImg, frogImg;
var spikeImg, birdImg, fireballImg;
var dialogBox1Img, dialogBox2Img;
var frog, coinImg;

var level = 0;
var gameState = 1;

var wizard, prince, dialogBox1, dialogBox2;
var level0Sprites;
var level1Sprites, level2Sprites, level3Sprites;
var invisibleGround;
var fball;

var level2Score = 0;
var level3Score = 0;

var level2Ground;
var restartImg;

var inviground3

var edges;
var  arrow, arrowImg;

function preload() {
	forestImg = loadImage("images/forest.jpg");
	firstBgImg = loadImage("images/maze.png");
	secondBgImg = loadImage("images/secondBackground.jpg");
	thirdBgImg = loadImage("images/thirdBackground.jpg");
	wizardImg = loadImage("images/wizard.png");
	princeImg = loadImage("images/prince.png");
	frogImg = loadImage("images/frog.png");
	spikeImg = loadImage("images/spikes.png");
	birdImg = loadImage("images/bird.png");
	fireballImg = loadImage("images/fireball.png");
	dialogBox1Img = loadImage("images/dialouge1.jpg");
	dialogBox2Img = loadImage("images/dialouge2.jpg");
	coinImg = loadImage("images/coin.png");
	restartImg = loadImage("images/gameOver.jpg");
	arrowImg = loadImage("images/arrow.jpg")

}
function setup() {

	createCanvas(1000, 600);

	level0Sprites = new Group();
	level1Sprites = new Group();
	level2Sprites = new Group();
	level3Sprites = new Group();

	mazeChallenge();

	wizard = createSprite(width - 20, height / 2);
	wizard.addImage(wizardImg);
	prince = createSprite(20, height / 2);
	prince.addImage(princeImg);
	wizard.velocityX = -3;
	prince.velocityX = 3;

	arrow = createSprite(400, 270);
	arrow.addImage(arrowImg);
	arrow.scale = 0.5;
	arrow.visible = false;


	dialogBox1 = createSprite(width / 2, height / 3);
	dialogBox1.addImage(dialogBox1Img);
	dialogBox1.scale = 0.5;
	dialogBox1.visible = false;

	dialogBox2 = createSprite(width/2, height/2);
	dialogBox2.addImage(dialogBox2Img);
	dialogBox2.scale = 0.6;
	dialogBox2.visible =false;

	level0Sprites.add(wizard);
	level0Sprites.add(prince);
	level0Sprites.add(dialogBox1);

	level2Ground = createSprite(width / 2, height / 2);
	level2Ground.addImage(secondBgImg);
	level2Ground.visible = false;

	restart = createSprite(width / 2, height / 2);
	restart.addImage(restartImg);
	restart.visible = false;


	frog = createSprite(35, 380);
	frog.addImage(frogImg);
	frog.scale = 0.3;
	frog.visible = false;

	coin = createSprite(width - 45, 355);
	coin.addImage(coinImg);
	coin.visible = false;
	coin.scale = 0.085;

	invisibleGround = createSprite(35, height / 2 + 20, 100, 10);
	invisibleGround.visible = false;
	inviground3 = createSprite(width / 2, height - 50, 1000, 10);
	inviground3.visible = false;

	edges = createEdgeSprites();

}

function draw() {
	frog.collide(edges);


	if (level === 0) {
		background(forestImg);
		gameStory();
	}



	else if (level === 1) {
		background(firstBgImg);
		level0Sprites.setVisibleEach(false);

		frog.visible = true;
		frog.setCollider("circle", 0, 0, 43);
		frog.debug = true;

		coin.visible = true;

		if (frog.isTouching(coin)) {
			frog.velocityX = 0;
			frog.velocityY = 0;
			textSize(30);
			fill("red");
			stroke("yellow");
			text("Level Completed,Press Space to Level Up", width / 2 - 200, height / 2);
			if (keyDown("space")) {
				level = 2;
				frog.y = height / 2 - 30;
				coin.visible = false;
			}

		}
		else {
			if (keyDown(UP_ARROW)) {
				frog.velocityY = -4;
				frog.velocityX = 0;
			}
			if (keyDown(DOWN_ARROW)) {
				frog.velocityY = +4;
				frog.velocityX = 0;
			}
			if (keyDown(LEFT_ARROW)) {
				frog.velocityX = -4;
				frog.velocityY = 0;
			}

			if (keyDown(RIGHT_ARROW)) {
				frog.velocityX = +4;
				frog.velocityY = 0;
			}
		}

		/*	if(frog.isTouching(level1Sprites)){
					frog.x = 35;
					frog.y = 380;		
				}*/
				
		drawSprites();
	}
	else if (level === 2) {
		background(secondBgImg);
		

		textSize(20);
		fill("red");
		stroke("yellow");
		//stext("Target Score: 20", width - 800, 200);
		text("  Press up arrow to jump                                        Target: 20           Score: " + level2Score, width - 870, 20);

		frog.visible = true;
		frog.x = 50;

		frog.velocityY = frog.velocityY + 0.5;
		frog.collide(invisibleGround);

		if (gameState === 1) {
			level2Ground.visible = true;
			level2Ground.velocityX = -3;
			if (level2Ground.x < 0) {
				level2Ground.x = level2Ground.width / 2;

			}
			if (frameCount % 30 === 0) {
				level2Score += 1;
			}
			spikesChallenge();

			if (keyDown("UP_ARROW") && frog.y >= 302) {
				frog.velocityY = -12;
			}

			if (level2Sprites.isTouching(frog)) {
				gameState = 2;
			}

			if (level2Score === 20) {
				gameState = 3;

			}
		}

		else if (gameState === 2) {
			level2Ground.visible = false;
			level2Ground.velocityX = 0;
			level2Sprites.setVelocityXEach(0);
			level2Sprites.setLifetimeEach(-1);
			restart.visible = true;

			if (keyDown("R")) {
				level2Sprites.destroyEach();
				gameState = 1;
				level2Score = 0;
				restart.visible = false;
			}

		}

		else if (gameState === 3) {
			level2Ground.visible = false;
			level2Sprites.destroyEach();
			textSize(30);
			fill("black");
			//stroke("yellow");
			text("Level Completed,Press Space to Level Up", width / 2 - 200, height / 2);
			if (keyDown("space")) {
				level = 3;
				gameState = 1;
			}
		}
	}

	else if (level === 3) {
		background(thirdBgImg);
		textSize(30);
		fill("black")
		
		text("It is raining fireballs! try and dodge them using the arrow keys.", 50, 100);
		text("Remember, even their heat can kill you, so don't come too close to them!", 30, 140);
		textSize(20)
		text("Target Score: 20", 100, 50);
		if (gameState === 1) {
			if (keyDown(LEFT_ARROW)) {
				frog.velocityX = -4;
			}
			if (keyDown(RIGHT_ARROW)) {
				frog.velocityX = 4;
			}
			fireBallChallenge();
			text("score: " + level3Score, width - 200, 50)


			for (var i = 0; i < level3Sprites.length; i++) {
				if (level3Sprites.get(i).isTouching(inviground3)) {
					level3Sprites.get(i).destroy();
					level3Score += 1;
				}
			}

			if (level3Score === 20) {
				gameState = 3;
			}
			if (level3Sprites.isTouching(frog)) {
				gameState = 2;
				level3Sprites.destroyEach();
				frog.velocityX = 0;
				//frog.visible= false;
			}

		}
		else if (gameState === 2) {
			restart.visible = true;

			if (keyDown("R")) {
				
				gameState = 1;
				level3Score = 0;
				restart.visible = false;
				frog.visible = true;
			}

		}
		else if (gameState === 3) {
			 dialogBox2.visible = true;
			 level3Sprites.destroyEach();
			 frog.velocityX = 0;
			 frog.visible= false;
			//dialogBox2.addImage(dialogBox2Img);
			//dialogBox2.scale = 0.6;

			if (keyDown("space")) {
				level = 4;
				dialogBox2.visible = false;
				level3Sprites.destroyEach();

			}
		}


	}
	else if (level === 4) {
		background("white");
		prince.addImage(princeImg);
		prince.visible = true;
		frog.visible = true;

		prince.x = 700;
		prince.y = height / 2;
		prince.scale = 0.7
		frog.x = 100;
		frog.y = height / 2;
		frog.scale = 0.5

		fill("black")
		textSize(30);
		text("YOU WON!", 360, 100);

		arrow.visible = true;

		
		
	}



	drawSprites();
}

function gameStory() {


	if (wizard.x < (width * 2 / 3) && prince.x > (width / 3)) {
		wizard.velocityX = 0;
		prince.velocityX = 0;
		prince.addImage(frogImg);
		if (frameCount > 200) {
			dialogBox1.visible = true;
			dialogBox1.x = width / 2
			dialogBox1.y = height / 2

			dialogBox1.scale = 0.6;
		}

		if (keyDown("space")) {
			level = 1;
		}

	}
}




function mazeChallenge() {

	var sprite1 = createSprite(42, 202, 40, 307);
	var sprite2 = createSprite(500, 31, 950, 34.7);
	var sprite3 = createSprite(225, 99, 40.5, 150);
	var sprite4 = createSprite(250, 188, 270, 33);
	var sprite5 = createSprite(355, 110, 110, 35);
	var sprite6 = createSprite(404.4, 148, 37.5, 112.6);
	var sprite7 = createSprite(131, 150, 42, 109);
	var sprite8 = createSprite(954, 189, 40, 279);
	var sprite9 = createSprite(496, 89, 42.5, 80);
	var sprite10 = createSprite(580, 111, 200, 34.5);
	var sprite11 = createSprite(679, 150, 40, 111);
	var sprite12 = createSprite(619, 190, 106, 33);
	var sprite13 = createSprite(768.7, 160, 40, 230);
	var sprite14 = createSprite(676, 267, 223, 36);
	var sprite15 = createSprite(585, 347, 41, 180);
	var sprite16 = createSprite(867, 83, 39, 100);
	var sprite17 = createSprite(492, 569, 951, 35);
	var sprite18 = createSprite(37, 495, 40, 125);
	var sprite19 = createSprite(128, 415, 225, 38);
	var sprite20 = createSprite(948, 495, 39, 170);
	var sprite21 = createSprite(918, 400, 100, 35);
	var sprite22 = createSprite(865, 348, 39, 338);
	var sprite23 = createSprite(765, 441, 43, 225);
	var sprite24 = createSprite(698, 346, 90, 35);
	var sprite25 = createSprite(673, 421, 41, 180);
	var sprite26 = createSprite(580, 494, 220, 35);
	var sprite27 = createSprite(492, 340, 42, 342);
	var sprite28 = createSprite(400, 265, 200, 37);
	var sprite29 = createSprite(312, 362, 40, 230);
	var sprite30 = createSprite(202, 341, 180, 35);
	var sprite31 = createSprite(133, 295, 40, 100);
	var sprite32 = createSprite(192, 263, 100, 36);
	var sprite33 = createSprite(404.4, 455, 40, 260);
	var sprite34 = createSprite(250, 493, 300, 38);

	level1Sprites.add(sprite1);
	level1Sprites.add(sprite2);
	level1Sprites.add(sprite3);
	level1Sprites.add(sprite4);
	level1Sprites.add(sprite5);
	level1Sprites.add(sprite6);
	level1Sprites.add(sprite7);
	level1Sprites.add(sprite8);
	level1Sprites.add(sprite9);
	level1Sprites.add(sprite10);
	level1Sprites.add(sprite11);
	level1Sprites.add(sprite12);
	level1Sprites.add(sprite13);
	level1Sprites.add(sprite14);
	level1Sprites.add(sprite15);
	level1Sprites.add(sprite16);
	level1Sprites.add(sprite17);
	level1Sprites.add(sprite18);
	level1Sprites.add(sprite19);
	level1Sprites.add(sprite20);
	level1Sprites.add(sprite21);
	level1Sprites.add(sprite22);
	level1Sprites.add(sprite23);
	level1Sprites.add(sprite24);
	level1Sprites.add(sprite25);
	level1Sprites.add(sprite26);
	level1Sprites.add(sprite27);
	level1Sprites.add(sprite28);
	level1Sprites.add(sprite29);
	level1Sprites.add(sprite30);
	level1Sprites.add(sprite31);
	level1Sprites.add(sprite32);
	level1Sprites.add(sprite33);
	level1Sprites.add(sprite34);
	level1Sprites.setVisibleEach(false);

}

function spikesChallenge() {
	if (frameCount % 150 === 0) {
		var spike = createSprite(width, height / 2);
		spike.velocityX = -6;

		//spike.y = random(40,height-40)
		spike.lifetime = 400;
		spike.scale = 0.5;
		spike.addImage(spikeImg);
		level2Sprites.add(spike);

	}

	if (frameCount % 300 === 0) {
		var spike = createSprite(width, height / 2 - 150);
		spike.velocityX = -4;

		//spike.y = random(40,height-40)
		spike.lifetime = 400;
		spike.scale = 0.5;
		spike.addImage(birdImg);
		level2Sprites.add(spike);

	}


}


function fireBallChallenge() {
	if (frameCount % 30 === 0) {
		var fball = createSprite(100, 0);
		fball.velocityY = 4;
		var rand = Math.floor((Math.random() * 1000) + 1);
		fball.x = rand;

		fball.lifetime = 400;
		fball.scale = 0.5;
		fball.addImage(fireballImg);
		level3Sprites.add(fball);




	}
}



