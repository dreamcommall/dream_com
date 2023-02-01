package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.ReviewDto;
import com.bitc.dream_com.mapper.ReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{
    @Autowired
    private ReviewMapper reviewMapper;

    @Override
    public List<ReviewDto> productReview(int productNum) throws Exception {
        return reviewMapper.productReview(productNum);
    }

    @Override
    public List<ReviewDto> getScore(int productNum) throws Exception {
        return reviewMapper.getScore(productNum);
    }

    @Override
    public int insertDetailReview(ReviewDto reviewDto) throws Exception {
        return reviewMapper.insertDetailReview(reviewDto);
    }

    @Override
    public void insertSimpleReview(ReviewDto reviewDto) throws Exception {
        reviewMapper.insertSimpleReview(reviewDto);
    }

    @Override
    public List<ReviewDto> selectReviewNum(ReviewDto reviewDto) throws Exception {
        return reviewMapper.selectReviewNum(reviewDto);
    }

    @Override
    public List<ReviewDto> userReview(String userId) throws Exception {
        return reviewMapper.userReview(userId);
    }

    @Override
    public void changeReview(ReviewDto reviewDto) throws Exception {
        reviewMapper.changeReview(reviewDto);
    }

    @Override
    public void deleteReview(ReviewDto reviewDto) throws Exception {
        reviewMapper.deleteReview(reviewDto);
    }

    @Override
    public int getReview(int productNum) throws Exception {
        return reviewMapper.getReview(productNum);
    }

    @Override
    public List<ReviewDto> noiseMsg() throws Exception {
        return reviewMapper.noiseMsg();
    }

    @Override
    public List<ReviewDto> specMsg() throws Exception {
        return reviewMapper.specMsg();
    }

    @Override
    public List<ReviewDto> packagingMsg() throws Exception {
        return reviewMapper.packagingMsg();
    }

    @Override
    public List<ReviewDto> deliveryMsg() throws Exception {
        return reviewMapper.deliveryMsg();
    }
}
