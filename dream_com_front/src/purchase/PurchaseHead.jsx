import React from "react";
import "../fonts/fontStyle.css"
import PurchaseFlow from "./PurchaseFlow";
import PurchaseProductInfo from "./PurchaseProductInfo";


function PurchaseHead(props) {
    return (
        <div style={{backgroundColor: "#f4f4f4", paddingBottom: "2px"}} className={"container"}>
            <div className={"d-flex justify-content-between p-2"}>
                <p className={"nanumSquareB-font-XLarge m-0 p-2"}>주문결제</p>
                {/*<PurchaseFlow type={"second"} />*/}
            </div>
            <PurchaseProductInfo purchaseProductList={props.purchaseProductList} quantity={props.quantity} setting={props.setting} value={props.value} />
        </div>
    )
}

export default PurchaseHead;