package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.ProductDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {
    List<ProductDto> getProductData() throws Exception;
    List<ProductDto> getProductData10() throws Exception;

    void updateProduct(int num, String title, String name, int price, int discount, int quantity, String delivery, int click) throws Exception;
}
