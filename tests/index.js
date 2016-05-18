/*global it, describe*/

var chai, expect, sinon;

chai = require('chai');

sinon = require('sinon');

chai.use(require('sinon-chai'));

expect = chai.expect;

function createRobot(messageMock) {
	return {
		respond: sinon.stub().callsArgWith(1, messageMock),
		hear: sinon.spy()
	};
}

function createMessage(code) {
	return {
		match: [null, code],
		send: function () {}
	};
}

describe('HTTP Code hubot command', function() {
	var httpCode;

	httpCode = require('../src/http-code');

	it('responds to status code', function() {
		var message, robot, code;

		code = 400;
		message = createMessage(code);
		robot = createRobot(message);

		httpCode(robot);

		expect(robot.respond).to.have.been.calledWith(/http code (\d+)/i);
	});

	it('responds No such code if the code is invalid', function () {
		var messageMockObject, message, robot, code;

		code = 601;
		message = createMessage(code);
		messageMockObject = sinon.mock(message);
		robot = createRobot(message);

		messageMockObject.expects('send').once().withArgs('No such code: 601');

		httpCode(robot);

		messageMockObject.verify();

		messageMockObject.restore();
	});

	it('responds code description if its valid', function () {
		var messageMockObject, message, robot, code, code404;

		code = 404;
		message = createMessage(code);
		messageMockObject = sinon.mock(message);
		robot = createRobot(message);

		code404 = require('../codes/4.json').codes['404'];
		messageMockObject.expects('send').once().withArgs('404 is ' + code404.title + ', ' + code404.summary + ' ' + code404.descriptions.wikipedia.link);

		httpCode(robot);

		messageMockObject.verify();

		messageMockObject.restore();
	});
});
