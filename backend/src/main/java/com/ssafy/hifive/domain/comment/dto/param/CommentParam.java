package com.ssafy.hifive.domain.comment.dto.param;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentParam {
	@Schema(description = "가장 마지막으로 불러온 comment_id")
	public Long top;
}
