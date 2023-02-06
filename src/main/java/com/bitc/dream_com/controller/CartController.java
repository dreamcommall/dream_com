package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.service.CartService;
import com.bitc.dream_com.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductController productController;
    
    /**
     * 장바구니 저장
     *
     * @author 김영민, 김준영
     * @param cartDto 장바구니를 저장하기위한 DTO
     * @return 성공적으로 작업이 수행됬다면 입력완료가 반환됩니다.
     * @apiNote 최종 수정일 2023-02-06
     */
    @RequestMapping(value = "/insertCart", method = RequestMethod.POST)
    public String insertCart(CartDto cartDto) throws Exception {
        System.out.println(cartDto);
        cartService.insertCart(cartDto);

        return "입력완료.";
    }
//    기능 : 장바구니 보기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 양민호 (최초 작성자 : 김영민)
//    유저아이디 파라미터 추가 / 장바구니에 들어있는 제품 정보 취합

    @RequestMapping(value = "/selectCart",method = RequestMethod.GET)
    public Object selectCart(@RequestParam("userId") String userId) throws Exception{
//        장바구니 정보 가져오기
        List<CartDto> cartProduct = cartService.selectCart(userId);
//        장바구니에 들어있는 제품 정보를 저장할 리스트
        List<ProductDto> cartProductInfoList = new ArrayList<>();
//        장바구니의 제품정보를 불러온 후 리스트에 저장
        for(CartDto item: cartProduct) {
        ProductDto productInfo = productService.productData(item.getProductNum());
//        장바구니에 선택되어 있는 제품 수량이 재고 수량보다 많을 경우 제품 재고 -1
        if(item.getQuantity() > productInfo.getInventoryQuantity()) {
//            제품 재고가 0일 경우 재고 0
            if(productInfo.getInventoryQuantity() > 0) {
                productInfo.setInventoryQuantity(-1);
            }
//            제품 제고가 충분할 경우 제품데이터 재고 수량을 장바구니에 저장된 수량으로 변경
        } else {
            productInfo.setInventoryQuantity(item.getQuantity());
        }
        cartProductInfoList.add(productInfo);
        }

//        리스트에 있는 제품의 정보 취합
        List<ProductDetail> fullData = productController.getFullData(cartProductInfoList);
//        제품 키값 + 1
        for(ProductDetail item: fullData) {
            item.setKey(item.getKey() + 1);
        }

        return fullData;
    }
    
    
    /**
     * 장바구니 수정
     *
     * @author 김영민, 김준영
     * @param cartDto 장바구니를 저장하기위한 DTO
     * @return 성공적으로 작업이 수행됬다면 수정완료가 반환됩니다.
     * @apiNote 최종 수정일 2023-02-06
     */
    @RequestMapping(value = "/updateCart",method = RequestMethod.POST)
    public String updateCart(CartDto cartDto) throws Exception{
        cartService.updateCart(cartDto);

        return "수정완료";
    }
    
    /**
     * 장바구니 삭제
     *
     * @author 김영민, 김준영
     * @param cartDto 장바구니를 저장하기위한 DTO
     * @return 성공적으로 작업이 수행됬다면 입력완료가 반환됩니다.
     * @apiNote 최종 수정일 2023-02-06
     */
    @RequestMapping(value = "/deleteCart",method = RequestMethod.POST)
    public String deleteCart(CartDto cartDto) throws Exception{
        cartService.deleteCart(cartDto);

        return "redirect:http://localhost:3000";
    }
    
    @RequestMapping(value = "/insertReview",method = RequestMethod.POST)
    public void insertReview(ReviewDto reviewDto) throws Exception{
        cartService.insertReview(reviewDto);
    }
}

