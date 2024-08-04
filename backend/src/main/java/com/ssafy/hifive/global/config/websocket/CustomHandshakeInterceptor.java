package com.ssafy.hifive.global.config.websocket;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.ssafy.hifive.domain.reservation.service.ReservationQueueService;
import com.ssafy.hifive.domain.reservation.service.ReservationValidService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class CustomHandshakeInterceptor implements HandshakeInterceptor {
	private final ReservationQueueService reservationQueueService;
	private final ReservationValidService reservationValidService


	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
		Map<String, Object> attributes) throws Exception {
		HttpServletRequest servletRequest = ((ServletServerHttpRequest)request).getServletRequest();
		String memberId = servletRequest.getParameter("memberId");

		log.info("memberId: {}", memberId);
		if (memberId != null) {
			attributes.put("memberId", Long.valueOf(memberId));
		}
		return true;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
		Exception exception) {
	}
}