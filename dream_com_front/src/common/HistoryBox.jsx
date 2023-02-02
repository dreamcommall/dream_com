import React, {useEffect, useState} from "react";
import "../fonts/fontStyle.css";
import "./HistoryBox.css";
import {getAllHistory} from "./js/sessionStorageManager";

// 작성자 : MoonNight285
// 히스토리 박스를 그려주는 컴포넌트
function HistoryBox() {
    const [historyList, setHistoryList] = useState([]); // 히스토리 상품이 담긴 배열
    
    // 세션 스토리지의 길이가 달라졌거나, 첫번째 상품의 이름의 값이 달라진경우 갱신
    // useEffect(() => {
    //     setHistoryList(getAllHistory());
    // }, [sessionStorage.length, sessionStorage.getItem(`productNum0`)]);
    
    useEffect(() => {
        // sessionStorage.clear();
        console.log(sessionStorage);
        console.log(sessionStorage.getItem("productNum_230130003"));
        console.log(JSON.parse(sessionStorage.getItem("productNum_230130003")));
    }, []);
    
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
                                        <a href={`/detail?productNum=${item.productNum}`}><img className={"mb-3"} width={70} height={70} src={item.thumbnailImg} /></a>
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