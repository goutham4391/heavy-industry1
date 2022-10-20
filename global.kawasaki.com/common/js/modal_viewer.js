
// JavaScript Document
var vrImg = [];
vrImg.pass = "common/img/index.html";
vrImg.srcArr = ['modal_viewer_close.png','modal_viewer_prev.html','modal_viewer_next.html','ajax-loader.gif'];
vrImg.imgArr = [];

$.each(vrImg.srcArr,function(i){
	vrImg.imgArr[i] = new Image();
	vrImg.imgArr[i].src = vrImg.pass + vrImg.srcArr[i];
});

$.fn.modal_viewer = function(){
	var eastype = 'easeInOutQuad';

	var tObj;
	var tNum=1;
	var urls;
	var mode = "init";

	var btn_close = vrImg.pass + 'modal_viewer_close.png';
	var btn_prev = vrImg.pass + 'modal_viewer_prev.png';
	var btn_next = vrImg.pass + 'modal_viewer_next.png';

	var closeBtn = '<a href="javascript:void(0)" class="modal-close"><img src="' + btn_close + '" alt="close"; /></a>';
	//var modalPage = '<div class="modal-pages">' + tNum + '/' + $('.modal-viewer').size() + '</div>';
	var modalPage = function(tNum){
		return '<div class="modal-pages">' + tNum + '/' + $('.modal-viewer').size() + '</div>';
	}

	var agent = window.navigator.userAgent;
	var agentLow = window.navigator.userAgent.toLowerCase();
	var isIE = false;
	var ieVersion =0;
	if(agentLow.match(/(msie|MSIE)/) || agentLow.match(/(T|t)rident/) ) {
		isIE = true;
		ieVersion = agentLow.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
		ieVersion = parseInt(ieVersion);
	} else {
		isIE = false;
	}
	
	if(isIE && (ieVersion<=8)) eastype = 'swing';

	$('.modal-viewer').each(function(){
		$(this).click(function(){
							   
			tNum = $('.modal-viewer').index(this)+1;

			urls = $(this).attr('data-image');
			$('body').append('<div class="gNavbasegray"></div>');
			$('.gNavbasegray').css('height',$(document).height() + 'px');

			$('.gNavbasegray').css('opacity',0).animate({opacity:0.8},{duration:'fast',easing:eastype,complete:function(){
				modalLoad(urls);
				$('.gNavbasegray').click(function(){
					modalClear();
				});

			}});
			
		});
	});

	function modalLoad(){
		urls = $('.modal-viewer').eq(tNum-1).attr('data-image');

		var timg = new Image();
		timg.src = urls;
		if(isIE && (ieVersion<10)) $.ajaxSetup({ cache: false });
		
		$(timg).imagesLoaded(function(){

			if(mode != "init") 	$('.rpModal').remove();

			$('.gNavbasegray').after('<div class="rpModal"><div class="modal-naviLeft"></div><div class="m-visual"><img src="' + $('.modal-viewer').eq(tNum-1).attr('data-image') + '" class="key-v"></div><div class="modal-naviRight"></div></div>');
			$('.modal-naviLeft').html('<a href="javascript:void(0)" class="modal-navi"><img src="' + btn_prev + '" /></a>');
			$('.modal-naviRight').html('<a href="javascript:void(0)" class="modal-navi"><img src="' + btn_next + '" /></a>');

			$('.rpModal').hide().fadeIn(300);

			$('.modal-naviLeft a.modal-navi').click(function(){
				if(tNum>1) {
					tNum--;
				} else {
					tNum = $('.modal-viewer').size();
				}
				mode = "lotate";
				modalLoad();
			});
			$('.modal-naviRight a.modal-navi, .rpModal .m-visual').click(function(){
				if(tNum<$('.modal-viewer').size()) {
					tNum++;
				} else {
					tNum = 1;
				}
				mode = "lotate";
				modalLoad();
			});

			modalAttache(urls);
			
			/*
			$('.gNavbasegray').click(function(){
				modalClear();
			});
			*/

		});

	}
	
	function modalAttache(){

		if($('.modal-viewer').size() <=1) {
			$('.modal-naviLeft a.modal-navi').css('visibility','hidden');
			$('.modal-naviRight a.modal-navi').css('visibility','hidden');
		}

		$('a.modal-close').remove();
		$('.modal-pages').remove();

		if (window.matchMedia) {
		
   	 		var widthMatch = window.matchMedia("(max-width: 639px)").matches;
			matchFunc(widthMatch);

		} else {
			$('.modal-naviRight .modal-navi').before(closeBtn);
			$('.modal-naviRight .modal-navi').after(modalPage(tNum));
			$('.rpModal').css('height','auto');
		
		}

		$('.modal-naviLeft,.modal-naviRight').css('height', $('.m-visual').height() + 'px');
		$('.modal-naviRight a.modal-navi').css('top',$('.rpModal .m-visual').height()/2-24 + 'px');
		$('.modal-naviLeft a.modal-navi').css('top',$('.rpModal .m-visual').height()/2-24 + 'px');
		$('.modal-naviRight div.modal-pages').css('top',$('.rpModal .m-visual').height()-18 + 'px');

		$('.modal-close').click(function(){
			modalClear();
		});
			
		posAnalyzing('.rpModal');
	}


	function matchFunc(widthMatch){
		if(widthMatch){
			$('.modal-naviLeft,.modal-naviRight').css('width', '10%');
			$('.m-visual').css('width', '80%');
			$('.m-visual img.key-v').before(closeBtn);
			$('.m-visual img.key-v').after(modalPage(tNum));
				
			if($(window).height() > $('.m-visual img.key-v').height() + 100) {
				$('.rpModal').css('height',$(window).height()-50 + 'px');
				
			} else {
				$('.rpModal').css('height',$('.m-visual img.key-v').height() + 100 + 'px');
			}

			//$('.gNavbasegray').css('width',$(window).width() + 'px');
			$('.gNavbasegray').css('height',$(document).height() + 'px');

		} else {
			$('.modal-naviRight .modal-navi').before(closeBtn);
			$('.modal-naviRight .modal-navi').after(modalPage(tNum));
			$('.rpModal').css('height','auto');
		}
	}

	function modalClear(){
		$('.rpModal').remove();
		$('.gNavbasegray').stop().animate({opacity:0},{duration:'fast',easing:eastype,complete:function(){$('.gNavbasegray').remove()}});
		mode = "init";
	}

	// iPhone,iPodまたは、Androidの以外はスクロール処理
	if (agent.search(/iPhone/i) < 0 && agent.search(/iPod/i) < 0 && agent.search(/Android/i) < 0) {

		$(window).scroll(function(){
										  
			if($('.rpModal').height() < $(window).height()) {
				//posAnalyzing('.rpModal');
				$('.rpModal').css('top',topAnalyzing('.rpModal') + 'px');
			}
		});

		$(window).resize(function(){
								  
			$('.gNavbasegray').css('width',$(document).width() + 'px');
			$('.gNavbasegray').css('height',$(document).height() + 'px');

			$('.modal-naviRight a.modal-navi').css('top',$('.rpModal .m-visual').height()/2-24 + 'px');
			$('.modal-naviLeft a.modal-navi').css('top',$('.rpModal .m-visual').height()/2-24 + 'px');
			$('.modal-naviRight div.modal-pages').css('top',$('.rpModal .m-visual').height()-18 + 'px');
			$('.rpModal').css('height',$('.m-visual').height() + 'px');

			posAnalyzing('.rpModal');
		});
	
	}

	if(window.matchMedia) {
		function getOrientationValue (mediaQueryList) {

			$('a.modal-close').remove();
			$('.modal-pages').remove();
   		 	var widthMatch = window.matchMedia("(max-width: 639px)").matches;
			matchFunc(widthMatch);
			
		}

		$('.modal-close').click(function(){
			modalClear();
		});

		portraitOrientationCheck = window.matchMedia("(orientation: portrait)");
		portraitOrientationCheck.addListener(getOrientationValue);
	
	}


	function posAnalyzing(selecter){
		$(selecter).css('top',topAnalyzing(selecter) + 'px');
		$(selecter).css('left',leftAnalyzing(selecter) + 'px');
	}
	function topAnalyzing(selecter){
		var stp = 0;
		var lvTop = 0;

		stp = $(window).scrollTop();
		if($(window).height() > $(selecter).height()) {
			lvTop = ($(window).height()-$(selecter).height())/2+stp;
		} else {
			lvTop = ($(window).height()-$(selecter).height())/16+stp;
		}
		return lvTop;
	};
	function leftAnalyzing(selecter){
		var slf = 0;
		var lvLeft = 0;

		slf = $(window).scrollLeft();
		if($(window).width() > $(selecter).width()) {
			lvLeft = ($(window).width()-$(selecter).width())/2+slf;
		} else {
			lvLeft = ($(window).width()-$(selecter).width())/16+slf;
		}
		return lvLeft;
	};


}


$.fn.imagesLoaded = function(callback){
  var elems = this.filter('img'),
      len = elems.length,
      blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      
  elems.bind('load.imgloaded',function(){
      if (--len <= 0 && this.src !== blank){
        elems.unbind('load.imgloaded');
        callback.call(elems,this);
      }
  }).each(function(){
     // cached images don't fire load sometimes, so we reset src.
     if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = blank;
        this.src = src;
     }
  });

  return this;
};

$(function(){
	$().modal_viewer();
});




