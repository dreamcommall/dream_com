package com.bitc.dream_com.controller;

import com.bitc.dream_com.dto.ProductDto;
import com.bitc.dream_com.dto.WishListDto;
import com.bitc.dream_com.service.ProductService;
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
    private ProductService productService;

    @Autowired
    private ProductController productController;

//    찜목록 불러오기
//    최종 수정일 2023-01-25
//    최종 작성자 : 양민호
    @RequestMapping(value = "getWishList", method = RequestMethod.GET)
    public Object getWishList(@RequestParam("userId") String userId) throws Exception {
//        찜목록 가져오기
        List<WishListDto> getWishlist = wishlistService.getWishList(userId);
        List<ProductDto> product = new ArrayList<>();

//        찜목록 product_num으로 제품 테이블에서 정보 가져오기
        for(int i = 0; i < getWishlist.size(); i++) {
            int productNum = getWishlist.get(i).getProductNum();
            ProductDto wishlistData = productService.productData(productNum);
            product.add(wishlistData);
            }

        return productController.getFullData(product);
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
    public String deleteWishList(@RequestParam("userId") String userId, @RequestParam("productNum") String productNumArray) throws Exception {

        String[] productNum = productNumArray.split(",");

        for(int i = 0; i < productNum.length; i++){
            wishlistService.deleteWishList(userId,Integer.parseInt(productNum[i]));
        }

        return "찜목록 삭제 완료";
    }
}
