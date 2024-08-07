package com.ssafy.hifive.domain.reservation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReservation is a Querydsl query type for Reservation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReservation extends EntityPathBase<Reservation> {

    private static final long serialVersionUID = 1482924569L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReservation reservation = new QReservation("reservation");

    public final com.ssafy.hifive.global.entity.QBaseTimeEntity _super = new com.ssafy.hifive.global.entity.QBaseTimeEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.ssafy.hifive.domain.member.entity.QMember fan;

    public final com.ssafy.hifive.domain.fanmeeting.entity.QFanmeeting fanmeeting;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final NumberPath<Long> reservationId = createNumber("reservationId", Long.class);

    public QReservation(String variable) {
        this(Reservation.class, forVariable(variable), INITS);
    }

    public QReservation(Path<? extends Reservation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReservation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReservation(PathMetadata metadata, PathInits inits) {
        this(Reservation.class, metadata, inits);
    }

    public QReservation(Class<? extends Reservation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fan = inits.isInitialized("fan") ? new com.ssafy.hifive.domain.member.entity.QMember(forProperty("fan"), inits.get("fan")) : null;
        this.fanmeeting = inits.isInitialized("fanmeeting") ? new com.ssafy.hifive.domain.fanmeeting.entity.QFanmeeting(forProperty("fanmeeting"), inits.get("fanmeeting")) : null;
    }

}

