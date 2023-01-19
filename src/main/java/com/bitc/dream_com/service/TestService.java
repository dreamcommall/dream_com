package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;


public interface TestService {
    UserDto loginChk(String userId, String userPw) throws Exception;

    List<ReviewDto> review() throws Exception;

    void insertCart(CartDto cartDto) throws Exception;

    List<CartDto> selectCart() throws Exception;

    void updateCart(CartDto cartDto) throws Exception;

    void deleteCart(CartDto cartdto) throws Exception;

    List<AddressDto> address() throws Exception;

    void insertAddress(AddressDto addressDto) throws Exception;

    List<AddressDto> anotherAddress() throws Exception;

    void deleteAddress(AddressDto addressDto) throws Exception;

    void insertReview(ReviewDto reviewDto) throws Exception;
}
