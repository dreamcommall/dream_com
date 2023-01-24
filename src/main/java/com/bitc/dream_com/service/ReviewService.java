package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    List<ReviewDto> review() throws Exception;

    List<ReviewDto> getScore(int productNum) throws Exception;

    void insertDetailReview(ReviewDto reviewDto) throws Exception;

    void insertSimpleReview(ReviewDto reviewDto) throws Exception;


    List<ReviewDto> selectReviewNum(ReviewDto reviewDto) throws Exception;
}
