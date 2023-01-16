import React from "react";

function PopularProductContents({name, price}) {
    return (
        <div className={"text-center mt-2"}>
            <p className={"mb-1"}>{name}</p>
            <p>{price}</p>
        </div>
    );
}

export default PopularProductContents;