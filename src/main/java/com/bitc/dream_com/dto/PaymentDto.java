package com.bitc.dream_com.dto;

import lombok.Data;

@Data
public class PaymentDto {
    private int paymentNum;
    private String paymentDate;
    private String deliveryAddr;
    private int methodNum;
    private String methodName;
    private String userId;
    private int productNum;
    private int quantity;
    private int price;
    private String request;
    private int state;
}
