import React from "react";
import "./BuyProductList.css";
import MyPageBuyProductContents from "./MyPageBuyProductContents";

function BuyProductList({orderInfo, review}) {
    return (
        <div>
            <table className={"table ms-3 nanumSquareR-font-small"}>
                <thead className={"buyProductListThead"}>
                <tr className={"text-center"}>
                    <th className={"col-4"}>상품정보</th>
                    <th className={"col-2"}>주문일자</th>
                    <th className={"col-1"}>결제번호</th>
                    <th className={"col-2"}>주문금액(수량)</th>
                    <th className={"col-1"}>배송상태</th>
                    <th className={"col-2"}>주문상태</th>
                </tr>
                </thead>
                <tbody className={"buyProductListTbody"}>
                <tr className={"tableHover"}>
                    {/* 상품정보 */}
                    <td>
                        <MyPageBuyProductContents orderInfo={orderInfo} review={review} />
                    </td>
                    {/* 주문일자 */}
                    <td className={"nanumSquareR-font-normal"}>
                        <div className={"listStyle"}></div>
                    </td>
                    {/* 결제번호 */}
                    <td className={"nanumSquareR-font-normal"}>
                        <div className={"listStyle"}>000001</div>
                    </td>
                    {/* 주문 금액 (수량) */}
                    <td className={"nanumSquareR-font-normal"}>
                        <div className={"text-center listStylePrice"}>
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

                            {/* 예시로 한번더 */}
                            {/*<tr className={"tableHover"}>*/}
                            {/*    /!* 상품정보 *!/*/}
                            {/*    <td>*/}
                            {/*        <div className={"mt-0"}>*/}
                            {/*            <a href={"#"}><img src={"images/logo192.png"} /></a>*/}
                            {/*            <ul>*/}
                            {/*                <li className={"productInfo mt-1"}>*/}
                            {/*                    <div className={"nanumSquareR-font-small"}>HP 상품명 정품 컴퓨터 PC 게이밍 유선/무선 마우스 HP*/}
                            {/*                        M100*/}
                            {/*                    </div>*/}
                            {/*                    <div className={"nanumSquareR-font-small mt-2"}>1,500,000 원</div>*/}
                            {/*                    <div className="accordion nanumSquareR-font-normal mt-3 accordionExample">*/}
                            {/*                        <div className="accordion-item">*/}
                            {/*                            <p className="accordion-header" id="headingOne">*/}
                            {/*                                <button type="button" data-bs-toggle="collapse" className={"accordionButton"}*/}
                            {/*                                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">*/}
                            {/*                                    내가 쓴 리뷰 보기*/}
                            {/*                                </button>*/}
                            {/*                            </p>*/}
                            {/*                            <div id="collapseOne" className="accordion-collapse collapse"*/}
                            {/*                                 aria-labelledby="headingOne" data-bs-parent="#accordionExample">*/}
                            {/*                                <div className={"ms-2 pt-1"}>포토샵을 할 수 있는 노트북 찾다가 이걸로 골랐어요 그전에 쓰던 다른 노트북보다 화면은 큰데 훨씬 얇고 가볍네요</div>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    /!* 주문일자 *!/*/}
                            {/*    <td className={"nanumSquareR-font-normal"}>*/}
                            {/*        <div className={"listStyle"}>2023.01.27</div>*/}
                            {/*    </td>*/}
                            {/*    /!* 결제번호 *!/*/}
                            {/*    <td className={"nanumSquareR-font-normal"}>*/}
                            {/*        <div className={"listStyle"}>000001</div>*/}
                            {/*    </td>*/}
                            {/*    /!* 주문 금액 (수량) *!/*/}
                            {/*    <td className={"nanumSquareR-font-normal"}>*/}
                            {/*        <div className={"text-center listStylePrice"}>*/}
                            {/*            <div>120,000 원</div>*/}
                            {/*            <span>2개</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    /!* 주문상태 *!/*/}
                            {/*    <td className={"nanumSquareR-font-normal text-center deliveryState"}>*/}
                            {/*        <div className={"deliveryState"}>배송완료</div>*/}
                            {/*    </td>*/}
                            {/*    <td className={"orderState"}>*/}
                            {/*        <div className={"mt-1"}>*/}
                            {/*            <button className={"mt-2"}>환불요청</button>*/}
                            {/*            <button className={"mt-2"}>리뷰쓰기</button>*/}
                            {/*            <button className={"mt-2"}>구매확정</button>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            </tbody>
                        </table>
        </div>
    )
}

export default BuyProductList;