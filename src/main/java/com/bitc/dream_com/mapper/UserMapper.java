package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    UserDto loginChk(String userId, String userPw) throws Exception;

    void updateProfile(UserDto userDto) throws Exception;

    int checkInfo(UserDto userDto) throws Exception;

    void deleteAccount(UserDto userDto) throws Exception;

    int join(UserDto userDto) throws Exception;

    int idChk(String userId) throws Exception;

    List<UserDto> getUserInfo(String userId) throws Exception;

    int addAddress(UserDto userDto) throws Exception;
}
