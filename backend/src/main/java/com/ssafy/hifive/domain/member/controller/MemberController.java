package com.ssafy.hifive.domain.member.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.dto.request.MemberNicknameDto;
import com.ssafy.hifive.domain.member.dto.response.MemberResponseDto;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Tag(name = "member", description = "사용자 관련 API")
public class MemberController {
	private final MemberService memberService;

	@Operation(summary = "회원 정보 조회", description = "로그인한 사용자의 정보를 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MemberResponseDto> getMember(@AuthenticationPrincipal Member member) {
		return memberService.getMemberDetail(member);
	}

	@Operation(summary = "닉네임 중복 확인 및 유효성 검사", description = "사용자가 수정할 닉네임이 중복됐는지 검사한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/valid", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> nicknameCheck(@RequestBody MemberNicknameDto memberNicknameDto,
		@AuthenticationPrincipal Member member) {
		memberService.nicknameCheck(memberNicknameDto, member);
		return ResponseEntity.ok().build();
	}

}
