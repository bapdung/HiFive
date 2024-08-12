package com.ssafy.hifive.domain.file.service;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Service;

@Service
public class FileService {
	private static final String RECORDINGS_DIR = "app/recordings";

	public void downloadFile(String fileUrl, String fileName) throws Exception {
		File dir = new File(RECORDINGS_DIR);
		if (!dir.exists()) {
			dir.mkdirs();
		}

		// Create the file path
		String filePath = RECORDINGS_DIR + File.separator + fileName;

		URL url = new URL(fileUrl);
		HttpURLConnection connection = (HttpURLConnection)url.openConnection();
		connection.setRequestMethod("GET");

		try (InputStream inputStream = connection.getInputStream();
			 BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
			 FileOutputStream fileOutputStream = new FileOutputStream(filePath);
			 BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream)) {

			byte[] buffer = new byte[1024];
			int bytesRead;

			while ((bytesRead = bufferedInputStream.read(buffer)) != -1) {
				bufferedOutputStream.write(buffer, 0, bytesRead);
			}
		}

		System.out.println("File downloaded and saved to: " + filePath);
	}
}
