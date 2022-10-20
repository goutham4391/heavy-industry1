
// Keyvisual-switching.js
(function() {
var keyvisual_list = [
	["index_hero27.jpg",25],
	["index_hero24.jpg",15],
	["index_hero25.jpg",15],
	["index_hero26.jpg",15],
	["index_hero22.jpg",15],
	["index_hero23.jpg",15]
];

var category_list = [];
category_list[0] = [	//Mobility
	["index_mobility_ph01.jpg",10],
	["index_mobility_ph02.jpg",20],
	["index_mobility_ph03.jpg",30],
	["index_mobility_ph04.jpg",40]
];

category_list[1] = [	//Energy
	["index_energy_ph01.jpg",20],
	["index_energy_ph02.jpg",20],
	["index_energy_ph03.jpg",30],
	["index_energy_ph04.jpg",30]
];

category_list[2] = [	//Industrial Equipment
	["index_industrial_ph01.jpg",50],
	["index_industrial_ph02.jpg",50]
];

category_list[3] = [	//Leisure
	["index_leisure_ph01.jpg",50],
	["index_leisure_ph02.jpg",50]
];

var imgFolder = "en/img/index.html";
var keyvisualImage = [];
var keyInd = 0;
var categoryImage = [];

document.write('<style>#keyvisualArea{background-image:none}</style>');
document.write('<style>.keyvisual-data-group{display:none}</style>');
document.write('<style>.category-data-group{display:none}</style>');

//keyvisualを先読み
function keyvisual_presetter(){
	var scArr = [];
	var scObj = [];
	var rndMax = 0;
	var rndNum = 0;

	//乱数用マトリックスに変換
	$.each(keyvisual_list,function(i){
		scArr[i] = keyvisual_list[i][1];
		if(i !=0) scArr[i] += scArr[i-1];
		scObj[scArr[i]] = keyvisual_list[i][0]; 
		rndMax = scArr[i];
	});

	rndNum = Math.ceil(Math.random()*rndMax);

	//乱数値に適合する背景画像を先読み
	$.each(scArr,function(i){
		if(scArr[i] >= rndNum) {
			keyInd = i;
			keyvisualImage = new Image();
			keyvisualImage.src = imgFolder + scObj[scArr[i]];
			return false;
		}
	});


}

//categoryImageを先読み
function categoryImage_presetter(ids){

	var scArr = [];
	var scObj = [];
	var rndMax = 0;
	var rndNum = 0;
	var ind = ids;

	//乱数用マトリックスに変換
	$.each(category_list[ind],function(i) {
		scArr[i] = category_list[ind][i][1];
		if(i != 0) scArr[i] += scArr[i-1];
		scObj[scArr[i]] =  category_list[ind][i][0];
		rndMax = scArr[i];
	});
	
	rndNum = Math.ceil(Math.random()*rndMax);

	//乱数値に適合する画像を先読み
	$.each(scArr,function(i){
		if(scArr[i] >= rndNum) {
			categoryImage[ind] = new Image();
			categoryImage[ind].src =  imgFolder + scObj[scArr[i]];
			
			return false;
		}
	});
}

//画像先読みトリガー
keyvisual_presetter();

$.each(category_list,function(i){
	 categoryImage_presetter(i);
});

$(function(){

	//適合するkeyvisualを設定
	$('#keyvisualArea').css('background-image','url(' + keyvisualImage.src + ')');

/*特定の画像だけ全面にリンクを張る（取り下げ指示があればコメントアウト）*/
/*----------------------------------------------------------------------------------------------------*/
	if( keyvisualImage.src.match("index_hero22") || keyvisualImage.src.match("index_hero24") || keyvisualImage.src.match("index_hero25") || keyvisualImage.src.match("index_hero26") || keyvisualImage.src.match("index_hero27") ) {
		$('#keyvisualArea').mouseenter(function() {
			$('#keyvisualArea').css("cursor","pointer");
		});
		$('#keyvisualArea').click(function() {

// 全画面同じリンク先にする場合は次の１行のコメントを外す（別々のリンクであればコメントにする）
//		$('#keyvisualArea .captionBox .title a').attr("href", "/en/stories/articles/vol47/");

		window.open($('#keyvisualArea .captionBox .title a').attr("href"), '_blank');
		return false;
		});
	}
/*--------------------------------------------------------------------------------------------------*/

/*特定の画像だけキャプションを非表示にする（取り下げ指示があればコメントアウト）*/
/*----------------------------------------------------------------------------------------------------*/
//	if( keyvisualImage.src.match("index_hero09") ) {
	if( keyvisualImage.src.match("index_hero22")|| keyvisualImage.src.match("index_hero23")|| keyvisualImage.src.match("index_hero24")|| keyvisualImage.src.match("index_hero25")|| keyvisualImage.src.match("index_hero26")|| keyvisualImage.src.match("index_hero27") ) {
		$('#keyvisualArea .captionBox').css("display","none");
	}
/*--------------------------------------------------------------------------------------------------*/

	//適合するcaptionを設定
	$('#keyvisualArea .captionBox .title').html($('.keyvisual-data-group').eq(keyInd).find('p.title').html());
	$('#keyvisualArea .captionBox .description').remove();
	$('#keyvisualArea .captionBox .title').after($('.keyvisual-data-group').eq(keyInd).find('p.description'));
	$('#keyvisualArea p.button').html($('.keyvisual-data-group').eq(keyInd).find('p.button').html());	

	//categoryImageを設定
	$('#categoryArea h2.linkBtn_01').each(function(i){
		var rObj = $(this).parent(); 
		if($(rObj).find('img.category-image').length) {
			$(rObj).find('img.category-image').attr('src', categoryImage[i].src);
		}
	});

});

})(jQuery);



