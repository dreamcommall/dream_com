package com.bitc.dream_com.dto;

import lombok.Data;

@Data
public class ProductDto {
    private int productNum;
    private String productTitle;
    private String productName;
    private int productPrice;
    private int productDiscount;
    private int inventoryQuantity;
    private String productCreateDt;
    private String deliveryInfo;
    private int clickCount;
    private int typeNum;
    private String typeName;
    private int key;
}
