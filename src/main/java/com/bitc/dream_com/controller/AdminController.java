package com.bitc.dream_com.controller;

import com.bitc.dream_com.service.AdminService;
import com.bitc.dream_com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private AdminService adminService;
    
    /**
     * 관리자 페이지에 접속할때 해당 유저의 권한을 얻어옵니다.
     *
     * @author 김준영
     * @param userUUID 웹 브라우저에 저장된 유저를 식별하기 위한 UUID값 입니다.
     * @param autoUserUUID 웹 브라우저에 저장된 유저를 식별하기 위한 역으로 변환된 UUID값 입니다.
     * @return 정상적으로 실행 된 경우 해당 유저의 권한을 반환합니다. 관리자 권한이라면 A 가 반환횝니다.<br>
     * 일반 유저인경우 N, 탈퇴 유저인경우 Y, 값을 얻어오는데 실패했다면 null이 반환됩니다.
     * @apiNote 최종 수정일 2023-02-13
     */
    @RequestMapping(value = "/user/authorization", method = RequestMethod.GET)
    public String getAuthorization(@RequestParam(value = "userUUID", required = false) String userUUID,
            @RequestParam(value = "autoUserUUID", required = false) String autoUserUUID) throws Exception {
        if (userUUID == null && autoUserUUID == null) {
            return null;
        }
        
        // 클라이언트로부터 받은 UUID를 가공
        String targetUUID = "";
        if (autoUserUUID != null) { // 자동 로그인 했을때
            targetUUID = new StringBuffer(autoUserUUID).reverse().toString();
        } else if(userUUID != null) { // 일반 로그인 했을때
            targetUUID = userUUID;
        }
        
        // UUID를 이용해 현재 로그인한 세션에서 아이디 값을 조회하고 해당 유저의 권한을 반환
        String userId = userService.isUserUUID(targetUUID);
        String authorization = adminService.getAuthorization(userId);
        return authorization;
    }
    
    @RequestMapping(value = "/product", method = RequestMethod.POST)
    public String registerProduct(HttpServletRequest request) throws Exception {
        request.setCharacterEncoding("UTF-8");
        String category = request.getParameter("categoryMenu");
        String company = request.getParameter("companyName");
        String productTitle = request.getParameter("productTitle");
        String productSpecs = request.getParameter("productSpecs");
        String productPrice = request.getParameter("productPrice");
        String productDiscount = request.getParameter("productDiscountPrice");
        String productStack = request.getParameter("productStackCount");
        String deliveryDays = request.getParameter("deliveryDays");
        String thumbnailImgFile = request.getParameter("productThumbnailImg");
        String mainImgFile = request.getParameter("productMainImg");
        return "success";
    }
}
