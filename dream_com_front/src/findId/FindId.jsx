import React, {useEffect, useState} from "react";
import "./findIdCss/FindId.css";
import "./findIdCss/FindIdSuccess.css";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";
import axios from "axios";
import FindIdSuccess from "./FindIdSuccess";
import {Link} from "react-router-dom";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";

const ChangeCss = () => {
    document.getElementById("HandPhone").style.color = '#e26e6e';
    document.getElementById("HandPhone").style.border = '1px solid #e26e6e';
    document.getElementById("HandPhone").style.borderBottom = '0px';
    document.getElementById("Email").style.border = 'solid 1px #e0e0e0';
    document.getElementById("Email").style.borderBottom = '1px solid #e26e6e';
    document.getElementById("Email").style.color = 'black';
    document.getElementById("findEmail").style.display= 'block';
    document.getElementById("findPhone").style.display= 'none';

}

const ChangeCss2 = () => {
    document.getElementById("Email").style.color = '#e26e6e';
    document.getElementById("Email").style.border = '1px solid #e26e6e';
    document.getElementById("Email").style.borderBottom = '0px';
    document.getElementById("HandPhone").style.border = 'solid 1px #e0e0e0';
    document.getElementById("HandPhone").style.borderBottom = '1px solid #e26e6e';
    document.getElementById("HandPhone").style.color = 'black';
    document.getElementById("findPhone").style.display= 'block';
    document.getElementById("findEmail").style.display= 'none';
}

function FindId(){
    // 로딩창
    const [isLoad, setIsLoad] = useState(false);
    // 입력한 이메일 값
    const [email, setEmail] = useState("");
    // 입력한 인증번호 코드
    const [chkNumber, setChkNumber] = useState("");
    // 입력한 이름
    const [userName, setUserName] = useState("");
    // 인증번호 입력칸 disable
    const [successSendEmail, setSuccessSendEmail] = useState(false);


    // 인증코드 전송 후 받아오는 값
    const [uniqueId, setUniqueId] = useState("");
    // 인증 후 가입된 아이디 목록
    const [userIdList, setUserIdList] = useState([]);
    // 이메일 인증번호와 입력한 번호 일치하는지 확인
    const [check, setCheck] = useState(false);
    // 인증 완료 여부
    const [auth, setAuth] = useState(false);

    // 인증 메일 보내기
    const sendMailButton = async () => {
        let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(userName === "") {
            alert("이름을 입력해주세요");
        } else if(!exptext.test(email)) {
            alert("이메일 형식이 아닙니다.");
        }
        else {
            setIsLoad(true);
            await axios.post("http://localhost:8080/findIdPageCheckSignedInfo", null,
                {params: {userEmail: email, userName: userName}})
                .then(req => {
                    if(req.data === 0) {
                        alert("회원가입 정보가 일치하지 않습니다.");
                        setIsLoad(false);
                    } else {
                        sendMailAxios().then(() => {
                            setIsLoad(false);
                        });
                    }
                })
                .catch(err=> {
                    console.log("통신 에러");
                })
        }

    }


    // 인증번호 후 아이디 확인 페이지로
    const authCheck = async () => {
        if(chkNumber === "") {
            alert("인증코드를 입력하세요")
        } else {
            await axios.post("http://localhost:8080/EmailChk", null, {params: {chkNumber: chkNumber, uniqueId: uniqueId}})
                .then(req => {
                    if(req.data === 1) {
                        setCheck(true);
                    } else {
                        alert("인증번호를 확인해주세요");
                    }
                })
                .catch(err => {
                    console.log("통신 에러");
                })
        }
    }
    // 인증번호 확인 후 인증여부변수 변경
    useEffect(() => {
        if(!check) {
            return;
        }
        setAuth(true);
    }, [check])

    // 인증번호 일치된 후 가입된 아이디 불러오기
    useEffect(() => {
        if(!auth) {
            return;
        }
        setIsLoad(true);
        getId().then(() => {
            setIsLoad(false);
        })
    }, [auth])

    // 이메일 보내기
    const sendMailAxios = async () => {
        await axios.post("http://localhost:8080/sendEmail", null, {params: {email: email}})
            .then(req => {
                alert("이메일 전송이 완료되었습니다.");
                setUniqueId(req.data);
                setSuccessSendEmail(true);
            })
            .catch(err => {
                console.log("통신 에러");
            })
    }

    // 아이디 정보 가져오기
    const getId = async () => {
        setIsLoad(true);
        await axios.post("http://localhost:8080/getSignedId", null, {params: {userEmail: email, userName: userName}})
            .then(req => {
                const temp = req.data;
                setUserIdList(temp);
            })
            .catch(err => {
                console.log("통신 에러");
            })
        setIsLoad(false);
    }

    // 입력한 이름 저장
    const enteredName = (e) => {
        setUserName(e.target.value);
    }

    // 입력한 이메일 번호 저장
    const enteredEmail = (e) => {
        setEmail(e.target.value);
    }
    // 입력한 인증번호 저장
    const enteredChkNumber = (e) => {
        setChkNumber(e.target.value);
    }




    if(!auth) {
        return(
            <div className={"container-fluid"}>
                <ClickPrevent isLoading={isLoad} />
                <HeaderD />
                <NavigationBar />
                <div className={"container mb-4"}>
                    <Loading loadStatus={isLoad}/>
                    <div className={"row findId"}>
                        <div className={"col-3"}></div>
                        <div className={"col-5 ms-4"} style={{paddingBottom: "20px"}}>
                            <div>
                                <ul>
                                    <li style={{float:"left"}}>
                                        <a className={"nanumSquareR-font-normal"} onClick={ChangeCss}
                                           id={"HandPhone"} href={"#"}><b>이메일로 찾기</b></a>
                                    </li>
                                    <li style={{float:"right"}}><a className={"nanumSquareR-font-normal"}
                                                                   id={"Email"} href={"#"} onClick={ChangeCss2}><b>휴대폰으로 찾기</b></a>
                                    </li>
                                </ul>
                            </div>

                            <div id={"findPhone"} style={{display:'none'}}>
                                <div>
                                    <input type="radio" className={"mt-5 ms-5"} defaultChecked={true} id={"radio"}/>
                                    <label className={"ms-2 nanumSquareR-font-normal"} style={{color:"#e26e6e"}}><b>휴대폰 번호로 찾기</b></label>
                                    <p className={"mt-2 ms-5 nanumSquareR-font-normal"}>가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.</p>
                                </div>
                                <ul className={"mt-5"} id={"testUl"}>
                                    <li>
                                        <label className={"nanumSquareR-font-normal mt-2 me-5"}>이름</label>
                                        <input className={"findInput nanumSquareR-font-normal"} />
                                    </li>
                                    <li>
                                        <label className={"nanumSquareR-font-normal me-3 mt-5"}>전화번호</label>
                                        <input className={"PhoneInput"} placeholder={"특수문자를 제외한 숫자로만 입력"} />
                                        <button className={"ms-3 nanumSquareR-font-normal"}>인증요청</button>
                                    </li>
                                    <li>
                                        <label className={"nanumSquareR-font-normal me-3 mt-5"}>인증번호</label>
                                        <input className={"findInput nanumSquareR-font-normal"} />
                                    </li>
                                </ul>
                            </div>

                            <div id={"findEmail"}>
                                <div>
                                    <input type="radio" className={"mt-5 ms-5"} defaultChecked={true} id={"radio"}/>
                                    <label className={"ms-2 nanumSquareR-font-normal"} style={{color:"#e26e6e"}}><b>이메일로 찾기</b></label>
                                    <p className={"mt-2 ms-5 nanumSquareR-font-normal"}>가입 당시 입력한 이메일 주소를 통해 아이디를 찾을 수 있습니다.</p>
                                </div>
                                <ul className={"mt-5"} id={"testUl"}>
                                    <li>
                                        <label className={"nanumSquareR-font-normal mt-2 me-5"}>이름</label>
                                        <input className={"findInput nanumSquareR-font-normal"} onChange={enteredName} />
                                    </li>
                                    <li>
                                        <label className={"nanumSquareR-font-normal mt-5"} style={{marginRight:"34px"}}>이메일</label>
                                        <input className={"EmailInput nanumSquareR-font-normal"} placeholder={"이메일을 입력하세요."} onChange={enteredEmail} />
                                        <button className={"ms-3 nanumSquareR-font-normal"} onClick={sendMailButton}>인증요청</button>
                                    </li>
                                    <li>
                                        <label className={"nanumSquareR-font-normal me-3 mt-5"}>인증번호</label>
                                        <input className={"findInput nanumSquareR-font-normal"} onChange={enteredChkNumber} disabled={!successSendEmail} />
                                    </li>
                                </ul>
                            </div>
                            <hr className={"ms-4 mt-5"}/>
                            <div className={"d-flex justify-content-center mt-4"}>
                                <Link to={"/findId?success"} id={"nextBtn"}>
                                    <button className={"nanumSquareR-font-large"} id={"nextBtn"}
                                            onClick={authCheck} disabled={!successSendEmail}>아이디 확인</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            <HeaderD />
            <NavigationBar />
            <div className={"container mb-3"}>
                <Loading loadStatus={isLoad}/>
                <FindIdSuccess userIdList={userIdList} isLoad={isLoad} />
            </div>
            <Footer />
        </div>
    )
}

export default FindId