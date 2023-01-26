import React from "react";
import "./DetailBodyProductReview.css"
import Form from 'react-bootstrap/Form';
import "../fonts/fontStyle.css"
import Button from "react-bootstrap/Button";

// 제품 상세페이지에서 리뷰를 보기위해 기준을 선택하는 컴포넌트
function DetailBodyProductReview() {
    return (
        <div className={"my-5"}>
            <h4 className={"mb-3 nanumSquareB-font-large"}>전체리뷰 26건</h4>
            <div id={"div-detail-product-review-header"}>
                <div className={"d-flex justify-content-between"}>
                    <div className={"d-flex align-items-center"} id={"div-detail-product-review-select-wrapper"}>
                        <Form.Select>
                            <option>평점전체</option>
                            <option>5점</option>
                            <option>4 ~ 5점</option>
                            <option>3 ~ 4점</option>
                            <option>2 ~ 3점</option>
                            <option>1 ~ 2점</option>
                        </Form.Select>
                        <Form.Select>
                            <option>최신순</option>
                            <option>추천순</option>
                        </Form.Select>
                    </div>
                    <div className={"d-flex align-items-center"}>
                        <input className={"mx-2"} type={"text"} placeholder={"검색할 단어를 입력하세요."}/>
                        <Button variant={"dark"} className={"me-5 nanumSquareR-font-normal"}>검색하기</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBodyProductReview;