import React from "react";
import "./DetailBodyProductReview.css"
import Form from 'react-bootstrap/Form';
import "../../fonts/fontStyle.css"

// 제품 상세페이지에서 리뷰를 보기위해 기준을 선택하는 컴포넌트
function DetailBodyProductReview() {
    return (
        <div className={"mb-5"}>
            <div id={"div-detail-product-review-header"}>
                <div className={"d-flex justify-content-between"}>
                    <div className={"d-flex align-items-center"} id={"div-detail-product-review-select-wrapper"}>
                        <Form.Select>
                            <option>평점전체</option>
                            <option>5점</option>
                            <option>4점</option>
                            <option>3점</option>
                            <option>2점</option>
                            <option>1점</option>
                        </Form.Select>
                        <Form.Select>
                            <option>최신순</option>
                            <option>추천순</option>
                        </Form.Select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBodyProductReview;