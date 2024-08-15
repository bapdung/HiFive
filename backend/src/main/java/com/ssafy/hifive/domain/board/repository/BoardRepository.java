package com.ssafy.hifive.domain.board.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
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
	@EntityGraph(value = "Board.withCreatorProfile", type = EntityGraph.EntityGraphType.LOAD)
	Page<Board> findByCreatorId(@Param("creatorId") long creatorId, Pageable pageable);

	@EntityGraph(value = "Board.withCreatorProfile", type = EntityGraph.EntityGraphType.LOAD)
	@Query("""
			select count(*) 
			from Board b
			where b.creator.memberId = :creatorId
		""")
	long countByCreatorId(long creatorId);

	@EntityGraph(value = "Board.withCreatorProfile", type = EntityGraph.EntityGraphType.LOAD)
	Optional<Board> findById(long boardId);
}





