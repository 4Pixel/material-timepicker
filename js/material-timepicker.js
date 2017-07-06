(function(  ) {
  window.onload = function (  ) {
    init( );
  }

  var init = function( ) {
    var elTimepicker = document.createElement( 'div' );
    elTimepicker.className = 'MatTimePicker-Clock';
    elTimepicker.id = 'mat-time-picker';
    var elPopup = document.createElement( 'div' );
    elPopup.className = 'MatTimePicker-Popup';
    elTimepicker.appendChild( elPopup );
    var elHeader = document.createElement( 'div' );
    elHeader.className = 'MatTimePicker-TimeHeader';
    elPopup.appendChild( elHeader );
    var elHour = document.createElement( 'span' );
    elHour.id = 'mat-time-picker-hour';
    elHour.innerHTML = '00'
    elHeader.appendChild( elHour );
    var elColon = document.createElement( 'span' );
    elColon.innerHTML = ':'
    elHeader.appendChild( elColon );
    var elMinute = document.createElement( 'span' );
    elMinute.id = 'mat-time-picker-minute';
    elMinute.innerHTML = '00';
    elHeader.appendChild( elMinute );
    var elWatchContainer = document.createElement( 'div' );
    elWatchContainer.className = 'MatTimePicker-WatchContainer';
    elPopup.appendChild( elWatchContainer );
    var elWatch = document.createElement( 'div' );
    elWatch.className = 'MatTimePicker-Watch';
    elWatchContainer.appendChild( elWatch );
    var elButtons = document.createElement( 'div' );
    elButtons.className = 'MatTimePicker-Buttons';
    elWatchContainer.appendChild( elButtons );
    var elButtonCancel = document.createElement( 'button' );
    elButtonCancel.className = 'MatTimePicker-Button';
    elButtonCancel.innerHTML = 'CANCEL';
    elButtons.appendChild( elButtonCancel );
    var elButtonOk = document.createElement( 'button' );
    elButtonOk.className = 'MatTimePicker-Button';
    elButtonOk.innerHTML = 'OK';
    elButtons.appendChild( elButtonOk );

    // var quadrant = null;
    for( var hAM = 24; hAM > 0; hAM-- ) {
      var hourContainer = document.createElement( 'div' );
      var rotation = ( -90 + ( 360/12 * hAM ) );
      hourContainer.style.transform = 'rotate(' + rotation + 'deg)';
      hourContainer.className = 'MatTimePicker-WatchHourContainer' + ( hAM > 12 ? ' MatTimePicker-WatchHourPM' : '' );
      elWatch.appendChild( hourContainer );
      var centerDot = document.createElement( 'div' );
      centerDot.className = 'MatTimePicker-WatchCenterDot';
      hourContainer.appendChild( centerDot );
      var stick = document.createElement( 'div' );
      stick.className = 'MatTimePicker-WatchStick';
      hourContainer.appendChild( stick );

      var hour = document.createElement( 'div' );
      hour.className = 'MatTimePicker-WatchHour';
      hourContainer.appendChild( hour );
      var hourBg = document.createElement( 'div' );
      hourBg.className = 'MatTimePicker-WatchHourBg';
      hour.appendChild( hourBg );
      var hourValue = document.createElement( 'div' );
      hourValue.className = 'MatTimePicker-WatchHourValue';
      hourValue.innerHTML = hAM % 24;
      hourValue.style.transform = 'rotate(' + ( rotation * -1 ) + 'deg)';
      hour.appendChild( hourValue );
    }

    document.body.insertBefore( elTimepicker, document.body.children[ 0 ] );

    // var el = document.getElementById( 'mat-time-picker' );
    // el.getElementsByClassName( 'MatTimePicker-Watch' );
  }
} )( );