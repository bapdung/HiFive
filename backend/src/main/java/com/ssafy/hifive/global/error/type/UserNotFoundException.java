package com.ssafy.hifive.global.error.type;

import com.ssafy.hifive.global.error.ErrorCode;

public class UserNotFoundException extends BusinessException {
	public UserNotFoundException(ErrorCode errorCode) {
		super(errorCode);
	}

	public UserNotFoundException(ErrorCode errorCode, String message) {
		super(errorCode, message);
	}

	public UserNotFoundException(ErrorCode errorCode, String message, Throwable cause) {
		super(errorCode, message, cause);
	}
}
