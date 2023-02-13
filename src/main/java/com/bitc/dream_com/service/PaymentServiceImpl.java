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
    public void cancelPayment(String userId, int paymentNum, int productNum) throws Exception {
        paymentMapper.cancelPayment(userId, paymentNum, productNum);
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
    public int insertPaymentDetail(int paymentNum, List<Object> details) throws Exception {
        return paymentMapper.insertPaymentDetail(paymentNum, details);
    }

    @Override
    public int minusInventoryQuantity(List<Object> details) throws Exception{
        return paymentMapper.minusInventoryQuantity(details);
    }

    @Override
    public int deleteCart(String userId, List<Object> details) throws Exception {
        return paymentMapper.deleteCart(userId, details);
    }

    @Override
    public List<PaymentDto> getLaterDelivery() throws Exception {
        return paymentMapper.getLaterDelivery();
    }

    @Override
    public void changeState(int paymentNum, int productNum) throws Exception {
        paymentMapper.changeState(paymentNum, productNum);
    }

    @Override
    public List<PaymentDto> getTodayDelivery() throws Exception {
        return paymentMapper.getTodayDelivery();
    }

    @Override
    public int confirmPurchase(int paymentNum, int productNum) throws Exception {
        return paymentMapper.confirmPurchase(paymentNum, productNum);
    }
}
