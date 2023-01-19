package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    //    로그인
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/loginChk", method = RequestMethod.POST)
    public Object loginChk(@RequestParam("userId")String userId, @RequestParam("userPw")String userPw, HttpServletRequest request) throws Exception{
        HttpSession session = request.getSession();
        UserDto loginChk = userService.loginChk(userId,userPw);

        if(session.getAttribute("LoginInfo") != null){
            request.removeAttribute("LoginInfo");
        }
        else{
            session.setAttribute("LoginInfo", loginChk);
            session.setMaxInactiveInterval(1800);
        }

        if(loginChk == null){
            return 0;
        }

        else{
            return loginChk;
        }

    }
}
