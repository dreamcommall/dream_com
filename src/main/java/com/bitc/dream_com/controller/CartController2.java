package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CartController2 {
    @Autowired
    private CartService cartService;

//    기능 : 장바구니 저장
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/insertCart", method = RequestMethod.GET)
    public String insertCart(CartDto cartDto) throws Exception {
        System.out.println(cartDto);
        cartService.insertCart(cartDto);

        return "입력완료.";
    }
//    기능 : 장바구니 보기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/selectCart",method = RequestMethod.GET)
    public Object selectCart() throws Exception{
        List<CartDto> selectCart = cartService.selectCart();

        return selectCart;
    }
//    기능 : 장바구니 수정
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/updateCart",method = RequestMethod.GET)
    public String updateCart(CartDto cartDto) throws Exception{
        cartService.updateCart(cartDto);

        return "수정완료";
    }

//    기능 : 장바구니 삭제
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/deleteCart",method = RequestMethod.GET)
    public String deleteCart(CartDto cartdto) throws Exception{
        cartService.deleteCart(cartdto);

        return "redirect:http://localhost:3000";
    }


    @RequestMapping(value = "/insertReview",method = RequestMethod.GET)
    public void insertReview(ReviewDto reviewDto) throws Exception{
        cartService.insertReview(reviewDto);
    }
}

