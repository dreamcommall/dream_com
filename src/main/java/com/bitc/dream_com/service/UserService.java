package com.bitc.dream_com.service;

import com.bitc.dream_com.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto loginChk(String userId, String userPw) throws Exception;

    int updateProfile(UserDto userDto) throws Exception;

    int checkInfo(UserDto userDto) throws Exception;

    /**
     * 로그인 후 유저의 아이디를 세션(저장소)에 저장합니다.
     *
     * @author 김준영
     * @param id 유저 아이디
     * @return 성공적으로 작업이 수행된 경우 새로 생성된 UUID값을 반환합니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    String saveSessionUserId(String id) throws Exception;

    /**
     * 로그아웃 후 저장소에 저장된 UUID값을 키값으로 가지는 값을 삭제합니다.
     *
     * @author 김준영
     * @param uniqueId 로그인했다고 식별하기위한 UUID
     * @return 성공적으로 작업이 수행된 경우 true, 실패시 false를 반환합니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    boolean removeUserUUID(String uniqueId) throws Exception;

    /**
     * UUID를 기반으로 저장소에 아이디가 있는지 확인합니다.
     *
     * @author 김준영
     * @param uniqueId 로그인했다고 식별하기위한 UUID
     * @return 성공적으로 작업이 수행된 경우 해당 유저 아이디, 실패시 null를 반환합니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    String isUserUUID(String uniqueId) throws Exception;

    /**
     * 세션에 저장된 UUID가 만료되었는지 확인합니다.
     * 만료기준은 스케줄러를 사용하는 클래스를 참고하세요.<br>
     * 클래스 이름 : UserScheduler
     *
     * @author 김준영
     * @param standardMinuteTime 만료기준(분)
     * @return 성공적으로 작업이 수행된 경우 만료가 된 UUID 목록을 반환, 실패시 null를 반환합니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    List<String> checkTimeUserUUID(int standardMinuteTime) throws Exception;

    void deleteAccount(UserDto userDto) throws Exception;

    int join(UserDto userDto) throws Exception;

    String sendSignEmail(String email) throws Exception;

    int idChk(String userId) throws Exception;

    List<UserDto> getUserInfo(String userId) throws Exception;

    int addAddress(UserDto userDto) throws Exception;

    /**
     * 자동 로그인 후 처리되는 함수이며, UUID를 신규 생성후 DB에도 저장합니다.
     *
     * @author 김준영
     * @param id 자동 로그인을 요청한 유저 아이디
     * @return 성공적으로 작업이 수행된 경우 역으로 변환 된 UUID을 반환, 실패시 null를 반환합니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    String saveDbSessionUserId(String id) throws Exception;

    /**
     * DB에서 매개변수로 전달받은 UUID를 사용하는 유저의 아이디를 반환합니다.
     *
     * @author 김준영
     * @param uniqueId 역으로 변환된 UUID
     * @return 성공적으로 작업이 수행된 경우 해당 UUID를 사용하는 유저 아이디를 반환, 실패시 null를 반환합니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    String isDbUserId(String uniqueId) throws Exception;

    /**
     * DB에 저장되어있는 UUID를 삭제합니다.
     * 로그아웃 진행 후 동작합니다.
     *
     * @author 김준영
     * @param uniqueId 역으로 변환된 UUID
     * @return 성공적으로 작업이 수행된 경우 true, 실패시 false를 반환합니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    boolean deleteDbUserUUID(String uniqueId) throws Exception;

    /**
     * DB에 저장되어있는 UUID 값중 만료된 값들을 조회합니다.
     * 스케줄러에서 사용하며 만료된 값들을 삭제하기위해 실행됩니다.
     *
     * @author 김준영
     * @param standardDay 만료기준(일)
     * @return 성공적으로 작업이 수행된 경우 만료된 UUID 목록, 실패 또는 값이 없는경우 null를 반환합니다.
     * @apiNote 최종 수정일 2023-02-04
     */
    List<String> checkDbTimeUserUUID(int standardDay) throws Exception;

    /**
     * DB에 저장된 UUID중 매개변수로 전달받은 id를 가지는 UUID를 반환합니다.
     *
     * @author  김준영
     * @param id 유저 아이디
     * @return 해당 유저아이디를 가지는 UUID, 없는경우 null이 반환
     * @apiNote 최종 수정일 2023-02-05
     */
    String searchDbUUID(String id) throws Exception;

    /**
     * 자동 로그인시 사용되는 함수이며, 전달받은 UUID와 ID값을 세션에 등록합니다.
     *
     * @author  김준영
     * @param uniqueId 자동 로그인을 식별하는 UUID
     * @param userId 자동 로그인을 하는 유저 아이디
     * @return 성공시 true, 실패시 false를 반환
     * @apiNote 최종 수정일 2023-02-05
     */
    boolean registerSessionAutoLoginUser(String uniqueId, String userId) throws Exception;

    List<UserDto> getSignedId(String userEmail, String userName) throws Exception;

    int findIdPageCheckSignedInfo(String userEmail, String userName) throws Exception;

    int findPwPageCheckSignedInfo(String userEmail, String userName, String userId) throws Exception;

    int sendUrlEmail(String email, String userId) throws Exception;

    void checkExpiredUrl() throws Exception;

    int checkFindPwUrl(String url) throws Exception;

    int changePw(String userPw, String url) throws Exception;
}
