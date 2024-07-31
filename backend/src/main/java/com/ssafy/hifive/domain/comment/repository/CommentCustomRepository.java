package com.ssafy.hifive.domain.comment.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.comment.entity.Comment;

@Repository
public interface CommentCustomRepository {
	List<Comment> getCommentAllByBoardAndTopId(Long boardId, Long top);
}
