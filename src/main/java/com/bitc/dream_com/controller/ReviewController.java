package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ReviewDto;
import com.bitc.dream_com.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

//    기능 : 제품 리뷰 보기
//    최종 수정일 : 2023.01.26
//    최종 작성자 : 양민호

    @RequestMapping(value = "/productReview", method = RequestMethod.GET)
    public Object productReview(@RequestParam("productNum") int productNum) throws Exception{
        List<ReviewDto> productReview = reviewService.productReview(productNum);

        return productReview;
    }

//    사용자 리뷰 보기
//    최종 수정일 2023-01-26
//    최종 작성자 : 양민호
    @RequestMapping(value = "userReview", method = RequestMethod.GET)
    public Object userReview(@RequestParam("userId") String userId) throws Exception {
        List<ReviewDto> userReview = reviewService.userReview(userId);

        return userReview;
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

//    리뷰 수정하기
//    최종 수정일 2023-01-26
//    최종 작성자 : 양민호
    @RequestMapping(value = "changeReview", method = RequestMethod.PUT)
    public void changeReview(ReviewDto reviewDto) throws Exception{
        reviewService.changeReview(reviewDto);
    }

//    리뷰 삭제하기
//    최종 수정일 2023-01-26
//    최종 작성자 : 양민호
    @RequestMapping(value = "deleteReview", method = RequestMethod.DELETE)
    public void deleteReview(ReviewDto reviewDto) throws Exception {
        reviewService.deleteReview(reviewDto);
    }

}
