/*jshint node: true*/ 
// Description:
//   Displays the description for the requested error code.
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot http code <code>
//
// Author:
//   Ajnasz

function getCodeMessage(codeObj) {
	'use strict';
	return codeObj.code + ' is ' + codeObj.title + ', ' + codeObj.summary + ' ' + codeObj.descriptions.wikipedia.link;
}

function getNoCodeMessage(code) {
	'use strict';
	if (code) {
		return 'No such code: ' + code;
	}

	return 'No such code';
}

function getCodeStart(code) {
	'use strict';
	return Math.floor(code / 100);
}

function getCodesJSON(code) {
	'use strict';
	return require(__dirname + '/codes/' + getCodeStart(code) + '.json').codes[code];
}

function isValidCode(code) {
	'use strict';
	var start = code ? getCodeStart(code) : null;

	return start >= 1 && start <= 5;
}

module.exports = function (robot/*, scripts*/) {
	'use strict';
	robot.respond(/http code (\d+)/i, function (msg) {
		var message, code, codeObj;

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
