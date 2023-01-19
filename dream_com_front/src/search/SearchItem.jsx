import React from "react";
import "../fonts/fontStyle.css"

function SearchItem({src, title, specList, averageScore, registrationDate, commentCount, price}) {
    return (
        <div className={"d-flex align-items-center"} style={{border : "1px solid lightgray"}}>
            <img className={"m-3"} width={175} height={175} src={src} />
            <div style={{width : "100%"}}>
                <div className={"d-flex"}>
                    <div style={{width : "85%"}}>
                        <p className={"mb-3 nanumSquareR-font-normal"}><b>{title}</b></p>
                        <p className={"mb-1 nanumSquareR-font-small"}>
                            {
                                specList.map(item => {
                                    return (item.spec + " ")
                                })
                            }
                        </p>
                        <p className={"mb-1 nanumSquareR-font-small"}>평균별점 : {averageScore}</p>
                        <div className={"d-flex"}>
                            <p className={"nanumSquareR-font-small"}>등록월 : {registrationDate}</p>
                            <span className={"mx-1 nanumSquareR-font-small"}>|</span>
                            <p className={"nanumSquareR-font-small"}>상품의견 {commentCount}건</p>
                            <span className={"mx-1 nanumSquareR-font-small"}>|</span>
                            <p className={"nanumSquareR-font-small"}>찜하기</p>
                        </div>
                    </div>
                    <div style={{width : "15%"}} className={"d-flex align-items-center"}>
                        <p className={"my-0 nanumSquareR-font-normal"}><b>{price}원</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;