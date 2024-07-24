package com.ssafy.hifive.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SpringDocsConfig {
	@Bean
	public OpenAPI openAPI() {
		Info info = new Info()
			.version("v1.0.0")
			.title("HiFive Swagger")
			.description("forms safe API 명세");

		return new OpenAPI()
			.components(new Components())
			.info(info);
	}
}
