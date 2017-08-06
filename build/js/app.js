/* eslint-disable */

$('.footerTxt.col-md-4.col-sm-3 p')
    .click(function() {
        // just send them to the contact form?
    });

$('a')
    .click(function() {
        var m = $(this)
            .attr('href');
        if (m === undefined) return;

        const regex = /["product"]\d/g;
        let product = null;
        product = regex.exec(m);

        $('.responsiveHeader')
            .css({ display: 'none' });
        $('section')
            .not(m)
            .css({ display: 'none' });
        $('section' + m)
            .css({ display: 'block' });
        $('.collapse')
            .removeClass('in');

        if (product) {
            $('.products')
                .css({ display: 'block' });
        } else if (m === "#home") {
            $('.responsiveHeader')
                .css({ display: 'block' });
        }
    });