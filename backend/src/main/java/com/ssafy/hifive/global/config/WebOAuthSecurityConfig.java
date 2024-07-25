package com.ssafy.hifive.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.ssafy.hifive.domain.member.service.MemberService;
import com.ssafy.hifive.domain.token.repository.TokenRepository;
import com.ssafy.hifive.global.config.jwt.TokenProvider;
import com.ssafy.hifive.global.config.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ssafy.hifive.global.config.oauth.OAuth2SuccessHandler;
import com.ssafy.hifive.global.config.oauth.OAuth2UserCustomService;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebOAuthSecurityConfig {

	private final OAuth2UserCustomService oAuth2UserCustomService;
	private final TokenRepository tokenRepository;
	private final TokenProvider tokenProvider;
	private final MemberService memberService;

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers("/static/**");
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
			.httpBasic(httpBasic -> httpBasic.disable())
			.formLogin(formLogin -> formLogin.disable())
			.logout(logout -> logout.disable());

		http.sessionManagement(
			sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		// http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

		http.authorizeHttpRequests(authorize -> authorize
			.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/swagger-resources/**",
				"/webjars/**").permitAll()
			.requestMatchers("/api/token").permitAll()
			// .requestMatchers("/api/**").authenticated()
			.requestMatchers("/api/**").permitAll()
			.anyRequest().permitAll());

		http.oauth2Login(oauth2 ->
			oauth2.loginPage("/login")
				.authorizationEndpoint(authorization -> authorization.authorizationRequestRepository(
					oAuth2AuthorizationRequestBasedOnCookieRepository()))
				.successHandler(oAuth2SuccessHandler())
				.userInfoEndpoint(userInfo ->
					userInfo.userService(oAuth2UserCustomService)));

		http.logout(logout ->
			logout.logoutSuccessUrl("/login"));

		http.exceptionHandling(exceptionHandling ->
			exceptionHandling.defaultAuthenticationEntryPointFor(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
				new AntPathRequestMatcher("/api/**")));

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
			oAuth2AuthorizationRequestBasedOnCookieRepository(), memberService);
	}
}
