/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Hero Slider
4. Init SVG
5. Initialize Hamburger
6. Initialize Testimonials Slider
7. Initialize Parallax


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var hamb = $('.hamburger');
	var header = $('.header');
	var hambActive = false;
	var menuActive = false;
	var ctrl = new ScrollMagic.Controller();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initHeroSlider();
	initSvg();
	initHamburger();
	initTestimonialsSlider();
	initParallax();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if(window.innerWidth < 992)
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}
			else
			{
				header.removeClass('scrolled');
			}
		}
		else
		{
			if($(window).scrollTop() > 100)
			{
				header.addClass('scrolled');
			}
			else
			{
				header.removeClass('scrolled');
			}
		}
		if(window.innerWidth > 991 && menuActive)
		{
			closeMenu();
		}
	}

	/* 

	3. Init Hero Slider

	*/

	function initHeroSlider()
	{
		if($('.hero_slider').length)
		{
			var owl = $('.hero_slider');

			owl.owlCarousel(
			{
				items:1,
				loop:true,
				smartSpeed:800,
				autoplay:true,
				nav:false,
				dots:false
			});

			// add animate.css class(es) to the elements to be animated
			function setAnimation ( _elem, _InOut )
			{
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function ()
				{
					var $elem = $(this);
					var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

					$elem.addClass($animationType).one(animationEndEvent, function ()
					{
						$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
					});
				});
			}

			// Fired before current slide change
			owl.on('change.owl.carousel', function(event)
			{
				var $currentItem = $('.owl-item', owl).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-out]");
				setAnimation ($elemsToanim, 'out');
			});

			// Fired after current slide has been changed
			owl.on('changed.owl.carousel', function(event)
			{
				var $currentItem = $('.owl-item', owl).eq(event.item.index);
				var $elemsToanim = $currentItem.find("[data-animation-in]");
				setAnimation ($elemsToanim, 'in');
			})

			// Handle Custom Navigation
			if($('.hero_slider_left').length)
			{
				var owlPrev = $('.hero_slider_left');
				owlPrev.on('click', function()
				{
					owl.trigger('prev.owl.carousel');
				});
			}

			if($('.hero_slider_right').length)
			{
				var owlNext = $('.hero_slider_right');
				owlNext.on('click', function()
				{
					owl.trigger('next.owl.carousel');
				});
			}
		}	
	}
});
