function keyboardInput() {
	self = this;
	this.UP_ARROW 		= '\u001b[A',
	this.DOWN_ARROW 	= '\u001b[B',
	this.LEFT_ARROW 	= '\u001b[D',
	this.RIGHT_ARROW 	= '\u001b[C',
	this.EXIT 		= '\u0003';

	this.acceptKeyboardInput = function() {

		process.stdin.setRawMode( true );
		process.stdin.resume();
		process.stdin.setEncoding( 'utf8' );
		process.stdin.on( 'data', function( key ) {
			switch( key ){
				case self.UP_ARROW:
				case self.DOWN_ARROW:
				case self.LEFT_ARROW:
				case self.RIGHT_ARROW:
					console.log('ARROW KEY HIT');
					break;
				case self.EXIT:
					process.exit();
					break;
				default:
					break;
			}
		});

	}
}

module.exports = new keyboardInput();
