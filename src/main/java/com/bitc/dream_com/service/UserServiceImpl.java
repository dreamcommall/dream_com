package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.AutoLoginDto;
import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
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

    // 로그인 후 자동로그인 옵션을 사용한다면 메모리에 로그인 처리 후 DB에 토큰 키를 저장합니다.
    // 성공시 역순으로 변환된 UUID가 반환, 실패시 null이 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Override
    public String saveDbSessionUserId(String id) throws Exception {
        String uniqueId = saveSessionUserId(id);
        if(createDbUserUUID(uniqueId, id)) {
            return new StringBuffer(uniqueId).reverse().toString();
        } else {
            return null;
        }
    }

    // 등록된 저장소에서 UUID를 삭제합니다.
    // 로그아웃 후 진행되는 함수입니다.
    // 삭제 성공시 true, 실패시 false가 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Override
    public boolean removeUserUUID(String uniqueId) throws Exception {
        userSessions.remove(uniqueId);
        userSessionsCreateDt.remove(uniqueId);
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
    // 매개변수로 만료기준을 판단하기위한 기준시간을 받습니다.
    // List에 만료된 UUID 값들이 저장되어서 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Override
    public List<String> checkTimeUserUUID(int standardMinuteTime) throws Exception {
        if (userSessionsCreateDt.size() == 0) { // 저장되어있는 값이 하나도 없는경우 null 반환
            return null;
        }

        List<String> deleteList = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        for (String key : userSessionsCreateDt.keySet()) {
            LocalDateTime targetDt = LocalDateTime.parse(userSessionsCreateDt.get(key));
            targetDt = targetDt.plusMinutes(standardMinuteTime); // 저장되어있는 시간에 만료기준 시간만큼 더한다.
            if (now.isBefore(targetDt) == false) { // 현재 시간대보다 저장된 시간이 더 이전값이면 삭제명단에 포함한다.
                deleteList.add(key);
            }
        }
        return deleteList;
    }

    // DB에 저장되어있는 UUID중 만료된 값들을 저장하여 List 형태로 반환합니다.
    // 매개변수로 만료기준 날짜를 받습니다.
    // 최종 작성일 : 2023-02-04
    // 마지막 작성자 : 김준영
    @Override
    public List<String> checkDbTimeUserUUID(int standardDay) throws Exception {
        LocalDateTime standardDateTime = LocalDateTime.now();
        standardDateTime = standardDateTime.minusDays(standardDay);
        return userMapper.searchUUIDExpire(standardDateTime.toString());
    }

    // 이 함수는 재귀적으로 동작합니다.
    // UUID를 생성해서 저장소에 있는지 확인하고 사용할수 있으면 값을 반환 사용할수 없다면 자신을 재호출한다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    private String createUserUUID() throws Exception {
        String tempId = UUID.randomUUID().toString();
        if (isUserUUID(tempId) == null && isDbUserUUID(tempId) == null) {
            return tempId;
        } else {
            return createUserUUID();
        }
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

    // 새로 생성된 UUID가 DB에 저장되어있는지 확인합니다.
    // DB에 저장할때 중복체크 용도입니다.
    // 없는경우 null이 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    private String isDbUserUUID(String uniqueId) throws Exception {
        return userMapper.isDbUserUUID(uniqueId);
    }

    // UUID를 받아서 DB에서 이 UUID를 사용하는 유저 아이디를 반환합니다.
    // 없는경우 null이 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Override
    public String isDbUserId(String uniqueId) throws Exception {
        return userMapper.isAutoUserId((new StringBuffer(uniqueId)).reverse().toString());
    }

    // 새로 생성한 UUID를 DB에 저장합니다.
    // 성공시 true, 실패시 false가 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    private boolean createDbUserUUID(String uniqueId, String userId) throws Exception {
        AutoLoginDto autoLoginDto = new AutoLoginDto();
        autoLoginDto.setUserId(userId);
        autoLoginDto.setTokenKey(uniqueId);
        userMapper.createDbUserUUID(autoLoginDto);
        return userMapper.isDbUserUUID(uniqueId) != null ? true : false;
    }

    // UUID를 받아서 DB와 일치하는 값이 있으면 제거합니다.
    // 반드시 역으로 변환된 UUID를 받아야 정상적으로 작동합니다!
    // 성공시 true, 실패시 false가 반환됩니다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Override
    public boolean deleteDbUserUUID(String uniqueId) throws Exception {
        userMapper.deleteDbUserUUID((new StringBuffer(uniqueId).reverse().toString()));
        return userMapper.isDbUserUUID(uniqueId) == null ? true : false;
    }

    /**
     * DB에 저장된 UUID중 매개변수로 전달받은 id를 가지는 UUID를 반환합니다.
     *
     * @author  김준영
     * @param id 유저 아이디
     * @return 해당 유저아이디를 가지는 UUID, 없는경우 null이 반환
     * @apiNote 최종 수정일 2023-02-05
     */
    @Override
    public String searchDbUUID(String id) throws Exception {
        return userMapper.searchDbUserUUID(id);
    }

    /**
     * 자동 로그인시 사용되는 함수이며, 전달받은 UUID와 ID값을 세션에 등록합니다.
     *
     * @author  김준영
     * @param uniqueId 자동 로그인을 식별하는 UUID
     * @param userId 자동 로그인을 하는 유저 아이디
     * @return 성공시 true, 실패시 false를 반환
     * @apiNote 최종 수정일 2023-02-05
     */
    @Override
    public boolean registerSessionAutoLoginUser(String uniqueId, String userId) throws Exception {
        boolean isSaveUserSessions = false;
        boolean isSaveCreateDt = false;
        userSessions.put(uniqueId, userId);
        if (userSessions.getOrDefault(uniqueId, null) != null) {
            isSaveUserSessions = true;
            isSaveCreateDt = saveTimeUserUUID(uniqueId);
        }
        if (isSaveUserSessions == true && isSaveCreateDt == true) {
            return true;
        } else {
            return false;
        }
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
