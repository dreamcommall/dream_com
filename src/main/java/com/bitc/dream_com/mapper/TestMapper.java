package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.HitCountDto;
import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.ProductImgDto;
import com.bitc.dream_com.dto.SpecDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {
    //    제품 테이블 최신 5개 불러오기
    List<ProductDto> getRecentProduct() throws Exception;

    void updateProduct(int num, String title, String name, int price, int discount, int quantity, String delivery, int click) throws Exception;

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

    //        찜목록 product_num으로 제품 테이블에서 정보 가져오기
    List<ProductDto> productData(int productNum) throws Exception;

    //    카테고리별 제품 정보 불러오기
    List<ProductDto> type1Product() throws Exception;
    List<ProductDto> type2Product() throws Exception;
    List<ProductDto> type3Product() throws Exception;
    List<ProductDto> type4Product() throws Exception;
    List<ProductDto> type5Product() throws Exception;
}
