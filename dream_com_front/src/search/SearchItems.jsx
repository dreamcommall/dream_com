import React from "react";
import SearchItem from "./SearchItem";
import "../fonts/fontStyle.css"

function SearchItems({searchItemInfo}) {
    return (
        <div className={"my-4"} style={searchItemInfo.length == 0 ? {width : "100%"} : {width : "100%", borderBottom : "1px solid lightgray"}}>
            {
                searchItemInfo.length == 0 ? <div style={{height : 375}} className={"d-flex justify-content-center align-items-center"}>
                        <p className={"nanumSquareB-font-XNormal"}>조회된 결과가 없습니다.</p></div> :
                searchItemInfo.map(item => {
                    return <SearchItem key={item.key} searchItemInfo={item} />
                })
            }
        </div>
    );
}

export default SearchItems;