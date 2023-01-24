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


//    제품 테이블 최신 5개 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getRecentProduct", method = RequestMethod.GET)
    public Object getRecentProduct() throws Exception {
        List<ProductDto> recentProduct = productService.getRecentProduct();

//        상품 정보 취합 함수
        return getFullData(recentProduct);
    }


//    제품 테이블에서 랜덤 1개 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getRandomProduct", method = RequestMethod.GET)
    public Object getRandomProduct() throws Exception {
        List<ProductDto> product = productService.getRandomProduct();

        return getFullData(product);
    }


//    상세페이지 상품 정보 불러오기
//    최종 수정일 2023-01-20
//    최종 작성자 : 양민호
    @RequestMapping(value = "/fullProductInfo", method = RequestMethod.GET)
    public Object fullProductInfo(@RequestParam("productNum") int productNum) throws Exception {
        List<ProductDto> products = productService.productData(productNum);

        return getFullData(products);
    }

//    클릭 수가 높은 제품 정보 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/topClickedProduct", method = RequestMethod.GET)
    public Object topClickedProduct() throws Exception {
        List<ProductDto> topClick = productService.topClickedProduct();


        return getFullData(topClick);
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
        category.put("desktop", getFullData(type1));
        category.put("laptop", getFullData(type2));
        category.put("keyboard", getFullData(type3));
        category.put("mouse", getFullData(type4));
        category.put("monitor", getFullData(type5));

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
//    최종 수정일 2023-01-22
//    최종 작성자 : 양민호
    @RequestMapping(value = "searchProduct", method = RequestMethod.GET)
    public String searchProduct(@RequestParam("keyword") String searchWord) throws Exception {
//        검색어 띄어쓰기 단위로 자르기
        String[] word = searchWord.split(" ");

//        단어별 검색
        for (int i = 0; i < word.length; i++) {
            List<ProductDto> result = productService.searchProduct(word[i]);
            int count = 0;
            ProductDto idx = result.get(i);
//            검색 결과가 존재할 경우
            if (result.size() > 0) {
//              검색 단어가 포함된 컬럼 확인
                for (int j = 0; j < result.size(); j++) {
//                    제품 번호 확인
                    if (String.valueOf(idx.getProductNum()).contains(word[i])) {
                        count += 1;
//                        키워드에 같은 값이 존재하지 않으면 추가
                    }
//                    제품 제목 확인
                    if (idx.getProductTitle().contains(word[i])) {
                        count += 1;
                    }
//                    제품 이름 확인
                    if (idx.getProductName().contains(word[i])) {
                        count += 1;
                    }
//                    제품 카테고리 확인
                    if (idx.getTypeName().contains(word[i])) {
                        count += 1;
                    }
//                    제조사 이름 확인
                    List<CompanyDto> company = productService.getCompany(idx.getProductNum());
                    for(CompanyDto c: company) {
                        if(c.getCompanyName().contains(word[i])) {
                            count += 1;
                        }
                    }
//                    성능 이름 확인
                    List<SpecDto> spec = productService.getProductSpec(idx.getProductNum());
                    for(SpecDto s: spec) {
                        if(s.getPartName().contains(word[i])) {
                            count += 1;
                        }
                    }
//                    총 카운트 수 키값에 임시 저장
                    idx.setKey(count);
//                    첫 검색 결과 리스트에 저장
//                    if() {
//                    }
//                    else {
////                        검색 결과를 배열에 저장된 데이터의 count값 (key값)과 비교하여 count가 높으면 해당 index에 저장
////                        (일치하는 결과가 많으면 우선순위를 높임)
//                    }
                }
            }
        }

        return "";
    }

//------------------------------------------------------------------------------

    //  상세 정보 dto
    ProductDetail productDetail;

    // 최근 등록 상품 / 인기 상품
    public Object getFullData(List<ProductDto> dtoList) throws Exception {
        List<ProductDetail> fullData = new ArrayList<>();

//        상세 정보 저장
        for (int i = 0; i < dtoList.size(); i++) {
            int productNum = dtoList.get(i).getProductNum();

//            이미지 경로 저장될 변수
            String thumbnail = "";
            String mainPageImg = "";
            String detailImg = "";
            List<Object> carousel = new ArrayList<>();

//            성능목록 저장될 배열
            List<Object> specData = new ArrayList<>();

//            제조사목록 저장될 배열
            List<Object> companyData = new ArrayList<>();

//            평점이 저장될 변수
            double score = 0;

//            이미지 불러오기
            List<ProductImgDto> img = productService.getProductImg(productNum);
//            썸네일 이미지 경로 저장
            for (ProductImgDto j : img) {
                if (j.getImgPath().contains("thumbnail")) {
                    thumbnail = j.getImgPath();
                }
//            상세페이지 캐러샐 이미지경로 저장
                else if (j.getImgPath().contains("carousel")) {
                    carousel.add(j.getImgPath());
                }
//            메인페이지 캐러샐 이미지경로 저장
                else if (j.getImgPath().contains("mainPage")) {
                    mainPageImg = j.getImgPath();
                }
//            상세페이지 설명 이미지경로 저장
                else {
                    detailImg = j.getImgPath();
                }
            }

//        스펙 불러오기
            List<SpecDto> spec = productService.getProductSpec(productNum);
            for (SpecDto j : spec) {
                specData.add(j.getPartName());
            }

//        제조사 불러오기
            List<CompanyDto> company = productService.getCompany(productNum);
            companyData.clear();
            for (CompanyDto j : company) {
                companyData.add(j.getCompanyName());
            }

//            평점 불러오기
            List<ReviewDto> reviewScore = reviewService.getScore(productNum);

            if(reviewScore.size() > 0) {
                for (ReviewDto j : reviewScore) {
                    score += j.getScore();
                }
//                평점 저장
                score = score / reviewScore.size();
            }

//            데이터 취합하기
            productDetail = new ProductDetail(dtoList.get(i), companyData, specData, thumbnail, carousel, mainPageImg, detailImg, score);
//            데이터 리스트에 넣기
            fullData.add(productDetail);
//            키값 설정하기
            fullData.get(i).setKey(i);
        }

        return fullData;
    }
}
