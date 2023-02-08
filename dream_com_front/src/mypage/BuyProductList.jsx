import React from "react";
import MyPageBuyProductContents from "./MyPageBuyProductContents";

function BuyProductList({orderInfo, review, paymentInfo}) {
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
        }
    }
    
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
                <div className={"listStyle"}>{paymentStateNumberToString(paymentInfo.state)}</div>
            </td>
            <td className={"listStyle"}>
                <div className={"mt-1"}>
                    <div className={"orderState"}>
                        <button className={"mt-2"}>환불요청</button>
                    </div>
                    <div className={"orderState"}>
                        <button className={"mt-2"}>리뷰쓰기</button>
                    </div>
                    <div className={"orderState"}>
                        <button className={"mt-2"}>구매확정</button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default BuyProductList;