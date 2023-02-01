package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    List<ReviewDto> productReview(int productNum) throws Exception;

    List<ReviewDto> getScore(int productNum) throws Exception;

    int insertDetailReview(ReviewDto reviewDto) throws Exception;

    void insertSimpleReview(ReviewDto reviewDto) throws Exception;


    List<ReviewDto> selectReviewNum(ReviewDto reviewDto) throws Exception;

    List<ReviewDto> userReview(String userId) throws Exception;

    void changeReview(ReviewDto reviewDto) throws Exception;

    void deleteReview(ReviewDto reviewDto) throws Exception;

    int getReview(int productNum) throws Exception;

    List<ReviewDto> noiseMsg() throws Exception;

    List<ReviewDto> specMsg() throws Exception;

    List<ReviewDto> packagingMsg() throws Exception;

    List<ReviewDto> deliveryMsg() throws Exception;
}
