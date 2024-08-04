package com.ssafy.hifive.domain.board.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
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
import com.ssafy.hifive.global.error.ErrorCode;
import com.ssafy.hifive.global.error.type.DataNotFoundException;
import com.ssafy.hifive.global.error.type.ForbiddenException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

	private final CommentService commentService;
	private final BoardRepository boardRepository;

	private final static int PAGE_SIZE = 5;

	private Pageable createPageable(BoardParam param) {
		return PageRequest.of(param.getPage() != null ? param.getPage() : 0, PAGE_SIZE,
			param.getSort() != null && param.getSort().equalsIgnoreCase("asc") ?
				Sort.by("createdDate").ascending() : Sort.by("createdDate").descending());
	}

	public List<BoardResponseDto> getBoardAll(long creatorId, BoardParam param) {
		Pageable pageable = createPageable(param);

		Page<Board> boardPage = boardRepository.findByCreatorId(creatorId, pageable);

		int totalPages = boardPage.getTotalPages();

		return boardPage.getContent().stream()
			.map(board -> BoardResponseDto.from(board, totalPages))
			.collect(Collectors.toList());
	}

	public BoardResponseDto getBoardDetail(long boardId) {
		return boardRepository.findById(boardId)
			.map(board -> BoardResponseDto.from(board, 1))
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.BOARD_NOT_FOUND, "유효하지 않은 boardId입니다."));
	}

	@Transactional
	public void createBoard(long creatorId, BoardRequestDto boardRequestDto, Member member) {
		if (member.getMemberId() != creatorId || !member.isCreator()) {
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);
		}

		boardRepository.save(boardRequestDto.toEntity(member));
	}

	@Transactional
	public void updateBoard(long boardId, BoardRequestDto boardRequestDto, Member member) {
		Board board = boardRepository.findById(boardId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.BOARD_NOT_FOUND));

		if (!member.isCreator() || board.getCreator().getMemberId() != member.getMemberId())
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);

		board.updateBoard(boardRequestDto.getContents(), boardRequestDto.getBoardImg());
	}

	@Transactional
	public void deleteBoard(long boardId, Member member) {
		Board board = boardRepository.findById(boardId)
			.orElseThrow(() -> new DataNotFoundException(ErrorCode.BOARD_NOT_FOUND));

		if (!member.isCreator() || board.getCreator().getMemberId() != member.getMemberId())
			throw new ForbiddenException(ErrorCode.MEMBER_FORBIDDEN_ERROR);

		commentService.deleteByBoardId(boardId);
		boardRepository.delete(board);
	}
}

