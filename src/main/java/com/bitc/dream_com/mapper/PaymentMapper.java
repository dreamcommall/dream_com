package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.PaymentDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PaymentMapper {
//    결제내역 불러오기
    List<PaymentDto> paymentData(String userId) throws Exception;

//    결제취소
    void cancelPayment(String userId, int paymentNum) throws Exception;

//    구매 / 결제완료 (결제내역 추가)
    void buy(PaymentDto paymentDto) throws Exception;

//    전체 결제번호 데이터
    List<PaymentDto> usedNum() throws Exception;
}