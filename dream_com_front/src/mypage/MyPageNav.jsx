import React from "react";
import "./MyPageNav.css"
import "../fonts/fontStyle.css"

function MyPageNav({menu}) {
    return (
        <div id={"div-my-page-nav"}>
            <h4 className={"my-2 p-1 nanumSquareB-font-large"}>마이페이지</h4>
            <p className={menu == "order" ? "active" : ""}>주문배송 & 구매내역</p>
            <p className={menu == "wishList" ? "active" : ""}>찜목록</p>
            <p className={menu == "cart" ? "active" : ""}>장바구니</p>
            <p className={menu == "userEdit" ? "active" : ""}>개인정보수정</p>
        </div>
    );
}

export default MyPageNav;