package com.ssafy.hifive.domain.token.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.token.entity.Token;
import com.ssafy.hifive.domain.token.repository.TokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

	private final TokenRepository tokenRepository;

	public Token findByRefreshToken(String refreshToken) {
		return tokenRepository.findByRefreshToken(refreshToken).orElseThrow(() ->
			new IllegalArgumentException("Unable to find refresh token "));
	}
}
