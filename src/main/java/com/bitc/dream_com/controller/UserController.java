package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.service.UserService;
import com.bitc.dream_com.service.UserServiceImpl;
import org.apache.ibatis.javassist.compiler.ast.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.PasswordAuthentication;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import static com.bitc.dream_com.service.UserServiceImpl.createKey;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 로그인을 요청하면 실행되는 함수입니다.
     *
     * @author 김준영, 양민호
     * @param userId 로그인을 위한 유저 아이디
     * @param userPw 로그인을 위한 유저의 암호
     * @param isAutoLogin 자동 로그인을 사용하는지 확인용도의 값
     * @return 성공적으로 작업이 수행됬다면 기본 로그인으로 요청한 경우 UUID값이 반환되고,
     * 자동 로그인으로 요청한 경우 역으로 변환된 UUID값이 반환됩니다.
     * 만약 실패한 경우 0이 반환됩니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    private static final ConcurrentHashMap<String, String> emailSession = new ConcurrentHashMap<>();
//    로그인
//    최종 수정일 : 2023.01.19
//    최종 작성자 : 김영민

    @RequestMapping(value = "/loginChk", method = RequestMethod.POST)
    public Object loginChk(@RequestParam("userId")String userId, @RequestParam("userPw")String userPw,
        @RequestParam(value = "isAutoLogin", defaultValue = "false") String isAutoLogin) throws Exception{
        UserDto loginChk = userService.loginChk(userId,userPw);
    
        // DB에서 검색 결과가 없으면
        if (loginChk == null) {
            return 0;
        }
        
        // 검색 결과는 있으나 아이디가 다른경우
        if (loginChk.getUserId().equals(userId) == false) {
            return 0;
        }

        if (isAutoLogin.equals("false")) {
            // 검색 결과 있으면서 아이디가 일치하는 경우 아아디를 저장소에 저장하고 생성된 UUID를 반환한다.
            return userService.saveSessionUserId(loginChk.getUserId());
        } else {
            // 검색 결과 있으면서 아이디가 일치하는 경우 아이디를 저장소랑 DB에 저장하고
            // 역으로 변환된 UUID를 반환한다.
            return userService.saveDbSessionUserId(loginChk.getUserId());
        }
    }

    /**
     * 현재 로그인 한 유저의 아이디값을 반환하는 함수입니다.<br>
     * <b>파라미터로 userUUID를 받는경우 기본 로그인으로 진행,<br> autoUserUUID를 받는경우 자동 로그인을 진행합니다.</b>
     *
     * @author 김준영
     * @param userUUID 웹 브라우저에 저장된 유저를 식별하기 위한 UUID값 입니다.
     * @param autoUserUUID 웹 브라우저에 저장된 유저를 식별하기 위한 역으로 변환된 UUID값 입니다.
     * @return 성공적으로 작업이 수행된 경우 전달받은 UUID를 사용하는 아이디가 반환됩니다.
     * 일치하는게 없는경우 null이 반환됩니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    @RequestMapping(value = "/loginUserId", method = RequestMethod.POST)
    public String getLoginUserId(@RequestParam(value = "userUUID", required = false) String userUUID,
        @RequestParam(value = "autoUserUUID", required = false) String autoUserUUID) throws Exception {
        String targetId;
        if (autoUserUUID != null) { // 자동 로그인 했을때
            targetId = new StringBuffer(autoUserUUID).reverse().toString();
        } else if(userUUID != null) { // 일반 로그인 했을때
            targetId = userUUID;
        } else { // 자동 로그인, 일반 로그인 안했을때
            return null;
        }
        return userService.isUserUUID(targetId);
    }

    /**
     * 프론트에서 메인화면에 접속했을때 자동 로그인을 위한 UUID값이 존재한다면 자동 로그인을 실행합니다.
     *
     * @author 김준영
     * @param autoUserUUID 자동 로그인을 하기위한 유저의 UUID
     * @return 성공적으로 작업이 수행됬다면 success, 실패했다면 fail을 반환합니다.
     * @apiNote 최종 수정일 2023-02-05
     */
    @RequestMapping(value = "/autoLogin", method = RequestMethod.POST)
    public String runAutoLogin(@RequestParam(value = "autoUserUUID", required = false) String autoUserUUID) throws Exception {
        if (autoUserUUID != null) {
            String targetId = userService.isDbUserId(autoUserUUID);
            String targetUUID = userService.searchDbUUID(targetId);
            if (userService.registerSessionAutoLoginUser(targetUUID, targetId)) {
                return "success";
            } else {
                return "fail";
            }
        } else {
            return "fail";
        }
    }

    /**
     * 로그아웃을 처리하는 함수입니다.<br>
     * <b>파라미터로 반드시 userUUID 또는 autoUserUUID를 받아야합니다.</b><br>
     * userUUID를 받는경우 기본 로그인한 유저의 로그아웃을 진행,
     * autoUserUUID를를 받는경우 자동 로그인한 유저의 로그아웃을 진행합니다.
     *
     * @author 김준영
     * @param userUUID 웹 브라우저에 저장된 유저를 식별하기 위한 UUID값 입니다.
     * @param autoUserUUID 웹 브라우저에 저장된 유저를 식별하기 위한 역으로 변환된 UUID값 입니다.
     * @return 성공적으로 작업이 수행된 경우 success, 실패한 경우 fail을 반환합니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public String userLogout(@RequestParam(value = "userUUID", required = false) String userUUID,
        @RequestParam(value = "autoUserUUID", required = false) String autoUserUUID) throws Exception {
        if (userUUID == null) {
            userService.removeUserUUID((new StringBuffer(autoUserUUID).reverse().toString()));
            return userService.deleteDbUserUUID(autoUserUUID) == true ? "success" : "fail";
        } else {
            return userService.removeUserUUID(userUUID) == true ? "success" : "fail";
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

//    회원가입 (트리거가 없어서 회원 가입 시 입력한 주소를 기본 배송지로 설정)
//    최종 작성 날짜 : 2023-02-03
//    최종 작성자 : 양민호
    @RequestMapping(value = "join", method = RequestMethod.PUT)
    public int join(UserDto userDto) throws Exception {
//        회원 정보 테이블에 입력
        int joinResult = userService.join(userDto);
//        기본주소로 테이블에 입력
        int addAddressResult =  userService.addAddress(userDto);
        if(joinResult + addAddressResult == 2) {
            return 1;
        }
            return 0;
    }

//    이메일 인증(이메일 인증번호 전송 전송과 동시에 UUID 생성하여 map에 저장)
//    최종 작성 날짜 : 2023.02.01
//    최종 작성자 : 김영민
    @RequestMapping(value = "/sendEmail",method = RequestMethod.POST)
    public String sendEmail(@RequestParam String email) throws Exception{
        UserServiceImpl.ePw = UserServiceImpl.createKey();
        String sessionId = UUID.randomUUID().toString();

        emailSession.put(sessionId,UserServiceImpl.ePw);
        Timer timer = new Timer();
        TimerTask expirationDt = new TimerTask() {
            @Override
            public void run() {
                emailSession.remove(sessionId);
                timer.cancel();
            }
        };
        timer.schedule(expirationDt,(3000*60));
        userService.sendEmail(email);

        return sessionId;
    }


//    이메일 인증
//    최종 작성 날짜 : 2023.02.01
//    최종 작성자 : 김영민
    @RequestMapping(value = "EmailChk",method = RequestMethod.POST)

    public int EmailChk(@RequestParam("chkNumber") String chkNumber, @RequestParam("uniqueId") String uniqueId) throws Exception{

        if(emailSession.get(uniqueId).equals(chkNumber)){
            return 1;
        }
        else{
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
