package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.AddressDto;
import com.bitc.dream_com.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController {
    @Autowired
    private AddressService addressService;

    //    기능 : 배송지 불러오기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 양민호 (최초 작성자 : 김영민)
//    다른배송지 목록 가져오는 함수 삭제 후 해당 사용자의 모든 배송지 정보 가져오기

    @RequestMapping(value = "/address",method = RequestMethod.POST)
    public Object address(@RequestParam("userId") String userId) throws Exception{
        return addressService.address(userId);
    }

//    기능 : 다른 배송지 입력/저장
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/insertAddress", method = RequestMethod.POST)
    public String insertAddress(AddressDto addressDto) throws Exception{
        addressService.insertAddress(addressDto);
        return "수정완료";
    }

//    기능 : 배송지 삭제하기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/deleteAddress",method = RequestMethod.POST)
    public String deleteAddress(AddressDto addressDto) throws Exception{
        addressService.deleteAddress(addressDto);

        return "redirect:http://localhost:3000";
    }
}
