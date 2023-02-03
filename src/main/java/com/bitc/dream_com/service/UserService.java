package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.UserDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

public interface UserService {
    UserDto loginChk(String userId, String userPw) throws Exception;

    void updateProfile(UserDto userDto) throws Exception;

    int checkInfo(UserDto userDto) throws Exception;

    // 로그인 후 유저의 아이디를 저장
    String saveSessionUserId(String id) throws Exception;

    // 로그아웃 후 UUID 삭제
    boolean removeUserUUID(String uniqueId) throws Exception;

    // UUID를 기반으로 저장소에 아이디가 있는지 확인
    public String isUserUUID(String uniqueId) throws Exception;

    // 저장된 UUID가 만료되었는지 확인합니다.
    List<String> checkTimeUserUUID(int standMinuteTime) throws Exception;

    void deleteAccount(UserDto userDto) throws Exception;

    void join(UserDto userDto) throws Exception;

    String sendEmail(String email) throws Exception;

    int idChk(String userId) throws Exception;

    List<UserDto> getUserInfo(String userId) throws Exception;
}
