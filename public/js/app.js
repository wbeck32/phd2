$('ul.nav.navbar-nav li').click(function() {
  var m = $(this).find('a').attr('href');
  if (m !== '#more' && m!=='#home') {
    $('section.allsections').not(m).css({'visibility' : 'hidden', 'display' : 'none'});
    $('.responsiveHeader').css({'visibility' : 'hidden', 'display' : 'none'});
    $('section'+m+'.allsections').css({'display': 'inline-block','visibility' : 'visible'});
    // window.location.href = m+'.allsections div.title';
    var dest = m;
    $('window').scroll(m);
    // console.log(m+' > div.title')
    // window.location.href = dest;
  }
  if (m == '#home') {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('section.allsections').not(m).css({'visibility' : 'hidden', 'display' : 'none'});
    $('div.pageBody div.responsiveHeader').css({'visibility' : 'visible', 'display' : 'inline-block'});
  }
});

$('.navbar-brand').click(function(){
  $('.responsiveHeader').css({'visibility' : 'visible', 'display' : 'inline-block'});
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

$('.col-xs-3.col-md-4').click(function(){
  var productTarget = $(this).find('a').attr('href');
  $('.responsiveHeader').hide();
  $('section#products').css('visibility', 'visible');
  if(productTarget === '#product1') {
    $('section#products').css('margin-top', '100px')
    window.location.href = '#products';
  }
  window.location.href = productTarget;
});


$("#shareRoundIcons").jsSocials(
  {
    shares: ["email", "twitter", "facebook", "linkedin", "pinterest", "stumbleupon", "whatsapp", "messenger" ],
    url: "http://artisanmemoirs.com",
    text: "text to share",
    showLabel: false,
    showCount: false,
    shareIn: "popup",
    on: {
        click: function(e) {},
        mouseenter: function(e) {},
        mouseleave: function(e) {}
    }
}
);
