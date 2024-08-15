package com.ssafy.hifive.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.comment.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>, CommentCustomRepository {
	@Modifying
	@Query("""
			delete from Comment c where c.board.boardId =:boardId
		""")
	void deleteAllByBoardId(@Param("boardId") Long boardId);
}
