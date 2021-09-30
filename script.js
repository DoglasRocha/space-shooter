const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');

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
	if (topPosition === '0px') return;

	let position = parseInt(topPosition);
	position -= 50;
	yourShip.style.top = `${position}px`;
}

// move down function
function moveDown() {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	if (topPosition === '550px') return;

	let position = parseInt(topPosition);
	position += 50;
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
		
		if (xPosition >= 340) {
			laser.remove();
		} else {
			laser.style.left = `${xPosition + 8}px`;
		}
	}, 10);
}

addEventListener('keydown', flyShip)
