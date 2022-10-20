

init();


function init() {

	var ua = navigator.userAgent;
	var htmlClass = '';
	var matchArray = new Array();

	var mac     = new RegExp('Macintosh', "i");
	var win     = new RegExp('Windows', "i");
	var android = new RegExp('Android ([0-9]+)\.', "i");
	var msie    = new RegExp('MSIE ([0-9]+)\.', "i");
	var chrome   = new RegExp('Chrome\/([0-9]+)\.', "i");
	var firefox = new RegExp('Firefox\/([0-9]+).([0-9]+)', "i");
	var ios     = new RegExp('(iPhone|iPod|iPad).+ OS ([0-9]+)_.+ Safari', "i");
	var safari  = new RegExp('Version.html\/([0-9]+)\..+ Safari\/', "i");
	var overmsie11  = new RegExp('Trident.*rv:([0-9]+).0', "i");

	if (matchArray = ua.match(msie)) { //MSIE
		htmlClass = 'msie';
		htmlClass += ' msie' + matchArray[1];
	} else if (matchArray = ua.match(chrome)) { //chrome
		htmlClass = 'chrome';
		htmlClass += ' chrome' + matchArray[1];
	} else if (matchArray = ua.match(firefox)) { //Firefox
		htmlClass = 'firefox';
		htmlClass += ' firefox' + matchArray[1];
		if (matchArray[1] == 3) {
			htmlClass += matchArray[2];
		}
	} else if (matchArray = ua.match(android)) { //Android
		htmlClass = 'webkit';
		htmlClass += ' android' + matchArray[1];
	} else if (matchArray = ua.match(ios)) { //iOS
		htmlClass = 'safari';
		htmlClass += ' ios' + matchArray[2];
//		htmlClass += ' ' + matchArray[1].toLowerCase();
	} else if (matchArray = ua.match(safari)) { //Safari
		htmlClass = 'safari';
		htmlClass += ' safari' + matchArray[1];
	} else if (matchArray = ua.match(overmsie11)) { //MSIE 11.0~
		htmlClass = 'msie';
		htmlClass += ' msie' + matchArray[1];
	}

	if (htmlClass) {
		if (ua.match(mac)) {
			htmlClass += ' mac';
		} else if (ua.match(win)) {
			htmlClass += ' win';
		} else if (ua.match(android)) {
			htmlClass += ' android';
		} else {
			htmlClass += ' ios';
		}

		var element = document.getElementsByTagName('html');
		element[0].className = htmlClass;
	}
}



