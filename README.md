# Material Timepicker

## About
The Material Timepicker is lightweight standalone HTML5/JS(ES5)/CSS3 timepicker which offers a similar UI as the native Android timepicker.

## How to use
* include the __material-timepicker.css__ and the __material-timepicker.js__ into your project
* add an <input> tag into your page
* override the default theme color by overriding the following css classes or leaf the default blue theme
```css
.MatTimePicker-Clock .MatTimePicker-Popup,
.MatTimePicker-Clock .MatTimePicker-WatchHourBg,
.MatTimePicker-Clock .MatTimePicker-WatchStick,
.MatTimePicker-Clock .MatTimePicker-WatchCenterDot,
.MatTimePicker-Clock .MatTimePicker-Button:hover
{
    background-color: your-custom-background-color;
}

.MatTimePicker-Clock .MatTimePicker-Button {
    color: your-custom-button-text-color;
}
```

## Examples
Here is a [sample](https://edgeelement.github.io/material-timepicker/demo/test.html) to see it in action.