import React, {useEffect, useState} from "react";
import "./MypageCart.css"
import axios from "axios";
import {Link} from "react-router-dom";


function MypageCart() {
    const [cartList, setCartList] = useState([]);
    const [userId, setUserId] = useState(null);
    const [price, setPrice] = useState(0);
    const [discountMoney, setDiscountMoney] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);

    // userId 별로 장바구니 불러오기
    useEffect(() => {
        axios.post("http://localhost:8080/loginUserId", null, {
            params: {
                userUUID: sessionStorage.getItem("loginUUID"),
                autoUserUUID: localStorage.getItem("autoLoginUUID")
            }
        }).then(response => {
            if (response.data == null || response.data == undefined || response.data == "") {
                setUserId(null);
            } else {
                setUserId(response.data);
            }
        }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("유저 아이디 취득에 실패했습니다.");
        });

        axios.get("http://localhost:8080/selectCart", {
            params: {
                userId: userId
            }
        })
            .then((req) => {
                setCartList(req.data);
            })
            .catch((err) => {
                console.log(userId)
            })

    }, [userId]);

    // 총 가격 계산해주는 Effect
    useEffect(() => {
        let productPriceSum = 0;
        let productDiscount = 0;
        cartList.map((item) => {
            productPriceSum += item.productPrice * item.inventoryQuantity;
            productDiscount += item.productPrice * item.productDiscount / 100 * item.inventoryQuantity
        })
        setPrice(productPriceSum);
        setDiscountMoney(productDiscount);
        setTotalPrice(productPriceSum - productDiscount);
    }, [cartList, totalPrice])

    // 수량 -1
    const plusQuantity = (id, productNum) => {
        document.getElementById(id).value = parseInt(document.getElementById(id).value) + 1
        axios.post("http://localhost:8080/updateCart", null, {
            params: {
                userId: userId,
                quantity: parseInt(document.getElementById(id).value),
                productNum: productNum
            }
        })
            .then((req) => {
                alert('수량이 변경되었습니다.')
                window.location.reload();
            })
    }
    // 수량 - 1
    const minusQuantity = (id, productNum) => {
        document.getElementById(id).value = parseInt(document.getElementById(id).value) - 1

        axios.post("http://localhost:8080/updateCart", null, {
            params: {
                userId: userId,
                quantity: parseInt(document.getElementById(id).value),
                productNum: productNum
            }
        })
            .then((req) => {
                alert('수량이 변경되었습니다.')
                window.location.reload();
            })
    }

    // 장바구니 삭제
    const deleteCart = () => {
        const inputList = document.querySelectorAll(".productNum");
        let productNum = [];

        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i].checked == true) {
                productNum.push(inputList[i].value);
            }
        }

        axios.post("http://localhost:8080/deleteCart", null, {
            params: {
                userId: userId,
                productNum: productNum.join()
            }
        })
            .then((req) => {
                alert('삭제완료')
                window.location.reload();

            })
            .catch((err) => {
                alert('선택된 상품이 없습니다.')
                console.log(err)
            })
    }


    return (
        <div>
            <h3 className={"mypageCart nanumSquareB-font-large"}>장바구니</h3>
            <hr />
            <table className={"table mt-5 nanumSquareR-font-small"}>
                <thead className={"text-center cartTableTitle"}>
                <tr>
                    <th className={"col-5"}>상품명</th>
                    <th className={"col-2"}>판매가</th>
                    <th className={"col-1"}>할인율</th>
                    <th className={"col-1"}>수량</th>
                    <th className={"col-2"}>주문금액</th>
                    <th className={"col-1"}>배송 형태</th>
                </tr>
                </thead>

                <tbody className={"text-center"}>
                {
                    cartList.map((item) => {
                        return (
                            <tr className={"tableCart"}>
                                <td>
                                    <div className={"cartList"}>
                                        <input className={"productNum"} type={"checkbox"} value={item.productNum}
                                               id={`checked${item.key}`} key={item.key}/>
                                        <a href={"#"}><img src={item.mainPageImg}/></a>
                                        <div className={"productTitle"}>
                                            <a href={"#"}>
                                                <div>{item.productTitle}</div>
                                            </a>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={"py-5 productPrice"}
                                         id={`ProductPrice${item.key}`}>{item.productPrice}</div>
                                </td>
                                <td>
                                    <div className={"py-5"}>{item.productDiscount}%</div>
                                </td>
                                <td id={"Quantity"}>
                                    <button
                                        onClick={() => minusQuantity(`quantity${item.key}`, item.productNum)}>-
                                    </button>
                                    <input className={"productQuantity text-center nanumSquareR-font-normal"}
                                           id={`quantity${item.key}`}
                                           value={item.inventoryQuantity}/>
                                    <button onClick={() => plusQuantity(`quantity${item.key}`, item.productNum)}>+
                                    </button>
                                </td>
                                <td>
                                    <div
                                        className={"py-5"}>{(Number(item.productPrice) * item.inventoryQuantity) - item.productPrice * ((item.productDiscount / 100)) * item.inventoryQuantity}</div>
                                </td>
                                <td>
                                    <div className={"py-5"}>{item.deliveryInfo}</div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className={"text-center nanumSquareR-font-normal"}>
                <div className={"totalPrice"}>총 상품금액: {price}</div>
                <div className={"float-start ms-4 mt-3"}>-</div>
                <div className={"totalSale"}>총 할인금액 : {discountMoney}</div>
                <div className={"float-start ms-4 mt-3"}>=</div>
                <div className={"totalMoney ms-4"}>총 금액 : {totalPrice}</div>
            </div>
            <br/>
            <br/>
            <div className={"mb-5"}>
                <button className={"deleteCart"} onClick={deleteCart}>장바구니 비우기</button>
                <Link to={"/purchase"}><button className={"buyCart"}>구매하기</button></Link>
            </div>
        </div>
    )
}

export default MypageCart