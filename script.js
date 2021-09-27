const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-game');

const flyShip = event => {
	switch (event.key) {
		case 'ArrowUp':
			event.preventDefault();
			moveUp;
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
