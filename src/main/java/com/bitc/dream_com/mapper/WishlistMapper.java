package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.WishListDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WishlistMapper {
    List<WishListDto> getWishList(String userId) throws Exception;

    void updateWishList(String userId, int productNum) throws Exception;

    void deleteWishList(String userId, int productNum) throws Exception;
}
