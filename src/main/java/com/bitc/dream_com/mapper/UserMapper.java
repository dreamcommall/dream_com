package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.AutoLoginDto;
import com.bitc.dream_com.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    UserDto loginChk(String userId, String userPw) throws Exception;

    int updateProfile(UserDto userDto) throws Exception;

    int checkInfo(UserDto userDto) throws Exception;

    void deleteAccount(UserDto userDto) throws Exception;

    int join(UserDto userDto) throws Exception;

    int idChk(String userId) throws Exception;

    List<UserDto> getUserInfo(String userId) throws Exception;
    
    int addAddress(UserDto userDto) throws Exception;
    
    /**
     * DB에 UUID가 중복되는지 확인합니다.
     *
     * @author  김준영
     * @param uniqueId 중복검사를 할 UUID
     * @apiNote 최종 수정일 2023-02-03
     */
    String isDbUserUUID(String uniqueId) throws Exception;

    /**
     * DB에 UUID를 저장합니다.
     *
     * @author  김준영
     * @param autoLoginDto DB에 UUID값과 아이디값을 저장, 저장 날짜는 쿼리에서 저장됩니다.
     * @apiNote 최종 수정일 2023-02-03
     */
    void createDbUserUUID(AutoLoginDto autoLoginDto) throws Exception;

    /**
     * DB에 UUID를 전달해서 해당 UUID를 사용하는 유저 아이디를 반환합니다.
     *
     * @author  김준영
     * @param uniqueId 아이디를 검색하기위해 사용할 UUID
     * @apiNote 최종 수정일 2023-02-03
     */
    String isAutoUserId(String uniqueId) throws Exception;

    /**
     * DB에 일치하는 UUID를 삭제합니다.
     *
     * @author  김준영
     * @param uniqueId 삭제할 UUID
     * @apiNote 최종 수정일 2023-02-03
     */
    void deleteDbUserUUID(String uniqueId) throws Exception;

    /**
     * DB에 저장된 UUID중 만료된 UUID를 반환합니다.
     *
     * @author  김준영
     * @param time 만료기준(날짜)
     * @return 만료된 UUID 목록, 없는경우 null이 반환
     * @apiNote 최종 수정일 2023-02-04
     */
    List<String> searchUUIDExpire(String time) throws Exception;

    /**
     * DB에 저장된 UUID중 매개변수로 전달받은 id를 가지는 UUID를 반환합니다.
     *
     * @author  김준영
     * @param id 유저 아이디
     * @return 해당 유저아이디를 가지는 UUID, 없는경우 null이 반환
     * @apiNote 최종 수정일 2023-02-05
     */
    String searchDbUserUUID(String id) throws Exception;

    List<UserDto> getSignedId(String userEmail, String userName) throws Exception;

    int findIdPageCheckSignedInfo(String userEmail, String userName) throws Exception;

    int findPwPageCheckSignedInfo(String userEmail, String userName, String userId) throws Exception;

    int changePw(String userId, String userPw) throws Exception;
}
