(function () {

    'use strict';



    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var tabClickTrigger = function () {
        $('.fh5co-tab-menu a').on('click', function (event) {
            event.preventDefault();
            var $this = $(this),
                data = $this.data('tab');

            // add/remove active class
            $('.fh5co-tab-menu li').removeClass('active');
            $this.closest('li').addClass('active');

            $('.fh5co-tab-content.active').removeClass('active');
            $('.fh5co-tab-content[data-content="' + data + '"]').addClass('active');
        })
    };

    var collapsableCards = function () {
        let coll = document.getElementsByClassName("collapsible");

        for (let tag of coll) {
            tag.addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.querySelector('.content');
                var arrowdowm = this.querySelector('.icon-angle-down');
                var arrowup = this.querySelector('.icon-angle-up');
                if (content.style.display === "block") {
                    this.classList.remove("bordered-card");
                    content.style.display = "none";
                    arrowdowm.style.display = "table";
                    arrowup.style.display = "none";
                } else {
                    this.classList.add("bordered-card");
                    content.style.display = "block";
                    arrowdowm.style.display = "none";
                    arrowup.style.display = "table";

                }
            });
        }
    }
    var showMessage = function (messageDiv, message) {
        messageDiv.html(message);
        messageDiv.fadeIn();
        setTimeout(function () {
            messageDiv.fadeOut();
        }, 3000);
    }

    var showWarningMessage = function (message) {
        showMessage($('#form-message-warning'), message)
    }
    var showSuccessMessage = function () {
        showMessage($('#form-message-success'), "Your message is successfully sent!");
    }

    var contactForm = function () {
        $('#contactForm').submit(function (e) {
            e.preventDefault();
            var $submit = $('.submitting');
            var isInvalid = false;
            $('#contactForm .form-control:required').each(function () {
                if (!$(this)[0].checkValidity()) {
                    isInvalid = true;
                }
            })
            if (!isInvalid) {
                $.ajax({
                    type: "POST",
                    url: "https://formspree.io/f/xzbopjzb",
                    data: $('#contactForm').serialize(),
                    headers: {
                        'Accept': 'application/json'
                    },
                    beforeSend: function () {
                        $submit.css('display', 'block')
                    },
                    success: function (msg) {
                        showSuccessMessage()
                        $('#contactForm').each(function () {
                            this.reset();
                        });
                        $submit.css('display', 'none');
                    },
                    error: function (err) {
                        showWarningMessage("Something went wrong. Please try again.")
                        $submit.css('display', 'none');

                    }
                });
            }
        });

    };
    $(function () {
        tabClickTrigger();
        collapsableCards();
        contactForm();
    });

}());
