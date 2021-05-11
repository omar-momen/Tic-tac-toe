(function () {
  // Start trigger NiceScroll
  if ($(window).width() >= 992) {
    $("body").niceScroll({
      cursorcolor: "#333",
      cursorwidth: "13px",
      background: "",
      cursorborder: "1px solid aquamarine",
      cursorborderradius: 10,
      zindex: 999,
    });
  }
  // End trigger NiceScroll

  // Start rigger WoW.js
  new WOW().init();
  // End trigger WoW.js

  // Start ScrollToTop & down
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 700) {
      $(".scrollToTop").css({
        opacity: "1",
        visibility: "visible",
      });
    } else {
      $(".scrollToTop").css({
        opacity: "0",
        visibility: "hidden",
      });
    }
  });
  $(".scrollToTop").on("click", function () {
    $("body,html").animate({
      scrollTop: 0,
    });
  });
  // End ScrollToTop & down

  // Start Loading page
  $(window).on("load", function () {
    $(".loading-overlay").fadeOut();
  });
  // End Loading page
})();
