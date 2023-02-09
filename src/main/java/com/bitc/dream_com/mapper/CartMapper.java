package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CartMapper {


      void insertCart(String userId, int productNum, int quantity) throws Exception;

      List<CartDto> selectCart(String userId) throws Exception;

      void updateCart(CartDto cartDto) throws Exception;

      void deleteCart(String userId, int productNum) throws Exception;

      void insertReview(ReviewDto reviewDto) throws Exception;
}
