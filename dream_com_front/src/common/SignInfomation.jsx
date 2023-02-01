import React, {useState} from "react";
import "./SignInfomation.css";
import "../fonts/fontStyle.css";
import {useDaumPostcodePopup} from 'react-daum-postcode';
import SignUpHeader from "../SignUp/SignUpHeader";
import SignCommu from "./SignCommu";


// var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
// var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
// var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합

function SignInfomation() {

// 초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

// 오류메세지 상태 저장
    const [idMessage, setIdMessage] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");

// 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    // Daum 우편번호찾기 URL
    const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);
        const nameRegExp = /^[a-zA-z0-9]{0,12}$/;
        if (currentName.length < 2 || currentName.length > 5) {
            setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
            setIsName(false);
        } else if (nameRegExp.test(currentName)) {
            setNameMessage("숫자로 넣지마세요");
            setIsName(false);
        } else {
            setNameMessage("사용가능한 닉네임 입니다.");
            setIsName(true);
        }
    };


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


    //가입완료 버튼시 빈칸 유효성 검사
    const signUpBtn = () => {
        if (isId && isName && isEmail && isPhone && isPassword && isPasswordConfirm) {
            alert('회원 가입 완료');
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

    const [enroll_company, setEnroll_company] = useState({
        address: '',
        zonecode: '',
        company: ''
    });

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
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
    return (
        <div>
            <SignUpHeader/>
        <div className={"container"} id={"div-information"}>
            <div className={"div-userMain"}>
                <p className={"nanumSquareB-font-normal"} style={{fontSize: "25px"}}>정보 입력</p>
            </div>

            <div className={"div-userList"}>
                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>이 름</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} maxLength={20} id="name" value={name} onChange={onChangeName}/>
                    </div>
                    <div className={"col-5"}>
                        {isName ? <p className={"message"} style={{color: "blue"}}>{nameMessage}</p> :
                            <p className={"message"} style={{color: "red"}}>{nameMessage}</p>}
                    </div>
                </div>

                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>아이디</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} maxLength={15} value={id} onChange={onChangeId}/>
                        <button id={"userBtn"} className={"nanumSquareR-font-normal"} onClick={SignCommu}>중복 체크</button>
                    </div>
                    <div className={"col-5"}>
                        {isId ? <p className={"message"} style={{color: "blue"}}>{idMessage}</p> :
                            <p className={"message"} style={{color: "red"}}>{idMessage}</p>}
                    </div>
                </div>

                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>비밀 번호</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"password"} maxLength={15} value={password}
                               onChange={onChangePassword}/>
                    </div>
                    <div className={"col-5"}>
                        {isPassword ? <p className={"message"} style={{color: "blue"}}>{passwordMessage}</p> :
                            <p className={"message"} style={{color: "red"}}>{passwordMessage}</p>}
                    </div>
                </div>


                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>비밀 번호 확인</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"password"} maxLength={15} value={passwordConfirm}
                               onChange={onChangePasswordConfirm}/>
                    </div>
                    <div className={"col-5"}>

                        {isPasswordConfirm ?
                            <p className={"message"} style={{color: "blue"}}>{passwordConfirmMessage}</p> :
                            <p className={"message"} style={{color: "red"}}>{passwordConfirmMessage}</p>}
                    </div>
                </div>


                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>성 별</p>
                    </div>
                    <div className={"col-5"}>
                        <input name={"gender"} type={"radio"}/> 남성
                        <input name={"gender"} style={{marginLeft: "10px"}} type={"radio"}/> 여성
                    </div>
                </div>


                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>휴대 전화</p>
                    </div>
                    <div className={"col-5"}>
                        <input type={"text"} maxLength={13} value={phone} onChange={onChangePhone}/>
                    </div>
                    <div className={"col-5"}>
                        {isPhone ? <p className={"message"} style={{color: "blue"}}>{phoneMessage}</p> :
                            <p className={"message"} style={{color: "red"}}>{phoneMessage}</p>}
                    </div>
                </div>


                <div className={"div-userAddClass"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>이메일</p>
                    </div>
                    <div className={"col-5"}>
                        <div id={"div-userAdd"}>
                            <div>
                                <input type={"email"} maxLength={50} value={email}
                                       onChange={onChangeEmail}/>
                                <button id={"userBtn"} className={"nanumSquareR-font-normal"}>이메일 전송</button>
                                <span>00:00</span>
                            </div>
                            <div style={{marginTop: "10px"}}>
                                <input type={"text"}/>
                                <button id={"userBtn"} className={"nanumSquareR-font-normal"}>인증 확인</button>
                            </div>
                        </div>
                    </div>
                    <div className={"col-5"}>
                        {isEmail ? <p className={"message"} style={{color: "blue"}}>{emailMessage}</p> :
                            <p className={"message"} style={{color: "red"}}>{emailMessage}</p>}
                    </div>
                </div>

                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>우편 번호</p>
                    </div>
                    <div className={"col-8"}>
                        <input type={"text"} id={"postCode"} readOnly={true} name={"address"} onChange={handleInput}
                               value={enroll_company.zonecode}/>

                        <button id={"userBtn"} className={"nanumSquareR-font-normal"} onClick={handleClick}>우편번호검색
                        </button>


                    </div>
                </div>

                <div className={"div-userAddClass"} style={{borderBottom: "none"}}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>주소</p>
                    </div>
                    <div className={"col-8"}>
                        <div id={"div-userAdd"}>
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

                <div className={"div-userId"} style={{borderBottom: "none"}}>
                    <div className={"col-10"}></div>

                    <div className={"col-2"}>
                        <button id={"clearBtn"} className={"nanumSquareR-font-normal"} onClick={signUpBtn}>가입 완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
}

export default SignInfomation;