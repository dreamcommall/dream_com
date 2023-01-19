package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.PaymentDto;
import com.bitc.dream_com.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

//    결제내역 불러오기
//    최종 수정일 2023-01-19
//    최종 작성자 : 양민호
    @RequestMapping(value = "paymentData", method = RequestMethod.GET)
    public Object paymentData(@RequestParam("userId") String userId) throws Exception {
        List<PaymentDto> paymentData = paymentService.paymentData(userId);

        return paymentData;
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
//    최종 수정일 2023-01-19
//    최종 작성자 : 양민호
    @RequestMapping(value = "buy")
    public Object buy(PaymentDto paymentDto) throws Exception {
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();

//        현재 날짜 시간
        String paymentDate = date + " " + time;

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

//        임시데이터 (추후 삭제 필요)
        paymentDto.setPaymentDate("2023-01-19 16:08:40");
        paymentDto.setDeliveryAddr("우리집");
        paymentDto.setMethodNum(2);
        paymentDto.setProductNum(55555);
        paymentDto.setQuantity(3);
        paymentDto.setPrice(30000);
//        ----------------------

//        요청사항이 없을 경우
        if(paymentDto.getRequest() == null || paymentDto.getRequest() == "") {
            paymentDto.setRequest("없음");
        }

//        결제 테이블에 데이터 입력
        paymentService.buy(paymentDto);

        List<PaymentDto> paymentData = paymentService.paymentData(paymentDto.getUserId());

        return paymentData;
    }
}
