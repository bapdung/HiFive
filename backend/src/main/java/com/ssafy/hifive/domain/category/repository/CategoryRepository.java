package com.ssafy.hifive.domain.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.hifive.domain.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
