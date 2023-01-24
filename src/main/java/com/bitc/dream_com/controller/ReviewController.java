package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ReviewDto;
import com.bitc.dream_com.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

//    기능 : 리뷰 보기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/review", method = RequestMethod.GET)
    public Object review() throws Exception{
        List<ReviewDto> review = reviewService.review();

        return review;
    }

//    기능 : 리뷰 작성하기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/insertDetailReview", method = RequestMethod.GET)
    public void insertDetailReview(ReviewDto reviewDto) throws Exception{
        reviewService.insertDetailReview(reviewDto);

        List<ReviewDto> data = reviewService.selectReviewNum(reviewDto);
        int reviewNum = data.get(0).getReviewNum();
        reviewDto.setReviewNum(reviewNum);

        reviewService.insertSimpleReview(reviewDto);
        System.out.println(reviewDto);
    }

}
