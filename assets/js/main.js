( function( $ ) {

	var count = 0;
	var btnShuffle = document.querySelector('#machine-spin');
	var btnStop = document.querySelector('#machine-stop');
	var casino1 = document.querySelector('#casino1');
	var casino2 = document.querySelector('#casino2');
	var casino3 = document.querySelector('#casino3');
	var mCasino1 = new SlotMachine(casino1, {
	active: 0,
	delay: 500
	});
	var mCasino2 = new SlotMachine(casino2, {
	active: 1,
	delay: 500
	});
	var mCasino3 = new SlotMachine(casino3, {
	active: 2,
	delay: 500
	});

	btnShuffle.addEventListener('click', function() {
		count = 3;
		mCasino1.shuffle(9999);
		mCasino2.shuffle(9999);
		mCasino3.shuffle(9999);
		btnStop.removeAttribute( 'disabled' );
	  });

	  btnStop.addEventListener('click', function() {
		switch(count) {
		  case 3:
			mCasino1.stop();
			break;
		  case 2:
			mCasino2.stop();
			break;
		  case 1:
			mCasino3.stop();
			btnStop.setAttribute( 'disabled', '' );
			break;
		}
		count--;
	  });

}( jQuery ) );
