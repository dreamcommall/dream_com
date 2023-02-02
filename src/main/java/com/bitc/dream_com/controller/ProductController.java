package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.service.ProductService;
import com.bitc.dream_com.service.ReviewService;
import com.github.pagehelper.PageInfo;
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
//    최종 수정일 2023-02-02
//    최종 작성자 : 양민호
    @RequestMapping(value = "/fullProductInfo", method = RequestMethod.GET)
    public Object fullProductInfo(@RequestParam("productNum") int productNum) throws Exception {
        ProductDto products = productService.productData(productNum);
        if(products == null) {
            return null;
        }
        else {
            return getFullData(products);
        }
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
        int[] typeNum = {1, 2, 3, 4, 5};

        List datas = new ArrayList<>();

        for(int item: typeNum) {
            List<ProductDto> type = productService.typeProduct(item);
            List<CompanyDto> typeCompany = productService.categoryCompany(type.get(0).getTypeName());

            Map<String, Object> category = new HashMap<>();
            List companyList = new ArrayList<>();
            List mainProductInfoList = new ArrayList<>();
            List subProductInfoList = new ArrayList<>();
            List data = new ArrayList<>();

            for(int i = 0; i < typeCompany.size(); i++) {
                Map<String, Object> company = new HashMap<>();
                company.put("key", i);
                company.put("companyList", typeCompany.get(i).getCompanyName());
                companyList.add(company);
            }

            for(int i = 0; i < type.size(); i++) {
                if(i < 3) {
                    mainProductInfoList.add(getFullData(type.get(i)));
                }
                else {
                    int key = type.get(i).getKey();
                    type.get(i).setKey(key - 3);
                    subProductInfoList.add(getFullData(type.get(i)));
                }
            }
            category.put("categoryName", type.get(0).getTypeName());
            category.put("companyList", companyList);
            category.put("key", item - 1);
            category.put("mainProductInfoList", mainProductInfoList);
            category.put("subProductInfoList", subProductInfoList);
            data.add(category);
            datas.add(data);
        }

        return datas;
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
//    최종 수정일 2023-01-31
//    최종 작성자 : 양민호
    @RequestMapping(value = "/company", method = RequestMethod.GET)
    public Object company(@RequestParam(value = "type") String type) throws Exception {
        List<CompanyDto> company = productService.company(type);
        List<Object> companyList = new ArrayList<>();
        for(int i = 0; i < company.size(); i++) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("companyName", company.get(i).getCompanyName());
            map.put("key", i);
            companyList.add(map);
        }
        return companyList;
    }


//    검색결과 불러오기 (데이터 불러오기 완료, 검색 시 결과 우선순위 미정)
//    페이징 처리 완료 2023-01-30 양민호
//    최종 수정일 2023-01-30
//    최종 작성자 : 양민호
    @RequestMapping(value = "searchProduct", method = RequestMethod.GET)
    public Object searchProduct(@RequestParam("keyword") String searchWord, @RequestParam(value = "type", required = false) String type,
                                @RequestParam(value = "company", required = false) List company,
                                @RequestParam(value = "pageNum", defaultValue = "1") int pageNum,
                                @RequestParam(value = "minPrice") int minPrice,
                                @RequestParam(value = "maxPrice") int maxPrice) throws Exception {
//        카테고리 파라미터 미입력 시 변환
        if(type == null) {
            type = "";
        }
//        제조사 파라미터 미입력 시 변환
        if(company == null) {
            company = new ArrayList<>();
        }
//        검색어 띄어쓰기 단위로 자르기
        String[] word = searchWord.split(" ");

        if(maxPrice == 0) {
            maxPrice = 999999999;
        }

//        검색 결과 제품번호가 저장될 배열
        List searchData1 = new ArrayList<>();
        List searchData2 = new ArrayList<>();

//        단어별 검색
        for (int i = 0; i < word.length; i++) {
            List<ProductDto> result = null;
//            카테고리 미선택 시
            if(type.equals("") && company.size() == 0) {
                result = productService.searchProduct(word[i], minPrice, maxPrice);
            }
//            제품 카테고리만 선택 시
            else if(!type.equals("") && company.size() == 0) {
                result = productService.searchProductType(word[i], type, minPrice, maxPrice);
            }
//            제조사 카테고리만 선택 시
            else if(type.equals("") && company.size() != 0) {
                result = productService.searchProductCompany(word[i], company, minPrice, maxPrice);
            }
//            모두 선택 시
            else {
                result = productService.searchProductAll(word[i], type, company, minPrice, maxPrice);
            }


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

//        1번 리스트에 저장된 값들의 제품번호를 productNumList에 저장
        List productNumList = new ArrayList<>();
        for(int i = 0; i < searchData1.size(); i++) {
            productNumList.add(searchData1.get(i));
        }


        PageInfo<ProductDto> page = null;

        HashMap<String, Object> searchPaginationData = new HashMap<>();
        if  (productNumList.size() > 0) {
//        productNumList에 저장된 제품번호로 검색하여 페이징 처리
            page = new PageInfo<>(productService.searchProductPaging(productNumList, pageNum), 10);
            //        페이지 정보 해쉬맵에 저장
            searchPaginationData.put("FirstPage", page.getNavigateFirstPage());
            searchPaginationData.put("LastPage", page.getNavigateLastPage());
            searchPaginationData.put("CurrentPage", page.getPageNum());
            searchPaginationData.put("ProductInfo", getFullData(page.getList()));
            searchPaginationData.put("Login", "ok");
            return searchPaginationData;
        }
        else {
            return page;
        }
    }


//    할인중인 제품 검색결과 불러오기 (데이터 불러오기 완료, 검색 시 결과 우선순위 미정)
//    페이징 처리 완료 2023-01-30 양민호
//    최종 수정일 2023-01-30
//    최종 작성자 : 양민호

    @RequestMapping(value = "searchDiscountProduct", method = RequestMethod.GET)
    public Object searchDiscountProduct(@RequestParam("keyword") String searchWord, @RequestParam(value = "type", required = false) String type,
                                @RequestParam(value = "company", required = false) List company,
                                @RequestParam(value = "pageNum", defaultValue = "1") int pageNum,
                                @RequestParam(value = "minPrice") int minPrice,
                                @RequestParam(value = "maxPrice") int maxPrice) throws Exception {
//        카테고리 파라미터 미입력 시 변환
        if(type == null) {
            type = "";
        }
//        제조사 파라미터 미입력 시 변환
        if(company == null) {
            company = new ArrayList<>();
        }

//        검색어 띄어쓰기 단위로 자르기
        String[] word = searchWord.split(" ");

        if(maxPrice == 0) {
            maxPrice = 999999999;
        }

//        검색 결과 제품번호가 저장될 배열
        List searchData1 = new ArrayList<>();
        List searchData2 = new ArrayList<>();

//        단어별 검색
        for (int i = 0; i < word.length; i++) {
            List<ProductDto> result = null;
//            카테고리 미선택 시
            if(type.equals("") && company.size() == 0) {
                result = productService.searchDiscountProduct(word[i], minPrice, maxPrice);
            }
//            제품 카테고리만 선택 시
            else if(!type.equals("") && company.size() == 0) {
                result = productService.searchDiscountProductType(word[i], type, minPrice, maxPrice);
            }
//            제조사 카테고리만 선택 시
            else if(type.equals("") && company.size() != 0) {
                result = productService.searchDiscountProductCompany(word[i], company, minPrice, maxPrice);
            }
//            모두 선택 시
            else {
                result = productService.searchDiscountProductAll(word[i], type, company, minPrice, maxPrice);
            }


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

//        1번 리스트에 저장된 값들의 제품번호를 productNumList에 저장
        List productNumList = new ArrayList<>();
        for(int i = 0; i < searchData1.size(); i++) {
            productNumList.add(searchData1.get(i));
        }

        PageInfo<ProductDto> page = null;

        HashMap<String, Object> searchPaginationData = new HashMap<>();
        if  (productNumList.size() > 0) {
//        productNumList에 저장된 제품번호로 검색하여 페이징 처리
            page = new PageInfo<>(productService.searchDiscountProductList(productNumList, pageNum), 10);
            //        페이지 정보 해쉬맵에 저장
            searchPaginationData.put("FirstPage", page.getNavigateFirstPage());
            searchPaginationData.put("LastPage", page.getNavigateLastPage());
            searchPaginationData.put("CurrentPage", page.getPageNum());
            searchPaginationData.put("ProductInfo", getFullData(page.getList()));
            searchPaginationData.put("Login", "ok");
            return searchPaginationData;
        }
        else {
            return page;
        }
    }

//    상품 클릭 시 클릭 수 증가
//    최종 수정일 2023-01-31
//    최종 작성자 : 양민호
    @RequestMapping(value = "addClickCount", method = RequestMethod.PUT)
    public String addClickCount(@RequestParam("productNum") int productNum) throws Exception {
        int update = productService.addClickCount(productNum);
        if(update == 1) {
            return "success";
        }
        else {
            return "fail";
        }
    }




//------------------------------------------------------------------------------






    //  상세 정보 dto
    ProductDetail productDetail;

    // 제품리스트의 모든 정보 취합 함수
    public List<ProductDetail> getFullData(List<ProductDto> dtoList) throws Exception {
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
//            캐러셀 이미지 없는 경우 썸네일로 대체
            if(carousel.size() == 0) {
                carousel.add(thumbnail);
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
                score = Math.round((score / reviewScore.size()) * 10) / 10.0;
            }

//            리뷰 개수 불러오기
            int reviewCount = reviewService.getReviewCount(productNum);

//            데이터 취합하기
            productDetail = new ProductDetail(dtoList.get(i), companyData, specData, thumbnail, carousel, mainPageImg, detailImg, score, reviewCount);
//            데이터 리스트에 넣기
            fullData.add(productDetail);
//            키값 설정하기
            fullData.get(i).setKey(i);
        }

        return fullData;
    }




//    하나의 제품데이터의 모든 정보 취합 함수 (매개변수만 달라짐)
    public List<ProductDetail> getFullData(ProductDto productDto) throws Exception {
        List<ProductDetail> fullData = new ArrayList<>();

//        상세 정보 저장
            int productNum = productDto.getProductNum();

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
                score = Math.round((score / reviewScore.size()) * 10) / 10.0;
            }
//            리뷰 개수 불러오기
        int reviewCount = reviewService.getReviewCount(productNum);

//            데이터 취합하기
            productDetail = new ProductDetail(productDto, companyData, specData, thumbnail, carousel, mainPageImg, detailImg, score, reviewCount);
//            데이터 리스트에 넣기
            fullData.add(productDetail);
//            키값 설정하기
            fullData.get(0).setKey(productDto.getKey());

        return fullData;
    }
}
