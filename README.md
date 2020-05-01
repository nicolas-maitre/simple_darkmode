# simple_darkmode
A darkmode, easy to implement

## Dependancies
You will need at least the following methods from my (and included) `utils.js` library:
- Cookies.get
- Cookies.set
- async_requestAnimationFrame
- async_setTimeout
- HTMLCollection.prototype.forEach

## How to use

**darkmode switch**  
You will need a targetable **checkbox** in your website that will be used as a darkmode switch.  
You can configure its selector in the `SWITCH_SELECTOR` constant.  
The project comes with an already designed checkbox.

**basic use**  
Most of the design change should be done using css selectors.  
To do that, the `lightMode` and `darkMode` classes will be toggled on the document body.  
To allow animations, the `switchingMode` class will be added during mode change.  
Look at the provided webpage for examples.  
You should use css variables to simplify mode change.  

**switching attributes**  
You will need to add `dark_{attribute name}` or `light_{attribute name}`  
Make sure that the attribute you are using is present in the `SWITCHABLE_ATTRIBUTES` constant. (if not, add it)   
The darkmode will replace the specified attributre with your value, depending on the display mode.

**switching classes**  
If you don't want the whole `class` attribute to be overwritten everytime but only want to toggle a class, you can add the `dark_toggle_class` or `light_toggle_class` attribute to your elements.  
It will only remove/add the specified class.

## Adding custom actions
You can add extra code to further customise the experience in:
- `animateModeChange()`: to customize the animation
- `displayMode()`: to customize how elements are switched from mode to mode / add special cases

## Switching mode with javascript
The `Darkmode` object contains the `setMode` method than you can call with the mode (light/dark) as parameter to switch mode.
