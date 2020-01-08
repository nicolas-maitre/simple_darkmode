/*  Original creator: Nicolas Maitre
*   Date: 08.01.2020
*   Requires: utils.js */

var darkModeSelector = false;
var isSwitchingMode = false;

document.addEventListener("DOMContentLoaded", boot);
function boot(){
    //get input
    darkModeSelector = document.querySelector(".darkModeSelector > input");

    //load from cookie
    var mode = Cookies.get()["lightMode"];
    if(mode){
        setMode(mode, false);
    }

    //add input event
    darkModeSelector.addEventListener("change", function(evt){
        var mode = darkModeSelector.checked?"dark":"light";
        setMode(mode);
    });
}

//set actions
function setMode(mode, animate=true){
    darkModeSelector.checked = (mode=="dark");
    
    Cookies.set("lightMode", mode);
    
    if(animate){
        animateModeChange(mode);
    } else {
        displayMode(mode);
    }
}

//animates change
async function animateModeChange(mode){
    //animation class
    await asyncReqAnimFrm();
    isSwitchingMode = true;
    document.body.classList.add("switchingMode");
    //display
    await asyncReqAnimFrm();
    displayMode(mode);
    isSwitchingMode = false;
    //remove animation
    await asyncTimeout(500);
    await asyncReqAnimFrm();
    if(!isSwitchingMode){
        document.body.classList.remove("switchingMode");
    }
}

function displayMode(mode){
    //body
    switch(mode){
        case "dark": document.body.classList.add("darkMode"); break;
        case "light": document.body.classList.remove("darkMode"); break;
        case "toggle":
        default: document.body.classList.toggle("darkMode"); break;
    }
    //bootstrap (maybe)
}