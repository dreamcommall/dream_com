package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.UserDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface UserService {
    UserDto loginChk(String userId, String userPw) throws Exception;

    void updateProfile(UserDto userDto) throws Exception;

    int checkInfo(UserDto userDto) throws Exception;

    void deleteAccount(UserDto userDto) throws Exception;

    void join(UserDto userDto) throws Exception;

    String sendEmail(String email) throws Exception;

    int idChk(String userId) throws Exception;

    List<UserDto> getUserInfo(String userId) throws Exception;
}
