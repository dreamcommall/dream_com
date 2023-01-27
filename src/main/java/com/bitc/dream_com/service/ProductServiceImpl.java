package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductMapper productMapper;

    //    제품 테이블 최신 5개 불러오기
    @Override
    public List<ProductDto> getRecentProduct() throws Exception {
        return productMapper.getRecentProduct();
    }

    @Override
    public void updateProduct(ProductDto productDto) throws Exception{
        productMapper.updateProduct(productDto);
    }

    //    제품 테이블에서 랜덤 1개 불러오기
    @Override
    public List<ProductDto> getRandomProduct() throws Exception {
        return productMapper.getRandomProduct();
    }

    //    클릭 수 높은 10개 가져오기 (스케줄러)
    @Override
    public List<ProductDto> getTopClickedProduct() throws Exception {
        return productMapper.getTopClickedProduct();
    }

    //    hitcount에 들어가 있던 데이터 삭제 (스케줄러)
    @Override
    public void deleteHitCount() throws Exception {
        productMapper.deleteHitCount();
    }

    //    hitcount 업데이트
    @Override
    public void updateClickCount(List list) throws Exception {
        productMapper.updateClickCount(list);
    }

    //        스펙 불러오기
    @Override
    public List<SpecDto> getProductSpec(int productNum) throws Exception {
        return productMapper.getProductSpec(productNum);
    }

    //    이미지 불러오기
    @Override
    public List<ProductImgDto> getProductImg(int productNum) throws Exception {
        return productMapper.getProductImg(productNum);
    }

    //    클릭 수가 높은 제품 정보 불러오기
    @Override
    public List<ProductDto> topClickedProduct() throws Exception {
        return productMapper.topClickedProduct();
    }

    //        특정 제품 테이블에서 정보 가져오기
    @Override
    public ProductDto productData(int productNum) throws Exception {
        return productMapper.productData(productNum);
    }

    //    카테고리별 제품 정보 불러오기
    @Override
    public List<ProductDto> typeProduct(int typeNum) throws Exception {
        return productMapper.typeProduct(typeNum);
    }

//    검색 결과 불러오기
    @Override
    public List<ProductDto> searchProduct(String word) throws Exception {
        return productMapper.searchProduct(word);
    }

//    키워드 검색
    @Override
    public int searchKeyword(String keyword) throws Exception {
        return productMapper.searchKeyword(keyword);
    }

//    키워드 등록
    @Override
    public void setKeyword(String keyword, int productNum) throws Exception {
        productMapper.setKeyword(keyword, productNum);
    }

//    해당제품이 속한 제조사 불러오기
    @Override
    public List<CompanyDto> getCompany(int productNum) throws Exception {
        return productMapper.getCompany(productNum);
    }

//    제품 카테고리 불러오기
    @Override
    public List<TypeDto> type() throws Exception {
        return productMapper.type();
    }

//    제조사 카테고리 불러오기
    @Override
    public List<CompanyDto> company() throws Exception {
        return productMapper.company();
    }

    @Override
    public List<ProductDto> searchProductType(String word, String type) throws Exception {
        return productMapper.searchProductType(word, type);
    }

    @Override
    public List<ProductDto> searchProductCompany(String word, List company) throws Exception {
        return productMapper.searchProductCompany(word, company);
    }

    @Override
    public List<ProductDto> searchProductAll(String word, String type, List company) throws Exception {
        return productMapper.searchProductAll(word, type, company);
    }

    @Override
    public List<CompanyDto> categoryCompany(String typeName) throws Exception {
        return productMapper.categoryCompany(typeName);
    }
}
