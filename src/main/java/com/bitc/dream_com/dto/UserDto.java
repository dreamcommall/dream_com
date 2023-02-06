package com.bitc.dream_com.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class UserDto {
    private String userId;
    private String userPw;
    private String userName;
    private String userGender;
    private int userPost;
    private String userAddr;
    private String userTel;
    private String userEmail;
    private String userState;

    private Set<UserRole> roleset = new HashSet<>();

    public void addRole(UserRole userRole) {
        roleset.add(userRole);
    }
}
