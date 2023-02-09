package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.ReviewDto;
import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.service.ReviewService;
import com.github.pagehelper.PageInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.format.DateTimeFormatters;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
    public Object productReview(@RequestParam("productNum") int productNum, @RequestParam(value = "pageNum", defaultValue = "1") int pageNum) throws Exception{
        PageInfo<ReviewDto> page = new PageInfo<>(reviewService.getReviewPaging(productNum, pageNum), 10);

        List pageList = page.getList();
//        리뷰 작성자 아이디 암호화
        for(int i = 0; i < pageList.size(); i++) {
            String id = page.getList().get(i).getUserId();
            if(id.length() <= 6) {
                id = id.substring(0, 2) + ("*".repeat(id.length() - 3)) + id.substring(id.length()-1);
                page.getList().get(i).setUserId(id);
            }
            else {
                id = id.substring(0, 3) + ("*".repeat(id.length() - 5)) + id.substring(id.length()-2);
                page.getList().get(i).setUserId(id);
            }
        }

//        전체 리뷰 개수
        int totalReviewCount = reviewService.getReviewCount(productNum);
//        후기 작성 리뷰 개수
        int contentReviewCount = reviewService.getContentReviewCount(productNum);

        HashMap<String, Object> review = new HashMap<>();
        review.put("totalReviewCount", totalReviewCount);
        review.put("contentReviewCount", contentReviewCount);
        review.put("reviews", page.getList());
        review.put("currentPage", page.getPageNum());
        review.put("FirstPage", page.getNavigateFirstPage());
        review.put("LastPage", page.getNavigateLastPage());

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
//        현재 시간
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String now = date.format(formatter) + time.getHour() + time.getMinute() + time.getSecond();

        // 새롭게 저장할 파일 명
        String fileId = now + "_" + user.getUserId() + "_" + product.getProductNum();
        String path = new File("./").getCanonicalPath();
        String fileName = "";

//        이미지 파일 저장될 경로
        String UPLOAD_PATH = path + "\\dream_com_front\\public\\images\\reviewImage";
        try {
            for(int i = 0; i < multipartFiles.length; i++) {
                MultipartFile file = multipartFiles[i];
                // 원본 파일 ex) 파일.jpg
                String originName = file.getOriginalFilename();
                // 확장자 ex) jpg
                String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);

                fileName = fileId + "." + fileExtension;
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

        return "/images/reviewImage/" + fileName;
    }
}
