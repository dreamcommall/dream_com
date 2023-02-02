import React, {useEffect, useState} from "react";
import PurchaseHead from "./PurchaseHead";
import DeliveryAddress from "./DeliveryAddress";
import Receipt from "./Receipt";
import PaymentMethod from "./PaymentMethod";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";
import axios from "axios";
import {Link, useSearchParams} from "react-router-dom";
import ErrorPageApp from "../common/ErrorPage/ErrorPageApp";

function PurchaseApp({loginId}) {
    const [param, setParam] = useSearchParams();
    const [isLoad, setIsLoad] = useState(false); // 로딩창
    const [purchaseProductList, setPurchaseProductList] = useState([]);
    const [addressList, setAddressList] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [quantity, setQuantity] = useState(0);

    const [isCorrectPage, setIsCorrectPage] = useState(true);

    let parameterProductNum = parseInt(param.get("productNum"));

    let parameterQuantity = parseInt(param.get("quantity"));




    useEffect(() => {
        setQuantity(parameterQuantity);
        // 페이지 url 틀렸을 경우 오류페이지 이동
        if(isNaN(parameterQuantity)) {
            setIsCorrectPage(false);
        }
        if(isNaN(parameterProductNum) || parseInt(param.get("quantity")) <= 0) {
            setIsCorrectPage(false);
        }
        if(loginId == null) {
            setIsCorrectPage(false);
        }

        // url이 바르게 입력 되었을 때 axios 통신 시작
        if(isCorrectPage) {
            setIsLoad(true);
            purchaseData(parameterProductNum).then(() => {
                setIsLoad(false);
            });
        }
    }, []);

    let totalPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryPrice = 0;

    // 제품 주문금액 합계 / 할인금액 합계 계산

    purchaseProductList.forEach(item => {
        const price = item.productPrice * item.inventoryQuantity;
        totalPrice += price;

        const discount =  item.productPrice * (item.productDiscount / 100) * item.inventoryQuantity;
        totalDiscount += discount;

        let deliveryPrice = 0;
        if(price == 0) {
            deliveryPrice = 0
        } else if(price < 100000) {
            deliveryPrice = 5000;
        } else if(price < 300000) {
            deliveryPrice = 3000;
        } else {
            deliveryPrice = 0;
        }
        totalDeliveryPrice += deliveryPrice;
    })

    const receipt = [
        {key: 1, price: totalPrice, discount: totalDiscount, deliveryPrice: totalDeliveryPrice, }
    ]

    const purchaseData = async (productNum) => {

        // 상세페이지에서 구매버튼누른 제품 데이터 + 장바구니에 있는 제품 데이터 임시 저장
        let tempPurchaseProductList = [];
        let tempPurchaseProductNum = 0;
        // 배송지 정보 임시 저장
        let tempAddressList = [];
        // 유저 정보 임시 저장
        let tempUserInfo = {};

        if(!isNaN(productNum)) {
            // 구매버튼 누른 제품 데이터 받아오기
            await axios.get("http://localhost:8080/fullProductInfo", {params: {productNum: productNum}})
                .then(req => {
                    if(req.data == "") {
                        setIsCorrectPage(false);
                    } else {
                        tempPurchaseProductList.push(req.data[0]);
                    }
                })
                .catch(err => {
                    // 제품 데이터명 틀렸을 시 에러페이지
                    setIsCorrectPage(false);
                });
        }

        if(loginId != null) {
            // 로그인 되어있는 사용자의 장바구니 목록 가져오기
            await axios.get("http://localhost:8080/selectCart", {params: {userId: loginId}})
                .then(req => {
                    // 장바구니 목록 개수만큼 정보 불러오기 반복, 저장
                    req.data.forEach((item) => {
                        if(item.productNum != parameterProductNum) {
                            tempPurchaseProductList.push(item);
                        }
                    });
                })
                .catch(err => {
                    console.log("통신 에러");
                });

            // 로그인된 사용자의 배송지 정보 가져오기
            await axios.post("http://localhost:8080/address", null, {params: {userId: loginId}})
                .then(req => {
                    // 로그인 정보가 없을 때
                    if(req.data == "") {
                        setIsCorrectPage(false);
                    }
                    req.data.forEach(item => {
                        tempAddressList.push(item);
                    });
                    setAddressList(tempAddressList);
                })
                .catch(err => {
                    console.log("통신 오류");
                });


            //     사용자 정보 가져오기
            await  axios.get("http://localhost:8080/getUserInfo", {params: {userId: loginId}})
                .then(req => {
                    tempUserInfo = req.data[0];
                    setUserInfo(tempUserInfo);
                })
                .catch(err => {
                    console.log("통신 오류");
                });
        }
        // 구매목록 + 장바구니 목록 리스트 저장
        setPurchaseProductList(tempPurchaseProductList);
    }

    if(!isCorrectPage) {
        return (
            <ErrorPageApp />
        )
    }
    return(
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            {/*<HeaderD />*/}
            {/*<NavigationBar />*/}
            <div className={"mt-3 mb-5"}>
                <Loading loadStatus={isLoad}/>
                <PurchaseHead purchaseProductList={purchaseProductList} quantity={quantity} />
                <Receipt item={receipt} />
                <DeliveryAddress addressList={addressList} userInfo={userInfo} />
                <PaymentMethod />
            </div>
            {/*<Footer />*/}
        </div>
    )
}

export default PurchaseApp;