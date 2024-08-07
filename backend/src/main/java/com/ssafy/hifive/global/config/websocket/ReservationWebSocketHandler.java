package com.ssafy.hifive.global.config.websocket;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReservationWebSocketHandler extends TextWebSocketHandler {
	private final ConcurrentMap<Long, ConcurrentMap<String, WebSocketSession>> sessions = new ConcurrentHashMap<>();
	private final ConcurrentMap<Long, ConcurrentMap<Long, String>> memberSessionMap = new ConcurrentHashMap<>();
	private final ObjectMapper jacksonObjectMapper;

	@Override
	public void afterConnectionEstablished(final WebSocketSession session) throws Exception {
		Long fanmeetingId = Long.parseLong(session.getUri().getPath().split("/")[3]);
		String sessionId = session.getId();
		Long memberId = (Long)session.getAttributes().get("memberId");

		sessions.putIfAbsent(fanmeetingId, new ConcurrentHashMap<>());
		memberSessionMap.putIfAbsent(fanmeetingId, new ConcurrentHashMap<>());

		sessions.get(fanmeetingId).put(sessionId, session);
		memberSessionMap.get(fanmeetingId).put(memberId, sessionId);

	}

	@Override
	public void afterConnectionClosed(final WebSocketSession session, final CloseStatus status) throws Exception {
		Long fanmeetingId = Long.parseLong(session.getUri().getPath().split("/")[3]);
		String sessionId = session.getId();
		Long memberId = (Long)session.getAttributes().get("memberId");

		if (sessions.containsKey(fanmeetingId)) {
			sessions.get(fanmeetingId).remove(sessionId);
			memberSessionMap.get(fanmeetingId).remove(memberId);
		}

	}

	public void sendMessageToSession(Long fanmeetingId, Long memberId, String message, String event) {
		String sessionId = memberSessionMap.get(fanmeetingId).get(memberId);
		WebSocketSession session = sessions.get(fanmeetingId).get(sessionId);
		if (session != null && session.isOpen()) {
			try {
				String jsonMessage = jacksonObjectMapper.writeValueAsString(
					new WebSocketMessage(message, event));
				session.sendMessage(new TextMessage(jsonMessage));
			} catch (Exception e) {
				throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
			}
		} else {
			throw new BadRequestException(ErrorCode.WEBSOCKET_CONNECTION_ERROR);
		}
	}

	public void broadcastMessageToFanmeeting(Long fanmeetingId, WebSocketMessage webSocketMessage) throws Exception {
		ConcurrentMap<String, WebSocketSession> fanmeetingSessions = sessions.get(fanmeetingId);

		if (fanmeetingSessions != null) {
			String jsonMessage = jacksonObjectMapper.writeValueAsString(webSocketMessage);
			TextMessage textMessage = new TextMessage(jsonMessage);
			for (WebSocketSession session : fanmeetingSessions.values()) {
				if (session.isOpen()) {
					session.sendMessage(textMessage);
				}
			}
		}
	}
}
