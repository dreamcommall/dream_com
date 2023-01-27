package com.bitc.dream_com.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private int reviewNum;
    private String userId;
    private String content;
    private int productNum;
    private String CreateDt;
    private String imgPath;
    private int likeCount;
    private String nReviewMsg;
    private String sReviewMsg;
    private String pReviewMsg;
    private String dReviewMsg;
    private double score;
    private int dReviewNum;
    private int sReviewNum;
    private int nReviewNum;
    private int pReviewNum;
}
