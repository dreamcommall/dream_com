package com.bitc.dream_com.scheduler;

import com.bitc.dream_com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserScheduler {
    @Autowired
    private UserService userService;
    private final int EXPIRE_MINUTE_TIME = 20; // 만료 기준 시간(마지막 갱신후 20분 지나면 저장소에서 삭제한다.)
    private final int EXPIRE_DAY_TIME = 7; // DB 만료 기준 날짜(자동 로그인 UUID 생성 시점 이후 7일이 지나면 삭제한다.)

    // 10분마다 현재 로그인한 유저들의 만료기간이 유효한지 검사한다.
    // 최종 작성일 : 2023-02-03
    // 마지막 작성자 : 김준영
    @Scheduled(fixedDelay = 600000)
    private void checkLoginExpire() throws Exception {
        List<String> deleteList = userService.checkTimeUserUUID(EXPIRE_MINUTE_TIME);
        if (deleteList == null) {
            return;
        }
        for (String key : deleteList) {
            userService.removeUserUUID(key);
        }
    }

    // 매일 낮 12시에 자동 로그인 된 유저들의 만료기간이 유효한지를 검사한다.
    // 최종 작성일 : 2023-02-04
    // 마지막 작성자 : 김준영
    @Scheduled(cron = "0 0 12 * * *")
    private void checkAutoLoginExpire() throws Exception {
        List<String> deleteList = userService.checkDbTimeUserUUID(EXPIRE_DAY_TIME);
        if (deleteList == null) {
            return;
        }
        for(String key : deleteList) {
            userService.deleteDbUserUUID((new StringBuffer(key).reverse().toString()));
        }
    }
}
