package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserDto loginChk(String userId, String userPw) throws Exception;

    void updateProfile(UserDto userDto) throws Exception;

    int checkInfo(UserDto userDto) throws Exception;

    void deleteAccount(UserDto userDto) throws Exception;

    void join(UserDto userDto) throws Exception;
}
