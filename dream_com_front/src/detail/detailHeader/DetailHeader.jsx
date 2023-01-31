import React from "react";
import DetailHeaderCategory from "./DetailHeaderCategory";
import DetailHeaderSpec from "./DetailHeaderSpec";

const detailCategoryNameList = [
    {key : 0, title : "홈"},
    {key : 1, title : "카테고리"},
    {key : 2, title : "제조사"}
]

const detailSpecList = [
    {key : 0, title : "스펙1"},
    {key : 1, title : "스펙2"},
    {key : 2, title : "스펙3"},
    {key : 3, title : "스펙4"},
    {key : 4, title : "스펙5"}
]

// 제품 상세페이지에서 제품의 제목, 스펙, 카테고리를 보여주는 컴포넌트(상단에 위치)
function  DetailHeader() {
    return (
        <div id={"div-detail-nav-header"} className={"mt-3"}>
            {
                detailCategoryNameList.map(item => {
                    return <DetailHeaderCategory key={item.key} categoryName={item.title} />
                })
            }
            <h4 className={"my-2"}>상품 제목입니다.</h4>
            <div className={"d-flex justify-content-between"}>
                <div>
                    {
                        detailSpecList.map(item => {
                            return <DetailHeaderSpec key={item.key} spec={item.title} />
                        })
                    }
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default DetailHeader;