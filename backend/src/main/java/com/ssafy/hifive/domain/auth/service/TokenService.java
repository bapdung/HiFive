package com.ssafy.hifive.domain.auth.service;

import java.time.Duration;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.auth.dto.TokenResponseDto;
import com.ssafy.hifive.domain.auth.entity.Token;
import com.ssafy.hifive.domain.auth.repository.TokenRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.global.config.jwt.TokenProvider;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;
import com.ssafy.hifive.global.util.CookieUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TokenService {

	private static final Duration ACCESS_TOKEN_DURATION = Duration.ofHours(1);
	private static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(7);
	private static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

	private final TokenProvider tokenProvider;
	private final TokenRepository tokenRepository;

	public TokenResponseDto createTokenResponse(Member member, HttpServletResponse response) {

		if (member == null) {
			throw new ForbiddenException(ErrorCode.MEMBER_NOT_FOUND);
		}

		String accessToken = tokenProvider.generateToken(member, ACCESS_TOKEN_DURATION);
		String refreshToken = tokenProvider.generateToken(member, REFRESH_TOKEN_DURATION);

		tokenRepository.save(new Token(member, refreshToken));

		addRefreshTokenCookie(response, refreshToken);

		return new TokenResponseDto(accessToken);
	}

	public TokenResponseDto refreshAccessToken(String refreshToken, HttpServletResponse response) {

		if (refreshToken == null) {
			throw new ForbiddenException(ErrorCode.REFRESH_TOKEN_NOT_FOUND);
		}

		Token token = tokenRepository.findByRefreshToken(refreshToken)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.REFRESH_TOKEN_NOT_FOUND));

		if (!tokenProvider.validToken(refreshToken)) {
			tokenRepository.delete(token);
			throw new ForbiddenException(ErrorCode.INVALID_REFRESH_TOKEN);
		}

		Member member = token.getMember();
		String newAccessToken = tokenProvider.generateToken(member, ACCESS_TOKEN_DURATION);

		addRefreshTokenCookie(response, refreshToken);

		return new TokenResponseDto(newAccessToken);
	}

	private void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
		CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken,
			(int)REFRESH_TOKEN_DURATION.toSeconds(), true, false);
	}
}
