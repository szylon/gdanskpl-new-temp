import "./plugins/back-to-top/back-to-top";
import "./plugins/article/article";
import "./plugins/side-bar/side-bar";
import "./plugins/accordion/accordion";
import "./plugins/popover-bootstrap/popover-bootstrap";
import "./plugins/statistic-video/statistic-video";

import "tablednd/js/jquery.tablednd";
import "bootstrap-table/src/bootstrap-table";
import "bootstrap-table/src/extensions/reorder-rows/bootstrap-table-reorder-rows";
import "bootstrap-table/dist/extensions/cookie/bootstrap-table-cookie.js";
import "bootstrap-table/src/locale/bootstrap-table-pl-PL";
import "bootstrap-table/src/extensions/mobile/bootstrap-table-mobile";
import "bootstrap-table/src/extensions/custom-view/bootstrap-table-custom-view";
import "bootstrap-table/src/extensions/sticky-header/bootstrap-table-sticky-header";

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import "slider-before-after/src/scripts/slider-before-after";

// import { cookieForm } from "gcm-js-cookie-form";

// // regula dla Piotra
// if (top.location.href.match(/\/new\//) == null) {
//   function getCookie(cookieName) {
//     var name = cookieName + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var cookieArray = decodedCookie.split(";");

//     for (var i = 0; i < cookieArray.length; i++) {
//       var cookie = cookieArray[i].trim();
//       if (cookie.indexOf(name) === 0) {
//         return cookie.substring(name.length, cookie.length);
//       }
//     }

//     return null;
//   }

//   if (getCookie("googleInspectionTool") == null) {
//     cookieForm("c5580002-3274-4ff1-8787-3ec111d3aede");
//   }
// }

// usuwa bład modala w sliderze
if (document.querySelectorAll(".modal").length > 0) {
  $(".modal").insertAfter($("body"));
}

// var _paq = (window._paq = window._paq || []);
// _paq.push(["requireConsent"]);
// document.addEventListener("cookieform", (e) => {
//   if (e.isServiceAllowed("MATOMO")) {
//     _paq.push(["setConsentGiven"]);
//   } else {
//     _paq.push(["forgetConsentGiven"]);
//   }

//   var _paq = (window._paq = window._paq || []);
//   /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
//   _paq.push(["trackPageView"]);
//   _paq.push(["enableLinkTracking"]);
//   (function () {
//     var u = "//analytics.multimediagdansk.pl/";
//     _paq.push(["setTrackerUrl", u + "matomo.php"]);
//     _paq.push(["setSiteId", "1"]);
//     var d = document,
//       g = d.createElement("script"),
//       s = d.getElementsByTagName("script")[0];
//     g.async = true;
//     g.src = u + "matomo.js";
//     s.parentNode.insertBefore(g, s);
//   })();

//   /* tracker do wszystkich filmow na stronie */
//   (function () {
//     let u = "//analytics.multimediagdansk.pl/";
//     let p = "plugins/MediaAnalytics/tracker.min.js";
//     let d = document,
//       g = d.createElement("script"),
//       s = d.getElementsByTagName("script")[0];
//     g.src = u + p;
//     s.parentNode.insertBefore(g, s);
//   })();
// });
