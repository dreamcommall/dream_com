package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.WishListDto;
import com.bitc.dream_com.mapper.WishlistMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistServiceImpl implements WishlistService{
    @Autowired
    private WishlistMapper wishlistMapper;

    @Override
    public List<WishListDto> getWishList(String userId) throws Exception {
        return wishlistMapper.getWishList(userId);
    }

    @Override
    public void updateWishList(String userId, int productNum) throws Exception {
        wishlistMapper.updateWishList(userId, productNum);
    }

    @Override
    public void deleteWishList(String userId, int productNum) throws Exception {
        wishlistMapper.deleteWishList(userId, productNum);
    }
}
