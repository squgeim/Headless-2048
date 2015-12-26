/*
 * Allowing customization of the board for future expansion beyond 4x4 grid
 */
function board(rows,columns){

	// This is just a nice work around for knowing when I'm referencing the master method
	self = this;
	
	/* Default to the traditional 4x4 grid */
	this.rows = rows || 4;
	this.columns = columns || 4;

	/*
	 * The default 2048 game board is a 4x4 grid
	 * Values will be 0 for blank, and go up at bit increments
	 * 2,4,8,16,32,64,...,2048
	 */
	this.board = [];

	/*
	 * Method returns the game board in it's current state.
	 * Used to display board, and to know valid moves in the actuator
	 */
	this.getBoard = function(){

		return self.board;

	}

	/*
	 * Used to update the board.
	 * This method may not be required. More testing is needed, in regards to 
	 * passing arrays by reference and scope, etc.
	 */
	this.updateBoard = function( newBoard ){

		self.board = newBoard;

	}

	/* 
	 * This method clears the current game board, and initializes the new
	 * board with two numbers, beginning a new game.
	 */
	this.startGame = function() {

		self.clearBoard();
		self.addNumber();
		self.addNumber();

	}

	/*
	 * Builds a fresh game board, dynamically, based on the defined rows and columns
	 */
	this.buildEmptyBoard = function() {
		
		for( var row = 0; row < self.rows; row++ ){

			for( var column = 0; column < self.columns; column++ ){

				self.board[row][column] = 0;

			}

		}

	}

	/* 
	 * Adds a number to the board.
	 * 2 = 90%, 4 = 10%
	 */
	this.addNumber = function() {
		
		var empty = [];

		/*
		 * Iterate over each of the fields in the board.
		 * Add all the empty slots to an array
		 */
		for( var row = 0; row < self.rows; row++ ){
			
			for( var column = 0; column < self.columns; column++) {

				if( self.board[ row ][ column ] != 0 )
					continue;
				
				empty.push( [row,column] );

			}
		}

		/* Randomly select the row and column for the slot to add a value to */
		var index = empty[ Math.floor( Math.random() * empty.length ) ];

		/* There is a 10% chance of adding a 4, othewise we add a 2 */
		var value = ( Math.floor( Math.random() * 100 ) > 90 ) ? 4 : 2;

		/* Add the value to the board at the defined ROW and COLUMN */
		self.board[ index[0] ][ index[1] ] = value;
	
	}

}

module.exports = board;
