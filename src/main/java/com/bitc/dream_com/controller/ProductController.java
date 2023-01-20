package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.service.ProductService;
import com.bitc.dream_com.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ReviewService reviewService;

//    성능목록 저장될 배열
    List<Object> specData = new ArrayList<>();

//    제조사목록 저장될 배열
    List<Object> companyData = new ArrayList<>();

//    이미지 경로 저장될 변수
    String thumbnail = "";
    String mainPage = "";
    String detailImg = "";
    List<Object> carousel = new ArrayList<>();

//    평점이 저장될 변수
    double score = 0;

//  상세 정보 저장될 dto
    ProductDetail productDetail;

//
    public Object getFullData(List<ProductDto> dtoList) throws Exception{
        List<ProductDetail> fullData = new ArrayList<>();
        List<ProductDto> list = dtoList;
        System.out.println(list);
//        상세 정보 저장
        for(int i = 0; i< dtoList.size(); i++) {
            int productNum = dtoList.get(i).getProductNum();
//            키값 설정하기
            dtoList.get(i).setKey(i);

//            썸네일 이미지 불러오기
            List<ProductImgDto> img = productService.getProductImg(productNum);
//            썸네일 이미지 경로 저장
            for(ProductImgDto j : img) {
                if (j.getImgPath().contains("thumbnail")) {
                    thumbnail = j.getImgPath();
                }
            }

//            평점 불러오기
            List<ReviewDto> reviewScore = reviewService.getScore(productNum);
            for(ReviewDto j : reviewScore) {
                score += j.getScore();
            }
//            평점 저장
            score = score / reviewScore.size();

//            데이터 취합하기
            productDetail = new ProductDetail(thumbnail, score);
//            데이터 리스트에 넣기
            fullData.add(productDetail);
        }

        System.out.println(fullData);
        return fullData;
    }

//    제품 테이블 최신 5개 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getRecentProduct", method = RequestMethod.GET)
    public Object getRecentProduct() throws Exception {
        List<ProductDto> recentProduct = productService.getRecentProduct();

        return getFullData(recentProduct);
    }


//    제품 테이블에서 랜덤 1개 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getRandomProduct", method = RequestMethod.GET)
    public Object getRandomProduct() throws Exception {
        List<ProductDto> randomProduct = productService.getRandomProduct();

        return getFullData(randomProduct);
    }


//    상세페이지 상품 정보 불러오기 (수정중)
//    최종 수정일 2023-01-20
//    최종 작성자 : 양민호
    @RequestMapping(value = "/fullProductInfo", method = RequestMethod.GET)
    public Object fullProductInfo(@RequestParam("productNum") int productNum) throws Exception {
        List<ProductDto> products = productService.fullProductInfo(productNum);
//        키 값 설정
        for(int i = 0; i< products.size(); i++) {
            products.get(i).setKey(i);
        }

        ProductDto productDto = new ProductDto();
//        스펙 불러오기
        List<SpecDto> spec = productService.getProductSpec(productNum);
        for(SpecDto i: spec) {
            specData.clear();
            specData.add(i.getPartName());
        }
//        이미지 불러오기
        List<ProductImgDto> img = productService.getProductImg(productNum);
        for(ProductImgDto i : img) {
            if(i.getImgPath().contains("thumbnail")) {
                thumbnail = i.getImgPath();
            }
            else if(i.getImgPath().contains("carousel")) {
                carousel.add(i.getImgPath());
            }
            else if(i.getImgPath().contains("mainPage")) {
                mainPage = i.getImgPath();
            }
            else {
                detailImg = i.getImgPath();
            }
        }
//        제조사 불러오기
        List<CompanyDto> company = productService.getCompany(productNum);
        for(CompanyDto i : company) {
            companyData.clear();
            companyData.add(i.getCompanyName());
        }
//        평점 불러오기
        List<ReviewDto> reviewScore = reviewService.getScore(productNum);
        for(ReviewDto i : reviewScore) {
            score += i.getScore();
        }
        score = score / reviewScore.size();
//        제품 데이터 하나로 저장
        productDetail = new ProductDetail(companyData, specData, carousel, score);


        return productDetail;
    }

//    클릭 수가 높은 제품 정보 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/topClickedProduct", method = RequestMethod.GET)
    public Object topClickedProduct() throws Exception {
//        hitcount 테이블 정보 불러오기
        List<ProductDto> topClick = productService.topClickedProduct();

//        키 값 설정
        for(int i = 0; i< topClick.size(); i++) {
            topClick.get(i).setKey(i);
        }

        return topClick;
    }

//    카테고리별 제품 정보 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "categoryProduct", method = RequestMethod.GET)
    public Object categoryProduct() throws Exception {
        List<ProductDto> type1 = productService.type1Product();
        List<ProductDto> type2 = productService.type2Product();
        List<ProductDto> type3 = productService.type3Product();
        List<ProductDto> type4 = productService.type4Product();
        List<ProductDto> type5 = productService.type5Product();

        Map<String, Object> category = new HashMap<>();
        category.put("desktop", type1);
        category.put("laptop", type2);
        category.put("keyboard", type3);
        category.put("mouse", type4);
        category.put("monitor", type5);

        return category;
    }

//    제품 테이블 업데이트 (관리자 페이지 완성 시 사용됨, where절 변수 재설정필요)
//    최종 수정일 2023-01-19
//    최종 작성자 : 양민호
    @RequestMapping(value = "/updateProduct", method = RequestMethod.PUT)
    public String updateProduct(ProductDto productDto) throws Exception {
        productService.updateProduct(productDto);
        return "업데이트 성공";
    }


//    검색결과 불러오기 (미완성, 수정필요, 제품 데이터 불러오는 부분 먼저 손보고 있는 중)
//    최종 수정일 2023-01-19
//    최종 작성자 : 양민호
    @RequestMapping(value = "searchProduct", method = RequestMethod.GET)
    public String searchProduct(@RequestParam("keyword") String searchWord) throws Exception{
//        검색어 띄어쓰기 단위로 자르기
        String[] word = searchWord.split(" ");

//        단어별 검색
        for(int i = 0; i < word.length; i++) {
            List<ProductDto> result = productService.searchProduct(word[i]);
//            검색 결과가 존재할 경우
            if(result.size() > 0) {
                for(int j = 0; j < result.size(); j++) {
                    ProductDto idx = result.get(i);
//                    검색 결과가 속해있는 컬럼의 풀네임으로 키워드 저장
//                    제품 번호를 키워드로 저장
                    if(String.valueOf(idx.getProductNum()).contains(word[i])) {
//                        키워드에 같은 값이 존재하지 않으면 추가
                        int val = productService.searchKeyword(String.valueOf(idx.getProductNum()));
                        if(val == 0) {
                            productService.setKeyword(String.valueOf(idx.getProductNum()), idx.getProductNum());
                        }
//                        해당 키워드 카운트 + 1

                    }
//                    제품 제목의 경우 검색 단어를 저장
                    if(idx.getProductTitle().contains(word[i])) {
                        int val = productService.searchKeyword(idx.getProductTitle());
                        if(val == 0) {
                            productService.setKeyword(idx.getProductTitle(), idx.getProductNum());
                        }

                    }
//                    제품 이름을 키워드로 저장
                    if(idx.getProductName().contains(word[i])) {
                        int val = productService.searchKeyword(idx.getProductName());
                        if(val == 0) {
                            productService.setKeyword(idx.getProductName(), idx.getProductNum());
                        }

                    }
//                    제품 카테고리를 키워드로 저장
                    if(idx.getTypeName().contains(word[i])) {
                        int val = productService.searchKeyword(idx.getTypeName());
                        if(val == 0) {
                            productService.setKeyword(idx.getTypeName(), idx.getProductNum());
                        }

                    }
//                    제조사 이름을 키워드로 저장


//                    성능 이름을 키워드로 저장

                }
            }
        }

        return "";
    }
}
