package com.bitc.dream_com.dto;

import lombok.Data;

@Data
public class CartDto {
    private int idx;
    private int productNum;
    private int quantity;
    private String userId;
}
