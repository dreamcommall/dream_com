package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.AddressDto;
import com.bitc.dream_com.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController {
    @Autowired
    private AddressService addressService;

    //    기능 : 대표 배송지 불러오기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/address",method = RequestMethod.POST)
    public Object address() throws Exception{
        List<AddressDto> address = addressService.address();

        return address;
    }

//    기능 : 다른 배송지 입력/저장
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/insertAddress", method = RequestMethod.POST)
    public String insertAddress(AddressDto addressDto) throws Exception{
        addressService.insertAddress(addressDto);
        System.out.println(addressDto);
        return "수정완료";
    }

//    기능 : 다른 배송지 불러오기
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/anotherAddress",method = RequestMethod.POST)
    public Object anotherAddress() throws Exception{
        List<AddressDto> anotherAddress = addressService.anotherAddress();

        return anotherAddress;
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
