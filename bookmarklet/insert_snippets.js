
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
    if (jQuery("textarea") && jQuery("textarea").first()) {
      var theTextArea = jQuery("textarea").first();
      var currentContents = theTextArea.val();
      theTextArea.val(currentContents + "\n" +
                      '<div id="Terminal_123"></div> <!-- Editor and Code Testing panel -->' + "\n" + 
                      '<div id="Terminal_456"></div> <!-- Interactive coding panel only -->' + "\n" + 
                      '<div id="Terminal_789"></div> <!-- Editor only -->' + "\n"
        );
    }
  });
}

insertSnippet();
