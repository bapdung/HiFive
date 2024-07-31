package com.ssafy.hifive.domain.quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.quiz.entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
	@Query(
		"""
				select q
				from Quiz q
				where q.fanmeeting.fanmeetingId = :id
			"""
	)
	List<Quiz> findAllByFanmeetingId(@Param("id") long fanmeetingId);
}
