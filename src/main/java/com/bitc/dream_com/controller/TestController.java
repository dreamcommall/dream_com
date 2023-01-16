package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {
    @Autowired
    private TestService testService;


//    제품 테이블 최신 5개 불러오기
//    최종 수정일 2023-01-16
//    최종 작성자 : 양민호
    @RequestMapping(value = "/getProductData", method = RequestMethod.GET)
    public Object getProductData() throws Exception {
        List<ProductDto> products = testService.getProductData();
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

//    제품 테이블 업데이트
//    최종 수정일 2023-01-16
//    최종 작성자 : 양민호
    @RequestMapping(value = "/updateProduct", method = RequestMethod.PUT)
    public String updateProduct(@RequestParam("num") int num, @RequestParam("title") String title, @RequestParam("name") String name, @RequestParam("price") int price, @RequestParam("discount") int discount, @RequestParam("quantity") int quantity, @RequestParam("delivery") String delivery, @RequestParam("click") int click) throws Exception {
        testService.updateProduct(num, title, name, price, discount, quantity, delivery, click);
        return "업데이트 성공";
    }
}
