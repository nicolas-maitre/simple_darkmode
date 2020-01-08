function asyncReqAnimFrm(){
    return new Promise(function(res, rej){
        requestAnimationFrame(res);
    });
}
function asyncTimeout(time){
    return new Promise(function(res, rej){
        setTimeout(res, time);
    });
}

var Cookies = {};
Cookies.get = function(){
    var cookiesStr = document.cookie;
    var cookiesArray = cookiesStr.split(";");
    var cookies = {};
    cookiesArray.forEach((cookie) => {
        var cookieComponents = cookie.split("=");
        if(cookieComponents.length != 2){
            return;
        }
        var cookey = decodeURIComponent(cookieComponents[0].trim());
        var value = decodeURIComponent(cookieComponents[1]);
        cookies[cookey] = value;
    });
    return cookies;
}
Cookies.set = function(key, value, expiration = (1000 * 60 * 60 * 24 * 365)/*1 year*/, path = false){
    var expirationDate = new Date(Date.now() + expiration);
    var cookieStr = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    cookieStr += `; expires=${expirationDate.toUTCString()}`
    cookieStr += (path?`; path=${path}`:"");
    document.cookie = cookieStr;
}
Cookies.delete = function(key){
    Cookies.set(key, "deleted", -1);
}