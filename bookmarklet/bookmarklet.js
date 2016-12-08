var cdn_url = 'https://storage.googleapis.com/edu-content/0.0.13/public';
var terminalClientLink = cdn_url + '/lib/terminalClient.js';

function injectScriptAndUse(srcUrl, cb) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = srcUrl;
  window.onload = function() { return cb(); };
  head.appendChild(script);
}

function insertSnippet() {
  injectScriptAndUse('https://code.jquery.com/jquery-2.2.3.min.js', function() {
    jQuery.noConflict();
    jQuery.getScript(terminalClientLink, function() {
      var jwt = terminalClient.getCookie('_jwt_token');

      var test = '<iframe id="terminal-ide" src="http://localhost:3000" frameborder="0" width="100%" height="500px" />';
      jQuery('#main-layout-content').first().append(test);
      jQuery('#terminal-ide').attr("frameborder", 0)
    });
  });
}

insertSnippet();
