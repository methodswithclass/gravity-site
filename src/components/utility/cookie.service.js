utilityModule.factory("cookie.service", ["utility.service", function (utility) {

    var cookies = [
        utility.c.objSizeKey,
        utility.c.objKey,
        utility.c.factorKey
    ]

    var exdays = 2;

    var resetCookies = true;

    var getExpireTime = function (time) {

        var d = new Date(time);
        if (time == 0) return "expires=" + d.toUTCString();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        return "expires="+ d.toUTCString();
    }

    
    var setCookie = function (key, value, expires) {

        if (!expires) expires = getExpireTime();
        
        document.cookie = key + "=" + value + ";" + expires + ";";

        console.log("set cookie", document.cookie);

    }

    var getCookie = function (key) {

        
        var cookie = document.cookie;

        var indexKey = cookie.indexOf(key);
        var substr_cookie;
        var indexValue;
        var indexEnd;
        var substr_value = null;

        if (indexKey >= 0) {

            console.log("indexKey", indexKey);

            substr_cookie = cookie.substring(indexKey);

            console.log("substr_key", substr_cookie);
            indexValue = substr_cookie.indexOf("=") + 1;
            indexEnd = substr_cookie.indexOf(";");

            if (indexValue >= 0 && indexEnd >= 0) {
                substr_value = substr_cookie.substring(indexValue, indexEnd);
            }
            else if (indexValue >= 0) {
                substr_value = substr_cookie.substring(indexValue);
            }
            
        }

        console.log("get cookie: key:", key, "value:", substr_value);

        return substr_value;
    }


    return {

        setCookie:setCookie,
        getCookie:getCookie
    }

    if (resetCookies) {

        (function () {
            for (var i in cookies) {
                setCookie(cookies[i], "", getExpireTime(0));
            }
        }())
    }


}])