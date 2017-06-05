/*
 Jquery Validation using jqBootstrapValidation
 example is taken from jqBootstrapValidation docs
*/

$(function() {

    console.log("yyyyyyyyy");

    $("input,textarea").jqBootstrapValidation(
        {
            preventSubmit: true,
            submitError: function($form, event, errors) {
                // something to have when submit produces an error ?
                // Not decided if I need it yet
            },
            submitSuccess: function($form, event) {

                console.log("xxxxxxxx");

                event.preventDefault(); // prevent default submit behaviour
                // get values from FORM
                var name = $("input#name").val();
                var email = $("input#email").val();
                var message = $("textarea#message").val();
                var firstName = name; // For Success/Failure Message



                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }
                $.ajax({
                    url: "./server.js",
                    type: "POST",
                    data: {name: name, email: email, message: message},
                    cache: false,
                    success: function() {
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append( "</button>");
                        $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');

                        console.log('values submitting are: ', name, email, message);



                        //clear all fields
                        $('#contactForm').trigger("reset");
                    },
                    error: function() {
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append( "</button>");
                        $('#success > .alert-danger').append("<strong>Sorry "+firstName+" it seems that my mail server is not responding...</strong> Could you please email me directly to <a href='mailto:miles.hochstein@gmail.com?Subject=Message_Me from appliedinformationdesign.com'>miles.hochstein@gmail.com</a> ? Sorry for the inconvenience!");
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    },
                })
            },
            filter: function() {
                return $(this).is(":visible");
            },
        });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');

    console.log('**** values submitting are: ', name, email, message);

});
