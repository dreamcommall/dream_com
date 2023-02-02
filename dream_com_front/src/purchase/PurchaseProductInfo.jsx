import React from "react";
import "./PurchaseProductInfo.css"


function PurchaseProductInfo({purchaseProductList, quantity}) {
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

    return (
        <table id={"table-purchaseProductInfo"} className={"table"}>
            <thead>
            <tr style={{borderBottom: "2px solid"}} className={"nanumSquareR-font-large text-center"}>
                <th width={"700px"} className={"text-start"}>
                    <div style={{float: "left", marginRight: "250px"}}>
                        <span>주문 상품</span>
                        <span style={{backgroundColor: "black", color: "white", borderRadius: "40px",
                            paddingLeft: "20px", paddingRight: "20px", marginLeft: "10px"}}>{purchaseProductList.length}</span>
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
            {purchaseProductList.map(item => {
                return (item.inventoryQuantity > 0 ?
                    <tr className={"nanumSquareR-font-normal"} key={item.key} style={{backgroundColor: "white"}}>
                        <td>
                            <div style={{height: "120px"}}>
                                <div className={"text-center"} style={{float: "left", marginRight: "30px"}}>
                                    <img src={item.thumbnailImg} style={{width: "130px"}}/>
                                </div>
                                <div style={{paddingTop: "10px"}}>
                                    <p className={"p-purchaseProductInfoTitle"}>
                                        {item.productTitle}
                                    </p>
                                    <p className={"p-purchaseProductInfoNameSpec"}>
                                        [{item.productName}] / {item.partName.join("/")}
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

                        <td className={"text-center"} style={{paddingTop: "50px"}}>{item.key == 0 ? quantity : item.inventoryQuantity}개</td>
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
                                        <p className={"p-purchaseProductInfoNameSpec"}>
                                            [{item.productName}] / {item.partName.join("/")}
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