package com.ssafy.hifive.global.config.websocket;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.domain.reservation.service.ReservationQueueService;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReservationWebSocketHandler extends TextWebSocketHandler {
	private final ConcurrentMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private final ReservationQueueService reservationQueueService;
	private final ObjectMapper objcetMapper;

	@Override
	public void afterConnectionEstablished(final WebSocketSession session) throws Exception {
		String sessionId = session.getId();
		sessions.put(sessionId, session);

		log.info("웹소켓 커넥션 실행 sessionId" + sessionId);
	}

	@Override
	public void afterConnectionClosed(final WebSocketSession session, final CloseStatus status) throws Exception {
		String sessionId = session.getId();
		sessions.remove(sessionId);
		log.info("웹소켓 커넥션 종료 sessionId" + sessionId);
	}

	@Override
	protected void handleTextMessage(final WebSocketSession session, final TextMessage message) throws Exception {
		//대기열 및 결제열 관리
		String payload = message.getPayload();
		log.info("웹소켓 메시지 전송 " + session.getId());

		try{
			JsonNode jsonNode = objcetMapper.readTree(payload);
			String action = jsonNode.get("action").asText();
			long memberId = jsonNode.get("memberId").asLong();
			long fanmeetingId = jsonNode.get("fanmeetingId").asLong();

			String waitingQueueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
			String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
			switch (action) {
				case "addToWaitingQueue":
					reservationQueueService.addToWaitingQueue(waitingQueueKey, memberId);
					session.sendMessage(new TextMessage("현재 대기 인원은" + waitingQueueKey));
					break;
				case "moveToPayingQueue":
					Long queueSize = reservationQueueService.getQueueSize(payingQueueKey);
					if (queueSize != null && queueSize < 100) {
						reservationQueueService.moveFromWaitingToPayingQueue(waitingQueueKey, payingQueueKey, 1);
						WebSocketSession memberSession = sessions.get(String.valueOf(memberId));
						if (memberSession != null && memberSession.isOpen()) {
							memberSession.sendMessage(new TextMessage("Move to paying page"));
						}
					} else {
						session.sendMessage(new TextMessage("Paying queue is full 잠시만 기다려주세요"));
					}
					break;
				default:
					session.sendMessage(new TextMessage("Invalid action"));
			}
		} catch (Exception e) {
			throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
		}

	}

	// public void waitingProcess(Long memberId, Long fanmeetingId, String messageStr){
	// 	WebSocketSession session = sessions.get(String.valueOf(memberId));
	// 	TextMessage message = new TextMessage(messageStr);
	//
	// 	if (session != null && session.isOpen()) {
	// 		try {
	// 			String payload = message.getPayload();
	// 			log.info("웹소켓 메시지 전송 " + session.getId());
	//
	// 			try{
	// 				String waitingQueueKey = "fanmeeting:" + fanmeetingId + ":waiting-queue";
	// 				String payingQueueKey = "fanmeeting:" + fanmeetingId + ":paying-queue";
	// 				switch (messageStr) {
	// 					case "addToWaitingQueue":
	// 						reservationQueueService.addToWaitingQueue(waitingQueueKey, memberId);
	// 						session.sendMessage(new TextMessage("현재 대기 인원은" + waitingQueueKey));
	// 						break;
	// 					case "moveToPayingQueue":
	// 						Long queueSize = reservationQueueService.getQueueSize(payingQueueKey);
	// 						if (queueSize != null && queueSize < 100) {
	// 							reservationQueueService.moveFromWaitingToPayingQueue(waitingQueueKey, payingQueueKey, 1);
	// 							WebSocketSession memberSession = sessions.get(String.valueOf(memberId));
	// 							if (memberSession != null && memberSession.isOpen()) {
	// 								memberSession.sendMessage(new TextMessage("Move to paying page"));
	// 							}
	// 						} else {
	// 							session.sendMessage(new TextMessage("Paying queue is full 잠시만 기다려주세요"));
	// 						}
	// 						break;
	// 					default:
	// 						session.sendMessage(new TextMessage("Invalid action"));
	// 				}
	// 			} catch (Exception e) {
	// 				throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
	// 			}
	// 		} catch (Exception e) {
	// 			throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
	// 		}
	// 	}
	// }

	public void sendMessageToSession(Long memberId, String message) throws Exception {
		WebSocketSession session = sessions.get(String.valueOf(memberId));
		if (session != null && session.isOpen()) {
			try {
				session.sendMessage(new TextMessage(message));
			} catch (Exception e) {
				throw new BadRequestException(ErrorCode.WEBSOCKET_MESSAGE_SEND_ERROR);
			}
		} else {
			throw new BadRequestException(ErrorCode.WEBSOCKET_CONNECTION_ERROR);
		}
	}
}
