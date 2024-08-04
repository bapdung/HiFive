package com.ssafy.hifive.global.config.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WebSocketMessage {
	private String message;
	private String event;
}
