package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.*;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
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

    //    이미지 불러오기
    List<ProductImgDto> getProductImg(int productNum) throws Exception;

    //    클릭 수가 높은 제품 정보 불러오기
    List<ProductDto> topClickedProduct() throws Exception;

    //    특정 제품 테이블에서 정보 가져오기
    ProductDto productData(int productNum) throws Exception;

    //    카테고리별 제품 정보 불러오기
    List<ProductDto> typeProduct(int typeNum) throws Exception;

//    검색 결과 불러오기
    List<ProductDto> searchProduct(String word, int minPrice, int maxPrice) throws Exception;

//    키워드 검색
    int searchKeyword(String keyword) throws Exception;

//    키워드 등록
    void setKeyword(String keyword, int productNum) throws Exception;

//    해당제품이 속한 제조사 불러오기
    List<CompanyDto> getCompany(int productNum) throws Exception;

//    제품 카테고리 불러오기
    List<TypeDto> type() throws Exception;

//    제조사 카테고리 불러오기
    List<CompanyDto> company(String type) throws Exception;

    List<ProductDto> searchProductType(String word, String type, int minPrice, int maxPrice) throws Exception;

    List<ProductDto> searchProductCompany(String word, List company, int minPrice, int maxPrice) throws Exception;

    List<ProductDto> searchProductAll(String word, String type, List company, int minPrice, int maxPrice) throws Exception;

    List<CompanyDto> categoryCompany(String typeName) throws Exception;

    Page<ProductDto> searchProductList(List productNumList) throws Exception;

    List<ProductDto> searchDiscountProduct(String word, int minPrice, int maxPrice) throws Exception;

    List<ProductDto> searchDiscountProductType(String word, String type, int minPrice, int maxPrice) throws Exception;

    List<ProductDto> searchDiscountProductCompany(String word, List company, int minPrice, int maxPrice) throws Exception;

    List<ProductDto> searchDiscountProductAll(String word, String type, List company, int minPrice, int maxPrice) throws Exception;
}
