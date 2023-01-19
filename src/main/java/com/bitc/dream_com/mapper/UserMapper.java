package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserDto loginChk(String userId, String userPw) throws Exception;
}
