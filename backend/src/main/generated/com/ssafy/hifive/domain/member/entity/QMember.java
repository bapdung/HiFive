package com.ssafy.hifive.domain.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1211724569L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final com.ssafy.hifive.global.entity.QBaseTimeEntity _super = new com.ssafy.hifive.global.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.ssafy.hifive.domain.creator.entity.QCreator creatorProfile;

    public final StringPath email = createString("email");

    public final StringPath identificationImg = createString("identificationImg");

    public final BooleanPath isCreator = createBoolean("isCreator");

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final EnumPath<OauthServerType> oAuthServer = createEnum("oAuthServer", OauthServerType.class);

    public final NumberPath<Integer> point = createNumber("point", Integer.class);

    public final StringPath profileImg = createString("profileImg");

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.creatorProfile = inits.isInitialized("creatorProfile") ? new com.ssafy.hifive.domain.creator.entity.QCreator(forProperty("creatorProfile"), inits.get("creatorProfile")) : null;
    }

}

