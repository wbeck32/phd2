/* eslint-disable */

$('.footerTxt.col-md-4.col-sm-3 p')
    .click(function() {
        // just send them to the contact form?
    });

$('a')
    .click(function() {
        var m = $(this).attr('href');
        const regex = /["product"]\d/g;
        let product = null;
        product = regex.exec(m);

        $('.responsiveHeader')
                .css({ visibility: 'hidden', display: 'none' });
        $('section')
                .not(m)
                .css({ visibility: 'hidden', display: 'none' });
        $('section' + m)
                .css({ display: 'block', visibility: 'visible' });

        if (product) {
            $('.products')
                .css({ display: 'block', visibility: 'visible' });
        } else if (m === "#home") {
            $('.responsiveHeader')
                .css({ visibility: 'visible', display: 'block' });
          }
    });