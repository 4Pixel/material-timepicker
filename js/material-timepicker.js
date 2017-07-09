(function(  ) {
  var timePickerId = 'mat-timepicker';
  var timePickerHourId = 'mat-timepicker-hour';
  var timePickerMinuteId = 'mat-timepicker-minute';
  var timePickerHourSelectId = 'mat-timepicker-hour-select';
  var timePickerMinuteSelectId = 'mat-timepicker-minute-select';
  var currentInput = null;

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

  var onSetMinuteClick = function ( event ) {
    setMinute( event.currentTarget.getAttribute( 'minute' ), true );
  }

  var setMinute = function ( minute, isSelected ) {
    minute = parseInt( minute );
    var timepicker = document.getElementById( timePickerId );
    var minuteEl = document.getElementById( timePickerMinuteId );
    minuteEl.innerHTML = (  minute < 10 ? '0' : '' ) + minute;
    minuteEl.className = isSelected ? 'MatTimePicker-TimeHeader-Selected' : '';
    [].slice.call( timepicker.getElementsByClassName( 'MatTimePicker-WatchMinuteContainer' ) ).map( function ( element ) {
      element.className = element.className.replace( ' MatTimePicker-HourSelected', '' );
      if( element.getAttribute( 'minute' ) === minute ) {
        element.className += ' MatTimePicker-HourSelected';
      }
    } );
  }
  
  var onCancelClick = function ( ) {
    currentInput = null;
    document.getElementById( timePickerId ).style.display = 'none';
  }

  var onOkClick = function ( ) {
    document.getElementById( timePickerId ).style.display = 'none';
    var time = document.getElementById( timePickerHourId ).innerHTML + ':' + document.getElementById( timePickerMinuteId ).innerHTML
    currentInput.setAttribute( 'value', time );
  }

  var onShowTimepickerClick = function( event ) {
    currentInput = event.currentTarget;
    var time = currentInput.getAttribute( 'value' ).split( ':' );
    setHour( time[ 0 ], time[ 0 ] !== '00' && time[ 1 ] !== '00' ); //TODO: think about initial state handling
    setMinute( time[ 1 ] );
    document.getElementById( timePickerId ).style.display = 'flex';
  }

  var onShowHourTimepickerClick = function ( ) {
    switchTimepickerInput( true );
  }

  var onShowMinuteTimepickerClick = function ( ) {
    switchTimepickerInput( false );
  }

  var switchTimepickerInput = function ( isHour ) {
    document.getElementById( timePickerHourSelectId ).style.display = isHour ? 'flex' : 'none';
    document.getElementById( timePickerMinuteSelectId ).style.display = isHour ? 'none' : 'flex';
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
    elHour.id = timePickerHourId;
    elHour.innerHTML = '00'
    elHour.addEventListener( 'click', onShowHourTimepickerClick );
    elHeader.appendChild( elHour );
    var elColon = document.createElement( 'span' );
    elColon.innerHTML = ':'
    elHeader.appendChild( elColon );
    var elMinute = document.createElement( 'span' );
    elMinute.id = timePickerMinuteId;
    elMinute.innerHTML = '00';
    elMinute.addEventListener( 'click', onShowMinuteTimepickerClick );
    elHeader.appendChild( elMinute );
    var elWatchContainer = document.createElement( 'div' );
    elWatchContainer.className = 'MatTimePicker-WatchContainer';
    elPopup.appendChild( elWatchContainer );

    var elHourSelect = document.createElement( 'div' );
    elHourSelect.className = 'MatTimePicker-Watch';
    elHourSelect.id = timePickerHourSelectId;
    elHourSelect.style.display = 'none';
    elWatchContainer.appendChild( elHourSelect );
    var elMinuteSelect = document.createElement( 'div' );
    elMinuteSelect.className = 'MatTimePicker-Watch';
    elMinuteSelect.id = timePickerMinuteSelectId;
    elWatchContainer.appendChild( elMinuteSelect );

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
    elButtonOk.addEventListener( 'click', onOkClick );
    elButtons.appendChild( elButtonOk );

    initWatchHours( elHourSelect );
    initWatchMinutes( elMinuteSelect );

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

  function initWatchMinutes( elWatch ) {
    for ( var i = 0; i < 2; i++ ) {
      for( var m = 0; m < 60; m++ ) {
        var minute = m % 60;
        if ( ( i == 0 && m % 5 !== 0 ) || ( i == 1 && m % 5 === 0 ) ) {
          var minuteContainer = document.createElement( 'div' );
          var rotation = ( -90 + ( 360/60 * m ) );
          minuteContainer.style.transform = 'rotate(' + rotation + 'deg)';
          minuteContainer.className = 'MatTimePicker-WatchMinuteContainer';
          minuteContainer.setAttribute( 'minute', m );
          minuteContainer.addEventListener( 'click', onSetMinuteClick );
          elWatch.appendChild( minuteContainer );

          var centerDot = document.createElement( 'div' );
          centerDot.className = 'MatTimePicker-WatchCenterDot';
          minuteContainer.appendChild( centerDot );
          var stick = document.createElement( 'div' );
          stick.className = 'MatTimePicker-WatchStick';
          minuteContainer.appendChild( stick );

          var minute = document.createElement( 'div' );
          minute.className = 'MatTimePicker-WatchHour';
          minuteContainer.appendChild( minute );
          var minuteBg = document.createElement( 'div' );
          minuteBg.className = 'MatTimePicker-WatchHourBg';
          minute.appendChild( minuteBg );
          if ( m % 5 === 0 ) {
            var minuteValue = document.createElement( 'div' );
            minuteValue.className = 'MatTimePicker-WatchHourValue';
            minuteValue.innerHTML = m;
            minuteValue.style.transform = 'rotate(' + ( rotation * -1 ) + 'deg)';
            minute.appendChild( minuteValue );
          }
        }
      }
    }
  }
} )( );