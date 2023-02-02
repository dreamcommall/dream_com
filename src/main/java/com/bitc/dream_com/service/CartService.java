package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.*;

import java.util.List;


public interface CartService {
    void insertCart(CartDto cartDto) throws Exception;

    List<CartDto> selectCart(String userId) throws Exception;

    void updateCart(CartDto cartDto) throws Exception;

    void deleteCart(CartDto cartdto) throws Exception;


    void insertReview(ReviewDto reviewDto) throws Exception;
}
