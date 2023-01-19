package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.ProductImgDto;
import com.bitc.dream_com.dto.SpecDto;
import com.bitc.dream_com.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;


//    제품 테이블 최신 5개 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getRecentProduct", method = RequestMethod.GET)
    public Object getRecentProduct() throws Exception {
        List<ProductDto> products = productService.getRecentProduct();

        return products;
    }


//    제품 테이블에서 랜덤 1개 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getRandomProduct", method = RequestMethod.GET)
    public Object getRandomProduct() throws Exception {
        List<ProductDto> products = productService.getRandomProduct();
        int productNum = products.get(0).getProductNum();
//        스펙 불러오기
        List<SpecDto> spec = productService.getProductSpec(productNum);

        Map<String, Object> productInfo = new HashMap<>();
        productInfo.put("product", products);
        productInfo.put("spec", spec);

        return productInfo;
    }


//    상세페이지 상품 정보 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/fullProductInfo", method = RequestMethod.GET)
    public Object fullProductInfo(@RequestParam("productNum") int productNum) throws Exception {
        List<ProductDto> products = productService.fullProductInfo(productNum);
//        스펙 불러오기
        List<SpecDto> spec = productService.getProductSpec(productNum);
//        이미지 불러오기
        List<ProductImgDto> img = productService.getProductImg(productNum);

        Map<String, Object> productInfo = new HashMap<>();
        productInfo.put("product", products);
        productInfo.put("spec", spec);
        productInfo.put("img", img);

        return productInfo;
    }

//    클릭 수가 높은 제품 정보 불러오기
//    최종 수정일 2023-01-18
//    최종 작성자 : 양민호
    @RequestMapping(value = "/topClickedProduct", method = RequestMethod.GET)
    public Object topClickedProduct() throws Exception {
//        hitcount 테이블 정보 불러오기
        List<ProductDto> topClick = productService.topClickedProduct();

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
}
