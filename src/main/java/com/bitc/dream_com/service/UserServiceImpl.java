package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    JavaMailSender emailSender;

    // 유저의 아이디가 저장되는 저장소
    // 스케줄러를 담당하는 클래스에서도 사용하기 때문에 static으로 선언
    private static final ConcurrentHashMap<String, String> userSessions = new ConcurrentHashMap<>();

    // 유저의 아이디가 저장된 시간
    // 스케줄러를 담당하는 클래스에서도 사용하기 때문에 static으로 선언
    private static final ConcurrentHashMap<String, String> userSessionsCreateDt = new ConcurrentHashMap<>();

    public static final String ePw = createKey();

    @Override
    public UserDto loginChk(String userId, String userPw) throws Exception {
        return userMapper.loginChk(userId, userPw);
    }

    // 로그인 후 유저의 아이디를 받아서 UUID를 생성해 Map에 저장한다.
    // 저장후 생성된 UUID값을 반환환다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Override
    public String saveSessionUserId(String id) throws Exception {
        String uniqueId = createUserUUID();
        userSessions.put(uniqueId, id);
        saveTimeUserUUID(uniqueId);
        return uniqueId;
    }

    // 등록된 저장소에서 UUID를 삭제합니다.
    // 로그아웃 후 진행되는 함수입니다.
    // 삭제 성공시 true, 실패시 false가 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Override
    public boolean removeUserUUID(String uniqueId) throws Exception {
        userSessions.remove(uniqueId);
        return isUserUUID(uniqueId) == null ? true : false;
    }

    // 클라이언트에서 로그인을 시도한 후 해당 UUID가 생성된 시간을 저장합니다.
    // 성공시 ture, 실패시 False가 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    private boolean saveTimeUserUUID(String uniqueId) throws Exception {
        userSessionsCreateDt.put(uniqueId, LocalDateTime.now().toString());
        return userSessionsCreateDt.getOrDefault(uniqueId, null) != null ? true : false;
    }

    // 클라이언트에서 요청이 들어오면 해당 UUID값의 저장된 시간을 갱신시킵니다.
    // 성공시 true, 실패시 false가 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    private boolean refreshTimeUserUUID(String uniqueId) throws Exception {
        String prevDate = userSessionsCreateDt.getOrDefault(uniqueId, null);
        userSessionsCreateDt.put(uniqueId, LocalDateTime.now().toString());
        if (!prevDate.equals(userSessionsCreateDt.get(uniqueId).toString())) {
            return true;
        } else {
            return false;
        }
    }
    
    // 저장되어있는 UUID의 마지막 사용시간을 확인하고 만료가 되었다면 만료된 값들을 반환합니다.
    // List에 만료된 UUID 값들이 저장되어서 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    private List<String> checkTimeUserUUID() throws Exception {
        return null;
    }

    // 이 함수는 재귀적으로 동작합니다.
    // UUID를 생성해서 저장소에 있는지 확인하고 사용할수 있으면 값을 반환 사용할수 없다면 자신을 재호출한다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    private String createUserUUID() throws Exception {
        String tempId = UUID.randomUUID().toString();
        return isUserUUID(tempId) == null ? tempId : createUserUUID();
    }

    // 유저의 UUID를 기준으로 현재 로그인 되어있는지 확인하고 되어있으면 저장시간 갱신 및 아이디를 반환한다.
    // 없는경우 null이 반환된다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Override
    public String isUserUUID(String uniqueId) throws Exception {
        String userId = userSessions.getOrDefault(uniqueId, null);
        if (userId != null) {
            refreshTimeUserUUID(uniqueId);
        }
        return userId;
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

    private MimeMessage createMessage(String email)throws Exception{
//        System.out.println("보내는 대상 : "+ email);
//        System.out.println("인증 번호 : "+ePw);
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, email);//보내는 대상
        message.setSubject("[DreamComputer]이메일 인증을 위한 인증번호를 안내 드립니다.");//제목

        String msg="";
        msg+= "<div style='margin:20px;'>";
        msg+= "<h1> 안녕하세요 고객님 DreamComputer 입니다. </h1>";
        msg+= "<br>";
        msg+="<strong>'회원가입'</strong>을 위해 이메일 인증을 진행합니다.";
        msg+= "<p>아래 발급된 이메일 인증번호를 복사하거나 직접 입력하여 인증을 완료해주세요.<p>";
        msg+= "<br>";
        msg+= "<p>개인정보 보호를 위해 인증번호는 5분 간 유효합니다.<p>";
        msg+= "<br>";
        msg+= "<div style='font-family:verdana';>";
        msg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msg+= "<div style='font-size:130%'>";
        msg+= "CODE : <strong>";
        msg+= ePw+"</strong><div><br/> ";
        msg+= "</div>";
        message.setText(msg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(email,"DreamComputer"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }
    @Override
    public String sendEmail(String email)throws Exception {
        // TODO Auto-generated method stub
        MimeMessage message = createMessage(email);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }

    @Override
    public int idChk(String userId) throws Exception {
        return userMapper.idChk(userId);

    }

    @Override
    public List<UserDto> getUserInfo(String userId) throws Exception {
        return userMapper.getUserInfo(userId);
    }


}
