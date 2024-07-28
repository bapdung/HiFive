package com.ssafy.hifive.domain.question.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.hifive.domain.question.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

	List<Question> findByFanmeeting_FanmeetingIdAndFan_MemberId(long fanmeetingId, long memberId);

	@Modifying
	@Query("""
			delete from Question q
			where q.fan.memberId = :fanId
		""")
	void deleteAllByFanId(long fanId);

}
