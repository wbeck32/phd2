$('ul li a.link').on('click', function() {
  var m = $(this).attr('id');
  var sectionId = '#' + m;
  $('section.allsections').removeClass('visible').addClass('invisible');
  $('section' + sectionId).removeClass('invisible').addClass('visible');
});



$('.col-xs-3.col-md-4 a.link').click(function(){
  var productTarget = $(this).attr('href');
  console.log(productTarget);
  window.location.href = '#'+productTarget;
  $('.responsiveHeader').css('visibility', 'hidden');
  $('section.products').css('visibility', 'visible');
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
