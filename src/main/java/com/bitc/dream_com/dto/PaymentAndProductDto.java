package com.bitc.dream_com.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
@Getter
@Setter
@ToString
public class PaymentAndProductDto extends ProductDetail{
    private int paymentNum;
    private String paymentDate;
    private String deliveryAddr;
    private int methodNum;
    private String methodName;
    private String userId;
    private int quantity;
    private int price;
    private String request;
    private int state;

    public PaymentAndProductDto(ProductDto productDto, List company, List part, String thumbnailImg, List carouselImg, String mainPageImg, String detailImg, double reviewScore, int reviewCount) {
        super(productDto, company, part, thumbnailImg, carouselImg, mainPageImg, detailImg, reviewScore, reviewCount);
    }


    public void setPaymentDto(PaymentDto paymentDto) {
        setPaymentNum(paymentDto.getPaymentNum());
        setPaymentDate(paymentDto.getPaymentDate());
        setDeliveryAddr(paymentDto.getDeliveryAddr());
        setMethodNum(paymentDto.getMethodNum());
        setMethodName(paymentDto.getMethodName());
        setUserId(paymentDto.getUserId());
        setQuantity(paymentDto.getQuantity());
        setPrice(paymentDto.getPrice());
        setRequest(paymentDto.getRequest());
        setState(paymentDto.getState());
    }
}
