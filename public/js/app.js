$('ul.nav.navbar-nav li a').click(function() {
  var m = $(this).attr('href');
    if (m == '#moretop'){
      var dropdownChoice = $(this).find('ul li a').attr('href');
      $('section'+dropdownChoice).animate({
        scrollTop : 0
        }, 'slow', function(){
            // console.log('success!')
        });
    } else if (m == '#product1' || m == '#product2' || m == '#product3' || m == '#product4') {
      scrollToProductSection(m);
    } else if (m == '#home') {
      $('#collapsedMenu.in').removeClass('in');
      $('section.allsections').css({'visibility' : 'hidden', 'display' : 'none'});
      $('div.pageBody div.responsiveHeader').css({'visibility' : 'visible', 'display' : 'block'});
      $('html, body').animate({
        scrollTop: 0
        }, 'slow', function(){
          // console.log('success!')
      });
    } else if (m !== undefined) {
      $('#collapsedMenu.in').removeClass('in');
      $('.responsiveHeader').css({'visibility' : 'hidden', 'display' : 'none'});
      $('section.allsections').not(m).css({'visibility' : 'hidden', 'display' : 'none'});
      $('section'+m+'.allsections').css({'display': 'block','visibility' : 'visible'});
      $('section'+m+'.allsections').animate({
        scrollTop : 0
        }, 'slow', function(){
            // console.log('success!')
        });
    }
});

$('.navbar-brand').click(function(){
  $('.responsiveHeader').css({'visibility' : 'visible', 'display' : 'inline-block'});
  $('section').css({'visibility' : 'hidden', 'display' : 'none'});
  $('html, body').animate({
    scrollTop: 0
    }, 'slow', function(){
        // console.log('success!')
    });
});

$('.col-xs-3.col-md-4').click(function(){
  var productTarget = $(this).find('a').attr('href');
    scrollToProductSection(productTarget);
});

$('.product .sectionheader a').click(function(){
  $('#collapsedMenu.in').removeClass('in');
  scrollToProductSection($(this).attr('href'));
});

function scrollToProductSection(selector) {
  console.log(selector)
  $('.responsiveHeader').css({'visibility' : 'hidden', 'display' : 'none'});
  $('section.allsections').not(selector).css({'visibility' : 'hidden', 'display' : 'none'});
  $('section#products.allsections').css({'visibility' : 'visible', 'display' : 'block'});
  $('div.product').not(selector).css({'visibility' : 'hidden', 'display' : 'none'});
  $('div'+selector+'.product').css({'visibility' : 'visible', 'display' : 'block'});
  $('#products').animate({
      scrollTop: 0
  },'slow', function(){
      // console.log('success!')
  });
}

$('#shareRoundIcons').jsSocials({
    shares: [ 'email',  'twitter', 'facebook', 'linkedin', 'pinterest', 'stumbleupon', 'whatsapp', 'messenger' ],
    url: 'http://artisanmemoirs.com',
    text: 'text to share',
    showLabel: false,
    showCount: false,
    shareIn: 'popup',

    on: {
        click: function(e) {},
        mouseenter: function(e) {},
        mouseleave: function(e) {}
    }
});
