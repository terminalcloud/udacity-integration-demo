// try this on: https://classroom.udacity.com/nanodegrees/nd200/parts/24c5c39a-6040-4d5a-82d8-7d3d30d7bc9a/project

var cdn_url = 'https://storage.googleapis.com/edu-content/0.0.13/public';
var terminalClientLink     = cdn_url + '/lib/terminalClient.js';

function injectScriptAndUse(srcUrl, cb) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.src = srcUrl;
  script.onload = function() { return cb(); };
  head.appendChild(script);
}

function insertSnippet() {
  injectScriptAndUse('https://code.jquery.com/jquery-2.2.3.min.js', function() {
    jQuery.noConflict();
    jQuery.getScript(terminalClientLink, function() {
      var jwt = terminalClient.getCookie('_jwt_token');

      var test = '<div style="width:90%;border:2px solid #666;text-align:center;padding:30px;font-size:20px;color:#000;background-color:#ddd">Embedded Terminal<iframe src="https://www.demoudacity.com" width="100%" /></div>';
      jQuery('#main-layout-content .container-fluid').first().append(test);

    });
  });
}

insertSnippet();