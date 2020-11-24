"use strict";
require("./vendor");

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

 $(document).ready(function() {
    var navbar = $('nav');
    $(window).on("scroll", function() {
    //   console.log($(this).scrollTop())
      if($(this).scrollTop() >= 70){
        navbar.addClass('dark');
        // set to new image
        $(".navbar-brand img").attr("src","images/shield-logo-color.svg");       
      } else {
        navbar.removeClass('dark');
        //back to default
        $(".navbar-brand img").attr("src","images/dark-logo.svg");
      }
    })
  })