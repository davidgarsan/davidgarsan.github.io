/**
 * Slider Widget
 *
 * Copyright (c) 2014, David García Sánchez <davidgarsan@gmail.com>
 * Licensed ISC
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals
    root.SliderWidget = factory();
  }
}(this, function () {

var SliderWidget = function(wrapper, options) {
  this.options = this.applyDefaults(options || {});
  this.wrapper = this.getWrapper(wrapper);
  if (!this.wrapper) {
    return;
  }
  this.init();
  this.setPercentage(this.options.minValue);
  this.bindEvents();
  this._observers= [];
};

SliderWidget.prototype = {
  defaults: {
    minValue: 0,
    maxValue: 100,
    step: 1
  },
  _value: 0,
  applyDefaults: function(options) {
    for (var opt in this.defaults) {
      if (this.defaults.hasOwnProperty(opt) && !options.hasOwnProperty(opt)) {
        options[opt] = this.defaults[opt];
      }
    }
    return options;
  },
  getWrapper: function(wrapper) {
    if (typeof(wrapper) === 'string') {
      return document.getElementById(wrapper);
    } else {
      return wrapper;
    }
  },
  bindEvents: function() {
    this.handle.onmousedown = this.onHandleMouseDown.bind(this);
    //this.handle.ontouchstart = this.onHandleTouchStart;
    this.handle.onmouseup = this.onHandleMouseUp.bind(this);
    this.track.onmouseleave = this.onHandleMouseUp.bind(this);

  },
  init: function() {
    this.track =  document.createElement('div');
    this.track.className = 'sw_track';
    this.handle =  document.createElement('div');
    this.handle.className = 'sw_handle';
    this.track.appendChild(this.handle);
    this.wrapper.appendChild(this.track);
  },
  onHandleMouseDown: function(event) {
    this.cursorStart = event.x - this.handle.offsetLeft;
    this.sliding = true;
    this.track.onmousemove = this.onHandleMouseMove.bind(this);
  },
  onHandleMouseUp: function() {
    this.cursorStart = -1;
    this.sliding = false;
    this.track.onmousemove = null;
  },
  onHandleMouseMove: function(event) {
    if (this.sliding) {
      var delta = event.x - this.cursorStart;
      if (delta >= 0 &&
          delta <= this.track.clientWidth - this.handle.clientWidth) {
        this._value = delta;
        this.handle.style.left = this._value + 'px';
        this.notifyObservers();
      }
    }
  },
  getPercentage: function() {
    return Math.ceil((100 * this._value) /
                                    (this.track.clientWidth - this.handle.clientWidth));
  },
  setPercentage: function(percentage) {
    var value = ((this.track.clientWidth - this.handle.clientWidth) * percentage) / 100;
    this.setValue(value);
  },
  getValue: function() {
    return this._value;
  },
  setValue: function(value) {
    value = value < this.options.minValue ? this.options.minValue :
      value > this.track.clientWidth - this.handle.clientWidth ?
      this.track.clientWidth - this.handle.clientWidth : value;
    this.handle.style.left = value + 'px';
    this._value = value;
    this.notifyObservers();
  },
  addObserver: function(callback) {
    this._observers.push(callback);
  },
  notifyObservers: function() {
    setTimeout(function() {
      for (var i = 0; i < this._observers.length; i++) {
          this._observers[i](this.getPercentage());
      }
    }.bind(this), 0);
  }
};

return SliderWidget;

}));