package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.ReviewDto;
import com.bitc.dream_com.dto.UserDto;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewDto> productReview(int productNum) throws Exception;

    List<ReviewDto> getScore(int productNum) throws Exception;

    int insertDetailReview(ReviewDto reviewDto) throws Exception;

    void insertSimpleReview(ReviewDto reviewDto) throws Exception;

    List<ReviewDto> selectReviewNum(ReviewDto reviewDto) throws Exception;

    List<ReviewDto> userReview(String userId) throws Exception;

    void changeReview(ReviewDto reviewDto) throws Exception;
    void deleteReview(ReviewDto reviewDto) throws Exception;

    int getReviewCount(int productNum) throws Exception;

    int getContentReviewCount(int productNum) throws Exception;

    int addLikeCount(int reviewNum) throws Exception;

    Page<ReviewDto> getReviewPaging(int productNum) throws Exception;

    List<ReviewDto> noiseMsg() throws Exception;

    List<ReviewDto> specMsg() throws Exception;

    List<ReviewDto> packagingMsg() throws Exception;

    List<ReviewDto> deliveryMsg() throws Exception;
}
