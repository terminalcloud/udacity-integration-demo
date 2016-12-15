_satellite.pushAsyncScript(function(event, target, $variables){
  var cookieVal = _satellite.readCookie('O');
var cookieKey = 'lok';

if (cookieVal != 0 && cookieVal.length > 1) {
	_satellite.setCookie(cookieKey, cookieVal);
}

});
