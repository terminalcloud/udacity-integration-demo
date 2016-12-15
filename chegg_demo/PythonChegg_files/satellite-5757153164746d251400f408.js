_satellite.pushAsyncScript(function(event, target, $variables){
  if (typeof $  !== 'undefined' && !window.KERMIT_PARAMS || (window.KERMIT_PARAMS && !window.KERMIT_PARAMS.is_in_app)) {

var google_tag_params =
{ 
  pagetype: _satellite.getVar('GA Page Type'), 
  prodtype: _satellite.getVar('GA Prod Type'),
  prodid: _satellite.getVar('GA Prod ID').split(','),
  prodvalue: _satellite.getVar('GA Page Value'),
  prodqty: _satellite.getVar('GA Prod QTY'),
  schoolid: _satellite.getVar('GA School ID'),
  schoolname: _satellite.getVar('GA School Name'),
  solutionid: _satellite.getVar('GA Solution ID'),
  questionid: _satellite.getVar('HWH QNA ID'),
  solutionsubject: _satellite.getVar('Solutions Subsubject'),
  qasubject: _satellite.getVar('HWH QNA Subsubject'),
  booksubject: _satellite.getVar('PDP Book Category'),
  booksubsubject: _satellite.getVar('PDP Book Subcategory'),
  booksubsubsubject: _satellite.getVar('PDP Book SubSubcategory'), 
  visitorsplit: _satellite.getVar('Tag Group'),
};
console.log('google_tag_params: ', google_tag_params);
var google_conversion_id = 1064495637;
var google_conversion_label = "cNecCJvJhwIQldTL-wM";
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;

var js = document.createElement("script");

js.type = "text/javascript";
js.src = '//www.googleadservices.com/pagead/conversion.js';
js.async = true;

document.body.appendChild(js);

var img = '<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/1064495637/?value=0&label=cNecCJvJhwIQldTL-wM&guid=ON&script=0"/>';
$('body').append(img);
}
});
