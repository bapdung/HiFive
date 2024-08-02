package com.ssafy.hifive.global.config.oauth;

import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.web.util.WebUtils;

import com.ssafy.hifive.global.util.CookieUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class OAuth2AuthorizationRequestBasedOnCookieRepository implements AuthorizationRequestRepository {

	public final static String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";

	private final static int COOKIE_EXPIRE_SECONDS = 1800;

	@Override
	public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request,
		HttpServletResponse response) {
		return this.loadAuthorizationRequest(request);
	}

	@Override
	public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
		log.info(request.toString());
		Cookie cookie = WebUtils.getCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);

		log.info(cookie.toString());
		log.info("Authorization request cookie value: " + cookie.getValue());
		return CookieUtil.deserialize(cookie, OAuth2AuthorizationRequest.class);
	}

	@Override
	public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request,
		HttpServletResponse response) {

		if (authorizationRequest == null) {
			removeAuthorizationRequestCookies(request, response);
			return;
		}

		CookieUtil.addCookie(response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME,
			CookieUtil.serialize(authorizationRequest), COOKIE_EXPIRE_SECONDS, true, true);
	}

	public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
		CookieUtil.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
	}
}
