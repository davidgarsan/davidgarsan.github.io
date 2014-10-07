"use strict";var draggable=document.querySelector(".draggable"),posX=0,posY=0,offsetX=0,offsetY=0,dragging=!1,editing=!1;draggable.addEventListener("mousedown",function(a){"handler"===a.target.className?editing=!0:(dragging=!0,offsetX=posX-this.offsetLeft,offsetY=posY-this.offsetTop),a.preventDefault()}),draggable.addEventListener("mousemove",function(a){if(posX=document.all?window.event.clientX:a.pageX,posY=document.all?window.event.clientY:a.pageY,dragging)this.style.left=posX-offsetX+"px",this.style.top=posY-offsetY+"px";else if(editing&&"handler"===a.target.className){var b=draggable.clientWidth,c=draggable.clientWidth+draggable.offsetLeft,d=c-posX+8;if(d>=0&&b/2>=d){var e=Math.round(100*d/b)+"%";a.target.style.right=d-16+"px",draggable.style.borderRadius=e,draggable.querySelector(".text").innerHTML="border-radius: "+e}}a.preventDefault()}),draggable.addEventListener("touchstart",function(a){offsetX=a.changedTouches[0].clientX-this.offsetLeft,offsetY=a.changedTouches[0].clientY-this.offsetTop,a.preventDefault()}),draggable.addEventListener("touchmove",function(a){if("handler"===a.target.className){var b=draggable.clientWidth,c=draggable.clientWidth+draggable.offsetLeft,d=c-a.changedTouches[0].clientX+8;if(d>=0&&b/2>=d){var e=Math.round(100*d/b)+"%";a.target.style.right=d-16+"px",draggable.style.borderRadius=e,draggable.querySelector(".text").innerHTML="border-radius: "+e}}else this.style.left=a.changedTouches[0].clientX-offsetX+"px",this.style.top=a.changedTouches[0].clientY-offsetY+"px";a.preventDefault()}),draggable.addEventListener("mouseup",function(){dragging=!1,editing=!1}),draggable.addEventListener("mouseleave",function(){dragging=!1,editing=!1}),draggable.addEventListener("touchend",function(){});