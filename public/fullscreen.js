var isFullscreen = false;

function toggleFullscreen() {
  if (isFullscreen) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
}

/* View in fullscreen */
function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
    isFullscreen = true;
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
    isFullscreen = true;
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
    isFullscreen = true;
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
    isFullscreen = true;
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
    isFullscreen = false;
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
    isFullscreen = false;
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
    isFullscreen = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('fullscreenerror', (err) => {
    console.error(err);
  });
});
