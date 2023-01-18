import React from "react";
import "../fonts/fontStyle.css"
import "./HistoryBox.css"

// 작성자 : MoonNight285
// 히스토리 박스를 그려주는 컴포넌트
// itemList => 최신 데이터를 기준으로 방문했던 상품의 이미지를 리스트로 받아옴(최대 4개 표시)
function HistoryBox({itemList}) {
    return (
        <div id={"div-history-box"}>
            <h6 className={"text-center p-2 nanumSquareB-font-normal"}>히스토리</h6>
            {
                itemList.length == 0 ?
                    <div className={"d-flex justify-content-center align-items-center"} style={{height : "80%"}}>
                        <div className={"text-center"}>
                            <p className={"mb-0 nanumSquareR-font-normal"}>최근에 본</p>
                            <p className={"mb-0 nanumSquareR-font-normal"}>상품이</p>
                            <p className={"mb-0 nanumSquareR-font-normal"}>없습니다.</p>
                        </div>
                    </div>
                    :
                    <div className={"text-center"}>
                        {
                            itemList.map(item => {
                                return (
                                    <div key={item.key}>
                                        <a href={"#"}><img className={"mb-3"} width={70} height={70} src={item.src} /></a>
                                    </div>
                                );
                            })
                        }
                    </div>
            }
        </div>
    );
}

export default HistoryBox;