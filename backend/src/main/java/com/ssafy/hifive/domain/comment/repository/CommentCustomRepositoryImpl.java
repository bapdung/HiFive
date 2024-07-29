package com.ssafy.hifive.domain.comment.repository;

import static com.ssafy.hifive.domain.comment.entity.QComment.*;
import static com.ssafy.hifive.domain.member.entity.QMember.*;

import java.util.List;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hifive.domain.comment.entity.Comment;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CommentCustomRepositoryImpl implements CommentCustomRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Comment> getCommentAllByBoardAndTopId(Long boardId, Long top) {
		return jpaQueryFactory.select(comment)
			.from(comment)
			.join(comment.member, member).fetchJoin()
			.where(getFromBoardId(boardId), afterCursor(top))
			.fetchJoin()
			.limit(5)
			.fetch();
	}

	private BooleanExpression getFromBoardId(Long boardId) {
		return comment.board.boardId.eq(boardId);
	}

	private BooleanExpression afterCursor(Long top) {
		return top != null ? comment.commentId.gt(top) : null;
	}
}
