package com.ssafy.hifive.domain.openvidu.dto.rseponse;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class OpenviduResponseDto {
    private String sessionId;

    public static OpenviduResponseDto from(String sessionId){
        return new OpenviduResponseDto(sessionId);
    }
}
