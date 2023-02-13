import React, {useEffect, useState} from "react";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import BuyProductList from "./BuyProductList";
import Footer from "../common/Footer";
import MyPageNav from "./MyPageNav";
import axios from "axios";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";
import "./BuyProductList.css";
import {useLocation, useNavigate} from "react-router-dom";
import ModalFrame from "../reviewModal/ModalFrame";
import ReviewModalApp from "../reviewModal/ReviewModalApp";

function Mypage() {
    const [loginUserId, setLoginUserId] = useState(); // 로그인 한 유저의 아이디
    const [orderList, setOrderList] = useState([]); // 주문내역 목록
    const [reviews, setReviews] = useState(); // 유저가 작성한 리뷰 목록
    const [blankHeight, setBlankHeight] = useState("0px"); // 주문내역이 없어서 텅비는 문제를 해결하기위해 선언
    const [isLoad, setIsLoad] = useState(false); // 로딩창
    const navigate = useNavigate(); // 페이지 이동 네비게이션
    const pageUrl = useLocation(); // 현재 페이지 경로
    const [modalIsOpen, setModalIsOpen] = useState(false); // 리뷰 모달창 표시 여부
    const [selectedProductNumber, setSelectedProductNumber] = useState(0); // 선택한 제품 번호
    
    // 서버에게 환불요청을 한 후 데이터 재 로딩
    const requestCancel = (paymentNumber, productNumber) => {
        setIsLoad(true);
        axios.put("http://localhost:8080/cancelPayment", null, {params : {
                userId : loginUserId, paymentNum : paymentNumber, productNum : productNumber
            }}).then(response => {
            if (response.data == "취소 완료") {
                alert("환불 요청이 완료되었습니다.");
                getOrderList();
                getUserReview();
            }
        }).catch(err => {
            setIsLoad(false);
            console.log(`에러메세지 : ${err}`);
            console.log("환불요청에 실패했습니다.");
        });
    }
    
    // 서버에게 구매확정을 요청후 데이터 재 로딩
    const updatePurchaseConfirm = (paymentNumber, productNumber) => {
        setIsLoad(true);
        axios.post("http://localhost:8080/confirmPurchase", null, {params : {paymentNum : paymentNumber,
            productNum : productNumber}})
            .then(response => {
                if (response.data == 1) {
                    alert("구매확정 처리되었습니다.");
                    getOrderList();
                    getUserReview();
                } else {
                    alert("구매확정이 정상적으로 되지 않았습니다.");
                }
            })
            .catch(err => {
                setIsLoad(false);
                console.log(`에러메세지 : ${err}`);
                console.log("구매확정에 실패했습니다.");
            });
    }
    
    // 로그인 페이지에서 중복으로 넘어오는지 체크합니다.
    // 로그인 페이지에서 뒤로가기 누르면 못 벗어나는 문제를 해결하기위해 선언
    const inviteFirstMyPageNotLogin = () => {
        // 미 로그인 상태에서 마이페이지에 접속한경우 세션 스토리지에 중복체크를 판단할 수 있는 값을 저장
        if (sessionStorage.getItem("isFirstLogin") == null) {
            sessionStorage.setItem("isFirstLogin", "true");
            return true;
        } else { // 미 로그인 상태에서 마이페이지에 또 다시 접속된경우 세션 스토리지에 중복체크 값 제거하고 메인으로 이동시킴
            sessionStorage.removeItem("isFirstLogin");
            return false;
        }
    }
    
    // 선택한 제품의 번호를 가져오는 함수
    const getSelectedProductNumber = (productNumber) => {
        setSelectedProductNumber(productNumber);
        setModalIsOpen(true);
    }
    
    // 주문내역이 너무 없어서 텅 비는 문제를 해결하기위해 주문내역 개수에 따라 빈 높이값을 조절
    const controlBlankHeight = () => {
        if (orderList.length == 0) {
            setBlankHeight("525px");
        } else if (orderList.length == 1) {
            setBlankHeight("325px");
        } else if (orderList.length == 2) {
            setBlankHeight("125px");
        }
    }
    
    // 주문 내역에 있는 제품번호와 리뷰 내용에 있는 제품번호를 매칭시켜서 해당 제품의 리뷰 내용을 저장한다.
    // 매개변수 : 주문 내역의 리뷰 번호
    const getTargetReview = (productNum) => {
        let reviewContent = null;
        for (let review in reviews) {
            if (reviews[review].productNum == productNum) {
                reviewContent = reviews[review].content == "" ? "리뷰를 입력하지 않았습니다." : reviews[review].content;
                break;
            }
        }
        return reviewContent;
    }
    
    // 한 제품의 주문 내용을 받아서 상품 정보에 표시 될 부분만 객체로 만들어준다.
    // 매개변수 : 한 제품의 주문 내용(모든 데이터)
    const createOrderInfo = (order) => {
        let tempObj = {};
        tempObj.productTitle = order.productTitle;
        tempObj.productPrice = order.productPrice;
        tempObj.productNum = order.productNum;
        tempObj.thumbnailImg = order.thumbnailImg;
        return tempObj;
    }
    
    // 한 제품의 주문 내용을 받아서 구매 정보에 표시 될 부분만 객체로 만든다.
    // 매개변수 : 한 제품의 주문 내용(모든 데이터)
    const createPaymentInfo = (order) => {
        let tempObj = {};
        tempObj.paymentNum = order.paymentNum;
        tempObj.paymentDate = order.paymentDate;
        tempObj.methodName = order.methodName;
        tempObj.price = order.price;
        tempObj.quantity = order.quantity;
        tempObj.state = order.state;
        return tempObj;
    }
    
    
    // 서버에게 현재 로그인 한 유저의 아이디를 요청
    const getLoginUserId = () => {
        axios.post("http://localhost:8080/loginUserId", null, {params : {
                userUUID : sessionStorage.getItem("loginUUID"),
                autoUserUUID : localStorage.getItem("autoLoginUUID")
            }}).then(response => {
            if (response.data == null || response.data == undefined || response.data == "") {
                setLoginUserId(null);
                if(inviteFirstMyPageNotLogin()) { // 미 로그인 상태로 마이페이지에 처음으로 접속했었다면
                    navigate(`/login?prev=${pageUrl.pathname + pageUrl.search}`); // 미 로그인 상태면 로그인 페이지로 이동시킨다.
                } else { // 미 로그인 상태로 마이페이지에 처음 접속한게 아니라면
                    navigate("/"); // 메인으로 이동
                }
            } else {
                sessionStorage.removeItem("isFirstLogin"); // 로그인 성공하면 마이페이지에 중복 접속하는 체크 값 제거
                setLoginUserId(response.data);
            }
        }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("유저 아이디 취득에 실패했습니다.");
        });
    }
    
    // 서버에게 주문내역을 요청
    const getOrderList = () => {
        axios.get("http://localhost:8080/paymentData", {params : {userId : loginUserId}})
            .then(response => {
                setOrderList(response.data);
            }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("주문 내역을 가져오는데 실패했습니다.");
        });
    }
    
    // 서버에게 로그인 한 유저가 작성한 리뷰 목록을 요청
    const getUserReview = () => {
        axios.get("http://localhost:8080/userReview", {params : {userId : loginUserId}})
            .then(response => {
                setReviews(response.data);
                setIsLoad(false);
            }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("유저의 리뷰 목록을 가져오는데 실패했습니다.");
        });
    }
    
    // 최초로 페이지 실행시 로그인 한 유저 아이디를 받아오게 함
    useEffect(() => {
        setIsLoad(true);
        getLoginUserId();
    }, []);
    
    // 유저 아이디를 받아온 후 해당 유저의 주문 내역과 리뷰를 받아온다.
    useEffect(() => {
        if (loginUserId == undefined) {
            return;
        }
        
        getOrderList();
        getUserReview();
    }, [loginUserId]);
    
    useEffect(() => {
        controlBlankHeight();
    }, [orderList]);
    
    // 댓글을 작성한 경우 데이터 재 로딩
    useEffect(() => {
        if (modalIsOpen == false && loginUserId != undefined) {
            setIsLoad(true);
            getOrderList();
            getUserReview();
        }
    }, [modalIsOpen]);
    
    return(
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad}/>
            <Loading loadStatus={isLoad}/>
            <HeaderD />
            <NavigationBar />
            <MyPageNav />
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3 className={"mt-5 nanumSquareR-font-large"}><strong>주문배송 & 구매내역 조회</strong></h3>
                        <hr />
                        <ul className={"mb-5 deliveryInformation"}>
                            <li className={"nanumSquareR-font-small"}>일반적으로 소비자는 자신이 체결한 전자상거래 계약에 대해 그 계약의 내용을 불문하고 그 청약철회 및 계약해제의 기간(통상 7일) 내에는 청약철회 등을 자유롭게 할 수 있습니다.</li>
                            <li className={"nanumSquareR-font-small"}>출고 완료 직후 교환 / 환불 요청을 하더라도 상품을 수령하신 후 택배 업체를 통해 보내주셔야
                                처리 가능합니다.
                            </li>
                        </ul>
                    </div>
                </div>
                <table className={"table nanumSquareR-font-small my-page-payment-table"}>
                    <thead className={"buyProductListThead"}>
                        <tr className={"text-center"}>
                            <th className={"col-4"}>상품정보</th>
                            <th className={"col-2"}>주문일자</th>
                            <th className={"col-1"}>결제수단</th>
                            <th className={"col-2"}>주문금액(수량)</th>
                            <th className={"col-1"}>배송상태</th>
                            <th className={"col-2"}>주문상태</th>
                        </tr>
                    </thead>
                    <tbody className={"buyProductListTbody"}>
                        {
                            orderList.map(order => {
                                return (
                                    <BuyProductList key={order.key} orderInfo={createOrderInfo(order)} review={getTargetReview(order.productNum)}
                                        paymentInfo={createPaymentInfo(order)} funcGetProductNumber={getSelectedProductNumber}
                                        funcUpdatePurchaseConfirm={updatePurchaseConfirm} funcRequestCancel={requestCancel}/>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div style={orderList.length < 3 ? {height : blankHeight} : {height : "50px"}} className={"row"}>
                <div className={"col d-flex justify-content-center"}>
                    {
                        orderList.length == 0 ? <p style={{marginTop : "235px"}} className={"nanumSquareR-font-large"}>주문 배송 & 구매내역이 존재하지 않습니다.</p> : ""
                    }
                </div>
            </div>
            <div>
                {modalIsOpen && (
                    <ModalFrame setModalIsOpen={setModalIsOpen}>
                        <ReviewModalApp setModalIsOpen={setModalIsOpen} productNum={selectedProductNumber} userId={loginUserId} />
                    </ModalFrame>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Mypage;