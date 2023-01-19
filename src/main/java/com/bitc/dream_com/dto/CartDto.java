package com.bitc.dream_com.dto;

import lombok.Data;

@Data
public class CartDto {
    private int productNum;
    private String userId;
    private int quantity;
    private String productName;
    private int productPrice;
    private String imgPath;
    private String deliveryInfo;
    private int productDiscount;
}
