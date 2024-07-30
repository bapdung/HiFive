package com.ssafy.hifive.domain.category.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.hifive.domain.category.dto.response.CategoryResponseDto;

@Service
public class CategoryService {

	public ResponseEntity<List<CategoryResponseDto>> getCategoryAll() {
		return ResponseEntity.ok(null);
	}
}
