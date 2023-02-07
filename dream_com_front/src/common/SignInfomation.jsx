import React, {useEffect, useRef, useState} from "react";
import "./SignInfomation.css";
import "../fonts/fontStyle.css";
import {useDaumPostcodePopup} from 'react-daum-postcode';
import SignUpHeader from "../SignUp/SignUpHeader";
import axios from "axios";
import ClickPrevent from "./ClickPrevent";
import Loading from "./Loading";


// var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
// var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
// var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합

let sessionName = "";

function SignInfomation() {

    // 초기값 세팅
    const [id, setId] = useState(""); //아이디
    const [name, setName] = useState(""); //이름
    const [password, setPassword] = useState(""); //비밀번호
    const [passwordConfirm, setPasswordConfirm] = useState(""); //비밀번호 확인
    const [email, setEmail] = useState(""); //이메일
    const [phone, setPhone] = useState(""); //휴대전화번호
    const [gender, setGender] = useState("");//성별
    const [enroll_company, setEnroll_company] = useState({address: '', zonecode: '', company: ''});


    // 오류메세지 상태 저장
    const [idMessage, setIdMessage] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [emailCodeMessage, setEmailCodeMessage] = useState("");

    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    //아이디 중복 체크 1:중복 //0:사용가능
    const [isCheckedId, setIsCheckedId] = useState(0);

    //이메일 인증 코드
    const [chkNumber, setChkNumber] = useState("");

    const[timerCode, setTimerCode] = useState(false);

    // 로딩창
    const [isLoad, setIsLoad] = useState(false);

    //이메일 인증코드 버튼 타이머
    const [emailCodeTimerMin, setEmailCodeTimerMin] = useState(2);
    const [emailCodeTimerSec, setEmailCodeTimerSec] = useState(59);


    // Daum 우편번호찾기 URL
    const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');



    //이름 유효성 검사
    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);
        const nameRegExp = /^[a-zA-z0-9]{0,12}$/;
        if (currentName.length < 2 || currentName.length > 5) {
            setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
            setIsName(false);
        } else if (nameRegExp.test(currentName)) {
            setNameMessage("한글만 넣어주세요");
            setIsName(false);
        } else {
            setNameMessage("사용가능한 닉네임 입니다.");
            setIsName(true);
        }
    };

    const onGender = (e) => {
        const currentGender = e.target.value;
        setGender(currentGender);
    }

//ID 유효성 검사
    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        const idRegExp = /^[a-zA-z0-9]{4,12}$/;

        if (!idRegExp.test(currentId)) {
            setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
            setIsId(false);
        } else {
            setIdMessage("사용가능한 아이디 입니다.");
            setIsId(true);
        }
    };
//비밀번호 유효성 검사
    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
            setIsPassword(false);
        } else {
            setPasswordMessage("안전한 비밀번호 입니다.");

            setIsPassword(true);
        }
    };
    //비밀 번호 체크 검사
    const onChangePasswordConfirm = (e) => {
        const currentPasswordConfirm = e.target.value;
        setPasswordConfirm(currentPasswordConfirm);
        if (password !== currentPasswordConfirm) {
            setPasswordConfirmMessage("비밀 번호가 같지않습니다");
            setIsPasswordConfirm(false);
        } else {
            setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
            setIsPasswordConfirm(true);
        }
    };
    //이메일 유효성 검사
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("");
            setIsEmail(false);
        } else {
            setEmailMessage("");
            setIsEmail(true);
        }
    };
    //휴대폰 유효성 검사
    const onChangePhone = (e) => {
        const currentPhone = e.target.value;
        setPhone(currentPhone);
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage("");
            setIsPhone(false);
        } else {
            setPhoneMessage("");
            setIsPhone(true);
        }
    };


    //가입완료 버튼시 빈 칸 검사
    const signUpBtn = () => {
        if (isId && isName && isEmail && isPhone && isPassword && isPasswordConfirm) {

            axios.put("http://localhost:8080/join", null,
                {
                    params: {
                        userId: id,
                        userName: name,
                        userPw: password,
                        userGender: gender,
                        userPost: enroll_company.zonecode,
                        userAddr: enroll_company.address,
                        userTel: phone,
                        userEmail: email,
                    }
                })
                .then((req) => {
                    console.log(req.data);
                    // 가입 완료 시 / db 저장 완료 시
                    if (req.data == 1) {

                        // window.location.href=("/signClear")
                        // 가입 실패 시 / db 저장 실패 시
                    } else {

                    }
                })
                .catch(err => {
                    console.log("가입 완료 오류");
                    console.log("에러메세지 : " + err);
                })

        } else {
            if (!isId) {
                setIdMessage("빈 칸 채워주세요");
                setIsId(false);
            }
            if (!isName) {
                setNameMessage("빈 칸 채워주세요");
                setIsName(false);
            }
            if (!isEmail) {
                setEmailMessage("빈 칸 채워주세요");
                setIsEmail(false);
            }
            if (!isPhone) {
                setPhoneMessage("빈 칸 채워주세요");
                setIsPhone(false);
            }
            if (!isPassword) {
                setPasswordMessage("빈 칸 채워주세요");
                setIsPassword(false);
            }
            if (!isPasswordConfirm) {
                setPasswordConfirmMessage("빈 칸 채워주세요");
                setIsPasswordConfirm(false);
            }
        }
    };


    //우편번호 찾기 검색=======================================================


    const handleInput = (e) => {
        setEnroll_company({
            enroll_company, [e.target.name]: e.target.value,
        })
    }

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setEnroll_company({zonecode: data.zonecode, address: data.address, company: ''});
        console.log(data);
    };

    const handleClick = () => {
        open({onComplete: handleComplete});


    };

//=================================================================================

    //아이디 중복 체크 검사 버튼
    const SignUpIdChkBtn = () => {
        console.log(id);
        setIsLoad(true)
        //회원가입 아이디 중복 체크
        axios.post("http://localhost:8080/idChk", null, {params: {userId: id}})
            .then((req) => {
                console.log(req.data)
                setIsLoad(false);
                if (req.data === 0) {
                    alert("사용가능한 아이디 입니다.")
                    return setIsCheckedId(req.data);
                } else {
                    alert("중복된 아이디 입니다")
                    return setIsCheckedId(req.data);
                }
            })
            .catch(err => {
                setIsLoad(false);
                console.log("아이디 중복체크 과정 오류");
                console.log("에러메세지 : " + err);
            })
    };

    let TIME = 179;

    let cron;

    const startBtn = () => {
        cron = setInterval(() => {
            const min = Math.floor(TIME / 60);
            const sec = Math.floor(TIME % 60);
            setEmailCodeTimerMin(min)
            setEmailCodeTimerSec(sec)
            console.log(`${min} : ${sec}`);


            TIME--;

            if ((min <= 0) && (sec <= 0)) {
                clearInterval(cron);
            }
            return ()=>clearInterval(cron)
        }, 1000);

    }

    //이메일 인증코드 전송 버튼에 2가지 동작의 함수
    const emailEventBtn = () => {
setTimerCode(!timerCode);
        startBtn();
        SignUpEmailCodeBtn();
    }


    //이메일 인증 번호 전송 통신 버튼
    const SignUpEmailCodeBtn = () => {

        axios.post("http://localhost:8080/sendEmail", null, {params: {email: email}})
            .then((req) => {

                sessionName = req.data;

                alert("인증 코드가 발송 되었습니다")
                console.log("인증 코드가 발송되었습니다")


            })
            .catch(err => {
                console.log("이메일 인증코드 발송 오류");
                console.log(`에러메세지 : ${err}`);
            })
    }
    //이메일 인증번호 확인 통신 버튼
    const SignUpEmailCodeCheckBtn = () => {
setTimerCode(!timerCode)
        clearInterval(cron);

        const emailCheckCode = document.querySelector("#input-SignUpInformationEmailCheckCode").value;
        // $("#input-emailCheckCode").val();
        console.log(sessionName);
        axios.post("http://localhost:8080/EmailChk", null, {params: {chkNumber: emailCheckCode, uniqueId: sessionName}})
            .then((req) => {

                console.log(sessionName);
                console.log(req.data);
                if (req.data === chkNumber) {
                    setChkNumber(1);
                    alert("이메일 인증에 성공하셨습니다")


                } else {
                    setChkNumber(0);
                    alert("이메일 인증코드가 일치하지 않습니다")

                }
            })
            .catch(err => {
                console.log("이메일 인증코드 비교 오류");
                console.log(`에러메세지 : ${err}`);
            })
        console.log(sessionName);
    }


    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad}/>
            <SignUpHeader/>
            <div className={"container"} id={"div-information"}>
                <div className={"div-userMain"}>
                    <p id={"p-SignInfo"} className={"nanumSquareB-font-normal"} style={{fontSize: "25px"}}>정보 입력</p>
                </div>

                <div className={"div-userList"}>
                    <div className={"div-SignUpInformationUserId"}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>이 름</p>
                        </div>
                        <div className={"col-5"}>
                            <input type={"text"} maxLength={20} id="name" value={name} onChange={onChangeName}/>
                        </div>
                        <div className={"col-5"}>
                            {isName ?
                                <p id={"p-SignInfo"} className={"message"} style={{color: "blue"}}>{nameMessage}</p> :
                                <p id={"p-SignInfo"} className={"message"} style={{color: "red"}}>{nameMessage}</p>}
                        </div>
                    </div>

                    <div className={"div-SignUpInformationUserId"}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>아이디</p>
                        </div>
                        <div className={"col-5"}>
                            <input type={"text"} maxLength={15} value={id} onChange={onChangeId}/>
                            <button  className={"userBtn nanumSquareR-font-normal"} onClick={SignUpIdChkBtn}>중복 체크</button>
                            {/*() => SignCommu(id, setIsCheckedId)*/}
                            <Loading loadStatus={isLoad}/>
                        </div>
                        <div className={"col-5"}>
                            {isId ? <p id={"p-SignInfo"} className={"message"} style={{color: "blue"}}>{idMessage}</p> :
                                <p id={"p-SignInfo"} className={"message"} style={{color: "red"}}>{idMessage}</p>}
                        </div>
                    </div>

                    <div className={"div-SignUpInformationUserId"}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>비밀 번호</p>
                        </div>
                        <div className={"col-5"}>
                            <input type={"password"} maxLength={15} value={password}
                                   onChange={onChangePassword}/>
                        </div>
                        <div className={"col-5"}>
                            {isPassword ? <p id={"p-SignInfo"} className={"message"}
                                             style={{color: "blue"}}>{passwordMessage}</p> :
                                <p id={"p-SignInfo"} className={"message"} style={{color: "red"}}>{passwordMessage}</p>}
                        </div>
                    </div>


                    <div className={"div-SignUpInformationUserId"}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>비밀 번호 확인</p>
                        </div>
                        <div className={"col-5"}>
                            <input type={"password"} maxLength={15} value={passwordConfirm}
                                   onChange={onChangePasswordConfirm}/>
                        </div>
                        <div className={"col-5"}>

                            {isPasswordConfirm ?
                                <p id={"p-SignInfo"} className={"message"}
                                   style={{color: "blue"}}>{passwordConfirmMessage}</p> :
                                <p id={"p-SignInfo"} className={"message"}
                                   style={{color: "red"}}>{passwordConfirmMessage}</p>}
                        </div>
                    </div>


                    <div className={"div-SignUpInformationUserId"}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>성 별</p>
                        </div>
                        <div className={"col-5"}>
                            <input name={"gender"} type={"radio"} onChange={onGender} value={"M"}/> 남성
                            <input name={"gender"} style={{marginLeft: "10px"}} type={"radio"} onChange={onGender}
                                   value={"F"}/> 여성
                        </div>
                    </div>


                    <div className={"div-SignUpInformationUserId"}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>휴대 전화</p>
                        </div>
                        <div className={"col-5"}>
                            <input type={"text"} maxLength={13} value={phone} onChange={onChangePhone}/>
                        </div>
                        <div className={"col-5"}>
                            {isPhone ?
                                <p id={"p-SignInfo"} className={"message"} style={{color: "blue"}}>{phoneMessage}</p> :
                                <p id={"p-SignInfo"} className={"message"} style={{color: "red"}}>{phoneMessage}</p>}
                        </div>
                    </div>


                    <div className={"div-userAddClass"}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>이메일</p>
                        </div>
                        <div className={"col-5"}>
                            <div id={"div-SignUpInformationUserAdd"}>
                                <div>
                                    <input type={"email"} maxLength={50} value={email}
                                           onChange={onChangeEmail}/>
                                    <button id={"emailButton"} className={"userBtn nanumSquareR-font-normal"} onClick={() => {emailEventBtn()}} >이메일 전송</button>
                                    {timerCode ? <span> {`${emailCodeTimerMin} : ${emailCodeTimerSec}`}</span> :null}



                                </div>
                                <div style={{marginTop: "10px"}}>
                                    <input id={"input-SignUpInformationEmailCheckCode"} type={"text"}/>
                                    <button type={"submit"} id={"userBtn"} className={"userBtn nanumSquareR-font-normal"}
                                            onClick={SignUpEmailCodeCheckBtn}>인증 확인
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={"col-5"}>
                            {isEmail ?
                                <p id={"p-SignInfo"} className={"message"} style={{color: "blue"}}>{emailMessage}</p> :
                                <p id={"p-SignInfo"} className={"message"} style={{color: "red"}}>{emailMessage}</p>}
                        </div>
                    </div>

                    <div className={"div-SignUpInformationUserId"}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>우편 번호</p>
                        </div>
                        <div className={"col-8"}>
                            <input type={"text"} id={"postCode"} readOnly={true} name={"address"} onChange={handleInput}
                                   value={enroll_company.zonecode}/>

                            <button className={"userBtn nanumSquareR-font-normal"} onClick={handleClick}>우편번호검색
                            </button>


                        </div>
                    </div>

                    <div className={"div-userAddClass"} style={{borderBottom: "none"}}>
                        <div className={"col-1"}></div>
                        <div className={"col-2"}>
                            <p id={"p-SignInfo"} className={"nanumSquareR-font-normal"}>주소</p>
                        </div>
                        <div className={"col-8"}>
                            <div id={"div-SignUpInformationUserAdd"}>
                                <div>
                                    <input type={"text"} id={"address"} placeholder={"주소"} style={{width: "45%"}}
                                           maxLength={50} onChange={handleInput} readOnly={true}
                                           value={enroll_company.address}/>
                                </div>
                                <div style={{marginTop: "10px"}}>
                                    <input type={"text"} id={"detailAddress"} placeholder={"상세주소"}
                                           style={{width: "45%"}} maxLength={50}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"div-SignUpInformationUserId"} style={{borderBottom: "none"}}>
                        <div className={"col-10"}></div>

                        <div className={"col-2"}>
                            <button id={"SignUpInformationClearBtn"} className={"nanumSquareR-font-normal"}
                                    onClick={signUpBtn}>가입 완료
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SignInfomation;