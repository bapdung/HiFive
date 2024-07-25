package com.ssafy.hifive.domain.s3.service;

import java.net.URL;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.s3.dto.response.S3ResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3Service {

	@Value("${cloud.s3.bucket}")
	private String bucket;

	private final AmazonS3 amazonS3;

	public S3ResponseDto createPresignedUrl(String prefix, String fileName, Member member) {
		if (!prefix.isEmpty()) {
			fileName = createPath(prefix, fileName);
		}

		GeneratePresignedUrlRequest generatePresignedUrlRequest = getGeneratePresignedUrlRequest(bucket, fileName);
		URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);

		return S3ResponseDto.from(url.toString());
	}

	private GeneratePresignedUrlRequest getGeneratePresignedUrlRequest(String bucket, String fileName) {
		GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucket, fileName)
			.withMethod(HttpMethod.PUT)
			.withExpiration(getPresignedUrlExpiration());

		return generatePresignedUrlRequest;
	}

	private Date getPresignedUrlExpiration() {
		Date expiration = new Date();
		long expTimeMillis = expiration.getTime();
		expTimeMillis += 1000 * 60 * 2;
		expiration.setTime(expTimeMillis);

		return expiration;
	}

	private String createFileId() {
		return UUID.randomUUID().toString();
	}

	private String createPath(String prefix, String fileName) {
		String fileId = createFileId();
		return String.format("%s/%s", prefix, fileId + "-" + fileName);
	}
}