package com.ssafy.hifive.domain.category.dto.response;

import com.ssafy.hifive.domain.category.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponseDto {

	private long CategoryId;
	private String name;

	public static CategoryResponseDto from(Category category) {
		return new CategoryResponseDto(
			category.getCategoryId(),
			category.getName()
		);
	}

}
