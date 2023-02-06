import React from "react";
import "./MypageWishList.css"


function MypageWishList() {

    return (
        <div className={"container mypageWishList"}>
            <h3 className={"ms-3"}>WishList</h3>
            <hr className={"ms-3"}/>
            <table className={"table"}>
                <tbody>
                <tr className={"tableWishList"}>
                    <div className={"ms-1 nanumSquareR-font-normal wishListSection"}>
                        <input className={"float-start wishCheck"} type={"checkbox"}/>
                        <a href={"#"}><img className={"wishImg"} src={"images/logo192.png"}/></a>
                        <div className={"wishListProductInfo"}>
                            <div className={"mt-2 productDate"}>2023.01.31</div>
                            <div className={"mt-2"}>
                                <a href={"#"}>
                                    <div className={"mt-0"}>[레노버] ThinkStation P358 TWR-30GLS00A00 AMD R7-5845
                                        [16G/512G/T1000/Win11Pro] [기본제품]
                                    </div>
                                </a>
                            </div>
                            <div className={"mt-2"}><strong>1,200,000 원</strong></div>
                        </div>
                    </div>
                </tr>
                </tbody>
            </table>
            <div className={"mb-5"}>
                <button className={"addWishList"}>장바구니 추가</button>
                <button className={"deleteWishList"}>찜 해제</button>
            </div>
        </div>
    )
}

export default MypageWishList
