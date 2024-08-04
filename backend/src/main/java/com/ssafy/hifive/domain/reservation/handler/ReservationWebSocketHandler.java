package com.ssafy.hifive.domain.reservation.handler;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.global.config.websocket.WebSocketMessage;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReservationWebSocketHandler extends TextWebSocketHandler {
	private final ConcurrentMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private final ConcurrentMap<Long, String> memberSessionMap = new ConcurrentHashMap<>();
	private final ObjectMapper jacksonObjectMapper;

	@Override
	public void afterConnectionEstablished(final WebSocketSession session) throws Exception {
		String sessionId = session.getId();
		Long memberId = (Long)session.getAttributes().get("memberId"); //민서오빠가 꼭 해줘야할 부분

		sessions.put(sessionId, session);
		memberSessionMap.put(memberId, sessionId);

		log.info("웹소켓 커넥션 실행 sessionId : " + sessionId);
		log.info("웹소켓 사용자 정보 memberId : " + memberId);

		sendMessageToSession(memberId, "결제창으로 이동합니다.");
	}

	@Override
	public void afterConnectionClosed(final WebSocketSession session, final CloseStatus status) throws Exception {
		String sessionId = session.getId();
		sessions.remove(sessionId);
		memberSessionMap.remove((Long)session.getAttributes().get("memberId"));
		log.info("웹소켓 커넥션 종료 sessionId" + sessionId);
	}

	@Override
	protected void handleTextMessage(final WebSocketSession session, final TextMessage message) throws Exception {
		String payload = message.getPayload();
	}

	public void sendMessageToSession(Long memberId, String message) throws Exception {
		String sessionId = memberSessionMap.get(memberId);
		WebSocketSession session = sessions.get(sessionId);
		if (session != null && session.isOpen()) {
			log.info(message);
			try {
				String jsonMessage = jacksonObjectMapper.writeValueAsString(
					new WebSocketMessage(message, "moveToPayment"));
				session.sendMessage(new TextMessage(jsonMessage));
			} catch (Exception e) {
				throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
			}
		} else {
			throw new BadRequestException(ErrorCode.WEBSOCKET_CONNECTION_ERROR);
		}
	}
}
