package com.ssafy.hifive.domain.question.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hifive.domain.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

	List<Question> findByFanmeeting_FanmeetingIdAndFan_MemberId(long fanmeetingId, long memberId);

	Page<Question> findByFanmeeting_FanmeetingId(long fanmeetingId, Pageable pageable);

	Page<Question> findByFanmeeting_FanmeetingIdAndIsPicked(long fanmeetingId, boolean isPicked, Pageable pageable);
}
