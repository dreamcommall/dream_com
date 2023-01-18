import React from "react";
import "../fonts/fontStyle.css"

const historyBoxStyle = {
    width : 100,
    height : 400,
    border : "1px solid lightgray",
    borderRadius : 10,
    position : "fixed",
    zIndex : 1000,
    backgroundColor : "white",
    top : 450,
    left : 1775
}

function HistoryBox({itemList}) {
    return (
        <div style={historyBoxStyle}>
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
                                    <div>
                                        <img className={"mb-3"} width={70} height={70} src={item.src} />
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