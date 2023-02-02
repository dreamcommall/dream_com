package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.mapper.UserMapper;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.List;
import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    JavaMailSender emailSender;

    public static final String ePw = createKey();

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
