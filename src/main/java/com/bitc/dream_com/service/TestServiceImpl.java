package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.mapper.TestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService{
    @Autowired
    private TestMapper testMapper;

    @Override
    public List<ProductDto> getProductData() throws Exception {
        return testMapper.getProductData();
    }
    @Override
    public List<ProductDto> getProductData10() throws Exception {
        return testMapper.getProductData10();
    }

    @Override
    public void updateProduct(int num, String title, String name, int price, int discount, int quantity, String delivery, int click) throws Exception{
        testMapper.updateProduct(num, title, name, price, discount, quantity, delivery, click);
    }
}
