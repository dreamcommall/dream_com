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

    //    제품 테이블 최신 5개 불러오기
    @Override
    public List<ProductDto> getRecentProduct() throws Exception {
        return testMapper.getRecentProduct();
    }

    @Override
    public void updateProduct(int num, String title, String name, int price, int discount, int quantity, String delivery, int click) throws Exception{
        testMapper.updateProduct(num, title, name, price, discount, quantity, delivery, click);
    }

    //    제품 테이블에서 랜덤 1개 불러오기
    @Override
    public List<ProductDto> getRandomProduct() throws Exception {
        return testMapper.getRandomProduct();
    }

    //    클릭 수 높은 10개 가져오기 (스케줄러)
    @Override
    public List<ProductDto> getTopClickedProduct() throws Exception {
        return testMapper.getTopClickedProduct();
    }

    //    hitcount에 들어가 있던 데이터 삭제 (스케줄러)
    @Override
    public void deleteHitCount() throws Exception {
        testMapper.deleteHitCount();
    }

    //    hitcount 업데이트
    @Override
    public void updateClickCount(List list) throws Exception {
        testMapper.updateClickCount(list);
    }

    //        스펙 불러오기
    @Override
    public List<SpecDto> getProductSpec(int productNum) throws Exception {
        return testMapper.getProductSpec(productNum);
    }

    //    상세페이지 상품 정보 불러오기
    @Override
    public List<ProductDto> fullProductInfo(int productNum) throws Exception {
        return testMapper.fullProductInfo(productNum);
    }

    //    이미지 불러오기
    @Override
    public List<ProductImgDto> getProductImg(int productNum) throws Exception {
        return testMapper.getProductImg(productNum);
    }

    //    클릭 수가 높은 제품 정보 불러오기
    @Override
    public List<ProductDto> topClickedProduct() throws Exception {
        return testMapper.topClickedProduct();
    }

    //        찜목록 product_num으로 제품 테이블에서 정보 가져오기
    @Override
    public List<ProductDto> productData(int productNum) throws Exception {
        return testMapper.productData(productNum);
    }

    //    카테고리별 제품 정보 불러오기
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
