function board(){

	self = this;

	/*
	 * The 2048 game board is a 4x4 grid
	 * Values will be 0 for blank, and go up at bit increments
	 * 2,4,8,16,32,64,...,2048
	 */
	this.board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];

	this.getBoard = function(){

		return self.board;

	}

	this.updateBoard = function( newBoard ){

		self.board = newBoard;

	}

	this.startGame = function() {

		self.clearBoard();
		self.addNumber();
		self.addNumber();

	}

	this.clearBoard = function() {
		// Set all spots of board to 0
	}

	this.addNumber = function() {
		/*
		 * For each of the spaces that are valued at 0, grab the index
		 * Randomly select one of these indexes
		 * Randomly decide if we're placing a 2 or a 4 (10% chance of a 4)
		 */
	}

}

module.exports = new board();
