import React from "react";
import "./AdminNav.css"
import "../fonts/fontStyle.css"
import {Link} from "react-router-dom";

function AdminNav({menu}) {
    return (
        <div id={"div-admin-nav"}>
            <h4 className={"my-2 p-1 nanumSquareB-font-large"}>관리자 기능</h4>
            <Link to={"/"}><p>메인화면</p></Link>
            <Link to={"/admin/product/registration"}><p className={menu == "newProduct" ? "active" : ""}>상품등록</p></Link>
            <Link to={"/admin/product/modification"}><p className={menu == "editProduct" ? "active" : ""}>상품수정</p></Link>
            <Link to={"/admin/product/removal"}><p className={menu == "deleteProduct" ? "active" : ""}>상품삭제</p></Link>
        </div>
    );
}

export default AdminNav;