const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-game');

const flyShip = event => {
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
const moveUp = () => {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	if (topPosition === '0px') return;

	let position = parseInt(topPosition);
	position -= 50;
	yourShip.style.top = `${position}px`;
}

// move down function
const moveDown = () => {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	if (topPosition === '550px') return;

	let position = parseInt(topPosition);
	position += 50;
	yourShip.style.top = `${position}px`;
}

// shoot function
const fireLaser = () => {
	let laser = creaseLaserElement();
	playArea.appendChild(laser);
	moveLaser();
}

const createLaserElement = () => {
	let xPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('left'));
	let yposition = parseInt(getComputedStyle(yourShip).getPropertyValue('top'));
	let newLaser = document.createElement('img');
	newLaser.src = 'img/shoot.png';
	newLaser.classList.add('laser');
	newLaser.style.left = `${xPosition}px`;
	newLaser.style.top = `${yPosition - 10}px`;

	return newLaser;
}

const moveLaser = () => {

}

addEventListener('keydown', flyShip)
