package com.ssafy.hifive.global.config.oauth;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.domain.auth.entity.Token;
import com.ssafy.hifive.domain.auth.repository.TokenRepository;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.service.MemberService;
import com.ssafy.hifive.global.config.jwt.TokenProvider;
import com.ssafy.hifive.global.util.CookieUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
	public static final String ACCESS_TOKEN_COOKIE_NAME = "access_token";
	public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);
	public static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(2);
	public static final String REDIRECT_PATH = "/";

	private final TokenProvider tokenProvider;
	private final TokenRepository tokenRepository;
	private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
	private final MemberService memberService;
	private final ObjectMapper objectMapper;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
		Member member = memberService.findByEmail(getKakaoEmail(oauth2User.getAttributes()));

		String refreshToken = tokenProvider.generateToken(member, REFRESH_TOKEN_DURATION);
		saveRefreshToken(member, refreshToken);
		addRefreshToken(request, response, refreshToken);

		String accessToken = tokenProvider.generateToken(member, ACCESS_TOKEN_DURATION);

		clearAuthenticationAttributes(request, response);

		getRedirectStrategy().sendRedirect(request, response, REDIRECT_PATH);

	}

	private void addRefreshToken(HttpServletRequest request, HttpServletResponse response, String refreshToken) {
		int cookieMaxAge = (int)REFRESH_TOKEN_DURATION.toSeconds();

		CookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
		CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge, true, false);
	}

	private void saveRefreshToken(Member member, String newRefreshToken) {
		Token refreshToken = tokenRepository.findByMemberId(member.getMemberId())
			.map(entity -> entity.update(newRefreshToken))
			.orElse(new Token(member, newRefreshToken));

		tokenRepository.save(refreshToken);
	}

	private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
		super.clearAuthenticationAttributes(request);
		authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
	}

	private String getKakaoEmail(Map<String, Object> attributes) {
		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
		return (String)kakaoAccount.get("email");
	}

	private void sendJsonResponse(HttpServletResponse response, String accessToken) throws IOException {
		Map<String, Object> responseBody = Map.of(
			"accessToken", accessToken
		);

		response.setContentType("application/json;charset=UTF-8");
		response.setStatus(HttpServletResponse.SC_OK);
		objectMapper.writeValue(response.getWriter(), responseBody);
	}

}
