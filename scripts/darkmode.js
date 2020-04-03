"use strict"
/*  
*   Repo: https://github.com/nicolas-maitre/simple_darkmode.git
*   Original creator: Nicolas Maitre
*   Date: 08.01.2020
*   Requires: utils.js */
var DarkMode = new (function () {
    var _this = this;

    const LIGHT_MODE_CLASS = "lightMode";
    const DARK_MODE_CLASS = "darkMode";
    const SWITCH_ANIMATION_CLASS = "switchingMode";
    const TOGGLE_CLASS_SUFFIX = "_toggle_class";
    const OPPOSITE_MODE = { dark: "light", light: "dark" };
    const SWITCH_SELECTOR = ".darkModeSelector > input";
    const COOKIE_NAME = "lightMode";
    const SWITCHABLE_ATTRIBUTES = ["src", "class", "style"];
    const ANIMATION_LENGTH = 500; //should also be changed in css

    var darkModeSelector = false;
    var isSwitchingMode = false;

    document.addEventListener("DOMContentLoaded", boot);
    function boot() {
        //get input
        darkModeSelector = document.querySelector(SWITCH_SELECTOR);
        
        //load from cookie
        var mode = Cookies.get()[COOKIE_NAME];
        if (mode) {
            _this.setMode(mode, false);
        }
        //add input event
        darkModeSelector.addEventListener("change", evt => {
            var mode = darkModeSelector.checked ? "dark" : "light";
            _this.setMode(mode);
        });
    }

    //set actions
    this.setMode = function (mode, animate = true) {
        darkModeSelector.checked = (mode == "dark");

        Cookies.set(COOKIE_NAME, mode);

        if (animate) {
            animateModeChange(mode);
        } else {
            displayMode(mode);
        }
    }

    //animates change
    async function animateModeChange(mode) {
        //animation class
        await async_requestAnimationFrame();
        isSwitchingMode = true;
        document.body.classList.add(SWITCH_ANIMATION_CLASS);
        //display
        await async_requestAnimationFrame();
        displayMode(mode);
        isSwitchingMode = false;
        //remove animation
        await async_setTimeout(ANIMATION_LENGTH);
        await async_requestAnimationFrame();
        if (!isSwitchingMode) {
            document.body.classList.remove(SWITCH_ANIMATION_CLASS);
        }
    }

    function displayMode(mode) {
        //body
        switch (mode) {
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
        SWITCHABLE_ATTRIBUTES.forEach(attr => {
            swapModeAttributes(attr, mode);
        });
        //alt class
        modeClassToggler(mode);

        //other actions:

    }

    function swapModeAttributes(attribute, mode) {
        var fromAttr = `${OPPOSITE_MODE[mode]}_${attribute}`; //f.e. dark_src
        var toAttr = `${mode}_${attribute}`; //f.e light_src
        var elems = document.querySelectorAll(`*[${fromAttr}], *[${toAttr}]`);
        elems.forEach((elem) => {
            if (!elem.hasAttribute(toAttr)) {
                return; //no special attr
            }
            if (!elem.hasAttribute(fromAttr) && elem.hasAttribute(attribute)) {
                elem.setAttribute(fromAttr, elem.getAttribute(attribute)); //set opposite mode attribute if empty
            }
            elem.setAttribute(attribute, elem.getAttribute(toAttr));
        });
    }

    function modeClassToggler(mode) {
        var toggleAttrSuffix = TOGGLE_CLASS_SUFFIX;
        var removeToggleAttr = OPPOSITE_MODE[mode] + toggleAttrSuffix;
        var addToggleAttr = mode + toggleAttrSuffix;
        var elems = document.querySelectorAll(`*[${removeToggleAttr}], *[${addToggleAttr}]`);
        elems.forEach((elem) => {
            if (elem.hasAttribute(removeToggleAttr)) {
                elem.classList.remove(elem.getAttribute(removeToggleAttr));
            }
            if (elem.hasAttribute(addToggleAttr)) {
                elem.classList.add(elem.getAttribute(addToggleAttr));
            }
        });
    }
});

// export default DarkMode;