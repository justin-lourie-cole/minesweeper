document.addEventListener("DOMContentLoaded", startGame);

// Define your `board` object here!
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
	// Don't remove this function call: it makes the game work!
	board.cells.forEach(
		(cell) => (cell.surroundingMines = countSurroundingMines(cell))
	);
	lib.initBoard();
	document.addEventListener("click", checkForWin);
	document.addEventListener("contextmenu", checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
	let mines = board.cells.filter((cell) => cell.isMine);
	let notMines = board.cells.filter((cell) => !cell.isMine);
	mines.every((cell) => cell.isMarked) && notMines.every((cell) => !cell.hidden)
		? displayMessage("You won!")
		: null;
	// You can use this function call to declare a winner (once you've
	// detected that they've won, that is!)
	//
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
// var surrounding = lib.getSurroundingCells(cell.row, cell.col); //?
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
	let count = 0;
	let surrounding = lib.getSurroundingCells(cell.row, cell.col);
	surrounding.forEach((cell) => (cell.isMine ? count++ : null));
	return count;
}
