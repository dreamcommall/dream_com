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
import {useParams, useSearchParams} from "react-router-dom";
import ErrorPageApp from "../common/ErrorPage/ErrorPageApp";

function PurchaseApp({loginId}) {
    // url 파라미터
    const [param, setParam] = useSearchParams();
    // 로딩창
    const [isLoad, setIsLoad] = useState(false);
    //  상세페이지에서 구매버튼 클릭한 제품 + 장바구니 제품 목록
    const [purchaseProductList, setPurchaseProductList] = useState([]);
    // 사용자 주소 목록
    const [addressList, setAddressList] = useState([]);
    // 사용자 정보
    const [userInfo, setUserInfo] = useState({});
    // url 파라미터로 넘어온 제품 수량
    const [quantity, setQuantity] = useState(0);
    // 결제 방법
    const [method, setMethod] = useState("none");

    // 오류페이지 확인
    const [isCorrectPage, setIsCorrectPage] = useState(true);

    // 파라미터 값
    let parameterProductNum = parseInt(param.get("productNum"));
    let parameterQuantity = parseInt(param.get("quantity"));
    let parameterLength = param.toString().length;

    // 주문상품 선택 버튼 클릭 시 변경될 state
    const [checkClick, setCheckClick] = useState(false);



    // 영수증 정보
    const [receiptPrice, setReceiptPrice] = useState(0);
    const [receiptDiscount, setReceiptDiscount] = useState(0);
    const [receiptDeliveryPrice, setReceiptDeliveryPrice] = useState(0);

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

    // 상품 체크박스 선택 했을 경우 영수증 정보 업데이트
    useEffect(() => {
        let price = 0;
        let discount = 0;
        let deliveryPrice = 0;
        const checkBoxList = document.getElementsByClassName("input-selectPurchaseProduct");
        for(let i = 0; i < checkBoxList.length; i++) {
            purchaseProductList.map(item => {
                if(checkBoxList[i].checked && item.productName == checkBoxList[i].value) {
                    const result = calReceipt(item.productPrice, item.productDiscount, item.inventoryQuantity)
                    price += result[0];
                    discount += result[1];
                    deliveryPrice += result[2];
                }
            })
        }
        setReceiptPrice(price);
        setReceiptDeliveryPrice(deliveryPrice);
        setReceiptDiscount(discount);
    }, [checkClick])

    // 영수증 정보 계산
    const calReceipt = (price, discount, stock) => {
        if(stock != -1) {
            const calPrice = price * stock;
            const calDisc = price * (discount / 100) * stock;
            let calDelP = 0;
            if(price == 0) {
                calDelP = 0
            } else if(price < 100000) {
                calDelP = 5000;
            } else if(price < 300000) {
                calDelP = 3000;
            } else {
                calDelP = 0;
            }
            return [calPrice, calDisc, calDelP];
        }
        return [0, 0, 0];
    }

    // 영수증 정보 저장
    const receipt = {price: receiptPrice, discount: receiptDiscount, deliveryPrice: receiptDeliveryPrice};



    const purchaseData = async (productNum) => {
        // 상세페이지에서 구매버튼누른 제품 데이터 + 장바구니에 있는 제품 데이터 임시 저장
        let tempPurchaseProductList = [];
        // 배송지 정보 임시 저장
        let tempAddressList = [];
        // 유저 정보 임시 저장
        let tempUserInfo = {};

        // 영수증에 들어갈 정보
        let tempPrice = 0;
        let tempDiscount = 0;
        let tempDeliveryPrice = 0;

        if(!isNaN(productNum)) {
            // 구매버튼 누른 제품 데이터 받아오기
            await axios.get("http://localhost:8080/fullProductInfo", {params: {productNum: productNum}})
                .then(req => {
                    if(req.data == "") {
                        setIsCorrectPage(false);
                    } else {
                        const data = req.data[0];
                        data.inventoryQuantity = parameterQuantity;
                        tempPurchaseProductList.push(data);
                        const tempReceipt = calReceipt(data.productPrice, data.productDiscount, data.inventoryQuantity);
                        tempPrice = tempReceipt[0];
                        tempDiscount = tempReceipt[1];
                        tempDeliveryPrice = tempReceipt[2];
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
                            const tempReceipt =  calReceipt(item.productPrice, item.productDiscount, item.inventoryQuantity);
                            tempPrice += tempReceipt[0];
                            tempDiscount += tempReceipt[1];
                            tempDeliveryPrice += tempReceipt[2];
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
        setReceiptPrice(tempPrice);
        setReceiptDiscount(tempDiscount);
        setReceiptDeliveryPrice(tempDeliveryPrice);
    }


    if(!isCorrectPage && parameterLength > 0) {
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
                <PurchaseHead purchaseProductList={purchaseProductList} quantity={quantity} setting={setCheckClick} value={checkClick} />
                <Receipt receipt={receipt} method={method} userInfo={userInfo} purchaseProductList={purchaseProductList} />
                <DeliveryAddress addressList={addressList} userInfo={userInfo} />
                <PaymentMethod setMethod={setMethod} />
            </div>
            {/*<Footer />*/}
        </div>
    )
}

export default PurchaseApp;