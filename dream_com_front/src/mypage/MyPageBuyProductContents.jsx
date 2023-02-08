import React from "react";
import {Link} from "react-router-dom";

function MyPageBuyProductContents({orderInfo, review}) {
    return (
        <div className={"mt-0"}>
            <Link to={`/detail?productNum=${orderInfo.productNum}&pageNum=1`}><img src={orderInfo.thumbnailImg} /></Link>
            <ul>
                <li className={"productInfo mt-1"}>
                    <div className={"nanumSquareR-font-small"}>{orderInfo.productTitle}</div>
                    <div className={"nanumSquareR-font-small mt-2"}>{Number.parseInt(orderInfo.productPrice).toLocaleString()} 원</div>
                    <div className="accordion nanumSquareR-font-normal mt-3">
                        <div className="accordion-item">
                            <p className="accordion-header">
                                <button type="button" data-bs-toggle="collapse" className={"accordionButton"} data-bs-target={`#collapse${orderInfo.productNum}`}>
                                    내가 쓴 리뷰 보기
                                </button>
                            </p>
                            <div id={`collapse${orderInfo.productNum}`} className="accordion-collapse collapse">
                                <div className={"ms-2 pt-1 productReview"}>{review}</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default MyPageBuyProductContents;