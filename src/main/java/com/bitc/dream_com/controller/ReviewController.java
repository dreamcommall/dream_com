package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ReviewDto;
import com.bitc.dream_com.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

//    기능 : 제품 리뷰 보기
//    최종 수정일 : 2023.01.31
//    최종 작성자 : 양민호

    @RequestMapping(value = "/productReview", method = RequestMethod.GET)
    public Object productReview(@RequestParam("productNum") int productNum) throws Exception{
        List<ReviewDto> productReview = reviewService.productReview(productNum);


//        리뷰 작성자 아이디 암호화
        for(int i = 0; i < productReview.size(); i++) {
            String id = productReview.get(i).getUserId();
            if(id.length() <= 6) {
                id = id.substring(0, 2) + ("*".repeat(id.length() - 3)) + id.substring(id.length()-1);
                productReview.get(i).setUserId(id);
            }
            else {
                id = id.substring(0, 3) + ("*".repeat(id.length() - 5)) + id.substring(id.length()-2);
                productReview.get(i).setUserId(id);
            }
        }
//        전체 리뷰 개수
        int totalReviewCount = reviewService.getReviewCount(productNum);
//        후기 작성 리뷰 개수
        int contentReviewCount = reviewService.getContentReviewCount(productNum);

        HashMap<String, Object> review = new HashMap<>();
        review.put("totalReviewCount", totalReviewCount);
        review.put("contentReviewCount", contentReviewCount);
        review.put("reviews", productReview);

        return review;
    }
    
//    리뷰 평점 비율
//    최종 수정일 2023-01-31
//    최종 작성자 : 양민호
    @RequestMapping(value = "reviewRate", method = RequestMethod.GET)
    public Object reviewRate(@RequestParam("productNum") int productNum) throws Exception {
        int pointFive = 0;
        int pointFour = 0;
        int pointThree = 0;
        int pointTwo = 0;
        int pointOne = 0;

        List<ReviewDto> productReview = reviewService.productReview(productNum);
//        제품 리뷰를 불러온 후 리뷰 점수의 개수를 더함
        for(ReviewDto i : productReview) {
            double score = i.getScore();
            if(score == 5) {
                pointFive += 1;
            } else if (score == 4) {
                pointFour += 1;
            } else if (score == 3) {
                pointThree += 1;
            } else if (score == 2) {
                pointTwo += 1;
            }else  {
                pointOne += 1;
            }
        }

        HashMap<String, Integer> point = new HashMap<>();
        point.put("5점", pointFive);
        point.put("4점", pointFour);
        point.put("3점", pointThree);
        point.put("2점", pointTwo);
        point.put("1점", pointOne);
        return point;
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

//    좋아요 클릭 시 개수 증가
//    최종 수정일 2023-01-31
//    최종 작성자 : 양민호
    @RequestMapping(value = "addLikeCount", method = RequestMethod.PUT)
    public String addLikeCount(@RequestParam("reviewNum") int reviewNum) throws Exception {
        int update = reviewService.addLikeCount(reviewNum);
        if(update == 1) {
            return "success";
        }
        else {
            return "fail";
        }
    }

}
