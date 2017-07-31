let mailObject = {};

$('form').on('submit', (event) => {
  event.preventDefault();
  mailObject = $('form').serializeArray();
console.log(mailObject);

$.post({
    url: "send.php",
    dataType: "json",
    data: mailObject
  })
    .done(function(res) {
      // console.log('done: ', res);
  })
    .fail(function(err) {
      // console.log('error: ', err);
  })
    .always(function() {
      // console.log('finished');
    });
  });