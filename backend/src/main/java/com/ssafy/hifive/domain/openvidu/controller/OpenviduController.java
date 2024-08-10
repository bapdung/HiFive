package com.ssafy.hifive.domain.openvidu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.openvidu.dto.request.OpenViduCustomSessionDto;
import com.ssafy.hifive.domain.openvidu.dto.request.OpenViduSequenceDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuestionDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuizResponseDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduStoryDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduTimetableDto;
import com.ssafy.hifive.domain.openvidu.service.OpenViduQuestionService;
import com.ssafy.hifive.domain.openvidu.service.OpenViduQuizService;
import com.ssafy.hifive.domain.openvidu.service.OpenViduService;
import com.ssafy.hifive.domain.openvidu.service.OpenViduSessionService;
import com.ssafy.hifive.domain.openvidu.service.OpenViduStoryService;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sessions")
public class OpenviduController {
	private final OpenViduQuestionService openViduQuestionService;
	@Value("${openvidu.url}")
	private String openviduUrl;

	@Value("${openvidu.secret}")
	private String openviduSecret;

	private OpenVidu openVidu;

	private final OpenViduService openViduService;
	private final OpenViduStoryService openViduStoryService;
	private final OpenViduQuizService openViduQuizService;
	private final OpenViduSessionService openViduSessionService;

	@PostConstruct
	public void init() {
		this.openVidu = new OpenVidu(openviduUrl, openviduSecret);
	}

	@PostMapping(path = "/open", produces = "application/json")
	public ResponseEntity<OpenViduTimetableDto> initializeSession(
		@RequestBody OpenViduCustomSessionDto openViduCustomSessionDto)
		throws OpenViduJavaClientException, OpenViduHttpException {
		SessionProperties properties = new SessionProperties.Builder().customSessionId(
			openViduCustomSessionDto.getCustomSessionId()).build();
		Session session = openVidu.createSession(properties);
		//customSessionId는 fanmeetingId고, sessionId는 생성 시 부여 받는 토큰 값)
		openViduSessionService.saveSession(Long.valueOf(openViduCustomSessionDto.getCustomSessionId()),
			session.getSessionId());
		return new ResponseEntity<>(
			openViduService.getTimetableAll(Long.valueOf(openViduCustomSessionDto.getCustomSessionId()),
				session.getSessionId()),
			HttpStatus.CREATED);
	}

	@PostMapping("/{sessionId}/connections")
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

	@PostMapping("/{fanmeetingId}")
	public ResponseEntity<Void> saveCurrentSequence(@PathVariable Long fanmeetingId,
		@RequestBody OpenViduSequenceDto openViduSequenceDto) {
		openViduSessionService.saveSequence(fanmeetingId, openViduSequenceDto.getSequence());
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{sessionId}")
	public ResponseEntity<String> deleteSession(@PathVariable("sessionId") String sessionId) throws
		OpenViduJavaClientException,
		OpenViduHttpException {
		Session session = openVidu.getActiveSession(sessionId);
		if (session == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

		for (Connection conn : session.getConnections()) {
			session.forceDisconnect(conn);
		}
		return new ResponseEntity<>("Session deleted", HttpStatus.OK);
	}

	@PostMapping("/story/{fanmeetingId}")
	public ResponseEntity<Void> getStories(@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		openViduStoryService.getStories(fanmeetingId, member);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/story/{fanmeetingId}/{sequence}")
	public ResponseEntity<OpenViduStoryDto> getStoryBySequence(@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@PathVariable(name = "sequence") int sequence, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(openViduStoryService.getStoryBySequence(fanmeetingId, sequence, member));
	}

	@GetMapping(value = "/{fanmeetingId}/quiz", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<OpenViduQuizResponseDto>> getQuizzes(@PathVariable long fanmeetingId) {
		List<OpenViduQuizResponseDto> quizzes = openViduQuizService.getQuizzesByFanmeetingId(fanmeetingId);
		return ResponseEntity.ok(quizzes);

	}

	@GetMapping(path = "/question/{fanmeetingId}/{sequence}")
	public ResponseEntity<OpenViduQuestionDto> getQuestionBySequence(@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@PathVariable(name = "sequence") int sequence, @AuthenticationPrincipal Member member) {
		return ResponseEntity.ok(openViduQuestionService.getQuestionBySequence(fanmeetingId, sequence, member));
	}

	@PostMapping("/question/{fanmeetingId}")
	public ResponseEntity<Void> getQuestions(@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		openViduQuestionService.getQuestions(fanmeetingId, member);
		return ResponseEntity.ok().build();
	}






}
