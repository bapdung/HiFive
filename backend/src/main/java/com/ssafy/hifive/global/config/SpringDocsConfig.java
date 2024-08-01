package com.ssafy.hifive.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SpringDocsConfig {
	@Bean
	public OpenAPI openAPI() {
		Info info = new Info()
			.version("v1.0.0")
			.title("HiFive Swagger")
			.description("forms safe API 명세");

		SecurityScheme securityScheme = new SecurityScheme()
			.type(SecurityScheme.Type.HTTP)
			.scheme("bearer")
			.bearerFormat("JWT");

		SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

		return new OpenAPI()
			.components(new Components().addSecuritySchemes("bearerAuth", securityScheme))
			.addSecurityItem(securityRequirement)
			.info(info);
	}
}
