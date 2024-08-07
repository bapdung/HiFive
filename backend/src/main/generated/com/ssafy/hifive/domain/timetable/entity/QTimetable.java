package com.ssafy.hifive.domain.timetable.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTimetable is a Querydsl query type for Timetable
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTimetable extends EntityPathBase<Timetable> {

    private static final long serialVersionUID = 2010420089L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTimetable timetable = new QTimetable("timetable");

    public final com.ssafy.hifive.global.entity.QBaseTimeEntity _super = new com.ssafy.hifive.global.entity.QBaseTimeEntity(this);

    public final com.ssafy.hifive.domain.category.entity.QCategory category;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath detailName = createString("detailName");

    public final com.ssafy.hifive.domain.fanmeeting.entity.QFanmeeting fanmeeting;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Integer> sequence = createNumber("sequence", Integer.class);

    public final NumberPath<Long> timetableId = createNumber("timetableId", Long.class);

    public QTimetable(String variable) {
        this(Timetable.class, forVariable(variable), INITS);
    }

    public QTimetable(Path<? extends Timetable> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTimetable(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTimetable(PathMetadata metadata, PathInits inits) {
        this(Timetable.class, metadata, inits);
    }

    public QTimetable(Class<? extends Timetable> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new com.ssafy.hifive.domain.category.entity.QCategory(forProperty("category")) : null;
        this.fanmeeting = inits.isInitialized("fanmeeting") ? new com.ssafy.hifive.domain.fanmeeting.entity.QFanmeeting(forProperty("fanmeeting"), inits.get("fanmeeting")) : null;
    }

}

