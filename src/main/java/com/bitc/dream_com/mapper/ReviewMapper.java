package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.ReviewDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewDto> productReview(int productNum) throws Exception;

    List<ReviewDto> getScore(int productNum) throws Exception;

    void insertDetailReview(ReviewDto reviewDto) throws Exception;

    void insertSimpleReview(ReviewDto reviewDto) throws Exception;

    List<ReviewDto> selectReviewNum(ReviewDto reviewDto) throws Exception;

    List<ReviewDto> userReview(String userId) throws Exception;

    void changeReview(ReviewDto reviewDto) throws Exception;
    void deleteReview(ReviewDto reviewDto) throws Exception;

    int getReview(int productNum) throws Exception;
}
