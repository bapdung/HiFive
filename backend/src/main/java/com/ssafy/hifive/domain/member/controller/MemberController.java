package com.ssafy.hifive.domain.member.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.hifive.domain.member.dto.request.MemberIdentificationDto;
import com.ssafy.hifive.domain.member.dto.request.MemberNicknameDto;
import com.ssafy.hifive.domain.member.dto.request.MemberUpdateDto;
import com.ssafy.hifive.domain.member.dto.response.MemberResponseDto;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;
import com.ssafy.hifive.domain.member.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Tag(name = "member", description = "사용자 관련 API")
public class MemberController {
	private final MemberService memberService;
	private final MemberRepository memberRepository;

	@Operation(summary = "회원 정보 조회", description = "로그인한 사용자의 정보를 조회한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MemberResponseDto> getMember(@AuthenticationPrincipal Member member) {
		Member mem = memberRepository.findById(1L).get();
		return ResponseEntity.ok(memberService.getMemberDetail(mem));
	}

	@Operation(summary = "닉네임 중복 확인 및 유효성 검사", description = "사용자가 수정할 닉네임의 유효성과 중복여부를 검사한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(path = "/valid", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> nicknameCheck(@RequestBody MemberNicknameDto memberNicknameDto,
		@AuthenticationPrincipal Member member) {
		return memberService.nicknameCheck(memberNicknameDto, member);
	}

	@Operation(summary = "회원 정보 수정", description = "사용자의 정보를 수정한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PatchMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> updateMember(@RequestBody MemberUpdateDto memberUpdateDto,
		@AuthenticationPrincipal Member member) {
		memberService.updateMember(memberUpdateDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "회원 신분증 등록", description = "사용자의 신분증 사진을 등록한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createIdentification(@RequestPart
	MemberIdentificationDto memberIdentificationDto,
		@AuthenticationPrincipal Member member) {
		memberService.createIdentification(memberIdentificationDto, member);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "회원 삭제", description = "사용자가 웹사이트를 탈퇴한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deleteMember(@AuthenticationPrincipal Member member) {
		Member mem = memberRepository.findById(1L).get();
		memberService.deleteMember(mem);
		return ResponseEntity.ok().build();
	}

	//TODO
	@Operation(summary = "회원 로그아웃", description = "사용자가 웹사이트를 로그아웃한다.")
	@ApiResponse(responseCode = "401", description = "사용자 인증이 올바르지 않음",
		content = @Content(mediaType = "application/json",
			schema = @Schema(implementation = ErrorResponse.class),
			examples = @ExampleObject(value = "{\"error\" : \"사용자 인증에 실패하였습니다.\"}")))
	@GetMapping(path = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> logoutMember(HttpServletRequest request, HttpServletResponse response) {
		new SecurityContextLogoutHandler().logout(request, response,
			SecurityContextHolder.getContext().getAuthentication());
		return ResponseEntity.ok().build();
	}

}
