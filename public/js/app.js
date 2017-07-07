$('ul.nav.navbar-nav li').click(function() {
  var m = $(this).find('a').attr('href');
  console.log(m);
  if (m === '#home') {
    $('.responsiveHeader').show().css({'visibility' : 'visible', 'display' : 'inline-block'});
    window.location.href = m;
  }
  $('section').not(m).hide();
  $('.responsiveHeader').hide();
  $('section'+m+'.allsections').css({'margin-top' : '10vh', 'display': 'inline-block','visibility' : 'visible', 'display' : 'inline-block'});
  window.location.href = m+' .title';
});

$('.navbar-brand').click(function(){
  $('.responsiveHeader').show();
  window.location.href = '#home';
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
