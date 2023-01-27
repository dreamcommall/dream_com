package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.WishListDto;

import java.util.List;

public interface WishlistService {
    List<WishListDto> getWishList(String userId) throws Exception;

    void updateWishList(String userId, int productNum) throws Exception;

    void deleteWishList(String userId, int productNum) throws Exception;
}
