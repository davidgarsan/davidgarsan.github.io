
'use strict';

var draggable = document.querySelector('.draggable'),
  posX = 0,
  posY = 0,
  offsetX = 0,
  offsetY = 0,
  dragging = false,
  editing = false;

draggable.addEventListener('mousedown', function (e) {
  if(e.target.className === 'handler') {
    editing = true;
  }
  else {
    dragging = true;
    offsetX = posX - this.offsetLeft;
    offsetY = posY - this.offsetTop;
  }
  e.preventDefault();
});

draggable.addEventListener('mousemove', function (e) {
    posX = document.all ? window.event.clientX : e.pageX;
    posY = document.all ? window.event.clientY : e.pageY;
  if (dragging) {
    this.style.left = (posX - offsetX) + 'px';
    this.style.top = (posY - offsetY) + 'px';
  }
  else if (editing && e.target.className === 'handler') {
    var max = draggable.clientWidth;
    var rel = draggable.clientWidth + draggable.offsetLeft;
    var desp = rel - posX + 8;
    if (desp >= 0 && desp <=max/2) {
      var rad = Math.round((100*desp)/max) + '%';
      e.target.style.right = (desp - 16) + 'px';
      draggable.style.borderRadius = rad;
      draggable.querySelector('.text').innerHTML = 'border-radius: ' + rad;
    }
  }
  e.preventDefault();
});

draggable.addEventListener('touchstart', function(e) {
  offsetX = e.changedTouches[0].clientX - this.offsetLeft;
  offsetY = e.changedTouches[0].clientY - this.offsetTop;
  e.preventDefault();
});

draggable.addEventListener('touchmove', function (e) {
  if(e.target.className === 'handler') {
    var max = draggable.clientWidth;
    var rel = draggable.clientWidth + draggable.offsetLeft;
    var desp = rel - e.changedTouches[0].clientX  + 8;
    if (desp >= 0 && desp <=max/2) {
      var rad = Math.round((100*desp)/max) + '%';
      e.target.style.right = (desp - 16) + 'px';
      draggable.style.borderRadius = rad;
      draggable.querySelector('.text').innerHTML = 'border-radius: ' + rad;
    }
  }
  else {
    this.style.left = (e.changedTouches[0].clientX - offsetX) + 'px';
    this.style.top = (e.changedTouches[0].clientY - offsetY) + 'px';
  }
  e.preventDefault();
});

draggable.addEventListener('mouseup', function () {
  dragging = false;
  editing = false;
});

draggable.addEventListener('mouseleave', function () {
  dragging = false;
  editing = false;
});

draggable.addEventListener('touchend', function () {
});
