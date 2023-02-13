import React from "react";
import "../fonts/fontStyle.css"
import "./NewSignUpHeader.css"
import {Link} from "react-router-dom";

function NewSignUpHeader({pageName}) {
    return (
        <div className={"container-fluid"}>
            <div id={"div-sing-up-header"} className={"d-flex"}>
                <div>
                    <Link to={"/"}><img width={120} height={60} src={"/images/mainLogo.png"} /></Link>
                </div>
                <div>
                    <p id={"p-sing-up-header-information"}>회원가입</p>
                </div>
                <div className={"d-flex align-items-center"}>
                    <p className={pageName == "Clause" ? "p-sing-up-header-page-information active" : "p-sing-up-header-page-information"}>약관동의</p>
                    <p className={pageName == "SignUp" ? "p-sing-up-header-page-information active" : "p-sing-up-header-page-information"}>정보입력</p>
                </div>
            </div>
        </div>
    );
}

export default NewSignUpHeader;