package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.PaymentDto;
import com.bitc.dream_com.mapper.PaymentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentMapper paymentMapper;

//    결제내역 불러오기
    @Override
    public List<PaymentDto> paymentData(String userId) throws Exception {
        return paymentMapper.paymentData(userId);
    }

//    결제취소
    @Override
    public void cancelPayment(String userId, int paymentNum) throws Exception {
        paymentMapper.cancelPayment(userId, paymentNum);
    }

//    구매 / 결제완료 (결제내역 추가)
    @Override
    public int buy(PaymentDto paymentDto) throws Exception {
        return paymentMapper.buy(paymentDto);
    }

//    전체 결제번호 데이터
    @Override
    public List<PaymentDto> usedNum() throws Exception {
        return paymentMapper.usedNum();
    }

    @Override
    public int insertPaymentDetail(PaymentDto paymentDto) throws Exception {
        return paymentMapper.insertPaymentDetail(paymentDto);
    }
}
