import React from "react";
import NewProduct from "./NewProduct";
import RandomSpec from "./RandomSpec";

// 작성자 : MoonNight285
// 사용자에게 상품 추천목록을 보여주는 컴포넌트
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