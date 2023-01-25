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
        List<ProductDto> list = new ArrayList<>();
        ProductDto products = productService.productData(productNum);
        list.add(products);

        return getFullData(list);
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

//    제품 카테고리 목록
//    최종 수정일 2023-01-25
//    최종 작성자 : 양민호
    @RequestMapping(value = "/type", method = RequestMethod.GET)
    public Object type() throws Exception {
        List<TypeDto> type = productService.type();
        return type;
    }

//    제조사 카테고리 목록
//    최종 수정일 2023-01-25
//    최종 작성자 : 양민호
    @RequestMapping(value = "/company", method = RequestMethod.GET)
    public Object company() throws Exception {
        List<CompanyDto> company = productService.company();
        return company;
    }


//    검색결과 불러오기 (데이터 불러오기 완료, 검색 시 결과 우선순위 미정)
//    최종 수정일 2023-01-25
//    최종 작성자 : 양민호
    @RequestMapping(value = "searchProduct", method = RequestMethod.GET)
    public Object searchProduct(@RequestParam("keyword") String searchWord) throws Exception {
//        검색어 띄어쓰기 단위로 자르기
        String[] word = searchWord.split(" ");

//        검색 결과 제품번호가 저장될 배열
        List searchData1 = new ArrayList<>();
        List searchData2 = new ArrayList<>();

//        단어별 검색
        for (int i = 0; i < word.length; i++) {
            System.out.println("-------------------------");
            List<ProductDto> result = productService.searchProduct(word[i]);
//            검색 결과가 존재할 경우
            if (result.size() > 0) {
                for (int j = 0; j < result.size(); j++) {
                    ProductDto idx = result.get(j);

//                        첫 단어 검색 결과 1번 리스트에 저장
                    if(i == 0) {
                        searchData1.add(idx.getProductNum());
                    }
//                         두 번째 단어부터는 첫 번째 단어 검색결과와 비교하여 일치하는 부분만 2번리스트에 추가
                    else {
                        for(int k = 0; k < searchData1.size(); k++) {
                            int productNum = (int) searchData1.get(k);
                            if(idx.getProductNum() == productNum) {
                                searchData2.add(idx.getProductNum());
                            }
                        }
//                        두 번째 단어 검색 결과 마지막일 경우 1번 리스트 초기화
                        if(j == result.size() -1) {
                            searchData1.clear();
                        }
                    }
                }
            }
//            2번 리스트 결과를 1번 리스트에 추가
            searchData1.addAll(searchData2);
            searchData2.clear();
        }

//        1번 리스트에 저장된 값들의 제품정보를 불러온 후 search 리스트에 저장
//        search 리스트에 저장된 정보의 상세정보 취합
        List<ProductDto> search = new ArrayList<>();
        for(int i = 0; i < searchData1.size(); i++) {
            ProductDto list = productService.productData((Integer) searchData1.get(i));
            search.add(list);
        }

        return getFullData(search);
    }





//------------------------------------------------------------------------------






    //  상세 정보 dto
    ProductDetail productDetail;

    // 제품 모든 정보 취합 함수
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
