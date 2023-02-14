import React from "react";
import "./mypageCss/MyPageNav.css"
import "../fonts/fontStyle.css"
import {Link} from "react-router-dom";

function MyPageNav({menu}) {
    return (
        <div id={"div-my-page-nav"}>
            <h4 className={"my-2 p-1 nanumSquareB-font-large"}>마이페이지</h4>
            <Link to={"/mypage/order"}><p className={menu == "order" ? "active" : ""}>주문배송 & 구매내역</p></Link>
            <Link to={"/mypage/wishList"}><p className={menu == "wishList" ? "active" : ""}>찜목록</p></Link>
            <Link to={"/mypage/cart"}><p className={menu == "cart" ? "active" : ""}>장바구니</p></Link>
            <Link to={"/mypage/updateUserInfo"}><p className={menu == "userEdit" ? "active" : ""}>개인정보수정</p></Link>
        </div>
    );
}

export default MyPageNav;