$( "ul li a.link" ).on( "click", function() {
  var m = $(this).attr('id');
  var sectionId = '#'+m;
  $("section.allsections").removeClass('visible').addClass('invisible'); //attr(id) !== sectionId
  $("section"+sectionId).removeClass('invisible').addClass('visible');
});
