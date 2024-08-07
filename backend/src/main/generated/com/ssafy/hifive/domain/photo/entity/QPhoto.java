package com.ssafy.hifive.domain.photo.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhoto is a Querydsl query type for Photo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhoto extends EntityPathBase<Photo> {

    private static final long serialVersionUID = 1295433241L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPhoto photo = new QPhoto("photo");

    public final com.ssafy.hifive.global.entity.QBaseTimeEntity _super = new com.ssafy.hifive.global.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.ssafy.hifive.domain.member.entity.QMember fan;

    public final com.ssafy.hifive.domain.fanmeeting.entity.QFanmeeting fanmeeting;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Long> photoId = createNumber("photoId", Long.class);

    public final StringPath photoImg = createString("photoImg");

    public final NumberPath<Integer> sequence = createNumber("sequence", Integer.class);

    public QPhoto(String variable) {
        this(Photo.class, forVariable(variable), INITS);
    }

    public QPhoto(Path<? extends Photo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPhoto(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPhoto(PathMetadata metadata, PathInits inits) {
        this(Photo.class, metadata, inits);
    }

    public QPhoto(Class<? extends Photo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fan = inits.isInitialized("fan") ? new com.ssafy.hifive.domain.member.entity.QMember(forProperty("fan"), inits.get("fan")) : null;
        this.fanmeeting = inits.isInitialized("fanmeeting") ? new com.ssafy.hifive.domain.fanmeeting.entity.QFanmeeting(forProperty("fanmeeting"), inits.get("fanmeeting")) : null;
    }

}

