// references to HTML elements
var knob = document.querySelector(".circle");
var volumeDisplay = document.getElementById("volume-display");
var musicPlayer = document.getElementById("music-player");

let volumeSlider = document.getElementById("slider-bar");

let scaledCurrentGestureValue = 0;

// check the state of the gesture every 20ms
setInterval(checkGesture, 20);

// holds the most recently sampled gesture value
var currGestureValue = -1;

// function will be called at set intervals to check the gesture state
function checkGesture() {
  // if a gesture is occuring, sample gesture parameter values
  if (gestureOccuring) {
    if (currGestureValue != xValue) {
      currGestureValue = xValue;

      // The scale before is from 50 to 250 (absolute = 200)
      if (currGestureValue >= 50 && currGestureValue <= 250) {
        scaledCurrentGestureValue = Math.abs(xValue - 50);
        // Convert to percentage
        scaledCurrentGestureValue = (scaledCurrentGestureValue / 200) * 100;
      }

      setVolume(scaledCurrentGestureValue);
    }
  }
}

// this function handles volume setting
// translates the desired volume into the actual pixel placement of the slider
function setVolume(volume) {
  // Volume text Display will round off to 0dp percentage
  volumeDisplay.innerHTML = volume.toFixed(0);

  // Music player volume takes in decimal, not percentage
  musicPlayer.volume = volume / 100;
  // Takes in percentage
  musicPlayer.volumeDisplay = volume;

  sliderBoundingBox = volumeSlider.getBoundingClientRect();
  let sliderX = sliderBoundingBox.left;
  let sliderY = sliderBoundingBox.top;

  let volumeScale = (volume / 100) * 295 + 850;
  knob.style.left = `${volumeScale}px`;
}
