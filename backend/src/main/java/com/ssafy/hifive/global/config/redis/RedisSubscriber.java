package com.ssafy.hifive.global.config.redis;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.global.config.websocket.ReservationWebSocketHandler;
import com.ssafy.hifive.global.config.websocket.WebSocketMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

	private final ReservationWebSocketHandler webSocketHandler;
	private final ObjectMapper objectMapper;

	@Override
	public void onMessage(Message message, byte[] pattern) {
		try {
			String channel = new String(message.getChannel(), "UTF-8");
			String body = new String(message.getBody(), "UTF-8");
			// System.out.println("Received channel: " + channel + " with message: " + body);

			if (channel.startsWith("fanmeeting:")) {
				String[] parts = channel.split(":");
				if (parts.length == 2) {
					Long fanmeetingId = Long.parseLong(parts[1]);
					WebSocketMessage webSocketMessage = objectMapper.readValue(body, WebSocketMessage.class);
					webSocketHandler.broadcastMessageToFanmeeting(fanmeetingId, webSocketMessage);
				} else {
					log.error("Unexpected channel format: " + channel);
				}
			} else {
				log.error("Unexpected channel: " + channel);
			}
		} catch (Exception e) {
			log.error("Failed to process message", e);
		}
	}
}
