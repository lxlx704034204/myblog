﻿/**
 * jQuery Easing v1.3
 */
jQuery.extend( jQuery.easing,
{
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
});

/*!
 * clipboard.js v1.5.5
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,r){function o(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){var r=t("matches-selector");e.exports=function(t,e,n){for(var o=n?t:t.parentNode;o&&o!==document;){if(r(o,e))return o;o=o.parentNode}}},{"matches-selector":2}],2:[function(t,e,n){function r(t,e){if(i)return i.call(t,e);for(var n=t.parentNode.querySelectorAll(e),r=0;r<n.length;++r)if(n[r]==t)return!0;return!1}var o=Element.prototype,i=o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector;e.exports=r},{}],3:[function(t,e,n){function r(t,e,n,r){var i=o.apply(this,arguments);return t.addEventListener(n,i),{destroy:function(){t.removeEventListener(n,i)}}}function o(t,e,n,r){return function(n){n.delegateTarget=i(n.target,e,!0),n.delegateTarget&&r.call(t,n)}}var i=t("closest");e.exports=r},{closest:1}],4:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.function=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],5:[function(t,e,n){function r(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.function(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return o(t,e,n);if(c.nodeList(t))return i(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function i(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=r},{"./is":4,delegate:3}],6:[function(t,e,n){function r(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),r=document.createRange();r.selectNodeContents(t),n.removeAllRanges(),n.addRange(r),e=n.toString()}return e}e.exports=r},{}],7:[function(t,e,n){function r(){}r.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function r(){o.off(t,r),e.apply(n,arguments)}var o=this;return r._=e,this.on(t,r,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,o=n.length;for(r;o>r;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],o=[];if(r&&e)for(var i=0,a=r.length;a>i;i++)r[i].fn!==e&&r[i].fn._!==e&&o.push(r[i]);return o.length?n[t]=o:delete n[t],this}},e.exports=r},{}],8:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.__esModule=!0;var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=t("select"),c=r(a),s=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){if(this.text&&this.target)throw new Error('Multiple attributes declared, use either "target" or "text"');if(this.text)this.selectFake();else{if(!this.target)throw new Error('Missing required attributes, use either "target" or "text"');this.selectTarget()}},t.prototype.selectFake=function t(){var e=this;this.removeFake(),this.fakeHandler=document.body.addEventListener("click",function(){return e.removeFake()}),this.fakeElem=document.createElement("textarea"),this.fakeElem.style.position="absolute",this.fakeElem.style.left="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=c.default(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click"),this.fakeHandler=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=c.default(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},i(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!=typeof e||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');this._target=e}},get:function t(){return this._target}}]),t}();n.default=s,e.exports=n.default},{select:6}],9:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}n.__esModule=!0;var c=t("./clipboard-action"),s=r(c),u=t("tiny-emitter"),l=r(u),f=t("good-listener"),d=r(f),h=function(t){function e(n,r){o(this,e),t.call(this),this.resolveOptions(r),this.listenClick(n)}return i(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=d.default(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return a("action",e)},e.prototype.defaultTarget=function t(e){var n=a("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return a("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(l.default);n.default=h,e.exports=n.default},{"./clipboard-action":8,"good-listener":5,"tiny-emitter":7}]},{},[9])(9)});


/**
 * 全站JS
 */
jQuery(document).ready(function($){
	window.onload = function(){prettyPrint();};
	var Global = {
		/**
		 * 浏览器兼容
		 */
		ieVersion: function() {
		    var ver = 100;
		    if ($.browser.msie) {
		        ver = parseInt($.browser.version);
		    }
		    return ver;
		},
		/**
		 * 浏览器版本提示
		 */
		notifyForIE: function() {
			if (this.ieVersion() == 8 && document.documentMode != 8) { /* IE8兼容模式 */
				$('#page').before('<div style="text-align: center;font-size: 16px; padding: 20px 0; line-height: 1.6em;">您正在使用兼容模式浏览本站，<b>强烈建议您切换到正常/极速模式</b>。<br/><br/>'+
					'兼容模式是为了能支持旧网站，但在本网站下可能会有错位等情况，影响浏览。<br/>一般在地址栏（即网址的输入框）的右边有切换正常/兼容模式的按钮。<br/>'+
					'切换后本提示自动消失。</div>');
			}
			if (this.ieVersion() <= 7 ) { /* IE6,7 */
				$('#page').before('<div style="text-align: center;font-size: 16px; padding: 20px 0; line-height: 1.6em;">您正在使用的浏览器对本网站支持不佳。<br/><br/>不论出于什么原因，您还在使用已经落伍的低版本IE，<br/>'+
					'强烈建议您尝试使用<a href="http://www.google.com/intl/zh-CN/chrome/‎" target="_blank">Chrome</a>、<a href="http://www.firefox.com.cn/‎" target="_blank">Firefox</a>等现代浏览器，<br/>'+
					'或使用<a href="http://ie.sogou.com" target="_blank">搜狗浏览器</a>等双核浏览器且切换到高速(WebKit)内核来浏览网站，</br>'+
					'<strong>这将大大提升您的上网体验！</strong></div>');
			}
		},
		/*
		 * 添加百度统计
		 */
		addTongji: function() {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?dc9170d69ef95909ca13d9b5f0c98c71";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);

			var c = document.getElementsByTagName('body')[0].className;
			if (c && c.match(/postid-([\d]+)/)[0] == '62') {
				var cnzz = document.createElement("script");
				cnzz.src = "//s4.cnzz.com/z_stat.php?id=1258992124&web_id=1258992124";
				s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(cnzz, s);
			}
		},
		/*
		 * 代码高亮的工具栏
		 */
		codePrettifyToolbar: function(lang) {
			var _lang;
			switch( lang.toLowerCase() ) {
				case 'js':
				case 'javascript':
					_lang = 'JavaScript';
					break;
				case 'java':
				case 'python':
				case 'shell':
					_lang = lang.charAt(0).toUpperCase().concat(lang.toLowerCase().slice(1));
					break;
				case 'bash':
					_lang = 'Shell 命令';
					break;
				case 'c':
					_lang = 'C 语言';
					break;
				case 'html': 
				case 'css': 
				case 'xml':
				case 'cpp':
					_lang = lang.toUpperCase();
					break;
				default:
					_lang = lang; 
			}

			var toolbar = '<div class="code-pretty-toolbar">' +
							'<span class="title">' + _lang + '</span>' +
							'<a href="javascript:void(0);" title="复制代码" class="tool clipboard"><i class="fa fa-files-o"></i></a>' +
							'<a href="javascript:void(0);" title="查看纯文本代码" class="tool view-source"><i class="fa fa-code"></i></a>' +
							'<a href="javascript:void(0);" title="返回代码高亮" class="tool back-to-pretty"><i class="fa fa-undo"></i></a>' +
							'<span class="msg"></span>' +
						  '</div>';

			return toolbar;
		},
		/*
		 * 获取代码文本
		 */
		getPrettifyCode: function($container) {
			code = [];

			// 组合代码
			$container.find('li').each(function() {
				code.push( $(this).text() );
			});
			// using \r instead of \r or \r\n makes this work equally well on IE, FF and Webkit
			code = code.join('\r');
			// For Webkit browsers, replace nbsp with a breaking space
			code = code.replace(/\u00a0/g, " ");

			return code;
		},
		/*
		 * 代码高亮工具栏功能
		 */
		codePrettifyToolbarAction: function() {
			/* 复制代码 */
			_this = this;
			var clipboard = new Clipboard('.clipboard', {
				text: function(e) {
					$container = $(e).parent().parent();
					return _this.getPrettifyCode($container);
				}
			});
			clipboard.on('success', function(e) {
				$container = $(e.trigger).parent().parent();
				$container.find('.msg').hide().text('已复制.').stop().fadeIn(300).delay(1500).fadeOut(500);
			});

			clipboard.on('error', function(e) {
				$container = $(e.trigger).parent().parent();
				$container.find('.msg').hide().text('暂不支持当前浏览器，请手动复制 (ctrl + c)').stop().fadeIn(300).delay(3000).fadeOut(500);
				$container.find('.view-source').trigger('click');
			});

			/* 其他事件 */
			$('.code-pretty-toolbar a').on('click', function() {
				/* 查看纯文本代码 */
				if ( $(this).hasClass('view-source') ) {
					$container = $(this).parent().parent();

					// 获取代码文本
					code = _this.getPrettifyCode($container);

					// 填充 textarea
					if ( !$container.find('textarea').length ) {
						$container.append('<textarea class="code-pretty-text">' + code + '</textarea>');
					} else {
						$container.find('textarea').val(code);
					}

					// 调整 textarea 位置
					var $pre = $container.find('pre');
					if ( $pre.hasClass('lang-bash') ) { // bash 固定不变
						var w = $pre.width() - 15;
						var h = $pre.height() + 10;
						var marginLeft = 32;
					} else {
						var liCount = $pre.find('li').length;
						var offset = liCount / 1000;
						var w = $pre.width() - 30 - 5*offset
						var h = $pre.height() + 10;
						var marginLeft = 53 + 5*offset;
					}

					// 显示 textarea
					$container.find('textarea').css({height: h, width: w, 'margin-left': marginLeft})
											   .show().select();

					$container.find('.view-source').hide();
					$container.find('.back-to-pretty').css('display', 'inline-block');

				} else if ( $(this).hasClass('back-to-pretty') ) {
					$container.find('.back-to-pretty').hide();
					$container.find('.view-source').css('display', 'inline-block');

					$container.find('textarea').hide();
				}
			});
		},
		/* 增加 bash 高亮规则 */
		codePrettifyAddBash: function() {
			/* 不完善的实现 */
			PR['registerLangHandler'](
			    PR['createSimpleLexer'](
			        [
			         // Whitespace
			         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
			         // A double or single quoted, possibly multi-line, string.
			         [PR['PR_STRING'],      /^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/, null,
			          '"\'']
			        ],
			        [
			         [PR['PR_COMMENT'], /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, '#'],
			         [PR['PR_KEYWORD'], /[^\.\/]?(?:ls|cd|chown|chmod|sudo|su|vi|vim|cat|touch|tar|scp|cp|ssh|useradd|passwd|apt\-get|export|source|echo|mv|mkdir|rm)(\s)+/i, null],
			         // [PR['PR_LITERAL'],
			          // /^([^a-zA-Z0-9](-(\w)*))|\$(\w)*/i],
			         // An identifier
			         [PR['PR_PLAIN'], /^[a-z_][\w-]*/i],
			         // A run of punctuation
			         // [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]
			        ]),
			    ['bash', 'sh', 'shell']);
		},
		/*
		 * 代码高亮 Google Code Prettify
		 */
		codePrettify: function() {
			/* 更改 pre 的 class，增加 toolbar */
			var _this = this;
			$('pre code').each(function() {
				var lang = $(this).attr('class');
				if (lang) {
					var code = $(this).html();
					$(this).parent().attr('class', 'prettyprint linenums lang-' + lang).html(code)
							.wrap('<div class="code-pretty-container"></div>')
							.parent().append( _this.codePrettifyToolbar(lang) );
				}
			});
			this.codePrettifyAddBash();
			PR.prettyPrint();
			this.codePrettifyToolbarAction();
		},
		/*
		 * 样式
		 */
		extraCss: function() {
			/* 摘要中的继续阅读，向右对齐 */
			$('.entry-preview').find('.more-link').parent().css({'text-align': 'right', 'margin-top': '-10px'});
		},
		init: function() {
			// this.notifyForIE();
			this.extraCss();
			this.codePrettify();
			this.addTongji();
		}
	};

	var Single = {
		/**
		 * 点击继续阅读进入页面，滚动到相应位置
		 */
		goToHash: function() {
			if(location.hash.length > 1 && location.hash.indexOf('#more') != -1) {
				$('html,body').animate({scrollTop: $(location.hash).offset().top - 50}, 800, "easeOutQuart");
			}
		},

		/* 增强图片显示效果 */
		addImgAlt: function() {
			$('.entry-content').find('p').each(function() {
				if ( $(this).find('img:only-child').length ) {
					$(this).append('<span class="img-caption">' + $(this).find('img').attr('alt') +'</span>');
				}
			});
		},
		/* 增强表格样式 */
		addTableClass: function() {
			$('.entry-content').find('table').addClass('table').addClass('table-striped');
		},
		/* 显示隐藏部分 */
		bindFold: function() {
			$('.fold-link').bind('click', function() {
				var _text = $(this).text();
				if (_text.substring(0, 4) == '点击查看') {
					$(this).text('点击隐藏：' + _text.substring(5));
					$(this).css('margin-bottom', '0px');

					$(this).next('.fold-text').slideToggle();
				} else {
					$(this).text('点击查看：' + _text.substring(5));

					/* 由于 margin-bottom 的缘故，进行额外处理 */
					var _this = $(this);
					$(this).next('.fold-text').slideToggle('normal', function() {
						_this.css('margin-bottom', '15px');
					});
				}

			});
		},

		/* 显示访问量 */
		ajaxCount: function() {
			var siteUrl = 'http://www.powerxing.com/';
			var postId = null;
			var c = document.getElementsByTagName('body')[0].className;
			if (c) postId = c.match(/postid-([\d]+)/)[1];
			postId = parseInt(postId);
			if (!postId) return false;

			$.ajax({
				url: siteUrl + "wp-content/plugins/ajax-hits-counter/increment-hits.rapid.php?post_id=" + postId + "&t=" + (parseInt(new Date().getTime())),
				cache: false
			}).done(function( data ) {
				$( "#views" ).html( '<i class="fa fa-eye"></i> ' + data );
			});
		},
		/* 返回顶部 */
		backToTop: function() {
			$('body').append('<div class="back-to-top" id="back-to-top" title="嗖的就上去了！"><span><i class="fa fa-chevron-up"></i></span></div>');
			$(window).bind("scroll", function(){

				// 获取网页文档对象滚动条的垂直偏移
				var scrollTopNum = $(document).scrollTop(),
				    // 获取浏览器当前窗口的高度
				    winHeight = $(window).height(),
				    returnTop = $("#back-to-top");

				// 滚动条的垂直偏移大于 0 时显示，反之隐藏
				(scrollTopNum > 300) ? returnTop.fadeIn(200) : returnTop.fadeOut(200);

				// 给 IE6 定位
				if (!-[1,]&&!window.XMLHttpRequest) {
				    returnTop.css("top", scrollTopNum + winHeight - 200);
				}

			});

			// 点击按钮后，滚动条的垂直方向的值逐渐变为0，也就是滑动向上的效果
			$("#back-to-top").click(function() {
			  $("html, body").animate({ scrollTop: 0 }, 500);
			});

		},
		/* 打赏作者 */
		dashang: function() {
			var html = '<div style="border-top: 1px dashed #DDD; padding: 10px 0 0; margin-top: 15px;">' +
						'<p style="text-align: center;"><img src="http://www.powerxing.com/wp-content/themes/power/images/dashang-2.png"></p>' +
						'<p style="text-align: center;">文章很给力？微信扫一扫给作者打赏2元 :)<br/>' +
						'<a href="http://www.powerxing.com/sponsor/" target="_blank" style="font-size: 13px;">~感谢赞助者~</a></p>' +
						'</div>';
			$('.entry-footer').prepend(html);
		},
		init: function() {
			if ($('body').hasClass('single-post')) {
				this.goToHash();

				this.bindFold();

				this.ajaxCount();
				this.backToTop();
				this.dashang();
			}
		}
	};

	var Special = {
		/* 显示大数据书籍的广告 */
		bigDataBook: function() {
			if ($('body').hasClass('postid-62') || $('body').hasClass('postid-63')) {
				var html = '<div class="bigdata-book" style="margin-bottom:14px"><a href="http://dblab.xmu.edu.cn/post/bigdata/" title="大数据技术原理与应用" target="_blank"><img src="http://www.powerxing.com/other/bigdata-poster.png" alt="大数据技术原理与应用" style="border: solid 1px #3895CE !important"></a></div>';
				$('.entry-content').prepend(html);
			}
		},
		init: function() {
			// this.bigDataBook();
		}
	}

	Global.init();
	Single.init();
	Special.init();

});