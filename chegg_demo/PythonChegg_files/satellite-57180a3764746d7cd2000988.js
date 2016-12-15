_satellite.pushBlockingScript(function(event, target, $variables){
  function dtm_notify(text) {
    _satellite.notify(text,1);
    return true;  
} 

if (typeof digitalData !== 'undefined'){
    var ddoString = JSON.stringify(digitalData,null,"\t");
    dtm_notify('DTM:digitalData:\n'  + ddoString);
}    
else {
    dtm_notify('DTM:digitalData not defined'); 
}

});
