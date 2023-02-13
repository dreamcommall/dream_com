package com.bitc.dream_com.service;

import com.bitc.dream_com.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminMapper adminMapper;
    
    /**
     * 관리자 페이지에 접속할때 해당 유저의 권한을 얻어옵니다.
     *
     * @author 김준영
     * @param userId 현재 로그인 한 유저의 아이디입니다.
     * @return 정상적으로 실행 된 경우 해당 유저의 권한을 반환합니다. 관리자 권한이라면 A 가 반환횝니다.<br>
     * 일반 유저인경우 N, 탈퇴 유저인경우 Y, 값을 얻어오는데 실패했다면 null이 반환됩니다.
     * @apiNote 최종 수정일 2023-02-13
     */
    @Override
    public String getAuthorization(String userId) throws Exception {
        return adminMapper.getAuthorization(userId);
    }
}
