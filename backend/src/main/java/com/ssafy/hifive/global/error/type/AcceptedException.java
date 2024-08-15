package com.ssafy.hifive.global.error.type;

import com.ssafy.hifive.global.error.AcceptedCode;

public class AcceptedException extends BusinessException {

	public AcceptedException(AcceptedCode acceptedCode) {
		super(acceptedCode);
	}

	public AcceptedException(AcceptedCode acceptedCode, String message) {
		super(acceptedCode, message);
	}

	public AcceptedException(AcceptedCode acceptedCode, String message, Throwable cause) {
		super(acceptedCode, message, cause);
	}
}
