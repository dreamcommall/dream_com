import React, {useEffect, useState} from "react";
import "../fonts/fontStyle.css";
import "./HistoryBox.css";
import {getAllHistory} from "./js/sessionStorageManager";
import {Link} from "react-router-dom";

// 작성자 : MoonNight285
// 히스토리 박스를 그려주는 컴포넌트
function HistoryBox() {
    const [historyList, setHistoryList] = useState([]); // 히스토리 상품이 담긴 배열
    
    // 세션 스토리지에 담겨져있는 히스토리 정보가 변경된경우 재 랜더링
    useEffect(() => {
        setHistoryList(getAllHistory());
    }, [sessionStorage.getItem("historyInfo")]);
    
    return (
        <div id={"div-history-box"}>
            <h6 className={"text-center p-2 nanumSquareB-font-normal"}>히스토리</h6>
            {
                historyList.length == 0 ?
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
                            historyList.map(item => {
                                return (
                                    <div key={item.key} title={item.productTitle}>
                                        <Link to={`/detail?productNum=${item.productNum}&pageNum=1`}><img className={"mb-3"} width={70} height={70} src={item.thumbnailImg} /></Link>
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