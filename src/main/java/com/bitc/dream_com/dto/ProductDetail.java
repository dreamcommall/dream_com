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

//    상세페이지
    public ProductDetail(List company, List part, List img, double reviewScore) {
        this.companyName = company;
        this.partName = part;
        this.carouselImg = img;
        this.score = reviewScore;
    }

//    최근 인기순위 / 최근 등록 상품
    public ProductDetail(String thumbnailImg, double reviewScore) {
        this.thumbnailImg = thumbnailImg;
        this.score = reviewScore;
    }

    public ProductDetail(String thumbnailImg, List spec) {
        this.thumbnailImg = thumbnailImg;
        this.partName = spec;
    }
}
