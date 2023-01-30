import React from "react";
import SearchItem from "./SearchItem";
import "../fonts/fontStyle.css"

function SearchItems({searchItemInfo}) {
    console.log(searchItemInfo);
    return (
        <div className={"my-4"} style={searchItemInfo.length == 0 ? {width : "100%"} : {width : "100%", borderBottom : "1px solid lightgray"}}>
            {
                searchItemInfo.length == 0 ? <div style={{height : 375}} className={"d-flex justify-content-center align-items-center"}>
                        <p className={"nanumSquareB-font-XNormal"}>조회된 결과가 없습니다.</p></div> :
                searchItemInfo.map(item => {
                    return <SearchItem key={item.key} src={item.thumbnailImg} title={item.productTitle} specList={item.partName} averageScore={item.score}
                        registrationDate={item.productCreateDt} commentCount={item.reviewNumber} price={item.productPrice}
                    discount={item.productDiscount}/>
                })
            }
        </div>
    );
}

export default SearchItems;