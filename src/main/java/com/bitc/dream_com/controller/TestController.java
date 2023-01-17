package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.SpecDto;
import com.bitc.dream_com.dto.WishListDto;
import com.bitc.dream_com.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {
    @Autowired
    private TestService testService;


//    제품 테이블 최신 5개 불러오기
//    최종 수정일 2023-01-16
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getRecentProduct", method = RequestMethod.GET)
    public Object getRecentProduct() throws Exception {
        List<ProductDto> products = testService.getRecentProduct();
        return products;
    }

//    제품 테이블 최신 10개 불러오기
//    최종 수정일 2023-01-16
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getProductData10", method = RequestMethod.GET)
    public Object getProductData10() throws Exception {
        List<ProductDto> products = testService.getProductData10();
        return products;
    }

//    제품 테이블에서 랜덤 1개 불러오기
//    최종 수정일 2023-01-17
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getRandomProduct", method = RequestMethod.GET)
    public Object getRandomProduct() throws Exception {
        List<ProductDto> products = testService.getRandomProduct();
        int productNum = products.get(0).getProductNum();
//        스펙 불러오기
        List<SpecDto> spec = testService.getProductSpec(productNum);

        Map<String, Object> productInfo = new HashMap<>();
        productInfo.put("product", products);
        productInfo.put("spec", spec);

        return productInfo;
    }


//    상세페이지 상품 정보 불러오기
//    최종 수정일 2023-01-17
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getFullProduct", method = RequestMethod.GET)
    public Object getFullProduct(@RequestParam("productNum") int productNum) throws Exception {
        List<ProductDto> products = testService.getFullProduct(productNum);
//        스펙 불러오기
        List<SpecDto> spec = testService.getProductSpec(products.get(0).getProductNum());

        Map<String, Object> productInfo = new HashMap<>();
        productInfo.put("product", products);
        productInfo.put("spec", spec);

        return productInfo;
    }

//    제품 테이블 업데이트 (관리자 페이지 완성 시 사용됨, where절 변수 재설정필요)
//    최종 수정일 2023-01-16
//    최종 작성자 : 양민호
    @RequestMapping(value = "/updateProduct", method = RequestMethod.PUT)
    public String updateProduct(@RequestParam("num") int num, @RequestParam("title") String title, @RequestParam("name") String name, @RequestParam("price") int price, @RequestParam("discount") int discount, @RequestParam("quantity") int quantity, @RequestParam("delivery") String delivery, @RequestParam("click") int click) throws Exception {
        testService.updateProduct(num, title, name, price, discount, quantity, delivery, click);
        return "업데이트 성공";
    }
}
