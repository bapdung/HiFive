package com.ssafy.hifive.global.config.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Component
@Setter
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

	private String issuer;
	private String secretKey;

}
