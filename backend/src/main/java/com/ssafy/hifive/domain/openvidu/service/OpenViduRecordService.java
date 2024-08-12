package com.ssafy.hifive.domain.openvidu.service;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.openvidu.dto.response.OpenViduRecordDto;
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.BadRequestException;
import com.ssafy.hifive.global.error.type.DataNotFoundException;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Recording;
import io.openvidu.java.client.RecordingLayout;
import io.openvidu.java.client.RecordingProperties;
import io.openvidu.java.client.Session;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class OpenViduRecordService {
	public OpenViduRecordDto recordVideo(OpenVidu openVidu, String fanmeetingId) throws
		OpenViduJavaClientException, OpenViduHttpException {
		Session session = openVidu.getActiveSession(fanmeetingId);
		if (session == null) {
			throw new DataNotFoundException(ErrorCode.FANMEETING_NO_SESSION, "해당 세션 Id가 존재하지 않습니다.");
		}
		session.fetch();

		RecordingProperties properties = new RecordingProperties.Builder()
			.name("fanmeeting-" + fanmeetingId)
			.outputMode(Recording.OutputMode.INDIVIDUAL)
			.recordingLayout(RecordingLayout.BEST_FIT)
			.build();

		return OpenViduRecordDto.from(openVidu.startRecording(fanmeetingId, properties).getId());
	}

	public void stopRecordVideo(OpenVidu openVidu, String recordId) throws
		OpenViduJavaClientException, OpenViduHttpException {
		if (openVidu.getRecording(recordId) == null) {
			throw new BadRequestException(ErrorCode.RECORDING_NOT_FOUND, "Record가 존재하지 않습니다." + recordId);
		}
		openVidu.stopRecording(recordId);

		log.info(openVidu.getRecording(recordId).getUrl());
	}
}
