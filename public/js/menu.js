$('ul li a.link').on('click', function() {
  var m = $(this).attr('id');
  var sectionId = '#' + m;
  $('div.headerArea').addClass('responsiveHeader');
  $('section.allsections').removeClass('visible').addClass('invisible');
  $('section' + sectionId).removeClass('invisible').addClass('visible');
});
