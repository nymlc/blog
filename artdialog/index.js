var gMsgId = [];
artDialog.msg = function(content, time, _callback) {
	var msgWidth = 320;
	var rightMargin = 20;
	var openDuration = 200;
	var closeDuration = 100;
	artDialog({
		title: false,
		lock: false,
		opacity: 0.1,
		width: msgWidth,
		fixed: true,
		resize: false,
		padding: 0,
		drag: false,
		init: function() {
			gMsgId.push(this.config.id);
		},
		close: function() {
			if (_callback != undefined) {
				_callback();
			}
			var _index = $.inArray(this.config.id, gMsgId);
			if (gMsgId.length > 3) {
				gMsgId.splice(_index, 1);
				return true;
			} else {
				gMsgId.splice(_index, 1);
				if (_index) {
					$(art.dialog.list[this.config.id].DOM.wrap[0]).fadeOut(closeDuration, function() {
						_positionPrompt('close');
					});
				} else {$(art.dialog.list[this.config.id].DOM.wrap[0]).fadeOut(closeDuration);
				}
			}
			return false;
		}
	})
	.content('<div style="padding: 20px; border-radius: 0px; margin-bottom: 0px;">' + content + '</div>')
	.time(time ? time : 2);
	_positionPrompt('open');
	$(window).resize(function() {
		_positionPrompt('resize');
	});
	function _getWindowSize() {
		return {
			width: window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth),
			height: window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight)
		};
	}
	function _getMsgHeight(pos) {
		var _height = 0;
		for (var i = gMsgId.length - 1; i >= 0 && i >= pos; i++) {
			_height += art.dialog.list[gMsgId[i]].DOM.wrap[0].offsetHeight;
		}
		return _height;
	}
	function _positionPrompt(type) {
		var _wsize = _getWindowSize();
		for (var i = 0, l = gMsgId.length; i < l; i++) {
			var _top = (_wsize.height - _getMsgHeight(i) - (gMsgId.length - i) * 10);
			if (type === 'close') {
				$(art.dialog.list[gMsgId[i]].DOM.wrap[0]).animate({
					top: _top
				}, openDuration);
			} else if (type === 'open') {
				if (i === (gMsgId.length - 1)) {
					art.dialog.list[gMsgId[i]].position(_wsize.width - msgWidth - rightMargin, _wsize.height);
				} else {
					art.dialog.list[gMsgId[i]].position(_wsize.width - msgWidth - rightMargin, null);
				}
				$(art.dialog.list[gMsgId[i]].DOM.wrap[0]).animate({
					top: _top
				}, openDuration);
			} else if (type === 'resize') {
				art.dialog.list[gMsgId[i]].position(_wsize.width - msgWidth - rightMargin, _top);
			}
		}
		if (gMsgId.length > 3) {
			setTimeout(function(){
				art.dialog.list[gMsgId[0]].close();
			}, openDuration);
		}
	}
}