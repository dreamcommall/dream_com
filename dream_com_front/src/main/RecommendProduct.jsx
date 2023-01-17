import React from "react";
import NewProduct from "./NewProduct";
import RandomSpec from "./RandomSpec";

function RecommendProduct() {
    return (
        <div className={"container mt-3 my-5"}>
            <div className={"row"}>
                <div className={"col d-flex justify-content-center px-0"}>
                    <RandomSpec />
                    <NewProduct />
                </div>
            </div>
        </div>
    );
}

export default RecommendProduct;