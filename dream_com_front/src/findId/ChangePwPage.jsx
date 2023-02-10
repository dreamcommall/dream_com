import React, {useEffect, useState} from "react";
import ClickPrevent from "../common/ClickPrevent";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Loading from "../common/Loading";
import Footer from "../common/Footer";
import {useParams} from "react-router-dom";
import axios from "axios";
import ErrorPageApp from "../common/ErrorPage/ErrorPageApp";
import "./ChangePwPage.css";

function ChangePwPage() {
    // 로딩창
    const [isLoad, setIsLoad] = useState(false);
    // url 파라미터
    const {url} = useParams();
    // url 유효한지 체크할 변수
    const [isCorrectPage, setIsCorrectPage] = useState(true);
    // 사용자 아이디 저장 될 변수
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // setIsLoad(true);
        // urlCheck().then(() => {
        //     setIsLoad(false);
        // });
    }, []);

    // 페이지 로딩 시 url이 유효한지 체크
    // const urlCheck = async () => {
    //     await axios.post("http://localhost:8080/checkFindPwUrl", null, {params: {url: url}})
    //         .then(req => {
    //             // url이 유효하지 않을 때 페이지 false 처리
    //             if(req.data === "") {
    //                 setIsCorrectPage(false);
    //             } else {
    //                 // url이 유효할 때 userId 저장
    //                 setUserId(req.data);
    //             }
    //         })
    //         .catch(er => {
    //             console.log("통신 오류");
    //         })
    // }

    if(isCorrectPage) {
        return (
            <div className={"container-fluid"}>
                <ClickPrevent isLoading={isLoad} />
                <HeaderD />
                <NavigationBar />
                <Loading loadStatus={isLoad}/>
                <div className={"container mb-5 nanumSquareR-font-normal"}>
                    <div className={"row"}>
                        <div className={"col-3"}></div>
                        <div className={"col-6 ms-4"}>
                            <div>
                                <span id={"changePwPageTitle"} className={"nanumSquareB-font-XLarge"}>비밀번호 변경</span>
                            </div>
                            <div>
                                <label>비밀번호</label>
                                <input id={""} type={"password"}/>
                            </div>
                            <div>
                                <label>비밀번호 확인</label>
                                <input id={""} type={"password"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    return (
        <ErrorPageApp />
    )
}

export default ChangePwPage;