//form check
jQuery.fn.validation = function(){
	var fn_chek = false;
	if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
		var obj = $(this).find(":input");
		$.each(obj, function(index, value){
			var field_check = $(value).attr("check");
			var field_type	= $(value).attr("check_type");
			var field_length= $(value).attr("check_length");
			var field_key	= $(value).attr("check_key");
			var	field_alert	= $(value).attr("title");
			var field_value	= $(value).val();
			if (field_check == "T") {
				if (value.type == "checkbox"){
					field_key = (field_key) ? Number(field_key) : 1;
					if ($("input:checkbox[name=" + value.name + "]:checked").length < field_key){
						alert(field_alert);
						$(value).focus();
						fn_chek = false;
						return false;
					}
				} else if (value.type == "radio"){
					if ($("input:radio[name=" + value.name + "]:checked").length < 1){
						alert(field_alert);
						$(value).focus();
						fn_chek = false;
						return false;
					}
				} else if (field_type == "length") {
					if (field_value.length <= Number(field_length))	{
						alert(field_alert);
						$(value).focus();
						fn_chek = false;
						return false;
					}
				} else if (field_type == "value") {
					if (field_value != field_key)
					{
						alert(field_alert);
						$(value).focus();
						fn_chek = false;
						return false;
					}
				}
			}
			fn_chek = true;
		});
		return fn_chek;
	}
}

jQuery.fn.serializeObject = function() {
	var obj = null;
	try {
		// this[0].tagName이 form tag일 경우
		if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
			// var charset = this.context.charset;
			var charset = document.characterSet;
			var arr = this.serializeArray();
			if(arr){
				obj = {};
				jQuery.each(arr, function() {
					// utf-8 이 아니면 value가 영문, 숫자가 아닌경우 escape 처리
					if (charset !== "UTF-8" ) {
						this.value = ((new RegExp(/[^a-z|^0-9]/gi)).test(this.value))? escape(this.value) : this.value;
					}
					// obj의 key값은 arr의 name, obj의 value는 value값
					if (obj[this.name]) {
						obj[this.name] += "," + this.value;
					} else {
						obj[this.name] = this.value;
					}
				});
			}
		}
	}catch(e) {
		alert(e.message);
	}finally  {}

	return obj;
};

// cookie 관련
function setCookie( name, value, expiredays )
{
	//쿠키를 생성해 파기일을 결정 한다.
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie( name ) 
{ //쿠키가 있으면 입력한 name 값을 리턴한다
	var nameOfCookie = name + "="; 
	var x = 0; 
	while ( x <= document.cookie.length ) 
	{ 
		var y = (x+nameOfCookie.length); 

		if ( document.cookie.substring( x, y ) == nameOfCookie ) 
		{ 
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
				endOfCookie = document.cookie.length;


			return unescape( document.cookie.substring( y, endOfCookie ) ); 
		} 
		x = document.cookie.indexOf( " ", x ) + 1; 

		if ( x == 0 ) 
			break; 

	} 
	return "false"; 
}

function echoNull2Blank(str) {
	if (str == null) return '';
	return str;
}
// 콤마(,) 처리 ##################################################
function formatComma(num, pos) {

	if (!pos) pos = 1;  //소숫점 이하 자리수
	var re = /(-?\d+)(\d{3}[,.])/;

	var strNum = stripComma(num.toString());
	var arrNum = strNum.split(".");

	arrNum[0] += ".";

    while (re.test(arrNum[0])) {
        arrNum[0] = arrNum[0].replace(re, "$1,$2");
    }

	if (arrNum.length > 1) {
		if (arrNum[1].length > pos) {
			arrNum[1] = arrNum[1].substr(0, pos);
		}
		return arrNum.join("");
	}
	else {
		return arrNum[0].split(".")[0];
	}
}
// 콤마(,) 제거 ##################################################
function stripComma(str) {
	var re = /,/g;
	return str.replace(re, "");
}

//이전 날짜
function fnSetLastDate(fOPT, fNUM){
	var today = new Date();
	var rtnVal = false;
	if (fOPT == "day") {
		today.setDate(today.getDate() - Number(fNUM));
		rtnVal = fnStrDate(today);
	} else if (fOPT == "week") {
		today.setDate(today.getDate() - (7*Number(fNUM)));
		rtnVal = fnStrDate(today);
	} else if (fOPT == "month"){
		var monthOfYear = today.getMonth()
		today.setMonth(monthOfYear - Number(fNUM));
		today.setDate(today.getDate() + 1);
		rtnVal = fnStrDate(today);
	}
	return rtnVal;
}

// Date To String yyyy-mm-dd
function fnStrDate(fDATE){
	if($.type(fDATE) == "date"){
		month = '' + (fDATE.getMonth() + 1),
		day = '' + fDATE.getDate(),
		year = fDATE.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}else{ return false;}
}

// 페이징
(function($) {
    $.fn.jqueryPager = function(options) {
        var defaults = {
            pageSize: 10,
            currentPage: 1,
            pageTotal: 0,
            pageBlock: 10,
            clickEvent: 'fnGoPage'
        };

        var subOption = $.extend(true, defaults, options);
		
        return this.each(function() {
            var currentPage = subOption.currentPage*1;
            var pageSize = subOption.pageSize*1;
            var pageBlock = subOption.pageBlock*1;
            var pageTotal = subOption.pageTotal*1;
            var clickEvent = subOption.clickEvent;

            if (!pageSize) pageSize = 10;
            if (!pageBlock) pageBlock = 10;

            var pageTotalCnt = Math.ceil(pageTotal/pageSize);
            var pageBlockCnt = Math.ceil(currentPage/pageBlock);
            var sPage, ePage;
            var html = '';

            if (pageBlockCnt > 1) {
                sPage = (pageBlockCnt-1)*pageBlock+1;
            } else {
                sPage = 1;
            }

            if ((pageBlockCnt*pageBlock) >= pageTotalCnt) {
                ePage = pageTotalCnt;
            } else {
                ePage = pageBlockCnt*pageBlock;
            }

            html += '<div class="pg_num_center">';

            if (sPage > 1) {
				var prePage = (currentPage <= 1) ? 1 : currentPage - 1;
				// html += '<button type="button" onclick="'+ clickEvent +'(1);"><img src="/img/shop/page_arrow_double_left.png"></button>';	// 한페이지 이동
				html += '<button type="button" onclick="'+ clickEvent +'(' + (sPage-pageBlock) + ');"><img src="/img/shop/page_arrow_double_left.png"></button>';	// 히든페이지 단위 이동
				html += '<button type="button" onclick="'+ clickEvent +'(' + prePage + ');"><img src="/img/shop/page_arrow_single_left.png"></button>';
            } else if (pageTotalCnt !== 0) {
				var prePage = (currentPage <= 1) ? 1 : currentPage - 1;
				html += '<button type="button" onclick="'+ clickEvent +'(1);"><img src="/img/shop/page_arrow_double_left.png"></button>';
				html += '<button type="button" onclick="'+ clickEvent +'(' + prePage + ');"><img src="/img/shop/page_arrow_single_left.png"></button>';
			}

            for (var i=sPage; i<=ePage; i++) {

	            html += '';
                if (currentPage == i) {
                    html+= '<a href="javascript:;" class="on">' + i + '</a>';
                } else {
                    html+= '<a href="javascript:'+ clickEvent +'(' + i + ');">' + i + '</a>';
                }
	            html += '';
            }


            if (ePage < pageTotalCnt) {
				var aftPage = ((currentPage + 1 ) > pageTotalCnt) ? pageTotalCnt : currentPage + 1;
				// html += '<button type="button" onclick="'+ clickEvent +'(' + aftPage + ');"><img src="/img/shop/page_arrow_single_right.png"></button>';	// 한페이지 이동
				html += '<button type="button" onclick="'+ clickEvent +'(' + ( ePage + 1 ) + ');"><img src="/img/shop/page_arrow_single_right.png"></button>';	// 히든페이지 단위 이동
				html += '<button type="button" onclick="'+ clickEvent +'(' + pageTotalCnt + ');"><img src="/img/shop/page_arrow_double_right.png"></button>';
            } else if (pageTotalCnt !== 0) {
				var aftPage = ((currentPage + 1 ) > pageTotalCnt) ? pageTotalCnt : currentPage + 1;
				html += '<button type="button" onclick="'+ clickEvent +'(' + aftPage + ');"><img src="/img/shop/page_arrow_single_right.png"></button>';
				html += '<button type="button" onclick="'+ clickEvent +'(' + pageTotalCnt + ');"><img src="/img/shop/page_arrow_double_right.png"></button>';
			}
            html += '<div>';
			$(this).empty().html(html);
		});
    };
})(jQuery);

// 숫자키만 입력 -- InpuOnlyNumber(this);
function numkeyCheck(e) {
	var keyValue = event.keyCode;
	if( ((keyValue >= 48) && (keyValue <= 57)) ) return true;
	else return false;
}

// 이메일 체크 정규식 
function isEmail(asValue) {
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

//휴대폰 전화 체크 정규식
function isCelluar(asValue) {
	var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
	return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

function numberMaxLength(e){
	if(e.value.length > e.maxLength){
		e.value = e.value.slice(0, e.maxLength);
	}
}