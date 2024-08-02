package com.ssafy.hifive.global.util;

import java.util.Base64;
import java.util.Optional;

import org.springframework.util.SerializationUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CookieUtil {

	public static void addCookie(HttpServletResponse response, String name, String value, int maxAge, boolean httpOnly,
		boolean secure) {
		Cookie cookie = new Cookie(name, value);
		cookie.setHttpOnly(httpOnly);
		cookie.setPath("/");
		cookie.setMaxAge(maxAge);
		cookie.setSecure(secure);
		cookie.setAttribute("SameSite", "None");
		response.addCookie(cookie);

		String sameSite = "None";
		StringBuilder headerValue = new StringBuilder()
			.append(
				String.format("%s=%s; Max-Age=%d; Path=%s; ", cookie.getName(), cookie.getValue(), cookie.getMaxAge(),
					cookie.getPath()));

		if (secure) {
			headerValue.append("Secure; ");
		}

		if (httpOnly) {
			headerValue.append("HttpOnly; ");
		}

		headerValue.append("SameSite=").append(sameSite);

		response.addHeader("Set-Cookie", headerValue.toString());

		log.info("Set-Cookie header: " + headerValue.toString());
	}

	public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
		Cookie[] cookies = request.getCookies();

		if (cookies == null) {
			return;
		}

		for (Cookie cookie : cookies) {
			if (name.equals(cookie.getName())) {
				cookie.setValue("");
				cookie.setPath("/");
				cookie.setMaxAge(0);
				response.addCookie(cookie);
			}
		}
	}

	public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(name)) {
					return Optional.of(cookie);
				}
			}
		}
		return Optional.empty();
	}

	public static String serialize(Object obj) {
		return Base64.getUrlEncoder()
			.encodeToString(SerializationUtils.serialize(obj));
	}

	public static <T> T deserialize(Cookie cookie, Class<T> cls) {
		return cls.cast(
			SerializationUtils.deserialize(
				Base64.getUrlDecoder().decode(cookie.getValue())
			)
		);
	}
}