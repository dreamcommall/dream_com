import React, {useEffect, useState} from "react";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import BuyProductList from "./BuyProductList";
import Footer from "../common/Footer";
import MyPageNav from "./MyPageNav";
import axios from "axios";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";

function Mypage() {
    const [loginUserId, setLoginUserId] = useState(); // 로그인 한 유저의 아이디
    const [orderList, setOrderList] = useState([]); // 주문내역 목록
    const [reviews, setReviews] = useState(); // 유저가 작성한 리뷰 목록
    const [isLoad, setIsLoad] = useState(false); // 로딩창
    
    // 주문 내역에 있는 제품번호와 리뷰 내용에 있는 제품번호를 매칭시켜서 해당 제품의 리뷰 내용을 저장한다.
    // 매개변수 : 주문 내역의 리뷰 번호
    const getTargetReview = (productNum) => {
        let reviewContent = "";
        for (let review in reviews) {
            if (reviews[review].productNum == productNum) {
                reviewContent = reviews[review].content;
                break;
            }
        }
        return reviewContent;
    }
    
    // 한 제품의 주문 내용을 받아서 상품정보에 표시 될 부분만 객체로 만들어준다.
    // 매개변수 : 한 제품의 주문 내용(모든 데이터)
    const createOrderInfo = (order) => {
        let tempObj = {};
        tempObj.productTitle = order.productTitle;
        tempObj.productPrice = order.productPrice;
        tempObj.productNum = order.productNum;
        tempObj.thumbnailImg = order.thumbnailImg;
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
            } else {
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
            }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("유저의 리뷰 목록을 가져오는데 실패했습니다.");
        });
    }
    
    // 최초로 페이지 실행시 로그인 한 유저 아이디를 받아오게 함
    useEffect(() => {
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
    
    return(
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad}/>
            <Loading loadStatus={isLoad}/>
            <HeaderD />
            <NavigationBar />
            <MyPageNav />
            <div className={"container mt-5"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <h3 className={"mt-5 ms-3 nanumSquareR-font-large"}><strong>주문내역 조회</strong></h3>
                        <hr className={"ms-3"}/>
                        <ul className={"mb-5 deliveryInformation ms-3"}>
                            <li className={"nanumSquareR-font-small"}>일반적으로 소비자는 자신이 체결한 전자상거래 계약에 대해 그 계약의 내용을 불문하고 그 청약철회 및 계약해제의 기간(통상 7일) 내에는 청약철회 등을 자유롭게 할 수 있습니다.</li>
                            <li className={"nanumSquareR-font-small"}>출고 완료 직후 교환 / 환불 요청을 하더라도 상품을 수령하신 후 택배 업체를 통해 보내주셔야
                                처리 가능합니다.
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    orderList.map(order => {
                        return (
                            <BuyProductList orderInfo={createOrderInfo(order)} review={getTargetReview(order.productNum)} />
                        );
                    })
                }
            </div>
            <Footer />
        </div>
    )
}

export default Mypage;