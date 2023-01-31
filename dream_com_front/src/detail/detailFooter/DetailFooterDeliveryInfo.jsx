import React from "react";
import "./DetailFooterDeliveryInfo.css"
import "../../fonts/fontStyle.css"

// 제품 상세페이지에서 배송정보를 표시하는 테이블로 만들어 보여주는 컴포넌트
function DetailFooterDeliveryInfo() {
    return (
        <div id={"div-detail-nav-delivery"} className={"mb-5"}>
            <h4 className={"nanumSquareB-font-large"}>상품 배송정보</h4>
            <p className={"nanumSquareR-font-normal"}><span className={"nanumSquareB-font-normal"}>기본배송</span> 결제 마감시간 전에 입금하시면 당일 발송됩니다.</p>
            <div>
                <table id={"table-detail-delivery-info"}>
                    <thead>
                        <tr>
                            <th>택배사</th>
                            <th>일반상품</th>
                            <th>추천조립</th>
                            <th>튜닝 PC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CJ대한통운</td>
                            <td>오후 5시 30분까지 결제하면 당일발송</td>
                            <td>오후 4시까지 결제하면 당일발송</td>
                            <td>오후 4시까지 결제하면 당일발송</td>
                        </tr>
                        <tr>
                            <td>한진택배</td>
                            <td>오후 5시까지 결제하면 당일발송</td>
                            <td>오후 4시까지 결제하면 당일발송</td>
                            <td>오후 4시까지 결제하면 당일발송</td>
                        </tr>
                        <tr>
                            <td>롯데택배</td>
                            <td>오후 5시까지 결제하면 당일발송</td>
                            <td>오후 4시까지 결제하면 당일발송</td>
                            <td>오후 4시까지 결제하면 당일발송</td>
                        </tr>
                        <tr>
                            <td>경동화물</td>
                            <td>오후 4시까지 결제하면 2일 이내 도착</td>
                            <td>오후 4시까지 결제하면 당일발송</td>
                            <td>오후 4시까지 결제하면 당일발송</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DetailFooterDeliveryInfo;