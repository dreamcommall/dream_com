package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.AddressDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AddressMapper {

    List<AddressDto> address(String userId) throws Exception;

    void insertAddress(AddressDto addressDto) throws Exception;

    void deleteAddress(AddressDto addressDto) throws Exception;
}
