package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartMapper testMapper;


    @Override
    public void insertCart(CartDto cartDto) throws Exception {
        testMapper.deleteCart(cartDto);
        testMapper.insertCart(cartDto);
    }

    @Override
    public List<CartDto> selectCart(String userId) throws Exception {
        return testMapper.selectCart(userId);
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
    public void insertReview(ReviewDto reviewDto) throws Exception {
        testMapper.insertReview(reviewDto);
    }


}

