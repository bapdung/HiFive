package com.ssafy.hifive.domain.openvidu.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class OpenviduController {
	@Value("${openvidu.url}")
	private String openviduUrl;

	@Value("${openvidu.secret}")
	private String openviduSecret;

	private OpenVidu openVidu;

	@PostConstruct
	public void init() {
		this.openVidu = new OpenVidu(openviduUrl, openviduSecret);
	}

	@PostMapping("/sessions")
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		SessionProperties properties = SessionProperties.fromJson(params).build();
		log.info("0000000000000000000");
		Session session = openVidu.createSession(properties);
		log.info(session.getSessionId());
		log.info("0000000000000000000");

		return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
	}

	@PostMapping("/sessions/{sessionId}/connections")
	public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = openVidu.getActiveSession(sessionId);
		if (session == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
		Connection connection = session.createConnection(properties);
		return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
	}
}
