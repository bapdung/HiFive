package com.ssafy.hifive.domain.openvidu.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenViduRecordService {
	@Value("${openvidu.secret}")
	private String openviduSecret;

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
		Exception {
		if (openVidu.getRecording(recordId) == null) {
			throw new BadRequestException(ErrorCode.RECORDING_NOT_FOUND, "Record가 존재하지 않습니다." + recordId);
		}
		openVidu.stopRecording(recordId);

		log.info(openVidu.getRecording(recordId).getUrl());
		downloadFile(openVidu.getRecording(recordId).getUrl(), "test");
	}

	public void downloadFile(String fileUrl, String fileName) throws IOException {
		URL url = new URL(fileUrl);
		File destinationFile = new File("/app/recordings", fileName);

		// Create URL connection
		HttpURLConnection connection = (HttpURLConnection)url.openConnection();
		try {
			// Set HTTP method
			connection.setRequestMethod("GET");

			// Set authorization header
			String auth = "OPENVIDUAPP" + ":" + openviduSecret;
			String encodeAuth = Base64.getEncoder().encodeToString(auth.getBytes());
			String authHeader = "Basic " + encodeAuth;
			connection.setRequestProperty("Authorization", authHeader);

			// Check response code
			int responseCode = connection.getResponseCode();
			if (responseCode != HttpURLConnection.HTTP_OK) {
				throw new IOException("HTTP error code: " + responseCode);
			}

			// Read the input stream
			try (InputStream inputStream = connection.getInputStream();
				 FileOutputStream out = new FileOutputStream(destinationFile)) {
				byte[] buffer = new byte[1024];
				int bytesRead;
				while ((bytesRead = inputStream.read(buffer)) != -1) {
					out.write(buffer, 0, bytesRead);
				}
			}
		} finally {
			connection.disconnect();
		}
	}
}
