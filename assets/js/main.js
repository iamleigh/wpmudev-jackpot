( function( $ ) {

	var count = 0;
	var btnShuffle = document.querySelector('#machine-spin');
	var btnStop = document.querySelector('#machine-stop');
	var notice = document.querySelector('#machine-notice');
	var casino1 = document.querySelector('#casino1');
	var casino2 = document.querySelector('#casino2');
	var mCasino1 = new SlotMachine(casino1, {
		active: 0,
		delay: 500
	});
	var mCasino2 = new SlotMachine(casino2, {
		active: 1,
		delay: 500
	});

	btnShuffle.addEventListener('click', function() {
		count = 2;
		btnShuffle.setAttribute( 'disabled', '' );
		mCasino1.shuffle(9999);
		mCasino2.shuffle(9999);
		btnStop.removeAttribute( 'disabled' );
	  });

	  btnStop.addEventListener('click', function() {
		switch(count) {
		  case 2:
			mCasino1.stop();
			break;
		  case 1:
			mCasino2.stop();
			btnStop.setAttribute( 'disabled', '' );
			setTimeout( function() {
				var child = document.createElement( 'p' );
				child.innerHTML = 'Before spinning again wash your hands. #COVIDsafe';
				notice.classList.add( 'active' );
				notice.append( child );
			}, 2000 );
			setTimeout( function() {
				notice.classList.remove( 'active' );
				notice.innerHTML = '';
				btnShuffle.removeAttribute( 'disabled' );
			}, 20000 );
			break;
		}
		count--;
	  });

}( jQuery ) );
