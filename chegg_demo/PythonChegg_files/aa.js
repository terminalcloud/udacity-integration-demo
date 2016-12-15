﻿if (!window.adxcel) window.adxcel = {};
adxcel.UrlParamFrom = function(name, _default, href) { name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]"); var regexS = "[\\?&]" + name + "=([^&#]*)"; var regex = new RegExp(regexS); var results = regex.exec(href); if(results == null) return _default; else return results[1]; };
adxcel.UrlParam = function(name, _default, keyword) { var scripts = document.getElementsByTagName("script"); for(var i = 0, val; i < scripts.length; ++i) { val = adxcel.UrlParamFrom(name, _default, scripts[i].src); if(keyword && scripts[i].src.indexOf(keyword) < 0) continue; if(val !== _default) return val; } return _default; };
adxcel.CookieGet = function(name) { var dc = document.cookie; var prefix = name+"="; var begin = dc.indexOf("; "+prefix); if(begin < 0) { begin = dc.indexOf(prefix); if(begin != 0) return null; } else begin += 2; var end = dc.indexOf(";", begin); if(end == -1) end = dc.length; return unescape(dc.substring(begin + prefix.length, end)); }
adxcel.CookieSet = function(name, value, hours, path, domain, secure) { var expires = null; if(hours) { expires = new Date(); var base = new Date(0); var skew = base.getTime(); if(skew > 0) expires.setTime(now.getTime()-skew); if(parseInt(hours)) expires.setTime(expires.getTime() + parseInt(hours)*60*60*1000); else expires.setTime(0x7FFFFFFF*1000); } var curCookie = name+"="+escape(value)+ ((expires) ? "; expires="+expires.toGMTString() : "")+ ((path) ? "; path="+path : "")+ ((domain) ? "; domain="+domain : "")+ ((secure) ? "; secure" : ""); document.cookie = curCookie; }
adxcel._getcookie = function(name) { return adxcel.CookieGet(name); }
adxcel._setcookie = function(name, value, hours, path) { adxcel.CookieSet(name, value, hours ? hours : "never", path ? path : "/"); }

var lookback = 30*24;
var clickIdParam = adxcel.UrlParamFrom("adxcel_clickid", null, window.location.href);
if (!clickIdParam && (window.location != window.parent.location))
  clickIdParam = adxcel.UrlParamFrom("adxcel_clickid", null, document.referrer);
if (clickIdParam) {
  clickIdParam = clickIdParam.replace(/_HYPHEN_/g, "-").replace(/_EXCL_/g, "!");
  if (clickIdParam) {
    var parts = clickIdParam.split("@");
    if (parts.length > 1) {
      clickIdParam = parts[0];
      lookback = parseInt(parts[1]/60);
    }
  }
}
adxcel._setcookie("adxcel_clickid", "", -1);
adxcel.clickId = adxcel._getcookie("adxcel_clkid");

if (!clickIdParam && (adxcel.clickId && adxcel.clickId.length)) {
  var action = adxcel.UrlParam("action", "install", "aa.js");
  if (action) {
    var pix = new Image();
    pix.src = window.location.protocol+"//data.adxcel-ec2.com/pixel/?action="+action+"&ad_log=" + encodeURIComponent(adxcel.clickId) + "&cb=" + (new Date()).getTime();
  }
}
else {
  adxcel.clickId = clickIdParam;
  if (adxcel.clickId && adxcel.clickId.length) {
    adxcel._setcookie("adxcel_clkid", adxcel.clickId, lookback);
    var action = adxcel.UrlParam("action", null, "aa.js")
    if (action) {
      var pix = new Image();
      pix.src = window.location.protocol+"//data.adxcel-ec2.com/pixel/?action="+action+"&ad_log=" + encodeURIComponent(adxcel.clickId) + "&cb=" + (new Date()).getTime();
    }
  }
}
