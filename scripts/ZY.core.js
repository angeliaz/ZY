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
 		 * 去掉字符串头尾空格
 		 * @param  {String} text 字符串
 		 * @return {String}
 		 */
 		trim: function(text) {
 			return text === null ? '' : text.replace(/(^\s*|\s*$)/g, '');
 		},

 		/**
 		 * 转换字符串为对象
 		 * @param  {[type]} data [description]
 		 * @return {[type]}      [description]
 		 */
 		parseJSON: function(data) {
 			if(!data || typeof data !== 'string') {
 				return null;
 			}
 			data = this.trim(data);
 			if (win.JSON && win.JSON.parse) {
 				return win.JSON.parse(data);
 			} 
 			return (new Function('return ' + data ))();
 		},

 		/**
 		 * 对象转换为字符串
 		 * @param  {Object} obj 对象
 		 * @return {String}
 		 */
 		obj2str: function(obj) {

 			var str = [];
 			var type = typeof obj;

 			switch (type) {
 				case 'undefined':
 					str = '';
 					break;
 				case 'string':
 					str = '\"' + obj.replace(/([\"\\])/g, '\\$1').replace(/(\n)/g, '\\n').replace(/(\r)/g, '\\r').replace(/(\t)/g, '\\t') + '\"';
 					break;
 				case 'object':
 					if (!this.isArray(obj)) {
			            for (var i in obj) {
			              str.push('\"' + i + '\":' + this.obj2str(obj[i]));
			            }
			            if (!!doc.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(obj.toString)) {
			              str.push('toString:' + obj.toString.toString());
			            }
			            str = '{' + str.join() + '}';
			        } else {
			            for (var j = 0; j < obj.length; j++) {
			              str.push(this.obj2str(obj[j]));
			            }
			            str = '[' + str.join() + ']';
			        }
 					break;
 				default:
 					str = obj.toString().replace(/\"\:/g, '":""');
 					break;
 			}

 			return str;

 		},


 		/**
 		 * 异步请求
 		 * @param {Object} options 异步请求参数
 		 * 如果type是jsonp
 		 * 如果type是别的类型
 		 */
 		ajax: function (options) {

 			var dataType = options['dataType'].toLocaleLowerCase();
 			var data = options.data;
 			data = decodeURIComponent(typeof data === 'undefined' ? '' : (typeof data === 'object' ?  ZY.obj2str(data)  : data));


 			if(dataType === 'jsonp') {

 			} else {

 				var xhr = !window.ActiveXObject ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
 				var type = typeof options.type === 'undefined' ? 'get' : options.type.toLocaleLowerCase();
 				if (type === 'post') {
 					xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
 				} else if(data !== '') {
 					options.url = options.url + data;
 				}
 				xhr.open(type, options.url, true);
 				xhr.send(decodeURIComponent(options.data));
 				xhr.onreadystatechange = function() {
 					if(xhr.readyState === 4) {
 						if(xhr.status === 200) {
 							options.successCallback(ZY.parseJSON(xhr.responseText));
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