package com.bitc.dream_com.dto;

import lombok.Data;

@Data
public class DetailReviewDto {
    private int reviewNum;
    private double score;
    private String userId;
    private int productNum;
    private String content;
    private String createDt;
    private String imgPath;
    private int likeCount;
}
