// header top submenu
document.addEventListener('DOMContentLoaded', () => {
	if(document.querySelector('header').offsetWidth > 1024) {
		$('.header_top_sub_wrap').mouseenter(function(){ // pc일때
			$('.header_top_sub').stop().slideDown();
		});
		$('.header_top_sub_wrap').mouseleave(function(){
			$('.header_top_sub').stop().slideUp();
		});
	} else {
		$('.header_top_sub_wrap').click(function(){ // 모바일일때
			$('.header_top_sub').stop().slideToggle();
		});
	}

	// if(document.querySelector('.auto_btn').classList.contains('on')) {
	// 	document.querySelector('.auto_btn').style.backgroundColor = '#fc6d05';
	// 	document.querySelector('.auto_btn').innerText = '수정';
	// } else {
	// 	document.querySelector('.auto_btn').style.backgroundColor = '#ccc';
	// 	document.querySelector('.auto_btn').innerText = '수정불가';
	// }

	// var onBtn = document.querySelectorAll('.auto_btn');
	// if(onBtn.classList.con) {
	// 	$('.auto_btn')
	// }
});
$(function(){
	// order page popup
	$('.del_info_change_pop_btn').click(function(){
		$('.del_info_change_pop, .shop_overlay').addClass('active');
		fnMyAddressLoad();
	});
	$('.del_info_change_pop_close, .shop_overlay').click(function(){
		$('.del_info_change_pop, .shop_overlay').removeClass('active');
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
	// header top submenu
	// $('.header_top_sub_wrap').mouseleave(function(){
	// 	$('.header_top_sub').stop().slideUp();
	// });

	// $('.header_top_sub_wrap').on('mouseenter touchstart', function(e){
	// 	$('.header_top_sub').stop().slideDown();
	// });

	// header bottom gnb menu
	$('.gnb li').mouseenter(function(){
		$(this).children('.gnb_sub').stop().slideDown();
	});
	$('.gnb li').mouseleave(function(){
		$(this).children('.gnb_sub').stop().slideUp();
	});

	// mobile menu accordion
	$('.mo_gnb_box li').click(function(){
		$(this).toggleClass('active');
		$(this).children('.mo_gnb_box_sub').stop().slideToggle();
	});

	$('.mo_hamburger').click(function(){
		$('.mo_gnb, body').addClass('active');
	});
	$('.mo_gnb_close').click(function(){
		$('.mo_gnb, body').removeClass('active');
	});

	// report tab
	$('.deadline_btns button').click(function(){
		var currentTab = $(this).attr('data-report-table');
		var boolReload = false;
		/* 	대상탭 확인 후 tbody tr이 1줄 이하면 데이터 로딩이 처음이라고 간주고 로딩한다. */
		if (currentTab === 'report_table_02') {
			if ($(this).hasClass('on') === false ) {
				if ($('#listMonth tr').length <= 1) {
					boolReload = true;
				}
			}
		}
		
		$('.deadline_btns button').removeClass('on');
		$(this).addClass('on');

		$('.deadline_tab').removeClass('active');
		$('#' + currentTab).addClass('active');

		/* 테이블 데이터 통신 s */
		if (boolReload) {
			load_month_json(1);
		}
		/* 테이블 데이터 통신 e */
	});

	// report popup
	$('.di_reward_pop_btn').click(function(){
		$('.di_reward_pop').show();
		$('.report_overlay').addClass('active');
	});
	$('.c_com_pop_btn').click(function(){
		$('.c_com_pop').show();
		$('.report_overlay').addClass('active');
	});
	$('.co_reward_pop_btn').click(function(){
		$('.co_reward_pop').show();
		$('.report_overlay').addClass('active');
	});
	$('.unit_reward_pop_btn').click(function(){
		$('.unit_reward_pop').show();
		$('.report_overlay').addClass('active');
	});

	$('.reward_detail_popup_close').click(function(){
		$(this).parent('.reward_detail_popup').hide();
		$('.report_overlay').removeClass('active');
	});

	// sponsor pick pop
	$('.search_btn').click(function(){
		$('#target_id').val($(this).data('target_id'));
		load_json();
		$('.sponsor_pick_pop').show();
		$('.report_overlay').addClass('active');
	});
	$('.sponsor_pick_pop_close').click(function(){
		$('.sponsor_pick_pop').hide();
		$('.report_overlay').removeClass('active');
	});
	$('.fixed_btn').click(function(){
		$('.advancement_pop').show();
		$('.report_overlay').addClass('active');
	});
	$('.advancement_pop_close, .advancement_no').click(function(){
		$('.advancement_pop').hide();
		$('.report_overlay').removeClass('active');
	});

	// point details tab
	$('.point_details_tab_btns button').click(function(){
		$('.point_details_tab_btns button').removeClass('on');
		$(this).addClass('on');
		var pointTab = $(this).attr('data-point-tab');
		$('.pd_table').removeClass('active');
		$('#' + pointTab).addClass('active');
		load_json(1);
	});

	// reward withdraw pop
	$('.reward_withdraw_request_btn').click(function(){
		var $chk_withdrawal = $('#chk_withdrawal');
		if ($chk_withdrawal.val() == 'T') {
			$('.reward_withdraw_pop, .shop_overlay').addClass('active');
		} else {
			$.growl.warning({ message: '출금 요청 리워드를 확인하세요.<br />확인 후 적용을 클릭하세요.' });
			$('#ex_withdrawal').focus();
		}
	});
	$('.reward_withdraw_pop_close, .shop_overlay').click(function(){
		$('.reward_withdraw_pop, .shop_overlay').removeClass('active');
	});
	$('.reward_set').click(function(){
		$('.reward_withdraw_use_pop, .shop_overlay').addClass('active');
	});
	$('.reward_withdraw_use_pop_close, .shop_overlay').click(function(){
		$('.reward_withdraw_use_pop, .shop_overlay').removeClass('active');
	});
	
	// swiper slide
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		pagination: {
			el: '.swiper-pagination',
    	type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: {
			delay: 3000,
			pauseOnMouseEnter: false, // 기본값
			disableOnInteraction: false,
		},
		loop: true,
		speed: 1000,
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 1,
			},
			// when window width is >= 640px
			640: {
				slidesPerView: 1,
			}
		}
	})
	$('.swiper-stop').click(function(){
		$(this).hide();
		$('.swiper-start').show();
		swiper.autoplay.stop();
	});
	$('.swiper-start').click(function(){
		$(this).hide();
		$('.swiper-stop').show();
		swiper.autoplay.start();
	});
});