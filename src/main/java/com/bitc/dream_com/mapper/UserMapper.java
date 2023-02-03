package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.AutoLoginDto;
import com.bitc.dream_com.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    UserDto loginChk(String userId, String userPw) throws Exception;

    void updateProfile(UserDto userDto) throws Exception;

    int checkInfo(UserDto userDto) throws Exception;

    void deleteAccount(UserDto userDto) throws Exception;

    void join(UserDto userDto) throws Exception;

    int idChk(String userId) throws Exception;

    List<UserDto> getUserInfo(String userId) throws Exception;

    // DB에 UUID가 중복되는지 확인합니다.
    String isDbUserUUID(String uniqueId) throws Exception;

    // DB에 UUID를 저장합니다.
    void createDbUserUUID(AutoLoginDto autoLoginDto) throws Exception;

    // DB에 UUID를 전달해서 해당 UUID를 사용하는 유저 아이디를 반환합니다.
    String isAutoUserId(String uniqueId) throws Exception;
    
    // DB에 일치하는 UUID를 삭제합니다.
    void deleteDbUserUUID(String uniqueId) throws Exception;
}
