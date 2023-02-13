import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'

import "./Clause.css"
import "../fonts/fontStyle.css"

import NewSignUpHeader from "./NewSignUpHeader";


function clause() {



    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [allCheck, setAllCheck] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ageCheck, setAgeCheck] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [useCheck, setUseCheck] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [marketingCheck, setMarketingCheck] = useState(false);


    const allBtnEvent = () => {
        if (allCheck === false) {
            setAllCheck(true);
            setAgeCheck(true);
            setUseCheck(true);
            setMarketingCheck(true);
        } else {
            setAllCheck(false);
            setAgeCheck(false);
            setUseCheck(false);
            setMarketingCheck(false);
        }
    };

    const ageBtnEvent = () => {
        if (ageCheck === false) {
            setAgeCheck(true)
        } else {
            setAgeCheck(false)
        }
    };

    const useBtnEvent = () => {
        if (useCheck === false) {
            setUseCheck(true)
        } else {
            setUseCheck(false)
        }
    };

    const marketingBtnEvent = () => {
        if (marketingCheck === false) {
            setMarketingCheck(true)
        } else {
            setMarketingCheck(false)
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (ageCheck === true && useCheck === true && marketingCheck === true) {
            setAllCheck(true)
        } else {
            setAllCheck(false)
        }
    }, [ageCheck, useCheck, marketingCheck])

    return (
        <div>
            <NewSignUpHeader pageName={"Clause"}/>
        <div className="container">
            <div className="logo nanumSquareB-font-normal"><h1>회원 약관 동의</h1></div>
            <div className="contents">
                <div id="div__wrap">
                    <div className="terms__check__all nanumSquareB-font-normal">
                        <input type="checkbox" name="checkAll" id="checkAll" checked={allCheck} onChange={allBtnEvent}/>
                        <label style={{marginLeft: "10px"}} htmlFor=" checkAll">
                            Dream computer 이용약관, 개인정보 수집 및 이용, 프로모션 정보
                            수신(선택)에 모두 동의합니다.</label>
                    </div>
                    <ul className
                            ="terms__list">
                        <li className
                                ="terms__box">
                            <div className
                                     ="input__check">
                                <input type="checkbox" name="agreement" id="termsOfService" value="termsOfService"
                                       required checked={ageCheck} onChange={ageBtnEvent}/>
                                <label htmlFor="termsOfService" className
                                    ="required nanumSquareB-font-normal">Dream computer
                                    이용약관 동의</label>
                            </div>
                            <div className
                                     ="terms__content">
                                여러분을 환영합니다. Dream computer 서비스 및 제품(이하 ‘서비스’)을 이용해
                                주셔서 감사합니다. 본 약관은 다양한 Dream computer 서비스의 이용과 관련하여
                                Dream computer 서비스를 제공하는 Dream computer 주식회사(이하 ‘Dream computer ’)와 이를 이용하는
                                Dream computer 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며,
                                아울러 여러분의 Dream computer 서비스 이용에 도움이 될 수 있는 유익한
                                정보를 포함하고 있습니다. Dream computer 서비스를 이용하시거나 Dream computer 서비스
                                회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을
                                확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐
                                주시기 바랍니다.
                            </div>
                        </li>
                        <li className
                                ="terms__box">
                            <div className
                                     ="input__check">
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    id="privacyPolicy"
                                    value="privacyPolicy"
                                    required
                                    checked={useCheck} onChange={useBtnEvent}/>
                                <label htmlFor="privacyPolicy" className="required nanumSquareB-font-normal">개인정보 수집 및 이용
                                    동의</label>
                            </div>
                            <div className
                                     ="terms__content">
                                개인정보보호법에 따라 Dream computer에 회원가입 신청하시는 분께 수집하는
                                개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
                                이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내
                                드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.1. 수집하는
                                개인정보 이용자는 회원가입을 하지 않아도 정보 검색, 뉴스 보기 등
                                대부분의 네이버 서비스를 회원과 동일하게 이용할 수 있습니다.
                                이용자가 메일, 캘린더, 카페, 블로그 등과 같이 개인화 혹은 회원제
                                서비스를 이용하기 위해 회원가입을 할 경우, 네이버는 서비스
                                이용을 위해 필요한 최소한의 개인정보를 수집합니다.
                            </div>
                        </li>

                        <li className
                                ="terms__box">
                            <div className
                                     ="input__check">
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    id="allowPromotions"
                                    value="allowPromotions"
                                    checked={marketingCheck} onChange={marketingBtnEvent}
                                />
                                <label htmlFor="allowPromotions" className={"nanumSquareB-font-normal"}>프로모션 정보 수신
                                    동의</label>
                            </div>
                            <div className="terms__content">
                                Dream computer 에서 제공하는 이벤트/혜택 등 다양한 정보를 휴대전화(Dream computer
                                알림 또는 문자), 이메일로 받아보실 수 있습니다. 일부 서비스(별도
                                회원 체계로 운영하거나 Dream computer 가입 이후 추가 가입하여 이용하는
                                서비스 등)의 경우, 개별 서비스에 대해 별도 수신 동의를 받을 수
                                있으며, 이때에도 수신 동의에 대해 별도로 안내하고 동의를
                                받습니다.
                            </div>
                        </li>
                    </ul>

                        <Link to={"/signUp"}>
                            <button className="next-button" style={{fontFamily: "nanumSquareB-font-normal"}}
                                    disabled={ageCheck == true && useCheck == true ? false : true}>확인</button>
                        </Link>
                </div>
            </div>
        </div>
        </div>

    );
}

export default clause;