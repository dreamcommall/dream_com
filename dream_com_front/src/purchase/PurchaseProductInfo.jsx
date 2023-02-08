import React, {useEffect, useState} from "react";
import "./PurchaseProductInfo.css"


function PurchaseProductInfo(props) {
    // 첫렌더링 시 구매 가능한 제품 개수
    let quantity = 0;
    props.purchaseProductList.forEach(item => {
        if(item.inventoryQuantity > 0) {
            quantity += 1;
        }
    })
    // 체스박스 선택한 제품 개수
    const [selectQuantity, setSelectQuantity] = useState(0);

    // 배송비 계산
    const deliveryCost = (productPrice) => {
        if(productPrice < 100000) {
            return 5000
        } else if (productPrice < 300000) {
            return 3000
        }
        else {
            return 0
        }
    }

    // 체크박스 클릭 시 제품 state 업데이트
    const set = () => {
        const checkbox = document.getElementsByClassName("input-selectPurchaseProduct");
        let checkedLength = 0;
        for(let i = 0; i < checkbox.length; i++) {
            if(checkbox[i].checked) {
                checkedLength += 1;
            }
        }

        if(checkedLength === 0) {
            setSelectQuantity(-1);
        }else {
            setSelectQuantity(checkedLength);
        }

        if(props.value) {
            props.setting(false)
        }else {
            props.setting(true);
        }
    }



    return (
        <table id={"table-purchaseProductInfo"} className={"table"}>
            <thead>
            <tr style={{borderBottom: "2px solid"}} className={"nanumSquareR-font-large text-center"}>
                <th width={"700px"} className={"text-start"}>
                    <div style={{float: "left", marginRight: "250px"}}>
                        <span>주문 상품</span>
                        <span id={"selectedPurchaseQuantity"}>
                            {selectQuantity === 0 ? quantity : (selectQuantity === -1 ? 0 : selectQuantity)}
                        </span>
                    </div>
                    <div>상품명 / 옵션</div>
                </th>
                <th width={"140px"}>제품 가격</th>
                <th width={"80px"}>수량</th>
                <th width={"140px"}>주문 금액</th>
                <th width={"120px"}>배송비</th>
            </tr>
            </thead>
            <tbody>
            {props.purchaseProductList.map(item => {
                return (item.inventoryQuantity > 0 ?
                    <tr className={"nanumSquareR-font-normal"} key={item.key} style={{backgroundColor: "white"}}>
                        <td>
                            <div className={"div-selectPurchaseProduct"}>
                                <input className={"input-selectPurchaseProduct"} type={"checkbox"} value={item.productName}
                                       defaultChecked={true} onClick={set}></input>
                            </div>
                            <div style={{height: "120px"}}>
                                <div className={"text-center"} style={{float: "left", marginRight: "30px"}}>
                                    <img src={item.thumbnailImg} style={{width: "130px"}}/>
                                </div>
                                <div style={{paddingTop: "10px"}}>
                                    <p className={"p-purchaseProductInfoTitle"} title={item.productTitle}>
                                        {item.productTitle}
                                    </p>
                                    <p className={"mb-1"} title={item.productName}>
                                        제품명 : 【 {item.productName} 】
                                    </p>
                                    <p className={"p-purchaseProductInfoNameSpec m-0"} title={item.partName.join("/")}>
                                        {item.partName.join("/")}
                                    </p>
                                </div>
                            </div>
                        </td>
                        {item.productDiscount == 0 ?
                            <td className={"text-center"} style={{paddingTop: "50px"}}>
                                <p className={"m-0"}>{item.productPrice.toLocaleString("ko-KR")}원</p>
                            </td> :
                            <td className={"text-center"} style={{paddingTop: "40px"}}>
                                <p className={"m-0"}>
                                    <del>{item.productPrice.toLocaleString("ko-KR")}원</del>
                                </p>
                                <p className={"m-0"}>
                                    <b style={{color: "red"}}>{(item.productPrice * (1 - item.productDiscount / 100)).toLocaleString("ko-KR")}원</b>
                                </p>
                            </td>
                        }

                        <td className={"text-center"} style={{paddingTop: "50px"}}>{item.key == 0 ? props.quantity : item.inventoryQuantity}개</td>
                        <td className={"text-center"} style={{paddingTop: "50px"}}>
                            {(item.productPrice * (1 - item.productDiscount / 100) * item.inventoryQuantity).toLocaleString("ko-KR")}원
                        </td>
                        <td className={"text-center"} style={{paddingTop: "50px"}}>{deliveryCost(item.productPrice).toLocaleString("ko-KR")}원</td>
                    </tr>
                        :
                        <tr className={"nanumSquareR-font-normal tr-shortage-inventory"} key={item.key}>
                            <td>
                                <div style={{height: "120px"}}>
                                    <div className={"text-center"} style={{float: "left", marginRight: "30px"}}>
                                        <img className={"shortage-inventory-img"} src={item.thumbnailImg} style={{width: "130px"}}/>
                                    </div>
                                    <div style={{paddingTop: "10px"}}>
                                        <p className={"p-purchaseProductInfoTitle"}>
                                            {item.productTitle}
                                        </p>
                                        <p className={"mb-1"}>
                                            제품명 : 【 {item.productName} 】
                                        </p>
                                        <p className={"p-purchaseProductInfoNameSpec mb-1"}>
                                            상세 스펙 : {item.partName.join("/")}
                                        </p>
                                    </div>
                                </div>
                                <div id={"div-shortageInventoryMsg"} className={"nanumSquareB-font-XLarge"}>
                                    {item.inventoryQuantity == 0 ?
                                        <p className={"div-shortageInventoryMsg"}>
                                            현재 준비된 수량이 모두 소진되었습니다.
                                        </p>
                                        :
                                        <p className={"div-tooManySelectMsg"}>
                                            선택한 제품 수량이 모자라 주문할 수 없습니다.
                                        </p>
                                    }

                                </div>
                            </td>
                            {item.productDiscount == 0 ?
                                <td className={"text-center"} style={{paddingTop: "50px"}}>
                                    <p className={"m-0"}>{item.productPrice.toLocaleString("ko-KR")}원</p>
                                </td> :
                                <td className={"text-center"} style={{paddingTop: "40px"}}>
                                    <p className={"m-0"}>
                                        <del>{item.productPrice.toLocaleString("ko-KR")}원</del>
                                    </p>
                                    <p className={"m-0"}>
                                        <b style={{color: "rgba(255, 0, 0, 0.5)"}}>{(item.productPrice * (1 - item.productDiscount / 100)).toLocaleString("ko-KR")}원</b>
                                    </p>
                                </td>
                            }

                            <td className={"text-center"} style={{paddingTop: "50px"}}>
                                {item.inventoryQuantity < 0 ? "-" : item.inventoryQuantity+ "개"}
                            </td>
                            <td className={"text-center"} style={{paddingTop: "50px"}}>
                                {(item.productPrice * (1 - item.productDiscount / 100)).toLocaleString("ko-KR")}원
                            </td>
                            <td className={"text-center"} style={{paddingTop: "50px"}}>{deliveryCost(item.productPrice).toLocaleString("ko-KR")}원</td>
                        </tr>
                )
            })}
            </tbody>
            <tfoot></tfoot>
        </table>
    )
}

export default PurchaseProductInfo;