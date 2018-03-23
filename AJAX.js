/*
    AJAX({
        url:"",
        type:"GET"/"POST",
        async:true/false,
        data:{},
        success:function(){},
        error:function(){}
    })
*/


(function(window) {
    
    function AJAX(opt) {
        opt = opt || {};

        opt = {
            url: opt.url || "",
            type: (opt.type || 'GET').toUpperCase(),
            async: opt.async ? opt.async : true,
            data: opt.data || {},
            success: opt.success || function(str) {},
            error: opt.error || function(str) {}
        }

        var format = function(obj) {
            arr = new Array();
            Object.keys(obj).forEach(function(item) {
                arr.push(item + "=" + obj[item]);
            });
            return arr.join("&");
        };

        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                opt.success(this.responseText);
            } else if (this.readyState === 4 && this.status !== 200) {
                opt.error(this.status);
            }
        };

        switch (opt.type) {
            case "POST":
                xmlhttp.open('POST', opt.url, opt.async);
                xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xmlhttp.send(format(opt.data));
                break;
            default:
                xmlhttp.open('GET', opt.url + '?' + format(opt.data), opt.async);
                xmlhttp.send();
                break;
        }

    }
    window.AJAX = AJAX;
})(window)