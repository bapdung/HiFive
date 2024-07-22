package com.ssafy.hifive.domain.point.entity;

import java.util.Locale;

public enum TransactionType {
	PLUS,
	MINUS;

	public static TransactionType getTransactionType(String type) {
		return TransactionType.valueOf(type.toUpperCase(Locale.ENGLISH));
	}
}
