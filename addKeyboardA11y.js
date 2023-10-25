function a11yClick(event){
   if(event.type === 'keypress'){
        var code = event.charCode || event.keyCode;
        if((code === 32)|| (code === 13)){
            event.target.click();
        }
    }
}
// select the inaccessible button, if they press Enter or Space, trigger a mouse click to activate the control
$('#inaccessible-button').on('keypress', a11yClick(event));
