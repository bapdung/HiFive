package com.ssafy.hifive.global.config.websocket;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class TicketWebSocketHandler extends TextWebSocketHandler {
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String payload = message.getPayload();
		// 메시지 처리 로직
		session.sendMessage(new TextMessage("Echo: " + payload));
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// 연결이 수립되었을 때 로직
		System.out.println("WebSocket connection established");
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		// 연결이 종료되었을 때 로직
		System.out.println("WebSocket connection closed");
	}
}
