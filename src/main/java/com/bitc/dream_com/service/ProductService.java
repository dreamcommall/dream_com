package com.bitc.dream_com.service;


import com.bitc.dream_com.dto.*;

import java.util.List;

public interface ProductService {
    //    제품 테이블 최신 5개 불러오기
    List<ProductDto> getRecentProduct() throws Exception;

    void updateProduct(ProductDto productDto) throws Exception;

    //    제품 테이블에서 랜덤 1개 불러오기
    List<ProductDto> getRandomProduct() throws Exception;

    //    클릭 수 높은 10개 가져오기 (스케줄러)
    List<ProductDto> getTopClickedProduct() throws Exception;

    //    hitcount에 들어가 있던 데이터 삭제 (스케줄러)
    void deleteHitCount() throws Exception;

    //    hitcount 업데이트
    void updateClickCount(List list) throws Exception;

    //    스펙 불러오기
    List<SpecDto> getProductSpec(int productNum) throws Exception;

    //    상세페이지 상품 정보 불러오기
    List<ProductDto> fullProductInfo(int productNum) throws Exception;

    //    이미지 불러오기
    List<ProductImgDto> getProductImg(int productNum) throws Exception;

    //    클릭 수가 높은 제품 정보 불러오기
    List<ProductDto> topClickedProduct() throws Exception;

    //    찜목록 product_num으로 제품 테이블에서 정보 가져오기
    List<ProductDto> productData(int productNum) throws Exception;

    //    카테고리별 제품 정보 불러오기
    List<ProductDto> type1Product() throws Exception;
    List<ProductDto> type2Product() throws Exception;
    List<ProductDto> type3Product() throws Exception;
    List<ProductDto> type4Product() throws Exception;
    List<ProductDto> type5Product() throws Exception;

//    검색 결과 불러오기
    List<ProductDto> searchProduct(String word) throws Exception;

//    키워드 검색
    int searchKeyword(String keyword) throws Exception;

//    키워드 등록
    void setKeyword(String keyword, int productNum) throws Exception;

    List<CompanyDto> getCompany(int productNum) throws Exception;
}
