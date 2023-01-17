package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.SpecDto;
import com.bitc.dream_com.dto.WishListDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TestMapper {
    List<ProductDto> getRecentProduct() throws Exception;
    List<ProductDto> getProductData10() throws Exception;

    void updateProduct(int num, String title, String name, int price, int discount, int quantity, String delivery, int click) throws Exception;

    List<ProductDto> getRandomProduct() throws Exception;

    List<ProductDto> getTopClickedProduct() throws Exception;

    void deleteHitCount();

    void updateClickCount(List list) throws Exception;

    List<SpecDto> getProductSpec(int productNum) throws Exception;

    List<ProductDto> getFullProduct(int productNum) throws Exception;
}
