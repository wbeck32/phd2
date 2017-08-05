function hideMail() {
  console.log('obfuscation');
  var u = 'user';
  var arr = '@';
  var d = 'domain';
  var dot = '.';
  var t = 'tldccc';
  // document.write("<a href=" + "mail" + "to:" + u + arr + d + dot + t +
  //   ">" + "Email (concatenation)" + "</a>" + "<br>");
}

$('.footerTxt.col-md-4.col-sm-3 p').click(function() {
// just send them to the contact form?
});

$('a').click(function() {
  var m = $(this).attr('href');
  if (m == '#moretop') {
    var dropdownChoice = $(this)
    .find('ul li a')
    .attr('href');
    $('section' + dropdownChoice).animate(
      {
        scrollTop: 0
      },
      'slow',
      function() {
        // console.log('success!')
      }
    );
  } else if (
    m == '#product1' ||
    m == '#product2' ||
    m == '#product3' ||
    m == '#product4'
  ) {
    scrollToProductSection(m);
  } else if (m == '#home') {
    $('#collapsedMenu.in').removeClass('in');
    $('section').css({ visibility: 'hidden', display: 'none' });
    $('div.pageBody div.responsiveHeader').css({
      visibility: 'visible',
      display: 'block'
    });
    $('html, body').animate(
      {
        scrollTop: 0
      },
      'slow',
      function() {
        // console.log('success!')
      }
    );
  } else if (m !== undefined) {
    $('#collapsedMenu.in').removeClass('in');
    $('.responsiveHeader').css({ visibility: 'hidden', display: 'none' });
    $('section').not(m).css({ visibility: 'hidden', display: 'none' });
    $('section' + m).css({ display: 'block', visibility: 'visible' });
    $('section' + m).animate(
      {
        scrollTop: 0
      },
      'slow',
      function() {
        // console.log('success!')
      }
    );
  }
});

$('.col-xs-3.col-md-4').click(function() {
  var productTarget = $(this).find('a').attr('href');
  scrollToProductSection(productTarget);
});

function scrollToProductSection(selector) {
  // console.log(selector);
  $('.responsiveHeader').css({ visibility: 'hidden', display: 'none' });
  $('section').not(selector).css({ visibility: 'hidden', display: 'none' });
  $('section.products').css({
    visibility: 'visible',
    display: 'block'
  });
  $('div.product').not(selector).css({ visibility: 'hidden', display: 'none' });
  $('section' + selector + '.container-fluid.product').css({
    visibility: 'visible',
    display: 'block'
  });
  $('#products').animate(
    {
      scrollTop: 0
    },
    'slow',
    function() {
      // console.log('success!')
    }
  );
}