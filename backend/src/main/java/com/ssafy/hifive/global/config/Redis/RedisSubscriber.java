package com.ssafy.hifive.global.config.Redis;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.global.config.websocket.ReservationWebSocketHandler;
import com.ssafy.hifive.global.config.websocket.WebSocketMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisSubscriber {

	private final ReservationWebSocketHandler webSocketHandler;
	private final ObjectMapper objectMapper;

	public void onMessage(String message, String channel) {
		try {
			System.out.println("Received channel: " + channel + " with message: " + message);
			WebSocketMessage webSocketMessage = objectMapper.readValue(message, WebSocketMessage.class);
			Long fanmeetingId = Long.parseLong(channel.split(":")[1]);
			webSocketHandler.broadcastMessageToFanmeeting(fanmeetingId, webSocketMessage);
		} catch (Exception e) {
			log.error("Failed to process message", e);
		}
	}
}
