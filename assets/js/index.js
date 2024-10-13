$(document).ready(function () {

  let width = $(window).width();

  // Smooth scrolling 
  var $scrollElement = $('[data-bs-spy="scroll"]');

  $scrollElement.scrollspy({ target: '#top-nav', offset: 45 });

  $scrollElement.on('activate.bs.scrollspy', function () {
    var activeTopLink = $('#top-nav .nav-link.active');
    var activeSideLink = $('#side-scroll-nav .nav-link[href="' + activeTopLink.attr('href') + '"]');
    $('#side-scroll-nav .nav-link').removeClass('active');
    if (activeSideLink.length) {
      activeSideLink.addClass('active');
    }
  });

  $(window).on('scroll', function () {

    let scrollBtn = $('#scroll-top')

    if ($(this).scrollTop() > 100) {
      scrollBtn.css({ 'opacity': 1 });

      setTimeout(function () {
        scrollBtn.fadeOut(500);
      }, 3000);
    }

    scrollBtn.click(function () {
      $('html, body').scrollTop(0);
    });

    if ($(window).scrollTop() === 0) {
      $('#top-nav .nav-link').removeClass('active');
      $('#top-nav .nav-link[href="#home"]').addClass('active');
      $('#side-scroll-nav .nav-link').removeClass('active');
      $('#side-scroll-nav .nav-link[href="#home"]').addClass('active');
    }
  });

  // fix for offcanvas scrolling
  $('.offcanvas .nav-link').on('click', function (e) {
    e.preventDefault();

    var target = $(this).attr('href');
    var targetElement = $(target);

    if (targetElement.length) {
      $('html, body').animate({
        scrollTop: targetElement.offset().top
      }, 300);

      $('#mobile-menu').offcanvas('hide');
    }
  });

  // Parallax effect for background images

  var velocity = 0.2;

  function update() {
    var pos = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.section-background').css('top', -pos * 0.1 + 'px');

    if ($(window).width() > 768) {
      $('.section-bg').each(function () {
        var $element = $(this);
        var elementOffset = $element.offset().top;

        if (elementOffset < pos + windowHeight && elementOffset + $element.height() > pos) {
          var newPosition = Math.round((elementOffset - pos) * velocity);
          $element.css('backgroundPosition', '50% ' + newPosition + 'px');
        }
      });
    } else {
      $('.section-bg').css('backgroundPosition', 'initial');
    }
  };

  // Bind update function to scroll event
  $(window).on('scroll', update);

  $(document).ready(update);



  // Animations

  // fade from top to bottom
  gsap.utils.toArray('.animation-block').forEach(container => {
    gsap.from(container.querySelectorAll('.fade-down-animation'), {
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
      opacity: 0,
      duration: 2,
      stagger: 0.3
    });
  });

  if (width < 768) {
    // fade
    gsap.utils.toArray('.animation-block').forEach(container => {
      gsap.from(container.querySelectorAll('.fade-animation'), {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 0,
        duration: 2,
        stagger: 0.3
      });
    });

    // fade from bottom to top

    gsap.utils.toArray('.animation-block').forEach(container => {
      gsap.from(container.querySelectorAll('.fade-from-bottom-animation'), {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 0,
        y: 100,
        duration: 1.5,
        stagger: 0.3
      });
    });

    // slide from left to right

    gsap.utils.toArray('.animation-block').forEach(container => {
      gsap.from(container.querySelectorAll('.slide-from-left-animation'), {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        x: -100,
        duration: 1.5,
        stagger: 0.3
      });
    });

    // slide from right to left
    gsap.utils.toArray('.animation-block').forEach(container => {
      gsap.from(container.querySelectorAll('.slide-from-right-animation'), {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        x: 100,
        duration: 1.5,
        stagger: 0.3
      });
    });

  }

  // Form submission code
  $('#contact-form').submit(function(event) {
    event.preventDefault();
    
    var form = $(this);
    var submitButton = form.find('button[type="submit"]');
    var originalButtonText = submitButton.text();
    
    submitButton.prop('disabled', true).text('Sending...');

    grecaptcha.ready(function() {
      grecaptcha.execute('6LcK5F8qAAAAABeAA22STia90Hp3V8xg1_TkYfON', {action: 'submit'}).then(function(token) {
        $('#g-recaptcha-response').val(token);

        $.ajax({
          url: form.attr('action'),
          method: form.attr('method'),
          data: form.serialize(),
          dataType: 'json',
          success: function(response) {
            alert('Form submitted successfully!');
            form[0].reset();
          },
          error: function(err) {
            alert('Oops! There was a problem submitting your form');
          },
          complete: function() {
            submitButton.prop('disabled', false).text(originalButtonText);
          }
        });
      });
    });
  });

});
