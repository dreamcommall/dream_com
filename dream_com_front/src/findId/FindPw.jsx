import React, {useState} from "react";
import "./FindPw.css"

const ChangeCss = () => {
    document.getElementById("HandPhone").style.color = '#e26e6e';
    document.getElementById("HandPhone").style.border = '1px solid #e26e6e';
    document.getElementById("HandPhone").style.borderBottom = '0px';
    document.getElementById("Email").style.border = 'solid 1px #e0e0e0';
    document.getElementById("Email").style.borderBottom = '1px solid #e26e6e';
    document.getElementById("Email").style.color = 'black';
    document.getElementById("findEmail").style.display= 'none';
    document.getElementById("findPhone").style.display= 'block';

}

const ChangeCss2 = () => {
    document.getElementById("Email").style.color = '#e26e6e';
    document.getElementById("Email").style.border = '1px solid #e26e6e';
    document.getElementById("Email").style.borderBottom = '0px';
    document.getElementById("HandPhone").style.border = 'solid 1px #e0e0e0';
    document.getElementById("HandPhone").style.borderBottom = '1px solid #e26e6e';
    document.getElementById("HandPhone").style.color = 'black';
    document.getElementById("findPhone").style.display= 'none';
    document.getElementById("findEmail").style.display= 'block';
}

function FindPw(){
    const [name,setName] = useState("");

    const nameHandleChange = (e) => {
        setName(e.target.value)
    }

    return(
        <div className={"container mt-5"}>
            <div className={"row findPw"}>
                <div className={"col-3"}></div>
                <div className={"col-5 ms-4 mt-4"}>
                    <div>
                        <ul>
                            <li style={{float:"left"}}>
                                <a className={"nanumSquareR-font-normal"} onClick={ChangeCss}
                                   id={"HandPhone"} href={"#"}><b>휴대폰으로 찾기</b></a>
                            </li>
                            <li style={{float:"right"}}><a className={"nanumSquareR-font-normal"}
                                                           id={"Email"} href={"#"} onClick={ChangeCss2}><b>이메일로 찾기</b></a>
                            </li>
                        </ul>
                    </div>

                    <div id={"findPhone"}>
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

                    <div id={"findEmail"} style={{display:'none'}}>
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
                                <input className={"findInput nanumSquareR-font-normal"} />
                            </li>
                            <li>
                                <label className={"nanumSquareR-font-normal mt-5 me-5"}>이름</label>
                                <input className={"findInput nanumSquareR-font-normal"} />
                            </li>
                            <li>
                                <label className={"nanumSquareR-font-normal mt-5"} style={{marginRight:"34px"}}>이메일</label>
                                <input className={"EmailInput nanumSquareR-font-normal"} placeholder={"이메일을 입력하세요."}/>
                                <button className={"ms-3 nanumSquareR-font-normal"}>인증번호</button>
                            </li>
                            <li>
                                <label className={"nanumSquareR-font-normal me-3 mt-5"}>인증번호</label>
                                <input className={"findInput"} />
                            </li>
                        </ul>
                    </div>
                    <hr className={"ms-4 mt-5"}/>
                    <div className={"text-center mt-4"}>
                        <button className={"nanumSquareR-font-large"} id={"nextBtn"}>다음</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindPw