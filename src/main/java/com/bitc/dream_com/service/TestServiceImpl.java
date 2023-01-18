package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.HitCountDto;
import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.ProductImgDto;
import com.bitc.dream_com.dto.SpecDto;
import com.bitc.dream_com.mapper.TestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService{
    @Autowired
    private TestMapper testMapper;

    @Override
    public List<ProductDto> getRecentProduct() throws Exception {
        return testMapper.getRecentProduct();
    }
    @Override
    public List<ProductDto> getProductData10() throws Exception {
        return testMapper.getProductData10();
    }

    @Override
    public void updateProduct(int num, String title, String name, int price, int discount, int quantity, String delivery, int click) throws Exception{
        testMapper.updateProduct(num, title, name, price, discount, quantity, delivery, click);
    }

    @Override
    public List<ProductDto> getRandomProduct() throws Exception {
        return testMapper.getRandomProduct();
    }

    @Override
    public List<ProductDto> getTopClickedProduct() throws Exception {
        return testMapper.getTopClickedProduct();
    }

    @Override
    public void deleteHitCount() throws Exception {
        testMapper.deleteHitCount();
    }

    @Override
    public void updateClickCount(List list) throws Exception {
        testMapper.updateClickCount(list);
    }

    @Override
    public List<SpecDto> getProductSpec(int productNum) throws Exception {
        return testMapper.getProductSpec(productNum);
    }

    @Override
    public List<ProductDto> fullProductInfo(int productNum) throws Exception {
        return testMapper.fullProductInfo(productNum);
    }

    @Override
    public List<ProductImgDto> getProductImg(int productNum) throws Exception {
        return testMapper.getProductImg(productNum);
    }

    @Override
    public List<ProductDto> topClickedProduct() throws Exception {
        return testMapper.topClickedProduct();
    }

    @Override
    public List<ProductDto> productData(int productNum) throws Exception {
        return testMapper.productData(productNum);
    }

    @Override
    public List<ProductDto> type1Product() throws Exception {
        return testMapper.type1Product();
    }

    @Override
    public List<ProductDto> type2Product() throws Exception {
        return testMapper.type2Product();
    }

    @Override
    public List<ProductDto> type3Product() throws Exception {
        return testMapper.type3Product();
    }

    @Override
    public List<ProductDto> type4Product() throws Exception {
        return testMapper.type4Product();
    }

    @Override
    public List<ProductDto> type5Product() throws Exception {
        return testMapper.type5Product();
    }
}
