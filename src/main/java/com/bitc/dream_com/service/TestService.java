package com.bitc.dream_com.service;


import com.bitc.dream_com.dto.ProductDto;

import java.util.List;

public interface TestService {
    List<ProductDto> getProductData() throws Exception;
    List<ProductDto> getProductData10() throws Exception;

    void updateProduct(int num, String title, String name, int price, int discount, int quantity, String delivery, int click) throws Exception;
}
