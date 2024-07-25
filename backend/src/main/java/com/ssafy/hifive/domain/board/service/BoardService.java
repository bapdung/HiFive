package com.ssafy.hifive.domain.board.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.hifive.domain.board.dto.param.BoardParam;
import com.ssafy.hifive.domain.board.dto.request.BoardRequestDto;
import com.ssafy.hifive.domain.board.dto.response.BoardResponseDto;
import com.ssafy.hifive.domain.board.entity.Board;
import com.ssafy.hifive.domain.board.repository.BoardRepository;
import com.ssafy.hifive.domain.comment.service.CommentService;
import com.ssafy.hifive.domain.member.entity.Member;
import com.ssafy.hifive.domain.member.repository.MemberRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

	private final CommentService commentService;
	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;

	private final static int PAGE_SIZE = 5;

	public List<BoardResponseDto> getBoardAll(long creatorId, BoardParam param, Member member) {
		Pageable pageable = PageRequest.of(param.getPage() != null ? param.getPage() : 0, PAGE_SIZE,
			param.getSort() != null && param.getSort().equalsIgnoreCase("asc") ?
				Sort.by("createdDate").ascending() : Sort.by("createdDate").descending());

		return boardRepository.findByCreatorId(creatorId, pageable).getContent().stream()
			.map(BoardResponseDto::from)
			.collect(Collectors.toList());
	}

	public BoardResponseDto getBoardDetail(long boardId, Member member) {
		return boardRepository.findById(boardId)
			.map(BoardResponseDto::from)
			.orElseThrow(() -> new EntityNotFoundException());
	}

	@Transactional
	public void createBoard(BoardRequestDto boardRequestDto, Member member) {
		member = memberRepository.findById(1L).orElseThrow(() -> new EntityNotFoundException());
		// if (!member.isCreator())
		// TODO : 403 forbidden
		// throw new Exception("오류");
		boardRepository.save(boardRequestDto.toEntity(member));
	}

	@Transactional
	public void updateBoard(long boardId, BoardRequestDto boardRequestDto, Member member) {
		member = memberRepository.findById(1L).orElseThrow(() -> new EntityNotFoundException());
		//TODO : 403 forbidden
		//if(!member.isCreator()) throw new EntityNotFoundException();
		Board board = boardRepository.findById(boardId).orElseThrow(() -> new EntityNotFoundException());
		board.updateBoard(boardRequestDto.getContents(), boardRequestDto.getBoardImg());

	}

	@Transactional
	public void deleteBoard(long boardId, Member member) {
		member = memberRepository.findById(1L).orElseThrow(() -> new EntityNotFoundException());
		//TODO : 403 forbidden
		//if(!member.isCreator()) throw new EntityNotFoundException();
		Board board = boardRepository.findById(boardId).orElseThrow(() -> new EntityNotFoundException());
		if (board.getCreator().getMemberId() != member.getMemberId()) {
			// throw new BadRequestException();
		}
		commentService.deleteByBoardId(boardId);
		boardRepository.delete(board);
	}
}
