package com.ssafy.hifive.global.config.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
@ConfigurationProperties("jwt")
public class JwtProperties {

	private String issuer;
	private String secretKey;
}
