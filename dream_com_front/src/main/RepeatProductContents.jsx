import React from "react";
import "../fonts/fontStyle.css"

function RepeatProductContents({style, item}) {
    return (
        <div className={"text-center"} style={style}>
            <p className={"mt-2 mb-1 nanumSquareR-font-normal"}>{item.name}</p>
            <div className={"d-flex justify-content-center mb-0"}>
                {
                    item.discountPercent == 0 ? <p /> : <p style={{color : "red"}} className={"nanumSquareB-font-normal mb-1"}>{item.discountPercent}%</p>
                }
                <p className={"mx-1 nanumSquareR-font-normal mb-2"}>{item.price}</p>
            </div>
            <img width={179} height={179} src={item.src}/>
        </div>
    );
}

export default RepeatProductContents;