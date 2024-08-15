package com.ssafy.hifive.global.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.hifive.global.error.response.AcceptedResponse;
import com.ssafy.hifive.global.error.response.ErrorResponse;
import com.ssafy.hifive.global.error.type.AcceptedException;
import com.ssafy.hifive.global.error.type.BadRequestException;
import com.ssafy.hifive.global.error.type.BusinessException;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;
import com.ssafy.hifive.global.error.type.UserNotFoundException;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	private ResponseEntity<ErrorResponse> createErrorResponse(ErrorCode errorCode) {
		return new ResponseEntity<>(ErrorResponse.of(errorCode.getCode(), errorCode.getMessage()),
			errorCode.getHttpStatus());
	}

	private ResponseEntity<AcceptedResponse> createAcceptedResponse(AcceptedCode acceptedCode) {
		return new ResponseEntity<>(AcceptedResponse.of(acceptedCode.getCode(), acceptedCode.getMessage()),
			acceptedCode.getHttpStatus());
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException e) {
		log.error("Error: ", e);
		return new ResponseEntity<>(ErrorResponse.of(HttpStatus.UNAUTHORIZED.toString(), e.getMessage()),
			HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(ForbiddenException.class)
	public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
		log.error("ForbiddenException: ", e);
		return createErrorResponse(e.getErrorCode());
	}

	@ExceptionHandler(DataNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleDataNotFoundException(DataNotFoundException e) {
		log.error("DataNotFoundException: ", e);
		return createErrorResponse(e.getErrorCode());
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException e) {
		log.error("Error: ", e);
		return createErrorResponse(e.getErrorCode());
	}

	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
		log.error("Error: ", e);
		return createErrorResponse(e.getErrorCode());
	}

	@ExceptionHandler(AcceptedException.class)
	public ResponseEntity<AcceptedResponse> handleAcceptedException(AcceptedException e) {
		log.error("AcceptedException: ", e);
		return createAcceptedResponse(e.getAcceptedCode());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleException(Exception e) {
		log.error("Error: ", e);
		return createErrorResponse(ErrorCode.SYSTEM_ERROR);
	}
}
