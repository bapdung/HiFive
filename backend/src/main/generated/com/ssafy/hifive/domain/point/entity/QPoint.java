package com.ssafy.hifive.domain.point.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPoint is a Querydsl query type for Point
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPoint extends EntityPathBase<Point> {

    private static final long serialVersionUID = -2036062503L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPoint point1 = new QPoint("point1");

    public final com.ssafy.hifive.global.entity.QBaseTimeEntity _super = new com.ssafy.hifive.global.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath detail = createString("detail");

    public final com.ssafy.hifive.domain.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Integer> point = createNumber("point", Integer.class);

    public final NumberPath<Long> pointTransactionId = createNumber("pointTransactionId", Long.class);

    public final EnumPath<TransactionType> type = createEnum("type", TransactionType.class);

    public QPoint(String variable) {
        this(Point.class, forVariable(variable), INITS);
    }

    public QPoint(Path<? extends Point> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPoint(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPoint(PathMetadata metadata, PathInits inits) {
        this(Point.class, metadata, inits);
    }

    public QPoint(Class<? extends Point> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ssafy.hifive.domain.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

