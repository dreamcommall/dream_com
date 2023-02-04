package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.AutoLoginDto;
import com.bitc.dream_com.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
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

    // DB에 저장된 UUID중 만료된 UUID를 반환합니다.
    // 매개변수로 만료기준 날짜를 입력받습니다.
    List<String> searchUUIDExpire(String time) throws Exception;
}
