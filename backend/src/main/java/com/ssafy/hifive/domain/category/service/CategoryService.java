package com.ssafy.hifive.domain.category.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.category.dto.response.CategoryResponseDto;
import com.ssafy.hifive.domain.category.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public List<CategoryResponseDto> getCategoryAll() {
		return categoryRepository.findAll().stream()
			.map(CategoryResponseDto::from)
			.collect(Collectors.toList());
	}
}
