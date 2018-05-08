$(function () {
    "use strict";

    validate_contact_form();

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    function validate_contact_form() {
        $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
            preventSubmit: true,
            submitError: function ($form, event, errors) {
                // additional error messages or events
            },
            submitSuccess: function ($form, event) {
                // Prevent spam click and default submit behaviour
                $("#btnSubmit").attr("disabled", true);
                event.preventDefault();

                // get values from FORM
                var name = $("input#name").val();
                var email = $("input#email").val();
                var message = $("textarea#message").val();
                var gotcha = $("input#gotcha").val();

                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }

                if (gotcha !== "") {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry, this appears to be spam. It will not be sent. :(");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    return;
                }

                $.ajax({
                    url: "https://formspree.io/darronbookerdesign@gmail.com",
                    type: "POST",
                    data: {
                        name: name,
                        email: email,
                        message: message
                    },
                    dataType: "json",
                    cache: false,
                    success: function () {
                        // Enable button & show success message
                        $("#btnSubmit").attr("disabled", false);
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Your message has been sent.</strong>");
                        $('#success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#contactForm').trigger("reset");
                    },
                    error: function () {
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                });
            },
            filter: function () {
                return $(this).is(":visible");
            }
        });
    } // end of validate_contact_form
}); // end of document ready
