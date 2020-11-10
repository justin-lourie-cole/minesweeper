document.addEventListener("DOMContentLoaded", startGame);

var board = {
	cells: [
		{ row: 0, col: 0, isMarked: false, isMine: true, hidden: true },
		{ row: 0, col: 1, isMarked: false, isMine: false, hidden: true },
		{ row: 0, col: 2, isMarked: false, isMine: true, hidden: true },
		{ row: 0, col: 3, isMarked: false, isMine: false, hidden: true },
		{ row: 1, col: 0, isMarked: false, isMine: true, hidden: true },
		{ row: 1, col: 1, isMarked: false, isMine: false, hidden: true },
		{ row: 1, col: 2, isMarked: false, isMine: true, hidden: true },
		{ row: 1, col: 3, isMarked: false, isMine: false, hidden: true },
		{ row: 2, col: 0, isMarked: false, isMine: true, hidden: true },
		{ row: 2, col: 1, isMarked: false, isMine: true, hidden: true },
		{ row: 2, col: 2, isMarked: false, isMine: false, hidden: true },
		{ row: 2, col: 3, isMarked: false, isMine: true, hidden: true },
		{ row: 3, col: 0, isMarked: false, isMine: false, hidden: true },
		{ row: 3, col: 1, isMarked: false, isMine: true, hidden: true },
		{ row: 3, col: 2, isMarked: false, isMine: false, hidden: true },
		{ row: 3, col: 3, isMarked: false, isMine: true, hidden: true },
	],
};

function startGame() {
	// Add surroundingMines property to each cell object
	board.cells.forEach(
		(cell) => (cell.surroundingMines = countSurroundingMines(cell))
	);
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
		? displayMessage("You won!")
		: null;
}

function countSurroundingMines(cell) {
	let count = 0;
	let surrounding = lib.getSurroundingCells(cell.row, cell.col);
	surrounding.forEach((cell) => (cell.isMine ? count++ : null));
	return count;
}
