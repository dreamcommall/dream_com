import React, {useEffect, useState} from "react";
import MyPageBuyProductContents from "./MyPageBuyProductContents";

function BuyProductList({orderInfo, review, paymentInfo, funcGetProductNumber}) {
    // 배송 상태가 배송완료가 아닌경우 환불, 리뷰, 구매확정을 못하게 하기위해 선언
    const [purchaseEnable, setPurchaseEnable] = useState(false); // 구매가 사용가능한 상태인가?
    const [refundEnable, setRefundEnable] = useState(false); // 환불이 가능한 상태인가?
    const [reviewEnable, setReviewEnable] = useState(false); // 리뷰 작성이 가능한 상태인가?
    
    // 배송 상태값(기본은 숫자)을 받아서 문자형으로 바꾼다.
    const paymentStateNumberToString = (stateNumber) => {
        switch (stateNumber) {
            case 0 :
                return "결제취소"
            case 1 :
                return "출고 전"
            case 2 :
                return "배송중"
            case 3 :
                return "배송완료"
            case 4 :
                return "구매확정"
        }
    }

    useEffect(() => {
        if (paymentInfo == undefined) {
            return;
        }

        if (paymentInfo.state == 3) {
            setPurchaseEnable(true);
            setRefundEnable(false);
            setReviewEnable(false);
        } else if (paymentInfo.state == 4) {
            setPurchaseEnable(false);
            setRefundEnable(true);
            setReviewEnable(true);
        }
    }, [paymentInfo]);
    
    return (
        <tr className={"tableHover"}>
            {/* 상품정보 */}
            <td>
                <div className={"listStyle"}>
                    <MyPageBuyProductContents orderInfo={orderInfo} review={review} />
                </div>
            </td>
            {/* 주문일자 */}
            <td className={"nanumSquareR-font-normal"}>
                <div className={"listStyle"}>{paymentInfo.paymentDate}</div>
            </td>
            {/* 결제번호 */}
            <td className={"nanumSquareR-font-normal"}>
                <div className={"listStyle"}>{paymentInfo.methodName}</div>
            </td>
            {/* 주문 금액 (수량) */}
            <td className={"nanumSquareR-font-normal"}>
                <div className={"text-center listStyle"}>
                    <div>
                        <div>{(paymentInfo.price * paymentInfo.quantity).toLocaleString()} 원</div>
                        <span>{paymentInfo.quantity}개</span>
                    </div>
                </div>
            </td>
            {/* 주문상태 */}
            <td className={"nanumSquareR-font-normal text-center"}>
                <div className={"listStyle"}>
                    {
                        paymentStateNumberToString(paymentInfo.state) == "결제취소" ? <span style={{color : "red"}}>
                            {paymentStateNumberToString(paymentInfo.state)}</span> :
                            paymentStateNumberToString(paymentInfo.state)
                    }
                </div>
            </td>
            <td className={"listStyle"}>
                <div>
                    <div className={"orderState"}>
                        <button disabled={!refundEnable}>환불요청</button>
                    </div>
                    <div className={"orderState"}>
                        <button disabled={!(reviewEnable && (review == null))} className={"mt-2"} onClick={() => {funcGetProductNumber(orderInfo.productNum)}}>리뷰쓰기</button>
                    </div>
                    <div className={"orderState"}>
                        <button disabled={!purchaseEnable} className={"mt-2"}>구매확정</button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default BuyProductList;