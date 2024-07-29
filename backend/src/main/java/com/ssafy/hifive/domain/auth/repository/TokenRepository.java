package com.ssafy.hifive.domain.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hifive.domain.auth.entity.Token;

public interface TokenRepository extends JpaRepository<Token, Long> {

	Optional<Token> findByRefreshToken(String refreshToken);

	Optional<Token> findByMemberMemberId(Long memberId);
}
