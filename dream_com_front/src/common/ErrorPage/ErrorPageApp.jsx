import React, {useEffect, useState} from "react";
import UnderLine from "./UnderLine";
import "./ErrorPageApp.css"
import Button from "react-bootstrap/Button";
import {useSearchParams} from "react-router-dom";

// 에러가 발생했을때 에러번호와 내용을 표시하는 컴포넌트
function ErrorPageApp() {
    const [searchParams, setSearchParams] = useSearchParams(); // 파라미터 얻어오는 훅
    const [errorNumber, setErrorNumber] = useState(""); // 에러 번호
    const [errorMsg, setErrorMsg] = useState(""); // 에러 메세지

    // 에러 발생시 url에서 에러번호와 에러 메세지를 받아온다.
    useEffect(() => {
        if (searchParams.get("errorNumber") == null) {
            setErrorNumber("404 Not Found");
            setErrorMsg("요청하신 페이지를 찾을 수 없습니다.");
        } else {
            setErrorNumber(searchParams.get("errorNumber"));
            setErrorMsg(searchParams.get("errorMsg"));
        }
    }, []);

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
                    <h3>{errorNumber}</h3>
                    <h3 className={"mb-3"}>{errorMsg}</h3>
                    <div><a href={"/"}><Button variant={"outline-dark"}>메인으로 돌아가기</Button></a></div>
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