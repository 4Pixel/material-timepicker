(function(  ) {
  var timePickerId = 'mat-time-picker';
  var timePickerHourId = 'mat-time-picker-hour';
  var timePickerMinuteId = 'mat-time-picker-minute';

  window.onload = function (  ) {
    init( );
  }

  var onSetHourClick = function( event ) {
    setHour( event.currentTarget.getAttribute( 'hour' ), true );

  }

  var setHour = function ( hour, isSelected ) {
    hour = parseInt( hour );
    var timepicker = document.getElementById( timePickerId );
    var hourEl = document.getElementById( timePickerHourId );
    hourEl.innerHTML = ( hour < 10 ? '0' : '' ) + hour;
    hourEl.className = isSelected ? 'MatTimePicker-TimeHeader-Selected' : '';
    [].slice.call( timepicker.getElementsByClassName( 'MatTimePicker-WatchHourContainer' ) ).map( function ( element ) {
      element.className = element.className.replace( ' MatTimePicker-HourSelected', '' );
      if( element.getAttribute( 'hour' ) === hour ) {
        element.className += ' MatTimePicker-HourSelected';
      }
    } );
  }

  var setMinute = function ( minute, isSelected ) {
    minute = parseInt( minute );
    var minuteEl = document.getElementById( timePickerMinuteId );
    minuteEl.innerHTML = (  minute < 10 ? '0' : '' ) + minute;
    minuteEl.className = isSelected ? 'MatTimePicker-TimeHeader-Selected' : '';
  }
  
  var onCancelClick = function ( event ) {
    document.getElementById( timePickerId ).style.display = 'none';
  }

  var onShowTimepickerClick = function( event ) {
    var time = event.currentTarget.getAttribute( 'value' ).split( ':' );
    setHour( time[ 0 ], time[ 0 ] !== '00' && time[ 1 ] !== '00' ); //TODO: think about initial state handling
    setMinute( time[ 1 ] );
    document.getElementById( timePickerId ).style.display = 'flex';
  }

  var init = function( ) {
    [].slice.call( document.querySelectorAll('[type="mat-timepicker"]') ).map( function( input ) {
      input.addEventListener( 'click', onShowTimepickerClick );
    } );

    var elTimepicker = document.createElement( 'div' );
    elTimepicker.className = 'MatTimePicker-Clock';
    elTimepicker.id = timePickerId;
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
    elButtonCancel.addEventListener( 'click', onCancelClick );
    elButtons.appendChild( elButtonCancel );
    var elButtonOk = document.createElement( 'button' );
    elButtonOk.className = 'MatTimePicker-Button';
    elButtonOk.innerHTML = 'OK';
    elButtons.appendChild( elButtonOk );

    initWatchHours( elWatch );

    document.body.insertBefore( elTimepicker, document.body.children[ 0 ] );
  }

  function initWatchHours( elWatch ) {
    for( var h = 24; h > 0; h-- ) {
      var hourContainer = document.createElement( 'div' );
      var rotation = ( -90 + ( 360/12 * h ) );
      hourContainer.style.transform = 'rotate(' + rotation + 'deg)';
      hourContainer.className = 'MatTimePicker-WatchHourContainer' + ( h > 12 ? ' MatTimePicker-WatchHourPM' : '' );
      hourContainer.setAttribute( 'hour', h % 24 );
      hourContainer.addEventListener( 'click', onSetHourClick );
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
      hourValue.innerHTML = h % 24;
      hourValue.style.transform = 'rotate(' + ( rotation * -1 ) + 'deg)';
      hour.appendChild( hourValue );
    }
  }
} )( );