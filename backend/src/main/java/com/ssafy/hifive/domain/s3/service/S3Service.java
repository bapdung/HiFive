package com.ssafy.hifive.domain.s3.service;

import java.io.File;
import java.net.URL;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.s3.dto.request.S3RequestDto;
import com.ssafy.hifive.domain.s3.dto.response.S3ResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3Service {

	@Value("${cloud.s3.bucket}")
	private String bucket;

	private final AmazonS3 amazonS3;

	public S3ResponseDto createPresignedUrl(S3RequestDto s3RequestDto, String fileName, Member member) {
		if (!s3RequestDto.getPrefix().isEmpty()) {
			fileName = createPath(s3RequestDto.getPrefix(), fileName);
		}

		GeneratePresignedUrlRequest generatePresignedUrlRequest = getGeneratePresignedUrlRequest(bucket, fileName);
		URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);

		return S3ResponseDto.from(url.toString());
	}

	public String uploadFile(File fileToUpload, String fileName) {
		try {
			fileName = "photo/" + fileName;
			amazonS3.putObject(new PutObjectRequest(bucket, fileName, fileToUpload));
			return amazonS3.getUrl(bucket, fileName).toString();
		} catch (Exception e) {
			throw new RuntimeException("S3 파일 업로드 오류. 파일명 : " + fileToUpload.getName());
		}
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