package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.WishListDto;
import com.bitc.dream_com.service.TestService;
import com.bitc.dream_com.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @Autowired
    private TestService testService;

//    찜목록 불러오기
//    최종 수정일 2023-01-17
//    최종 작성자 : 양민호
    @RequestMapping(value = "getWishList", method = RequestMethod.GET)
    public Object getWishList(@RequestParam("userId") String userId) throws Exception {
//        찜목록 가져오기
        List<WishListDto> getWishlist = wishlistService.getWishList(userId);
        List getData = new ArrayList<>();

//        찜목록 product_num으로 제품 테이블에서 정보 가져오기
        for(int i = 0; i < getWishlist.size(); i++) {
            int productNum = getWishlist.get(i).getProductNum();
            List<ProductDto> wishlistData = testService.getFullProduct(productNum);
            getData.add(wishlistData.get(0));
        }

        System.out.println(getData);
        return getData;
    }


//    찜하기 / 찜목록 업데이트
//    최종 수정일 2023-01-17
//    최종 작성자 : 양민호
    @RequestMapping(value = "updateWishList", method = RequestMethod.PUT)
    public String updateWishList(@RequestParam("userId") String userId, @RequestParam("productNum") int productNum) throws Exception {
        wishlistService.deleteWishList(userId, productNum);
        wishlistService.updateWishList(userId, productNum);

        return "찜목록 업데이트 완료";
    }

//    찜목록 삭제
//    최종 수정일 2023-01-17
//    최종 작성자 : 양민호
    @RequestMapping(value = "deleteWishList", method = RequestMethod.DELETE)
    public String deleteWishList(@RequestParam("userId") String userId, @RequestParam("productNum") int productNum) throws Exception {
        wishlistService.deleteWishList(userId, productNum);

        return "찜목록 삭제 완료";
    }
}
