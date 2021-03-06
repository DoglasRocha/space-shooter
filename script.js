const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const alienImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const instructionText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
const pointsElement = document.querySelector('.points');
var points = 0;

function flyShip(event) {
	switch (event.key) {
		case 'ArrowUp':
			event.preventDefault();
			moveUp();
			break;
		case 'ArrowDown':
			event.preventDefault();
			moveDown();
			break;
		case ' ':
			fireLaser();
			break;
	}
}

// move up function
function moveUp() {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	let position = parseInt(topPosition);
	if (position <= 0) return;

	position -= 30;
	yourShip.style.top = `${position}px`;
}

// move down function
function moveDown() {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	let position = parseInt(topPosition);
	if (position >= 550) return;

	position += 30;
	yourShip.style.top = `${position}px`;
}

// shoot function
function fireLaser() {
	let laser = createLaserElement();
	playArea.appendChild(laser);
	moveLaser(laser);
}

function createLaserElement() {
	let xPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('left'));
	let yPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('top'));
	let newLaser = document.createElement('img');
	newLaser.src = 'img/shoot.png';
	newLaser.classList.add('laser');
	newLaser.style.left = `${xPosition}px`;
	newLaser.style.top = `${yPosition - 10}px`;

	return newLaser;
}

function moveLaser(laser) {
	let laserInterval = setInterval(() => {
		let xPosition = parseInt(laser.style.left);
		let aliens = document.querySelectorAll('.alien');

		aliens.forEach((alien) => { // checking if the alien was shot. if true, change the image src
			if (checkLaserCollision(laser, alien)) {
				alien.src = 'img/explosion.png';
				alien.classList.remove('alien');
				alien.classList.add('dead-alien');

				points++;
				pointsElement.innerHTML = `Pontos: ${points}`;
			}
		})

		if (xPosition >= 340) {
			laser.remove();
		} else {
			laser.style.left = `${xPosition + 8}px`;
		}
	}, 10);
}

// function that create random enemies
function createAliens() {
	let newAlien = document.createElement('img');
	let alienSprite = alienImg[Math.floor(Math.random() * alienImg.length)]; // image random choice
	newAlien.src = alienSprite;
	newAlien.classList.add('alien');
	newAlien.classList.add('alien-transition');
	newAlien.style.left = '370px';
	newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
	playArea.appendChild(newAlien);
	moveAlien(newAlien);
}

// function that moves the enemies
function moveAlien(alien) {
	let moveAlienInterval = setInterval(() => {
		let xPosition = parseInt(getComputedStyle(alien).getPropertyValue('left'));
		if (xPosition <= 50) {
			if (Array.from(alien.classList).includes('dead-alien')) {
				alien.remove();
			} else {
				gameOver();
			}
		} else {
			alien.style.left = `${xPosition - 4}px`;
		}
	}, 30);
}

// function to analyse collision
function checkLaserCollision(laser, alien) {
	let laserTop = parseInt(laser.style.top);
	let laserLeft = parseInt(laser.style.left);
	let laserBottom = laserTop - 20;

	let alienTop = parseInt(alien.style.top);
	let alienLeft = parseInt(alien.style.left);
	let alienBottom = alienTop - 30;

	if (laserLeft !== 340 && laserLeft + 40 >= alienLeft) {
		if (laserTop <= alienTop && laserTop >= alienBottom) {
			return true;
		} 
	}
	return false;
}

// game start
function playGame() {
	startButton.style.display = 'none';
	instructionText.style.display = 'none';
	pointsElement.style.display = 'flex';
	pointsElement.innerHTML = `Pontos: ${points}`;

	addEventListener('keydown', flyShip);

	alienInterval = setInterval(() => {
		createAliens();
	}, 2000);
}

startButton.addEventListener('click', (event) => {
	playGame();
});

// game over function
function gameOver() {
	removeEventListener('keydown', flyShip);
	clearInterval(alienInterval);
	let aliens = document.querySelectorAll('.alien');
	aliens.forEach(alien => alien.remove());

	let lasers = document.querySelectorAll('.laser');
	lasers.forEach(laser => laser.remove());

	setTimeout(() => {
		alert('Game over!!!');
		yourShip.style.top = '250px';
		startButton.style.display = 'block';
		instructionText.style.display = 'block';
		pointsElement.style.display = 'none';
		points = 0;
	})
}
