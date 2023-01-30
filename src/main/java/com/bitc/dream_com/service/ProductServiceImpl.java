package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.mapper.ProductMapper;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
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
    public List<ProductDto> searchProduct(String word, int minPrice, int maxPrice) throws Exception {
        return productMapper.searchProduct(word, minPrice, maxPrice);
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
    public List<CompanyDto> company(String type) throws Exception {
        return productMapper.company(type);
    }

    @Override
    public List<ProductDto> searchProductType(String word, String type, int minPrice, int maxPrice) throws Exception {
        return productMapper.searchProductType(word, type, minPrice, maxPrice);
    }

    @Override
    public List<ProductDto> searchProductCompany(String word, List company, int minPrice, int maxPrice) throws Exception {
        return productMapper.searchProductCompany(word, company, minPrice, maxPrice);
    }

    @Override
    public List<ProductDto> searchProductAll(String word, String type, List company, int minPrice, int maxPrice) throws Exception {
        return productMapper.searchProductAll(word, type, company, minPrice, maxPrice);
    }

    @Override
    public List<CompanyDto> categoryCompany(String typeName) throws Exception {
        return productMapper.categoryCompany(typeName);
    }

//    검색 페이지 페이징
    @Override
    public Page<ProductDto> searchProductPaging(List productNumList, int pageNum) throws Exception {
        PageHelper.startPage(pageNum, 5);
        return productMapper.searchProductList(productNumList);
    }

    @Override
    public List<ProductDto> searchDiscountProduct(String word, int minPrice, int maxPrice) throws Exception {
        return productMapper.searchDiscountProduct(word, minPrice, maxPrice);
    }

    @Override
    public List<ProductDto> searchDiscountProductType(String word, String type, int minPrice, int maxPrice) throws Exception {
        return productMapper.searchDiscountProductType(word, type, minPrice, maxPrice);
    }

    @Override
    public List<ProductDto> searchDiscountProductCompany(String word, List company, int minPrice, int maxPrice) throws Exception {
        return productMapper.searchDiscountProductCompany(word, company, minPrice, maxPrice);
    }

    @Override
    public List<ProductDto> searchDiscountProductAll(String word, String type, List company, int minPrice, int maxPrice) throws Exception {
        return productMapper.searchDiscountProductAll(word, type, company, minPrice, maxPrice);
    }
}
