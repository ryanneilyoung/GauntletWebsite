(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 57)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict


// get data from the slackbot so that we can mess with this page

//sweet sweet global variable
var botData;

if ("WebSocket" in window) {
   console.log("WebSocket is supported by your Browser!");
   
   // Let us open a web socket
   var ws = new WebSocket("wss://34.216.123.22:9999/");

   ws.onopen = function() {
      
      // Web Socket is connected, send data using send()
      ws.send("Message to send");
      console.log("Message is sent...");
   };

   ws.onmessage = function (evt) { 
      var received_msg = evt.data;
      botData = JSON.parse(evt.data);
      console.log("Message is received..." + evt.data);

      document["Challenger"].src = "img/companylogos/" + botData.challenger + ".png" 
      document["Challengee"].src = "img/companylogos/" + botData.challengee + ".png"

    var months = {
         'January' : '00',
         'Febuary' : '01',
         'March' : '02',
         'April' : '03',
         'May' : '04',
         'June' : '05',
         'July' : '06',
         'August' : '07',
         'September' : '08',
         'October' : '09',
         'November' : '10',
         'December' : '11',
      }

      var target_date = new Date(botData.countdownTimer.year,
                                 months[botData.countdownTimer.month],
                                 botData.countdownTimer.day,
                                 botData.countdownTimer.hour,
                                 botData.countdownTimer.minute,
                                0); // set the countdown date
      var days, hours, minutes, seconds; // variables for time units

      var countdown = document.getElementById("tiles"); // get tag element

      getCountdown();

      setInterval(function () { getCountdown(); }, 1000);

      function getCountdown(){

        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left = (target_date.getTime() - current_date) / 1000;

        days = pad( parseInt(seconds_left / 86400) );
        seconds_left = seconds_left % 86400;
        
        hours = pad( parseInt(seconds_left / 3600) );
        seconds_left = seconds_left % 3600;
            
        minutes = pad( parseInt(seconds_left / 60) );
        seconds = pad( parseInt( seconds_left % 60 ) );

        // format countdown string + set tag value
        countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>"; 
        }

        function pad(n) {
          return (n < 10 ? '0' : '') + n;
        }


   };

   ws.onclose = function() { 
      
      // websocket is closed.
      console.log("Connection is closed..."); 
   };
} else {
  
   // The browser doesn't support WebSocket
   console.log("WebSocket NOT supported by your Browser!");
}
