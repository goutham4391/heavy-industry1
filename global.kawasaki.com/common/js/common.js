
// common.js
//clearfield trigger
$(document).ready(function() {
	$('.clearField').clearField();
});

$(function(){	
	var windowSize = $(window).width();
	if ( windowSize < 620 && !$('html').hasClass('msie8') ) {
		addClassSP();
		$('#languageSelector').insertAfter($('#identity'));
		$('#headLink #search').insertBefore($('#spMenuBtn'));
		$('#groupLink').insertAfter($('#productsLink'));
	}
});


// add class for Smartphone ( windowSize < 640 )

function addClassSP() { 
	$('html').addClass('sp');
}

// remove class for Smartphone ( windowSize > 639 )

function removeClassSP() { 
	$('html').removeClass('sp');
}

// viewport

$(function(){
	var windowSize = $(window).width();
	if ( windowSize < 641 ) {
		$('meta[name=viewport]').remove();
		var meta = document.createElement('meta');
		meta.setAttribute('name', 'viewport');
		meta.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no');
		document.getElementsByTagName('head')[0].appendChild(meta);
	}
});

// search

$(function() {
	
	$('#search').click(function(){
		$('#languageSelector li.current ul').slideUp('fast');
		$('header').toggleClass('menuOpen');
		$('#searchBox').slideToggle('fast');
		if( $('#languageSelector li.current').hasClass('open') ){
			$('#languageSelector li.current').removeClass('open');
		}
		return false;
	});

    $('input#searchByWords').focus(function() {
		
		var defaultValue = $(this).val();
		
        if( $(this).val() == defaultValue )
            $(this).css('color', '#000').val('');
        }).blur(function() {
		
        if( $(this).val() == "" ) {
            $(this).css('color', '#000').val('keyword');
        }
		
    });
	
    $('.sp input#searchByWords').focus(function() {
		
		var defaultValue = $(this).val();
		
        if( $(this).val() == defaultValue )
            $(this).css('color', '#fff').val('');
        }).blur(function() {
		
        if( $(this).val() == "" ) {
            $(this).css('color', '#fff').val('keyword');
        }
		
    });
	
	$('#searchBox .btnClose').click(function(){
		$('header').removeClass('menuOpen');
		$('#searchBox').slideUp('fast');
		return false;
	});
	
});


// Language Selector

$(function(){
	if($('#languageSelector').length) {	
	
	$('#languageSelector li.current a').click(function() {
		if($(this).attr('href').search(/javascript/) !=-1) {
			$('#searchBox').slideUp('fast');
			$('header').removeClass('menuOpen');
			$(this).parent().children('ul').slideToggle('fast');
			$(this).parent().toggleClass('open');
			return false;
		
		}
	});

	if(navigator.userAgent.search(/iPhone|iPod|Android.*Mobile|Windows.*Phone/) !=-1) {

		$('#languageSelector li.current ul a.btnClose').click(function(){
			languageSelector_close();
		});

	} else if('ontouchstart' in window){
		
		$('html').bind('touchend',function(){
			var xs =  $('#languageSelector').offset().left;
			var xe =  xs + $('#languageSelector').width();
			var ys =  $('#languageSelector').offset().top;
			var ye =  ys + $('#languageSelector').height() + $('#languageSelector').find('ul').height() + 11;
			var ev = event.changedTouches[0];
		
			if(ev.pageX<xs || ev.pageX>xe || ev.pageY<ys || ev.pageY>ye) {
				languageSelector_close();
			}
		});
  
	} else {

		$('html').click(function(e){
			var xs =  $('#languageSelector').offset().left;
			var xe =  xs + $('#languageSelector').width();
			var ys =  $('#languageSelector').offset().top;
			var ye =  ys + $('#languageSelector').height() + $('#languageSelector').find('ul').height() + 11;
		
			if(e.pageX<xs || e.pageX>xe || e.pageY<ys || e.pageY>ye) {
				languageSelector_close();
			}
		});
	}
	
	function languageSelector_close(){
		if($('#languageSelector li.current').hasClass('open')){
			$('#languageSelector li.current').children('ul').slideToggle('fast');
			$('#languageSelector li.current').removeClass('open');
			return false;
		}
	}
	
	}
});

// header fixed

$(function() {
    $(window).on('load scroll', function(){
		
	if(!$('nav#globalNav').hasClass('globalNav-open')||($(window).width()>620)) {
	
		var headLinkAreaHeight = $('#headLinkArea').outerHeight();
        if ( $(window).scrollTop() > headLinkAreaHeight ) {
            $('#headerArea').addClass('fixed');
        } else {
            $('#headerArea').removeClass('fixed');
        }
		
	}
		
   });
});

// anchor link (smooth scroll)

$(function(){
	var url = $(location).attr('href');
    if (url.indexOf("?id=") == -1) {
    $('a[href^=#]').click(function(){
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
		var headerHeight = $('#headerArea').height(); //ヘッダの高さ
		    if ( !$(".fixed").is(":visible") ) {// 固定するクラスが見つからない(固定されていない場合は)
			headerHeight = headerHeight * 2;// スクロール後に固定されるナビの高さをヘッダーの高さにする
    		}
        var position = target.offset().top - headerHeight; //ヘッダの高さ分位置をずらす
		console.log(target);
		console.log(position);
		console.log(headerHeight);
        $("html, body").animate({scrollTop:position}, 550, "swing");
        return false;
    });
		//
    } else {
		var linkID = url.split("?id=");
		var hash   = "#" + linkID[linkID.length - 1].replace(/&.+$/,"");	//idから&を含む以降削除;
		var tgt    = $(hash);
		var pos    = tgt.offset().top;
		var headerAreaH = $('#headerArea').height();
		var newPos = pos - ( headerAreaH * 2 );
		$("html, body").animate({ scrollTop : newPos }, 500, 'swing');
		return false;
    }
});

// Responsive Off Canvas Navigation for Smartphone

$(function() {

	if(navigator.userAgent.search(/iPhone|iPod/) !=-1) {
		$(window).bind("orientationchange",function(){
			if($('#globalNav').hasClass('globalNav-open') && ($(window).width()<=620)) {
				gloavalNav_open_smp();
			} else if($(window).width() > 620) {
				gloavalNav_close_smp();
			}
		});
	} else if(navigator.userAgent.search(/Android.*Mobile|Windows.*Phone/) !=-1) {
		$(window).bind("resize",function(){
			if($('#globalNav').hasClass('globalNav-open') && ($(window).width()<=620)) {
				gloavalNav_open_smp();
			} else if($(window).width() > 620) {
				gloavalNav_close_smp();
			}
		});
	}

	$('#spMenuBtn').click(function(){
		gloavalNav_open_smp();
		return false;
	});
	
	$('.overlay').click(function(){
		gloavalNav_close_smp();
		return false;
	});

	function gloavalNav_open_smp(){
		$('#headerArea').removeClass('fixed');
		$('html').removeClass('closeNav').addClass('openNav');
		$('.overlay').removeClass('overlay-close').addClass('overlay-open');
		$('.overlay').css('height',$(document).height() + 'px');
		$('#globalNav').removeClass('globalNav-close').addClass('globalNav-open');
		$('body, html').animate({ scrollTop: 0 }, 0);

	}
	function gloavalNav_close_smp(){
		$('html').removeClass('openNav').addClass('closeNav');
		$('.overlay').removeClass('overlay-open').addClass('overlay-close');
		$('#globalNav').removeClass('globalNav-open').addClass('globalNav-close');
		$('body, html').animate({ scrollTop: 0 }, 0);
	}

	var uam = navigator.userAgent.search(/iPhone|iPod|Android.*Mobile|Windows.*Phone/);
	var events = 'click';
	var sels = $('#globalNav ul li.menu a:first-child').not('ul.subMenu a');
	var vcss = "";

	if(('ontouchstart' in window)&&(navigator.userAgent.search(/Android/) ==-1)) events = 'touchend';	
	if(('ontouchstart' in window)&&(uam ==-1)) {
		var vstyle = document.createElement('style');
		vcss = '#globalNav ul li a span.normal, #globalNav ul li:hover a span.normal {background:none;color:#fff}';
		vcss += '#globalNav ul li a span.normal:before ,#globalNav ul li:hover a span.normal:before{content:url(/common/img/bg_gnav_03.png);color:#fff;position:absolute;left:-24px}';
		vcss += '#globalNav ul li a span.normal:after ,#globalNav ul li:hover a span.normal:after{display: none;background: none}';

		vcss += '#globalNav ul li:hover a:not(ul.subMenu a) span{color: #666;background: #e7e7e8}';
		vcss += '#globalNav ul li:hover a:not(ul.subMenu a) span:before{content: url(/common/img/bg_gnav_01.png);color:#fff; position:absolute;left:-35px}';
		vcss += '#globalNav ul li:hover a:not(ul.subMenu a) span:after{content: url(/common/img/bg_gnav_02.png);position:absolute;top:0; right:-39px}';

		vcss += '#globalNav ul li a.open span, #globalNav ul li.menu.current a:not(ul.subMenu a) span,#globalNav ul li:hover a.open span, #globalNav ul li:hover.menu.current a:not(ul.subMenu a) span{color: #666;background: #e7e7e8}';
		vcss += '#globalNav ul li a.open span:before, #globalNav ul li.menu.current a:not(ul.subMenu a) span:before{content: url(/common/img/bg_gnav_01.png);color:#fff; position:absolute;left:-35px}';
		vcss += '#globalNav ul li a.open span:after, #globalNav ul li.menu.current a:not(ul.subMenu a) span:after{content: url(/common/img/bg_gnav_02.png);position:absolute;top:0; right:-39px}';
		document.getElementsByTagName('head')[0].appendChild(vstyle);
		vstyle.appendChild(document.createTextNode(vcss));
	} 
	
	if(navigator.userAgent.search(/Android/) !=-1) {
		sels.click(function() {
			funcMenu(this);
			return false;
		});
	} else {
		sels.bind(events,function() {
			funcMenu(this);
			return false;
		});
	}
	function funcMenu(obj){
		$('header').removeClass('menuOpen');
		
		if($(obj).hasClass('open') ) {
			$(obj).parent('li').children('.subMenu').slideUp('fast');
			$(obj).removeClass('open');
			if(('ontouchstart' in window)&&(uam==-1)) {
				sels.find('span').addClass('normal');
				$('#globalNav ul li.current a').find('span').removeClass('normal');
			}
		} else {
			$('#globalNav ul li.menu ul.subMenu').slideUp('fast');
			$('#globalNav ul li.menu a').removeClass('open');
			$(obj).parent('li').children('.subMenu').delay('250').slideDown('fast');
			$(obj).addClass('open').removeClass('normal');

			if(('ontouchstart' in window)&&(uam==-1)) {
				sels.find('span').removeClass('normal');
			}
		}
		//return false;
	}

	if(navigator.userAgent.search(/Android/) !=-1) {
		$('#globalNav ul.subMenu a.btnClose').click(function() {
			funcClose(this);
			return false;
		});
	} else {
		$('#globalNav ul.subMenu a.btnClose').bind(events,function(){
			funcClose(this);
			return false;
		});
	}
	function funcClose(obj){
		$(obj).parent().parent().parent().parent().parent().children('.subMenu').slideUp('fast');
		$('#globalNav ul li a.open').removeClass('open');
		if(('ontouchstart' in window)&&(uam==-1)) {
			sels.find('open')
			sels.find('span').addClass('normal');
			$('#globalNav ul li.current a').find('span').removeClass('normal');
			
		}
	}

	// current
	
    var url = location.pathname.split("index.html")[2];
	var gNav = $('#globalNav ul li.menu .subMenu a.categoryTop');
         
    gNav.each(function(){
        if( $(this).attr("href").split("index.html")[2] == url ) {
            $(this).parents('li.menu').addClass('current');
        };
    });
		
});

// keyvisual caption

function keyvisualCaptionBox() {
	$(function() {
		var captionBoxHeight = $('#keyvisualArea a .captionBox').outerHeight() + $('#keyvisualArea a .captionBox .more').outerHeight();
		$('#keyvisualArea a .captionBox').css('margin-top', - captionBoxHeight / 2 );
	});
} keyvisualCaptionBox();



// 黒帯上の文字数が20文字以上超えたら、font-sizeを90%にする
$(function(){
	if($('html').hasClass('sp')){
		$('a .linkBtn_01 span').each(function(){
			var textNum = $(this).text().length;
			if($(this).parent().hasClass('thin')){
						if(textNum>=19){
									$(this).css('font-size','80%');
						}
			}else if(textNum>=14){
					$(this).css('font-size','80%');
					$(this).parent().css('min-height','34px');
				}
		})
	} else{
		$('a .linkBtn_01 span').each(function(){
			var textNum = $(this).text().length;
			if($(this).parent().hasClass('thin')){
						if(textNum>=30){
									$(this).css('font-size','90%');
						}
			}else if(textNum>=20){
					$(this).css('font-size','90%');
					$(this).parent().css('min-height','52px');
				}
		})
	}
});

// Products Link

function productsLinkToggle() {
	$(function() {
		$('#productsLinkArea h3 .toggleBtn').click(function() {
			$(this).parent('h3').next('ul').next('ul').slideToggle('fast');
			$(this).parent('h3').next('ul').next('ul').toggleClass('open');
			$(this).toggleClass('open');
		});
	});
} productsLinkToggle();


// for ie8 :last-child

$(function() {
	if( $('html').hasClass('msie8') ){
		$('.row .col_1of2:last-child').css('margin-right', '0');
	}
	if( $('html').hasClass('msie8') ){
		$('.row .col_1of3:last-child').css('margin-right', '0');
	}
	if( $('html').hasClass('msie8') ){
		$('.row .col_1of4:last-child').css('margin-right', '0');
	}
	if( $('html').hasClass('msie8') ){
		$('#globalNav ul li:last-child ul.subMenu .row .subMenuInfo').css('margin-bottom', '0');
	}
	if( $('html').hasClass('msie8') ){
		$('#home #productsLinkArea .row:last-child').css({"margin-bottom":"0","border":"none"});
	}
});


// resize window

$(window).resize(function(){

	var windowSize = $(window).width();

	if ( windowSize < 620 && !$('html').hasClass('msie8') ) {
		
		// add class for Smartphone ( windowSize < 640 )
		addClassSP();
		$('#languageSelector').insertAfter($('#identity'));
		$('#search').insertBefore($('#spMenuBtn'));
		
		// keyvisual caption
		keyvisualCaptionBox();
		
		// Products Link
		$('#productsLinkArea ul.row.open').css('display', 'block');
		
		// group Link
		$('#groupLink').insertAfter($('#productsLink'));
		
		// clear height (tile.js)
		$('.row.vertical .bg.line').css('height', 'auto');
		
		// scrollAttention
		$('.row.scrollArea .table_scroll > div.scrollAttention').css('display','block');
	}
	
	if ( windowSize > 619 && !$('html').hasClass('msie8') ) {
		// remove class for Smartphone ( windowSize > 639 )
		removeClassSP();
		$('#languageSelector').insertAfter($('#headLink'));
		$('#headLink li:last-child').after($('#search'));
		
		// keyvisual caption
		keyvisualCaptionBox();
		
		// Products Link
		$('#productsLinkArea ul.row').removeAttr('style');
		
		// group Link
		$('#groupLink').insertBefore($('#productsLink'));
		
		// make height (tile.js)
		$('.row.vertical .bg.line').tile(2);
		
		// scrollAttention
		$('.row.scrollArea .table_scroll > div.scrollAttention').css('display','none');
  　}
  
});


// responsive table scroll
$(function(){
		$('.sp .row.scrollArea .table_scroll > div.scrollAttention').css('display','block');
		    $('.sp .row.scrollArea').scroll(function () {
		if(0<$(this).scrollLeft()){
	$(this).find('div.scrollAttention').fadeOut("fast");

			}
		else if(0==$(this).scrollLeft()){
	 $(this).find('div.scrollAttention').fadeIn("fast");
			
			}
			});
		
});




