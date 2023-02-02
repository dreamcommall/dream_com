package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.AddressDto;
import com.bitc.dream_com.mapper.AddressMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService{
    @Autowired
    private AddressMapper addressMapper;

    @Override
    public List<AddressDto> address(String userId) throws Exception {
        return addressMapper.address(userId);
    }

    @Override
    public void insertAddress(AddressDto addressDto) throws Exception {
        addressMapper.insertAddress(addressDto);
    }

    @Override
    public void deleteAddress(AddressDto addressDto) throws Exception {
        addressMapper.deleteAddress(addressDto);
    }
}
