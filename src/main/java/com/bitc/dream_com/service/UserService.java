package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.UserDto;

import javax.servlet.http.HttpServletRequest;

public interface UserService {
    UserDto loginChk(String userId, String userPw) throws Exception;

    void updateProfile(UserDto userDto) throws Exception;

    int checkInfo(UserDto userDto) throws Exception;

    void deleteAccount(UserDto userDto) throws Exception;

    String getSessionInfo(HttpServletRequest request) throws Exception;
}
