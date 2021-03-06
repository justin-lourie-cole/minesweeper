document.addEventListener("DOMContentLoaded", startGame);

var board = {
	cells: [],
};

let size = 5;

const gameBoardSize = (size) => {
	for (let i = 0; i <= size; i++) {
		for (let j = 0; j <= size; j++) {
			let randomBoolean = () => Math.random() < 0.3;
			board.cells.push({
				row: i,
				col: j,
				isMarked: false,
				isMine: randomBoolean(),
				hidden: true,
			});
		}
	}
};

let golfClap = new Audio("./sounds/Golf Clap.mp3");

function startGame() {
	gameBoardSize(size);
	// Add surroundingMines property to each cell object
	board.cells.forEach(
		(cell) => (cell.surroundingMines = countSurroundingMines(cell))
	),
		lib.initBoard();
	// Call checkForWin after left or right mouse click
	document.addEventListener("click", checkForWin);
	document.addEventListener("contextmenu", checkForWin);
}

function checkForWin() {
	let mines = board.cells.filter((cell) => cell.isMine);
	let notMines = board.cells.filter((cell) => !cell.isMine);
	//If every mine is marked and every other cell is revealed, declare win.
	mines.every((cell) => cell.isMarked) && notMines.every((cell) => !cell.hidden)
		? (displayMessage("You won!"), golfClap.play())
		: null;
}

function countSurroundingMines(cell) {
	let count = 0;
	let surrounding = lib.getSurroundingCells(cell.row, cell.col);
	surrounding.forEach((cell) => (cell.isMine ? count++ : null));
	return count;
}
