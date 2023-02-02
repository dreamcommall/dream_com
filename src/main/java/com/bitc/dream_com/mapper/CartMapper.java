package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CartMapper {


      void insertCart(CartDto cartDto) throws Exception;

      List<CartDto> selectCart(String userId) throws Exception;

      void updateCart(CartDto cartDto) throws Exception;

      void deleteCart(CartDto cartdto) throws Exception;



      void insertReview(ReviewDto reviewDto) throws Exception;
}
