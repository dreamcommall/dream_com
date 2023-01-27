import React from "react";

// 구매페이지 우상단 프로세스 흐름
// 작성자 : 양민호
function PurchaseFlow(props) {
    return (
        <div className={"text-end mt-3"} style={{float: "right"}}>
            <p className={"nanumSquareB-font-XNormal m-0"}>
                {/*프로세스 흐름에 따라 type을 다르게 적용 */}
                {props.type == "first" ? <span className={"text-primary"}>01 장바구니 > </span> : <span className={"text-secondary"}>01 장바구니 > </span>}
                {props.type == "second" ? <span className={"text-primary"}>02 주문 결제 > </span> : <span className={"text-secondary"}>02 주문 결제 > </span>}
                {props.type == "third" ? <span className={"text-primary"}>03 주문 완료</span> : <span className={"text-secondary"}>03 주문 완료</span>}
            </p>
        </div>
    )
}

export default PurchaseFlow;