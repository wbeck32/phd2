$('ul li a.link').on('click', function() {
  var m = $(this).attr('id');
  var sectionId = '#' + m;
  $('div.headerArea').addClass('responsiveHeader');
  $('section.allsections').removeClass('visible').addClass('invisible');
  $('section' + sectionId).removeClass('invisible').addClass('visible');
});


$("#shareRoundIcons").jsSocials(
  {
    shares: ["email", "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "pocket", "whatsapp", "messenger", "vkontakte", "telegram", "line"],
    url: "http://url.to.share",
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
