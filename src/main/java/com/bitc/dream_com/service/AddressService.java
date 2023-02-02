package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.AddressDto;

import java.util.List;

public interface AddressService {
    List<AddressDto> address(String userId) throws Exception;

    void insertAddress(AddressDto addressDto) throws Exception;


    void deleteAddress(AddressDto addressDto) throws Exception;
}
