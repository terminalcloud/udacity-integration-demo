_satellite.pushAsyncScript(function(event, target, $variables){
  var ele = document.createElement("script");
ele.setAttribute( 'src', "//static.criteo.net/js/ld/ld.js" );
ele.async = 'true';
document.body.appendChild( ele );

var deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d"; 

window.criteo_q = window.criteo_q || [];
window.criteo_q.push(
    { event: "setAccount", account: 11156 },
    { event: "setSiteType", type: deviceType },
    { event: "viewItem", item: C.global.pageObject.getData()[0].catalogItemIdForTextbook },
  	{ event: "setEmail", email: _satellite.getVar('UserEmail') },
    { event: "setData", ui_study: "1", 
     	  ui_lastcategory: _satellite.getVar('CS:ProductsSub-Subject'), 
        ui_lastqaid: 	""
    }
);

var userUuid = _satellite.getVar('userUUID');
if (userUuid.length > 0) {
    window.criteo_q.push(
        { event: "setCustomerId", id: userUuid}
    );
}


});
