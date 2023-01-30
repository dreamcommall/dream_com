package com.bitc.dream_com.dto;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class ProductDetail extends ProductDto{
    private List companyName;
    private List partName;
    private String thumbnailImg;
    private List carouselImg;
    private String mainPageImg;
    private String detailImg;

    private double score;
    private int reviewNumber;

    public ProductDetail(ProductDto productDto, List company, List part, String thumbnailImg, List carouselImg,
                         String mainPageImg, String detailImg, double reviewScore, int reviewNumber) {
        setProductDto(productDto);

        this.companyName = company;
        this.partName = part;
        this.thumbnailImg = thumbnailImg;
        this.carouselImg = carouselImg;
        this.mainPageImg = mainPageImg;
        this.detailImg = detailImg;
        this.score = reviewScore;
        this.reviewNumber = reviewNumber;
    }

    public void setProductDto(ProductDto productDto) {
        setProductNum(productDto.getProductNum());
        setProductName(productDto.getProductName());
        setProductPrice(productDto.getProductPrice());
        setProductTitle(productDto.getProductTitle());
        setProductDiscount(productDto.getProductDiscount());
        setProductCreateDt(productDto.getProductCreateDt());
        setDeliveryInfo(productDto.getDeliveryInfo());
        setInventoryQuantity(productDto.getInventoryQuantity());
        setClickCount(productDto.getClickCount());
        setTypeName(productDto.getTypeName());
        setTypeNum(productDto.getTypeNum());
    }
}
