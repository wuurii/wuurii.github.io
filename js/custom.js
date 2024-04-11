$(function(){
	/* header scroll fixed */
	var headerHeight = document.querySelector('header').offsetHeight;
	$(window).scroll(function(){
		if($(window).scrollTop() > headerHeight) {
			$('header').addClass('active');
			$('.order_right_wrap').addClass('active');
			$('.gotop').addClass('active');
		} else {
			$('header').removeClass('active');
			$('.order_right_wrap').removeClass('active');
			$('.gotop').removeClass('active');
		}
	});


	/* header search popup */
	$('.search_pop_btn').click(function(){
		$('.header_search_pop').toggle();
	});
	$('.search_pop_close').click(function(){
		$('.header_search_pop').hide();
	});

	/* brand tab menu */
	$('.brand_left_tab_panel ul li a').click(function(){
		$('.brand_left_tab_panel ul li a').removeClass('active');
		$(this).addClass('active');
		var thisCurrent = $(this).attr('data-brand-tab');
		$('.brand_tab').removeClass('active');
		$('#' + thisCurrent).addClass('active');
	});

	/* delivery change tab */
	$('.del_tab_btns button').click(function(){
		$('.del_tab_btns button').removeClass('on');
		$(this).addClass('on')
		var thisCurrent = $(this).attr('data-del-tab');
		$('.del_tab').removeClass('active');
		$('#' + thisCurrent).addClass('active');
		if (thisCurrent == 'del_tab1') {
			fnMyAddressLoad();
		}
	});

	/* moblie menu accordion */
	$('.mo_menu_gnb_big_trigger').click(function(){
		$(this).parent('li').toggleClass('active');
		$(this).siblings('.mo_shop_sub').stop().slideToggle();
		// $('.mo_shop_sub').stop().slideToggle();
	});

	$('.mo_shop_sub_bottom ul li a').click(function(){
		$(this).parent('li').toggleClass('active');
		$(this).siblings('.mo_menu_gnb_small_wrap').stop().slideToggle();
	});

	/* moblie menu */
	$('.trigger').click(function(){
		$('.mobile_menu, .header_overlay, body').addClass('active');
	});
	$('.mo_menu_close, .header_overlay').click(function(){
		$('.mobile_menu, .header_overlay, body').removeClass('active');
	});

	// cart layer popup
	$('.hover_buy button, .cart_btn').click(function(){
		/* JYD 추가 s */
		fnCartLoad();
		/* JYD 추가 e */
		$('.cart_layer_popup, .cart_overlay, body').addClass('active');
	});
	$('.cart_layer_popup_close, .cart_overlay').click(function(){
		$('.cart_layer_popup, .cart_overlay, body').removeClass('active');
	});

	// cart layer popup accordion
	$('.accordion_btn').click(function(){
		$(this).siblings('.slide').stop().slideToggle(700);
		$(this).toggleClass('on');
	});

	// order page popup
	$('.orderer_info_change_pop_btn').click(function(){
		$('.orderer_info_change_pop, .shop_overlay').addClass('active');
	});
	$('.orderer_info_change_pop_close, .shop_overlay').click(function(){
		$('.orderer_info_change_pop, .shop_overlay').removeClass('active');
	});

	// order page popup
	$('.del_info_change_pop_btn').click(function(){
		$('.del_info_change_pop, .shop_overlay').addClass('active');
		fnMyAddressLoad();
	});
	$('.del_info_change_pop_close, .shop_overlay').click(function(){
		$('.del_info_change_pop, .shop_overlay').removeClass('active');
	});

	// FAQ accordion slide
	// $('.faq_ul_wrap li a').click(function(){
	// 	$(this).siblings('.faq_slide').stop().slideToggle();
	// 	$(this).parent('li').toggleClass('active');
	// 	$(this).toggleClass('active');
	// });

	$('.faq_ul_wrap li').click(function(){
		$(this).children('.faq_slide').stop().slideToggle();
		$(this).toggleClass('active');
		$(this).children('a').toggleClass('active');
	});

	// FAQ tab menu
	$('.faq_tab_btns button').click(function(){
		$('.faq_tab_btns button').removeClass('on');
		$(this).addClass('on');
		var thisCurrent = $(this).attr('data-faq-tab');
		$('.faq_tab').removeClass('active');
		$('#' + thisCurrent).addClass('active');
	});	

	// community ask accordion
	$('.t_content_ask').click(function(){
		$(this).siblings('.t_content_answer_wrap').stop().slideToggle();
	});

	// search result tab menu
	$('.search_tab_btns button').click(function(){
		$('.search_tab_btns button').removeClass('on');
		$(this).addClass('on');
		// JYD 추가
		if( typeof fnCateJson === 'function') {
			fnCateJson();
		}
		load_json(1);
		// TODO: JYD 주석처리
		/* var thisCurrent = $(this).attr('data-search-tab');
		$('.search_tab').removeClass('active');
		$('#' + thisCurrent).addClass('active'); */
	});	

	// index popup
	$('.index_popup_close').click(function(){
		$('.index_popup, .pop_overlay').addClass('closed');
	});

	// cart result scroll fixed
	// var resultTop = document.querySelector('.order_right_wrap').offsetTop;
	// $(window).scroll(function(){
	// 	if(resultTop >= headerHeight) {
	// 		// $('.order_right_wrap').addClass('active');
	// 	} else {
	// 		// $('.order_right_wrap').removeClass('active');
	// 	}
	// });

	/* main banner swiper */
	const swiper = new Swiper('.swiper', {
		// Default parameters
		speed: 800,
		autoplay: false, // 기존 true 배너가 1개라서 수정함. 20240116
		delay: 3000,
		slidesPerView: 1,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		loop: true,
		// Responsive breakpoints
		// breakpoints: {
		// 	// when window width is >= 320px
		// 	320: {
		// 		slidesPerView: 2,
		// 		spaceBetween: 20
		// 	},
		// 	// when window width is >= 480px
		// 	480: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 30
		// 	},
		// 	// when window width is >= 640px
		// 	640: {
		// 		slidesPerView: 4,
		// 		spaceBetween: 40
		// 	}
		// }
	})

	/* new product swiper */
	const swiper2 = new Swiper('.swiper-new', { // swiper 클래스 이름 변경하면 css도 스와이퍼 기본으로 적용해야함
		wrapperClass: 'swiper-wrapper-new-product', // wrapper 클래스 이름 변경하면 css도 스와이퍼 기본으로 적용해야함
		slidesPerView: 3.7,
		// slidesPerView: 4,
  	spaceBetween: 30,
		speed: 800,
		autoplay: false,
		delay: 3000,
		navigation: {
			nextEl: ".swiper-button-next-new",
			prevEl: ".swiper-button-prev-new",
		},
		loop: true,
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 1,
				spaceBetween: 30
			},
			// when window width is >= 640px
			640: {
				slidesPerView: 1,
				spaceBetween: 40,
				centeredSlides: true,
			},
			1024: {
				slidesPerView: 3.7,
				// slidesPerView: 4,
			}
		}
	})

	/* best product swiper */
	const swiper3 = new Swiper('.swiper-best', { // swiper 클래스 이름 변경하면 css도 스와이퍼 기본으로 적용해야함
		wrapperClass: 'swiper-wrapper-best-product', // wrapper 클래스 이름 변경하면 css도 스와이퍼 기본으로 적용해야함
		slidesPerView: 5,
  	spaceBetween: 15,
		speed: 800,
		autoplay: false,
		delay: 3000,
		navigation: {
			nextEl: ".swiper-button-next-best",
			prevEl: ".swiper-button-prev-best",
		},
		pagination: {
			el: ".swiper-pagination-progress",
			type: "progressbar",
		},
		loop: true,
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			400: {
				slidesPerView: 2,
				spaceBetween: 25
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 2,
				spaceBetween: 25
			},
			// when window width is >= 640px
			640: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			1023: {
				slidesPerView: 5,
				spaceBetween: 30
			}
		}
	})

	const swiper4 = new Swiper('.swiper-category', {
		wrapperClass: 'swiper-wrapper-category', // wrapper 클래스 이름 변경하면 css도 스와이퍼 기본으로 적용해야함
		speed: 800,
		autoplay: false,
		delay: 3000,
		slidesPerView: 1,
		pagination: {
			el: '.swiper-pagination-category',
			type: 'fraction',
		},
		// loop: true,
		// Responsive breakpoints
		// breakpoints: {
		// 	// when window width is >= 320px
		// 	320: {
		// 		slidesPerView: 2,
		// 		spaceBetween: 20
		// 	},
		// 	// when window width is >= 480px
		// 	480: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 30
		// 	},
		// 	// when window width is >= 640px
		// 	640: {
		// 		slidesPerView: 4,
		// 		spaceBetween: 40
		// 	}
		// }
	})
	
	const pagingSwiper = new Swiper(".swiper-category", {
		wrapperClass: 'swiper-wrapper-category',
		pagination: {
			el: ".swiper-pagination-category2",
			type: 'bullets',
			clickable: true,
		},
	});
	// 루프 때문에 2개가 더 생김 -> 루프 해제
	
	swiper4.controller.control = pagingSwiper;
	pagingSwiper.controller.control = swiper4;

	/* product detail swiper */
	const swiper5 = new Swiper('.swiper-product', {
		wrapperClass: 'swiper-wrapper-product',
		speed: 800,
		autoplay: true,
		delay: 3000,
		slidesPerView: 1,
		pagination: {
			el: '.swiper-product-pagination',
			type: 'bullets',
			clickable: true,
		},
		loop: true,
		// Responsive breakpoints
		// breakpoints: {
		// 	// when window width is >= 320px
		// 	320: {
		// 		slidesPerView: 2,
		// 		spaceBetween: 20
		// 	},
		// 	// when window width is >= 480px
		// 	480: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 30
		// 	},
		// 	// when window width is >= 640px
		// 	640: {
		// 		slidesPerView: 4,
		// 		spaceBetween: 40
		// 	}
		// }
	})

	/* popup-swiper */
	const swiper6 = new Swiper('.swiper-popup', {
		wrapperClass: 'swiper-wrapper-popup',
		speed: 800,
		autoplay: false,
		delay: 3000,
		slidesPerView: 1,
		navigation: {
			nextEl: ".swiper-button-popup-next",
			prevEl: ".swiper-button-popup-prev",
		},
		pagination: {
			el: '.swiper-pagination-popup',
			type: 'bullets',
			clickable: true,
		},
		loop: true,
	})
});
