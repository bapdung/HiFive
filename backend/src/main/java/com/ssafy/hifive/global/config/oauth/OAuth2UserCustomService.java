package com.ssafy.hifive.global.config.oauth;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OAuth2UserCustomService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		saveOrUpdate(oAuth2User);

		return oAuth2User;
	}

	private void saveOrUpdate(OAuth2User oAuth2User) {
		Map<String, Object> attributes = oAuth2User.getAttributes();

		String email = getKakaoEmail(attributes);
		String nickname = getKakaoNickname(attributes);
		String profileImg = getKakaoProfileImage(attributes);

		Member member = memberRepository.findByEmail(email)
			.orElse(Member.builder()
				.email(email)
				.nickname(nickname)
				.profileImg(profileImg)
				.build());

		memberRepository.save(member);
	}

	private String getKakaoEmail(Map<String, Object> attributes) {
		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
		return (String)kakaoAccount.get("email");
	}

	private String getKakaoNickname(Map<String, Object> attributes) {
		Map<String, Object> properties = (Map<String, Object>)attributes.get("properties");
		return (String)properties.get("nickname");
	}

	private String getKakaoProfileImage(Map<String, Object> attributes) {
		Map<String, Object> properties = (Map<String, Object>)attributes.get("properties");
		return (String)properties.get("profile_image");
	}
}
