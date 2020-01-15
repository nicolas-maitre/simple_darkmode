"use strict"
/*  Original creator: Nicolas Maitre
*   Date: 08.01.2020
*   Requires: utils.js */
var DarkMode = new(function(){
    var _this = this;
    
    var LIGHT_MODE_CLASS = "lightMode";
    var DARK_MODE_CLASS = "darkMode";
    var SWITCH_ANIMATION_CLASS = "switchingMode";
    var OPPOSITE_MODE = {dark: "light", light: "dark"};

    var darkModeSelector = false;
    var isSwitchingMode = false;

    document.addEventListener("DOMContentLoaded", boot);
    function boot(){
        //get input
        darkModeSelector = document.querySelector(".darkModeSelector > input");

        //load from cookie
        var mode = Cookies.get()["lightMode"];
        if(mode){
            _this.setMode(mode, false);
        }

        //add input event
        darkModeSelector.addEventListener("change", function(evt){
            var mode = darkModeSelector.checked?"dark":"light";
            _this.setMode(mode);
        });
    }

    //set actions
    this.setMode = function(mode, animate=true){
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
        await async_requestAnimationFrame();
        isSwitchingMode = true;
        document.body.classList.add(SWITCH_ANIMATION_CLASS);
        //display
        await async_requestAnimationFrame();
        displayMode(mode);
        isSwitchingMode = false;
        //remove animation
        await async_setTimeout(500);
        await async_requestAnimationFrame();
        if(!isSwitchingMode){
            document.body.classList.remove(SWITCH_ANIMATION_CLASS);
        }
    }

    function displayMode(mode){
        //body
        switch(mode){
            case "dark": 
                document.body.classList.add(DARK_MODE_CLASS); 
                document.body.classList.remove(LIGHT_MODE_CLASS); 
                break;
            case "light": 
                document.body.classList.remove(DARK_MODE_CLASS);
                document.body.classList.add(LIGHT_MODE_CLASS);
                break;
            case "toggle":
            default: 
                document.body.classList.toggle(DARK_MODE_CLASS); 
                document.body.classList.toggle(LIGHT_MODE_CLASS); 
            break;
        }
        //alt attr
        swapModeAttributes("src", mode);
        swapModeAttributes("class", mode);
        swapModeAttributes("style", mode);
        modeClassToggler(mode);
        //other

    }

    function swapModeAttributes(attribute, mode){
        var darkAttribute = `dark_${attribute}`;
        var lightAttribute = `light_${attribute}`;
        var elems = document.querySelectorAll(`*[${darkAttribute}], *[${lightAttribute}]`);
        elems.forEach((elem) => {
            swapModeAttribute(elem, attribute, OPPOSITE_MODE[mode], mode)
        });
    }
    function swapModeAttribute(elem, attribute, fromMode, toMode){
        var fromAttr = `${fromMode}_${attribute}`;
        var toAttr = `${toMode}_${attribute}`;
        if(!elem.hasAttribute(toAttr)){
            return;
        }
        if(!elem.hasAttribute(fromAttr) && elem.hasAttribute(attribute)){
            elem.setAttribute(fromAttr, elem.getAttribute(attribute));
        }
        elem.setAttribute(attribute, elem.getAttribute(toAttr));
    }

    function modeClassToggler(mode){
        var toggleAttrSuffix = "_toggle_class";
        var removeToggleAttr = OPPOSITE_MODE[mode] + toggleAttrSuffix;
        var addToggleAttr = mode + toggleAttrSuffix;
        var elems = document.querySelectorAll(`*[${removeToggleAttr}], *[${addToggleAttr}]`);
        elems.forEach((elem) => {
            if(elem.hasAttribute(removeToggleAttr)){
                elem.classList.remove(elem.getAttribute(removeToggleAttr));
            }
            if(elem.hasAttribute(addToggleAttr)){
                elem.classList.add(elem.getAttribute(addToggleAttr));
            }
        });
    }
});