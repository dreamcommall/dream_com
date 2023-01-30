import React from "react";
import "./BuyProductList.css";

function BuyProductList() {

    return (
        <div className={"container mt-5"}>
            <div className={"row"}>
                <div className={"col"}>
                    <h4 className={"mt-5 ms-3 nanumSquareR-font-large"}><strong>주문내역 조회</strong></h4>
                    <hr className={"ms-3"}/>
                    <ul id={"deliveryInformation"} className={"mb-5"}>
                        <li className={"nanumSquareR-font-small"}>픽업대기, 픽업완료는 무탠픽업(매장픽업) 주문에만 해당됩니다.</li>
                        <li className={"nanumSquareR-font-small"}>출고 완료 직후 교환 / 환불 요청을 하더라도 상품을 수령하신 후 택배 업체를 통해 보내주셔야
                            처리 가능합니다.
                        </li>
                    </ul>
                    <table className={"table ms-3 nanumSquareR-font-small"}>
                        <thead>
                        <tr className={"text-center"}>
                            <th className={"col-4"}>상품정보</th>
                            <th className={"col-2"}>주문일자</th>
                            <th className={"col-1"}>결제번호</th>
                            <th className={"col-2"}>주문금액(수량)</th>
                            <th className={"col-1"}>배송상태</th>
                            <th className={"col-2"}>주문상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {/* 상품정보 */}
                            <td>
                                <div className={"mt-0"}>
                                    <a href={"#"}><img src={"images/logo192.png"} /></a>
                                    <ul>
                                        <li className={"productInfo mt-1"}>
                                            <div className={"nanumSquareR-font-small"}>HP 상품명 정품 컴퓨터 PC 게이밍 유선/무선 마우스 HP
                                                M100
                                            </div>
                                            <div className={"nanumSquareR-font-small mt-2"}>1,500,000 원</div>
                                            <div className={"nanumSquareR-font-small mt-2"}>옵션</div>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            {/* 주문일자 */}
                            <td className={"nanumSquareR-font-normal"}>
                                <div className={"listStyle"}>2023.01.27</div>
                            </td>
                            {/* 결제번호 */}
                            <td className={"nanumSquareR-font-normal"}>
                                <div className={"listStyle"}>000001</div>
                            </td>
                            {/* 주문 금액 (수량) */}
                            <td className={"nanumSquareR-font-normal"}>
                                <div id={"listStyle"} className={"text-center"}>
                                    <div>120,000 원</div>
                                    <span>2개</span>
                                </div>
                            </td>
                            {/* 주문상태 */}
                            <td className={"nanumSquareR-font-normal text-center deliveryState"}>
                                <div className={"deliveryState"}>배송완료</div>
                            </td>
                            <td className={"orderState"}>
                                <div className={"mt-1"}>
                                    <button className={"mt-2"}>환불요청</button>
                                    <button className={"mt-2"}>리뷰쓰기</button>
                                    <button className={"mt-2"}>구매확정</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            {/* 상품정보 */}
                            <td>
                                <div className={"mt-0"}>
                                    <a href={"#"}><img src={"images/logo192.png"} /></a>
                                    <ul>
                                        <li className={"productInfo mt-1"}>
                                            <div className={"nanumSquareR-font-small"}>HP 상품명 정품 컴퓨터 PC 게이밍 유선/무선 마우스 HP
                                                M100
                                            </div>
                                            <div className={"nanumSquareR-font-small mt-2"}>1,500,000 원</div>
                                            <div className={"nanumSquareR-font-small mt-2"}>옵션</div>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            {/* 주문일자 */}
                            <td className={"nanumSquareR-font-normal"}>
                                <div className={"listStyle"}>2023.01.27</div>
                            </td>
                            {/* 결제번호 */}
                            <td className={"nanumSquareR-font-normal"}>
                                <div className={"listStyle"}>000001</div>
                            </td>
                            {/* 주문 금액 (수량) */}
                            <td className={"nanumSquareR-font-normal"}>
                                <div id={"listStyle"} className={"text-center"}>
                                    <div>120,000 원</div>
                                    <span>2개</span>
                                </div>
                            </td>
                            {/* 주문상태 */}
                            <td className={"nanumSquareR-font-normal text-center deliveryState"}>
                                <div className={"deliveryState"}>배송완료</div>
                            </td>
                            <td className={"orderState"}>
                                <div className={"mt-1"}>
                                    <button className={"mt-2"}>환불요청</button>
                                    <button className={"mt-2"}>리뷰쓰기</button>
                                    <button className={"mt-2"}>구매확정</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BuyProductList