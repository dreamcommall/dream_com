import React from "react";
import NewProduct from "./NewProduct";
import RandomSpec from "./RandomSpec";

// 작성자 : MoonNight285
// 사용자에게 상품 추천목록을 보여주는 컴포넌트
function RecommendProduct({randomSpec, partNames, newProductList}) {
    return (
        <div className={"container mt-4 my-5"}>
            <div className={"row"}>
                <div className={"col d-flex justify-content-center px-0"}>
                    <RandomSpec randomSpec={randomSpec} partNames={partNames} />
                    <NewProduct newProductList={newProductList}/>
                </div>
            </div>
        </div>
    );
}

export default RecommendProduct;