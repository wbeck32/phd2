$('ul.nav.navbar-nav li a').click(function() {
  var m = $(this).attr('href');
    console.log(m);
  if (m == '#products') {
    scrollToProducts();
  } else if (m == '#moretop' || m == '#product1' || m == '#product2' || m == '#product3' || m == '#product4' ) {
      var dropdownChoice = $(this).find('ul li a').attr('href');
      $('section'+dropdownChoice).animate({
        scrollTop : 0
        }, 'slow', function(){
            // console.log('success!')
        });
  } else if (m == '#home') {
      $('#collapsedMenu.in').removeClass('in');
      $('section.allsections').css({'visibility' : 'hidden', 'display' : 'none'});
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      $('div.pageBody div.responsiveHeader').css({'visibility' : 'visible', 'display' : 'inline-block'});
  } else {
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
  $('.responsiveHeader').css({'visibility' : 'hidden', 'display' : 'none'});
  if(productTarget === '#product1' || productTarget === '#products') {
    scrollToProducts();
  } else {
    scrollToProductSection(productTarget);
  }
});

$('.product .sectionheader a').click(function(){
  $('#collapsedMenu.in').removeClass('in');
  scrollToProductSection($(this).attr('href'));
});

function scrollToProducts () {
  $('#collapsedMenu.in').removeClass('in');
  $('.responsiveHeader').css({'visibility' : 'hidden', 'display' : 'none'});
  $('section#products.allsections').css({'visibility' : 'visible', 'display' : 'block'});
  $('div .product').css({'visibility' : 'visible', 'display' : 'block'});
  $('#products').animate({
    scrollTop : 0
    }, 'slow', function(){
      // console.log('success!');
    });
}

function scrollToProductSection(selector) {
  $('section#products.allsections').css({'visibility' : 'visible', 'display' : 'block'});
  $('div.product').not(selector).css({'visibility' : 'hidden', 'display' : 'none'});
  $('div.product').filter(selector).css({'visibility' : 'visible', 'display' : 'block'});
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
