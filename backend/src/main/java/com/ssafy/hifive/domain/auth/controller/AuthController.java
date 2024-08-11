package com.ssafy.hifive.domain.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.auth.dto.TokenResponseDto;
import com.ssafy.hifive.domain.auth.service.TokenService;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.util.CookieUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "auth", description = "인증 관련 API")
@Slf4j
public class AuthController {

	private final TokenService tokenService;

	@Operation(summary = "OAuth2 콜백", description = "카카오 OAuth2 로그인 후 콜백을 처리한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\": \"Unauthorized\"}")))
	@PostMapping("/callback")
	public ResponseEntity<TokenResponseDto> authCallback(@AuthenticationPrincipal Member member,
		HttpServletResponse response) {
		return ResponseEntity.ok(tokenService.createTokenResponse(member, response));
	}

	@Operation(summary = "토큰 갱신", description = "리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급한다.")
	@ApiResponse(responseCode = "401", description = "리프레시 토큰이 유효하지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\": \"Unauthorized\"}")))
	@PostMapping("/refresh")
	public ResponseEntity<TokenResponseDto> refresh(HttpServletRequest request,
		HttpServletResponse response) {

		String refreshToken = CookieUtil.getCookie(request, "refresh_token")
			.map(Cookie::getValue)
			.orElse(null);

		return ResponseEntity.ok(tokenService.refreshAccessToken(refreshToken, response));
	}

}
