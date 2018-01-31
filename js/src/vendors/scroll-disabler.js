// disabling scrolling
var disbalingKeys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (disbalingKeys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchstart  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchstart = null;
    document.onkeydown = null;
    window.ontouchmove  = null;
}

function disableBodyScroll() {
    $('html,body').css({
        'overflow':'hidden',
        'position':'fixed',
        'width':'100%',
        'height':'100%',
    })
}

function enableBodyScroll() {
    $('html,body').css({
        'overflow':'auto',
        'position':'relative',
        'width':'auto',
        'height':'auto',
    })
}
