package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ReviewDto;
import com.bitc.dream_com.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
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

//    소음 리뷰 메세지
//    최종 수정일 2023-01-31
//    최종 작성자 : 양민호
    @RequestMapping(value = "simpleReviewMsg", method = RequestMethod.GET)
    public Object simpleReviewMsg() throws Exception {
//        간단 리뷰 메시지 불러오기
        List<ReviewDto> noiseMsg = reviewService.noiseMsg();
        List<ReviewDto> specMsg = reviewService.specMsg();
        List<ReviewDto> packagingMsg = reviewService.packagingMsg();
        List<ReviewDto> deliveryMsg = reviewService.deliveryMsg();

//        리뷰 메세지 저장할 리스트
        List<Object> noiseMsgList = new ArrayList<>();
        List<Object> specMsgList = new ArrayList<>();
        List<Object> packagingMsgList = new ArrayList<>();
        List<Object> deliveryMsgList = new ArrayList<>();

//        소음리뷰 메세지 저장
        for(int i = 0; i < noiseMsg.size(); i++) {
            HashMap<String, Object> noiseMsgMap = new HashMap<>();
            noiseMsgMap.put("key", noiseMsg.get(i).getNReviewNum());
            noiseMsgMap.put("msg", noiseMsg.get(i).getNReviewMsg());
            noiseMsgList.add(noiseMsgMap);
        }

//        성능리뷰 메세지 저장
        for(int i = 0; i < specMsg.size(); i++) {
            HashMap<String, Object> specMsgMap = new HashMap<>();
            specMsgMap.put("key", specMsg.get(i).getSReviewNum());
            specMsgMap.put("msg", specMsg.get(i).getSReviewMsg());
            specMsgList.add(specMsgMap);
        }

//        포장상태 메세지 저장
        for(int i = 0; i < packagingMsg.size(); i++) {
            HashMap<String, Object> packagingMsgMap = new HashMap<>();
            packagingMsgMap.put("key", packagingMsg.get(i).getPReviewNum());
            packagingMsgMap.put("msg", packagingMsg.get(i).getPReviewMsg());
            packagingMsgList.add(packagingMsgMap);
        }

//        배송상태 메세지 저장
        for(int i = 0; i < deliveryMsg.size(); i++) {
            HashMap<String, Object> deliveryMsgMap = new HashMap<>();
            deliveryMsgMap.put("key", deliveryMsg.get(i).getDReviewNum());
            deliveryMsgMap.put("msg", deliveryMsg.get(i).getDReviewMsg());
            deliveryMsgList.add(deliveryMsgMap);
        }
        HashMap<String, Object> simpleReviewMsg = new HashMap<>();
        simpleReviewMsg.put("noise", noiseMsgList);
        simpleReviewMsg.put("spec", specMsgList);
        simpleReviewMsg.put("packaging", packagingMsgList);
        simpleReviewMsg.put("delivery", deliveryMsgList);

        return simpleReviewMsg;
    }
}
