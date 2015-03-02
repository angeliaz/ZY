/*
 * project: ZY Widgets Libs
 * version: 1.0
 * create: 2014-07-10
 * update: 2014-08-03
 * update: 2015-03-02
 * author: Angelia
 */
 (function (win, doc) {

 	var ZY = win['ZY'] || {};

 	ZY = {

 		$: function (id) {
 			return doc.getElementById(id);
 		},



 		/**
 		 * 异步请求
 		 * @param {Object} options 异步请求参数
 		 * 如果type是jsonp
 		 * 如果type是别的类型
 		 * @return {[type]}
 		 */
 		ajax: function (options) {

 			var dataType = options['dataType'].toLocaleLowerCase();

 			if(dataType === 'jsonp') {

 			} else {

 				var xhr = window.ActiveXObject ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
 				var type = typeof options.type === 'undefined' ? 'get' : options.type;
 				xhr.open(type, options.url, true);
 				xhr.send(data);
 				xhr.onreadystatechange = function() {
 					if(xhr.readyState === 4) {
 						if(xhr.state === 200) {
 							options.successCallback;
 						} else {
 							options.failCallback;
 						}
 					}
 				};


 			}

 		}

 	};

 	win.ZY = ZY;

 })(window, document);