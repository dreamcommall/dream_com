package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.mapper.UserMapper;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDto loginChk(String userId, String userPw) throws Exception {
        return userMapper.loginChk(userId, userPw);
    }

    @Override
    public void updateProfile(UserDto userDto) throws Exception {
        userMapper.updateProfile(userDto);
    }

    @Override
    public int checkInfo(UserDto userDto) throws Exception {
        return userMapper.checkInfo(userDto);
    }

    @Override
    public void deleteAccount(UserDto userDto) throws Exception {
        userMapper.deleteAccount(userDto);
    }

    @Override
    public void join(UserDto userDto) throws Exception {
        userMapper.join(userDto);
    }
}
