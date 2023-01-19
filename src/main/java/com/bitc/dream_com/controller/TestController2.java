package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.*;
import com.bitc.dream_com.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TestController2 {
    @Autowired
    private TestService testService;

//    로그인
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/loginChk", method = RequestMethod.POST)
    public Object loginChk(@RequestParam("userId")String userId, @RequestParam("userPw")String userPw, HttpServletRequest request) throws Exception{
        HttpSession session = request.getSession();
        UserDto loginChk = testService.loginChk(userId,userPw);

        if(session.getAttribute("LoginInfo") != null){
            request.removeAttribute("LoginInfo");
        }
        else{
            session.setAttribute("LoginInfo", loginChk);
            session.setMaxInactiveInterval(1800);
        }

        if(loginChk == null){
            return 0;
        }

        else{
            return loginChk;
        }

    }

//    기능 : 리뷰 보기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/review", method = RequestMethod.GET)
    public Object review() throws Exception{
        List<ReviewDto> review = testService.review();

        return review;
    }
//    기능 : 장바구니 저장
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/insertCart", method = RequestMethod.GET)
    public String insertCart(CartDto cartDto) throws Exception {
        System.out.println(cartDto);
        testService.insertCart(cartDto);

        return "입력완료.";
    }
//    기능 : 장바구니 보기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/selectCart",method = RequestMethod.GET)
    public Object selectCart() throws Exception{
        List<CartDto> selectCart = testService.selectCart();

        return selectCart;
    }
//    기능 : 장바구니 수정
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/updateCart",method = RequestMethod.GET)
    public String updateCart(CartDto cartDto) throws Exception{
        testService.updateCart(cartDto);

        return "수정완료";
    }

//    기능 : 장바구니 삭제
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/deleteCart",method = RequestMethod.GET)
    public String deleteCart(CartDto cartdto) throws Exception{
        testService.deleteCart(cartdto);

        return "redirect:http://localhost:3000";
    }

//    기능 : 대표 배송지 불러오기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/address",method = RequestMethod.POST)
    public Object address() throws Exception{
        List<AddressDto> address = testService.address();

        return address;
    }

//    기능 : 다른 배송지 입력/저장
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/insertAddress", method = RequestMethod.POST)
    public String insertAddress(AddressDto addressDto) throws Exception{
        testService.insertAddress(addressDto);
        System.out.println(addressDto);
        return "수정완료";
    }

//    기능 : 다른 배송지 불러오기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/anotherAddress",method = RequestMethod.POST)
    public Object anotherAddress() throws Exception{
        List<AddressDto> anotherAddress = testService.anotherAddress();

        return anotherAddress;
    }
//    기능 : 배송지 삭제하기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/deleteAddress",method = RequestMethod.POST)
    public String deleteAddress(AddressDto addressDto) throws Exception{
        testService.deleteAddress(addressDto);

        return "redirect:http://localhost:3000";
    }

    @RequestMapping(value = "/insertReview",method = RequestMethod.GET)
    public void insertReview(ReviewDto reviewDto) throws Exception{
        testService.insertReview(reviewDto);
    }
}

