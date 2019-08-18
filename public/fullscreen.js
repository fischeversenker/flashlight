var elem;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  /* Get the documentElement (<html>) to display the page in fullscreen */
  elem = document.documentElement;

  document.addEventListener('fullscreenchange', (event) => {
    console.log(event);
  });

  document.addEventListener('fullscreenerror', (err) => {
    console.error(err);
  });
});
