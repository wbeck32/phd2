let mailObject = {};

$('form')
    .on('submit', (event) => {
        event.preventDefault();
        mailObject = $('form')
            .serializeArray();

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
                $('form')
                    .get(0)
                    .reset();
                $('#thanksModal')
                    .modal('show');
                $('.responsiveHeader')
                    .css({ display: 'block' });
                $('section')
                    .css({ display: 'none' });
                // console.log('finished');
            });

    });