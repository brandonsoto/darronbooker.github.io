$(function () {
    var m = new Map();
    var selected_pic = "";
    var slideIndex = -1;

    $.getJSON("gallery.json", function (json) {
        $.each(json, function (key, val) {
            $.each(val, function (inner_key, inner_value) {
                m.set(inner_value["thumbnail"], inner_value["images"]);

                var $div = $("<div>").addClass("col-md-4 gal-img");

                $("<img>").addClass("img-fluid")
                    .attr("src", inner_value["thumbnail"])
                    .on('click', function () {
                        for (var i = 0; i < inner_value["images"].length; i++) {
                            var $full_image = $("<div>").addClass("mySlides");
                            $("<div>").addClass("numbertext").html((i + 1) + " / " + inner_value["images"].length).appendTo($full_image);
                            var $image = $("<img>").attr("src", inner_value["images"][i]);
                            $image.attr("width", "100%").appendTo($full_image);
                            $full_image.appendTo("#modal-content");
                        }
                        selected_pic = inner_value["thumbnail"];
                        console.log('selected = ' + selected_pic);
                        openModal();
                    })
                    .appendTo($div);
                $div.appendTo("#gallery-row");
            });
        });

        $("#modal-close").on('click', closeModal);

        $("#modal-next").on('click', function () {
            plusSlides(1);
        });

        $("#modal-prev").on('click', function () {
            plusSlides(-1);
        });
    });

    // Open the Modal
    function openModal() {
        slideIndex = 0;
        $('#myModal').attr('style', "display: block");
        showSlides(slideIndex);
    }

    // Close the Modal
    function closeModal() {
        selected_pic = "";
        slideIndex = -1;
        $('#myModal').attr('style', "display: none");
        $(".mySlides").remove();
    }


    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        if (selected_pic === "" || !m.has(selected_pic)) {
            return;
        }
        var i;
        var slides = document.getElementsByClassName("mySlides");
        if (n >= slides.length) {
            slideIndex = 0;
        }
        if (n < 0) {
            slideIndex = slides.length - 1;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex].style.display = "block";
    }
});
