package com.ssafy.hifive.domain.creator.repository;

import static com.ssafy.hifive.domain.creator.entity.QCreator.creator1;

import java.time.LocalDateTime;
import java.util.List;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hifive.domain.creator.entity.Creator;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CreatorCustomRepositoryImpl implements CreatorCustomRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Creator> findCreatorByCreatedDateWithScrolling(String sort, String keyword, LocalDateTime top) {
		OrderSpecifier<?> orderSpecifier = getCreatedDateOrderSpecifier(sort);

		return jpaQueryFactory.selectFrom(creator1)
			.where(
				getKeyWord(keyword),
				afterCreatedDateCursor(top, sort)
			)
			.orderBy(orderSpecifier)
			.limit(10)
			.fetch();
	}

	@Override
	public List<Creator> findCreatorByCreatorNameWithScrolling(String sort, String keyword, String top) {
		OrderSpecifier<?> orderSpecifier = getCreatorNameOrderSpecifier(sort);

		return jpaQueryFactory.selectFrom(creator1)
			.where(
				getKeyWord(keyword),
				afterCreatorNameCursor(top, sort)
			)
			.orderBy(orderSpecifier)
			.limit(10)
			.fetch();
	}


	private BooleanExpression getKeyWord(String word) {
		return word != null ? creator1.creatorName.containsIgnoreCase(word) : null;
	}

	private BooleanExpression afterCreatedDateCursor(LocalDateTime top, String sort) {
		if (top == null) {
			return null;
		} else if (sort.equals("asc")) {
			return creator1.createdDate.gt(top);
		} else {
			return creator1.createdDate.lt(top);
		}
	}

	private BooleanExpression afterCreatorNameCursor(String top, String sort) {
		if (top == null) {
			return null;
		} else if (sort.equals("asc")) {
			return creator1.creatorName.gt(top);
		} else {
			return creator1.creatorName.lt(top);
		}
	}

	private OrderSpecifier<LocalDateTime> getCreatedDateOrderSpecifier(String sort) {
		if (sort.equals("desc")) {
			return creator1.createdDate.desc();
		} else {
			return creator1.createdDate.asc();
		}
	}

	private OrderSpecifier<String> getCreatorNameOrderSpecifier(String sort) {
		if(sort.equals("desc")){
			return creator1.creatorName.desc();
		} else {
			return creator1.creatorName.asc();
		}
	}
}
