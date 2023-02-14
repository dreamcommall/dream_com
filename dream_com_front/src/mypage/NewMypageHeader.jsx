import React from "react";
import "../fonts/fontStyle.css"
import "./NewMypageHeader.css"
import {Link} from "react-router-dom";

function NewMypageHeader() {
    return (
        <div className={"container-fluid"}>
            <div id={"div-sing-up-header"} className={"d-flex"}>
                <div>
                    <Link to={"/"}><img width={120} height={60} src={"/images/mainLogo.png"} /></Link>
                </div>
                <div>
                    <p id={"p-sing-up-header-information"}>개인정보수정</p>
                </div>
            </div>
        </div>
    );
}

export default NewMypageHeader;