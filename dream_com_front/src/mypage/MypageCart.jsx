import React, {useState} from "react";
import "./MypageCart.css"

function MypageCart(){
    const [quantity,setQuantity] = useState(0);
    const handleChange = (e) => {
        setQuantity(e.target.value);
    }
    const plusQuantity = () =>{
        setQuantity(quantity +1);
    }
    const minusQuantity = () =>{
        setQuantity(quantity -1);
    }
    return(
        <div className={"container"}>
            <h3 className={"mt-5"}>Order / Payment</h3>
            <table className={"table mt-5 nanumSquareR-font-small"}>
                <thead className={"text-center title"}>
                    <tr>
                        <th className={"col-5"}>상품명</th>
                        <th className={"col-2"}>판매가</th>
                        <th className={"col-1"}>할인</th>
                        <th className={"col-1"}>수량</th>
                        <th className={"col-2"}>주문금액</th>
                        <th className={"col-1"}>배송 형태</th>
                    </tr>
                </thead>

                <tbody className={"text-center"}>
                    <tr className={"tableCart"}>
                        <td>
                            <div className={"img-fluid ms-1"}>
                                <a href={"#"}><img src={"images/logo192.png"} /></a>
                                <div style={{marginLeft:"100px"}}>
                                    <a href={"#"} className={"productTitle"}>
                                        <div>[레노버] ThinkStation P358 TWR-30GLS00A00 AMD R7-5845 [16G/512G/T1000/Win11Pro] [기본제품]</div>
                                    </a>
                                    {/*<div className={"mt-3 option"}>*/}
                                        {/*<div>옵션</div>*/}
                                        {/*<div>AMD Ryzen 7 PRO 5845, NVIDIA T1000 8GB GDDR6 HP, 16GB DDR 3200 NDIMM 1RX8</div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={"py-5"}>3,000,000</div>
                        </td>
                        <td>
                            <div className={"py-5"}>-20,000</div>
                        </td>
                        <td id={"Quantity"}>
                            <button onClick={minusQuantity}>-</button>
                            <input value={quantity} onChange={handleChange} />
                            <button onClick={plusQuantity}>+</button>
                        </td>
                        <td>
                            <div className={"py-5"}>2,980,000</div>
                        </td>
                        <td>
                            <div className={"py-5"}>당일배송</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className={"text-center nanumSquareR-font-normal"}>
                <div className={"totalPrice"}>총 상품금액: 3,000,000</div>
                <div className={"float-start ms-4 mt-3"}>-</div>
                <div className={"totalSale"}>총 할인금액 : 20,000</div>
                <div className={"float-start ms-4 mt-3"}>=</div>
                <div className={"totalMoney ms-4"}>총 금액 : 2,980,000</div>
            </div>
            <br/>
            <br/>
            <button className={"deleteCart"}>장바구니 비우기</button>
            <button className={"buyCart"}>구매하기</button>
        </div>
    )
}

export default MypageCart