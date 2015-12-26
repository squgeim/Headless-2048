/*
 * The actuator needs access to the board object, but only when making a move.
 * Dependency injection can help us there.
 *
 * We don't really care if a person can MAKE a move.
 *
 * With each move we want to return an array of values:
 * 	- How many blocks moved
 * 	- If there were merges, what the sum of the merges were
 * 		- If there weren't any, we'll return 0 here
 *
 * Because of the way we have done our array, the value [0,0] is the top left corner, and the value
 * [Nr,Nc] is the bottom right corner (where N is the number and r/c is row or column)
 */
function actuator() {

	self = this;

	/*
	 * To move up, we need to look at each column, and the row it's in.
	 */
	this.moveUp = function( board ) {

		// We can't do anything without a board.
		if( typeof board == "undefined" || typeof board.board == "undefined" )
			return;

		// Do this once, and loop if we make a move.
		var mergedIndexes = [];

		/*
		 * Expected Logic: 
		 * This should move all slots with an empty slot above it first. Once those are moved, it will move any that can be merged. Once a slot has been merged with, it cannot be merged again,
		 * this turn. This should iterate through each column, starting from 0x0 to 0xNc, all the way to NrxNc. If there is a move that happens at any point, it will perform the move,
		 * and at the end of that iteration will begin at the beginning again, until there are no moves that can be made in that direction.
		 */
		do{

			madeMove = false;

			for( var column = 0; column < board.columns; column++ ){

				/* We're looking at each row first
				 * Logically, we know the top row can't move
				 * so skip it.
				 */
				for( var row = 1; row < board.rows; row++ ){

					if( board.board[ row - 1 ][ column ] == 0 ){
						// The slot above is empty, so move into it.
						self.setValue( board, row - 1, column, row, column );
						madeMove = true;
						continue;
					}

					if( board.board[ row - 1 ][ column ] == board.board[ row ][ column ] && mergedIndexes.indexOf( ( row -1 ) + "x" + column ) < 0 ){
						// The values for the rows are the same, so combine them.
						self.setValue( board, row - 1, column, row, column, true );
						mergedIndexes.push( ( row - 1 ) + "x" + column );
						madeMove = true;
						continue;
					}

				}

			}

		/* Keep making moves until we can't make any more */
		}while( madeMove );
			
	}

	this.moveDown = function( board ) {

		// We can't do anything without a board.
		if( typeof board == "undefined" || typeof board.board == "undefined" )
			return;

		// Do this once, and loop if we make a move.
		var mergedIndexes = [];

		/*
		 * Expected Logic: 
		 * This should move all slots with an empty slot below it first. Once those are moved, it will move any that can be merged. Once a slot has been merged with, it cannot be merged again,
		 * this turn. This should iterate through each column, starting from Nrx0 to NrxNc, all the way to 0xNc. If there is a move that happens at any point, it will perform the move,
		 * and at the end of that iteration will begin at the beginning again, until there are no moves that can be made in that direction.
		 */
		do{

			madeMove = false;

			for( var column = 0; column < board.columns; column++ ){

				/* We're looking at each row first
				 * Logically, we know the bottom row can't move
				 * so skip it.
				 */
				for( var row = board.rows - 1; row > 0; row-- ){

					/*
					 * NOTE: CONFUSION ALERT!
					 * Because the board is zero indexed, what we're using here as "row" is actually "row + 1" which is referencing
					 * the row that is directly below the row that we are currently on.
					 */
					if( board.board[ row ][ column ] == 0 ){
						// The slot below is empty, so move into it.
						self.setValue( board, row, column, row - 1, column );
						madeMove = true;
						continue;
					}

					if( board.board[ row ][ column ] == board.board[ row - 1 ][ column ] && mergedIndexes.indexOf( row + "x" + column ) < 0 ){
						// The values for the rows are the same, so combine them.
						self.setValue( board, row, column, row - 1, column, true );
						mergedIndexes.push( row + "x" + column );
						madeMove = true;
						continue;
					}

				}

			}

		/* Keep making moves until we can't make any more */
		}while( madeMove );

	}

	this.moveLeft = function( board ) {

		// We can't do anything without a board.
		if( typeof board == "undefined" || typeof board.board == "undefined" )
			return;

		// Do this once, and loop if we make a move.
		var mergedIndexes = [];

		/*
		 * Expected Logic: 
		 * This should move all slots with an empty slot above it first. Once those are moved, it will move any that can be merged. Once a slot has been merged with, it cannot be merged again,
		 * this turn. This should iterate through each column, starting from 0x0 to 0xNc, all the way to NrxNc. If there is a move that happens at any point, it will perform the move,
		 * and at the end of that iteration will begin at the beginning again, until there are no moves that can be made in that direction.
		 */
		do{

			madeMove = false;

			for( var row = 0; row < board.rows; row++ ){

				/* We're looking at each column first
				 * Logically, we know the leftmost column can't move
				 * so skip it.
				 */
				for( var column = 1; column < board.columns; column++ ){

					if( board.board[ row ][ column - 1 ] == 0 ){
						// The slot above is empty, so move into it.
						self.setValue( board, row, column - 1, row, column );
						madeMove = true;
						continue;
					}

					if( board.board[ row ][ column - 1 ] == board.board[ row ][ column ] && mergedIndexes.indexOf( row + "x" + ( column - 1 ) ) < 0 ){
						// The values for the rows are the same, so combine them.
						self.setValue( board, row, column - 1, row, column, true );
						mergedIndexes.push( row + "x" + ( column - 1 ) );
						madeMove = true;
						continue;
					}

				}

			}

		/* Keep making moves until we can't make any more */
		}while( madeMove );

	}

	this.moveRight = function( board ) {

		// We can't do anything without a board.
		if( typeof board == "undefined" || typeof board.board == "undefined" )
			return;

		// Do this once, and loop if we make a move.
		var mergedIndexes = [];

		/*
		 * Expected Logic: 
		 * This should move all slots with an empty slot below it first. Once those are moved, it will move any that can be merged. Once a slot has been merged with, it cannot be merged again,
		 * this turn. This should iterate through each column, starting from Nrx0 to NrxNc, all the way to 0xNc. If there is a move that happens at any point, it will perform the move,
		 * and at the end of that iteration will begin at the beginning again, until there are no moves that can be made in that direction.
		 */
		do{

			madeMove = false;

			for( var row = 0; row < board.rows; row++ ){

				/* We're looking at each column first
				 * Logically, we know the rightmost column can't move
				 * so skip it.
				 */
				for( var column = board.columns - 1; column > 0; column-- ){

					/*
					 * NOTE: CONFUSION ALERT!
					 * Because the board is zero indexed, what we're using here as "column" is actually "column + 1" which is referencing
					 * the row that is directly below the row that we are currently on.
					 */
					if( board.board[ row ][ column ] == 0 ){
						// The slot below is empty, so move into it.
						self.setValue( board, row, column, row, column - 1 );
						madeMove = true;
						continue;
					}

					if( board.board[ row ][ column ] == board.board[ row ][ column - 1 ] && mergedIndexes.indexOf( row + "x" + column ) < 0 ){
						// The values for the columns are the same, so combine them.
						self.setValue( board, row, column, row, column - 1, true );
						mergedIndexes.push( row + "x" + column );
						madeMove = true;
						continue;
					}

				}

			}

		/* Keep making moves until we can't make any more */
		}while( madeMove );

	}

	/* 
	 * We're going to be doing this type of thing a lot, so let's make it a method.
	 * Takes the value from one slot and moves it to another, and then sets the original
	 * slot to an empty value.
	 *
	 * @param board The game board object
	 * @param r1 The index of the row to move the value to
	 * @param c1 The index of the column to move the value to
	 * @param r2 The index of the row to move the value from
	 * @param c2 The index of the column to move the value from
	 */
	this.setValue = function( board, r1, c1, r2, c2, combine ){

		combine = combine || false;
		
		board.board[r1][c1] = board.board[r2][c2];

		if( combine )
			board.board[r1][c1] = board.board[r1][c1] * 2;

		board.board[r2][c2] = 0;

	}

}

module.exports = new actuator();
