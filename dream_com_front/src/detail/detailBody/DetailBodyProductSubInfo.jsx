import React, {useEffect, useState} from "react";
import "./DetailBodyProductSubInfo.css"
import "../../fonts/fontStyle.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Link, useNavigate} from "react-router-dom";

// 제품의 가격정보등을 보여주는 컴포넌트
function DetailBodyProductSubInfo({productInfo, loginUserId, func}) {
    const [productNum, setProductNum] = useState(0); // 상품번호
    const [productDiscount, setProductDiscount] = useState(0); // 할인율
    const [productPrice, setProductPrice] = useState(0); // 가격
    const [reviewCount, setReviewCount] = useState(0); // 평점 개수
    const [score, setScore] = useState(0); // 평점
    const [productTitle, setProductTitle] = useState(""); // 상품 제목
    const [discountPrice, setDiscountPrice] = useState(0); // 할인 된 가격
    const [totalPrice, setTotalPrice] = useState(0); // 총 합계 금액
    const [quantity, setQuantity] = useState(0); // 제품의 재고 수량
    const [productCount, setProductCount] = useState(0); // 제품 개수 선택에 사용되는 값
    const navigate = useNavigate();
    
    // 찜 목록 클릭시 저장
    const addWishList = () => {
        if (loginUserId == null) {
            navigate(`/login?prev=/detail?productNum=${productNum}&pageNum=1`);
        } else {
            func.addWishList(loginUserId, productNum);
        }
    }
    
    // 장바구니 클릭시 저장
    const addShoppingCart = () => {
        if (productCount == 0) {
            alert("장바구니에 담을 수 있는 개수는 반드시 1개 이상이어야 합니다.");
            return;
        }

        if (loginUserId == null) {
            navigate(`/login?prev=/detail?productNum=${productNum}&pageNum=1`);
        } else {
            func.addShoppingCart(loginUserId, productNum, productCount);
        }
    }
    
    // 구매하기 클릭시 페이지 이동
    const purchaseProduct = () => {
        if (loginUserId == null) {
            navigate(`/login?prev=/detail?productNum=${productNum}&pageNum=1`);
        } else if (productCount == 0) {
            alert("제품 개수는 0일수 없습니다.");
        } else {
            navigate(`/purchase?productNum=${productNum}&quantity=${productCount}`);
        }
    }
    
    // 제품 개수 선택(증가)
    const plusProductCount = () => {
        if (productCount == quantity) {
            alert("상품의 재고수량보다 더 많이 선택할 수 없습니다.");
            return;
        }

        setProductCount(productCount + 1);
    }

    // 제품 개수 선택(감소)
    const minusProductCount = () => {
        if (productCount <= 0) {
            return;
        }

        setProductCount(productCount - 1);
    }

    useEffect(() => {
        if (productInfo == undefined) {
            return;
        }
        setProductNum(productInfo[0].productNum);
        setProductDiscount(productInfo[0].productDiscount);
        setProductPrice(productInfo[0].productPrice);
        setScore(productInfo[0].score);
        setReviewCount(productInfo[0].reviewCount);
        setProductTitle(productInfo[0].productTitle);
        setQuantity(productInfo[0].inventoryQuantity);
        setDiscountPrice(productInfo[0].productPrice -
            ((productInfo[0].productPrice / 100) * productInfo[0].productDiscount));
    }, [productInfo]);

    useEffect(() => {
        setTotalPrice(discountPrice * productCount);
    }, [productCount])

    return (
        <div id={"div-detail-product-sub-info"}>
            <div className={"d-flex justify-content-end me-1"}>
                <p className={"nanumSquareR-font-normal"}>상품번호 : {productNum}</p>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>판매가</p>
                <div className={"mx-5"}>
                    <div className={"d-flex"}>
                        {
                            productDiscount == 0 ? null : <p id={"p-detail-product-sub-discount"} className={"mb-1 me-1 nanumSquareB-font-normal"}>{productDiscount}% 할인</p>
                        }
                        {
                            productDiscount == 0 ? null : <p id={"p-detail-product-sub-price"} className={"mb-1 nanumSquareR-font-normal"}>{
                                productPrice.toLocaleString()}원</p>
                        }
                    </div>
                    <p className={"nanumSquareR-font-normal"}>{discountPrice.toLocaleString()}원</p>
                </div>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>상품평</p>
                <p className={"mx-5 nanumSquareR-font-normal"}>{score}점({reviewCount})</p>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>재고수량</p>
                <p className={"mx-5 nanumSquareR-font-normal"}>{quantity}개</p>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>배송정보</p>
                <p className={"mx-5 nanumSquareR-font-normal"}>기본배송 | 당일배송</p>
            </div>
            <div className={"d-flex align-items-center mx-3 mb-4 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>배송비</p>
                <p className={"mx-5 nanumSquareR-font-normal"}>무료배송</p>
            </div>
            <div id={"div-detail-product-price-info"} className={"mx-3 mb-3"}>
                <p className={"nanumSquareR-font-XNormal p-3"}>{productTitle}</p>
                <div className={"d-flex justify-content-between align-items-center p-3"}>
                    <InputGroup id={"inputGroup-detail-product-calculator"}>
                        <Button variant="outline-secondary" onClick={minusProductCount}>-</Button>
                        <Form.Control value={productCount == undefined ? 0 : productCount} readOnly={true}/>
                        <Button variant="outline-secondary" onClick={plusProductCount}>+</Button>
                    </InputGroup>
                    <p className={"mb-0 nanumSquareB-font-XNormal"}>{totalPrice.toLocaleString()}원</p>
                </div>
            </div>
            <div className={"d-flex justify-content-end me-3"}>
                <p className={"nanumSquareB-font-large"}>총 합계 금액 <span id={"span-detail-product-price"}>{totalPrice.toLocaleString()}원</span></p>
            </div>
            <div id={"div-detail-product-purchase-option"}>
                <div onClick={addWishList}><img src={"images/heart.png"} /></div>
                <div onClick={addShoppingCart}><img src={"images/shopping-cart.png"} /></div>
                <div onClick={purchaseProduct}><p className={"mb-0 nanumSquareB-font-normal"}>구매하기</p></div>
            </div>
        </div>
    );
}

export default DetailBodyProductSubInfo;