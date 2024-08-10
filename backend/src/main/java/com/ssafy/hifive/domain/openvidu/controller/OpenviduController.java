package com.ssafy.hifive.domain.openvidu.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.openvidu.dto.request.CustomSessionRequest;
import com.ssafy.hifive.domain.openvidu.dto.request.OpenViduQuizRequestDto;
import com.ssafy.hifive.domain.openvidu.dto.request.SequenceRequest;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuizDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuizResultDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduQuizResultSequenceDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduStoryDto;
import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduTimetableDto;
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
		@RequestBody CustomSessionRequest customSessionRequest)
		throws OpenViduJavaClientException, OpenViduHttpException {
		SessionProperties properties = new SessionProperties.Builder().customSessionId(
			customSessionRequest.getCustomSessionId()).build();
		Session session = openVidu.createSession(properties);
		//customSessionId는 fanmeetingId고, sessionId는 생성 시 부여 받는 토큰 값)
		openViduSessionService.saveSession(Long.valueOf(customSessionRequest.getCustomSessionId()),
			session.getSessionId());
		return new ResponseEntity<>(
			openViduService.getTimetableAll(Long.valueOf(customSessionRequest.getCustomSessionId()),
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
		@RequestBody SequenceRequest sequenceRequest) {
		openViduSessionService.saveSequence(fanmeetingId, sequenceRequest.getSequence());
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

	@PostMapping("/quiz/{fanmeetingId}")
	public ResponseEntity<Void> getQuizzes(@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@AuthenticationPrincipal Member member) {
		openViduQuizService.getQuizzes(fanmeetingId, member);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/quiz/{fanmeetingId}/{sequence}")
	public ResponseEntity<OpenViduQuizDto> getQuizBySequence(
		@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@PathVariable(name = "sequence") int sequence,
		@AuthenticationPrincipal Member member) {

		OpenViduQuizDto quiz = openViduQuizService.getQuizBySequence(fanmeetingId, sequence, member);
		return ResponseEntity.ok(quiz);
	}

	@PostMapping("/quiz/answer/{fanmeetingId}/{sequence}")
	public ResponseEntity<Void> submitSingleUserAnswer(
		@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@PathVariable(name = "sequence") int sequence,
		@ModelAttribute OpenViduQuizRequestDto openViduQuizRequestDto,
		@AuthenticationPrincipal Member member) {

		openViduQuizService.submitSingleUserAnswer(fanmeetingId, sequence, member, openViduQuizRequestDto);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/quiz/result/{fanmeetingId}/{sequence}")
	public ResponseEntity<List<OpenViduQuizResultSequenceDto>> getResultsForQuestion(
		@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@PathVariable(name = "sequence") int sequence,
		@AuthenticationPrincipal Member member) {

		return ResponseEntity.ok(openViduQuizService.getResultsForQuestion(fanmeetingId, sequence));
	}

	@GetMapping("/quiz/result/{fanmeetingId}")
	public ResponseEntity<List<OpenViduQuizResultDto>> getQuizRanking(
		@PathVariable(name = "fanmeetingId") long fanmeetingId,
		@AuthenticationPrincipal Member member) {

		return ResponseEntity.ok(openViduQuizService.getQuizRanking(fanmeetingId));
	}

}
