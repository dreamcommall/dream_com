package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.PaymentDto;
import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.service.PaymentService;
import com.bitc.dream_com.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductController productController;

//    결제내역 불러오기
//    최종 수정일 2023-02-02
//    최종 작성자 : 양민호
    @RequestMapping(value = "paymentData", method = RequestMethod.GET)
    public Object paymentData(@RequestParam("userId") String userId) throws Exception {
        List<PaymentDto> paymentData = paymentService.paymentData(userId);
        List<ProductDto> paymentProductList = new ArrayList<>();
        for(PaymentDto item: paymentData) {
            int productNum = item.getProductNum();
            ProductDto paymentProductInfo =productService.productData(productNum);
            paymentProductList.add(paymentProductInfo);
        }

        return productController.getFullData(paymentProductList);
    }

//    결제취소
//    최종 수정일 2023-01-19
//    최종 작성자 : 양민호
    @RequestMapping(value = "cancelPayment", method = RequestMethod.PUT)
    public String cancelPayment(@RequestParam("userId") String userId, @RequestParam("paymentNum") int paymentNum) throws Exception {
        paymentService.cancelPayment(userId, paymentNum);

        return "취소 완료";
    }

//    구매 / 결제완료 (결제내역 추가)
//    최종 수정일 2023-02-05
//    최종 작성자 : 양민호
    @RequestMapping(value = "buy", method = RequestMethod.PUT)
    public boolean buy(@RequestParam("paymentDto") String payment, @RequestParam("paymentDetail") String paymentDetail) throws Exception {
//        formData로 전송한 파라미터 타입에 맞게 변환
        PaymentDto paymentDto = new ObjectMapper().readValue(payment, PaymentDto.class);
        List<Object> details = new ObjectMapper().readValue(paymentDetail, ArrayList.class);

//        랜덤 결제번호 전역변수설정
        int paymentNum = 0;

//        랜덤 결제번호가 결제테이블 결제번호와 일치하는지 검사
        while(true) {
//            판단 변수
            boolean flag = true;

//            랜덤 결제번호 생성
            while(true) {
                paymentNum = (int)(Math.random() * 1000000);

                if(paymentNum > 100000) {
                    break;
                }
            }

//            결제테이블 결제번호 불러오기
            List<PaymentDto> tableNum = paymentService.usedNum();
//            랜덤 번호와 테이블의 저장된 번호가 일치하는지 확인
            for(int i = 0; i < tableNum.size(); i++) {
                int usedNum = tableNum.get(i).getPaymentNum();
//                번호가 일치하면 flag 변경
                if(paymentNum == usedNum) {
                    flag = false;
                }
            }
//            번호가 일치하지 않으면 break
            if(flag == true) {
                break;
            }
        }
//        검사 완료된 번호 Dto에 저장
        paymentDto.setPaymentNum(paymentNum);

//        결제 방법에 따른 번호 설정
        if(paymentDto.getMethodName().equals("kakaopay")) {
            paymentDto.setMethodNum(1);
        } else if (paymentDto.getMethodName().equals("tosspay")) {
            paymentDto.setMethodNum(2);
        } else {
            paymentDto.setMethodNum(3);
        }


//        결제 테이블에 데이터 입력
        int resultPayment = paymentService.buy(paymentDto);

//        결제 상세 테이블에 데이터 입력
        int resultPaymentDetail = paymentService.insertPaymentDetail(paymentNum, details);
//        결제테이블 정규화로 인해 트리거 오류 발생. 트리거 삭제로 인해 재고량 수동 수정부분
        int minusInventoryQuantity = paymentService.minusInventoryQuantity(details);
//        결제 한 제품 장바구니목록에서 삭제
        int deleteCart = paymentService.deleteCart(paymentDto.getUserId(), details);
        if(resultPayment + resultPaymentDetail == 2) {
            return true;
        }


        return false;
    }
}
