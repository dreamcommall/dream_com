import React, {useEffect, useState} from "react";
import "./FindPw.css"
import axios from "axios";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";
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

function FindPw(){
    // 로딩창
    const [isLoad, setIsLoad] = useState(false);
    // 입력한 아이디 값
    const [userId, setUserId] = useState("");
    // 입력한 이름
    const [userName, setUserName] = useState("");
    // 입력한 이메일 값
    const [email, setEmail] = useState("");
    // 입력한 인증번호 코드
    const [chkNumber, setChkNumber] = useState("");
    // 인증번호 입력칸 disable
    const [successSendEmail, setSuccessSendEmail] = useState(false);


    // 인증코드 전송 후 받아오는 값
    const [uniqueId, setUniqueId] = useState("");
    // 이메일 인증번호와 입력한 번호 일치하는지 확인
    const [check, setCheck] = useState(false);
    // 인증 완료 여부
    const [auth, setAuth] = useState(false);

    // 인증 메일 보내기
    const sendMailButton = async () => {
        let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(userId === "") {
            alert("아이디를 입력해주세요");
        } else if(userName === "") {
            alert("이름을 입력해주세요");
        } else if(!exptext.test(email)) {
            alert("이메일 형식이 아닙니다.");
        }
        else {
            setIsLoad(true);
            await axios.post("http://localhost:8080/findPwPageCheckSignedInfo", null,
                {params: {userEmail: email, userName: userName, userId: userId}})
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

    // 인증번호 확인
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
        setIsLoad(true);
        pageChange().then(() => {
            setIsLoad(false);
        });
    }, [check]);

    // 모든 과정 완료 후 페이지 이동
    const pageChange = async () => {
        await axios.post("http://localhost:8080/sendChangePwdUrl", null,
            {params: {email: email, userId: userId}})
            .then(req => {
                if(req.data === 1) {
                    console.log("완료");
                }
            })
            .catch(err => {
                console.log("통신 에러");
            })
    }

    // 입력한 아이디 저장
    const enteredUserId = (e) => {
        setUserId(e.target.value);
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

    return(
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            <HeaderD />
            <NavigationBar />
            <Loading loadStatus={isLoad}/>
            <div className={"container mb-5"}>
                <div className={"row findPw"}>
                    <div className={"col-3"}></div>
                    <div className={"col-5 ms-4"}>
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
                                <input type="radio" className={"mt-5 ms-5"} checked={true} id={"radio"}/>
                                <label className={"ms-2 nanumSquareR-font-normal"} style={{color:"#e26e6e"}}><b>휴대폰 번호로 찾기</b></label>
                                <p className={"mt-2 ms-5 nanumSquareR-font-normal"}>가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수 있습니다.</p>
                                <p className={"ms-5 nanumSquareR-font-normal"}>비밀번호는 고객님의 소중한 개인정보로
                                    <b style={{color:"red"}}> 고객센터에서 안내 또는 수정이 불가합니다.</b></p>
                            </div>
                            <ul className={"mt-5"} id={"testUl"}>
                                <li>
                                    <label className={"nanumSquareR-font-normal mt-2"} style={{marginRight:"31px"}}>아이디</label>
                                    <input className={"findInput nanumSquareR-font-normal"} />
                                </li>
                                <li>
                                    <label className={"nanumSquareR-font-normal mt-5 me-5"}>이름</label>
                                    <input className={"findInput nanumSquareR-font-normal"} />
                                </li>
                                <li>
                                    <label className={"nanumSquareR-font-normal me-3 mt-5"}>전화번호</label>
                                    <input className={"PhoneInput nanumSquareR-font-normal"} placeholder={"특수문자를 제외한 숫자로만 입력"} />
                                    <button className={"ms-3 nanumSquareR-font-normal"}>인증번호</button>
                                </li>
                                <li>
                                    <label className={"nanumSquareR-font-normal me-3 mt-5"}>인증번호</label>
                                    <input className={"findInput nanumSquareR-font-normal"} />
                                </li>
                            </ul>
                        </div>

                        <div id={"findEmail"}>
                            <div>
                                <input type="radio" className={"mt-5 ms-5"} checked={true} id={"radio"}/>
                                <label className={"ms-2 nanumSquareR-font-normal"} style={{color:"#e26e6e"}}><b>이메일로 찾기</b></label>
                                <p className={"mt-2 ms-5 nanumSquareR-font-normal"}>가입 당시 입력한 이메일 주소를 통해 아이디를 찾을 수 있습니다.</p>
                                <p className={"ms-5 nanumSquareR-font-normal"}>비밀번호는 고객님의 소중한 개인정보로
                                    <b style={{color:"red"}}> 고객센터에서 안내 또는 수정이 불가합니다.</b></p>
                            </div>
                            <ul className={"mt-5"} id={"testUl"}>
                                <li>
                                    <label className={"nanumSquareR-font-normal mt-2"} style={{marginRight:"31px"}}>아이디</label>
                                    <input className={"findInput nanumSquareR-font-normal"} onChange={enteredUserId} />
                                </li>
                                <li>
                                    <label className={"nanumSquareR-font-normal mt-5 me-5"}>이름</label>
                                    <input className={"findInput nanumSquareR-font-normal"} onChange={enteredName} />
                                </li>
                                <li>
                                    <label className={"nanumSquareR-font-normal mt-5"} style={{marginRight:"34px"}}>이메일</label>
                                    <input className={"EmailInput nanumSquareR-font-normal"} placeholder={"이메일을 입력하세요."} onChange={enteredEmail} />
                                    <button className={"ms-3 nanumSquareR-font-normal"} onClick={sendMailButton}>인증요청</button>
                                </li>
                                <li>
                                    <label className={"nanumSquareR-font-normal me-3 mt-5"}>인증번호</label>
                                    <input className={"findInput"} onChange={enteredChkNumber} disabled={!successSendEmail} />
                                </li>
                            </ul>
                        </div>
                        <hr className={"ms-4 mt-5"}/>
                        <div className={"text-center mt-4"}>
                            <button className={"nanumSquareR-font-large"} id={"nextBtn"} onClick={authCheck} disabled={!successSendEmail}>다음</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FindPw