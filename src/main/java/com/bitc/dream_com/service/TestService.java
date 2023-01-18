package com.bitc.dream_com.service;


import com.bitc.dream_com.dto.*;

import java.util.List;

public interface TestService {
    List<ProductDto> getRecentProduct() throws Exception;
    List<ProductDto> getProductData10() throws Exception;

    void updateProduct(int num, String title, String name, int price, int discount, int quantity, String delivery, int click) throws Exception;

    List<ProductDto> getRandomProduct() throws Exception;

    List<ProductDto> getTopClickedProduct() throws Exception;

    void deleteHitCount() throws Exception;

    void updateClickCount(List list) throws Exception;

    List<SpecDto> getProductSpec(int productNum) throws Exception;

    List<ProductDto> fullProductInfo(int productNum) throws Exception;

    List<ProductImgDto> getProductImg(int productNum) throws Exception;

    List<ProductDto> topClickedProduct() throws Exception;

    List<ProductDto> productData(int productNum) throws Exception;

    List<ProductDto> type1Product() throws Exception;
    List<ProductDto> type2Product() throws Exception;
    List<ProductDto> type3Product() throws Exception;
    List<ProductDto> type4Product() throws Exception;
    List<ProductDto> type5Product() throws Exception;
}
