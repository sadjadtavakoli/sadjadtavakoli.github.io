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

	var getHeight = function () {
		var extraHeight = 0;

		if (isMobile.any()) extraHeight = 50;

		$('#fh5co-main').prop('style').height = $('.fh5co-tab-content.active').height() + extraHeight + "px";
		// setTimeout(function(){
		// $('#fh5co-main').stop().animate({
		// 	'height': $('.fh5co-tab-content.active').height() + extraHeight
		// });
		// }, 200);

	};

	var pieChart = function () {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 10,
			lineCap: 'butt',
			barColor: '#17e7a4',
			trackColor: "#000000",
			size: 160,
			animate: 1000
		});
	};

	var tabContainer = function () {
		getHeight();
		$(window).resize(function () {
			getHeight();
		})
	};

	var tabClickTrigger = function () {
		$('.fh5co-tab-menu a').on('click', function (event) {
			event.preventDefault();
			var $this = $(this),
				data = $this.data('tab'),
				pie = $this.data('pie');

			// add/remove active class
			$('.fh5co-tab-menu li').removeClass('active');
			$this.closest('li').addClass('active');

			$('.fh5co-tab-content.active').addClass('fadeOutDown');

			$('.fh5co-tab-content.active').removeClass('active fadeOutDown fadeInUp');
			$('.fh5co-tab-content[data-content="' + data + '"]').addClass('fadeInUp active');
			getHeight();

			if (pie === 'yes') {
				setTimeout(function () {
					pieChart();
				}, 800);
			}

		})
	};
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
		showMessage($('#form-message-success'), "Your message was sent, thank you!");
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
		tabContainer();
		tabClickTrigger();
		contactForm();
	});

}());
