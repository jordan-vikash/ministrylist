// jQuery will be loaded from CDN, next line is here to satisfy bootstrap.js
import jQuery from "jquery";
// Exposing jQuery to window object
window.$ = window.jQuery = jQuery;

// Parse and stringify URL query strings
import queryString from "query-string";

window.queryString = queryString;

import printJS from "print-js";

window.printJS = printJS;
//import Popper from 'expose-loader?Popper!popper.js';
// Even if we have used expose-loader, we still need to expose Popper to window object
// window.Popper = Popper;
// require("jquery-ui");

// Selective bootstrap.js build
import "bootstrap/js/dist/util";
//import 'bootstrap/js/dist/alert';
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/carousel";


// Lazy Loading
import lozad from "lozad";

export const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();
$(window).on("sv.lozad.observe", function () {
    observer.observe();
});

// We will extract all css to a separate file
require("../sass/vendor.scss");
require("../sass/app.scss");
