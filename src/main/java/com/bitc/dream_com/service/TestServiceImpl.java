package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.mapper.TestMapper;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService{
    @Autowired
    private TestMapper testMapper;

    @Override
    public UserDto loginChk(String userId, String userPw) throws Exception {
        UserDto userDto = testMapper.loginChk(userId,userPw);
        return userDto;
    }

    @Override
    public List<ReviewDto> review() throws Exception {
        return testMapper.review();
    }

    @Override
    public void insertCart(CartDto cartDto) throws Exception {
        testMapper.insertCart(cartDto);
    }

    @Override
    public List<CartDto> selectCart() throws Exception {
        return testMapper.selectCart();
    }

    @Override
    public void updateCart(CartDto cartDto) throws Exception {
        testMapper.updateCart(cartDto);
    }

    @Override
    public void deleteCart(CartDto cartdto) throws Exception {
        testMapper.deleteCart(cartdto);
    }

    @Override
    public List<AddressDto> address() throws Exception {
        return testMapper.address();
    }

    @Override
    public void insertAddress(AddressDto addressDto) throws Exception {
        testMapper.insertAddress(addressDto);
    }

    @Override
    public List<AddressDto> anotherAddress() throws Exception {
        return testMapper.anotherAddress();
    }

    @Override
    public void deleteAddress(AddressDto addressDto) throws Exception {
        testMapper.deleteAddress(addressDto);
    }

    @Override
    public void insertReview(ReviewDto reviewDto) throws Exception {
        testMapper.insertReview(reviewDto);
    }


}

