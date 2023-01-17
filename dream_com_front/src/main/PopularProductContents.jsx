import React from "react";
import "../fonts/fontStyle.css"

function PopularProductContents({name, price}) {
    return (
        <div className={"text-center mt-2"}>
            <p className={"mb-1 nanumSquareR-font-normal"}>{name}</p>
            <p className={"nanumSquareR-font-normal"}>{price}</p>
        </div>
    );
}

export default PopularProductContents;