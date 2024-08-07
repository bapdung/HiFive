package com.ssafy.hifive.domain.fanmeeting.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFanmeeting is a Querydsl query type for Fanmeeting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFanmeeting extends EntityPathBase<Fanmeeting> {

    private static final long serialVersionUID = -731724221L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFanmeeting fanmeeting = new QFanmeeting("fanmeeting");

    public final com.ssafy.hifive.global.entity.QBaseTimeEntity _super = new com.ssafy.hifive.global.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.ssafy.hifive.domain.member.entity.QMember creator;

    public final NumberPath<Long> fanmeetingId = createNumber("fanmeetingId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath notice = createString("notice");

    public final DateTimePath<java.time.LocalDateTime> openDate = createDateTime("openDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> participant = createNumber("participant", Integer.class);

    public final StringPath posterImg = createString("posterImg");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Integer> runningTime = createNumber("runningTime", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> startDate = createDateTime("startDate", java.time.LocalDateTime.class);

    public final ListPath<com.ssafy.hifive.domain.timetable.entity.Timetable, com.ssafy.hifive.domain.timetable.entity.QTimetable> timetable = this.<com.ssafy.hifive.domain.timetable.entity.Timetable, com.ssafy.hifive.domain.timetable.entity.QTimetable>createList("timetable", com.ssafy.hifive.domain.timetable.entity.Timetable.class, com.ssafy.hifive.domain.timetable.entity.QTimetable.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    public QFanmeeting(String variable) {
        this(Fanmeeting.class, forVariable(variable), INITS);
    }

    public QFanmeeting(Path<? extends Fanmeeting> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFanmeeting(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFanmeeting(PathMetadata metadata, PathInits inits) {
        this(Fanmeeting.class, metadata, inits);
    }

    public QFanmeeting(Class<? extends Fanmeeting> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.creator = inits.isInitialized("creator") ? new com.ssafy.hifive.domain.member.entity.QMember(forProperty("creator"), inits.get("creator")) : null;
    }

}

