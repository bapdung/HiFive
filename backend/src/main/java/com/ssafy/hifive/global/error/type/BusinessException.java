package com.ssafy.hifive.global.error.type;

import com.ssafy.hifive.global.error.AcceptedCode;
import com.ssafy.hifive.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
	private final ErrorCode errorCode;
	private final AcceptedCode acceptedCode;
	private final String code;
	private final String message;

	public BusinessException(ErrorCode errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
		this.acceptedCode = null;
		this.code = errorCode.getCode();
		this.message = errorCode.getMessage();
	}

	public BusinessException(ErrorCode errorCode, String message) {
		super(message);
		this.errorCode = errorCode;
		this.acceptedCode = null;
		this.code = errorCode.getCode();
		this.message = message;
	}

	public BusinessException(ErrorCode errorCode, String message, Throwable cause) {
		super(message);
		this.errorCode = errorCode;
		this.acceptedCode = null;
		this.code = errorCode.getCode();
		this.message = message;
		this.initCause(cause);
	}

	public BusinessException(AcceptedCode acceptedCode) {
		super(acceptedCode.getMessage());
		this.errorCode = null;
		this.acceptedCode = acceptedCode;
		this.code = acceptedCode.getCode();
		this.message = acceptedCode.getMessage();
	}

	public BusinessException(AcceptedCode acceptedCode, String message) {
		super(message);
		this.errorCode = null;
		this.acceptedCode = acceptedCode;
		this.code = acceptedCode.getCode();
		this.message = message;
	}

	public BusinessException(AcceptedCode acceptedCode, String message, Throwable cause) {
		super(message);
		this.errorCode = null;
		this.acceptedCode = acceptedCode;
		this.code = acceptedCode.getCode();
		this.message = message;
		this.initCause(cause);
	}
}
