// Description:
// Displays the description for the requested error code.
//
// Dependencies:
// None
//
// Configuration:
// None
//
// Commands:
// hubot http code <code>
//
// Author:
// Ajnasz

module.exports = function (robot, scripts) {
	function getCodeMessage(codeObj) {
		return codeObj.code + ' is ' + codeObj.title + ', ' + codeObj.summary + ' ' + codeObj.descriptions.wikipedia.link;
	}

	function getNoCodeMessage(code) {
		if (code) {
			return 'No such code: ' + code;
		}

		return 'No such code';
	}

	function getMessageWithUserName(request, message) {
		return '@' + request.user_name + ': ' + message;
	}

	function getCodeStart(code) {
		return Math.floor(code / 100);
	}

	function getCodesJSON(code) {
		return require(__dirname + '/codes/' + getCodeStart(code) + '.json').codes[code];
	}

	function isValidCode(code) {
		var start = code ? getCodeStart(code) : null;

		return start >= 1 && start <= 5;
	}

	robot.hear(/http code (\d+)/i, function (msg) {
		var message, code;

		code = msg.match[1];

		if (isValidCode(code)) {
			codeObj = getCodesJSON(code);
			if (codeObj) {
				message = getCodeMessage(codeObj);
			} else {
				message = getNoCodeMessage(code);
			}
		} else {
			message = getNoCodeMessage(code);
		}

		return msg.send(message);
	});
};
