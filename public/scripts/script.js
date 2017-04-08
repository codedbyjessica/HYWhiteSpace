(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var index = [];
var contact = [];
var faq = [];

var slider = {};
slider.pages = function () {
	$('#selectedGallery ul li:last-child').prependTo('#selectedGallery ul');

	var moveLeft = function moveLeft() {
		$('#selectedGallery ul').animate({ left: "70vw" }, 400, function () {
			$('#selectedGallery ul li:last-child').prependTo('#selectedGallery ul');
			$('#selectedGallery ul').css('left', '');
		});
	};

	var moveRight = function moveRight() {
		$('#selectedGallery ul').animate({ left: "-70vw" }, 400, function () {
			$('#selectedGallery ul li:first-child').appendTo('#selectedGallery ul');
			$('#selectedGallery ul').css('left', '');
		});
	};

	$('.arrowLeft').on("click", function () {
		moveLeft();
	});

	$('.arrowRight').on("click", function () {
		moveRight();
	});
};

var portfolio = {};
portfolio.pages = function () {
	$("#viewPortfolio").on("click", function () {
		$("#viewPortfolioTab").fadeOut();
		$("#portfolioGallery").slideDown();
	});

	$("#closePortfolio").on("click", function () {
		$("#portfolioGallery").slideUp();
		$("#viewPortfolioTab").slideDown();
	});
};

var testimonial = {};
testimonial.pages = function () {
	$("#testimonialsOne").show();
	$("a.testimonialsLinks").on("click", function () {
		var targetPage = $(this.hash);
		$(".testimonials").hide();
		targetPage.fadeIn();
		$(".testimonialsLinks").removeClass("current");
		$(this).addClass("current");
	});
};

var currentNav = {};
/////Smooth Scroll
currentNav.smoothScroll = function () {
	$("a").click(function () {
		//replace the first forward slash (/) in the pathname for the current location
		//compare it to the link that's been clicked
		//check link matches current domain
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			// Assign the variable target, with the hash of the link that's been clicked (i.e. #hash)
			var target = $(this.hash);
			// check if element exists (with target.length)
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				//animation
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});
};

// select all links in header
var navItems = $('.navSideBar a');
// empty array to store hrefs (ids)
var navHrefs = [];

for (var i = 0; i < navItems.length; i++) {
	// select href
	currentNav.href = $(navItems[i]).attr('href');
	// push into array
	navHrefs.push(currentNav.href);
}
console.log(navHrefs);
currentNav.scrollEffect = function () {
	//when scrolling
	$(window).on('scroll', function () {
		// get position of the window from top of page
		currentNav.windowPosition = $(window).scrollTop();
		// get height of window
		currentNav.windowHeight = $(window).height();
		// get height of document page
		currentNav.docHeight = $(document).height();

		//turn side nav into white when hitting specific dark sections
		currentNav.topPosition = $("#top").offset().top;
		currentNav.top = $("#top").height() / 2;

		currentNav.testimonialsPosition = $("#testimonials").offset().top - $("#testimonials").height() / 2;
		currentNav.testimonials = $("#testimonials").height() + currentNav.testimonialsPosition;
		// console.log(currentNav.windowPosition, currentNav.testimonialsPosition , currentNav.testimonials)
		if (currentNav.windowPosition >= currentNav.topPosition && currentNav.windowPosition < currentNav.top) {
			$(".navLine").addClass('navLineLight');
			$(".navLabel").addClass('navLabelLight');
		} else if (currentNav.windowPosition >= currentNav.testimonialsPosition && currentNav.windowPosition < currentNav.testimonials) {
			$(".navLine").addClass('navLineLight');
			$(".navLabel").addClass('navLabelLight');
		} else {
			$(".navLine").removeClass('navLineLight');
			$(".navLabel").removeClass('navLabelLight');
		}
		// make nav a current when href matches section id (when specific section is top of pg)
		for (var i = 0; i < navHrefs.length; i++) {
			var sectionId = navHrefs[i];
			// get position of each section from top of page
			currentNav.sectionPosition = $(sectionId).offset().top;
			//but like, not realllyyy top of page (that would be too late), when it hits around halfway
			currentNav.sectionPosition -= 300;
			// get height of each section
			currentNav.sectionHeight = $(sectionId).height();

			// if top of window is within each section, set that section as current
			if (currentNav.windowPosition >= currentNav.sectionPosition && currentNav.windowPosition < currentNav.sectionPosition + currentNav.sectionHeight) {
				$('a[href="' + sectionId + '"]').addClass('current');
			} else {
				$('a[href="' + sectionId + '"]').removeClass('current');
			};
		};
	});
};

var menu = {};
menu.collapse = function () {
	$('.faqItem').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
	});
};

var burgerMenu = {};
burgerMenu.collapse = function () {
	$('#burgerMenu').on('click', function (e) {
		e.preventDefault();
		$(".indexNav").slideToggle();
	});

	$(".navLeft a, section, .headerWrapper, .logo").on("click", function () {
		if ($(window).width() < 480) {
			$(".indexNav").slideUp();
		}
	});

	$(window).on("resize", function () {
		if ($(window).width() > 480) {
			$(".indexNav").show();
		}
	});
};

/////i n i t !!!

index.init = function () {
	currentNav.scrollEffect();
	currentNav.smoothScroll();
	portfolio.pages();
	testimonial.pages();
	slider.pages();
	burgerMenu.collapse();
};

faq.init = function () {
	menu.collapse();
};

contact.init = function () {
	currentNav.smoothScroll();
	burgerMenu.collapse();
};

////calling that init!

if ($("body#index").length > 0) {
	$(function () {
		index.init();
	});
}

if ($("body#faq").length > 0) {
	$(function () {
		faq.init();
	});
}

if ($("body#contact").length > 0) {
	$(function () {
		contact.init();
	});
}

},{}]},{},[1]);
