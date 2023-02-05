package com.bitc.dream_com.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AutoLoginDto {
    private String userId;
    private String tokenKey;
    private LocalDateTime createTime;
}
