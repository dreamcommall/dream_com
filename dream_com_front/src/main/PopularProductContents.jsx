import React from "react";
import "../fonts/fontStyle.css"

function PopularProductContents({name, price, discountPercent}) {
    return (
        <div className={"text-center mt-2"}>
            <p className={"mb-1 nanumSquareR-font-normal"}>{name}</p>
            <div className={"d-flex justify-content-center"}>
                {
                    discountPercent == 0 ? <p/> : <p style={{color : "red"}} className={"nanumSquareB-font-normal"}>{discountPercent}% </p>
                }
                <p className={"nanumSquareR-font-normal mx-2"}>{price}</p>
            </div>
        </div>
    );
}

export default PopularProductContents;