$('ul li a.link').on('click', function() {
  var m = $(this).attr('id');
  var sectionId = '#' + m;
  $('div.headerArea').addClass('responsiveHeader');
  $('section.allsections').removeClass('visible').addClass('invisible');
  $('section' + sectionId).removeClass('invisible').addClass('visible');
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
