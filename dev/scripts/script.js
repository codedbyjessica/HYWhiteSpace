
/// SLIDE IMAGES NOT RESPONSIVE WHEN PERCENTAGES OR VW.
// WHY IS CONTENT WRAPPER WIDTH STATIC... OH WAIT ITS JUST NOT RESPONSIVE.	

var slider = {}

	$('#selectedGallery ul li:last-child').prependTo('#selectedGallery ul');

	var moveLeft = function() {
		$('#selectedGallery ul').animate({left: "70vw"}, 400, function () {
			$('#selectedGallery ul li:last-child').prependTo('#selectedGallery ul');
			$('#selectedGallery ul').css('left', '');
		});
	};

	var moveRight = function() {
		$('#selectedGallery ul').animate({left: "-70vw"}, 400, function () {
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



var portfolio ={};
portfolio.pages = function(){
	$("#viewPortfolio").on("click", function() {
		$("#viewPortfolioTab").fadeOut();
		$("#portfolioGallery").slideDown();
	});

	$("#closePortfolio").on("click", function() {
		$("#portfolioGallery").slideUp();
		$("#viewPortfolioTab").slideDown();
	});
};

var faq ={};

faq.pages = function(){
	$("a.faqPlus").on("click", function() {
			var targetPage = $(this.hash)
			$(".faqAnswers").hide();
			console.log(targetPage);
			targetPage.show();
	});
};

var testimonial ={};

testimonial.pages = function(){
	$("#testimonialsOne").show();
	$("a.testimonialsLinks").on("click", function() {
			var targetPage = $(this.hash)
			$(".testimonials").hide();
			targetPage.fadeIn();
			$(".testimonialsLinks").removeClass("current");
			$(this).addClass("current");
	});
};

var currentNav = {}; 
/////Smooth Scroll
currentNav.smoothScroll = function () {
	$("a").click(function() {
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

		currentNav.testimonialsPosition = $("#testimonials").offset().top  - $("#testimonials").height()/2;
		currentNav.testimonials = $("#testimonials").height() + currentNav.testimonialsPosition;

		// console.log(currentNav.windowPosition, currentNav.testimonialsPosition , currentNav.testimonials)

			if (currentNav.windowPosition >= currentNav.topPosition && currentNav.windowPosition < currentNav.top) {
				$(".navLine").addClass('navLineLight');
				$(".navLabel").addClass('navLabelLight');
			} else if (currentNav.windowPosition >= currentNav.testimonialsPosition && currentNav.windowPosition < currentNav.testimonials){
				$(".navLine").addClass('navLineLight');
				$(".navLabel").addClass('navLabelLight');
			}
			else {
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
				$(`a[href="${sectionId}"]`).addClass('current');
			} else {
				$(`a[href="${sectionId}"]`).removeClass('current');
			};
		}; 
	});
};



//gotta call dat
$(function () {
	currentNav.scrollEffect();
	currentNav.smoothScroll();
	portfolio.pages();
	testimonial.pages();
	faq.pages();
});
