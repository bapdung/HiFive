package com.ssafy.hifive.global.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hifive.domain.auth.repository.TokenRepository;
import com.ssafy.hifive.domain.member.service.MemberService;
import com.ssafy.hifive.global.config.jwt.TokenProvider;
import com.ssafy.hifive.global.config.oauth.CustomMemberDetailsArgumentResolver;
import com.ssafy.hifive.global.config.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ssafy.hifive.global.config.oauth.OAuth2SuccessHandler;
import com.ssafy.hifive.global.config.oauth.OAuth2UserCustomService;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebOAuthSecurityConfig implements WebMvcConfigurer {

	private final OAuth2UserCustomService oAuth2UserCustomService;
	private final TokenRepository tokenRepository;
	private final TokenProvider tokenProvider;
	private final MemberService memberService;
	private final CustomMemberDetailsArgumentResolver customMemberDetailsArgumentResolver;
	private final ObjectMapper objectMapper;

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring()
			.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html", "/swagger-resources/**",
				"/webjars/**");
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
			.httpBasic(httpBasic -> httpBasic.disable())
			.formLogin(formLogin -> formLogin.disable())
			.logout(logout -> logout.disable());

		http.sessionManagement(
			sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

		http.authorizeHttpRequests(authorize -> authorize
			.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/swagger-resources/**",
				"/webjars/**").permitAll()
			.requestMatchers("/api/auth/**").permitAll()
			.requestMatchers("/api/**").authenticated()
			.anyRequest().permitAll());

		http.oauth2Login(oauth2 -> oauth2
			.loginPage("/login")
			.authorizationEndpoint(authorization -> authorization.authorizationRequestRepository(
				oAuth2AuthorizationRequestBasedOnCookieRepository()))
			.successHandler(oAuth2SuccessHandler())
			.userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserCustomService)));

		http.logout(logout -> logout.logoutSuccessUrl("/login"));

		http.exceptionHandling(exceptionHandling -> exceptionHandling.defaultAuthenticationEntryPointFor(
			new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
			new AntPathRequestMatcher("/api/**")));

		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		return http.build();
	}

	@Bean
	public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
		return new OAuth2AuthorizationRequestBasedOnCookieRepository();
	}

	@Bean
	public TokenAuthenticationFilter tokenAuthenticationFilter() {
		return new TokenAuthenticationFilter(tokenProvider);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public OAuth2SuccessHandler oAuth2SuccessHandler() {
		return new OAuth2SuccessHandler(tokenProvider, tokenRepository,
			oAuth2AuthorizationRequestBasedOnCookieRepository(), memberService, objectMapper);
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(customMemberDetailsArgumentResolver);
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOrigins(Arrays.asList(
			"http://i11a107.p.ssafy.io",
			"https://i11a107.p.ssafy.io",
			"http://i11a107.p.ssafy.io:8080",
			"http://i11a107.p.ssafy.io:8080"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		configuration.setExposedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
