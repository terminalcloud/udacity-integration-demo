var adobe={
    dtmUserAction:function(n,details){
    document.body.addEventListener("dtmEvent", function(e) {
      _satellite.notify("Custom Event "+ e + "set in code",1);
    })

    // First create the event
    if ( typeof window.CustomEvent !== "function" ) {
        var dtmEvent = document.createEvent("CustomEvent");
        dtmEvent.initCustomEvent(n, true, true, '');
    } else {
        //bodyEle.dispatchEvent(dtmEvent);
        var dtmEvent = new CustomEvent(n, { 'detail':'' });
        jQuery("body").attr("detail", details)
    }

    // Trigger it!
    document.body.dispatchEvent(dtmEvent);
  }
}

