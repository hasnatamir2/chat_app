"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Toast = _sweetalert["default"].mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: function onOpen(toast) {
    toast.addEventListener("mouseenter", _sweetalert["default"].stopTimer);
    toast.addEventListener("mouseleave", _sweetalert["default"].resumeTimer);
  }
});

var makeToast = function makeToast(type, msg) {
  Toast.fire({
    icon: type,
    title: msg
  });
};

var _default = makeToast;
exports["default"] = _default;