package com.ssafy.hifive.global.config.oauth;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.service.MemberService;
import com.ssafy.hifive.domain.token.entity.Token;
import com.ssafy.hifive.domain.token.repository.TokenRepository;
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
	public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(10);
	public static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(1);
	public static final String REDIRECT_PATH = "/main";

	private final TokenProvider tokenProvider;
	private final TokenRepository tokenRepository;
	private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
	private final MemberService memberService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
		Member member = memberService.findByEmail(getKakaoEmail(oauth2User.getAttributes()));

		String refreshToken = tokenProvider.generateToken(member, REFRESH_TOKEN_DURATION);
		saveRefreshToken(member, refreshToken);
		addRefreshToken(request, response, refreshToken);

		String accessToken = tokenProvider.generateToken(member, ACCESS_TOKEN_DURATION);
		addAccessToken(response, accessToken);

		clearAuthenticationAttributes(request, response);

		getRedirectStrategy().sendRedirect(request, response, REDIRECT_PATH);

	}

	private void addAccessToken(HttpServletResponse response, String accessToken) {
		int cookieMaxAge = (int)ACCESS_TOKEN_DURATION.toSeconds();

		CookieUtil.addCookie(response, ACCESS_TOKEN_COOKIE_NAME, accessToken, cookieMaxAge, true, false);
	}

	private void addRefreshToken(HttpServletRequest request, HttpServletResponse response, String refreshToken) {
		int cookieMaxAge = (int)REFRESH_TOKEN_DURATION.toSeconds();

		CookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
		CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge, true, false);
	}

	private void saveRefreshToken(Member memberId, String newRefreshToken) {
		Token refreshToken = tokenRepository.findByMemberId(memberId)
			.map(entity -> entity.update(newRefreshToken))
			.orElse(new Token(memberId, newRefreshToken));

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

}
