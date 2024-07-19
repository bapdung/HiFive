package com.ssafy.hifive.global.entity;

import java.time.LocalDateTime;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {
	@Column(name = "created_date", updatable = false)
	private LocalDateTime createdDate;

	@Column(name = "modified_date")
	private LocalDateTime modifiedDate;

	@PrePersist
	protected void onCreate() {
		createdDate = LocalDateTime.now();
		modifiedDate = LocalDateTime.now();
	}

	@PreUpdate
	protected void onUpdate() {
		modifiedDate = LocalDateTime.now();
	}
}
