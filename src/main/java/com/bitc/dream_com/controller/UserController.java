package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.service.UserService;
import com.bitc.dream_com.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.PasswordAuthentication;
import java.util.Properties;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    // 로그인
    // 최종 수정일 : 2023.02.02
    // 최종 작성자 : 김준영
    @RequestMapping(value = "/loginChk", method = RequestMethod.POST)
    public Object loginChk(@RequestParam("userId")String userId, @RequestParam("userPw")String userPw, HttpServletRequest request) throws Exception{
        HttpSession session = request.getSession();
        UserDto loginChk = userService.loginChk(userId,userPw);
    
        // DB에서 검색 결과가 없으면
        if (loginChk == null) {
            return 0;
        }
        
        // 검색 결과는 있으나 아이디가 다른경우
        if (loginChk.getUserId().equals(userId) == false) {
            return 0;
        }
    
        // 검색 결과 있으면서 아이디가 일치하는 경우
        session.setAttribute("loginUserId", loginChk.getUserId());
        session.setMaxInactiveInterval(1800);
        
        return loginChk;
    }
    
    // 현재 로그인한 유저가 있는지 확인하는 함수
    // 유저가 있으면 아이디값 반환 없으면 null 반환
    // 최종 수정일 : 2023.02.02
    // 최종 작성자 : 김준영
    @RequestMapping(value = "/loginChk", method = RequestMethod.GET)
    public String getLoginUserId(HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();
        if (session.getAttribute("loginUserId") != null) {
            session.setMaxInactiveInterval(1800);
            return session.getAttribute("loginUserId").toString();
        } else {
            return null;
        }
    }

//    회원 정보 수정
//    최종 수정일 2023-01-19
//    최종 작성자 : 양민호
    @RequestMapping(value = "updateProfile", method = RequestMethod.PUT)
    public String updateProfile(UserDto userDto) throws Exception{
//        임시 데이터 추후 삭제 필요
        userDto.setUserAddr("11");
        userDto.setUserEmail("11@naver.com");
        userDto.setUserName("이름");
        userDto.setUserPost(123);
        userDto.setUserAddr("1");
        userDto.setUserTel("010-0000-0000");
        userDto.setUserState("N");
        System.out.println(userDto);
//        ---------------------
        userService.updateProfile(userDto);
        return "수정 완료";
    }

//    회원 탈퇴
//    최종 수정일 2023-01-19
//    최종 작성자 : 양민호
    @RequestMapping(value = "deleteAccount", method = RequestMethod.DELETE)
    public String deleteAccount(UserDto userDto) throws Exception {
//        회원 정보 확인
        int result = userService.checkInfo(userDto);

        String msg = "";

        if(result == 1) {
            userService.deleteAccount(userDto);
            msg = "탈퇴 완료";
        }
        else {
            msg =  "회원 정보 오류";
        }

        return msg;
    }

//    회원가입
//    최종 작성 날짜 : 2023-01-25
//    최종 작성자 : 양민호
    @RequestMapping(value = "join", method = RequestMethod.PUT)
    public String join(UserDto userDto) throws Exception {
        userService.join(userDto);
        return "가입 완료";
    }

//    이메일 인증(이메일 인증번호 전송)
//    최종 작성 날짜 : 2023.02.01
//    최종 작성자 : 김영민
    @RequestMapping(value = "/sendEmail",method = RequestMethod.POST)
    public String sendEmail(@RequestParam String email) throws Exception{
        String sendEmail = userService.sendEmail(email);
//        System.out.println("controller : " + sendEmail);
        return sendEmail;
    }

//    이메일 인증
//    최종 작성 날짜 : 2023.02.01
//    최종 작성자 : 김영민
    @RequestMapping(value = "EmailChk",method = RequestMethod.POST)
    public int EmailChk(@RequestParam("chkNumber") String chkNumber) throws Exception{
        System.out.println(UserServiceImpl.ePw);
        if( UserServiceImpl.ePw.equals(chkNumber)){
//            1이 나오면 중복
            return 1;
        }
        else{
//            0이 나오면 가입 가능
            return 0;
        }
    }

//    아이디 중복체크
//    최종 수정일 : 2023.02.01
//    최종 작성자 : 김영민

    @RequestMapping(value = "/idChk",method = RequestMethod.POST)
    public int idChk(@RequestParam("userId") String userId) throws Exception{
        int result = userService.idChk(userId);

        System.out.println(result);
        return result;
    }

//    유저 정보 가져오기
//    최종 수정일 : 2023-02-02
//    최종 작성자 : 양민호
    @RequestMapping(value="getUserInfo", method = RequestMethod.GET)
    public Object getUserInfo(@RequestParam("userId") String userId) throws Exception {
        return userService.getUserInfo(userId);
    }
}
