package com.ssafy.hifive.domain.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.board.entity.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
	@Query("""
			SELECT b 
			FROM Board b
			JOIN FETCH b.creator
			WHERE b.creator.memberId = :creatorId
		""")
	Page<Board> findByCreatorId(@Param("creatorId") long creatorId, Pageable pageable);

	@Modifying
	@Query("""
			delete from Board b
			where b.creator.memberId = :creatorId
		""")
	void deleteAllByCreatorId(@Param("creatorId") Long creatorId);
}





