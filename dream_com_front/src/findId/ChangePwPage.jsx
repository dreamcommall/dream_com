import React, {useEffect, useState} from "react";
import ClickPrevent from "../common/ClickPrevent";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Loading from "../common/Loading";
import Footer from "../common/Footer";
import {Link, useParams} from "react-router-dom";
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
    // 변경할 비밀번호가 저장될 변수
    const [userPw, setUserPw] = useState("");
    const [userPwChk, setUserPwChk] = useState("");

    useEffect(() => {
        setIsLoad(true);
        urlCheck().then(() => {
            setIsLoad(false);
        });
    }, []);

    // 페이지 로딩 시 url이 유효한지 체크
    const urlCheck = async () => {
        await axios.post("http://localhost:8080/checkFindPwUrl", null, {params: {url: url}})
            .then(req => {
                // url이 유효하지 않을 때 페이지 false 처리
                if(req.data === 0) {
                    setIsCorrectPage(false);
                }
            })
            .catch(er => {
                console.log("통신 오류");
            })
    }

    // 비밀번호 변경 버튼 이벤트
    const changePw = () => {
        if(userPw !== userPwChk) {
            document.getElementById("failMatchPwChk").style.display = "block";
        } else {
            document.getElementById("failMatchPwChk").style.display = "none";
            setIsLoad(true);
            changePwAxios().then(() => {
                setIsLoad(false);
            });
        }
    }

    // 비밀번호 변경
    const changePwAxios = async () => {
        await axios.put("http://localhost:8080/changePw", null, {params: {userPw: userPw, url: url}})
            .then(req => {
                if(req.data === -1) {
                    alert("세션이 만료되었습니다.");
                    window.location = "/findPw";
                } else if (req.data === 0) {
                    alert("비밀번호 변경에 실패하였습니다.");
                } else {
                    alert("비밀번호 변경에 성공하였습니다.");
                    window.location = "/login";
                }
            })
            .catch(err => {
                console.log("통신 오류");
            })
    }

    const enteredPw = (e) => {
        setUserPw(e.target.value);
    }

    const enteredPwChk = (e) => {
        setUserPwChk(e.target.value);
    }

    if(isCorrectPage) {
        return (
            <div className={"container-fluid"}>
                <ClickPrevent isLoading={isLoad} />
                <HeaderD />
                <NavigationBar />
                <Loading loadStatus={isLoad}/>
                <div className={"container mb-5"}>
                    <div className={"row mt-5"} id={"changePwPageBody"}>
                        <div className={"col-3"}></div>
                        <div className={"col-6 ms-4"}>
                            <div id={"changePwPageContent"}>
                                <div className={"nanumSquareB-font-XLarge mt-5 mb-3"}>
                                    <span id={"changePwPageTitle"}>비밀번호 변경</span>
                                </div>
                                <form id={"changePwPageMain"}>
                                    <div className={"d-flex justify-content-around mb-4"}>
                                        <label id={"changePwLabel"} className={"nanumSquareR-font-normal"}>비밀번호 입력</label>
                                        <input type={"password"} onChange={enteredPw} autoComplete={"off"} />
                                    </div>
                                    <div className={"d-flex justify-content-around mb-4"}>
                                        <label id={"changePwChkLabel"} className={"nanumSquareR-font-normal"}>비밀번호 확인</label>
                                        <input type={"password"} onChange={enteredPwChk} autoComplete={"off"} />
                                    </div>
                                    <div>
                                        <p id={"failMatchPwChk"} className={"nanumSquareR-font-normal"}>비밀번호가 일치하지 않습니다.</p>
                                    </div>
                                </form>
                            </div>
                            <div className={"text-center mt-3 nanumSquareR-font-normal"}>
                                <button id={"ChangePwButton"} onClick={changePw}>비밀번호 변경</button>
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