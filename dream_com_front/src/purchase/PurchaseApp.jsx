import React, {useEffect, useState} from "react";
import PurchaseHead from "./PurchaseHead";
import DeliveryAddress from "./DeliveryAddress";
import Receipt from "./Receipt";

const item = [
    {key: 1, title: "가성비 컴퓨터!", name: "DESKTOP01", spec: ["부품1", "부품2", "부품3"],
        price: 300000, quantity: 2, discount: 10, deliveryPrice: 3000, src: "/images/MainRollingBanner_139003.jpg"},
    {key: 2, title: "비싼 컴퓨터!", name: "DESKTOP02", spec: ["부품5", "부품6", "부품7"],
        price: 1000000, quantity: 1, discount: 20, deliveryPrice: 0, src: "/images/MainRollingBanner_139003.jpg"},
]


const addr = [
    {key: 1, addr: "부산광역시 부산진구 부전동 185", default: "Y"},
    {key: 2, addr: "부산광역시 부산진구", default: "N"},
    {key: 3, addr: "부산광역시", default: "N"},
]


function PurchaseApp() {
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalDeliveryPrice = 0;

    for(let i = 0; i < item.length; i++) {
        const price = item[i].price * item[i].quantity;
        totalPrice += price;

        const discount = item[i].price * (item[i].discount / 100) * item[i].quantity;
        totalDiscount += discount

        totalDeliveryPrice += item[i].deliveryPrice;
    }
    const receipt = [
        {key: 1, price: totalPrice, discount: totalDiscount, deliveryPrice: totalDeliveryPrice, }
    ]

    return(
        <div id={"div-purchase-page"} className={"container-fluid mt-3"}>
            <PurchaseHead item={item} />
            <DeliveryAddress item={addr} receipt={receipt} />

        </div>
    )
}

export default PurchaseApp;