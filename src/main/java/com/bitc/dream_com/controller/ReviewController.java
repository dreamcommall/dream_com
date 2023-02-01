package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.ReviewDto;
import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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
        return reviewService.productReview(productNum);
    }

//    사용자 리뷰 보기
//    최종 수정일 2023-01-26
//    최종 작성자 : 양민호
    @RequestMapping(value = "userReview", method = RequestMethod.GET)
    public Object userReview(@RequestParam("userId") String userId) throws Exception {
        return reviewService.userReview(userId);
    }

//    기능 : 리뷰 작성하기 (insert 완료 후 결과 반환)
//    최종 수정일 : 2023-02-01
//    최종 작성자 : 양민호 (최초 작성자 김영민)

    @RequestMapping(value = "/insertDetailReview", method = RequestMethod.GET)
    public int insertDetailReview(ReviewDto reviewDto) throws Exception{
        int result = reviewService.insertDetailReview(reviewDto);

//        입력한 리뷰의 리뷰번호 받아오는 부분
        List<ReviewDto> data = reviewService.selectReviewNum(reviewDto);
        int reviewNum = data.get(0).getReviewNum();
        reviewDto.setReviewNum(reviewNum);

        reviewService.insertSimpleReview(reviewDto);
//        리뷰번호가 제대로 받아와 지지 않을 때가 있어서 확인용도
        System.out.println(reviewNum);

        return result;
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


//    리뷰 작성 시 첨부한 사진 저장 / 경로 반환
//    최종 수정일 2023-02-01
//    최종 작성자 : 양민호
    @RequestMapping(value = "saveUploadImg", method = RequestMethod.POST)
    public String saveUploadImg(@RequestParam(value = "file", required = false) MultipartFile[] multipartFiles,
                       @RequestParam(value = "userId", required = false) String userId,
                       @RequestParam(value = "productNum", required = false) String productNum) throws Exception {
//        객체타입을 문자열로 변환하여 가져온 파라미터 정보를 Dto타입으로 변환
        ProductDto product = new ObjectMapper().readValue(productNum, ProductDto.class);
        UserDto user = new ObjectMapper().readValue(userId, UserDto.class);
        // 새롭게 저장할 파일 명
        String fileId = user.getUserId() + "_" + product.getProductNum();

//        이미지 파일 저장될 경로
        String UPLOAD_PATH = "C:\\java505\\intelliJ\\react\\dream_com\\dream_com_front\\public\\images\\reviewImage";
        try {
            for(int i = 0; i < multipartFiles.length; i++) {
                MultipartFile file = multipartFiles[i];
                // 원본 파일 ex) 파일.jpg
                String originName = file.getOriginalFilename();
                // 확장자 ex) jpg
                String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);
                // 원본 파일이름 ex) 파일
                originName = originName.substring(0, originName.lastIndexOf("."));
                // 파일 사이즈
                long fileSize = file.getSize();


                File fileSave = new File(UPLOAD_PATH, fileId + "." + fileExtension);
                // 폴더가 없을 경우 폴더 만들기
                if(!fileSave.exists()) {
                    fileSave.mkdirs();
                }

                // fileSave의 형태로 파일 저장
                file.transferTo(fileSave);
            }
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return UPLOAD_PATH + fileId;
    }
}
