package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.*;

import java.util.List;


public interface CartService {
    void insertCart(String userId, int productNum, int quantity) throws Exception;

    List<CartDto> selectCart(String userId) throws Exception;

    void updateCart(CartDto cartDto) throws Exception;

    void deleteCart(String userId, int productNum) throws Exception;

    void insertReview(ReviewDto reviewDto) throws Exception;


}
