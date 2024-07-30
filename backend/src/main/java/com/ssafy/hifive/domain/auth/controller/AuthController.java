package com.ssafy.hifive.domain.auth.controller;

import java.time.Duration;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.service.MemberService;
import com.ssafy.hifive.domain.token.dto.response.TokenResponseDto;
import com.ssafy.hifive.domain.token.repository.TokenRepository;
import com.ssafy.hifive.domain.token.service.TokenService;
import com.ssafy.hifive.global.config.jwt.TokenProvider;
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

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "auth", description = "인증 관련 API")
public class AuthController {

	private final TokenProvider tokenProvider;
	private final TokenService tokenService;
	private final TokenRepository tokenRepository;
	private final MemberService memberService;

	@Operation(summary = "OAuth2 콜백", description = "카카오 OAuth2 로그인 후 콜백을 처리한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\": \"Unauthorized\"}")))
	@PostMapping("/callback")
	public ResponseEntity<TokenResponseDto> authCallback(@AuthenticationPrincipal OAuth2User oAuth2User,
		HttpServletResponse response) {
		String email = getKakaoEmail(oAuth2User.getAttributes());
		Member member = memberService.findByEmail(email);

		if (member == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

		ResponseEntity<TokenResponseDto> tokenResponse = tokenService.createTokenResponse(member);
		if (tokenResponse.getStatusCode() == HttpStatus.OK) {
			CookieUtil.addCookie(response, "refresh_token", tokenResponse.getBody().getRefreshToken(),
				(int)Duration.ofDays(7).toSeconds(), true, true);
		}
		return tokenResponse;
	}

	@Operation(summary = "토큰 갱신", description = "리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급한다.")
	@ApiResponse(responseCode = "401", description = "리프레시 토큰이 유효하지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\": \"Unauthorized\"}")))
	@PostMapping("/refresh")
	public ResponseEntity<TokenResponseDto> refresh(HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = CookieUtil.getCookie(request, "refresh_token")
			.map(Cookie::getValue)
			.orElse(null);

		if (refreshToken == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

		ResponseEntity<TokenResponseDto> tokenResponse = tokenService.refreshAccessToken(refreshToken);
		if (tokenResponse.getStatusCode() == HttpStatus.OK) {
			CookieUtil.addCookie(response, "refresh_token", refreshToken, (int)Duration.ofDays(7).toSeconds(), true,
				true);
		}
		return tokenResponse;
	}

	private String getKakaoEmail(Map<String, Object> attributes) {
		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
		return (String)kakaoAccount.get("email");
	}
}
