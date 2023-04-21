function _bl_getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}
function _bl_setCookieID() {
	var exdays = 720;

	value = Math.floor((Math.random()*10000)+1);
	value += ".";
	value += new Date().getTime();

	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()+"; path=/");
	document.cookie = "_bl_vid=" + c_value;

	return value;
}
function _bl_getCookieID() {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == "_bl_vid") {
			return unescape(y);
		}
	}

	return "";
}
function _bl_setCookie(name,exdays) {
	var value = Math.floor((Math.random()*10000)+1);
	value += ".";
	value += new Date().getTime();

	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()+"; path=/");
	document.cookie = name + "=" + c_value;
	console.log(document.cookie);
	return true;
}
function _bl_getCookie(name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == name) {
			return unescape(y);
		}
	}

	return "";
}
function _bl_updForms() {
	var _forms = document.getElementsByTagName("form");
	if (_forms.length > 0) {
		var _bl_vid = "";
		_bl_vid = _bl_getCookieID();
		if (_bl_vid == "") {
			_bl_vid = _bl_setCookieID();
		}

		_paq.push(['setCustomVariable','1','_bl_vinfo',_bl_cid+'.'+_bl_vid,'page']);

		for(var i=0;i<_forms.length;i++) {
			var _objForm = _forms[i];
            
			var inputV = document.createElement("input");
			inputV.type = "hidden";
			inputV.id = "_bl_vid";
			inputV.name = "_bl_vid";
			inputV.value = _bl_cid+'.'+_bl_vid;
			_objForm.appendChild(inputV);

			var inputReferer = document.createElement("input");
			inputReferer.type = "hidden";
			inputReferer.id = "_bl_referer";
			inputReferer.name = "_bl_referer";
			inputReferer.value = document.location.href;
			_objForm.appendChild(inputReferer);
		}    
    }
}
function _bl_updFormsInputMvid() {
	var _inputs = document.getElementsByTagName("input");
	if (_inputs.length > 0) {
		for(var i=0;i<_inputs.length;i++) {
			var _objInput = _inputs[i];
			if (_inputs[i].name == "_bl_mvid") {
				_inputs[i].value = _bl_mvid;
			}
		}
	}

	if (typeof callbackBrainLeadAnalytics !== "undefined") {
		callbackBrainLeadAnalytics();
	}
}

function _bl_trackEvent(category, action, name, value) {
	var trackVars = ['trackEvent',category, action];
	if (typeof name != "undefined") {
		trackVars[3] =  name;
	}
	if (typeof value != "undefined") {
		trackVars[4] =  value;
	}
	_paq.push(trackVars);
}

function _bl_trackPageView(title, url) {
    _paq.push(['setDocumentTitle', title]);
	if (typeof url != "undefined") {
        _paq.push(['setCustomUrl', url]);
    }
    _paq.push(['trackPageView']);
}

function _bl_setEcommerceCustomerId(customerId, email) {
    var data = {};
    data['action'] = 'setCustomerId';
    data['customerId'] = customerId;
    data['email'] = email;
    _bl_sendToEcommerceWebhook(data);
}

function _bl_addEcommerceItem(cartId, productSKU, productName, productCategory, productImg, productSize, productColor, productUrl, price, quantity, currencyIsoCode) {
    var data = {};
    data['action'] = 'addCartItem';
    data['cartId'] = cartId;
    data['productCode'] = productSKU;
    data['productName'] = productName;
    data['productCategory'] = productCategory;
    data['productImg'] = productImg;
    data['productVariants'] = {};
    data['productVariants']['size'] = productSize;
    data['productVariants']['color'] = productColor;
    data['productUrl'] = productUrl;
    data['price'] = price;
    data['quantity'] = quantity;
    data['currency'] = currencyIsoCode;
    _bl_sendToEcommerceWebhook(data);
}

function _bl_removeEcommerceItem(cartId, productSKU) {
    var data = {};
    data['action'] = 'removeCartItem';
    data['cartId'] = cartId;
    data['productCode'] = productSKU;
    _bl_sendToEcommerceWebhook(data);
}

function _bl_trackEcommerceOrder(cartId, orderId, revenue, subTotal, tax, shipping, discount, currencyIsoCode) {
    var data = {};
    data['action'] = 'trackOrder';
    data['cartId'] = cartId;
    data['orderId'] = orderId;
    data['revenue'] = revenue;
    data['subTotal'] = subTotal;
    data['tax'] = tax;
    data['shipping'] = shipping;
    data['discount'] = discount;
    data['currency'] = currencyIsoCode;
    _bl_sendToEcommerceWebhook(data);
}

function _bl_trackEcommerceView(productSKU, productName, productCategory, price, currencyIsoCode) {
    var data = {};
    data['action'] = 'trackProductView';
    data['productSKU'] = productSKU;
    data['productName'] = productName;
    data['productCategory'] = productCategory;
    data['price'] = price;
    data['currency'] = currencyIsoCode;
    _bl_sendToEcommerceWebhook(data);
}

function _bl_addEcommerceWishlistItem(productSKU, productName, productCategory) {
    var data = {};
    data['action'] = 'addWishlistItem';
    data['productSKU'] = productSKU;
    data['productName'] = productName;
    data['productCategory'] = productCategory;
    _bl_sendToEcommerceWebhook(data);
}

function _bl_removeEcommerceWishlistItem(productSKU) {
    var data = {};
    data['action'] = 'removeWishlistItem';
    data['productSKU'] = productSKU;
    _bl_sendToEcommerceWebhook(data);
}

function _bl_sendToEcommerceWebhookOld(data) {
    if (window._bl_mvid == null) {
        setTimeout(function() {
            _bl_sendToEcommerceWebhook(data);
        }, 1000);
    } else {
        /**
         * Add to data, information about visitor
         */
        data['_bl_cid'] = window._bl_cid;
        data['_bl_mvid'] = window._bl_mvid;
        if (window._bl_mvinfo == null) {
            data['_bl_msid'] = 1;
        } else {
            data['_bl_msid'] = parseInt(window._bl_mvinfo['3']);  
        }
        /**
         * Send request to BrainLead
         */
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() { 
            if (xhr.readyState == 4) {
                //console.log(data['action']);
                //console.log(xhr.responseText); 
            }
        };
        xhr.open('POST', 'https://app.brainlead.it/3.0.0/libs/ecommerce/webhook.php',false);
        xhr.send(JSON.stringify(data));    
    }
}
function _bl_sendToEcommerceWebhook(data) {
    /**
     * Add to data, information about visitor
     */
    data['_bl_cid'] = window._bl_cid;
    data['_bl_mvid'] = window._bl_mvid;
    if (window._bl_mvinfo == null) {
        data['_bl_msid'] = 1;
    } else {
        data['_bl_msid'] = parseInt(window._bl_mvinfo['3']);  
    }
    if (typeof data['shop_url'] == "undefined") {
        var parser = document.createElement('a');
        parser.href = document.location.href;
        data['shop_url'] = 'https://'+parser.hostname+'/'+parser.pathname.split("/")[1]+'/';
    }
    /**
     * Send request to BrainLead
     */
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4) {
            //console.log(data['action']);
            //console.log(xhr.responseText); 
        }
    };
    xhr.open('POST', 'https://app.brainlead.it/3.0.0/libs/ecommerce/webhook.php',false);
    xhr.send(JSON.stringify(data));    
}

function _bl_setCustomVariable(number, name, value) {
	_paq.push(['setCustomVariable',number,name,value,'page']);
}

function _bl_setUserId(userid) {
	_paq.push(['setUserId', userid]);
}

function _bl_setUserData(data, action) {
    data['action'] = 'setUserData';
    _bl_sendToEcommerceWebhook(data);
    if (typeof action != 'undefined') {
        _bl_trackEvent('user',action);
    }
}

function _bl_trackWebFormsView() {
	var _inputs = document.getElementsByTagName("input");
	if (_inputs.length > 0) {
		for (var i=0;i<_inputs.length;i++) {
			if (_inputs[i].name == "web_form_id") {
				_bl_trackEvent('web_form','show',_inputs[i].value);
			}
		}
	}
}

function _bl_storeVisitorInfo(id,info) {
    /**
     * Store visitor info
     */
    window._bl_mvid = id;
    window._bl_mvinfo = info;
    if (_bl_el_script != null && _bl_el_script.dataset.debug != null && _bl_el_script.dataset.debug) {
        console.log("_bl_mvid: "+window._bl_mvid);
        console.log("_bl_mvinfo: "+window._bl_mvinfo);
    }
    /**
     * Save cookie
     */
    //if (_bl_el_script != null && _bl_el_script.dataset.ecommerce != null && _bl_el_script.dataset.ecommerce) {
        if (_bl_getCookie("_bl_mvid") == "") {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + 720);
            document.cookie = "_bl_mvid=" + escape(window._bl_mvid) + "; expires="+exdate.toUTCString()+"; path=/";
            //document.cookie = "_bl_mvid=" + escape(window._bl_mvid) + "; expires="+exdate.toUTCString()+"; path=/";
            if (_bl_el_script != null && _bl_el_script.dataset.debug != null && _bl_el_script.dataset.debug) {
                console.log("cookie: "+document.cookie);
            }
        } else {
            if (_bl_el_script != null && _bl_el_script.dataset.debug != null && _bl_el_script.dataset.debug) {
                console.log("cookie _bl_mvid: "+_bl_getCookie("_bl_mvid"));
            }
        }
    //}
    /**
     * Add _bl_mvid to forms
     */
    _bl_updFormsInputMvid();
    /**
     * Track forms view
     */
    _bl_trackWebFormsView();    
}

var _bl_el_script = document.getElementById('BrainLeadTracking');

window._bl_mvid = null;
window._bl_mvinfo = null;

var _paq = _paq || [];

var _bl_pid = _bl_getUrlParameter('_bl_pid');
if (typeof _bl_pid != "undefined") {
	_paq.push(['setCustomVariable','1','_bl_pid',_bl_pid,'visit']);    
    if (_bl_el_script != null && _bl_el_script.dataset.debug != null && _bl_el_script.dataset.debug) {
        console.log("_bl_pid: "+_bl_pid);
    }
}

var _bl_cae_id = _bl_getUrlParameter('_bl_cae_id');
if (typeof _bl_cae_id != "undefined") {
	_paq.push(['setCustomVariable','2','_bl_cae_id',_bl_cae_id,'visit']);    
    if (_bl_el_script != null && _bl_el_script.dataset.debug != null && _bl_el_script.dataset.debug) {
        console.log("_bl_cae_id: "+_bl_cae_id);
    }
}

var _bl_aid = _bl_getUrlParameter('_bl_aid');
var _bl_suid = _bl_getUrlParameter('_bl_suid');
if (typeof _bl_aid != "undefined" || typeof _bl_suid != "undefined") {
    var _bl_aid_suid = "";
    if (typeof _bl_aid != "undefined") {
        _bl_aid_suid += _bl_aid;
    }
    _bl_aid_suid += ",";
    if (typeof _bl_suid != "undefined") {
        _bl_aid_suid += _bl_suid;
    }
	_paq.push(['setCustomVariable','3','_bl_aid_suid',_bl_aid_suid,'visit']);    
    if (_bl_el_script != null && _bl_el_script.dataset.debug != null && _bl_el_script.dataset.debug) {
        console.log("_bl_aid_suid: "+_bl_aid_suid);
    }
}

if (typeof window._bl_ca_id != "undefined" || typeof window._bl_cu_id != "undefined") {
    var _bl_ca_cu_id = "";
    if (typeof window._bl_ca_id != "undefined") {
        _bl_ca_cu_id += window._bl_ca_id;
    }
    _bl_ca_cu_id += ",";
    if (typeof window._bl_cu_id != "undefined") {
        _bl_ca_cu_id += window._bl_cu_id;
    }
	_paq.push(['setCustomVariable','4','_bl_ca_cu_id',_bl_ca_cu_id,'visit']);    
    if (_bl_el_script != null && _bl_el_script.dataset.debug != null && _bl_el_script.dataset.debug) {
        console.log("_bl_ca_cu_id: "+_bl_ca_cu_id);
    }
}

_bl_updForms();

_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

(function() {
    var u = "https://analytics.brainlead.it/";
    _paq.push(['setTrackerUrl', u+'brainlead.php']);
    if (typeof _bl_msid !== 'undefined') {
        _paq.push(['setSiteId', _bl_msid]);
    } else {
        _paq.push(['setSiteId', _bl_cid]);
    }
    _paq.push([ function() { _bl_storeVisitorInfo(this.getVisitorId(),this.getVisitorInfo()); }]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript';
    g.async=true;
    g.defer=true;
    g.src=u+'brainlead.js';
    if (typeof window._bl_cid != 'undefined' && window._bl_cid != 797 && window._bl_cid != 798) {
        s.parentNode.insertBefore(g,s);
    }
})();