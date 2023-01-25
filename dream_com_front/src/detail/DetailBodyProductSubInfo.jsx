import React, {useEffect, useState} from "react";
import "./DetailBodyProductSubInfo.css"
import "../fonts/fontStyle.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function DetailBodyProductSubInfo(props) {
    const [productCount, setProductCount] = useState(0);

    const plusProductCount = () => {
        setProductCount(productCount + 1);
    }

    const minusProductCount = () => {
        if (productCount <= 0) {
            return;
        }

        setProductCount(productCount - 1);
    }

    return (
        <div id={"div-detail-product-sub-info"}>
            <div className={"d-flex justify-content-end me-1"}>
                <p className={"nanumSquareR-font-normal"}>상품번호 : 12345</p>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>판매가</p>
                <div className={"mx-5"}>
                    <div className={"d-flex"}>
                        <p className={"mb-1 me-1 nanumSquareR-font-normal"}>할인율</p>
                        <p className={"mb-1 nanumSquareR-font-normal"}>기존가격</p>
                    </div>
                    <p className={"nanumSquareR-font-normal"}>할인가격</p>
                </div>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>상품평</p>
                <p className={"mx-5 nanumSquareR-font-normal"}>별점(댓글 개수)</p>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>카드혜택</p>
                <p className={"mx-5 nanumSquareR-font-normal"}>무이자 할부</p>
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
                <p className={"nanumSquareR-font-XNormal p-3"}>상품제목입니다.</p>
                <div className={"d-flex justify-content-between align-items-center p-3"}>
                    <InputGroup id={"inputGroup-detail-product-calculator"}>
                        <Button variant="outline-secondary" onClick={minusProductCount}>-</Button>
                        <Form.Control value={productCount == undefined ? 0 : productCount}/>
                        <Button variant="outline-secondary" onClick={plusProductCount}>+</Button>
                    </InputGroup>
                    <p className={"mb-0 nanumSquareB-font-XNormal"}>가격입니다.</p>
                </div>
            </div>
            <div className={"d-flex justify-content-end me-3"}>
                <p className={"nanumSquareB-font-large"}>총 합계 금액 <span id={"span-detail-product-price"}>100000원</span></p>
            </div>
            <div id={"div-detail-product-purchase-option"}>
                <div><img src={"images/heart.png"} /></div>
                <div><img src={"images/shopping-cart.png"} /></div>
                <div><p className={"mb-0 nanumSquareB-font-normal"}>구매하기</p></div>
            </div>
        </div>
    );
}

export default DetailBodyProductSubInfo;