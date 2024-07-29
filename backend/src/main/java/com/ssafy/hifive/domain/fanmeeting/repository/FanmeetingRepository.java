package com.ssafy.hifive.domain.fanmeeting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hifive.domain.fanmeeting.entity.Fanmeeting;

public interface FanmeetingRepository extends JpaRepository<Fanmeeting, Long> {

}
