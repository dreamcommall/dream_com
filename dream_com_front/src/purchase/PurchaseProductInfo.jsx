import React from "react";


function PurchaseProductInfo(props) {
    return (
        <table style={{marginTop: "100px", marginLeft: "10px", width: "1280px"}} className={"table"}>
            <thead>
            <tr style={{borderBottom: "2px solid"}} className={"nanumSquareR-font-large text-center"}>
                <th width={"700px"} className={"text-start"}>
                    <div style={{float: "left", marginRight: "250px"}}>
                        <span>주문 상품</span>
                        <span style={{backgroundColor: "black", color: "white", borderRadius: "40px",
                            paddingLeft: "20px", paddingRight: "20px", marginLeft: "10px"}}>{props.item.length}</span>
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
            {props.item.map((item) => {
                return (
                    <tr className={"nanumSquareR-font-normal"} key={item.key} style={{backgroundColor: "white"}}>
                        <td>
                            <div style={{height: "120px"}}>
                                <div className={"text-center"} style={{float: "left", marginRight: "30px"}}>
                                    <img src={item.src} style={{width: "130px"}}/>
                                </div>
                                <div style={{paddingTop: "10px"}}>
                                    <p>
                                        [{item.title}]
                                    </p>
                                    <p style={{textOverflow: "ellipsis"}}>
                                        {item.name} / {item.spec.map(spec => {return(spec + " / ")})}
                                    </p>
                                </div>
                            </div>
                        </td>
                        {item.discount == 0 ?
                            <td className={"text-center"} style={{paddingTop: "50px"}}>
                                <p className={"m-0"}>{item.price.toLocaleString("ko-KR")}원</p>
                            </td> :
                            <td className={"text-center"} style={{paddingTop: "40px"}}>
                                <p className={"m-0"}>
                                    <del>{item.price.toLocaleString("ko-KR")}원</del>
                                </p>
                                <p className={"m-0"}>
                                    <b style={{color: "red"}}>{(item.price * (1 - item.discount / 100)).toLocaleString("ko-KR")}원</b>
                                </p>
                            </td>
                        }

                        <td className={"text-center"} style={{paddingTop: "50px"}}>{item.quantity}개</td>
                        <td className={"text-center"} style={{paddingTop: "50px"}}>
                            {(item.price * (1 - item.discount / 100) * item.quantity).toLocaleString("ko-KR")}원
                        </td>
                        <td className={"text-center"} style={{paddingTop: "50px"}}>{item.deliveryPrice.toLocaleString("ko-KR")}원</td>
                    </tr>
                )
            })}
            </tbody>
            <tfoot></tfoot>
        </table>
    )
}

export default PurchaseProductInfo;