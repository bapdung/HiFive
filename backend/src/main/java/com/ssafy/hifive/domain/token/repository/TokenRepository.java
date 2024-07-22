package com.ssafy.hifive.domain.token.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.token.entity.Token;

public interface TokenRepository extends JpaRepository<Token, Long> {

	Optional<Token> findByRefreshToken(String refreshToken);

	Optional<Token> findByMemberId(Member memberId);
}
