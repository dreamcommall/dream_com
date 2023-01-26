import React from "react";
import UnderLine from "./UnderLine";
import "./ErrorPageApp.css"
import Button from "react-bootstrap/Button";

// 에러가 발생했을때 에러번호와 내용을 표시하는 컴포넌트
function ErrorPageApp({errorNumber, errorMsg}) {
    return (
        <div className={"container"}>
            <div id={"div-error-top-underline-wrapper"} className={"row"}>
                <div className={"col"}>
                    <UnderLine />
                </div>
            </div>
            <div id={"div-error-img-wrapper"} className={"row"}>
                <div className={"col d-flex justify-content-center"}>
                    <img src={"/images/rain.jpg"} />
                </div>
            </div>
            <div id={"div-error-msg-wrapper"} className={"row"}>
                <div className={"col text-center"}>
                    <h3>에러번호</h3>
                    <h3 className={"mb-3"}>에러메세지</h3>
                    <div><a href={"/main"}><Button variant={"outline-dark"}>메인으로 돌아가기</Button></a></div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <UnderLine />
                </div>
            </div>
        </div>
    );
}

export default ErrorPageApp;