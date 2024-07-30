package com.ssafy.hifive.domain.token.service;

import java.time.Duration;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.service.MemberService;
import com.ssafy.hifive.domain.token.dto.response.TokenResponseDto;
import com.ssafy.hifive.domain.token.entity.Token;
import com.ssafy.hifive.domain.token.repository.TokenRepository;
import com.ssafy.hifive.global.config.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TokenService {

	private final TokenProvider tokenProvider;
	private final RefreshTokenService refreshTokenService;
	private final MemberService memberService;
	private final TokenRepository tokenRepository;

	public ResponseEntity<TokenResponseDto> createTokenResponse(Member member) {
		String accessToken = tokenProvider.generateToken(member, Duration.ofHours(1));
		String refreshToken = tokenProvider.generateToken(member, Duration.ofDays(7));

		tokenRepository.save(new Token(member, refreshToken));

		TokenResponseDto responseDto = new TokenResponseDto(accessToken, refreshToken);
		return ResponseEntity.ok(responseDto);
	}

	public ResponseEntity<TokenResponseDto> refreshAccessToken(String refreshToken) {

		if (!tokenProvider.validToken(refreshToken)) {
			return ResponseEntity.status(401).body(null);
		}

		Token token = tokenRepository.findByRefreshToken(refreshToken)
			.orElseThrow(() -> new IllegalArgumentException("Refresh token not found"));

		Member member = token.getMember();
		String newAccessToken = tokenProvider.generateToken(member, Duration.ofHours(1));

		TokenResponseDto responseDto = new TokenResponseDto(newAccessToken, refreshToken);
		return ResponseEntity.ok(responseDto);
	}
}
