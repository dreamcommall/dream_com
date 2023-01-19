package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.UserDto;

public interface UserService {
    UserDto loginChk(String userId, String userPw) throws Exception;
}
