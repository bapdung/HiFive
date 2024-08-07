package com.ssafy.hifive.domain.creator.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCreator is a Querydsl query type for Creator
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCreator extends EntityPathBase<Creator> {

    private static final long serialVersionUID = -424099943L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCreator creator1 = new QCreator("creator1");

    public final com.ssafy.hifive.global.entity.QBaseTimeEntity _super = new com.ssafy.hifive.global.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.ssafy.hifive.domain.member.entity.QMember creator;

    public final StringPath creatorImg = createString("creatorImg");

    public final StringPath creatorName = createString("creatorName");

    public final NumberPath<Long> creatorProfileId = createNumber("creatorProfileId", Long.class);

    public final StringPath description = createString("description");

    public final NumberPath<Integer> follower = createNumber("follower", Integer.class);

    public final StringPath link = createString("link");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public QCreator(String variable) {
        this(Creator.class, forVariable(variable), INITS);
    }

    public QCreator(Path<? extends Creator> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCreator(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCreator(PathMetadata metadata, PathInits inits) {
        this(Creator.class, metadata, inits);
    }

    public QCreator(Class<? extends Creator> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.creator = inits.isInitialized("creator") ? new com.ssafy.hifive.domain.member.entity.QMember(forProperty("creator"), inits.get("creator")) : null;
    }

}

