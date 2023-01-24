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
    public List<ReviewDto> review() throws Exception {
        return reviewMapper.review();
    }

    @Override
    public List<ReviewDto> getScore(int productNum) throws Exception {
        return reviewMapper.getScore(productNum);
    }

    @Override
    public void insertDetailReview(ReviewDto reviewDto) throws Exception {
        reviewMapper.insertDetailReview(reviewDto);
    }

    @Override
    public void insertSimpleReview(ReviewDto reviewDto) throws Exception {
        reviewMapper.insertSimpleReview(reviewDto);
    }

    @Override
    public List<ReviewDto> selectReviewNum(ReviewDto reviewDto) throws Exception {
        return reviewMapper.selectReviewNum(reviewDto);
    }
}
